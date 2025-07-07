/**
 * 認証付きAPI用のカスタムaxiosインスタンス
 * - JWT認証ヘッダー自動付与
 * - 401時の自動リフレッシュ＆再試行
 * - jotaiストアと連携したグローバル認証管理
 */
import axios from 'axios';
import { getRefreshToken, setRefreshToken } from '../atoms/auth';
import { tokenAtom, logoutAtom } from '../atoms/auth';
import { getDefaultStore } from 'jotai';
import { EP } from '@/utils/endpoints';
import type { paths } from '@/types/openapi';

// 認証・リフレッシュ対応のカスタムaxiosインスタンスを作成
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api" || '',
  withCredentials: true,
});

// jotaiのグローバルストアを取得
const store = getDefaultStore();

// リフレッシュ中かどうかのフラグ
let isRefreshing = false;
// リフレッシュ処理のPromise（多重リフレッシュ防止）
let refreshPromise: Promise<string | null | undefined> | null = null;

// リクエストインターセプター：JWTをAuthorizationヘッダーに付与
api.interceptors.request.use(
  (config) => {
    const token = store.get(tokenAtom);
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// レスポンスインターセプター：401時に自動リフレッシュ
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401かつリトライ前かつrefresh_tokenがある場合のみリフレッシュ
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      // すでにリフレッシュ中でなければリフレッシュ開始
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = (async () => {
          try {
            // refresh_tokenで新しいJWTを取得
            const refreshToken = getRefreshToken() ?? null;
            const res = await axios.post<
              paths["/refresh-token"]["post"]["responses"][200]["content"]["application/json"]
            >(
              EP.refresh_token(),
              { refresh_token: refreshToken },
              { baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api", withCredentials: true }
            );
            const { token } = res.data;
            // openapi型ではrefresh_tokenは返らないので、古いrefresh_tokenを再保存
            store.set(tokenAtom, token ?? null);
            setRefreshToken(refreshToken ?? '');
            return token;
          } catch {
            // リフレッシュ失敗時はログアウト
            store.set(logoutAtom);
            return null;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        })();
      }
      // リフレッシュ完了まで待機
      const newToken = await refreshPromise;
      if (newToken) {
        // 新しいトークンでリトライ
        originalRequest._retry = true;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } else {
        // リフレッシュ失敗時はエラー返却
        return Promise.reject(error);
      }
    }
    // それ以外はそのままエラー返却
    return Promise.reject(error);
  }
);

export const authAxios = api;

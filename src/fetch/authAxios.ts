/**
 * 認証付きAPI用のカスタムaxiosインスタンス
 * - HttpOnly Cookie による認証（withCredentials: true）
 * - 401時の自動リフレッシュ＆再試行
 * - jotaiストアと連携したグローバル認証状態管理
 */
import axios from 'axios';
import { EP } from '@/utils/endpoints';

// 認証・リフレッシュ対応のカスタムaxiosインスタンスを作成
// Next.jsのrewritesでプロキシするため、相対パスを使用
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Cookie を自動送信
});

// リフレッシュ中かどうかのフラグ
let isRefreshing = false;
// リフレッシュ処理のPromise（多重リフレッシュ防止）
let refreshPromise: Promise<boolean> | null = null;

// リクエストインターセプター：Cookie認証のため特別な処理は不要
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// レスポンスインターセプター：401時に自動リフレッシュ
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401かつリトライ前の場合のみリフレッシュ
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      // すでにリフレッシュ中でなければリフレッシュ開始
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = (async () => {
          try {
            // refresh_tokenはCookieで自動送信される
            await axios.post(
              EP.refresh_token(),
              {},
              { baseURL: '/api', withCredentials: true }
            );
            return true;
          } catch {
            // リフレッシュ失敗
            return false;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        })();
      }
      // リフレッシュ完了まで待機
      const success = await refreshPromise;
      if (success) {
        // 新しいトークンでリトライ（Cookieで自動送信される）
        originalRequest._retry = true;
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

// 認証状態を確認するヘルパー関数（リフレッシュを試みずに単純チェック）
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    // リフレッシュインターセプターをバイパスするため、直接axiosを使用
    // これにより、ゲストログイン直後など、Cookieがまだ反映されていない場合でも
    // 不要なリフレッシュ試行を避けられる
    await axios.get('/me', {
      baseURL: '/api',
      withCredentials: true,
    });
    return true;
  } catch {
    return false;
  }
};

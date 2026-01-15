import { atom } from 'jotai';
import axios from 'axios';
import { EP } from '@/utils/endpoints';
import type { paths } from '@/types/openapi';

// JWTトークンをグローバルに管理するAtom
export const tokenAtom = atom<string | null>(null);

// ログイン状態を判定するAtom（tokenが存在すればtrue）
export const isLoggedInAtom = atom((get) => !!get(tokenAtom));

// refresh_tokenをlocalStorageで管理するためのキー
const REFRESH_TOKEN_KEY = 'refresh_token';

// localStorageからrefresh_tokenを取得
export const getRefreshToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// localStorageにrefresh_tokenを保存
export const setRefreshToken = (token: string | null | undefined) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token ?? '');
};

// localStorageからrefresh_tokenを削除
export const removeRefreshToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// ログイン時にtokenとrefresh_tokenを保存するAtom
export const loginAtom = atom(null, (get, set, { token, refreshToken }: { token: string; refreshToken: string }) => {
  set(tokenAtom, token);
  setRefreshToken(refreshToken);
});

export const loginWithRefreshTokenIfExists = async (
  setLogin: (value: { token: string; refreshToken: string }) => void
): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await axios.post<
      paths["/refresh-token"]["post"]["responses"][200]["content"]["application/json"]
    >(
      EP.refresh_token(),
      { refresh_token: refreshToken },
      { baseURL: '/api', withCredentials: true }
    );
    const { token } = res.data;
    if (token) {
      setLogin({ token, refreshToken });
      return true;
    }
  } catch {
    removeRefreshToken();
  }
  return false;
};

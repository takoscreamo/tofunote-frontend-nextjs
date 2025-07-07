"use client";
import { useSetAtom, useAtomValue } from 'jotai';
import { loginAtom, getRefreshToken, loginWithRefreshTokenIfExists, isLoggedInAtom } from '../../atoms/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { authAxios } from '@/fetch/authAxios';
import type { paths } from "@/types/openapi";
import { EP } from "@/utils/endpoints";

export default function GuestLoginPage() {
  const setLogin = useSetAtom(loginAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoLoginTried, setAutoLoginTried] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [hasRefreshToken, setHasRefreshToken] = useState(false);

  useEffect(() => {
    // すでにログイン済みなら即トップページへリダイレクト
    if (isLoggedIn) {
      router.replace('/');
      return;
    }
    // localStorageにrefresh_tokenがあるかチェック
    const token = getRefreshToken();
    setHasRefreshToken(!!token);
    const tryAutoLogin = async () => {
      if (token) {
        const loggedIn = await loginWithRefreshTokenIfExists(setLogin);
        if (loggedIn) {
          router.push('/');
          return;
        }
      }
      setAutoLoginTried(true);
      setIsAuthChecking(false);
    };
    tryAutoLogin();
  }, [isLoggedIn, setLogin, router]);

  // ゲストログインボタン押下時の処理
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authAxios.post<
        paths["/guest-login"]["post"]["responses"][200]["content"]["application/json"]
      >(EP.guest_login());
      const { token, refresh_token } = res.data;
      if (!token || !refresh_token) {
        setError('トークンの取得に失敗しました');
        setLoading(false);
        return;
      }
      setLogin({ token, refreshToken: refresh_token });
      router.push('/');
    } catch {
      setError('ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">ゲストログイン</h1>
      {/* 自動ログイン判定中は何も表示しない。refresh_tokenがなければボタン表示 */}
      {!isAuthChecking && autoLoginTried && !hasRefreshToken && (
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'ログイン中...' : 'ゲストログイン'}
        </button>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
} 
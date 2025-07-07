"use client";
import { useSetAtom } from 'jotai';
import { loginAtom } from '../../atoms/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authAxios } from '@/fetch/authAxios';
import type { paths } from "@/types/openapi";
import { EP } from "@/utils/endpoints";

// ゲストログイン画面コンポーネント
export default function GuestLoginPage() {
  // jotaiのログイン用atom
  const setLogin = useSetAtom(loginAtom);
  // Next.jsのルーター
  const router = useRouter();
  // ローディング状態
  const [loading, setLoading] = useState(false);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  // ゲストログインボタン押下時の処理
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // APIへゲストログインリクエスト
      const res = await authAxios.post<
        paths["/guest-login"]["post"]["responses"][200]["content"]["application/json"]
      >(EP.guest_login());
      const { token, refresh_token } = res.data;
      if (!token || !refresh_token) {
        setError('トークンの取得に失敗しました');
        setLoading(false);
        return;
      }
      // トークンを保存
      setLogin({ token, refreshToken: refresh_token });
      // トップページへ遷移
      router.push('/');
    } catch {
      // エラー時はメッセージ表示
      setError('ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">ゲストログイン</h1>
      {/* ログインボタン */}
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'ログイン中...' : 'ゲストログイン'}
      </button>
      {/* エラーメッセージ表示 */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
} 
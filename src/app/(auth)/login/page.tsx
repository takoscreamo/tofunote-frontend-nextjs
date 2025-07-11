"use client";
import { useSetAtom, useAtomValue } from 'jotai';
import { loginAtom, getRefreshToken, loginWithRefreshTokenIfExists, isLoggedInAtom } from '../../../atoms/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { authAxios } from '@/fetch/authAxios';
import type { paths } from "@/types/openapi";
import { EP } from "@/utils/endpoints";
import { TermsModal } from '@/components/common/TermsModal';
import Image from 'next/image';
import ImageModal from '@/components/common/ImageModal';

export default function LoginPage() {
  const setLogin = useSetAtom(loginAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoLoginTried, setAutoLoginTried] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [hasRefreshToken, setHasRefreshToken] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);

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

  if (isAuthChecking) return null;

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
      setError('処理に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-16">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
        <div className="mb-4">
          <Image
            src="/logoicon.png"
            alt="TOFU NOTE"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">TOFU NOTE</h1>
        <p className="text-base text-gray-700 mb-1 text-center">豆腐メンタルを俯瞰するアプリ</p>
        <p className="text-xs text-gray-500 mb-6 text-center">メールアドレス不要・匿名で使えます。</p>
        <div className="flex items-center justify-center mb-6 w-full">
          <input
            id="agree"
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mt-1 mr-2 accent-blue-500"
          />
          <label htmlFor="agree" className="text-xs text-gray-600 select-none">
            <button
              type="button"
              className="underline text-blue-600 hover:text-blue-800 focus:outline-none"
              onClick={() => setTermsOpen(true)}
            >
              利用規約
            </button>
            に同意します
          </label>
        </div>
        {/* 自動ログイン判定中は何も表示しない。refresh_tokenがなければボタン表示 */}
        {!isAuthChecking && autoLoginTried && !hasRefreshToken && (
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleLogin}
            disabled={loading || !agreed}
          >
            {loading ? '処理中...' : 'ゲストとして使い始める'}
          </button>
        )}
        {error && <p className="text-red-500 mt-4 text-sm text-center w-full">{error}</p>}
      </div>
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      {/* サンプル画面画像エリア */}
      <div className="w-full max-w-2xl flex flex-col items-center mt-8">
        <div className="text-sm text-gray-500 mb-2">サンプル画面（イメージ）</div>
        <div className="flex flex-row gap-2 w-full justify-center">
          <div className="flex flex-col items-center min-w-[90px]">
            <Image src="/sample_diary.png" alt="記録画面サンプル" width={100} height={70} className="rounded-lg shadow mb-2 object-contain border border-dashed border-gray-300 cursor-pointer" onClick={() => setModalImage({src: '/sample_diary.png', alt: '記録画面サンプル'})} />
            <span className="text-xs text-gray-600">記録画面</span>
          </div>
          <div className="flex flex-col items-center min-w-[90px]">
            <Image src="/sample_graph.png" alt="グラフ画面サンプル" width={100} height={70} className="rounded-lg shadow mb-2 object-contain border border-dashed border-gray-300 cursor-pointer" onClick={() => setModalImage({src: '/sample_graph.png', alt: 'グラフ画面サンプル'})} />
            <span className="text-xs text-gray-600">グラフ画面</span>
          </div>
          <div className="flex flex-col items-center min-w-[90px]">
            <Image src="/sample_settings.png" alt="設定画面サンプル" width={100} height={70} className="rounded-lg shadow mb-2 object-contain border border-dashed border-gray-300 cursor-pointer" onClick={() => setModalImage({src: '/sample_settings.png', alt: '設定画面サンプル'})} />
            <span className="text-xs text-gray-600">設定画面</span>
          </div>
        </div>
      </div>
      {modalImage && (
        <ImageModal open={true} src={modalImage.src} alt={modalImage.alt} onClose={() => setModalImage(null)} />
      )}
    </div>
  );
} 
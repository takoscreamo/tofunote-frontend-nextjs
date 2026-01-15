"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { authAxios, checkAuthStatus } from '@/fetch/authAxios';
import type { paths } from "@/types/openapi";
import { EP } from "@/utils/endpoints";
import { TermsModal } from '@/components/common/TermsModal';
import Image from 'next/image';
import ImageModal from '@/components/common/ImageModal';
import ImageCarousel from '@/components/common/ImageCarousel';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);

  useEffect(() => {
    // Cookie認証で既にログイン済みかチェック
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        router.replace('/');
        return;
      }
      setIsAuthChecking(false);
    };
    checkAuth();
  }, [router]);

  if (isAuthChecking) return null;

  // ゲストログインボタン押下時の処理
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // ゲストログイン（Cookieが自動設定される）
      await authAxios.post<
        paths["/guest-login"]["post"]["responses"][200]["content"]["application/json"]
      >(EP.guest_login());
      // Cookieが確実に反映されるまで少し待ってからリダイレクト
      // フルページリロードでCookieを確実に反映させる
      setTimeout(() => {
        window.location.href = '/diary';
      }, 100);
    } catch {
      setError('処理に失敗しました');
      setLoading(false);
    }
  };

  // Googleログインボタン押下時の処理
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      // バックエンドから認証URLを取得
      const res = await authAxios.get<{ auth_url: string }>(EP.google_auth());
      // Googleへリダイレクト
      window.location.href = res.data.auth_url;
    } catch {
      setError('Google認証の開始に失敗しました');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-16">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
        <div className="mb-4">
          <Image
            src="/logoicon.png.webp"
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
        {/* ログインボタン */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          onClick={handleLogin}
          disabled={loading || googleLoading || !agreed}
        >
          {loading ? '処理中...' : 'ゲストとして使い始める'}
        </button>

        <div className="w-full flex items-center my-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-xs">または</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Googleログインボタン */}
        <button
          className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded border border-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading || !agreed}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? '処理中...' : 'Googleでログイン'}
        </button>

        {error && <p className="text-red-500 mt-4 text-sm text-center w-full">{error}</p>}
      </div>
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      {/* サンプル画面画像エリア */}
      <div className="w-full max-w-2xl flex flex-col items-center mt-8">
        <div className="text-sm text-gray-500 mb-2">サンプル画面（イメージ）</div>
        <ImageCarousel
          images={[
            { src: '/sample_diary.png.webp', alt: '記録画面サンプル', label: '記録画面' },
            { src: '/sample_graph.png.webp', alt: 'グラフ画面サンプル', label: 'グラフ画面' },
            { src: '/sample_settings.png.webp', alt: '設定画面サンプル', label: '設定画面' },
          ]}
          onImageClick={(img) => setModalImage({ src: img.src, alt: img.alt })}
        />
      </div>
      {modalImage && (
        <ImageModal open={true} src={modalImage.src} alt={modalImage.alt} onClose={() => setModalImage(null)} />
      )}
    </div>
  );
} 
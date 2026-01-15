"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthStatus } from "@/fetch/authAxios";

/**
 * OAuth コールバックページ
 * バックエンドからリダイレクトされ、Cookieは既に設定済み
 * /me APIで認証確認後、ホームへリダイレクト
 */
export default function OAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        router.replace("/");
      } else {
        setError("認証に失敗しました。もう一度お試しください。");
        setTimeout(() => router.replace("/login"), 3000);
      }
    };
    verifyAuth();
  }, [router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-gray-500 text-sm">ログインページにリダイレクトします...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-700 mb-2">認証を確認中...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
}

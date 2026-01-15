"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * OAuth連携成功ページ
 * アカウント連携完了後、設定ページへリダイレクト
 */
export default function LinkSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // 少し待ってから設定ページへリダイレクト
    const timer = setTimeout(() => {
      router.replace("/settings");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-8 text-center">
        <div className="text-green-500 text-4xl mb-4">✓</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">連携完了</h1>
        <p className="text-gray-600 text-sm mb-4">Googleアカウントとの連携が完了しました。</p>
        <p className="text-gray-500 text-xs">設定ページにリダイレクトします...</p>
      </div>
    </div>
  );
}

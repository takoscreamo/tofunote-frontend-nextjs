"use client";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "../atoms/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  // 本来のトップページ内容
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">ようこそ！</h1>
      <p>ここがあなたのダッシュボードです。</p>
      {/* 必要に応じて他のコンポーネントや情報を追加 */}
    </main>
  );
} 
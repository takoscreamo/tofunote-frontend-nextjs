"use client";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "../../atoms/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 認証ガード: 未ログイン時は/loginへリダイレクト
 * ログイン済みならchildrenを表示
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // /loginページ自身はガードしない
    if (!isLoggedIn && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isLoggedIn, pathname, router]);

  // 未ログイン時は何も表示しない（リダイレクト中）
  if (!isLoggedIn && pathname !== "/login") {
    return null;
  }
  return <>{children}</>;
} 
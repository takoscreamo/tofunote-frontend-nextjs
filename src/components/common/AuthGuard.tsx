"use client";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "../../atoms/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getRefreshToken, loginWithRefreshTokenIfExists } from "@/atoms/auth";

/**
 * 認証ガード: 未ログイン時は/loginへリダイレクト
 * ログイン済みならchildrenを表示
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    // /loginページ自身はガードしない
    if (!isLoggedIn && pathname !== "/login") {
      // refresh_tokenがあれば自動ログインを試みる
      const token = getRefreshToken();
      if (token) {
        loginWithRefreshTokenIfExists(() => {}).finally(() => {
          setIsAuthChecking(false);
        });
      } else {
        setIsAuthChecking(false);
        router.replace("/login");
      }
    } else {
      setIsAuthChecking(false);
    }
  }, [isLoggedIn, pathname, router]);

  // 認証チェック中は何も描画しない
  if (isAuthChecking) return null;
  // 未ログイン時は何も表示しない（リダイレクト中）
  if (!isLoggedIn && pathname !== "/login") {
    return null;
  }
  return <>{children}</>;
} 
"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuthStatus } from "@/fetch/authAxios";

/**
 * 認証ガード: 未ログイン時は/loginへリダイレクト
 * Cookie認証を使用してログイン状態を確認
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // /loginページ自身はガードしない
    if (pathname === "/login") {
      setIsAuthenticated(true);
      return;
    }

    // Cookie認証でログイン状態を確認（再試行ロジック付き）
    const verifyAuth = async (retryCount = 0) => {
      const authenticated = await checkAuthStatus();
      if (authenticated) {
        setIsAuthenticated(true);
      } else {
        // 初回失敗時は、Cookieがまだ反映されていない可能性があるため、少し待ってから再試行
        if (retryCount < 2) {
          setTimeout(() => {
            verifyAuth(retryCount + 1);
          }, 100);
        } else {
          setIsAuthenticated(false);
          router.replace("/login");
        }
      }
    };
    verifyAuth();
  }, [pathname, router]);

  // 認証チェック中は何も描画しない
  if (isAuthenticated === null) return null;
  // 未認証時は何も表示しない（リダイレクト中）
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

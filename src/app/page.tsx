"use client";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "../atoms/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();

  useEffect(() => {
    // ログインしていなければログインページにリダイレクト
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  // ログインしていれば日記ページにリダイレクト
  return (
    router.replace("/diary")
  );
} 
"use client";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "../atoms/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/diary");
    } else {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  return null;
} 
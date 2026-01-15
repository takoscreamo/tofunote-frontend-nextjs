"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuthStatus } from "@/fetch/authAxios";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        router.replace("/diary");
      } else {
        router.replace("/login");
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [router]);

  if (isChecking) return null;

  return null;
} 
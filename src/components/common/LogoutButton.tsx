"use client";
import { useSetAtom } from "jotai";
import { logoutAtom } from "../../atoms/auth";
import { useRouter } from "next/navigation";

/**
 * ログアウトボタン: クリックでトークン削除＆/loginへ遷移
 */
export default function LogoutButton() {
  const setLogout = useSetAtom(logoutAtom);
  const router = useRouter();

  return (
    <button
      className="text-gray-600 hover:text-red-600 border border-gray-300 rounded px-3 py-1 transition-colors"
      onClick={() => {
        setLogout();
        router.push("/login");
      }}
    >
      ログアウト
    </button>
  );
} 
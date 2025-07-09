"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcherGet, fetcherDelete } from "@/fetch/fetcher";
import { Button } from "@/components/ui/Button";
import NicknameForm from "@/components/common/NicknameForm";
import { removeRefreshToken } from "@/atoms/auth";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/atoms/auth";

const SettingsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; nickname: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    fetcherGet<{ id: string; nickname: string }>("/me")
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("ユーザー情報の取得に失敗しました");
        setLoading(false);
      });
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("本当に退会しますか？この操作は取り消せません。")) return;
    setLoading(true);
    const { err } = await fetcherDelete<{ message: string }>("/me");
    setLoading(false);
    if (!err) {
      removeRefreshToken();
      setToken(null);
      router.push("/");
    } else {
      setError("退会処理に失敗しました");
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[40vh] text-gray-500 text-sm">読み込み中...</div>;
  if (error) return <div className="flex justify-center items-center min-h-[40vh] text-red-500 text-sm">{error}</div>;

  return (
    <div className="max-w-xs w-full mx-auto py-2 px-2">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-3">設定</h1>
      <section className="mb-2">
        {user && (
          <NicknameForm
            initialNickname={user.nickname}
            onUpdated={nickname => setUser(u => u ? { ...u, nickname } : u)}
          />
        )}
      </section>
      <hr className="my-6" />
      <section className="mb-2">
        <h2 className="text-base font-semibold text-gray-800 mb-1">退会</h2>
        <p className="text-xs text-gray-500 mb-2">退会すると、これまで記録した日記やユーザー情報など、すべてのデータが完全に削除されます。<br />この操作は取り消すことができませんが、またいつでも新しく始めることができます。ご利用いただきありがとうございました。</p>
        <Button onClick={handleDelete} variant="outline" className="w-full border-red-400 text-red-600 hover:bg-red-50 py-2 text-sm">退会</Button>
      </section>
    </div>
  );
};

export default SettingsPage; 
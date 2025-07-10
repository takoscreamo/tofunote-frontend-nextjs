"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcherGet, fetcherDelete } from "@/fetch/fetcher";
import { Button } from "@/components/ui/Button";
import NicknameForm from "@/components/common/NicknameForm";
import { removeRefreshToken } from "@/atoms/auth";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/atoms/auth";
import { TermsModal } from "@/components/common/TermsModal";

const SettingsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; nickname: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setToken = useSetAtom(tokenAtom);
  const [termsOpen, setTermsOpen] = useState(false);

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
        <Button onClick={handleDelete} variant="danger" className="w-full py-2 text-sm">退会</Button>
      </section>
      <hr className="my-6" />
      <section className="mb-2 bg-gray-100 rounded p-4">
        <h2 className="text-base font-semibold text-gray-800 mb-1">AI分析※</h2>
        <div className="flex items-center gap-4 mb-1">
          <label className="flex items-center gap-1 text-sm text-gray-700">
            <input type="radio" name="ai-analysis" value="on" disabled />
            オン
          </label>
          <label className="flex items-center gap-1 text-sm text-gray-700">
            <input type="radio" name="ai-analysis" value="off" checked disabled />
            オフ
          </label>
        </div>
        <p className="text-xs text-gray-500">※AI分析機能は近日リリース予定です。現在はご利用いただけません。</p>
        <p className="text-xs text-gray-500 mt-1">
          オンにした場合、日記データ等がOpenAI等の外部APIに送信されます（
          <button type="button" className="underline text-blue-600 hover:text-blue-800" onClick={() => setTermsOpen(true)}>
            利用規約
          </button>
          に準拠）。
        </p>
        {termsOpen && <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />}
      </section>
      <hr className="my-6" />
      <section className="mb-2 bg-gray-100 rounded p-4">
        <h2 className="text-base font-semibold text-gray-800 mb-1">OAuth連携※</h2>
        <p className="text-xs text-gray-500 mb-2">※OAuth連携機能は近日リリース予定です。現在はご利用いただけません。</p>
        <button type="button" disabled className="w-full py-2 text-sm bg-gray-200 text-gray-500 rounded font-semibold cursor-not-allowed mb-1">Googleで連携（近日リリース）</button>
      </section>
      <hr className="my-6" />
      <div className="flex flex-col items-center mt-8 mb-2">
        <span className="text-xs text-gray-400 mb-1">お問い合わせ</span>
        <div className="flex gap-4">
          <a href="https://x.com/takoscreamo" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-black hover:underline">
            <svg width="18" height="18" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/></svg>
          </a>
          <a href="https://github.com/takoscreamo" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-gray-700 hover:underline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1.01-2.75-.1-.26-.44-1.3.1-2.7 0 0 .83-.27 2.73 1.02a9.18 9.18 0 0 1 2.49-.34c.85 0 1.71.11 2.5.34 1.89-1.29 2.72-1.02 2.72-1.02.54 1.4.2 2.44.1 2.7.63.72 1 1.63 1 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 
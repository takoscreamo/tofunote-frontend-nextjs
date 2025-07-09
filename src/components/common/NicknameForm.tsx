"use client";

import React, { useState } from "react";
import { fetcherPatch } from "@/fetch/fetcher";
import { Button } from "@/components/ui/Button";
import { mutate } from "swr";

interface Props {
  initialNickname: string;
  onUpdated?: (nickname: string) => void;
}

const NicknameForm: React.FC<Props> = ({ initialNickname, onUpdated }) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { err } = await fetcherPatch<{ message: string; user: { id: string; nickname: string } }>(
      "/me",
      { nickname }
    );
    setLoading(false);
    if (!err) {
      setSuccess(true);
      if (onUpdated) onUpdated(nickname);
      mutate("/me"); // 右上のニックネームも即時反映
    } else {
      setError("ニックネームの更新に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <label htmlFor="nickname-input" className="text-base font-semibold text-gray-800 mb-1">ニックネーム</label>
      <div className="flex flex-row items-center gap-2">
        <input
          id="nickname-input"
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          disabled={loading}
          className="border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 bg-transparent px-1 py-1 text-base w-full transition-colors duration-150 outline-none"
          placeholder="ニックネーム"
          style={{ minWidth: 0 }}
        />
        <Button type="submit" variant="primary" disabled={loading || !nickname.trim()} className="text-xs px-7 py-1 h-7 min-w-[80px] whitespace-nowrap">保存</Button>
      </div>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      {success && <div className="text-green-600 text-xs mt-1">更新しました</div>}
    </form>
  );
};

export default NicknameForm; 
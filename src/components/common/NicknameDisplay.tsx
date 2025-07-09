"use client";
import useSWR from "swr";
import { fetcherGet } from "@/fetch/fetcher";

export const NicknameDisplay = () => {
  const { data } = useSWR<{ id: string; nickname: string }>("/me", fetcherGet);
  if (!data?.nickname) return null;
  return (
    <span className="text-gray-700 font-semibold mr-2" title="ニックネーム">
      {data.nickname}さん
    </span>
  );
}; 
import React from "react";
import { MultiMetricChart } from "./MultiMetricChart";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import type { components } from "@/types/openapi";

interface GraphContentProps {
  isLoading: boolean;
  error: Error & { status?: number } | null;
  diaries: components["schemas"]["Diary"][];
}

export const GraphContent: React.FC<GraphContentProps> = ({ isLoading, error, diaries }) => {
  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <ErrorMessage error={error} getErrorMessage={() => "グラフデータの取得に失敗しました"} />;
  }

  return <MultiMetricChart diaries={diaries} />;
}; 
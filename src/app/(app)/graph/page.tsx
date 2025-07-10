"use client";

import { useState } from "react";
import { PeriodSelector, type Period } from "./PeriodSelector";
import { GraphContent } from "./GraphContent";
import { getDateRange } from "@/utils/dateRange";
import useSWR from "swr";
import { EP } from "@/utils/endpoints";
import { fetcherGet } from "@/fetch/fetcher";
import type { components } from "@/types/openapi";
import { format, subDays } from "date-fns";

export default function GraphPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("1week");
  const [customStartDate, setCustomStartDate] = useState(format(subDays(new Date(), 6), "yyyy-MM-dd"));
  const [customEndDate, setCustomEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // 選択された期間に基づいて日付範囲を計算
  const { start, end } = getDateRange(selectedPeriod, customStartDate, customEndDate);

  // SWRでAPI取得
  const { data, error, isLoading } = useSWR<{ data: components["schemas"]["Diary"][] }>(
    EP.range_diaries(start, end),
    fetcherGet
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold mb-6">豆腐メンタル推移グラフ</h1>
      
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        customStartDate={customStartDate}
        onCustomStartDateChange={setCustomStartDate}
        customEndDate={customEndDate}
        onCustomEndDateChange={setCustomEndDate}
      />
      
      <GraphContent
        isLoading={isLoading}
        error={error}
        diaries={data?.data ?? []}
      />
    </div>
  );
} 
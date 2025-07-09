import React from "react";
import type { Period } from "@/types/period";

// 期間オプションの定義
export const PERIOD_OPTIONS = [
  { value: "1week", label: "1週間" },
  { value: "2weeks", label: "2週間" },
  { value: "1month", label: "1ヶ月" },
  { value: "3months", label: "3ヶ月" },
  { value: "6months", label: "6ヶ月" },
  { value: "1year", label: "1年" },
  { value: "custom", label: "カスタム期間" },
] as const;

export type { Period };

interface PeriodSelectorProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
  customStartDate: string;
  onCustomStartDateChange: (date: string) => void;
  customEndDate: string;
  onCustomEndDateChange: (date: string) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  customStartDate,
  onCustomStartDateChange,
  customEndDate,
  onCustomEndDateChange,
}) => (
  <div className="mb-6 space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        表示期間
      </label>
      <select
        value={selectedPeriod}
        onChange={(e) => onPeriodChange(e.target.value as Period)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {PERIOD_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>

    {/* カスタム期間指定 */}
    {selectedPeriod === "custom" && (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            開始日
          </label>
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => onCustomStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            終了日
          </label>
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => onCustomEndDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    )}
  </div>
); 
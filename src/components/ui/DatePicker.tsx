import React from "react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
  label?: string;
  required?: boolean;
  max?: string; // 追加
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  onPreviousDay,
  onNextDay,
  label = "日付",
  required = false,
  max, // 追加
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="date" className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreviousDay}
          className="p-2 border rounded hover:bg-gray-100 text-gray-700 transition-colors"
          aria-label="前の日"
        >
          &lt;
        </button>
        <input
          type="date"
          id="date"
          value={value}
          onChange={handleDateChange}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          required={required}
          max={max} // 追加
        />
        <button
          type="button"
          onClick={onNextDay}
          className={`p-2 border rounded hover:bg-gray-100 text-gray-700 transition-colors ${max !== undefined && value >= max ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400' : ''}`}
          aria-label="次の日"
          disabled={max !== undefined && value >= max}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}; 
import React from "react";
import { DatePicker } from "@/components/ui/DatePicker";
import { MentalScoreSlider } from "@/components/ui/MentalScoreSlider";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";

interface DiaryFormProps {
  formData: {
    date: string;
    mentalScore: number;
    content: string;
  };
  onDateChange: (date: string) => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onMentalScoreChange: (score: number) => void;
  onContentChange: (content: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  onDeleteDiary?: () => void; // 追加
}

export const DiaryForm: React.FC<DiaryFormProps> = ({
  formData,
  onDateChange,
  onPreviousDay,
  onNextDay,
  onMentalScoreChange,
  onContentChange,
  onSubmit,
  isLoading = false,
  onDeleteDiary,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <DatePicker
        value={formData.date}
        onChange={onDateChange}
        onPreviousDay={onPreviousDay}
        onNextDay={onNextDay}
        required
      />
      
      <MentalScoreSlider
        value={formData.mentalScore}
        onChange={onMentalScoreChange}
      />
      
      <TextArea
        value={formData.content}
        onChange={onContentChange}
        label="メモ"
        placeholder="今日の出来事や気持ちを書いてみましょう！"
        id="content"
        rows={3}
      />
      
      {/* ボタンを横並びに配置 */}
      <div className="flex gap-2">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? "保存中..." : "保存"}
        </Button>
        {onDeleteDiary && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 border-red-400 text-red-600 hover:bg-red-50"
            onClick={onDeleteDiary}
            disabled={isLoading}
          >
            削除
          </Button>
        )}
      </div>
    </form>
  );
}; 
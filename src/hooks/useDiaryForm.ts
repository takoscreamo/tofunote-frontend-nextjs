import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSwr } from "@/hooks/useSwr";
import { fetcherPost, fetcherPut, fetcherDelete } from "@/fetch/fetcher";
import { getTodayDateInTokyo } from "@/utils/date";
import type { components } from "@/types/openapi";
import { EP } from "@/utils/endpoints";
import { toast } from "react-toastify";

interface UseDiaryFormProps {
  initialDate?: string;
}

interface DiaryFormData {
  date: string;
  mentalScore: number;
  content: string;
}

export const useDiaryForm = ({ initialDate }: UseDiaryFormProps) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<DiaryFormData>({
    date: initialDate || getTodayDateInTokyo(),
    mentalScore: 5,
    content: "",
  });

  // SWRで日記データ取得
  const { data: diaryData, error, mutate } = useSwr<{
    data?: components["schemas"]["Diary"]
  }>(EP.get_diary(formData.date));

  // 日付をYYYY-MM-DD形式に変換するユーティリティ
  const formatDate = (dateStr: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0];
  };

  // 日記データ取得時にフォーム初期値を反映
  useEffect(() => {
    if (diaryData?.data) {
      setFormData({
        date: formatDate(diaryData.data.date),
        mentalScore: diaryData.data.mental,
        content: diaryData.data.diary,
      });
    } else {
      setFormData(prev => ({
        ...prev,
        mentalScore: 5,
        content: "",
      }));
    }
  }, [diaryData]);

  // エラーメッセージをカスタマイズ
  const getErrorMessage = () => {
    if (error?.status === 404) {
      return "メンタルと日記が登録されていません";
    }
    return "データ取得エラーが発生しました";
  };

  // 日付変更
  const changeDate = (days: number) => {
    const currentDate = new Date(formData.date);
    currentDate.setDate(currentDate.getDate() + days);
    const newDate = currentDate.toISOString().split("T")[0];
    setFormData(prev => ({ ...prev, date: newDate }));
  };

  // 日付input変更
  const handleDateChange = (date: string) => {
    setFormData(prev => ({ ...prev, date }));
  };

  // メンタルスコア変更
  const handleMentalScoreChange = (score: number) => {
    setFormData(prev => ({ ...prev, mentalScore: score }));
  };

  // コンテンツ変更
  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  // 送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 未来日付のバリデーション
    const today = getTodayDateInTokyo();
    if (formData.date > today) {
      toast.error("未来の日付では登録できません", { position: "top-right" });
      return;
    }

    const body = {
      date: formatDate(formData.date),
      mental: formData.mentalScore,
      diary: formData.content,
    };

    const toastId = toast.loading("保存中...", { position: "top-right" });
    
    try {
      let result;
      if (diaryData?.data) {
        // 既存日記があれば更新
        result = await fetcherPut<{ data: components["schemas"]["Diary"] }>(
          EP.update_diary(formatDate(formData.date)),
          { mental: formData.mentalScore, diary: formData.content }
        );
      } else {
        // なければ新規作成
        result = await fetcherPost<{ data: components["schemas"]["Diary"] }>(
          EP.create_diary(),
          body
        );
      }

      if (!result.err) {
        mutate();
        toast.update(toastId, {
          render: "保存完了",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          position: "top-right",
        });
        router.push("/diary");
      } else {
        throw new Error("保存に失敗しました");
      }
    } catch {
      toast.update(toastId, {
        render: "エラーが発生しました",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        position: "top-right",
      });
    }
  };

  // 日記削除処理
  const handleDeleteDiary = async () => {
    if (!diaryData?.data) return;
    if (!window.confirm("この記録を削除しますか？")) return;
    const toastId = toast.loading("削除中...", { position: "top-right" });
    try {
      const result = await fetcherDelete<{ message: string }>(EP.delete_diary(formatDate(formData.date)));
      if (!result.err) {
        // キャッシュクリアとフォーム初期化
        await mutate(undefined, { revalidate: true });
        setFormData(prev => ({ ...prev, mentalScore: 5, content: "" }));
        toast.update(toastId, {
          render: "削除完了",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          position: "top-right",
        });
        router.push("/diary");
      } else {
        throw new Error("削除に失敗しました");
      }
    } catch {
      toast.update(toastId, {
        render: "エラーが発生しました",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        position: "top-right",
      });
    }
  };

  return {
    formData,
    diaryData,
    error,
    getErrorMessage,
    changeDate,
    handleDateChange,
    handleMentalScoreChange,
    handleContentChange,
    handleSubmit,
    handleDeleteDiary: diaryData?.data ? handleDeleteDiary : undefined,
  };
}; 
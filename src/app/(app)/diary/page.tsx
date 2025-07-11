"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DiaryForm } from "./DiaryForm";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useDiaryForm } from "@/hooks/useDiaryForm";

export default function DiaryEdit() {
  const {
    formData,
    error,
    getErrorMessage,
    changeDate,
    handleDateChange,
    handleMentalScoreChange,
    handleContentChange,
    handleSubmit,
    handleDeleteDiary,
  } = useDiaryForm({});

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
      <ToastContainer position="top-right" toastClassName="custom-toast" className="custom-toast-body" />
      
      <h1 className="text-2xl font-bold mb-4">記録する</h1>
      
      <DiaryForm
        formData={formData}
        onDateChange={handleDateChange}
        onPreviousDay={() => changeDate(-1)}
        onNextDay={() => changeDate(1)}
        onMentalScoreChange={handleMentalScoreChange}
        onContentChange={handleContentChange}
        onSubmit={handleSubmit}
        onDeleteDiary={handleDeleteDiary}
      />
      
      <ErrorMessage error={error} getErrorMessage={getErrorMessage} />
    </div>
  );
} 
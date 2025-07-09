import { format, subDays, subMonths, subYears } from "date-fns";
import type { Period } from "@/types/period";

export const getDateRange = (period: Period, customStartDate?: string, customEndDate?: string) => {
  if (period === "custom") {
    return {
      start: customStartDate!,
      end: customEndDate!,
    };
  }

  const end = new Date();
  let start: Date;

  switch (period) {
    case "1week":
      start = subDays(end, 6);
      break;
    case "2weeks":
      start = subDays(end, 13);
      break;
    case "1month":
      start = subMonths(end, 1);
      break;
    case "3months":
      start = subMonths(end, 3);
      break;
    case "6months":
      start = subMonths(end, 6);
      break;
    case "1year":
      start = subYears(end, 1);
      break;
    default:
      start = subDays(end, 6);
  }

  return {
    start: format(start, "yyyy-MM-dd"),
    end: format(end, "yyyy-MM-dd"),
  };
}; 
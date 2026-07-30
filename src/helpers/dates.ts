import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(isoWeek);

export const formatDueDate = (date: string) => {
  if (!date) return "No date";
  const targetDate = dayjs(date);
  const todayDate = dayjs();

  if (targetDate.format("YYYY-MM-DD") === todayDate.format("YYYY-MM-DD"))
    return "Today";

  if (
    targetDate.format("YYYY-MM-DD") ===
    todayDate.add(1, "day").format("YYYY-MM-DD")
  )
    return "Tomorrow";

  if (targetDate.isBefore(todayDate, "day"))
    return `${targetDate.format("D MMMM")} (Overdue)`;

  return targetDate.format("D MMMM");
};

export const getDueDateColor = (date: string, status: string) => {
  if (!date) return "var(--text-placeholder)";
  if (status === "done") return "var(--text-muted)";

  const targetDate = dayjs(date);
  const todayDate = dayjs();

  if (targetDate.isBefore(todayDate, "day")) return "var(--color-error)";

  if (targetDate.format("YYYY-MM-DD") === todayDate.format("YYYY-MM-DD"))
    return "var(--color-accent-blue)";

  if (
    targetDate.format("YYYY-MM-DD") ===
    todayDate.add(1, "day").format("YYYY-MM-DD")
  )
    return "var(--text-primary)";

  return "var(--text-secondary)";
};

export const nextMonday = (date: Dayjs) => {
  if (!date) return null;
  return dayjs(date).add(1, "week").isoWeekday(1);
};

export const relativeDate = (date: string) => {
  if (!date) return null;
  return dayjs(date).fromNow();
};

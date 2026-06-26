import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(isoWeek);

export const formatDueDate = (date: string) => {
  if (!date) return "No date";
  return dayjs().add(1, "day").format("YYYY-MM-DD") ===
    dayjs(date).format("YYYY-MM-DD")
    ? "Tomorrow"
    : dayjs(date).format("D MMMM");
};

export const nextMonday = (date: Dayjs) => {
  if (!date) return null;
  return dayjs(date).add(1, "week").isoWeekday(1);
};

export const relativeDate = (date: string) => {
  if (!date) return null;
  return dayjs(date).fromNow();
};

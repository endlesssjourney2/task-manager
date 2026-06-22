import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const tomorrowDate = (date: string) => {
  if (!date) return "";
  return dayjs().add(1, "day").format("YYYY-MM-DD") ===
    dayjs(date).format("YYYY-MM-DD")
    ? "Tomorrow"
    : dayjs(date).format("D MMMM");
};

export const nextMonday = (date: Dayjs) => {
  if (!date) return null;
  return dayjs(date).add(1, "week").isoWeekday(1);
};

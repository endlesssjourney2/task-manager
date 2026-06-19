import dayjs from "dayjs";

export const tomorrowDate = (date: string) => {
  if (!date) return "";
  return dayjs().add(1, "day").format("YYYY-MM-DD") ===
    dayjs(date).format("YYYY-MM-DD")
    ? "Tomorrow"
    : dayjs(date).format("D MMMM");
};

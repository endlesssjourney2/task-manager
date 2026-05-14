import dayjs from "dayjs";

export const dateChecker = (date: string, range: number) => {
  if (!date) return null;

  const today = dayjs().startOf("day");
  const dueDate = dayjs(date).startOf("day");

  if (today.isAfter(dueDate)) {
    return "Out of date";
  }

  const diff = dueDate.diff(today, "day");

  return diff <= range ? "Soon out of date" : "Upcoming";
};

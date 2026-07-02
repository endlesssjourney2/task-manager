import dayjs from "dayjs";
import { nextMonday } from "../helpers/dates";

export const QUICK_DATES = [
  { label: "Today", getValue: () => dayjs() },
  { label: "Tomorrow", getValue: () => dayjs().add(1, "day") },
  { label: "Next Week", getValue: () => nextMonday(dayjs()) },
];

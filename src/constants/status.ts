import type { Status } from "../types/task";

export const STATUS_OPTIONS = [
  { value: "todo", label: "Todo" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
] satisfies { value: Status; label: string }[];

export const STATUS_LABELS: Record<Status, string> = {
  todo: "Todo",
  in_progress: "In progress",
  done: "Done",
};

export const STATUS_COLORS: Record<Status, string> = {
  todo: "#2f81f7",
  in_progress: "#eab308",
  done: "#22c55e",
};

import type { Status } from "../types/task";

export const STATUS_OPTIONS = [
  { value: "todo", label: "Todo" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
] satisfies { value: Status; label: string }[];

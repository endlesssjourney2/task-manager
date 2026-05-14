import type { Priority } from "../types/task";

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] satisfies { value: Priority; label: string }[];

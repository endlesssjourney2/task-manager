import type { Priority } from "../types/task";

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] satisfies { value: Priority; label: string }[];

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
};

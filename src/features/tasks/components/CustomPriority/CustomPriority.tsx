import type { FC } from "react";
import s from "./CustomPriority.module.css";
import type { Priority } from "../../../../types/task";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import { PRIORITY_LABELS } from "../../../../constants/priority";

type Props = {
  priority: Priority;
  onChange: (priority: Priority) => void;
};

const priorityColors: Record<Priority, string> = {
  low: "green",
  medium: "yellow",
  high: "red",
};

const CustomPriority: FC<Props> = ({ priority, onChange }) => {
  const items: MenuProps["items"] = [
    { key: "low", label: "🟢 Low" },
    { key: "medium", label: "🟡 Medium" },
    { key: "high", label: "🔴 High" },
  ];

  return (
    <Tooltip title={PRIORITY_LABELS[priority]} color={priorityColors[priority]}>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: items,
          onClick: ({ key }) => {
            onChange(key as Priority);
          },
        }}
      >
        <button className={`${s.circle} ${s[priority]}`}></button>
      </Dropdown>
    </Tooltip>
  );
};

export default CustomPriority;

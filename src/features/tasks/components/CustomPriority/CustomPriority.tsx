import type { FC } from "react";
import s from "./CustomPriority.module.css";
import type { Priority } from "../../../../types/task";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import {
  PRIORITY_COLORS,
  PRIORITY_LABELS,
} from "../../../../constants/priority";
import { IconFlag } from "@tabler/icons-react";

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
    {
      key: "low",
      label: (
        <span className={s.label}>
          <IconFlag size={14} color={PRIORITY_COLORS.low} /> Low
        </span>
      ),
    },
    {
      key: "medium",
      label: (
        <span className={s.label}>
          <IconFlag size={14} color={PRIORITY_COLORS.medium} /> Medium
        </span>
      ),
    },
    {
      key: "high",
      label: (
        <span className={s.label}>
          <IconFlag size={14} color={PRIORITY_COLORS.high} /> High
        </span>
      ),
    },
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
        {priority === "low" ? (
          <IconFlag style={{ cursor: "pointer" }} color={PRIORITY_COLORS.low} />
        ) : priority === "medium" ? (
          <IconFlag
            style={{ cursor: "pointer" }}
            color={PRIORITY_COLORS.medium}
          />
        ) : (
          <IconFlag
            style={{ cursor: "pointer" }}
            color={PRIORITY_COLORS.high}
          />
        )}
      </Dropdown>
    </Tooltip>
  );
};

export default CustomPriority;

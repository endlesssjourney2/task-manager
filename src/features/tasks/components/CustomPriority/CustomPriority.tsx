import type { FC } from "react";
import type { Priority } from "../../../../types/task";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import {
  PRIORITY_COLORS,
  PRIORITY_LABELS,
} from "../../../../constants/priority";
import { IconFlag } from "@tabler/icons-react";
import PriorityIcon from "./PriorityIcon/PriorityIcon";

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
      label: <PriorityIcon priority="low" />,
    },
    {
      key: "medium",
      label: <PriorityIcon priority="medium" />,
    },
    {
      key: "high",
      label: <PriorityIcon priority="high" />,
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
        <IconFlag
          style={{ cursor: "pointer" }}
          color={PRIORITY_COLORS[priority]}
        />
      </Dropdown>
    </Tooltip>
  );
};

export default CustomPriority;

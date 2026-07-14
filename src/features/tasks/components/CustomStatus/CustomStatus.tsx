import { type FC } from "react";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import type { Status } from "../../../../types/task";
import {
  STATUS_COLORS,
  STATUS_ICONS,
  STATUS_LABELS,
} from "../../../../constants/status";
import StatusIcon from "./StatusIcon/StatusIcon";

type Props = {
  status: Status;
  onChange: (status: Status) => void;
  disabled?: boolean;
};

const statusColors: Record<Status, string> = {
  todo: "blue",
  in_progress: "yellow",
  done: "green",
};

const CustomStatus: FC<Props> = ({ status, onChange, disabled }) => {
  const items: MenuProps["items"] = [
    {
      key: "todo",
      label: <StatusIcon status="todo" />,
    },
    {
      key: "in_progress",
      label: <StatusIcon status="in_progress" />,
    },
    {
      key: "done",
      label: <StatusIcon status="done" />,
    },
  ];

  const CurrentIcon = STATUS_ICONS[status];

  return (
    <Tooltip title={STATUS_LABELS[status]} color={statusColors[status]}>
      <Dropdown
        disabled={disabled}
        trigger={["click"]}
        menu={{
          items: items,
          onClick: ({ key }) => {
            onChange(key as Status);
          },
        }}
      >
        <CurrentIcon
          style={{ cursor: "pointer" }}
          color={STATUS_COLORS[status]}
        />
      </Dropdown>
    </Tooltip>
  );
};

export default CustomStatus;

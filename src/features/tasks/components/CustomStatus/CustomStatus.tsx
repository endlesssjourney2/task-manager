import { type FC } from "react";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import type { Status } from "../../../../types/task";
import s from "./CustomStatus.module.css";
import { STATUS_COLORS, STATUS_LABELS } from "../../../../constants/status";
import {
  IconCircle,
  IconCircleCheck,
  IconCircleHalf2,
} from "@tabler/icons-react";

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
      label: (
        <span className={s.label}>
          <IconCircle size={14} color={STATUS_COLORS.todo} /> Todo
        </span>
      ),
    },
    {
      key: "in_progress",
      label: (
        <span className={s.label}>
          <IconCircleHalf2 size={14} color={STATUS_COLORS.in_progress} /> In
          progress
        </span>
      ),
    },
    {
      key: "done",
      label: (
        <span className={s.label}>
          <IconCircleCheck size={14} color={STATUS_COLORS.done} /> Done
        </span>
      ),
    },
  ];

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
        {status === "todo" ? (
          <IconCircle
            style={{ cursor: "pointer" }}
            color={STATUS_COLORS.todo}
          />
        ) : status === "in_progress" ? (
          <IconCircleHalf2
            style={{ cursor: "pointer" }}
            color={STATUS_COLORS.in_progress}
          />
        ) : (
          <IconCircleCheck
            style={{ cursor: "pointer" }}
            color={STATUS_COLORS.done}
          />
        )}
      </Dropdown>
    </Tooltip>
  );
};

export default CustomStatus;

import { type FC } from "react";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import type { Status } from "../../../../types/task";
import s from "./CustomStatus.module.css";
import { STATUS_LABELS } from "../../../../constants/status";

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
    { key: "todo", label: "🔵 Todo" },
    { key: "in_progress", label: "🟡 In progress" },
    { key: "done", label: "🟢 Done" },
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
        <button
          className={`${s.circle} ${s[status]}`}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
    </Tooltip>
  );
};

export default CustomStatus;

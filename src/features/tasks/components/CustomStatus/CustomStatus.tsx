import { type FC } from "react";
import { Dropdown, type MenuProps } from "antd";
import type { Status } from "../../../../types/task";
import s from "./CustomStatus.module.css";

type Props = {
  status: Status;
  onChange: (status: Status) => void;
};

const CustomStatus: FC<Props> = ({ status, onChange }) => {
  const items: MenuProps["items"] = [
    { key: "todo", label: "🔵 Todo" },
    { key: "in_progress", label: "🟡 In progress" },
    { key: "done", label: "🟢 Done" },
  ];

  return (
    <Dropdown
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
  );
};

export default CustomStatus;

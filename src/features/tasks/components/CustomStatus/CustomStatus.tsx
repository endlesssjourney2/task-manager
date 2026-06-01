import { type FC } from "react";
import s from "./CustomStatus.module.css";
import { Dropdown, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { Status } from "../../../../types/task";
import { capitalizeFirst } from "../../../../helpers/capitalizeFirst";

type Props = {
  status: Status;
  id: string;
  updateStatus: (id: string, status: Status) => Promise<boolean>;
};

const CustomStatus: FC<Props> = ({ status, updateStatus, id }) => {
  const items: MenuProps["items"] = [
    { key: "todo", label: "Todo" },
    { key: "in_progress", label: "In progress" },
    { key: "done", label: "Done" },
  ];

  return (
    <div
      className={`${s.status} 
      ${
        status === "todo"
          ? s.todoBg
          : status === "in_progress"
            ? s.inProgressBg
            : s.doneBg
      }`}
    >
      <span
        className={`${s.statusText} 
        ${
          status === "todo"
            ? s.todo
            : status === "in_progress"
              ? s.inProgress
              : s.done
        }`}
      >
        {capitalizeFirst(status)}
      </span>
      <Dropdown
        menu={{ items, onClick: ({ key }) => updateStatus(id, key as Status) }}
        trigger={["click"]}
      >
        <DownOutlined />
      </Dropdown>
    </div>
  );
};

export default CustomStatus;

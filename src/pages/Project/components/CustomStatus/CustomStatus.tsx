import { type FC } from "react";
import type { Status } from "../../../../types/task";
import s from "./CustomStatus.module.css";
import { capitalizeFirst } from "../../../../helpers/capitalizeFirst";
import { Dropdown, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

type Props = {
  status: Status;
  id: string;
  updateStatus: (id: string, status: Status) => Promise<void>;
};

const CustomStatus: FC<Props> = ({ status, updateStatus, id }) => {
  const items: MenuProps["items"] = [
    { key: "todo", label: "Todo" },
    { key: "in_progress", label: "In progress" },
    { key: "done", label: "Done" },
  ];

  return (
    <div className={s.status}>
      <span>{capitalizeFirst(status)}</span>
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

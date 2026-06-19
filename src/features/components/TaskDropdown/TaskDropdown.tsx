import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import type { Task } from "../../../types/task";
import type { FC } from "react";
import { useProjectTasksContext } from "../../../context/ProjectTasksContext";
import useNotify from "../../../hooks/useNotify";

type Props = {
  id: string;
  task: Task;
  handleOpenEditModal: (task: Task) => void;
};

const TaskDropdown: FC<Props> = ({ id, task, handleOpenEditModal }) => {
  const { removeTask } = useProjectTasksContext();
  const notify = useNotify();

  const items: MenuProps["items"] = [
    { key: "edit", label: "Edit" },
    { key: "remove", label: "Remove", danger: true },
  ];

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown
        menu={{
          items: items,
          onClick: ({ key }) => {
            if (key === "remove") {
              notify.modal.confirm(
                "Are you sure you want to delete this task?",
                null,
                () => removeTask(id),
              );
            }
            if (key === "edit") handleOpenEditModal(task);
          },
        }}
        trigger={["click"]}
      >
        <EllipsisOutlined />
      </Dropdown>
    </div>
  );
};

export default TaskDropdown;

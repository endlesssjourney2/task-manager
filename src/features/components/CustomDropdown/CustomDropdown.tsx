import { Dropdown, type MenuProps } from "antd";
import { useProjectsContext } from "../../../context/ProjectsContext";
import type { FC } from "react";
import s from "./CustomDropdown.module.css";
import { EllipsisOutlined } from "@ant-design/icons";
import type { Project } from "../../../types/project";
import useNotify from "../../../hooks/useNotify";

type Props = {
  id: string;
  project: Project;
  handleOpenEditModal: (project: Project) => void;
};

const CustomDropdown: FC<Props> = ({ id, handleOpenEditModal, project }) => {
  const { removeProject } = useProjectsContext();
  const notify = useNotify();

  const items: MenuProps["items"] = [
    { key: "edit", label: "Edit" },
    { key: "remove", label: "Remove", danger: true },
  ];

  return (
    <div className={s.dropDownContainer}>
      <Dropdown
        menu={{
          items: items,
          onClick: ({ key }) => {
            if (key === "remove") {
              notify.modal.confirm(
                "Are you sure you want to delete this project?",
                `This will also delete all tasks associated with this project.
                This action cannot be undone.`,
                () => removeProject(id),
                450,
              );
            }
            if (key === "edit") handleOpenEditModal(project);
          },
        }}
        placement="bottomLeft"
        trigger={["click"]}
      >
        <EllipsisOutlined />
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;

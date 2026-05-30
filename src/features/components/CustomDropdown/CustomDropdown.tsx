import { Dropdown, type MenuProps } from "antd";
import { useProjectsContext } from "../../../context/ProjectsContext";
import type { FC } from "react";
import s from "./CustomDropdown.module.css";
import { EllipsisOutlined } from "@ant-design/icons";
import type { Project } from "../../../types/project";

type Props = {
  id: string;
  project: Project;
  handleOpenEditModal: (project: Project) => void;
};

const CustomDropdown: FC<Props> = ({ id, handleOpenEditModal, project }) => {
  const { removeProject } = useProjectsContext();

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
            if (key === "remove") removeProject(id);
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

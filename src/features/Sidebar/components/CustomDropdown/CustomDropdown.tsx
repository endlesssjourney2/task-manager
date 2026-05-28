import { Dropdown, type MenuProps } from "antd";
import { useProjectsContext } from "../../../../context/ProjectsContext";
import type { FC } from "react";
import s from "./CustomDropdown.module.css";
import { EllipsisOutlined } from "@ant-design/icons";

type Props = {
  id: string;
};

const CustomDropdown: FC<Props> = ({ id }) => {
  const { removeProject } = useProjectsContext();

  const items: MenuProps["items"] = [
    { key: "remove", label: "Remove" },
    { key: "edit", label: "Edit(WIP)" },
  ];

  return (
    <div className={s.dropDownContainer}>
      <Dropdown
        menu={{
          items: items,
          onClick: ({ key }) => {
            if (key === "remove") removeProject(id);
            if (key === "edit") return; //editProject(id); //WORK IN PROGRESS;
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

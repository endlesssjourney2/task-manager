import type { FC } from "react";
import s from "./HeaderProject.module.css";
import { Typography } from "antd";

type Props = {
  title: string;
  renameProject: (newTitle: string) => void;
};

const HeaderProject: FC<Props> = ({ title, renameProject }) => {
  return (
    <div className={s.header}>
      <Typography.Title
        className={s.title}
        level={2}
        editable={{
          onChange: renameProject,
          triggerType: ["text"],
          tooltip: "Click to rename project",
        }}
      >
        {title}
      </Typography.Title>
    </div>
  );
};

export default HeaderProject;

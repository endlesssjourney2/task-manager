import type { FC } from "react";
import type { Project } from "../../../../types/project";
import { IconFolder } from "@tabler/icons-react";
import s from "./ProjectIcon.module.css";

type Props = {
  project: Project;
  size?: number;
  fontSize?: number;
};

const ProjectIcon: FC<Props> = ({ project, size = 20, fontSize = 20 }) => {
  return (
    <div className={s.label}>
      <IconFolder size={size} color={project.color} className={s.icon} />
      <span className={s.title} style={{ fontSize: fontSize }}>
        {project.title}
      </span>
    </div>
  );
};

export default ProjectIcon;

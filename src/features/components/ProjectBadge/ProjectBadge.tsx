import type { FC } from "react";
import s from "./ProjectBadge.module.css";
import type { Project } from "../../../types/project";
import { Link } from "react-router-dom";
import { IconFolder } from "@tabler/icons-react";

type Props = {
  project: Omit<Project, "created_at" | "id">;
  id: string;
};

const ProjectBadge: FC<Props> = ({ project, id }) => {
  return (
    <Link
      className={s.project}
      style={{ backgroundColor: `${project.color}26` }}
      to={`/app/project/${id}`}
    >
      <div className={s.projectTitle} style={{ color: project.color }}>
        <IconFolder size={14} />
        <span>{project.title}</span>
      </div>
    </Link>
  );
};

export default ProjectBadge;

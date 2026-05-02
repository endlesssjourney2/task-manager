import { useNavigate } from "react-router-dom";
import type { Project } from "../../../../types/project";
import s from "./ProjectList.module.css";
import type { FC } from "react";

type Props = {
  projects: Project[];
  removeProject: (id: string) => void;
};

const ProjectList: FC<Props> = ({ projects, removeProject }) => {
  const navigate = useNavigate();

  return (
    <ul className={s.list}>
      {projects.map((p) => (
        <li
          key={p.id}
          className={s.item}
          onClick={() => navigate(`/project/${p.id}`)}
        >
          <div
            className={s.colorBar}
            style={{ backgroundColor: p.color ?? "transperent" }}
          />
          <div className={s.content}>
            <div className={s.title}>{p.title}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeProject(p.id);
              }}
              className={s.btn}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;

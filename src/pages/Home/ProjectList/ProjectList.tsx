import s from "./ProjectList.module.css";
import type { FC } from "react";
import type { Project } from "../../../types/project";

type Props = {
  projects: Project[];
  removeProject: (id: string) => void;
};

const ProjectList: FC<Props> = ({ projects, removeProject }) => {
  return (
    <ul className={s.list}>
      {projects.map((p) => (
        <li key={p.id} className={s.item}>
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

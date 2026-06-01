import { useNavigate } from "react-router-dom";
import s from "./ProjectList.module.css";
import type { FC } from "react";
import useNotify from "../../../../hooks/useNotify";
import type { Project } from "../../../../types/project";

type Props = {
  projects: Project[];
  removeProject: (id: string) => void;
};

const ProjectList: FC<Props> = ({ projects, removeProject }) => {
  const navigate = useNavigate();
  const notify = useNotify();

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
                notify.modal.confirm(
                  "Are you sure you want to delete this project?",
                  `This will also delete all tasks associated with this project.
                  This action cannot be undone.`,
                  () => removeProject(p.id),
                  450,
                );
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

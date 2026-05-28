import type { FC } from "react";
import type { Project } from "../../../../types/project";
import s from "./ProjectsList.module.css";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

type Props = {
  projects: Project[];
  removeProject: (id: string) => Promise<void>;
};

const ProjectsList: FC<Props> = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <ul className={s.list}>
      {projects.map((p) => (
        <li
          className={s.item}
          key={p.created_at}
          onClick={() => navigate(`/project/${p.id}`)}
        >
          <div className={s.left}>
            <span className={s.desc} style={{ color: `${p.color}` }}>
              #
            </span>
          </div>
          <div className={s.right}>
            <h2 className={s.title}>{p.title}</h2>
            <div onClick={(e) => e.stopPropagation()}>
              <CustomDropdown id={p.id} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;

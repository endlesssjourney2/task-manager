import { useState, type FC } from "react";
import type { Project, UpdateProjectPayload } from "../../../../types/project";
import s from "./ProjectsList.module.css";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import { useProjectsContext } from "../../../../context/ProjectsContext";
import EditModalProject from "../../../project/components/EditModalProject/EditModalProject";

type Props = {
  projects: Project[];
  removeProject: (id: string) => Promise<void>;
};

const ProjectsList: FC<Props> = ({ projects }) => {
  const navigate = useNavigate();
  const { editProject } = useProjectsContext();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleEditProject = async (
    id: string,
    fields: Omit<UpdateProjectPayload, "id">,
  ) => {
    const result = await editProject(id, fields);
    if (result) {
      setEditModalOpen(false);
      setTimeout(() => setSelectedProject(null), 300);
    }
    return result;
  };

  const handleOpenEditModal = (project: Project) => {
    setEditModalOpen(true);
    setSelectedProject(project);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
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
                <CustomDropdown
                  id={p.id}
                  handleOpenEditModal={handleOpenEditModal}
                  project={p}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedProject && (
        <EditModalProject
          selectedProject={selectedProject}
          modalOpen={editModalOpen}
          handleCloseModal={handleCloseEditModal}
          handleEditProject={handleEditProject}
        />
      )}
    </>
  );
};

export default ProjectsList;

import { useNavigate } from "react-router-dom";
import s from "./ProjectList.module.css";
import { useState, type FC } from "react";
import type { Project, UpdateProjectPayload } from "../../../../types/project";
import { useProjectsContext } from "../../../../context/ProjectsContext";
import EditModalProject from "../EditModalProject/EditModalProject";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

type Props = {
  projects: Project[];
};

const ProjectList: FC<Props> = ({ projects }) => {
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
            key={p.id}
            className={s.item}
            onClick={() => navigate(`/app/project/${p.id}`)}
          >
            <div className={s.colorBar}>
              <span style={{ color: p.color }}>#</span>
            </div>
            <div className={s.content}>
              <div className={s.title}>
                <span className={s.titleText}>{p.title}</span>
              </div>
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
          modalOpen={editModalOpen}
          selectedProject={selectedProject}
          handleEditProject={handleEditProject}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default ProjectList;

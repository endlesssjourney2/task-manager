import { useNavigate } from "react-router-dom";
import s from "./ProjectList.module.css";
import { useState, type FC } from "react";
import type { Project, UpdateProjectPayload } from "../../../../types/project";
import { useProjectsContext } from "../../../../context/ProjectsContext";
import EditModalProject from "../EditModalProject/EditModalProject";
import useNotify from "../../../../hooks/useNotify";
import { IconEdit, IconFolder, IconTrash } from "@tabler/icons-react";

type Props = {
  projects: Project[];
};

const ProjectList: FC<Props> = ({ projects }) => {
  const navigate = useNavigate();
  const notify = useNotify();
  const { editProject, removeProject, actionLoading } = useProjectsContext();

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
              <IconFolder color={p.color} size={20} />
            </div>
            <div className={s.content}>
              <div className={s.title}>
                <span className={s.titleText}>{p.title}</span>
              </div>
              <div className={s.buttons}>
                <button
                  className={`${s.button} ${s.editBtn}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditModal(p);
                  }}
                  disabled={actionLoading}
                >
                  <IconEdit size={14} />
                  Edit
                </button>
                <button
                  className={`${s.button} ${s.removeBtn}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    notify.modal.confirm(
                      "Are you sure you want to delete this project?",
                      "This action cannot be undone",
                      () => removeProject(p.id),
                      450,
                    );
                  }}
                  disabled={actionLoading}
                >
                  <IconTrash size={14} />
                  Remove
                </button>
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

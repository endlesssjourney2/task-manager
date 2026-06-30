import s from "./Project.module.css";
import { useState, type FC } from "react";
import TasksList from "../../features/tasks/components/TasksList/TasksList";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EditModal from "../../features/tasks/components/EditModal/EditModal";
import HeaderProject from "../../features/tasks/components/HeaderProject/HeaderProject";
import { useProjectsContext } from "../../context/ProjectsContext";
import type { Task, UpdateTaskPayload } from "../../types/task";
import { useProjectTasksContext } from "../../context/ProjectTasksContext";
import AddInlineTask from "../../features/tasks/components/AddInlineTask/AddInlineTask";

type Props = {
  projectId: string;
};

const ProjectContent: FC<Props> = ({ projectId }) => {
  const { tasks, actionLoading, editTask, initialLoading } =
    useProjectTasksContext();

  const { getProjectById, editProject } = useProjectsContext();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleOpenEditModal = (task: Task) => {
    setEditModalOpen(true);
    setSelectedTask(task);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setTimeout(() => setSelectedTask(null), 300);
  };

  const handleEditTask = async (
    id: string,
    fields: Omit<UpdateTaskPayload, "id">,
  ) => {
    const result = await editTask(id, fields);
    if (result) {
      setEditModalOpen(false);
      setTimeout(() => setSelectedTask(null), 300);
    }
    return result;
  };

  const handleRenameProject = async (newTitle: string) => {
    const project = getProjectById(projectId);
    if (!project) return;
    if (project.title === newTitle) return;
    await editProject(projectId, { title: newTitle, color: project.color });
  };

  if (initialLoading) {
    return (
      <div className={s.project}>
        <div className={s.loading}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
        </div>
      </div>
    );
  }

  return (
    <div className={s.project}>
      <HeaderProject
        title={getProjectById(projectId)?.title}
        renameProject={handleRenameProject}
      />
      <div className={s.content}>
        <TasksList tasks={tasks} handleOpenModal={handleOpenEditModal} />
        <AddInlineTask projectId={projectId} />
        {selectedTask && (
          <EditModal
            modalOpen={editModalOpen}
            selectedTask={selectedTask}
            handleCloseModal={handleCloseEditModal}
            handleEditTask={handleEditTask}
            loading={actionLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectContent;

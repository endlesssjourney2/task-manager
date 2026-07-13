import s from "./Project.module.css";
import { type FC } from "react";
import TasksList from "../../features/tasks/components/TasksList/TasksList";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import HeaderProject from "../../features/tasks/components/HeaderProject/HeaderProject";
import { useProjectsContext } from "../../context/ProjectsContext";
import { useProjectTasksContext } from "../../context/ProjectTasksContext";
import AddInlineTask from "../../features/tasks/components/AddInlineTask/AddInlineTask";

type Props = {
  projectId: string;
};

const ProjectContent: FC<Props> = ({ projectId }) => {
  const { initialLoading } = useProjectTasksContext();

  const { getProjectById, editProject } = useProjectsContext();

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
        <TasksList />
        <AddInlineTask projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectContent;

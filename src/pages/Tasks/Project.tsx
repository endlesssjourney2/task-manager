import { useParams } from "react-router-dom";
import { ProjectTasksProvider } from "../../context/ProjectTasksContext";
import ProjectContent from "./ProjectContent";

const Project = () => {
  const { id } = useParams();

  if (!id) return null;

  return (
    <ProjectTasksProvider projectId={id}>
      <ProjectContent projectId={id} />
    </ProjectTasksProvider>
  );
};

export default Project;

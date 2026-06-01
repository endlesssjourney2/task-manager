import { useEffect, useState } from "react";
import type { Project, UpdateProjectPayload } from "../types/project";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../api/project";
import { useAuth } from "../context/AuthContext";
import useNotify from "./useNotify";

const useProjects = () => {
  const notify = useNotify();

  const [projects, setProjects] = useState<Project[]>([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      setInitialLoading(true);
      const [data, error] = await getProjects(user.id);
      if (error) {
        notify.notification.error(
          "Failed to load projects",
          "Please try again or check console for more details",
          "fetch-projects-error",
        );
        console.error("Error fetching projects:", error);
        setInitialLoading(false);
        return;
      }
      setProjects(data as Project[]);
      setInitialLoading(false);
    };
    fetchProjects();
  }, [user]);

  const addProject = async (title: string, color: string | null) => {
    if (!user) return;

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      notify.notification.error(
        "Project title cannot be empty",
        "Please enter a valid title",
        "empty-title-error",
      );
      return false;
    }

    setActionLoading(true);
    const [data, error] = await createProject(cleanTitle, color, user.id);
    if (error) {
      notify.error("Failed to create project", { duration: 2 });
      console.error("Error creating project:", error);
      setActionLoading(false);
      return false;
    }
    notify.success("Project created successfully!", { duration: 1 });
    setProjects((prev) => [data as Project, ...prev]);
    setActionLoading(false);
    return true;
  };

  const removeProject = async (id: string) => {
    const error = await deleteProject(id);
    if (error) {
      notify.error("Failed to delete project", { duration: 2 });
      console.error("Error deleting project:", error);
      return;
    }
    notify.success("Project deleted successfully!", { duration: 1 });
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const editProject = async (
    id: string,
    fields: Omit<UpdateProjectPayload, "id">,
  ) => {
    if ("title" in fields) {
      const cleanTitle = fields.title.trim();

      if (!cleanTitle) {
        notify.notification.error(
          "Project title cannot be empty",
          "Please enter a valid title",
          "empty-project-title-error",
        );
        return false;
      }
    }
    setActionLoading(true);
    const error = await updateProject({
      id,
      ...fields,
    });
    if (error) {
      notify.error("Failed to update project", { duration: 2 });
      console.error("Failed to update project: ", error);
      setActionLoading(false);
      return false;
    }
    notify.success("Project updated successfully", { duration: 1 });
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              ...fields,
            }
          : project,
      ),
    );
    setActionLoading(false);
    return true;
  };

  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id) ?? null;
  };

  return {
    projects,
    actionLoading,
    initialLoading,
    addProject,
    removeProject,
    editProject,
    getProjectById,
  };
};

export default useProjects;

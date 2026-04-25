import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import { createProject, deleteProject, getProjects } from "../api/project";
import { useAuth } from "../context/AuthContext";

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      setLoading(true);
      const [data, error] = await getProjects(user.id);
      if (error) {
        setError("Failed to load projects");
        setLoading(false);
        return;
      }
      setProjects(data as Project[]);
      setLoading(false);
    };
    fetchProjects();
  }, [user]);

  const addProject = async (title: string, color: string | null) => {
    if (!user) return;

    const cleanTitle = title.trim();

    if (!cleanTitle) return setError("Project title cannot be empty");

    setLoading(true);
    const [data, error] = await createProject(cleanTitle, color, user.id);
    if (error) {
      setError("Failed to create project");
      setLoading(false);
      return;
    }
    setProjects((prev) => [data as Project, ...prev]);
    setLoading(false);
  };

  const removeProject = async (id: string) => {
    const error = await deleteProject(id);
    if (error) {
      setError("Failed to delete project");
      return;
    }
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return { projects, loading, error, addProject, removeProject };
};

export default useProjects;

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDoneTasks } from "../api/task";
import useNotify from "./useNotify";
import type { Task } from "../types/task";

const useDoneTasks = () => {
  const { user } = useAuth();
  const notify = useNotify();
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchDoneTasks = async () => {
      setInitialLoading(true);
      const [data, error] = await getDoneTasks(user.id);
      if (error) {
        notify.notification.error(
          "Failed to load tasks",
          "Please try again or check console for more details",
          "fetch-tasks-error",
        );
        console.error("Error fetching tasks:", error);
        setInitialLoading(false);
        return;
      }
      setDoneTasks(data as Task[]);
      setInitialLoading(false);
    };
    fetchDoneTasks();
  }, [user]);

  return { doneTasks, initialLoading };
};

export default useDoneTasks;

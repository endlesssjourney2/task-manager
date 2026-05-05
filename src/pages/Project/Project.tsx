import { useParams } from "react-router";
import s from "./Project.module.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import useTasks from "../../hooks/useTasks";
import { useState } from "react";
import TasksModal from "./components/TasksModal/TasksModal";
import type { Priority } from "../../types/task";

const Project = () => {
  const { id } = useParams();
  const { tasks, addTask, removeTask, actionLoading } = useTasks(id);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = async (
    title: string,
    description: string,
    priority: Priority,
    date: string | null,
  ) => {
    const result = await addTask(title, description, priority, date);
    if (result) setModalOpen(false);
    return result;
  };

  return (
    <div className={s.project}>
      <CustomHeader title="Your tasks" />
      <div className={s.content}>
        <div className={s.addNew}>Add a new task for your project here</div>
        <button onClick={handleOpenModal}>OPEN</button>
      </div>
      {tasks.map((t) => (
        <div className={s.test}>
          <div>{t.title}</div>
          <div>{t.description}</div>
          <div>{t.due_date}</div>
          <div>{t.priority}</div>
          <button onClick={() => removeTask(t.id)}>Delete</button>
        </div>
      ))}
      <TasksModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        handleCreateTask={handleAddTask}
        loading={actionLoading}
      />
    </div>
  );
};

export default Project;

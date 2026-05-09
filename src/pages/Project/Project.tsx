import { useParams } from "react-router";
import s from "./Project.module.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import useTasks from "../../hooks/useTasks";
import { useState } from "react";
import TasksModal from "./components/TasksModal/TasksModal";
import type { Priority } from "../../types/task";
import TasksList from "./components/TasksList/TasksList";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Project = () => {
  const { id } = useParams();
  const { tasks, addTask, removeTask, actionLoading, editTask } = useTasks(id);
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
      <div className={s.header}>
        <span className={s.headerTitle}>Add new task for your project</span>
        <Button
          onClick={handleOpenModal}
          icon={<PlusOutlined />}
          type="primary"
          shape="round"
        />
      </div>
      <div className={s.content}>
        <TasksList tasks={tasks} removeTask={removeTask} editTask={editTask} />
        <TasksModal
          modalOpen={modalOpen}
          handleCloseModal={handleCloseModal}
          handleCreateTask={handleAddTask}
          loading={actionLoading}
        />
      </div>
    </div>
  );
};

export default Project;

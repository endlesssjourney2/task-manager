import { useParams } from "react-router";
import s from "./Project.module.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import useTasks from "../../hooks/useTasks";
import { useState } from "react";
import TasksModal from "./components/TasksModal/TasksModal";
import type { Priority, Task, UpdateTaskPayload } from "../../types/task";
import TasksList from "./components/TasksList/TasksList";
import { Button, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import EditModal from "./components/EditModal/EditModal";
import usePaginate from "../../hooks/usePaginate";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Project = () => {
  const { id } = useParams();
  const {
    tasks,
    addTask,
    removeTask,
    actionLoading,
    editTask,
    initialLoading,
  } = useTasks(id);

  const { paginatedItems, page, setPage, safeItemsPerPage, pageCount } =
    usePaginate({
      items: tasks,
      itemsPerPage: 5,
    });

  const [addModalOpen, setAddModalOpen] = useState(false);
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

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddTask = async (
    title: string,
    description: string,
    priority: Priority,
    date: string | null,
  ) => {
    const result = await addTask(title, description, priority, date);
    if (result) setAddModalOpen(false);
    return result;
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
      <CustomHeader title="Your tasks" />
      <div className={s.header}>
        <span className={s.headerTitle}>Add new task for your project</span>
        <Button
          onClick={handleOpenAddModal}
          icon={<PlusOutlined />}
          type="primary"
          shape="round"
        />
      </div>
      <div className={s.content}>
        {pageCount > 1 && (
          <CustomPagination
            current={page}
            total={tasks.length}
            pageSize={safeItemsPerPage}
            onChange={(newPage) => setPage(newPage)}
          />
        )}
        <TasksList
          tasks={paginatedItems}
          removeTask={removeTask}
          editTask={editTask}
          handleOpenModal={handleOpenEditModal}
        />
        <TasksModal
          modalOpen={addModalOpen}
          handleCloseModal={handleCloseAddModal}
          handleCreateTask={handleAddTask}
          loading={actionLoading}
        />
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

export default Project;

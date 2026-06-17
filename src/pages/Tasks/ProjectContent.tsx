import s from "./Project.module.css";
import { useState, type FC } from "react";
import TasksModal from "../../features/tasks/components/TasksModal/TasksModal";
import TasksList from "../../features/tasks/components/TasksList/TasksList";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EditModal from "../../features/tasks/components/EditModal/EditModal";
import CustomFiltration from "../../features/tasks/components/CustomFiltration/CustomFiltration";
import HeaderProject from "../../features/tasks/components/HeaderProject/HeaderProject";
import { useProjectsContext } from "../../context/ProjectsContext";
import useSelect from "../../hooks/useSelect";
import useSearch from "../../hooks/useSearch";
import usePaginate from "../../hooks/usePaginate";
import type { Priority, Task, UpdateTaskPayload } from "../../types/task";
import EmptyState from "../../components/EmptyState/EmptyState";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import { useProjectTasksContext } from "../../context/ProjectTasksContext";

type Props = {
  projectId: string;
};

const ProjectContent: FC<Props> = ({ projectId }) => {
  const {
    tasks,
    addTask,
    removeTask,
    actionLoading,
    editTask,
    initialLoading,
  } = useProjectTasksContext();

  const { getProjectById, editProject } = useProjectsContext();

  const {
    select: priority,
    setSelect: setPriority,
    filteredSelect: filteredTasksByPriority,
  } = useSelect(tasks, "priority");

  const {
    select: status,
    setSelect: setStatus,
    filteredSelect: filteredTasksByStatus,
  } = useSelect(filteredTasksByPriority, "status");

  const {
    search,
    setSearch,
    filteredItems: filteredTasks,
  } = useSearch(filteredTasksByStatus, ["title", "description"], 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { paginatedItems, page, setPage, safeItemsPerPage, pageCount } =
    usePaginate({
      items: filteredTasks,
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
    const result = await addTask(projectId, title, description, priority, date);
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
      {tasks.length === 0 && (
        <EmptyState
          handleOpenAddModal={handleOpenAddModal}
          description="No tasks yet"
          buttonText="Add your first task now"
        />
      )}

      <div className={s.content}>
        {pageCount > 1 && (
          <CustomPagination
            current={page}
            total={filteredTasks.length}
            pageSize={safeItemsPerPage}
            onChange={(newPage) => setPage(newPage)}
          />
        )}

        {tasks.length > 0 && (
          <div className={s.search}>
            <CustomFiltration
              priority={priority}
              setPriority={setPriority}
              status={status}
              setStatus={setStatus}
            />
            <CustomSearch
              value={search}
              handleSearch={handleSearch}
              placeholder="Search tasks..."
            />
          </div>
        )}

        <TasksList
          tasks={paginatedItems}
          removeTask={removeTask}
          // editTask={editTask}
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

export default ProjectContent;

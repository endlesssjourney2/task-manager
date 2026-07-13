import { Button, Divider, Layout } from "antd";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Sidebar.module.css";
import {
  ArrowRightOutlined,
  CloseOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProjectsContext } from "../../context/ProjectsContext";
import AddModalProject from "../components/AddModalProject/AddModalProject";
import AddModalTask from "../components/AddModalTask/AddModalTask";
import SidebarSkeleton from "./components/SidebarSkeleton/SidebarSkeleton";
import SidebarProfile from "./components/SidebarProfile/SidebarProfile";
import ProjectsList from "./components/ProjectsList/ProjectsList";
import { IconCalendarClock, IconCircleCheck } from "@tabler/icons-react";

const { Sider } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: FC<Props> = ({ collapsed, setCollapsed }) => {
  const { projects, addProject, actionLoading, removeProject, initialLoading } =
    useProjectsContext();

  const navigate = useNavigate();

  const projectsLength = projects.length;

  const handleNavigateProjects = () => {
    navigate("/app");
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("collapsed", String(next));
      return next;
    });
  };

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(() => {
    return localStorage.getItem("showProjects") === "true";
  });

  const toggleProjects = () => {
    setShowProjects((prev) => {
      const next = !prev;
      localStorage.setItem("showProjects", String(next));
      return next;
    });
  };

  const handleAddProject = async (
    title: string,
    color: string,
  ): Promise<boolean> => {
    const result = await addProject(title, color);
    if (result) {
      setAddModalOpen(false);
    }
    return result;
  };

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  const handleOpenAddTaskModal = () => {
    setAddTaskModalOpen(true);
  };

  const handleCloseAddTaskModal = () => {
    setAddTaskModalOpen(false);
  };

  return (
    <>
      <Button
        className={`${s.toggleBtn} ${collapsed ? s.toggleBtnCollapsed : ""}`}
        onClick={toggleSidebar}
        icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
      />
      <Sider
        className={s.sider}
        collapsible
        collapsed={collapsed}
        width={250}
        collapsedWidth={0}
        trigger={null}
      >
        <div className={`${s.content} ${collapsed ? s.contentHidden : ""}`}>
          {initialLoading ? (
            <SidebarSkeleton />
          ) : (
            <>
              <div className={s.header}>
                <SidebarProfile />
              </div>
              <div className={s.addTask} onClick={handleOpenAddTaskModal}>
                <span className={s.addTaskTitle}>Add task</span>
                <PlusOutlined
                  style={{
                    color: "#fdad1c",
                    fontSize: "16px",
                    fontWeight: 800,
                  }}
                />
              </div>
              <div
                onClick={handleNavigateProjects}
                className={s.projectsHeader}
              >
                <div className={s.left}>
                  <h2 className={s.projectsTitle}>Projects</h2>
                </div>
                <div className={s.right}>
                  <div className={s.actionButtons}>
                    <Button
                      size="small"
                      icon={
                        <ArrowRightOutlined
                          className={`${s.arrow} ${showProjects ? s.arrowOpen : ""}`}
                        />
                      }
                      type="text"
                      shape="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProjects();
                      }}
                    />
                    <Button
                      size="small"
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAddModal();
                      }}
                    />
                  </div>
                  <span className={s.projectsInfo}>{projectsLength}</span>
                </div>
              </div>
              {showProjects && (
                <div className={s.projects}>
                  <ProjectsList
                    projects={projects}
                    removeProject={removeProject}
                  />
                </div>
              )}
              <Divider />

              <div
                onClick={() => navigate("/app/today")}
                className={s.todayTasks}
              >
                <span className={s.title}>Today's tasks</span>
                <IconCalendarClock stroke={1.3} />
              </div>

              <div
                onClick={() => navigate("/app/done")}
                className={s.doneTasks}
              >
                <span className={s.title}>Done tasks </span>
                <IconCircleCheck stroke={1.3} />
              </div>
            </>
          )}
        </div>

        <AddModalTask
          modalOpen={addTaskModalOpen}
          handleClose={handleCloseAddTaskModal}
        />
        <AddModalProject
          modalOpen={addModalOpen}
          handleCloseModal={handleCloseAddModal}
          handleCreateProject={handleAddProject}
          loading={actionLoading}
        />
      </Sider>
    </>
  );
};

export default Sidebar;

import { Button, Layout } from "antd";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Sidebar.module.css";
import {
  ArrowRightOutlined,
  CloseOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddModalProject from "../Project/components/AddModalProject/AddModalProject";
import { useProjectsContext } from "../../context/ProjectsContext";
import ProjectsList from "./components/ProjectsList/ProjectsList";

const { Sider } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: FC<Props> = ({ collapsed, setCollapsed }) => {
  const { projects, addProject, actionLoading, removeProject } =
    useProjectsContext();

  const navigate = useNavigate();

  const projectsLength = projects.length;

  const handleNavigateProjects = () => {
    navigate("/");
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const handleAddProject = async (
    title: string,
    color: string,
  ): Promise<boolean> => {
    const result = await addProject(title, color);
    if (result) {
      setModalOpen(false);
    }
    return result;
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button
        className={`${s.toggleBtn} ${collapsed ? s.toggleBtnCollapsed : ""}`}
        onClick={() => setCollapsed((prev) => !prev)}
        icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
      />
      <Sider
        className={s.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        collapsedWidth={0}
        trigger={null}
      >
        <div className={`${s.content} ${collapsed ? s.contentHidden : ""}`}>
          <div className={s.header}>
            <h1 className={s.heading}>heading</h1>
          </div>
          <div onClick={handleNavigateProjects} className={s.projectsHeader}>
            <div className={s.left}>
              <h2 className={s.projectsTitle}>My projects</h2>
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
                    setShowProjects((prev) => !prev);
                  }}
                />
                <Button
                  size="small"
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal();
                  }}
                />
              </div>
              <span className={s.projectsInfo}>{projectsLength}</span>
            </div>
          </div>
          <div className={s.projects}>
            {showProjects && (
              <ProjectsList projects={projects} removeProject={removeProject} />
            )}
          </div>
        </div>
        <AddModalProject
          modalOpen={modalOpen}
          handleCloseModal={handleCloseModal}
          handleCreateProject={handleAddProject}
          loading={actionLoading}
        />
      </Sider>
    </>
  );
};

export default Sidebar;

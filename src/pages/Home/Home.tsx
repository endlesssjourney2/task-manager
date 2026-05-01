import { useState } from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import useProjects from "../../hooks/useProjects";
import s from "./Home.module.css";
import { Button, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ProjectList from "./components/ProjectList/ProjectList";
import CustomModal from "./components/CustomModal/CustomModal";

const Home = () => {
  const { projects, addProject, removeProject, initialLoading, actionLoading } =
    useProjects();

  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateProject = async (title: string, color: string) => {
    await addProject(title, color);
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (initialLoading)
    return (
      <div className={s.home}>
        <div className={s.loading}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
        </div>
      </div>
    );

  return (
    <div className={s.home}>
      <CustomHeader title="Home page" />
      <div className={s.header}>
        <div className={s.headerLeft}>
          <span className={s.headerText}>Create a new project</span>
        </div>
        <div className={s.headerRight}>
          <Button
            onClick={handleOpenModal}
            icon={<PlusOutlined />}
            type="primary"
            shape="round"
          />
        </div>
      </div>
      <div className={s.content}>
        <ProjectList projects={projects} removeProject={removeProject} />
      </div>
      <CustomModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        handleCreateProject={handleCreateProject}
        loading={actionLoading}
      />
    </div>
  );
};

export default Home;

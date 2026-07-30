import React, { useMemo, useState } from "react";
import s from "./Home.module.css";
import { Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useProjectsContext } from "../../context/ProjectsContext";
import useSearch from "../../hooks/useSearch";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import AddModalProject from "../../features/components/AddModalProject/AddModalProject";
import EmptyState from "../../features/components/EmptyState/EmptyState";
import ProjectList from "../../features/project/components/ProjectList/ProjectList";
import Empty from "../../../images/emptyProject.svg";
import EmptySearch from "../../../images/emptySearch.svg";

const Home = () => {
  const { projects, addProject, initialLoading, actionLoading } =
    useProjectsContext();

  const {
    filteredItems: filteredProjects,
    search,
    setSearch,
  } = useSearch(projects, ["title"], 300);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCreateProject = async (title: string, color: string) => {
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

  const handleClearSearch = () => {
    setSearch("");
  };

  const projectsLength = useMemo(() => {
    return filteredProjects.length === 1
      ? "1 project"
      : `${filteredProjects.length} projects`;
  }, [filteredProjects]);

  if (initialLoading)
    return (
      <div className={s.loading}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      </div>
    );

  return (
    <div className={s.home}>
      <CustomHeader title="My Projects" />
      {projects.length === 0 ? (
        <EmptyState
          action={{ btnText: "Add now", onClick: handleOpenModal }}
          description="No projects yet"
          image={Empty}
        />
      ) : (
        <>
          <div className={s.header}>
            <div className={s.headerLeft}>
              <div className={s.search}>
                <CustomSearch
                  handleClear={handleClearSearch}
                  value={search}
                  handleSearch={handleSearch}
                  placeholder="Search projects..."
                />
              </div>
            </div>
            <button className={s.headerRight} onClick={handleOpenModal}>
              <span className={s.text}>Add</span>
              <PlusOutlined />
            </button>
          </div>

          <div className={s.content}>
            <div className={s.top}>
              <span className={s.length}>{projectsLength}</span>
            </div>
            <div className={s.bottom}>
              {filteredProjects.length > 0 ? (
                <ProjectList projects={filteredProjects} />
              ) : (
                <EmptyState
                  description="No projects found"
                  image={EmptySearch}
                />
              )}
            </div>
          </div>
        </>
      )}

      <AddModalProject
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        handleCreateProject={handleCreateProject}
        loading={actionLoading}
      />
    </div>
  );
};

export default Home;

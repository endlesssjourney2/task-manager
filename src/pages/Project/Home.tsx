import React, { useState } from "react";
import s from "./Home.module.css";
import { Button, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ProjectList from "../../features/project/components/ProjectList/ProjectList";
import { useProjectsContext } from "../../context/ProjectsContext";
import useSearch from "../../hooks/useSearch";
import usePaginate from "../../hooks/usePaginate";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import EmptyState from "../../components/EmptyState/EmptyState";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import AddModalProject from "../../features/components/AddModalProject/AddModalProject";

const Home = () => {
  const { projects, addProject, removeProject, initialLoading, actionLoading } =
    useProjectsContext();

  const {
    filteredItems: filteredProjects,
    search,
    setSearch,
  } = useSearch(projects, ["title"]);

  const { page, paginatedItems, setPage, safeItemsPerPage, pageCount } =
    usePaginate({
      items: filteredProjects,
      itemsPerPage: 10,
    });

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
      {projects.length === 0 ? (
        <EmptyState
          handleOpenAddModal={handleOpenModal}
          description="No projects yet"
          buttonText="Add your first project now"
        />
      ) : (
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
      )}

      <div className={s.content}>
        {pageCount > 1 && (
          <CustomPagination
            current={page}
            total={filteredProjects.length}
            pageSize={safeItemsPerPage}
            onChange={(newPage) => setPage(newPage)}
          />
        )}
        {projects.length > 0 && (
          <div className={s.search}>
            <CustomSearch
              value={search}
              handleSearch={handleSearch}
              placeholder="Search projects..."
            />
          </div>
        )}

        <ProjectList projects={paginatedItems} removeProject={removeProject} />
      </div>
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

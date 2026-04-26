import { useState } from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import useProjects from "../../hooks/useProjects";
import s from "./Home.module.css";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Home = () => {
  const { addProject } = useProjects();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateProject = async () => {
    await addProject(title, color);
    setTitle("");
    setColor("#000000");
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTitle("");
    setColor("#000000");
  };

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
            shape="circle"
          />
        </div>
      </div>
      <div className={s.content}></div>
      {modalOpen && (
        <Modal
          title="Add new project"
          closable={{ "aria-label": "Custom Close Button" }}
          open={modalOpen}
          onCancel={handleCloseModal}
          onOk={handleCreateProject}
        >
          <div className={s.modalContent}>
            <input
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;

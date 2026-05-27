import { Button, Layout } from "antd";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Sidebar.module.css";
import {
  ArrowDownOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import type { Project } from "../../types/project";

const { Sider } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  projects: Project[];
};

const Sidebar: FC<Props> = ({ collapsed, setCollapsed, projects }) => {
  const navigate = useNavigate();

  const projectsLength = projects.length;

  const handleNavigateProjects = () => {
    navigate("/");
  };

  const [showProjects, setShowProjects] = useState(false);

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
              <Button
                icon={<ArrowDownOutlined />}
                type="default"
                shape="default"
                onClick={() => setShowProjects((prev) => !prev)}
              />
              <span className={s.projectsInfo}>{projectsLength}</span>
            </div>
          </div>
          <div className={s.projects}>
            {showProjects && (
              <ul>
                {projects.map((p) => (
                  <li
                    style={{ cursor: "pointer" }}
                    key={p.created_at}
                    onClick={() => navigate(`/project/${p.id}`)}
                  >
                    <p>{p.title}</p>
                    <div style={{ background: `${p.color}` }}></div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;

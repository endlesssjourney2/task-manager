import { Outlet } from "react-router-dom";
import Sidebar from "../features/Sidebar/Sidebar";
import { useState } from "react";
import { Layout } from "antd";
import { ProfileProvider } from "../context/ProfileContext";
import { ProjectsProvider } from "../context/ProjectsContext";
import { TasksProvider } from "../context/TasksContext";

const { Content } = Layout;

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("collapsed") === "true";
  });

  return (
    <ProfileProvider>
      <ProjectsProvider>
        <TasksProvider>
          <Layout>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
              <Content>
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </TasksProvider>
      </ProjectsProvider>
    </ProfileProvider>
  );
};

export default RootLayout;

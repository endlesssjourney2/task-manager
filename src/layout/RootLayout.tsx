import { Outlet } from "react-router-dom";
import Sidebar from "../features/Sidebar/Sidebar";
import { useState } from "react";
import { Layout } from "antd";
import { useProjectsContext } from "../context/ProjectsContext";

const { Content } = Layout;

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { projects } = useProjectsContext();

  return (
    <Layout>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        projects={projects}
      />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppComponent from "./AppComponent.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { App, ConfigProvider, theme } from "antd";
import { ProjectsProvider } from "./context/ProjectsContext.tsx";
import { ProfileProvider } from "./context/ProfileContext.tsx";
import { TasksProvider } from "./context/TasksContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgElevated: "#21262d",
            colorBgContainer: "#0c1117",
            colorBorder: "#3e444d",
            colorText: "#f0f6fc",
            colorTextPlaceholder: "#9298a1",
            colorPrimary: "#0067f8ff",
            borderRadius: 12,
            padding: 15,
          },
          components: {
            Modal: {
              contentBg: "#21262d",
              titleColor: "#f0f6fc",
            },
            Layout: {
              siderBg: "#262626",
            },
          },
        }}
      >
        <App>
          <ProfileProvider>
            <ProjectsProvider>
              <TasksProvider>
                <AppComponent />
              </TasksProvider>
            </ProjectsProvider>
          </ProfileProvider>
        </App>
      </ConfigProvider>
    </AuthProvider>
  </StrictMode>,
);

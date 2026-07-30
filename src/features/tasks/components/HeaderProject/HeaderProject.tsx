import type { FC } from "react";
import s from "./HeaderProject.module.css";
import { ConfigProvider, Typography } from "antd";

type Props = {
  title: string;
  renameProject: (newTitle: string) => void;
};

const HeaderProject: FC<Props> = ({ title, renameProject }) => {
  return (
    <div className={s.header}>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorBgContainer: "transparent",
              colorBorder: "transparent",
              activeBorderColor: "transparent",
              hoverBorderColor: "transparent",
            },
          },
        }}
      >
        <Typography.Title
          className={s.title}
          level={2}
          editable={{
            onChange: renameProject,
            triggerType: ["text"],
            tooltip: "Click to rename project",
          }}
        >
          {title}
        </Typography.Title>
      </ConfigProvider>
    </div>
  );
};

export default HeaderProject;

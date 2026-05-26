import { Button, Layout } from "antd";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.css";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

const { Sider } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: FC<Props> = ({ collapsed, setCollapsed }) => {
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
        <div className={s.content}>
          <Link to={"/"}>Home</Link>
          <Link to={"signin"}>Sign In</Link>
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;

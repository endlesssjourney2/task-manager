import { Skeleton } from "antd";
import s from "./SidebarSkeleton.module.css";

const SidebarSkeleton = () => {
  return (
    <div className={s.container}>
      <div className={s.profile}>
        <Skeleton.Avatar active size="default" />
        <Skeleton.Input
          active
          size="small"
          style={{ width: 120, height: 20 }}
        />
      </div>

      <div className={s.projects}>
        <div className={s.header}>
          <Skeleton.Input active size="small" style={{ width: 90 }} />
          <Skeleton.Button active shape="round" size="small" />
        </div>

        <div className={s.list}>
          <Skeleton.Input
            active
            size="small"
            style={{ width: 220, height: 20 }}
          />
          <Skeleton.Input
            active
            size="small"
            style={{ width: 220, height: 20 }}
          />
          <Skeleton.Input
            active
            size="small"
            style={{ width: 220, height: 20 }}
          />
          <Skeleton.Input
            active
            size="small"
            style={{ width: 220, height: 20 }}
          />
          <Skeleton.Input
            active
            size="small"
            style={{ width: 220, height: 20 }}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;

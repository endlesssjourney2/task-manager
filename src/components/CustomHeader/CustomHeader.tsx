import type { FC } from "react";
import s from "./CustomHeader.module.css";
type Props = {
  title: string;
};

const CustomHeader: FC<Props> = ({ title }) => {
  return (
    <div className={s.header}>
      <h2 className={s.title}>{title}</h2>
    </div>
  );
};

export default CustomHeader;

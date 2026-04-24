import type { FC } from "react";
import s from "./Header.module.css";

type Props = {
  title: string;
};

const Header: FC<Props> = ({ title }) => {
  return (
    <div className={s.header}>
      <h2 className={s.title}>{title}</h2>
    </div>
  );
};

export default Header;

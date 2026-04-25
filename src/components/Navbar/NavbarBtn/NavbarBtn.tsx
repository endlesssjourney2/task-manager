import type { FC } from "react";
import s from "./NavbarBtn.module.css";

type Props = {
  text: string;
  onClick: () => void;
};

const NavbarBtn: FC<Props> = ({ text, onClick }) => {
  return (
    <button className={s.navbarBtn} onClick={onClick}>
      {text}
    </button>
  );
};

export default NavbarBtn;

import s from "./EmptyState.module.css";
import type { FC } from "react";
import { IconPlus } from "@tabler/icons-react";

type BtnProps = {
  btnText: string;
  onClick: () => void;
};

type Props = {
  description?: string;
  action?: BtnProps;
  image: string;
};

const EmptyState: FC<Props> = ({ action, description, image }) => {
  return (
    <div className={s.empty}>
      <img src={image} className={s.image} />
      {description && <span className={s.description}>{description}</span>}
      {action && (
        <button className={s.btn} onClick={action.onClick}>
          <span className={s.btnText}>{action.btnText}</span>
          <IconPlus size={16} />
        </button>
      )}
    </div>
  );
};

export default EmptyState;

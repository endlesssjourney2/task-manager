import { Button, Empty } from "antd";
import s from "./EmptyState.module.css";
import type { FC } from "react";

type Props = {
  handleOpenAddModal: () => void;
  description?: string;
  buttonText?: string;
};

const EmptyState: FC<Props> = ({
  handleOpenAddModal,
  buttonText,
  description,
}) => {
  return (
    <div className={s.empty}>
      <Empty
        image={<img src="../../images/empty.svg" />}
        description={description}
      >
        <Button type="primary" onClick={handleOpenAddModal}>
          {buttonText}
        </Button>
      </Empty>
    </div>
  );
};

export default EmptyState;

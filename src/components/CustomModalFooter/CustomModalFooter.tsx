import s from "./CustomModalFooter.module.css";
import { Button } from "antd";

type Props = {
  handleCloseModal: () => void;
  handleAction: () => void;
  handleOk: () => Promise<void>;
  loading?: boolean;
  clearText?: string;
  addText?: string;
};

const CustomModalFooter = ({
  handleCloseModal,
  handleAction,
  handleOk,
  loading,
  clearText,
  addText,
}: Props) => {
  return (
    <div className={s.footerModalContainer}>
      <div className={s.left}>
        <Button onClick={handleCloseModal} disabled={loading} className={s.btn}>
          Cancel
        </Button>
        <Button onClick={handleAction} disabled={loading} className={s.btn}>
          {clearText || "Clear"}
        </Button>
      </div>
      <div className={s.right}>
        <Button
          type="primary"
          onClick={handleOk}
          loading={loading}
          className={s.btn}
        >
          {addText || "Add"}
        </Button>
      </div>
    </div>
  );
};

export default CustomModalFooter;

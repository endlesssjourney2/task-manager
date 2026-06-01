import { Select } from "antd";
import s from "./CustomFiltration.module.css";

import type { Dispatch, FC, SetStateAction } from "react";
import { DashOutlined } from "@ant-design/icons";
import { PRIORITY_OPTIONS } from "../../../../constants/priority";
import { STATUS_OPTIONS } from "../../../../constants/status";

type Props = {
  priority: string;
  setPriority: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

const CustomFiltration: FC<Props> = ({
  priority,
  setPriority,
  status,
  setStatus,
}) => {
  return (
    <div className={s.selectContainer}>
      <Select
        size="large"
        suffixIcon={<DashOutlined />}
        placement="topLeft"
        defaultValue={priority}
        className={s.select}
        value={priority}
        onChange={setPriority}
        options={[
          {
            label: (
              <div className={s.labelContainer}>
                <span className={s.selectLabel}>Priority</span>
              </div>
            ),
            options: [{ value: "all", label: "All" }, ...PRIORITY_OPTIONS],
          },
        ]}
      />
      <Select
        size="large"
        suffixIcon={<DashOutlined />}
        placement="topLeft"
        defaultValue={status}
        className={s.select}
        value={status}
        onChange={setStatus}
        options={[
          {
            label: (
              <div className={s.labelContainer}>
                <span className={s.selectLabel}>Status</span>
              </div>
            ),
            options: [{ value: "all", label: "All" }, ...STATUS_OPTIONS],
          },
        ]}
      />
    </div>
  );
};

export default CustomFiltration;

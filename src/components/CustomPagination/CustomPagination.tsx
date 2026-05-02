import { Pagination } from "antd";
import type { FC } from "react";
import s from "./CustomPagination.module.css";

type Props = {
  total: number;
  onChange: (page: number) => void;
  current: number;
  pageSize?: number;
};

const CustomPagination: FC<Props> = ({
  current,
  onChange,
  total,
  pageSize = 6,
}) => {
  return (
    <div className={s.paginationCont}>
      <Pagination
        className={s.pagination}
        align="center"
        total={total}
        onChange={onChange}
        current={current}
        pageSize={pageSize}
      />
    </div>
  );
};

export default CustomPagination;

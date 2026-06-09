import { Input } from "antd";
import s from "./CustomSearch.module.css";
import type { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";

type Props = {
  value: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement, Element>) => void;
  placeholder?: string;
  handleClear?: () => void;
};

const CustomSearch: FC<Props> = ({
  value,
  handleSearch,
  placeholder,
  handleClear,
}) => {
  return (
    <div className={s.searchContainer}>
      <Input
        suffix={
          <CloseOutlined
            onClick={handleClear}
            style={{ visibility: value ? "visible" : "hidden" }}
          />
        }
        className={s.input}
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
};

export default CustomSearch;

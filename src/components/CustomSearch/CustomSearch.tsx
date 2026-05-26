import { Input } from "antd";
import s from "./CustomSearch.module.css";
import type { FC } from "react";

type Props = {
  value: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement, Element>) => void;
  placeholder?: string;
};

const CustomSearch: FC<Props> = ({ value, handleSearch, placeholder }) => {
  return (
    <div className={s.searchContainer}>
      <Input
        className={s.input}
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
};

export default CustomSearch;

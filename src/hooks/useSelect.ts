import { useMemo, useState } from "react";

const useSelect = <T>(items: T[], key: keyof T) => {
  const [select, setSelect] = useState("all");

  const filteredSelect = useMemo(
    () =>
      select === "all"
        ? items
        : items.filter((item) => String(item[key]) === select),
    [items, select],
  );

  return { select, setSelect, filteredSelect };
};

export default useSelect;

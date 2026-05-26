import { useMemo, useState } from "react";

const useSearch = <T>(items: T[], keys: (keyof T)[]) => {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(
    () =>
      search.length
        ? items.filter((item) =>
            keys.some((key) =>
              String(item[key]).toLowerCase().includes(search.toLowerCase()),
            ),
          )
        : items,
    [items, search],
  );

  return {
    search,
    setSearch,
    filteredItems,
  };
};

export default useSearch;

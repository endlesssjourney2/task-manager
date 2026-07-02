import { useEffect, useMemo, useState } from "react";

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useSearch = <T>(items: T[], keys: (keyof T)[], delay: number) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, delay);

  const filteredItems = useMemo(
    () =>
      debouncedSearch.length
        ? items.filter((item) =>
            keys.some((key) =>
              String(item[key])
                .toLowerCase()
                .trim()
                .includes(debouncedSearch.toLowerCase().trim()),
            ),
          )
        : items,
    [items, debouncedSearch],
  );

  return {
    search,
    setSearch,
    filteredItems,
  };
};

export default useSearch;

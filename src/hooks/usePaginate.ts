import { useEffect, useMemo, useState } from "react";

type Props<T> = {
  items: T[];
  itemsPerPage: number;
};

const usePaginate = <T>({ items, itemsPerPage }: Props<T>) => {
  const [page, setPage] = useState(1);

  const safeItemsPerPage = Math.max(1, itemsPerPage);

  const pageCount = Math.ceil(items.length / safeItemsPerPage);

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * safeItemsPerPage;
    const end = start + safeItemsPerPage;
    return items.slice(start, end);
  }, [page, items, safeItemsPerPage]);

  return { paginatedItems, page, setPage, pageCount, safeItemsPerPage };
};

export default usePaginate;

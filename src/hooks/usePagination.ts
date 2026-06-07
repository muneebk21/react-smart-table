import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [data, currentPage, itemsPerPage]);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const nextPage = () => goToPage(currentPage + 1);
    const previousPage = () => goToPage(currentPage - 1);

    return {
        paginatedData,
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        previousPage,
    };
}
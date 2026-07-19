import { useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(start, start + itemsPerPage);

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
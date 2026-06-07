import { useState, useMemo } from 'react';
import { type FilterConfig } from '../types';

export function useFilter<T>(data: T[]) {
    const [filters, setFilters] = useState<FilterConfig>({});

    const filteredData = useMemo(() => {
        if (Object.keys(filters).length === 0) return data;

        return data.filter((item) => {
            return Object.entries(filters).every(([key, filterValue]) => {
                if (!filterValue) return true;
                const itemValue = String(item[key as keyof T]).toLowerCase();
                return itemValue.includes(filterValue.toLowerCase());
            });
        });
    }, [data, filters]);

    const setFilter = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const clearFilters = () => {
        setFilters({});
    };

    return { filteredData, filters, setFilter, clearFilters };
}
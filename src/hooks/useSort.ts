import { useState } from 'react';
import { type SortConfig } from '../types';

export function useSort<T>(data: T[], initialSort?: SortConfig) {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSort || null);

    const sortedData = !sortConfig
        ? data
        : [...data].sort((a, b) => {
              const aVal = a[sortConfig.key as keyof T];
              const bVal = b[sortConfig.key as keyof T];

              if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
              if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
              return 0;
          });

    const requestSort = (key: string) => {
        setSortConfig((current) => {
            if (!current || current.key !== key) {
                return { key, direction: 'asc' };
            }
            if (current.direction === 'asc') {
                return { key, direction: 'desc' };
            }
            return null;
        });
    };

    return { sortedData, sortConfig, requestSort };
}
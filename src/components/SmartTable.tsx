import React from 'react';
import { type SmartTableProps } from '../types';
import { useSort } from '../hooks/useSort';
import { useFilter } from '../hooks/useFilter';
import { usePagination } from '../hooks/usePagination';
import { SmartTableHeader } from './SmartTableHeader';
import { SmartTableBody } from './SmartTableBody';

export function SmartTable<T extends Record<string, any>>({
    data,
    columns,
    sortable = true,
    filterable = true,
    pagination = false,
    itemsPerPage = 10,
    className = '',
    style,
    onRowClick,
    emptyMessage = 'No data available',
}: SmartTableProps<T>) {
    // Apply filters
    const { filteredData, filters, setFilter } = useFilter(data);

    // Apply sorting
    const { sortedData, sortConfig, requestSort } = useSort(filteredData);

    // Apply pagination
    const { paginatedData, currentPage, totalPages, goToPage, nextPage, previousPage } =
        usePagination(sortedData, pagination ? itemsPerPage : sortedData.length);

    const displayData = pagination ? paginatedData : sortedData;

    return (
        <div className={className} style={{ ...style, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <SmartTableHeader
                    columns={columns}
                    sortable={sortable}
                    sortConfig={sortConfig}
                    onSort={requestSort}
                    filterable={filterable}
                    filters={filters}
                    onFilter={setFilter}
                />
                <SmartTableBody
                    data={displayData}
                    columns={columns}
                    onRowClick={onRowClick}
                    emptyMessage={emptyMessage}
                />
            </table>

            {pagination && totalPages > 1 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '16px',
                    padding: '8px'
                }}>
                    <button
                        onClick={previousPage}
                        disabled={currentPage === 1}
                        style={{ padding: '8px 16px' }}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        style={{ padding: '8px 16px' }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
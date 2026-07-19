import { type SmartTableProps } from '../types';
import { resolveTableTheme } from '../theme';
import { SmartTableHeader } from './SmartTableHeader';
import { SmartTableBody } from './SmartTableBody';
import '../styles/smart-table.css';
import { useNormalizedColumns } from '../hooks/useNormalizedColumns';
import { useRef } from 'react';
import { useTableState } from '../hooks/useTableState';

function applySort<T extends Record<string, unknown>>(
    rows: T[],
    sort: { key: string | null; direction: 'asc' | 'desc' | null },
) {
    if (!sort.key || !sort.direction) return rows;
    return [...rows].sort((a, b) => {
        const aValue = a[sort.key as keyof T];
        const bValue = b[sort.key as keyof T];
        if (aValue === bValue) return 0;
        return sort.direction === 'asc'
            ? aValue > bValue
                ? 1
                : -1
            : aValue < bValue
                ? 1
                : -1;
    });
}

function applyFilters<T extends Record<string, unknown>>(
    rows: T[],
    filters: Record<string, string>,
) {
    const keys = Object.keys(filters);
    if (keys.length === 0) return rows;
    return rows.filter((row) =>
        keys.every((key) => {
            const filterValue = filters[key]?.toLowerCase();
            if (!filterValue) return true;
            return String(row[key as keyof T] ?? '')
                .toLowerCase()
                .includes(filterValue);
        }),
    );
}

export function SmartTable<T extends Record<string, unknown>>({
    data,
    columns,
    sortable = true,
    filterable = true,
    pagination = false,
    itemsPerPage = 10,
    theme,
    className = '',
    style,
    onRowClick,
    emptyMessage = 'No data available',
}: SmartTableProps<T>) {
    const columnKeys = columns.map((c) => String(c.key));
    const { state, dispatch } = useTableState(itemsPerPage, columnKeys);

    const tableWrapperRef = useRef<HTMLDivElement>(null);

    const filteredData = applyFilters(data, state.filters);
    const sortedData = applySort(filteredData, state.sort);

    const totalPages = pagination ? Math.ceil(sortedData.length / state.pagination.pageSize) : 1;

    const paginatedData = pagination
        ? sortedData.slice(
              (state.pagination.page - 1) * state.pagination.pageSize,
              state.pagination.page * state.pagination.pageSize,
          )
        : sortedData;

    const handleSort = (key: string) => dispatch({ type: 'SET_SORT', key });

    const handleFilter = (key: string, value: string) =>
        dispatch({ type: 'SET_FILTER', key, value });

    const nextPage = () =>
        dispatch({ type: 'SET_PAGE', page: Math.min(state.pagination.page + 1, totalPages) });

    const previousPage = () =>
        dispatch({ type: 'SET_PAGE', page: Math.max(state.pagination.page - 1, 1) });

    const { mode, cssVariables, hasCustomTokens } = resolveTableTheme(theme);
    const rootClassName = ['rst-root', className].filter(Boolean).join(' ');
    const normalizedColumns = useNormalizedColumns(columns);

    return (
        <div
            className={rootClassName}
            data-rst-theme={mode}
            style={{
                ...(hasCustomTokens ? cssVariables : undefined),
                ...style,
            }}
        >
            <div
                className="rst-table-wrapper"
                ref={tableWrapperRef}
                role="region"
                aria-label="Scrollable table"
                tabIndex={0}
            >
                <table className="rst-table">
                    <SmartTableHeader
                        columns={normalizedColumns}
                        sortable={sortable}
                        sortConfig={state.sort}
                        onSort={handleSort}
                        filterable={filterable}
                        filters={state.filters}
                        onFilter={handleFilter}
                        columnWidths={state.columnWidths}
                    />
                    <SmartTableBody
                        data={paginatedData}
                        columns={normalizedColumns}
                        onRowClick={onRowClick}
                        emptyMessage={emptyMessage}
                        columnWidths={state.columnWidths}
                    />
                </table>
            </div>

            {pagination && totalPages > 1 && (
                <div className="rst-pagination">
                    <span className="rst-pagination-info">
                        Page {state.pagination.page} of {totalPages}
                    </span>
                    <div className="rst-pagination-actions">
                        <button
                            type="button"
                            className="rst-btn"
                            onClick={previousPage}
                            disabled={state.pagination.page === 1}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="rst-btn"
                            onClick={nextPage}
                            disabled={state.pagination.page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

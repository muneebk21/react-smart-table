import { type SmartTableProps } from '../types';
import { resolveTableTheme } from '../theme';
import { SmartTableHeader } from './SmartTableHeader';
import { SmartTableBody } from './SmartTableBody';
import '../styles/smart-table.css';
import { useNormalizedColumns } from '../hooks/useNormalizedColumns';
import { useMemo } from 'react';
import { useTableState } from '../hooks/useTableState';

export function SmartTable<T extends Record<string, unknown>>({
    data,
    columns,
    sortable = true,
    filterable = true,
    pagination = false,
    resizeable = false,
    itemsPerPage = 10,
    theme,
    className = '',
    style,
    onRowClick,
    emptyMessage = 'No data available',
}: SmartTableProps<T>) {

    const columnKeys = useMemo(
        () => columns.map(c => String(c.key)),
        [columns]
    );

    const { state, dispatch } = useTableState(
        itemsPerPage,
        columnKeys
    );

    const applySort = (
        data: T[],
        sort: { key: string | null; direction: "asc" | "desc" | null }
    ) => {
        if (!sort.key || !sort.direction) return data;
        const sorted = [...data];
        sorted.sort((a, b) => {
            const aValue = a[sort.key as keyof T];
            const bValue = b[sort.key as keyof T];
            if (aValue === bValue) return 0;
            if (sort.direction === "asc") {
                return aValue > bValue ? 1 : -1;
            }
            return aValue < bValue ? 1 : -1;
        });
        return sorted;
    }

    const applyFilters = (
        data: T[],
        filters: Record<string, string>
    ) => {
        const keys = Object.keys(filters);
        if (keys.length === 0) return data;
        return data.filter((row) => {
            return keys.every((key) => {
                const filterValue = filters[key]?.toLowerCase();
                if (!filterValue) return true;
                const cellValue = String(row[key as keyof T] ?? "").toLowerCase();
                return cellValue.includes(filterValue);
            });
        });
    }

    const filteredData = useMemo(() => {
        return applyFilters(data, state.filters);
    }, [data, state.filters]);

    const sortedData = useMemo(() => {
        return applySort(filteredData, state.sort);
    }, [filteredData, state.sort]);

    const paginatedData = useMemo(() => {
        if (!pagination) return sortedData;
        const start =
            (state.pagination.page - 1) * state.pagination.pageSize;
        const end = start + state.pagination.pageSize;
        return sortedData.slice(start, end);
    }, [sortedData, state.pagination, pagination]);

    const totalPages = useMemo(() => {
        if (!pagination) return 1;
        return Math.ceil(sortedData.length / state.pagination.pageSize);
    }, [sortedData.length, state.pagination.pageSize, pagination]);

    const nextPage = () => {
        dispatch({
            type: "SET_PAGE",
            page: Math.min(state.pagination.page + 1, totalPages),
        });
    };

    const previousPage = () => {
        dispatch({
            type: "SET_PAGE",
            page: Math.max(state.pagination.page - 1, 1),
        });
    };


    const displayData = paginatedData;
    const { mode, cssVariables, hasCustomTokens } = resolveTableTheme(theme);
    const rootClassName = ['rst-root', className].filter(Boolean).join(' ');
    const normalizedColumns = useNormalizedColumns(columns);


    const startResize = (key: string, startX: number, startWidth: number) => {
        const onMouseMove = (e: MouseEvent) => {
            const newWidth = Math.max(80, startWidth + (e.clientX - startX));
            dispatch({
                type: "SET_COLUMN_WIDTH",
                key,
                width: newWidth,
            });
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div
            className={rootClassName}
            data-rst-theme={mode}
            style={{
                ...(hasCustomTokens ? cssVariables : undefined),
                ...style,
            }}
        >
            <div className="rst-table-wrapper">
                <table className="rst-table">
                    <SmartTableHeader
                        columns={normalizedColumns}
                        sortable={sortable}
                        sortConfig={state.sort}
                        onSort={(key) =>
                            dispatch({ type: "SET_SORT", key })
                        }
                        filterable={filterable}
                        filters={state.filters}
                        onFilter={(key, value) =>
                            dispatch({
                                type: "SET_FILTER",
                                key,
                                value,
                            })
                        }
                        columnWidths={state.columnWidths}
                        resizeable={resizeable}
                        startResize={startResize}
                    />
                    <SmartTableBody
                        data={displayData}
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

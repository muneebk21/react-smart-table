import { type RowId, type SmartTableProps } from '../types';
import { resolveTableTheme } from '../theme';
import { SmartTableHeader } from './SmartTableHeader';
import { SmartTableBody } from './SmartTableBody';
import '../styles/smart-table.css';
import { useNormalizedColumns } from '../hooks/useNormalizedColumns';
import { useRef } from 'react';
import { useTableState } from '../hooks/useTableState';

function defaultGetRowId<T>(row: T, index: number): RowId {
    const maybeId = (row as Record<string, unknown>)?.id;
    if (typeof maybeId === 'string' || typeof maybeId === 'number') return maybeId;
    return index;
}

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
    selectable = false,
    getRowId,
    onSelectionChange,
    renderBulkActions,
}: SmartTableProps<T>) {
    const { state, dispatch } = useTableState(itemsPerPage);

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

    const originalIndexByRow = new Map<T, number>();
    data.forEach((row, index) => originalIndexByRow.set(row, index));

    const resolveRowId = (row: T): RowId => {
        const index = originalIndexByRow.get(row) ?? -1;
        return getRowId ? getRowId(row, index) : defaultGetRowId(row, index);
    };

    const selectedRowIds = state.selectedRowIds;

    const emitSelectionChange = (nextIds: Set<RowId>) => {
        if (!onSelectionChange) return;
        const selectedRows = data.filter((row) => nextIds.has(resolveRowId(row)));
        onSelectionChange(Array.from(nextIds), selectedRows);
    };

    const toggleRow = (row: T) => {
        const id = resolveRowId(row);
        const next = new Set(selectedRowIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        dispatch({ type: 'TOGGLE_ROW_SELECTION', id });
        emitSelectionChange(next);
    };

    const pageRowIds = paginatedData.map((row) => resolveRowId(row));
    const allPageSelected = pageRowIds.length > 0 && pageRowIds.every((id) => selectedRowIds.has(id));
    const somePageSelected = pageRowIds.some((id) => selectedRowIds.has(id));

    const toggleAllOnPage = () => {
        const next = new Set(selectedRowIds);
        for (const id of pageRowIds) {
            if (allPageSelected) next.delete(id);
            else next.add(id);
        }
        dispatch({ type: 'TOGGLE_ALL_SELECTION', ids: pageRowIds });
        emitSelectionChange(next);
    };

    const clearSelection = () => {
        dispatch({ type: 'CLEAR_SELECTION' });
        emitSelectionChange(new Set());
    };

    const selectedRows = data.filter((row) => selectedRowIds.has(resolveRowId(row)));

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
            {selectable && selectedRowIds.size > 0 && (
                <div className="rst-bulk-toolbar">
                    <span className="rst-bulk-count">
                        {selectedRowIds.size} selected
                    </span>
                    <div className="rst-bulk-actions">
                        {renderBulkActions?.({
                            selectedRowIds: Array.from(selectedRowIds),
                            selectedRows,
                            clearSelection,
                        })}
                        <button
                            type="button"
                            className="rst-btn rst-btn--ghost"
                            onClick={clearSelection}
                        >
                            Clear selection
                        </button>
                    </div>
                </div>
            )}

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
                        selectable={selectable}
                        allSelected={allPageSelected}
                        someSelected={somePageSelected}
                        onToggleAll={toggleAllOnPage}
                    />
                    <SmartTableBody
                        data={paginatedData}
                        columns={normalizedColumns}
                        onRowClick={onRowClick}
                        emptyMessage={emptyMessage}
                        selectable={selectable}
                        isRowSelected={(row) => selectedRowIds.has(resolveRowId(row))}
                        onToggleRow={toggleRow}
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

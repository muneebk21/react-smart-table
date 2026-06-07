import { type SmartTableProps } from '../types';
import { useSort } from '../hooks/useSort';
import { useFilter } from '../hooks/useFilter';
import { usePagination } from '../hooks/usePagination';
import { resolveTableTheme } from '../theme';
import { SmartTableHeader } from './SmartTableHeader';
import { SmartTableBody } from './SmartTableBody';
import '../styles/smart-table.css';

export function SmartTable<T extends Record<string, any>>({
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
    const { filteredData, filters, setFilter } = useFilter(data);
    const { sortedData, sortConfig, requestSort } = useSort(filteredData);
    const { paginatedData, currentPage, totalPages, nextPage, previousPage } =
        usePagination(sortedData, pagination ? itemsPerPage : sortedData.length);

    const displayData = pagination ? paginatedData : sortedData;
    const { mode, cssVariables, hasCustomTokens } = resolveTableTheme(theme);
    const rootClassName = ['rst-root', className].filter(Boolean).join(' ');

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
            </div>

            {pagination && totalPages > 1 && (
                <div className="rst-pagination">
                    <span className="rst-pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="rst-pagination-actions">
                        <button
                            type="button"
                            className="rst-btn"
                            onClick={previousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="rst-btn"
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

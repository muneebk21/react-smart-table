import { type InternalColumn } from '../types';

interface SmartTableBodyProps<T> {
    data: T[];
    columns: InternalColumn<T>[];
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    columnWidths?: Record<string, number>;
}

function alignClass(align?: 'left' | 'center' | 'right') {
    return `rst-td--align-${align || 'left'}`;
}

function getColumnWidth<T>(
    column: InternalColumn<T>,
    columnWidths: Record<string, number>,
): number | undefined {
    const storedWidth = columnWidths[column.id];
    if (typeof storedWidth === 'number') return storedWidth;
    if (typeof column.width === 'number') return column.width;
    if (typeof column.width === 'string') {
        const parsed = Number.parseFloat(column.width);
        if (!Number.isNaN(parsed)) return parsed;
    }
    return undefined;
}

function EmptyIcon() {
    return (
        <svg
            className="rst-empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
            />
        </svg>
    );
}

export function SmartTableBody<T>({
    data,
    columns,
    onRowClick,
    emptyMessage = 'No data available',
    columnWidths = {},
}: SmartTableBodyProps<T>) {
    if (data.length === 0) {
        return (
            <tbody className="rst-tbody">
                <tr className="rst-tr">
                    <td className="rst-empty" colSpan={columns.length}>
                        <EmptyIcon />
                        {emptyMessage}
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="rst-tbody">
            {data.map((row, index) => (
                <tr
                    key={index}
                    className={['rst-tr', onRowClick ? 'rst-tr--clickable' : '']
                        .filter(Boolean)
                        .join(' ')}
                    onClick={() => onRowClick?.(row)}
                >
                    {columns.map((column) => {
                        const width = getColumnWidth(column, columnWidths);
                        return (
                            <td
                                key={String(column.key)}
                                data-column-key={column.id}
                                style={width !== undefined ? { width } : undefined}
                                className={['rst-td', alignClass(column.align)].join(' ')}
                            >
                                {column.render
                                    ? column.render(row[column.key as keyof T], row)
                                    : String(row[column.key as keyof T] ?? '')}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    );
}

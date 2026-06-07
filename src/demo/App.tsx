import { useEffect, useState } from 'react';
import { SmartTable, type Column, type TableThemeMode } from '../index';

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    status: 'active' | 'inactive';
}

const THEME_OPTIONS: { value: TableThemeMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'System' },
];

function App() {
    const [themeMode, setThemeMode] = useState<TableThemeMode>('light');
    const [useCustomBrand, setUseCustomBrand] = useState(false);

    const [data] = useState<User[]>([
        { id: 1, name: 'Anyan John Doe', email: 'john@example.com', age: 30, status: 'active' },
        { id: 2, name: 'Anyan Jane Smith', email: 'jane@example.com', age: 25, status: 'active' },
        { id: 3, name: 'Anyan Bob Johnson', email: 'bob@example.com', age: 35, status: 'inactive' },
        { id: 4, name: 'Anyan Alice Brown', email: 'alice@example.com', age: 28, status: 'active' },
        { id: 5, name: 'Anyan Charlie Wilson', email: 'charlie@example.com', age: 32, status: 'inactive' },
    ]);

    const columns: Column<User>[] = [
        { key: 'id', header: 'ID', width: '80px', sortable: true },
        { key: 'name', header: 'Name', sortable: true, filterable: true },
        { key: 'email', header: 'Email', sortable: true, filterable: true },
        { key: 'age', header: 'Age', width: '100px', sortable: true, align: 'center' },
        {
            key: 'status',
            header: 'Status',
            width: '120px',
            render: (value: string) => (
                <span
                    className={`rst-badge ${value === 'active' ? 'rst-badge--success' : 'rst-badge--danger'
                        }`}
                >
                    {value}
                </span>
            ),
        },
    ];

    const tableTheme = useCustomBrand
        ? {
            mode: themeMode,
            colors: {
                primary: '#7c3aed',
                primaryHover: '#6d28d9',
                primaryText: '#ffffff',
                focusRing: 'rgba(124, 58, 237, 0.35)',
            },
        }
        : themeMode;

    useEffect(() => {
        document.body.dataset.demoTheme = themeMode;
    }, [themeMode]);

    const handleRowClick = (row: User) => {
        alert(`Clicked on ${row.name}`);
    };

    return (
        <div className="demo">
            <header className="demo-header">
                <h1>React Smart Table</h1>
                <p>A lightweight, sortable, filterable data table for React.</p>

                <div className="demo-controls">
                    <div className="demo-control-group">
                        <span className="demo-control-label">Theme</span>
                        <div className="demo-theme-toggle">
                            {THEME_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`demo-theme-btn ${themeMode === option.value ? 'demo-theme-btn--active' : ''
                                        }`}
                                    onClick={() => setThemeMode(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="demo-checkbox">
                        <input
                            type="checkbox"
                            checked={useCustomBrand}
                            onChange={(e) => setUseCustomBrand(e.target.checked)}
                        />
                        Custom brand colors (purple accent)
                    </label>
                </div>
            </header>

            <section className="demo-section">
                <h2>Basic Table</h2>
                <p className="demo-description">
                    Sortable columns, per-column filters, and row hover states out of the box.
                </p>
                <SmartTable data={data} columns={columns} theme={tableTheme} filterable={false} sortable={false} />
            </section>

            <section className="demo-section">
                <h2>With Pagination</h2>
                <p className="demo-description">Built-in pagination controls with disabled states.</p>
                <SmartTable
                    data={data}
                    columns={columns}
                    pagination
                    itemsPerPage={3}
                    theme={tableTheme}
                />
            </section>

            <section className="demo-section">
                <h2>With Row Click</h2>
                <p className="demo-description">Click any row to trigger a callback.</p>
                <SmartTable
                    data={data}
                    columns={columns}
                    onRowClick={handleRowClick}
                    sortable
                    filterable
                    theme={tableTheme}
                />
            </section>
        </div>
    );
}

export default App;

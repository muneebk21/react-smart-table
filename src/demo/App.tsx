import React, { useState } from 'react';
import { SmartTable, type Column } from '../index';

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    status: 'active' | 'inactive';
}

function App() {
    const [data] = useState<User[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, status: 'active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, status: 'inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, status: 'active' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, status: 'inactive' },
    ]);

    const columns: Column<User>[] = [
        {
            key: 'id',
            header: 'ID',
            width: '80px',
            sortable: true,
        },
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            filterable: true,
        },
        {
            key: 'email',
            header: 'Email',
            sortable: true,
            filterable: true,
        },
        {
            key: 'age',
            header: 'Age',
            width: '100px',
            sortable: true,
            align: 'center',
        },
        {
            key: 'status',
            header: 'Status',
            width: '120px',
            render: (value: string) => (
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: value === 'active' ? '#4caf50' : '#f44336',
                    color: 'white',
                }}>
                    {value}
                </span>
            ),
        },
    ];

    const handleRowClick = (row: User) => {
        alert(`Clicked on ${row.name}`);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>React Smart Table Demo</h1>

            <h2>Basic Table</h2>
            <SmartTable data={data} columns={columns} />

            <h2 style={{ marginTop: '40px' }}>With Pagination</h2>
            <SmartTable
                data={data}
                columns={columns}
                pagination={true}
                itemsPerPage={3}
            />

            <h2 style={{ marginTop: '40px' }}>With Row Click</h2>
            <SmartTable
                data={data}
                columns={columns}
                onRowClick={handleRowClick}
                sortable={true}
                filterable={true}
            />
        </div>
    );
}

export default App;
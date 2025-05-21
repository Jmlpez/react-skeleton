import { CellContext, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { cn } from '@utils';
import React from 'react';

type Person = {
    id: number;
    fullName: string;
    age: number;
    email: string;
};

// Example static data
const defaultData = [
    {
        id: 1,
        fullName: 'John Doe', // Changed from 'nombre'
        age: 30,
        email: 'john.doe@example.com',
    },
    {
        id: 2,
        fullName: 'Jane Smith', // Changed from 'nombre'
        age: 25,
        email: 'jane.smith@example.com',
    },
    {
        id: 3,
        fullName: 'Carlos Ruiz', // Kept for consistency with previous, but ideally 'Peter Jones' or similar
        age: 42,
        email: 'carlos.ruiz@example.com', // Kept for consistency
    },
];

function ReactTableDemo() {
    // State for the data (even if static initially, it's good practice)
    const [data, _setData] = React.useState(() => [...defaultData]);

    const [sorting, setSorting] = React.useState<SortingState>([]); // Type the sorting state
    const [globalFilter, setGlobalFilter] = React.useState<string>('');

    // Column definitions
    const columns = React.useMemo(
        () => [
            {
                accessorKey: 'id', // Accesses the 'id' property from the data object
                header: 'ID', // Text for the column header,
                // cell: (info) => <strong className={'font-bold'}> {info.getValue()} </strong>, // How to render the cell (optional, defaults to showing the value)
            },
            {
                accessorKey: 'fullName', // Accesses the 'fullName' property
                header: 'Full Name',
                cell: (info: CellContext<Person, string>) => {
                    return <strong className={'font-bold'}> {info.getValue()} </strong>;
                },
            },
            {
                accessorKey: 'age',
                header: 'Age',
            },
            {
                accessorKey: 'email',
                header: 'Email Address',
            },
        ],
        [], // Remember the dependency array for useMemo
    );

    // Main react-table hook
    const table = useReactTable<Person>({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(), // Necessary for the core row model
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    // For now, just a placeholder to see the component mount!
    return (
        <div>
            <h1 className={'my-4 text-xl'}>My First Table with TanStack Table</h1>
            <hr className={'my-4'} />
            {/* Our table will go here */}
            <div>
                <input
                    type="text"
                    value={globalFilter ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)} // Typed event
                    placeholder="Search all columns..."
                    style={{ marginBottom: '10px', padding: '5px' }}
                />
            </div>
            <table
                className={'w-full table-auto'}
                style={{ borderCollapse: 'collapse' }}
            >
                <thead className={'text-left'}>
                    <tr>
                        {table.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                                >
                                    <div
                                        onClick={header.column.getToggleSortingHandler()}
                                        title={
                                            header.column.getCanSort()
                                                ? header.column.getNextSortingOrder() === 'asc'
                                                    ? 'Sort ascending'
                                                    : header.column.getNextSortingOrder() === 'desc'
                                                      ? 'Sort descending'
                                                      : 'Clear sort'
                                                : undefined
                                        }
                                    >
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            // Display sort direction indicator
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}{' '}
                                        {/* Added 'as string' for object key access, or check header.column.getIsSorted() !== false */}
                                    </div>
                                </th>
                            )),
                        )}
                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, idx) => (
                        <tr
                            key={row.id}
                            className={cn('p-4', idx % 2 == 0 ? 'bg-gray-100' : 'bg-gray-200')}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    className={'p-2'}
                                    key={cell.id}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {/* Optional: You can add a table footer similar to headers */}
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                >
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    );
}

export default ReactTableDemo;

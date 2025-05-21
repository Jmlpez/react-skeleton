// In MyTableTutorial.tsx
import { useQuery } from '@tanstack/react-query';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    SortingState,
    // CellContext // Already imported or ensure it is if used explicitly in column defs
    useReactTable,
} from '@tanstack/react-table';
import { cn } from '@utils';
import React from 'react';

// Define User interface (as shown above)
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    // Keeping it simpler for the column defs below, but the full interface is good practice
}

// Interfaz para los parámetros de fetching
interface FetchUsersParams {
    pageIndex: number;
    pageSize: number;
    sorting: SortingState;
    globalFilter: string;
}

// Interfaz para la respuesta esperada del servidor
interface UsersApiResponse {
    rows: User[]; // Los datos de la página actual
    totalCount: number; // El número total de usuarios que coinciden con el filtro
    pageCount?: number; // Opcional: el número total de páginas
}

const fetchUsers = async ({ pageIndex, pageSize, sorting, globalFilter }: FetchUsersParams): Promise<UsersApiResponse> => {
    const params = new URLSearchParams();
    params.append('_page', (pageIndex + 1).toString()); // JSONPlaceholder es 1-indexed para páginas
    params.append('_limit', pageSize.toString());

    if (sorting.length > 0) {
        params.append('_sort', sorting[0].id);
        params.append('_order', sorting[0].desc ? 'desc' : 'asc');
    }

    if (globalFilter) {
        params.append('q', globalFilter); // JSONPlaceholder usa 'q' para búsqueda de texto completo
    }

    // console.log(`Workspaceing users with params: ${params.toString()}`);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const users = (await response.json()) as User[];
    // JSONPlaceholder devuelve el total en el header 'X-Total-Count'
    const totalCountHeader = response.headers.get('X-Total-Count');
    const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0; // O estimar si no está disponible

    return {
        rows: users,
        totalCount,
        // pageCount: Math.ceil(totalCount / pageSize) // Puedes calcularlo aquí o esperar que el backend lo envíe
    };
};

function ReactTableDynamicDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState<string>('');
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 3,
    });

    // Use react-query to fetch data, typed
    const {
        data: serverResponse,
        isLoading,
        isFetching,
        isError,
        error,
    } = useQuery<UsersApiResponse, Error>({
        queryKey: ['users', { pagination, sorting, globalFilter }], // Incluye todos los estados relevantes
        queryFn: () => fetchUsers({ ...pagination, sorting, globalFilter }),
        placeholderData: (previousData) => previousData,
    });

    // Data for the table, typed. Use useMemo for performance.
    const dataForTable = React.useMemo<User[]>(() => serverResponse?.rows ?? [], [serverResponse?.rows]);
    const totalRowCount = serverResponse?.totalCount ?? 0;
    // Adapt columns to the User data structure
    const columns = React.useMemo<ColumnDef<User>[]>(
        () => [
            { accessorKey: 'id', header: 'ID' },
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'username', header: 'Username' },
            { accessorKey: 'email', header: 'Email Address' },
            { accessorKey: 'phone', header: 'Phone' },
            {
                accessorKey: 'website',
                header: 'Website',
                cell: (info) => {
                    const value = info.getValue() as string;
                    return (
                        <a
                            href={`http://${value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {value}
                        </a>
                    );
                },
            },
        ],
        [],
    );

    const table = useReactTable<User>({
        data: dataForTable,
        rowCount: totalRowCount,
        columns,
        state: {
            sorting,
            globalFilter,
            pagination,
        },

        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        manualSorting: true,
        manualFiltering: true,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        // rowCount: dataFromServer?.totalCount ?? -1
        // debugTable: true, // Uncomment to see useful table logs
    });

    if (isLoading) {
        return <p>Loading data...</p>;
    }

    if (isError) {
        // Error object from useQuery is of type Error by default, or your specified error type
        return <p>Error loading data: {error?.message || 'Unknown error'}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Table with Dynamic Data (Users - TypeScript)</h1>
            <div>
                <input
                    type="text"
                    value={globalFilter ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
                    placeholder="Search all columns..."
                    className="mb-2.5 rounded border border-gray-300 p-1.5"
                />
            </div>
            {isFetching && <p style={{ color: 'blue' }}>Updating data...</p>} {/* Fetching indicator */}
            <table className={'w-full table-auto border-collapse'}>
                <thead className={'text-left'}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
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
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, idx) => (
                        <tr
                            key={row.id}
                            className={cn(idx % 2 == 0 ? 'bg-gray-100' : 'bg-gray-200')}
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
            </table>
            <div className="flex items-center justify-between py-2.5">
                <div className="flex gap-1.5">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className={`rounded border border-gray-300 px-2.5 py-1.5 ${
                            table.getCanPreviousPage() ? 'cursor-pointer bg-gray-100 text-gray-700' : 'cursor-not-allowed bg-gray-200 text-gray-400'
                        }`}
                    >
                        {'<< First'}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        style={buttonStyle(table.getCanPreviousPage())}
                    >
                        {'< Previous'}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        style={buttonStyle(table.getCanNextPage())}
                    >
                        {'Next >'}
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        style={buttonStyle(table.getCanNextPage())}
                    >
                        {'Last >>'}
                    </button>
                </div>

                <span className="text-sm">
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount() > 0 ? table.getPageCount() : 1}
                    </strong>
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.9em' }}>Go to page:</span>
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            if (page >= 0 && page < table.getPageCount()) {
                                table.setPageIndex(page);
                            }
                        }}
                        className="w-[60px] rounded border border-gray-300 p-1.5"
                        min={1}
                        max={table.getPageCount()}
                    />
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="rounded border border-gray-300 p-1.5"
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option
                                key={size}
                                value={size}
                            >
                                Show {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={{ fontSize: '0.8em', color: '#555', marginTop: '5px' }}>Total users found: {totalRowCount}</div>
        </div>
    );
}

// Helper for button styling
const buttonStyle = (enabled: boolean): React.CSSProperties => ({
    padding: '6px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: enabled ? '#f0f0f0' : '#e0e0e0',
    cursor: enabled ? 'pointer' : 'not-allowed',
    color: enabled ? '#333' : '#999',
});

export default ReactTableDynamicDemo;

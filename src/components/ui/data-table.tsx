import TableColumnFilter from '@/demos/react-table-demo/components/table-column-filter';
import { cn } from '@/lib/utils';
import { Column, flexRender, HeaderGroup, RowData, Table } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react';
import React from 'react';

interface DataTableProps<TData extends RowData> {
    table: Table<TData>;
    isFetching?: boolean;
    isPlaceholderData?: boolean;
    totalRowCount: number;
    // Optional prop to customize the "no data" message
    noDataMessage?: string;
    // Optional prop to customize or disable filter rendering
    renderFilters?: (headerGroups: HeaderGroup<TData>[]) => React.ReactNode;
}

export function DataTable<TData extends RowData>({
    table,
    isFetching,
    isPlaceholderData,
    totalRowCount,
    noDataMessage = 'No items found matching the criteria.',
    renderFilters,
}: DataTableProps<TData>) {
    const defaultFilterRenderer = (headerGroups: HeaderGroup<TData>[]) => (
        <div className="mb-4 flex flex-wrap gap-3">
            {headerGroups.map((headerGroup) => (
                <div
                    key={headerGroup.id}
                    className="flex flex-col gap-1"
                >
                    {headerGroup.headers.map((header) => (
                        <div key={header.id}>
                            {header.column.getCanFilter() && (
                                <TableColumnFilter
                                    column={header.column as unknown as Column<unknown, unknown>} // Adjust type as needed for TableColumnFilter
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <>
            {/* Column Filters */}
            {renderFilters ? renderFilters(table.getHeaderGroups()) : defaultFilterRenderer(table.getHeaderGroups())}

            {/* Table */}
            {/* {isFetching && <p className="text-blue-600">Fetching data...</p>} */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
                <table className="border-collapse divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={cn(
                                            'p-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase',
                                            header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-gray-100' : 'cursor-default',
                                        )}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <span className="ml-2">
                                                    {header.column.getIsSorted() === 'asc' && <ArrowUpIcon className="h-4 w-4 text-gray-600" />}
                                                    {header.column.getIsSorted() === 'desc' && <ArrowDownIcon className="h-4 w-4 text-gray-600" />}
                                                    {!header.column.getIsSorted() && <MinusIcon className="h-4 w-4 text-gray-300" />}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody
                        className={cn('divide-y divide-gray-200 bg-white', {
                            'opacity-50': isPlaceholderData,
                        })}
                    >
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className={cn('transition-colors duration-150 ease-in-out hover:bg-gray-50', {
                                    'bg-gray-100': row.getIsSelected(),
                                })}
                            >
                                {row.getVisibleCells().map((cell, idx) => (
                                    <td
                                        key={cell.id}
                                        className="p-3 text-sm text-gray-700"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {table.getRowModel().rows.length === 0 && !isFetching && (
                            <tr>
                                <td
                                    colSpan={table.getVisibleLeafColumns().length}
                                    className="p-5 text-center text-sm text-gray-500"
                                >
                                    {noDataMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className={cn(
                            'rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors',
                            'hover:bg-gray-50',
                            'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
                        )}
                    >
                        {'<< First'}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={cn(
                            'rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors',
                            'hover:bg-gray-50',
                            'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
                        )}
                    >
                        {'< Previous'}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className={cn(
                            'rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors',
                            'hover:bg-gray-50',
                            'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
                        )}
                    >
                        {'Next >'}
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className={cn(
                            'rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors',
                            'hover:bg-gray-50',
                            'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
                        )}
                    >
                        {'Last >>'}
                    </button>
                </div>

                <span className="text-sm text-gray-700">
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {Math.max(1, Math.ceil(totalRowCount / table.getState().pagination.pageSize))}
                    </strong>
                </span>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Go to page:</span>
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            if (page >= 0 && page < table.getPageCount()) {
                                table.setPageIndex(page);
                            }
                        }}
                        className="w-[70px] rounded border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        min={1}
                        max={table.getPageCount()}
                    />
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="rounded border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
            <div className="mt-2 text-sm text-gray-600">Total items: {totalRowCount}</div>
        </>
    );
}

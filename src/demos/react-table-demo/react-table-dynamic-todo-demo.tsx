// // MyTodosTable.tsx
// import { useQuery } from '@tanstack/react-query';
// import {
//     ColumnFiltersState,
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     PaginationState,
//     RowData,
//     RowSelectionState,
//     SortingState,
//     useReactTable,
// } from '@tanstack/react-table';
// import { Checkbox } from '@ui/checkbox';
// import { cn, nameofFactory } from '@utils';
// import React from 'react';
// import TableColumnFilter from './components/TableColumnFilter';
//
// // --- Module Augmentation ---
// declare module '@tanstack/react-table' {
//     //allows us to define custom properties for our columns
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     interface ColumnMeta<TData extends RowData, TValue> {
//         filterOptions?: {
//             variant: 'text' | 'range' | 'select';
//             displayName?: string;
//         };
//     }
// }
//
// // --- Type Definitions ---
// interface Todo {
//     userId: number;
//     id: number;
//     title: string;
//     completed: boolean;
// }
//
// interface FetchTodosParams {
//     pageIndex: number;
//     pageSize: number;
//     sorting: SortingState;
//     // filters: Record<string, string>; // Column-specific filters
//     filters: ColumnFiltersState; // Column-specific filters
// }
//
// type TodosApiResponse = Array<Todo>;
//
// // --- API Fetching Function ---
// const fetchTodos = async ({ pageIndex, pageSize, sorting, filters }: FetchTodosParams): Promise<TodosApiResponse> => {
//     const params = new URLSearchParams({
//         _start: (pageIndex * pageSize).toString(),
//         _limit: pageSize.toString(),
//     });
//
//     // Sorting (JSONPlaceholder supports basic sorting)
//     if (sorting.length > 0) {
//         const sortItem = sorting[0];
//         params.append('_sort', sortItem.id);
//         params.append('_order', sortItem.desc ? 'desc' : 'asc');
//     }
//
//     filters.forEach((filter) => params.append(filter.id, String(filter.value)));
//
//     const apiUrl = `https://jsonplaceholder.typicode.com/todos?${params.toString()}`;
//
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.statusText}`);
//     }
//
//     return (await response.json()) as TodosApiResponse;
// };
//
// const columnHelper = createColumnHelper<Todo>();
// const nameofTodo = nameofFactory<Todo>();
//
// // --- React Component ---
// const MyTodosTable = () => {
//     const [sorting, setSorting] = React.useState<SortingState>([]);
//     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
//         {
//             id: nameofTodo('userId'),
//             value: 1,
//         },
//     ]);
//     const [pagination, setPagination] = React.useState<PaginationState>({
//         pageIndex: 0,
//         pageSize: 5,
//     });
//     const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
//
//     const {
//         data: serverResponse,
//         isLoading,
//         isError,
//         error,
//         isFetching,
//         // Function to manually trigger a data fetch
//     } = useQuery<TodosApiResponse, Error>({
//         queryKey: ['todos', { pagination, sorting, filters: columnFilters }],
//         queryFn: () => fetchTodos({ ...pagination, sorting, filters: columnFilters }),
//         placeholderData: (previousData) => previousData,
//     });
//
//     const tableData = React.useMemo(() => serverResponse ?? [], [serverResponse]);
//
//     // JSONPlaceholder doesn't provide a total count header for filtered results,
//     // so proper pagination with filters might not be fully accurate.
//     // In a real-world scenario, the API should return the total count.
//     const totalRowCount = 20; // Assuming a fixed total for the demonstration.
//
//     const columns = [
//         columnHelper.display({
//             id: 'actions',
//             header: 'Action',
//             cell: ({ row }) => (
//                 // <div
//                 //     className={'pl-2'}
//                 //     onClick={row.getToggleSelectedHandler()}
//                 // >
//                 <Checkbox
//                     id={row.id}
//                     onCheckedChange={row.getToggleSelectedHandler()}
//                     checked={row.getIsSelected()}
//                     disabled={!row.getCanSelect()}
//                 />
//                 // </div>
//             ),
//             // cell: (props) => <span>hey {JSON.stringify(props)}</span>,
//         }),
//         columnHelper.accessor('userId', {
//             header: 'User',
//         }),
//         columnHelper.accessor('id', {
//             header: 'Identifier',
//             enableColumnFilter: false,
//         }),
//         columnHelper.accessor('title', {
//             header: 'Title',
//             enableColumnFilter: false,
//         }),
//         columnHelper.accessor('completed', {
//             header: 'Completed',
//             cell: (info) => (info.getValue() ? 'Yes' : 'No'),
//             meta: {
//                 filterOptions: {
//                     variant: 'select',
//                     displayName: 'Completed Status',
//                 },
//                 // filterVariant: 'select',
//             },
//         }),
//     ];
//     const table = useReactTable<Todo>({
//         data: tableData,
//         columns,
//         state: {
//             sorting,
//             pagination,
//             columnFilters,
//             rowSelection,
//         },
//         onSortingChange: setSorting,
//         onPaginationChange: setPagination,
//         onColumnFiltersChange: setColumnFilters,
//         onRowSelectionChange: setRowSelection,
//         manualPagination: true,
//         manualSorting: true,
//         manualFiltering: true, // Indicate manual filtering
//
//         rowCount: totalRowCount,
//         getCoreRowModel: getCoreRowModel(),
//         debugTable: false,
//     });
//
//     if (isLoading && !serverResponse) {
//         return <p>Loading todos...</p>;
//     }
//
//     if (isError) {
//         return <p>Error loading todos: {error?.message || 'Unknown error'}</p>;
//     }
//
//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <h1>Todos List (Server-Side Pagination & Filtering)</h1>
//             <p style={{ color: 'orange' }}>
//                 <strong>Note:</strong> JSONPlaceholder has limited filtering capabilities. This example simulates server-side filtering on
//                 'completed', 'userId', and a basic substring search on 'title'. A real API would offer more robust filtering options.
//             </p>
//
//             {/* Column Filters */}
//             <div className="mb-4 flex flex-wrap gap-3">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                     <div
//                         key={headerGroup.id}
//                         className="flex flex-col gap-1"
//                     >
//                         {headerGroup.headers.map((header) => (
//                             <div key={header.id}>
//                                 <TableColumnFilter column={header.column} />
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//
//             {/* Table */}
//             {isFetching && <p className="text-blue-600">Updating todos...</p>}
//             <table className="mb-4 w-full border-collapse">
//                 <thead>
//                     {table.getHeaderGroups().map((headerGroup) => (
//                         <tr key={headerGroup.id}>
//                             {headerGroup.headers.map((header) => (
//                                 <td
//                                     key={header.id}
//                                     colSpan={header.colSpan}
//                                     className={`border-b-2 border-black p-2.5 text-left ${header.column.getCanSort() ? 'cursor-pointer' : 'cursor-default'}`}
//                                     onClick={header.column.getToggleSortingHandler()}
//                                 >
//                                     {flexRender(header.column.columnDef.header, header.getContext())}
//                                     {{
//                                         asc: ' 🔼',
//                                         desc: ' 🔽',
//                                     }[header.column.getIsSorted() as string] ?? ''}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody>
//                     {table.getRowModel().rows.map((row) => (
//                         <tr
//                             key={row.id}
//                             style={{ borderBottom: '1px solid #eee' }}
//                             className={cn('transition', {
//                                 'bg-gray-500': row.getIsSelected(),
//                             })}
//                             // As this is the more verbose way to achieve the same, we can use a bit simpler handler
//                             // onClick={(e) => {
//                             //     row.getToggleSelectedHandler()(e);
//                             // }}
//                             // In this case the handler is returned and the parameters used in the onClick callback
//                             // will be passed to the callback returned from getToggleSelectedHandler()
//                             // onClick={row.getToggleSelectedHandler()}
//                         >
//                             {row.getVisibleCells().map((cell) => (
//                                 <td
//                                     key={cell.id}
//                                     className={cn('px-2 py-2.5')}
//                                 >
//                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                     {table.getRowModel().rows.length === 0 && !isFetching && (
//                         <tr>
//                             <td
//                                 colSpan={columns.length}
//                                 className={'p-5 text-center'}
//                             >
//                                 No todos found matching the criteria.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//
//             {/* Pagination Controls */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
//                 <div style={{ display: 'flex', gap: '5px' }}>
//                     <button
//                         onClick={() => table.setPageIndex(0)}
//                         disabled={!table.getCanPreviousPage()}
//                         style={buttonStyle(table.getCanPreviousPage())}
//                     >
//                         {'<< First'}
//                     </button>
//                     <button
//                         onClick={() => table.previousPage()}
//                         disabled={!table.getCanPreviousPage()}
//                         style={buttonStyle(table.getCanPreviousPage())}
//                     >
//                         {'< Previous'}
//                     </button>
//                     <button
//                         onClick={() => table.nextPage()}
//                         disabled={!table.getCanNextPage()}
//                         style={buttonStyle(table.getCanNextPage())}
//                     >
//                         {'Next >'}
//                     </button>
//                     <button
//                         onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//                         disabled={!table.getCanNextPage()}
//                         style={buttonStyle(table.getCanNextPage())}
//                     >
//                         {'Last >>'}
//                     </button>
//                 </div>
//
//                 <span style={{ fontSize: '0.9em' }}>
//                     Page{' '}
//                     <strong>
//                         {table.getState().pagination.pageIndex + 1} of {Math.ceil(totalRowCount / table.getState().pagination.pageSize)}
//                     </strong>
//                 </span>
//
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                     <span style={{ fontSize: '0.9em' }}>Go to page:</span>
//                     <input
//                         type="number"
//                         defaultValue={table.getState().pagination.pageIndex + 1}
//                         onChange={(e) => {
//                             const page = e.target.value ? Number(e.target.value) - 1 : 0;
//                             if (page >= 0 && page < table.getPageCount()) {
//                                 table.setPageIndex(page);
//                             }
//                         }}
//                         style={{ width: '60px', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
//                         min={1}
//                         max={table.getPageCount()}
//                     />
//                     <select
//                         value={table.getState().pagination.pageSize}
//                         onChange={(e) => {
//                             table.setPageSize(Number(e.target.value));
//                         }}
//                         style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
//                     >
//                         {[5, 10, 20, 50].map((size) => (
//                             <option
//                                 key={size}
//                                 value={size}
//                             >
//                                 Show {size}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             <div style={{ fontSize: '0.8em', color: '#555', marginTop: '5px' }}>Total todos (approximate): {totalRowCount}</div>
//         </div>
//     );
// };
//
// const buttonStyle = (enabled: boolean): React.CSSProperties => ({
//     padding: '6px 10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     backgroundColor: enabled ? '#f0f0f0' : '#e0e0e0',
//     cursor: enabled ? 'pointer' : 'not-allowed',
//     color: enabled ? '#333' : '#999',
// });
//
// export default MyTodosTable;

// MyTodosTable.tsx
import { DataTable } from '@/components/ui/data-table';
import { useQuery } from '@tanstack/react-query';
import {
    ColumnFiltersState,
    createColumnHelper,
    getCoreRowModel,
    PaginationState,
    RowData,
    RowSelectionState,
    SelectFilterConfig,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { Checkbox } from '@ui/checkbox';
import { cn } from '@utils';
import React, { useMemo } from 'react';

declare module '@tanstack/react-table' {
    // Base properties for all filter variants
    interface FilterBaseConfig {
        displayName?: string; // User-friendly name for the filter
    }

    // Specific configuration for a 'text' filter
    interface TextFilterConfig extends FilterBaseConfig {
        variant: 'text';
        ignoreCase?: boolean; // Default to true if not specified?
        placeholder?: string;
    }

    // Specific configuration for a 'select' filter
    // TValue is the type of the individual option values
    interface SelectFilterConfig extends FilterBaseConfig {
        variant: 'select';
        // Options can be simple values or value-label pairs
        options: Array<{ value: string; label: string }>;
        multiple?: boolean; // Allow multiple selections?
        // If options are to be fetched async:
        // getOptions?: (rowData: TData[]) => Promise<Array<{ value: TValue; label: string } | TValue>>;
    }

    // Specific configuration for a 'trueFalse' (boolean) filter
    interface TrueFalseFilterConfig extends FilterBaseConfig {
        variant: 'trueFalse';
        trueLabel?: string; // e.g., "Yes", "Active"
        falseLabel?: string; // e.g., "No", "Inactive"
        allowIndeterminate?: boolean; // For a third "all" state
    }

    // // Specific configuration for a 'range' filter
    // // TValue is the type of the values being ranged (e.g., number, Date)
    // interface RangeFilterConfig<TValue = number> extends FilterBaseConfig {
    //     variant: 'range';
    //     min?: TValue; // Predefined min, or used to bind to a min input
    //     max?: TValue; // Predefined max, or used to bind to a max input
    //     minLabel?: string; // Label for the min input
    //     maxLabel?: string; // Label for the max input
    //     step?: number; // For number ranges, the step attribute
    // }

    // A discriminated union of all possible filter configurations
    // TValue is the type of the data in the column cells
    // TData is the type of the row data
    type ColumnFilterConfig = TextFilterConfig | SelectFilterConfig | TrueFalseFilterConfig;
    // | RangeFilterConfig<TValue>;
    // Add other filter types here if needed, e.g., DateFilterConfig

    // Extend ColumnMeta to include our custom filter configuration
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterConfig?: ColumnFilterConfig;
    }
}

// --- Type Definitions ---
interface ResourceBase {
    id: number;
    name: string;
    url: string;
    created: string;
}

interface Character extends ResourceBase {
    status: 'Dead' | 'Alive' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    image: string;
    episode: string[];
}

interface FetchCharactersParams {
    pageIndex: number;
    pageSize: number;
    sorting: SortingState;
    filters: ColumnFiltersState; // Column-specific filters
}

type RickAndMortyApiResponse = {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Character[];
};

// --- API Fetching Function ---
const fetchTodos = async ({ pageIndex, pageSize, sorting, filters }: FetchCharactersParams): Promise<RickAndMortyApiResponse> => {
    const params = new URLSearchParams({
        page: (pageIndex + 1).toString(),
        pageSize: pageSize.toString(),
    });

    // Sorting (JSONPlaceholder supports basic sorting)
    if (sorting.length > 0) {
        const sortItem = sorting[0];
        params.append('sort', sortItem.id);
        params.append('order', sortItem.desc ? 'desc' : 'asc');
    }

    filters.forEach((filter) => params.append(filter.id, String(filter.value)));

    const apiUrl = `https://rickandmortyapi.com/api/character?${params.toString()}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return (await response.json()) as RickAndMortyApiResponse;
};

const columnHelper = createColumnHelper<Character>();
// const nameofCharacter = nameofFactory<Character>();

// --- React Component ---
const ReactTableRickAndMortyDemo = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 1,
        pageSize: 5,
    });
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const {
        data: serverResponse,
        isLoading,
        isFetching,
        isPlaceholderData,
    } = useQuery<RickAndMortyApiResponse, Error>({
        queryKey: ['rick-morty-characters', { pagination, sorting, filters: columnFilters }],
        queryFn: () => fetchTodos({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize, sorting, filters: columnFilters }),
        placeholderData: (previousData) => previousData,
    });

    const tableData = React.useMemo(() => serverResponse?.results ?? [], [serverResponse?.results]);
    const totalRowCount = serverResponse?.info?.count ?? 0;

    const columns = useMemo(
        () => [
            columnHelper.display({
                id: 'selection',
                header: '',
                cell: ({ row }) => (
                    <Checkbox
                        id={row.id} // Ensure id is string if Checkbox expects string
                        onCheckedChange={row.getToggleSelectedHandler()}
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                    />
                ),
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Action',
                cell: ({ row }) => (
                    <Checkbox
                        id={row.id} // Ensure id is string if Checkbox expects string
                        onCheckedChange={row.getToggleSelectedHandler()}
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                    />
                ),
            }),
            columnHelper.accessor('id', {
                header: 'ID',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                meta: {
                    filterConfig: {
                        variant: 'select',
                        options: [
                            { value: 'Dead', label: 'Dead' },
                            { value: 'Alive', label: 'Alive' },
                            { value: 'unknown', label: 'unknown' },
                        ],
                    } as SelectFilterConfig, // Added type assertion
                },
                // Cell rendering for status is now part of the column definition
                cell: (info) => {
                    const status = info.getValue() as Character['status'];
                    return (
                        <span
                            className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', {
                                'bg-green-100 text-green-800': status === 'Alive',
                                'bg-red-100 text-red-800': status === 'Dead',
                                'bg-gray-100 text-gray-800': status === 'unknown',
                            })}
                        >
                            {status}
                        </span>
                    );
                },
                // enableColumnFilter: false,
            }),
            columnHelper.accessor('gender', {
                header: 'Gender',
                meta: {
                    filterConfig: {
                        variant: 'select',
                        options: [
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'genderless', label: 'Genderless' },
                            { value: 'unknown', label: 'unknown' },
                        ],
                    } as SelectFilterConfig, // Added type assertion
                },
            }),
            columnHelper.accessor('type', {
                header: 'Type',
            }),
            columnHelper.accessor('image', {
                header: 'Image',
                enableColumnFilter: false,
                cell: (info) => (
                    <div>
                        <img
                            src={info.getValue() as string}
                            alt={info.row.original.name} // Use a more descriptive alt text
                            className="h-32 w-32 rounded-full object-cover" // Added object-cover
                        />
                    </div>
                ),
            }),
        ],
        [],
    );

    const table = useReactTable<Character>({
        data: tableData,
        columns,
        state: {
            sorting,
            pagination,
            columnFilters,
            rowSelection,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        rowCount: totalRowCount,
        getCoreRowModel: getCoreRowModel(),
        debugTable: false,
        // pageCount: serverResponse?.info?.pages ?? -1, // If your API provides total pages
    });

    if (isLoading && !serverResponse) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                    <p className="text-lg font-medium text-gray-600">Loading data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <h1 className="mb-6 text-3xl font-semibold text-gray-800">Rick and Morty Characters Table</h1>
            <DataTable
                table={table}
                isFetching={isFetching}
                isPlaceholderData={isPlaceholderData}
                totalRowCount={totalRowCount}
            />
        </div>
    );
};

export default ReactTableRickAndMortyDemo;

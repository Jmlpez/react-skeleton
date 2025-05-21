import { Button } from '@/components/ui/button';
import { DebouncedInput } from '@/components/ui/debounced-input';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Column } from '@tanstack/react-table';

interface TableColumnFilterProps<T> {
    column: Column<T>;
}

/**
 * TableColumnFilter is a reusable React component for filtering table columns.
 * It supports two types of filters: a dropdown select filter and a text input filter.
 *
 * T - The type of data being filtered in the table column.
 * @param props - The component props that contains the column object from react-table, which provides
 * methods and metadata for managing the filter state.
 *
 * @returns JSX.Element A filter UI for the table column, either a dropdown menu or a text input.
 *
 * @remarks
 * - If the column's filter configuration (`filterConfig`) specifies a `select` variant,
 *   a dropdown menu is rendered with options for filtering.
 * - Otherwise, a debounced text input is rendered for free-text filtering.
 * - The component uses `useCallback` to optimize the filter value update logic.
 * - TODO: Implement Number and Date filters.
 */
const TableColumnFilter = <T,>(props: TableColumnFilterProps<T>) => {
    const { column } = props;

    const columnFilterValue = column.getFilterValue();
    const { filterConfig } = column.columnDef.meta || {};

    const columnLabel = filterConfig?.displayName ?? String(column.columnDef.header);

    // Determine the label for the trigger button
    let triggerButtonLabel: string | undefined = columnLabel;
    let isPlaceholder = true;

    if (columnFilterValue && filterConfig?.variant == 'select' && filterConfig?.options) {
        const selectedOption = filterConfig.options.find((opt) => opt.value === columnFilterValue);
        if (selectedOption) {
            triggerButtonLabel = selectedOption.label;
            isPlaceholder = false;
        }
    }

    return (
        <>
            {filterConfig?.variant === 'select' ? (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-fit justify-start px-2 text-left text-base font-normal"
                        >
                            <span className={isPlaceholder ? 'text-gray-700' : ''}>{triggerButtonLabel}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto bg-white">
                        <DropdownMenuLabel>{`Filter by ${columnLabel}`}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {filterConfig?.options?.map((option) => {
                                const isChecked = columnFilterValue === option.value;
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={option.value}
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                            // only allow one selection at the time
                                            // If checked, set filter; if unchecked, clear filter.
                                            column.setFilterValue(checked ? option.value : undefined);
                                        }}
                                    >
                                        <span className="capitalize">{option.label}</span>
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <DebouncedInput
                    type="text"
                    id={`filter-${column.id}`}
                    initialValue={(columnFilterValue as string) ?? ''}
                    onDebouncedChange={column.setFilterValue}
                    placeholder={`Filter ${columnLabel}`}
                    className="w-[150px] rounded border border-gray-300 p-1.5"
                    debounceTimeout={300}
                />
            )}
        </>
    );
};

export default TableColumnFilter;

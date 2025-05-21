import * as React from 'react';
import { Input } from './input'; // Assuming InputProps is exported or use React.ComponentProps<'input'>

// Define props specifically for DebouncedInput
export interface DebouncedInputProps extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
    initialValue?: string | number; // The initial value for the input
    onDebouncedChange: (value: string | number) => void; // Callback for debounced changes
    debounceTimeout?: number;
}

const DebouncedInput = React.forwardRef<HTMLInputElement, DebouncedInputProps>(
    ({ initialValue = '', onDebouncedChange, debounceTimeout = 500, ...props }, ref) => {
        const [inputValue, setInputValue] = React.useState<string | number>(initialValue);

        // Effect to update internal state if initialValue prop changes (e.g., form reset)
        React.useEffect(() => {
            setInputValue(initialValue);
        }, [initialValue]);

        // Debounce logic
        React.useEffect(() => {
            console.log('Debouncing input value:', inputValue);
            const handler = setTimeout(() => {
                // We only call onDebouncedChange when the timer fires.
                // No need to compare with initialValue here as the parent controls initialValue,
                // and this component controls inputValue.
                onDebouncedChange(inputValue);
            }, debounceTimeout);

            // Cleanup function to clear the timeout if inputValue changes before timeout fires
            return () => {
                clearTimeout(handler);
            };
        }, [inputValue, onDebouncedChange, debounceTimeout]); // Rerun effect if these change

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value); // Update internal state immediately
        };

        return (
            <Input
                {...props} // Pass through other native input props
                value={inputValue} // Controlled by internal state
                onChange={handleChange} // Updates internal state
                ref={ref}
            />
        );
    },
);

DebouncedInput.displayName = 'DebouncedInput';

export { DebouncedInput };

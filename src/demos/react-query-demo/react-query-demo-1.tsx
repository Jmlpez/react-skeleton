import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { cn } from '@utils';
import { LucideCheckCircle, LucideXCircle } from 'lucide-react';
import { useState } from 'react';

export const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export type TodoItem = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export const ReactQueryDemo1 = () => {
    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const { data, isLoading, isError, isPlaceholderData } = useQuery<TodoItem[], Error>({
        queryKey: ['todos', selectedUserId],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}?userId=${selectedUserId}`);
            return await res.json();
        },
        enabled: selectedUserId !== '',
        placeholderData: (previousData, _previousQuery) => {
            return previousData;
        },
    });

    return (
        <div>
            <Select
                value={selectedUserId}
                onValueChange={setSelectedUserId}
            >
                <SelectTrigger>
                    <SelectValue placeholder={'UserId'}>{selectedUserId}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 5 }, (_, index) => (
                        <SelectItem
                            key={index}
                            className={'text-black'}
                            value={(index + 1).toString()}
                        >
                            {index + 1}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isLoading && <span>Loading...</span>}
            {isError && <span className={'text-red-500'}>Error...</span>}
            <ul className={cn(`${isPlaceholderData ? 'opacity-40' : ''}`)}>
                {data?.map((it) => (
                    <li
                        key={it.id}
                        className={'animate-in fade-in flex gap-2 duration-500'}
                    >
                        <strong className={'font-bold'}>{it.id}</strong>
                        <span>{it.title}</span>
                        <div>{it.completed ? <LucideCheckCircle color={'green'} /> : <LucideXCircle color={'red'} />}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

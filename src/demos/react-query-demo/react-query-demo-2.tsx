import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { cn } from '@utils';
import { Loader, LucideStepBack, LucideStepForward, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

export const BASE_URL = 'https://reqres.in/api';

const DEFAULT_PAGE_SIZE = 3;

export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
};

export type Support = {
    url: string;
    text: string;
};

export type UsersResponse = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: Support;
};

const useFetchUsers = (page: number, enabled: boolean) => {
    return useQuery<UsersResponse, Error, UsersResponse>({
        queryKey: ['users', page],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/users?per_page=${DEFAULT_PAGE_SIZE}&page=${page}`);
            if (!res.ok) {
                throw new Error('error');
            }
            return await res.json();
        },
        placeholderData: (previousData) => previousData,
        enabled,
    });
};

export const ReactQueryDemo2 = () => {
    const [page, setPage] = useState(1);

    const [enabled, setEnabled] = useState(false);

    const { data, isLoading, isPlaceholderData } = useFetchUsers(page, enabled);

    const queryClient = useQueryClient();

    return (
        <>
            <Button onClick={() => setEnabled(!enabled)}>{enabled ? 'Disable' : 'Enable'}</Button>
            {enabled && (
                <div>
                    <div className={'my-2 flex justify-end'}>
                        <Button
                            className={'cursor-pointer'}
                            onClick={() => {
                                queryClient.invalidateQueries({
                                    queryKey: ['users', page],
                                });
                                console.log('invalidating');
                            }}
                        >
                            <RefreshCcw />
                        </Button>
                    </div>
                    {isLoading && <Loader />}
                    <div className={cn('flex flex-col gap-4', `${isPlaceholderData ? 'opacity-50' : ''}`)}>
                        {data?.data.map((user) => (
                            <div
                                key={user.id}
                                className={'flex items-center gap-4 rounded-lg border p-4'}
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.first_name}
                                    className={'h-12 w-12 rounded-full'}
                                />
                                <div>
                                    <h2 className={'text-lg font-bold'}>
                                        {user.first_name} {user.last_name}
                                    </h2>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={'mt-4 flex justify-center gap-4'}>
                        <Button
                            className={'flex items-center gap-4'}
                            onClick={() => setPage(page - 1)}
                            disabled={isPlaceholderData || page === 1}
                        >
                            <LucideStepBack />
                            <span>Prev</span>
                        </Button>
                        <Button
                            className={'flex items-center gap-4'}
                            onClick={() => setPage(page + 1)}
                            disabled={isPlaceholderData || !data?.total_pages || page >= data?.total_pages}
                        >
                            <span>Next</span>
                            <LucideStepForward />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

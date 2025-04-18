import { HttpClient } from '@services/http-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@ui/button';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export const BASE_URL = 'https://dev.to/api/articles';

const DEFAULT_PAGE_SIZE = 3;

type Article = {
    id: number;
    title: string;
    description: string;
};

const usePosts = (enabled: boolean) => {
    const client = useMemo(() => new HttpClient(BASE_URL), []);

    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({ pageParam }) => {
            const posts = await client.get<Article[]>(`?per_page=${DEFAULT_PAGE_SIZE}&page=${pageParam}`);
            return posts.map((it) => ({
                id: it.id,
                title: it.title,
                description: it.description,
            }));
        },
        initialPageParam: 1,
        // maxPages: 3,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPage.length === 0) return undefined;
            return lastPageParam + 1;
        },
        enabled,
    });
};

export const ReactQueryDemo3 = () => {
    const [enabled, setEnabled] = React.useState(false);
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts(enabled);

    // as the shape of the data results is an array of pages,
    // and we want to display it like a full list, we use the JavaScript flat method
    const articles = data?.pages.flat();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (hasNextPage && !isFetchingNextPage && inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

    // if (articles) console.log(articles);

    return (
        <>
            <Button
                onClick={() => setEnabled(!enabled)}
            >
                {enabled ? 'Disable' : 'Enable'}
            </Button>
            {enabled && (
                <div className={'max-h-[30rem] overflow-auto rounded-lg bg-gray-900 p-4'}>
                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    )}

                    <div className={`space-y-4`}>
                        {articles?.map((article, index) => (
                            <div
                                key={`${index + 1}-${article.id}`}
                                className="rounded-lg bg-gray-800 p-4 shadow-lg transition-all hover:shadow-xl"
                            >
                                <strong className={'text-2xl text-white'}>{index + 1}</strong>
                                <h2 className="mb-2 text-xl font-bold text-white">{article.title}</h2>
                                <p className="text-gray-300">{article.description || 'No description available'}</p>
                            </div>
                        ))}

                        {articles?.length === 0 && <div className="py-8 text-center text-gray-400">No articles found</div>}
                    </div>
                    <div
                        ref={ref}
                        className={`my-4 text-center`}
                    >
                        {isFetchingNextPage && (
                            <div className="flex justify-center py-8">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                            </div>
                        )}
                        {/*<Button*/}
                        {/*    onClick={() => fetchNextPage()}*/}
                        {/*    disabled={!hasNextPage || isFetchingNextPage}*/}
                        {/*    className={'bg-gray-700'}*/}
                        {/*>*/}
                        {/*    Load more*/}
                        {/*</Button>*/}
                    </div>
                </div>
            )}
        </>
    );
};

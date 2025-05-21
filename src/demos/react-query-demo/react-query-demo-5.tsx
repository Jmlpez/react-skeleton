import { useQuery } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import React, { useCallback, useEffect, useState } from 'react';

interface GitHubIssue {
    id: number;
    title: string;
    state: string;
    created_at: string;
    html_url: string;
}

interface GitHubResponse {
    items: GitHubIssue[];
    total_count: number;
}

// Configuration constants
const ITEMS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 500;
const REPO = 'TanStack/query';

const useGithubIssues = (searchTerm: string, page: number, enabled: boolean) => {
    // Store the raw search input separately from the debounced search term
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    // Implement debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return useQuery<GitHubResponse>({
        queryKey: ['github-issues', debouncedSearch, page],
        queryFn: async ({ signal }) => {
            if (!debouncedSearch.trim()) return { items: [], total_count: 0 };

            const searchParams = new URLSearchParams();
            searchParams.append('q', `${debouncedSearch} is:issue repo:${REPO}`);
            searchParams.append('page', `${page}`);
            searchParams.append('per_page', '6');

            const url = `https://api.github.com/search/issues?${searchParams}`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
                signal,
            });
            return response.json();
        },
        placeholderData: (previousData) => previousData,
        enabled: Boolean(debouncedSearch.trim()) && enabled,
        staleTime: 1000 * 60 * 5,
    });
};

export const ReactQueryDemo5 = () => {
    const [enabled, setEnabled] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { data, isPlaceholderData, isLoading, isFetching, error } = useGithubIssues(search, page, enabled);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPage(1);
        setSearch(e.target.value);
    }, []);

    return (
        <>
            <Button onClick={() => setEnabled(!enabled)}>{enabled ? 'Disable' : 'Enable'}</Button>

            {enabled && (
                <div className="space-y-4">
                    <div className="relative max-w-md">
                        <Input
                            type="text"
                            placeholder={`Search ${REPO} issues...`}
                            value={search}
                            onChange={handleSearch}
                            className="pr-10"
                        />
                        {(isLoading || isFetching) && (
                            <div className="absolute top-1/2 right-3 -translate-y-1/2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                            </div>
                        )}
                    </div>

                    {error && <div className="rounded-md bg-red-50 p-4 text-red-700">Error fetching issues: {error.message}</div>}

                    {!isLoading && data?.items.length === 0 && search.trim() !== '' && (
                        <div className="rounded-md bg-gray-50 p-4 text-gray-700">
                            No issues found matching "{search}" in {REPO}.
                        </div>
                    )}

                    <div className={`space-y-2 ${isPlaceholderData || isFetching ? 'opacity-70' : ''}`}>
                        {data?.items.map((issue) => (
                            <div
                                key={issue.id}
                                className="rounded border p-4 transition-all hover:border-blue-300"
                            >
                                <a
                                    href={issue.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium hover:text-blue-600 hover:underline"
                                >
                                    {issue.title}
                                </a>
                                <div className="mt-1 text-sm text-gray-500">
                                    <span
                                        className={`mr-2 inline-block rounded px-2 py-1 text-xs ${
                                            issue.state === 'open' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                                        }`}
                                    >
                                        {issue.state}
                                    </span>
                                    Created: {new Date(issue.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    {data && data.total_count > 0 && (
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing {data.items.length} of {data.total_count} results
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1 || isFetching}
                                    className="rounded border px-4 py-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={page * ITEMS_PER_PAGE >= data.total_count || isFetching}
                                    className="rounded border px-4 py-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

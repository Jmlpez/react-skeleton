import { HttpClient } from '@services/http-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import React, { useMemo, useState } from 'react';

interface Post {
    title: string;
    description: string;
    userId: number;
    id: number;
}

const DEFAULT_USER_ID = 2;

const useCreatePost = (client: HttpClient) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newPost: Post) => {
            return await client.post<Post>('/posts', JSON.stringify(newPost));
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ['custom-posts'],
            });
        },
    });
};

const usePosts = (client: HttpClient, enabled: boolean) => {
    return useQuery<Post[], Error, Post[]>({
        queryKey: ['custom-posts'],
        queryFn: async () => await client.get<Post[]>(`/users/${DEFAULT_USER_ID}/posts`),
        enabled,
    });
};

export const ReactQueryDemo4 = () => {
    const [title, setTitle] = useState('');
    const [description, setBody] = useState('');
    const [enabled, setEnabled] = useState(false);

    const client = useMemo(() => new HttpClient('https://6802a3d70a99cb7408ea2201.mockapi.io/api/migrators/'), []);

    const mutation = useCreatePost(client);
    const post = usePosts(client, enabled);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(
            {
                title,
                description,
                id: Math.random(),
                userId: DEFAULT_USER_ID,
            },
            {
                onSuccess: async () => {
                    setTitle('');
                    setBody('');
                },
            },
        );
    };

    return (
        <>
            <Button onClick={() => setEnabled(!enabled)}>{enabled ? 'Disable' : 'Enable'}</Button>
            {enabled && (
                <div className="flex gap-2 p-4">
                    <div className={'w-1/2'}>
                        <h2 className="mb-4 text-2xl font-bold">Create New Post</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 block"
                                >
                                    Title:
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded border p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block"
                                >
                                    Body:
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full rounded border p-2"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
                            >
                                {mutation.isPending ? 'Creating...' : 'Create Post'}
                            </button>
                        </form>

                        {mutation.isError && <div className="mt-4 text-red-500">Error: {mutation.error.message}</div>}

                        {mutation.isSuccess && <div className="mt-4 text-green-500">Post created successfully!</div>}
                    </div>
                    <div className={'w-1/2 bg-gray-100'}>
                        <h2 className="mb-4 p-2 text-2xl font-bold">Posts</h2>
                        <ul>
                            {post.isLoading && <li>Loading...</li>}
                            {post.isError && <li>Error: {post.error.message}</li>}
                            {post.data &&
                                post.data.map((post) => (
                                    <li
                                        key={post.id}
                                        className={'mb-4 rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg'}
                                    >
                                        <h3 className="mb-2 text-lg font-semibold text-gray-800">{post.title}</h3>
                                        <p className="text-gray-600">{post.description.substring(0, 100)}...</p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

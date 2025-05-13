import { Button as RawButton } from '@headlessui/react';
import { HttpClient } from '@services/http-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { LucideStar } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Post {
    title: string;
    description: string;
    userId: number;
    id: number;
    rating: number;
}

type UpdatePost = Pick<Post, 'id' | 'rating'>;

const DEFAULT_USER_ID = 2;

// const POST_RATING_QK = 'posts-rating';

const postQueries = {
    all: () => ({ queryKey: ['demo-6-posts'] }),
};

const useUpdatePost = (client: HttpClient) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedPost: UpdatePost) =>
            await client.put<UpdatePost>(`users/${DEFAULT_USER_ID}/posts/${updatedPost.id}`, JSON.stringify(updatedPost)),
        onMutate: async (variables) => {
            await queryClient.cancelQueries(postQueries.all());

            const snapshot = queryClient.getQueryData<Post[]>(postQueries.all().queryKey);

            queryClient.setQueryData(postQueries.all().queryKey, (oldData: Post[]) => {
                return oldData.map((post) => {
                    return post.id === variables.id ? { ...post, rating: variables.rating } : post;
                });
            });
            return () => {
                // rollback
                queryClient.setQueryData(postQueries.all().queryKey, snapshot);
            };
        },
        onError: (_error, _variables, rollback) => {
            rollback?.();
        },
        onSettled: () => {
            return queryClient.invalidateQueries(postQueries.all());
        },
    });
};

const usePosts = (client: HttpClient, enabled: boolean) => {
    return useQuery<Post[], Error, Post[]>({
        ...postQueries.all(), // queryKey
        queryFn: async () => await client.get<Post[]>(`users/${DEFAULT_USER_ID}/posts`),
        enabled,
    });
};

type ReactQueryDemo6Props = {
    post: Post;
};

const ReactQueryDemo6Post = (props: ReactQueryDemo6Props) => {
    const { post } = props;

    const client = useMemo(() => new HttpClient('https://6802a3d70a99cb7408ea2201.mockapi.io/api/migrators/'), []);

    const mutation = useUpdatePost(client);

    return (
        <li
            key={post.id}
            className={'mb-4 rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg'}
        >
            <h3 className="mb-2 text-lg font-semibold text-gray-800">{post.title}</h3>
            <p className="text-gray-600">{post.description.substring(0, 100)}...</p>
            <div className={'relative'}>
                <div className={'flex gap-4'}>
                    {Array.from({ length: 5 }, (_, index) => {
                        const starValue = index + 1;
                        const isFilled = starValue <= post.rating;

                        return (
                            <RawButton
                                key={index}
                                onClick={() => {
                                    mutation.mutate({
                                        id: post.id,
                                        rating: starValue,
                                    });
                                }}
                                className={'w-fit cursor-pointer'}
                            >
                                <LucideStar
                                    fill={isFilled ? 'yellow' : '#111'}
                                    strokeWidth={0}
                                />
                            </RawButton>
                        );
                    })}
                </div>
            </div>
        </li>
    );
};

export const ReactQueryDemo6 = () => {
    const [enabled, setEnabled] = useState(false);

    const client = useMemo(() => new HttpClient('https://6802a3d70a99cb7408ea2201.mockapi.io/api/migrators/'), []);

    const post = usePosts(client, enabled);

    return (
        <>
            <Button onClick={() => setEnabled(!enabled)}>{enabled ? 'Disable' : 'Enable'}</Button>
            {enabled && (
                <div className="p-4">
                    <div className={'bg-gray-100'}>
                        <h2 className="mb-4 p-2 text-2xl font-bold">Posts</h2>
                        <ul>
                            {post.isLoading && <li>Loading...</li>}
                            {post.isError && <li>Error: {post.error.message}</li>}
                            {post.data &&
                                post.data.map((post) => (
                                    <ReactQueryDemo6Post
                                        post={post}
                                        key={post.id}
                                    />
                                ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

import { AlertProvider } from '@/providers/alert-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <AlertProvider>{children}</AlertProvider>
            </HelmetProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

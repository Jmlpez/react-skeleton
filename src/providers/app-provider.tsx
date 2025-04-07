import { AlertProvider } from '@/providers/alert-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales/i18n';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: PropsWithChildren) => {

    return (
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <HelmetProvider>
                    <AlertProvider>{children}</AlertProvider>
                </HelmetProvider>
            </I18nextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

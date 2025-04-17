import i18n from '@/locales/i18n';
import { AlertProvider } from '@/providers/alert-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';

const queryClient = new QueryClient();

/**
 * AppProvider component that wraps the application with various context providers.
 *
 * Providers included:
 * - QueryClientProvider: Provides React Query client for managing server state.
 * - I18nextProvider: Provides internationalization support using i18next.
 * - HelmetProvider: Manages changes to the document head.
 * - AlertProvider: Provides alert(dialogs) functionality throughout the app.
 * - ReactQueryDevtools: Provides devtools for React Query.
 */
export const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <HelmetProvider>
                    <AlertProvider>
                        <ToastProvider>{children}</ToastProvider>
                    </AlertProvider>
                </HelmetProvider>
            </I18nextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

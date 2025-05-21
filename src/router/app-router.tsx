import { DemoLoaderMenu } from '@/demos/demo-loader-menu';
import { AppMainLayout } from '@/layouts/app-main-layout';
import { AppProvider } from '@/providers/app-provider';
import { BrowserRouter, Route, Routes } from 'react-router';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <AppProvider>
                    <Routes>
                        <Route element={<AppMainLayout />}>
                            <Route
                                path="/"
                                element={<DemoLoaderMenu />}
                            />
                        </Route>
                    </Routes>
                </AppProvider>
            </AppProvider>
        </BrowserRouter>
    );
};

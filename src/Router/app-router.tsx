import { AppMainLayout } from '@/layouts/app-main-layout';
import { Home } from '@/pages/home';
import { AppProvider } from '@/providers/app-provider';
import { BrowserRouter, Route, Routes } from 'react-router';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route element={<AppMainLayout />}>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                    </Route>
                </Routes>
            </AppProvider>
        </BrowserRouter>
    );
};

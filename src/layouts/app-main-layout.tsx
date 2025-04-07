import { Outlet } from 'react-router';

export function AppMainLayout() {
    return (
        <>
            <header>This is a header</header>
            <main>
                <Outlet />
            </main>
            <footer>This is a footer</footer>
        </>
    );
}

import { Outlet } from 'react-router';

export function AppMainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-blue-500 p-4 text-white shadow-md">
                <h1 className="text-2xl font-bold">This is a header</h1>
            </header>
            <main className="flex-grow bg-gray-100 p-6">
                <Outlet />
            </main>
            <footer className="bg-blue-500 p-4 text-white shadow-md">
                <p className="text-center">&copy; 2024 Your Company</p>
            </footer>
        </div>
    );
}

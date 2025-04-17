import { AlertDemo } from '@/demos/alert-demo/alert-demo';
import { ToastDemo } from '@/demos/toast-demo/toast-demo';
import PageMetaData from '@components/PageMetaData';
import { useState } from 'react';
import { Link } from 'react-router';

const demos = [
    { id: 'placeholder', name: 'Placeholder', component: <div>Placeholder Demo Content</div> },
    { id: 'toast', name: 'Toast', component: <ToastDemo /> },
    { id: 'alert', name: 'Alert', component: <AlertDemo /> },
];

export const DemoLoaderMenu = () => {
    const [selectedDemo, setSelectedDemo] = useState(demos[1].id);
    const currentDemo = demos.find((demo) => demo.id === selectedDemo);

    return (
        <div className="flex min-h-screen">
            <PageMetaData
                title={'Demo: ' + currentDemo?.name || 'Demos'}
                description={'Demo showcase for various components'}
            />
            {/*Sidebar Menu */}
            <div className="w-64 border-r border-gray-200 bg-gray-100 p-4">
                <h2 className="mb-4 text-xl font-bold">Demos</h2>
                <nav>
                    <ul className="space-y-2">
                        {demos.map((demo) => (
                            <li key={demo.id}>
                                <button
                                    onClick={() => setSelectedDemo(demo.id)}
                                    className={`w-full rounded-md px-3 py-2 text-left ${
                                        selectedDemo === demo.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                >
                                    {demo.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-8">
                    <Link
                        to="/"
                        className="text-red-600 hover:underline"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {/* Demo Content Area */}
            <div className="flex-1 p-6">
                <h1 className="mb-6 text-2xl font-bold">{currentDemo?.name}</h1>
                <div className="rounded-lg bg-white p-6 shadow">{currentDemo?.component}</div>
            </div>
        </div>
    );
};

import { AlertDemo } from '@/demos/alert-demo/alert-demo';
import { ReactQueryDemoLoader } from '@/demos/react-query-demo/react-query-demo-loader';
import ReactTableDemoLoader from '@/demos/react-table-demo/react-table-demo-loader';
import { ToastDemo } from '@/demos/toast-demo/toast-demo';
import PageMetaData from '@components/PageMetaData';
import { Button } from '@ui/button';
import { getFromLS, saveToLS } from '@utils';
import { useState } from 'react';

const demos = [
    { id: 'placeholder', name: 'Placeholder', component: <div>Placeholder Demo Content</div> },
    { id: 'toast', name: 'Toast', component: <ToastDemo /> },
    { id: 'alert', name: 'Alert', component: <AlertDemo /> },
    { id: 'reactQuery', name: 'React Query', component: <ReactQueryDemoLoader /> },
    { id: 'reactTable', name: 'React Table', component: <ReactTableDemoLoader /> },
];

export const DemoLoaderMenu = () => {
    const [selectedDemo, setSelectedDemo] = useState(() => {
        const demoId = getFromLS('demoId');
        return demoId ?? 'reactTable';
    });
    const currentDemo = demos.find((demo) => demo.id === selectedDemo);

    return (
        <div className="grid grid-cols-2 min-h-screen">
            <PageMetaData
                title={'Demo: ' + currentDemo?.name || 'Demos'}
                description={'Demo showcase for various components'}
            />
            {/*Sidebar Menu */}
            <div className="w-fit border-r border-gray-200 bg-gray-100 p-4">
                <h2 className="mb-4 text-xl font-bold">Demos</h2>
                <nav>
                    <ul className="space-y-2">
                        {demos.map((demo) => (
                            <li key={demo.id}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => {
                                        setSelectedDemo(demo.id);
                                        saveToLS('demoId', demo.id);
                                    }}
                                    className={`w-full rounded-md px-3 py-2 text-left text-base font-bold ${
                                        selectedDemo === demo.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                    }`}
                                >
                                    {demo.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            {/* Demo Content Area */}
            <div className="w-full p-6">
                <h1 className="mb-6 text-2xl font-bold">{currentDemo?.name}</h1>
                <div className="rounded-lg bg-white p-6 shadow">{currentDemo?.component}</div>
            </div>
        </div>
    );
};

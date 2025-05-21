import ReactTableDemo from '@/demos/react-table-demo/react-table-demo';
import ReactTableDynamicDemo from '@/demos/react-table-demo/react-table-dynamic-demo';
import ReactTableRickAndMortyDemo from '@/demos/react-table-demo/react-table-rick-and-morty-demo';

function ReactTableDemoLoader() {
    return (
        <div>
            <ReactTableDemo />
            <hr className={'my-4'} />
            <ReactTableDynamicDemo />
            <hr className={'my-4'} />
            <ReactTableRickAndMortyDemo />
        </div>
    );
}

export default ReactTableDemoLoader;

import { ReactQueryDemo1 } from '@/demos/react-query-demo/react-query-demo-1';
import { ReactQueryDemo2 } from '@/demos/react-query-demo/react-query-demo-2';
import { ReactQueryDemo3 } from '@/demos/react-query-demo/react-query-demo-3';
import { ReactQueryDemo4 } from '@/demos/react-query-demo/react-query-demo-4';
import { ReactQueryDemo5 } from '@/demos/react-query-demo/react-query-demo-5';
import { ReactQueryDemo6 } from '@/demos/react-query-demo/react-query-demo-6';
import { Separator } from '@ui/separator';

export const ReactQueryDemoLoader = () => {
    return (
        <div>
            <p className={'my-4'}>
                This is a demo for the useQuery hook. It allows you to fetch data from an API and manage the loading and error states.
            </p>
            <ReactQueryDemo1 />
            <Separator className={'my-4'} />
            <p className={'my-4'}>Another demo for useQuery in order to support pagination</p>
            <ReactQueryDemo2 />
            <Separator className={'my-4'} />
            <p className={'my-4'}>React Query Demo for infinite scroll (useInfiniteQueries)</p>
            <ReactQueryDemo3 />
            <Separator className={'my-4'} />
            <p className={'my-4'}>React Query Demo for mutations (useMutation hook)</p>
            <ReactQueryDemo4 />
            <Separator className={'my-4'} />
            <p className={'my-4'}>React Query Demo for optimization performance (with search debounce)</p>
            <ReactQueryDemo5 />
            <Separator className={'my-4'} />
            <p className={'my-4'}>
                React Query Demo for <strong className={'font-bold'}> optimistic updates </strong>
            </p>
            <ReactQueryDemo6 />
            <Separator className={'my-4'} />
        </div>
    );
};

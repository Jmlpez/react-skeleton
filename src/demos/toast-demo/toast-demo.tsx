import { useToast } from '@/providers/toast-provider';
import { Button } from '@ui/button';

export const ToastDemo = () => {
    const { addToast } = useToast();

    return (
        <div className={'flex justify-between'}>
            <h5 className={'my-4'}>Select the Toast Type</h5>
            <Button
                onClick={() => {
                    addToast({
                        variant: 'info',
                        description: 'This is an info toast',
                        duration: 5,
                    });
                }}
            >
                Info
            </Button>
            <Button
                onClick={() => {
                    addToast({
                        variant: 'warning',
                        description: 'Warning, you should be careful',
                        duration: 5,
                    });
                }}
            >
                Warning
            </Button>
            <Button
                onClick={() => {
                    addToast({
                        variant: 'success',
                        description: 'Congratulations! you have been chosen',
                        duration: 5,
                    });
                    setTimeout(() => {
                        addToast({
                            variant: 'success',
                            description: 'Congratulations! you have been chosen',
                            duration: 5,
                        });
                    }, 1000);
                }}
            >
                Success
            </Button>
            <Button
                onClick={() => {
                    addToast({
                        variant: 'error',
                        description: 'Something was wrong :(',
                        duration: 5,
                    });
                }}
                variant={'destructive'}
            >
                Error
            </Button>
        </div>
    );
};

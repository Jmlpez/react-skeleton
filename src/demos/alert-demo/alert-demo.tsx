import { useAlert } from '@/providers/alert-provider';
import { Button } from '@ui/button';

export const AlertDemo = () => {
    const { showAlert } = useAlert();

    return (
        <div>
            <h2 className={'my-4'}>Select the Alert Type</h2>
            <div className={'flex justify-between'}>
                <Button
                    onClick={() =>
                        showAlert({
                            title: 'Info Alert',
                            description: 'This is an info alert',
                            variant: 'info',
                        })
                    }
                    className={'bg-blue-400 text-white'}
                >
                    Info
                </Button>
                <Button
                    onClick={() =>
                        showAlert({
                            title: 'Success Alert',
                            description: 'This is a Success alert',
                            variant: 'success',
                        })
                    }
                    className={'bg-green-500 text-white'}
                >
                    Success
                </Button>
                <Button
                    onClick={() =>
                        showAlert({
                            title: 'Warning',
                            description: 'This is an warning alert',
                            variant: 'warning',
                        })
                    }
                    className={'bg-amber-300 text-white'}
                >
                    Warning
                </Button>
                <Button
                    onClick={() =>
                        showAlert({
                            title: 'Error',
                            description: 'An error has occurred',
                            variant: 'error',
                        })
                    }
                    className={'bg-red-400 text-white'}
                >
                    Error
                </Button>
            </div>
        </div>
    );
};

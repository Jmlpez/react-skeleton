import { AlertDialog, AlertVariant } from '@/components/ui/alert-dialog';
import { LucideLoader2 } from 'lucide-react';
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

interface AlertOptions {
    variant?: AlertVariant;
    title: string;
    description?: string | React.ReactNode;
    actions?: React.ReactNode;
    closable?: boolean;
    showLoadingIcon?: boolean;
}

interface AlertContextType {
    showAlert: (options: AlertOptions) => void;
    hideAlert: () => void;
    setClosable: (canClose: boolean) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider = ({ children }: PropsWithChildren) => {
    const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [canClose, setCanClose] = useState<boolean>(true);

    const showAlert = (options: AlertOptions) => {
        const closable = options.closable !== undefined ? options.closable : true;
        setCanClose(closable);
        setAlertOptions(options);
        setIsOpen(true);
    };

    const hideAlert = () => {
        setIsOpen(false);
    };

    const setClosable = (closable: boolean) => {
        setCanClose(closable);
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert, setClosable }}>
            {children}
            {/* Global Modal Alert */}
            <AlertDialog
                open={isOpen}
                onOpenChange={(open) => {
                    if (!open && canClose) hideAlert();
                }}
                title={alertOptions?.title || ''}
                description={
                    <>
                        {alertOptions?.description}
                        <span>
                            {alertOptions?.showLoadingIcon && (
                                <span className="mt-4 flex justify-center">
                                    <LucideLoader2 className={'animate-spin'} />
                                </span>
                            )}
                        </span>
                    </>
                }
                variant={alertOptions?.variant || 'info'}
                actions={
                    alertOptions?.actions || (
                        <button
                            onClick={hideAlert}
                            className={`rounded px-4 py-2 text-white transition-colors ${
                                canClose ? 'bg-gray-800 hover:bg-gray-900' : 'cursor-not-allowed bg-gray-400'
                            }`}
                            disabled={!canClose}
                        >
                            OK
                        </button>
                    )
                }
            />
        </AlertContext.Provider>
    );
};

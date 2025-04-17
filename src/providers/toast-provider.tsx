import { Toast, ToastVariant } from '@ui/toast/toast';
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

// export interface ToastProps {
//     /**
//      * Controls whether the alert is visible.
//      */
//     open: boolean;
//
//     /**
//      * Callback triggered when visibility state changes.
//      * @param open - New visibility value
//      */
//     setIsOpen: (open: boolean) => void;
//

//
/**
 * Detailed description or additional content.
 * Can include React content like JSX.
 */
//     description?: string | React.ReactNode;
//
//     /**
//      * Toast notification duration (in seconds)
//      * until it is automatically closed
//      */
//     duration?: number;
//
//     /**
//      * Optional children content.
//      * Useful for advanced component composition.
//      */
//     children?: React.ReactNode;
//
/**
 * Show/Hide the progress bar
 */
//     showProgress?: boolean;
// }

export type ToastItem = {
    /**
     * Unique identifier for the toast item.
     */
    id: string;
    /**
     * Visual style variant of the toast.
     */
    variant?: ToastVariant;
    /**
     * Detailed description or additional content.
     * Can include React content like JSX.
     */
    description?: string | React.ReactNode;
    /**
     * Toast notification duration (in seconds)
     * until it is automatically closed
     */
    duration?: number;
    /**
     * Show/Hide the progress bar
     */
    showProgress?: boolean;
};

interface ToastContextType {
    addToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within an ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
        const id = Math.random().toString();
        setToasts((prev) => [...prev, { ...toast, id }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Global Modal Toast Container */}
            <div className="fixed right-4 bottom-4 z-50 flex flex-col-reverse gap-2">
                {toasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                        stackPosition={index}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

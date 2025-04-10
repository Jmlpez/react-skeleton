import { cn } from '@/lib/utils';
import { Dialog, DialogOverlay, DialogPortal } from '@components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import React from 'react';

export type AlertVariant = 'success' | 'info' | 'alert';

interface AlertProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string | React.ReactNode;
    variant?: AlertVariant;
    actions?: React.ReactNode;
    children?: React.ReactNode;
}

const popInAnimation = {
    animation: 'popIn 0.5s ease-out',
};

// Define a modern, professional color palette for each variant
const variantStyles = {
    success: {
        icon: (
            <CheckCircle
                size={64}
                style={{ color: '#10B981', ...popInAnimation }}
            />
        ), // Emerald 500
        headerColor: '#10B981',
    },
    info: {
        icon: (
            <Info
                size={64}
                style={{ color: '#3B82F6', ...popInAnimation }}
            />
        ), // Blue 500
        headerColor: '#3B82F6',
    },
    alert: {
        icon: (
            <AlertCircle
                size={64}
                style={{ color: '#EF4444', ...popInAnimation }}
            />
        ), // Red 500
        headerColor: '#EF4444',
    },
};

export const AlertDialog: React.FC<AlertProps> = (props) => {
    const { open, onOpenChange, title, description, variant = 'info', actions, children } = props;

    const currentVariant = variantStyles[variant];

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogPortal data-slot="dialog-portal">
                <DialogOverlay />
                <DialogPrimitive.Content
                    className={cn(
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-lg duration-200 sm:max-w-md lg:max-w-xl',
                    )}
                >
                    <div className="flex flex-col items-center text-center">
                        {/* Centered animated icon */}
                        <div>{currentVariant.icon}</div>
                        {/* Title */}
                        <DialogPrimitive.Title
                            className="mt-4 text-2xl font-bold"
                            style={{ color: currentVariant.headerColor }}
                        >
                            {title}
                        </DialogPrimitive.Title>
                        {/* Description */}
                        {description && <DialogPrimitive.Description className="mt-2 text-gray-700">{description}</DialogPrimitive.Description>}
                        {/* Custom content */}
                        {children && <div className="mt-4 w-full">{children}</div>}
                        {/* Actions */}
                        {actions && <div className="mt-6 flex justify-center space-x-3">{actions}</div>}
                    </div>
                    <DialogPrimitive.Close asChild>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
};

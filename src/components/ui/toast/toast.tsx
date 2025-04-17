import { ToastItem } from '@/providers/toast-provider';
import { Button } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AlertVariant } from '@ui/alert-dialog';
import { CircularProgress } from '@ui/circular-progress';
import { Dialog, DialogPortal, DialogTitle } from '@ui/dialog';
import { variantStyles } from '@ui/toast/toast-variants';
import { useProgressTimer } from '@ui/toast/use-progress-timer';
import { cn } from '@utils';
import { LucideX } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

// Initially the same variants are used
export type ToastVariant = AlertVariant;

interface ToastProps extends ToastItem {
    /**
     * Callback triggered when the toast is closed.
     */
    onClose: () => void;

    /**
    * Position of the toast in the stack.
    */
    stackPosition: number;
}

export const Toast = (props: ToastProps) => {
    const { onClose, stackPosition, variant = 'info', description = 'No description provided', duration = 5, showProgress = true } = props;

    const [isPaused, setIsPaused] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const touchTimer = useRef<NodeJS.Timeout>();

    const currentVariant = variantStyles[variant];

    const handleComplete = useCallback(() => {
        setIsOpen(false);
        // Wait for the animation to finish before calling onClose
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    const [progress] = useProgressTimer(duration, isPaused, handleComplete);

    // Touch interactions
    const handleTouchStart = useCallback(() => {
        touchTimer.current = setTimeout(() => {
            setIsPaused(true);
        }, 300);
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
            setIsPaused(false);
        } else {
            setIsOpen(false);
        }
    }, []);

    return (
        <Dialog
            open={isOpen}
            modal={false}
            onOpenChange={(open) => {
                // Only react to "closing" events, not to external opens
                if (!open) {
                    handleComplete();
                }
            }}
        >
            <DialogPortal data-slot="dialog-portal">
                <DialogPrimitive.Content
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                    className={cn(
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right xs:w-80 fixed right-4 bottom-4 z-50 w-4/5 rounded-md border bg-white text-white shadow-lg data-[state=closed]:duration-250 data-[state=open]:duration-250',
                    )}
                    style={{
                        bottom: `${stackPosition * 80}px`,
                        touchAction: 'none',
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <DialogTitle className={'sr-only'}>{description}</DialogTitle>
                    <div className={'flex items-stretch gap-2 rounded-md'}>
                        {/* Centered animated icon */}
                        {showProgress && (
                            <div className={'flex justify-center rounded-md bg-white p-1'}>
                                <CircularProgress
                                    progress={progress}
                                    size={65}
                                    strokeWidth={2}
                                    strokeColor={currentVariant.mainColor}
                                >
                                    {currentVariant.icon}
                                </CircularProgress>
                            </div>
                        )}
                        {/* Title */}
                        <DialogPrimitive.Description
                            className={cn(
                                'flex w-full items-center rounded-tr-md rounded-br-md px-4 text-sm',
                                showProgress ? 'text-white' : 'text-gray-700',
                            )}
                            style={{ backgroundColor: showProgress ? currentVariant.mainColor : 'transparent' }}
                        >
                            {description}
                        </DialogPrimitive.Description>
                    </div>
                    <DialogPrimitive.Close asChild>
                        <Button
                            className={'absolute top-1 right-1 rounded-full'}
                            aria-label="Close toast"
                        >
                            <LucideX className="size-6 cursor-pointer text-white hover:text-white/90" />
                        </Button>
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
};

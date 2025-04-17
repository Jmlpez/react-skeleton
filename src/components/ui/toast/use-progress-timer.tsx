import { useEffect, useState } from 'react';

export const useProgressTimer = (duration: number, isPaused: boolean, onComplete: () => void) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isPaused) return;
        if (progress >= 100) {
            onComplete();
            return;
        }

        const interval = window.setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    onComplete();
                    return 100;
                }
                return prev + 1;
            });
        }, 10 * duration);

        return () => window.clearInterval(interval);
    }, [duration, progress, isPaused, onComplete]);

    return [progress, setProgress] as const;
};

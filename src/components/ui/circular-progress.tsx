import React from 'react';

export interface CircularProgressProps {
    progress: number; // Expected to be between 0 and 100
    size?: number;
    strokeWidth?: number;
    strokeColor?: string;
    children?: React.ReactNode;
}

export const CircularProgress = (props: CircularProgressProps) => {
    const { progress, size = 100, strokeWidth = 10, strokeColor = 'blue', children } = props;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    const progressOffset = ((100 - progress) / 100) * circumference;

    return (
        <div
            className="relative inline-block"
            style={{ width: size, height: size }}
        >
            <svg
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="-rotate-90 transform"
                width={size}
                height={size}
            >
                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    className="stroke-current text-gray-200"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    // className="stroke-current"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium text-gray-700">{children || `${Math.round(progress)}%`}</span>
            </div>
        </div>
    );
};

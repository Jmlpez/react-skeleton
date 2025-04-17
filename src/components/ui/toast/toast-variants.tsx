import { LucideAlertCircle, LucideCheckCircle, LucideInfo, LucideTriangleAlert } from 'lucide-react';

// Defines icon and header color styles for each alert variant
export const variantStyles = {
    success: {
        icon: (
            <LucideCheckCircle
                size={48}
                style={{ color: '#10B981' }}
            />
        ), // Emerald 500
        mainColor: '#10B981',
    },
    warning: {
        icon: (
            <LucideTriangleAlert
                size={48}
                style={{ color: '#F59E0B' }}
            />
        ), // Emerald 500
        mainColor: '#F59E0B',
    },
    info: {
        icon: (
            <LucideInfo
                size={48}
                style={{ color: '#3B82F6' }}
            />
        ), // Blue 500
        mainColor: '#3B82F6',
    },
    error: {
        icon: (
            <LucideAlertCircle
                size={48}
                style={{ color: '#EF4444' }}
            />
        ), // Red 500
        mainColor: '#EF4444',
    },
};

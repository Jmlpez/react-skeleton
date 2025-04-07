import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names into a single string.
 *
 * @param inputs - An array of class values to merge.
 * @returns The merged class names as a single string.
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

/**
 * Guest user ID constant.
 */
export const GUEST_USER_ID = 0;

/**
 * Saves a value to local storage for a specific user.
 *
 * @param key - The key of the item to save.
 * @param value - The value to save.
 * @param userId - The ID of the user.
 */
export const saveToLS = (key: string, value: unknown, userId: number) => {
    if (value) localStorage.setItem(`user-${userId}-${key}`, JSON.stringify(value));
};

/**
 * Retrieves a value from local storage for a specific user.
 *
 * @param key - The key of the item to retrieve.
 * @param userId - The ID of the user.
 * @returns The value associated with the key for the specified user, or null if not found.
 */
export const getFromLS = (key: string, userId: number) => {
    const value = window.localStorage.getItem(`user-${userId}-${key}`);
    return value ? JSON.parse(value) : undefined;
};

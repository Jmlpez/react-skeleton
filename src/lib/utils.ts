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
 * Get list of string from members (keys) of a given Enum
 *
 * @param enumType - Enum Type
 * @returns Enum members as a list of strings
 */
export const getEnumKeys = (enumType: Record<string, string | number>): Array<string> =>
    // https://github.com/microsoft/TypeScript/issues/17198
    // https://www.angularjswiki.com/angular/names-of-enums-typescript/

    Object.keys(enumType).filter((x) => Object.values(enumType).includes(x));

/**
 * Sleep function (used only for testing and simulating delays)
 *
 * The function can be called as:  await sleep(1000)  or  sleep(1000).then(...)
 *
 * @param ms - sleep time in milliseconds
 * @returns Empty Promise
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Implements the "nameof" operator.
 *
 * @example
 *
 *```ts
 * interface Person {
 *    firstName: string;
 *   lastName: string;
 * }
 *
 * const personName = nameof<Person>("firstName");    //returns "firstName"
 *```
 * Reference: https://schneidenbach.gitbooks.io/typescript-cookbook/content/nameof-operator.html
 *
 * @returns EnumListItems list
 */
export const nameofFactory = <T>() => (name: keyof T): keyof T => name;

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

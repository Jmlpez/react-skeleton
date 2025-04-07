import { useEffect, useState } from 'react';

// Define an enum for different screen size levels
export enum ScreenSize {
    XS = 'xs', // Extra small devices (phones)
    SM = 'sm', // Small devices (large phones)
    MD = 'md', // Medium devices (tablets)
    LG = 'lg', // Large devices (desktops)
    XL = 'xl'  // Extra Large devices (desktops)
}

// Define breakpoints for each level
const BREAKPOINTS = {
    [ScreenSize.XS]: 576,  // 0-575px
    [ScreenSize.SM]: 768,  // 576-767px
    [ScreenSize.MD]: 992,  // 768-991px
    [ScreenSize.LG]: 1368,  // 992-1369px
    // XL is anything 1369px and above
};

export function useScreenSize() {
    const [currentSize, setCurrentSize] = useState<ScreenSize>();

    useEffect(() => {
        const getScreenSize = () => {
            const width = window.innerWidth;

            if (width < BREAKPOINTS[ScreenSize.XS]) {
                return ScreenSize.XS;
            } else if (width < BREAKPOINTS[ScreenSize.SM]) {
                return ScreenSize.SM;
            } else if (width < BREAKPOINTS[ScreenSize.MD]) {
                return ScreenSize.MD;
            } else if (width < BREAKPOINTS[ScreenSize.LG]) {
                return ScreenSize.LG;
            } else {
                return ScreenSize.XL;
            }
        };

        // Set initial screen size
        setCurrentSize(getScreenSize());

        // Use matchMedia for better performance
        const xsQuery = window.matchMedia(`(max-width: ${BREAKPOINTS[ScreenSize.XS] - 1}px)`);
        const smQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[ScreenSize.XS]}px) and (max-width: ${BREAKPOINTS[ScreenSize.SM] - 1}px)`);
        const mdQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[ScreenSize.SM]}px) and (max-width: ${BREAKPOINTS[ScreenSize.MD] - 1}px)`);
        const lgQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[ScreenSize.MD]}px) and (max-width: ${BREAKPOINTS[ScreenSize.LG] - 1}px)`);
        const xlQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[ScreenSize.LG]}px)`);

        const handleChange = () => {
            setCurrentSize(getScreenSize());
        };

        // Add event listeners
        xsQuery.addEventListener('change', handleChange);
        smQuery.addEventListener('change', handleChange);
        mdQuery.addEventListener('change', handleChange);
        lgQuery.addEventListener('change', handleChange);
        xlQuery.addEventListener('change', handleChange);

        return () => {
            xsQuery.removeEventListener('change', handleChange);
            smQuery.removeEventListener('change', handleChange);
            mdQuery.removeEventListener('change', handleChange);
            lgQuery.removeEventListener('change', handleChange);
            xlQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return currentSize;
}

// For backward compatibility
export function useIsMobile() {
    const screenSize = useScreenSize();
    return screenSize === ScreenSize.XS || screenSize === ScreenSize.SM;
}

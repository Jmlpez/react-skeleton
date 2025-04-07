import 'i18next';

import enAuth from './en/auth.json';
import enCommon from './en/common.json';
import enPages from './en/pages.json';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        defaultNS: 'common';
        // custom resources type
        resources: {
            pages: typeof enPages;
            common: typeof enCommon;
            auth: typeof enAuth;
        };
        // other
    }
}

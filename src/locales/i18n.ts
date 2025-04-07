import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importaciones dinámicas de traducciones

const loadTranslations = async (lang: string) => ({
    common: await import(`./${lang}/common.json`),
    pages: await import(`./${lang}/pages.json`),
    auth: await import(`./${lang}/auth.json`),
});

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: await loadTranslations('en'),
        es: await loadTranslations('es'),
    },
    ns: ['common', 'pages', 'auth'],
    defaultNS: 'common',
    react: {
        useSuspense: false,
    },
});

export default i18n;

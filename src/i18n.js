import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const { REACT_APP_DEBUG_I18NEXT } = process.env;

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: !!REACT_APP_DEBUG_I18NEXT,
        fallbackLng: 'da',
        whitelist: ['en', 'da'],

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

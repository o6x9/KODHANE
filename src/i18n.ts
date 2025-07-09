/// <reference types="vite/client" />

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: [
      'hero',
      'about',
      'services',
      'technologies',
      'team',
      'contact',
      'footer'
    ],
    defaultNS: 'hero',
    fallbackLng: 'en',

    // debug only in development mode
    debug: import.meta.env.MODE === 'development',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    }
  });

export default i18n;

import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';

export const supportedLngs = ['fr', 'en', 'de'];

i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
  detection: { 
    order: ['querystring', 'localStorage', 'navigator'],
    lookupQuerystring: 'lang',
  },
  backend: {
    loadPath: 'locales/{{lng}}.json', // Path to load translation files
  },
  interpolation: {
    escapeValue: false, // React already does escaping
  },
  fallbackLng: 'en',
  supportedLngs: supportedLngs
});

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import en from './locales/en.json';
import pl from './locales/pl.json';

const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

const getDeviceLanguage = (): string => {
  try {
    const locales = getLocales();
    if (locales.length > 0) {
      const languageCode = locales[0].languageCode;
      if (languageCode in resources) {
        return languageCode;
      }
    }
  } catch (error) {
    console.log('Error getting device language:', error);
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export default i18n;

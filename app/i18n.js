import i18n from 'i18next';
import { getBrowserDefaultLanguage } from 'utils/languageHelper';
import localeResources from './locale';

i18n.init({
  lng: localStorage.getItem('clientLang') || getBrowserDefaultLanguage() || 'en_GB',
  resources: localeResources,
  fallbackLng: 'en_GB',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;

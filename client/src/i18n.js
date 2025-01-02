import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // Passa la configurazione per react-i18next
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home'
        }
      },
      it: {
        translation: {
          home: 'Home in italiano'
        }
      }
    },
    lng: 'en', // Lingua di default
    fallbackLng: 'en', // Lingua di fallback
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
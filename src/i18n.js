import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationKN from './locales/kn/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
 kn: {
   translation: translationKN
 }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export function t(text) {
  return i18n.t(text);
}

export default i18n;
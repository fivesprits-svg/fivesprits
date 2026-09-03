import en from "@/lib/i18n/dictionaries/en.json";
import ar from "@/lib/i18n/dictionaries/ar.json";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ar,
};

export const defaultLocale: Locale = "en";

export function getDictionary(locale: string | undefined): Dictionary {
  if (!locale) return dictionaries[defaultLocale];
  if (locale in dictionaries) {
    return dictionaries[locale as Locale];
  }
  return dictionaries[defaultLocale];
}

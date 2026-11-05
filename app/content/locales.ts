// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

/** The languages the site is published in; the first is served without a prefix. */
export const locales = ["en-US", "de-DE", "ru-RU", "he-IL"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-US";

/** The first path segment of each language; English has none. */
const prefixes: Record<Locale, string> = {
  "en-US": "",
  "de-DE": "de",
  "ru-RU": "ru",
  "he-IL": "he",
};

/** The name of each language in its own language, for the language menu. */
export const localeNames: Record<Locale, string> = {
  "en-US": "English",
  "de-DE": "Deutsch",
  "ru-RU": "Русский",
  "he-IL": "עברית",
};

export function isLocale(value: unknown): value is Locale {
  return locales.some((locale) => locale === value);
}

/**
 * The language a route parameter names: none means English, and a segment that is no prefix
 * means the route does not exist.
 */
export function localeOfPrefix(segment: string | undefined): Locale | undefined {
  if (segment === undefined || segment === "") return defaultLocale;
  return locales.find((locale) => prefixes[locale] === segment && segment !== "");
}

/**
 * The path of [page] in [locale]. [page] starts with `/` and names the page in English, so
 * `/docs/commands` in German is `/de/docs/commands`.
 */
export function localePath(locale: Locale, page: string): string {
  const prefix = prefixes[locale];
  if (prefix === "") return page;
  return page === "/" ? `/${prefix}` : `/${prefix}${page}`;
}

/** The page a localized path shows, written as its English path. */
export function pageOfPath(path: string): string {
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;
  for (const locale of locales) {
    const prefix = prefixes[locale];
    if (prefix === "") continue;
    if (trimmed === `/${prefix}`) return "/";
    if (trimmed.startsWith(`/${prefix}/`)) return trimmed.slice(prefix.length + 1);
  }
  return trimmed;
}

/** The direction the text of a language runs in. */
export function textDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "he-IL" ? "rtl" : "ltr";
}

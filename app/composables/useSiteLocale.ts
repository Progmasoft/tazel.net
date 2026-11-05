// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

import {
  defaultLocale,
  localeOfPrefix,
  localePath,
  locales,
  pageOfPath,
  textDirection,
  type Locale,
} from "~/content/locales";
import { siteUrl } from "~/content/site";

/** The language of the current route; a path whose prefix names no language shows English. */
export function useSiteLocale() {
  const route = useRoute();
  const locale = computed<Locale>(() => {
    const segment = route.params.locale;
    return localeOfPrefix(typeof segment === "string" ? segment : undefined) ?? defaultLocale;
  });
  const page = computed(() => pageOfPath(route.path));
  const to = (path: string) => localePath(locale.value, path);
  return { locale, page, to };
}

/**
 * The head of a page: its title and description, the language and direction of the document,
 * and the address of the page in every language.
 */
export function usePageHead(text: () => { title: string; description: string }) {
  const { locale, page } = useSiteLocale();
  const url = (target: Locale) => `${siteUrl}${localePath(target, page.value)}`;
  useHead(() => ({
    htmlAttrs: { lang: locale.value, dir: textDirection(locale.value) },
    link: [
      { rel: "canonical", href: url(locale.value) },
      ...locales.map((target) => ({
        rel: "alternate" as const,
        hreflang: target,
        href: url(target),
      })),
      { rel: "alternate", hreflang: "x-default", href: url(defaultLocale) },
    ],
  }));
  useSeoMeta({
    title: () => text().title,
    description: () => text().description,
    ogTitle: () => text().title,
    ogDescription: () => text().description,
    ogUrl: () => url(locale.value),
    ogType: "website",
    ogSiteName: "Tazel",
    ogImage: `${siteUrl}/social.png`,
    twitterCard: "summary_large_image",
  });
}

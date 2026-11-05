// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

import type { Locale } from "~/content/locales";

/** The collection of documentation of each language. */
export const docCollections = {
  "en-US": "docs_en",
  "de-DE": "docs_de",
  "ru-RU": "docs_ru",
  "he-IL": "docs_he",
} as const satisfies Record<Locale, string>;

/** A group of the documentation tree and the pages in it, in their order. */
export type DocGroup = {
  key: string;
  path: string;
  pages: { path: string; title: string }[];
};

/**
 * The tree of the documentation in [locale]: the English tree decides which pages exist and in
 * what order, and a page the language has carries its own title.
 */
export async function loadDocTree(locale: Locale): Promise<DocGroup[]> {
  const navigation = await queryCollectionNavigation("docs_en");
  const local =
    locale === "en-US"
      ? []
      : await queryCollection(docCollections[locale]).select("path", "title").all();
  const titles = new Map(local.map((page) => [page.path, page.title]));
  const root = navigation.find((item) => item.path === "/docs")?.children ?? navigation;
  return root.map((group) => ({
    key: group.path.split("/").pop() ?? group.path,
    path: group.path,
    pages: (group.children ?? []).map((page) => ({
      path: page.path,
      title: titles.get(page.path) ?? page.title,
    })),
  }));
}

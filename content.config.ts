// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// One collection of documentation for each language. A page a language lacks is shown from
// the English collection, with a note that says so.
const docs = (folder: string) =>
  defineCollection({
    type: "page",
    source: { include: `${folder}/docs/**/*.md`, prefix: "/docs" },
    schema: z.object({ source: z.string().optional() }),
  });

export default defineContentConfig({
  collections: {
    docs_en: docs("en-US"),
    docs_de: docs("de-DE"),
    docs_ru: docs("ru-RU"),
    docs_he: docs("he-IL"),
  },
});

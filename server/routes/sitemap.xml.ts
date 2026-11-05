// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

import { localePath, locales } from "../../app/content/locales";
import { siteUrl } from "../../app/content/site";
import { queryCollection } from "@nuxt/content/server";

/** Every page, each with its address in every language. */
export default defineEventHandler(async (event) => {
  const docs = await queryCollection(event, "docs_en").select("path").all();
  const pages = ["/", ...docs.map((doc) => doc.path)];
  const entries = pages.flatMap((page) =>
    locales.map((locale) => {
      const alternates = locales
        .map(
          (other) =>
            `    <xhtml:link rel="alternate" hreflang="${other}" href="${siteUrl}${localePath(other, page)}"/>`,
        )
        .join("\n");
      return `  <url>\n    <loc>${siteUrl}${localePath(locale, page)}</loc>\n${alternates}\n  </url>`;
    }),
  );
  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
});

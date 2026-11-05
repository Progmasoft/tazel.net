// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

import { localePath, locales } from "./app/content/locales";
import { readdirSync } from "node:fs";
import type { LanguageRegistration } from "shiki";
import grammar from "./grammars/tala.tmLanguage.json";

// Every page in every language, so the generated site holds them all even before a link is found.
// The documents of the English docs, as the paths Nuxt Content gives them: without the numbers
// that order them and without the extension.
const docs = readdirSync("content/en-US/docs", { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".md"))
  .map(
    (file) =>
      "/docs/" +
      file
        .replaceAll("\\", "/")
        .replace(/\.md$/, "")
        .split("/")
        .map((segment) => segment.replace(/^\d+\./, ""))
        .join("/"),
  );
const pages = ["/", "/docs", ...docs];
const routes = locales.flatMap((locale) => pages.map((page) => localePath(locale, page)));

// The grammar of Tala from the compiler repository; fences name it `tala`.
const tala = { ...grammar, name: "tala" } as unknown as LanguageRegistration;

// The theme is set before the first paint, so a visitor who chose dark never sees a light flash.
const theme = `try{var t=localStorage.getItem("tazel-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default defineNuxtConfig({
  compatibilityDate: "2026-10-15",
  devtools: { enabled: false },
  telemetry: false,
  modules: ["@nuxt/content"],
  css: ["~/assets/site.css"],
  content: {
    experimental: { sqliteConnector: "native" },
    build: {
      markdown: {
        toc: { depth: 3 },
        highlight: {
          // Code is set on a dark ground in both themes.
          theme: "github-dark",
          langs: ["kotlin", "bash", "powershell", "properties", "json", "sql", tala],
        },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "en-US", dir: "ltr" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#032f39" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      script: [{ innerHTML: theme, tagPosition: "head" }],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...routes, "/sitemap.xml"],
      failOnError: true,
    },
  },
  typescript: { strict: true },
});

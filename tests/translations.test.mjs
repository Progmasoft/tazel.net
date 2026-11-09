// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

import { locales } from "../app/content/locales.ts";

const content = join(import.meta.dirname, "..", "content");

function pages(locale) {
  const root = join(content, locale, "docs");
  const found = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith(".md")) found.push(relative(root, path));
    }
  };
  walk(root);
  return found.sort();
}

// The language of each code block; its label, such as "Linux and macOS", is translated.
const fences = (text) => text.match(/^```\S*/gm) ?? [];
const headings = (text) =>
  (text.replace(/^```[\s\S]*?^```/gm, "").match(/^#{2,3} /gm) ?? []).length;

// A page that exists in English only would be shown in English with a note; every language has
// every page instead.
test("every documentation page exists in every language", () => {
  const english = pages("en-US");
  for (const locale of locales) {
    assert.deepEqual(pages(locale), english, `${locale} lacks or adds pages`);
  }
});

// The translated page keeps the code and the outline of the English one, so the links that point
// at its headings can be mapped one to one.
test("a translation keeps the code blocks and the headings of the English page", () => {
  for (const page of pages("en-US")) {
    const english = readFileSync(join(content, "en-US", "docs", page), "utf8");
    for (const locale of locales.filter((locale) => locale !== "en-US")) {
      const translated = readFileSync(join(content, locale, "docs", page), "utf8");
      assert.deepEqual(
        fences(translated),
        fences(english),
        `${locale}/${page}: code blocks differ`,
      );
      assert.equal(headings(translated), headings(english), `${locale}/${page}: headings differ`);
    }
  }
});

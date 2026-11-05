// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

import assert from "node:assert/strict";
import test from "node:test";

import {
  localeOfPrefix,
  localePath,
  locales,
  pageOfPath,
  textDirection,
} from "../app/content/locales.ts";

test("English has no prefix and the other languages have one", () => {
  assert.equal(localePath("en-US", "/"), "/");
  assert.equal(localePath("en-US", "/docs/reference/commands"), "/docs/reference/commands");
  assert.equal(localePath("de-DE", "/"), "/de");
  assert.equal(localePath("he-IL", "/docs/reference/commands"), "/he/docs/reference/commands");
});

test("a path names its page in every language", () => {
  for (const locale of locales) {
    for (const page of ["/", "/docs/getting-started/installation"]) {
      assert.equal(pageOfPath(localePath(locale, page)), page);
    }
  }
  assert.equal(pageOfPath("/ru/docs/reference/lockfile/"), "/docs/reference/lockfile");
  // A path that only starts like a prefix is an English page.
  assert.equal(pageOfPath("/design"), "/design");
});

test("a segment that is no prefix names no language", () => {
  assert.equal(localeOfPrefix(undefined), "en-US");
  assert.equal(localeOfPrefix(""), "en-US");
  assert.equal(localeOfPrefix("ru"), "ru-RU");
  assert.equal(localeOfPrefix("docs"), undefined);
  assert.equal(localeOfPrefix("en"), undefined);
});

test("only Hebrew runs from right to left", () => {
  assert.deepEqual(locales.map(textDirection), ["ltr", "ltr", "ltr", "rtl"]);
});

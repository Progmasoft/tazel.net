<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

# tazel.net

The site of [Tazel](https://github.com/Progmasoft/tazel), the build system and package manager of Tala, at
[tazel.net](https://tazel.net/). It is a Nuxt site generated to static files, in English, German, Russian and Hebrew.

```bash
npm ci
npm run dev          # http://localhost:3000
npm run generate     # .output/public, every page in every language
npm run check        # types
npm test             # the language helpers
npm run format:check
```

## Content

| Where                           | What                                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `app/content/`                  | the words of the pages that are not documents: the frame, the home page, the site constants                            |
| `content/<locale>/docs/`        | the documentation as Markdown, one folder per language; the numbers order the tree                                     |
| `grammars/tala.tmLanguage.json` | the grammar that highlights Tala, from the [compiler repository](https://github.com/Progmasoft/tala/tree/main/Grammar) |

The reference, under `content/en-US/docs/2.reference`, `3.extending` and `4.internals`, is copied from the
`Documents/` of Tazel and is not edited here:

```bash
node scripts/sync-docs.mjs ../tazel
```

A page a language lacks is shown in English, with a note that says so. A release of Tazel changes
`latestRelease` in `app/content/site.ts`.

## Licence

The code of the site is under AGPL-3.0-or-later with the Progmasoft Patent Grant 1.1; see [LICENSE.txt](LICENSE.txt),
[PATENTS](PATENTS) and [NOTICE.txt](NOTICE.txt). The documents copied from Tazel and the Tala grammar keep their own
licence, MPL-2.0 with the Progmasoft Exception 2.0, written at the top of each file or in the repository they come from.

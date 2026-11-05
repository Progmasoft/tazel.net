// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

// Copies the reference of Tazel from a checkout of Progmasoft/tazel into the English docs:
//
//   node scripts/sync-docs.mjs ../tazel
//
// The title of each document becomes its front matter, links between the documents become
// links between pages of the site, and links to other files of the repository go to GitHub.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const checkout = process.argv[2];
if (!checkout) {
  console.error("usage: node scripts/sync-docs.mjs <checkout of Progmasoft/tazel>");
  process.exit(2);
}

const repository = "https://github.com/Progmasoft/tazel/blob/main";
const documents = [
  { source: "CLI.md", target: "2.reference/1.commands.md", path: "/docs/reference/commands" },
  {
    source: "PROJECT_FILES.md",
    target: "2.reference/2.project-file.md",
    path: "/docs/reference/project-file",
  },
  { source: "LOCKFILE.md", target: "2.reference/3.lockfile.md", path: "/docs/reference/lockfile" },
  { source: "PLUGINS.md", target: "3.extending/1.plugins.md", path: "/docs/extending/plugins" },
  {
    source: "ARCHITECTURE.md",
    target: "4.internals/1.architecture.md",
    path: "/docs/internals/architecture",
  },
];
const pages = new Map(documents.map((document) => [document.source, document.path]));

function link(target) {
  const [file, anchor] = target.split("#", 2);
  const suffix = anchor === undefined ? "" : `#${anchor}`;
  if (file === "") return target;
  const page = pages.get(file);
  if (page) return `${page}${suffix}`;
  if (file.startsWith("../")) return `${repository}/${file.slice(3)}${suffix}`;
  return `${repository}/Documents/${file}${suffix}`;
}

function convert(text, source) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const spdx = lines.filter((line) => line.startsWith("<!-- SPDX-"));
  const body = lines.filter((line) => !line.startsWith("<!-- SPDX-"));
  const titleIndex = body.findIndex((line) => line.startsWith("# "));
  if (titleIndex < 0) throw new Error(`${source} has no title`);
  const title = body[titleIndex].slice(2).replace(/`/g, "");
  body.splice(0, titleIndex + 1);
  while (body[0] === "") body.shift();
  const firstParagraph = [];
  for (const line of body) {
    if (line === "") break;
    firstParagraph.push(line);
  }
  const paragraph = firstParagraph
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*]/g, "")
    .replace(/"/g, "'");
  // The first sentence describes the page to search engines.
  const description = paragraph.match(/^.*?\.(?=\s|$)/)?.[0] ?? paragraph;
  const converted = body
    .join("\n")
    .replace(/\]\(((?!https?:|mailto:|#)[^)\s]+)\)/g, (_, target) => `](${link(target)})`);
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `source: ${JSON.stringify(`${repository}/Documents/${source}`)}`,
    "---",
    "",
    ...spdx,
    "",
    converted.trimEnd(),
    "",
  ].join("\n");
}

const root = resolve(import.meta.dirname, "../content/en-US/docs");
for (const document of documents) {
  const text = readFileSync(join(checkout, "Documents", document.source), "utf8");
  const target = join(root, document.target);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, convert(text, document.source));
  console.log(`${document.source} -> content/en-US/docs/${document.target}`);
}

// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

/** The address the site is published at, without a trailing slash. */
export const siteUrl = "https://tazel.net";

/** The newest release of Tazel; a release of Tazel changes it. */
export const latestRelease = "0.4.0.3";

/** Its kind: Rolling, LTS or ELTS. Every release before 1.0.0.0 is Rolling. */
export const latestChannel = "Rolling";

export const repository = "https://github.com/Progmasoft/tazel";
export const releaseNotes = `${repository}/releases/tag/tazel-${latestRelease}`;
export const reference = {
  commands: `${repository}/blob/main/Documents/CLI.md`,
  projectFile: `${repository}/blob/main/Documents/PROJECT_FILES.md`,
  plugins: `${repository}/blob/main/Documents/PLUGINS.md`,
  lockfile: `${repository}/blob/main/Documents/LOCKFILE.md`,
};

/** The other sites of the Tala family and of Progmasoft. */
export const family = {
  tala: "https://tala.run/",
  talac: "https://talac.tala.run/",
  viget: "https://viget.progmasoft.com/",
  progmasoft: "https://progmasoft.com/",
};

/** The first page of the documentation, where /docs leads. */
export const firstDocPage = "/docs/getting-started/installation";

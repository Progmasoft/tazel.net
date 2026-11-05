// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

/** The words of the frame around every page. */
export type Chrome = {
  skip: string;
  docs: string;
  reference: string;
  plugins: string;
  releases: string;
  getStarted: string;
  source: string;
  language: string;
  toDark: string;
  toLight: string;
  menu: string;
  copy: string;
  copied: string;
  footer: {
    tagline: string;
    product: string;
    family: string;
    company: string;
    releaseNotes: string;
    reference: string;
    license: string;
  };
  notFound: { title: string; text: string; home: string };
  docsNav: {
    groups: Record<string, string>;
    onThisPage: string;
    englishOnly: string;
    previous: string;
    next: string;
    edit: string;
    pages: string;
  };
};

export type Feature = { title: string; text: string };

/** The home page in one language. */
export type HomeText = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  lead: string;
  start: string;
  commands: string;
  release: string;
  featuresHeading: string;
  featuresLead: string;
  features: readonly Feature[];
  stepsHeading: string;
  steps: readonly Feature[];
  sampleHeading: string;
  sampleLead: string;
  closingHeading: string;
  closingText: string;
  closingAction: string;
};

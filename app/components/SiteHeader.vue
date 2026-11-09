<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<script setup lang="ts">
import { chrome } from "~/content/chrome";
import { localeNames, localePath, locales } from "~/content/locales";
import {
  firstDocPage,
  latestChannel,
  latestRelease,
  releaseNotes,
  repository,
} from "~/content/site";

const { locale, page, to } = useSiteLocale();
const words = computed(() => chrome[locale.value]);
// The one link of the header leads into the documentation and is current on
// every page of it.
const links = computed(() => [{ label: words.value.docs, path: firstDocPage, part: "/docs" }]);

// A menu closes when a link in it is followed.
const route = useRoute();
const languages = ref<HTMLDetailsElement>();
const menu = ref<HTMLDetailsElement>();
watch(
  () => route.fullPath,
  () => {
    if (languages.value) languages.value.open = false;
    if (menu.value) menu.value.open = false;
  },
);
</script>

<template>
  <header class="header">
    <div class="shell bar">
      <NuxtLink :to="to('/')" class="brand" aria-label="Tazel">
        <TazelLogo class="logo" />
      </NuxtLink>

      <a class="release" :href="releaseNotes" :title="words.releaseNotes"
        >{{ latestRelease }} <span>· {{ latestChannel }}</span></a
      >

      <nav class="links" :aria-label="words.menu">
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="to(link.path)"
          :class="{ active: page.startsWith(link.part) }"
          >{{ link.label }}</NuxtLink
        >
      </nav>

      <SiteSearch class="site-search" />

      <div class="tools">
        <details ref="languages" class="dropdown">
          <summary class="language" :aria-label="words.language" :title="words.language">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path
                d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"
              />
            </svg>
            <span>{{ localeNames[locale] }}</span>
            <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m7 10 5 5 5-5" />
            </svg>
          </summary>
          <ul>
            <li v-for="target in locales" :key="target">
              <NuxtLink
                :to="localePath(target, page)"
                :hreflang="target"
                :lang="target"
                :aria-current="target === locale ? 'true' : undefined"
                >{{ localeNames[target] }}</NuxtLink
              >
            </li>
          </ul>
        </details>
        <ThemeToggle />
        <a class="icon-button" :href="repository" :aria-label="words.source" :title="words.source">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="filled">
            <path
              d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
            />
          </svg>
        </a>
        <details ref="menu" class="dropdown mobile">
          <summary class="icon-button" :aria-label="words.menu" :title="words.menu">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </summary>
          <ul>
            <li v-for="link in links" :key="link.path">
              <NuxtLink :to="to(link.path)">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </details>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--line);
  background: var(--header);
  backdrop-filter: saturate(160%) blur(12px);
}

.bar {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 68px;
}

.brand {
  display: flex;
  color: var(--brand-900);
}

:root[data-theme="dark"] .brand {
  color: #e3f1f3;
}

.logo {
  height: 30px;
  width: auto;
}

.links {
  display: flex;
  gap: 4px;
}

.links a {
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--ink-700);
  font-weight: 550;
}

.links a:hover,
.links a.active {
  background: var(--surface-muted);
  color: var(--ink-950);
  text-decoration: none;
}

.release {
  flex: none;
  padding: 4px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-950);
  font-size: 0.85rem;
  font-weight: 650;
  white-space: nowrap;
}

.release span {
  color: var(--ink-700);
  font-weight: 500;
}

.release:hover {
  background: var(--surface-muted);
  text-decoration: none;
}

.site-search {
  margin-inline-start: auto;
}

.tools {
  display: flex;
  align-items: center;
  gap: 4px;
}

.language {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 10px;
  border-radius: 8px;
  color: var(--ink-700);
  font-weight: 550;
  cursor: pointer;
}

.language:hover {
  background: var(--surface-muted);
  color: var(--ink-950);
}

.language svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentcolor;
  stroke-width: 1.8;
}

.language .chevron {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.dropdown {
  position: relative;
}

.dropdown summary {
  list-style: none;
}

.dropdown summary::-webkit-details-marker {
  display: none;
}

.dropdown ul {
  position: absolute;
  inset-inline-end: 0;
  top: calc(100% + 8px);
  min-width: 180px;
  margin: 0;
  padding: 6px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-raised);
  box-shadow: var(--shadow);
  list-style: none;
}

.dropdown li a {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--ink-950);
}

.dropdown li a:hover,
.dropdown li a[aria-current="true"] {
  background: var(--surface-muted);
  text-decoration: none;
}

.dropdown li a[aria-current="true"] {
  font-weight: 650;
}

.mobile {
  display: none;
}

@media (max-width: 760px) {
  .links {
    display: none;
  }

  .mobile {
    display: block;
  }

  .site-search,
  .release,
  .language span,
  .language .chevron {
    display: none;
  }

  .tools {
    margin-inline-start: auto;
  }
}
</style>

<style>
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--ink-700);
  cursor: pointer;
}

.icon-button:hover {
  background: var(--surface-muted);
  color: var(--ink-950);
}

.icon-button svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-button svg.filled {
  fill: currentColor;
  stroke: none;
}
</style>

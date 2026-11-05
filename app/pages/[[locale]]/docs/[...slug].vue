<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<script setup lang="ts">
import { chrome } from "~/content/chrome";
import { localeOfPrefix } from "~/content/locales";
import { firstDocPage } from "~/content/site";

definePageMeta({
  validate: (route) =>
    localeOfPrefix(typeof route.params.locale === "string" ? route.params.locale : undefined) !==
    undefined,
});

const route = useRoute();
const { locale, to } = useSiteLocale();
const words = computed(() => chrome[locale.value].docsNav);
const path = computed(() => {
  const slug = route.params.slug;
  const parts = Array.isArray(slug) ? slug : slug ? [slug] : [];
  return `/docs/${parts.filter(Boolean).join("/")}`.replace(/\/$/, "");
});

if (path.value === "/docs") await navigateTo(to(firstDocPage), { redirectCode: 301 });

const { data } = await useAsyncData(
  () => `doc:${locale.value}:${path.value}`,
  async () => {
    const own = await queryCollection(docCollections[locale.value]).path(path.value).first();
    const page = own ?? (await queryCollection("docs_en").path(path.value).first());
    const tree = await loadDocTree(locale.value);
    const [previous, next] = await queryCollectionItemSurroundings("docs_en", path.value, {
      fields: ["title"],
    });
    return { page, english: own === null && locale.value !== "en-US", tree, previous, next };
  },
);

if (!data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const page = computed(() => data.value!.page!);
const tree = computed(() => data.value!.tree);
const group = computed(() => tree.value.find((g) => g.pages.some((p) => p.path === path.value)));
const titleOf = (target: string, fallback: string) =>
  tree.value.flatMap((g) => g.pages).find((p) => p.path === target)?.title ?? fallback;
const toc = computed(() => page.value.body?.toc?.links ?? []);
const source = computed(() => (page.value as { source?: string }).source);

usePageHead(() => ({
  title: `${page.value.title} · Tazel`,
  description: page.value.description ?? "",
}));
</script>

<template>
  <div class="docs-layout">
    <details class="mobile-tree">
      <summary>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
        {{ words.pages }}
      </summary>
      <DocsTree :groups="tree" :current="path" />
    </details>

    <aside class="sidebar">
      <DocsTree :groups="tree" :current="path" />
    </aside>

    <article class="article">
      <nav class="crumbs" aria-label="Breadcrumb">
        <NuxtLink :to="to(firstDocPage)">{{ words.pages }}</NuxtLink>
        <span v-if="group" aria-hidden="true">/</span>
        <span v-if="group">{{ words.groups[group.key] ?? group.key }}</span>
      </nav>
      <h1>{{ page.title }}</h1>
      <p v-if="data?.english" class="english" lang="en">{{ words.englishOnly }}</p>
      <div
        class="prose"
        :dir="data?.english ? 'ltr' : undefined"
        :lang="data?.english ? 'en' : undefined"
      >
        <ContentRenderer :value="page" />
      </div>

      <nav class="pager">
        <NuxtLink v-if="data?.previous" :to="to(data.previous.path)" class="previous">
          <small>{{ words.previous }}</small>
          <span>{{ titleOf(data.previous.path, data.previous.title) }}</span>
        </NuxtLink>
        <NuxtLink v-if="data?.next" :to="to(data.next.path)" class="next">
          <small>{{ words.next }}</small>
          <span>{{ titleOf(data.next.path, data.next.title) }}</span>
        </NuxtLink>
      </nav>
      <p v-if="source" class="edit">
        <a :href="source">{{ words.edit }}</a>
      </p>
    </article>

    <aside v-if="toc.length" class="toc">
      <p>{{ words.onThisPage }}</p>
      <ul>
        <li v-for="link in toc" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
          <ul v-if="link.children?.length">
            <li v-for="child in link.children" :key="child.id">
              <a :href="`#${child.id}`">{{ child.text }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.docs-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 220px;
  gap: 48px;
  width: min(100% - 32px, 1400px);
  margin-inline: auto;
}

.sidebar,
.toc {
  position: sticky;
  top: 69px;
  align-self: start;
  max-height: calc(100vh - 69px);
  overflow-y: auto;
  padding-block: 32px;
}

.sidebar {
  padding-inline-end: 16px;
  border-inline-end: 1px solid var(--line);
}

.mobile-tree {
  display: none;
}

.article {
  min-width: 0;
  max-width: 820px;
  padding-block: 32px 96px;
}

.crumbs {
  display: flex;
  gap: 8px;
  color: var(--ink-500);
  font-size: 0.9rem;
}

.crumbs a {
  color: var(--ink-500);
}

h1 {
  margin: 10px 0 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.english {
  margin: 16px 0 0;
  padding: 10px 14px;
  border-inline-start: 4px solid var(--gold);
  border-radius: 6px;
  background: var(--surface-muted);
  color: var(--ink-700);
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 64px;
}

.pager a {
  display: flex;
  flex-direction: column;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--ink-950);
}

.pager a:hover {
  border-color: var(--brand-600);
  text-decoration: none;
}

.pager small {
  color: var(--ink-500);
}

.pager span {
  color: var(--link);
  font-weight: 650;
}

.pager .next {
  grid-column: 2;
  text-align: end;
}

.edit {
  margin-top: 24px;
  font-size: 0.9rem;
}

.toc p {
  margin: 0 0 10px;
  color: var(--ink-950);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.toc ul {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.88rem;
}

.toc ul ul {
  padding-inline-start: 12px;
}

.toc a {
  display: block;
  padding: 3px 0;
  color: var(--ink-500);
}

.toc a:hover {
  color: var(--ink-950);
  text-decoration: none;
}

@media (max-width: 1180px) {
  .docs-layout {
    grid-template-columns: 240px minmax(0, 1fr);
  }

  .toc {
    display: none;
  }
}

@media (max-width: 860px) {
  .docs-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .sidebar {
    display: none;
  }

  .mobile-tree {
    display: block;
    margin-top: 16px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
  }

  .mobile-tree summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    font-weight: 650;
    cursor: pointer;
    list-style: none;
  }

  .mobile-tree summary::-webkit-details-marker {
    display: none;
  }

  .mobile-tree summary svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
  }

  .mobile-tree > :deep(.tree) {
    padding: 0 8px 10px;
  }
}
</style>

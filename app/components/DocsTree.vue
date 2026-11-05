<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<!-- The tree of the documentation: a group for each folder, open while it holds the current page. -->
<script setup lang="ts">
import { chrome } from "~/content/chrome";
import type { DocGroup } from "~/composables/useDocs";

defineProps<{ groups: DocGroup[]; current: string }>();
const { locale, to } = useSiteLocale();
const groupTitles = computed(() => chrome[locale.value].docsNav.groups);
</script>

<template>
  <nav class="tree" :aria-label="chrome[locale].docsNav.pages">
    <details
      v-for="group in groups"
      :key="group.path"
      :open="group.pages.some((page) => page.path === current) || undefined"
      class="group"
    >
      <summary>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" /></svg>
        {{ groupTitles[group.key] ?? group.key }}
      </summary>
      <ul>
        <li v-for="page in group.pages" :key="page.path">
          <NuxtLink
            :to="to(page.path)"
            :aria-current="page.path === current ? 'page' : undefined"
            >{{ page.title }}</NuxtLink
          >
        </li>
      </ul>
    </details>
  </nav>
</template>

<style scoped>
.tree {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.94rem;
}

summary {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 8px;
  border-radius: 6px;
  color: var(--ink-950);
  font-weight: 650;
  cursor: pointer;
  list-style: none;
  user-select: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary:hover {
  background: var(--surface-muted);
}

summary svg {
  width: 14px;
  height: 14px;
  flex: none;
  fill: none;
  stroke: var(--ink-500);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.15s;
}

:root[dir="rtl"] summary svg {
  transform: scaleX(-1);
}

details[open] > summary svg {
  transform: rotate(90deg);
}

ul {
  margin: 2px 0 8px;
  padding: 0;
  padding-inline-start: 15px;
  list-style: none;
}

li a {
  display: block;
  padding: 5px 10px;
  border-inline-start: 1px solid var(--line);
  color: var(--ink-700);
}

li a:hover {
  border-inline-start-color: var(--ink-500);
  color: var(--ink-950);
  text-decoration: none;
}

li a[aria-current="page"] {
  border-inline-start: 2px solid var(--gold-strong);
  color: var(--link);
  font-weight: 650;
}
</style>

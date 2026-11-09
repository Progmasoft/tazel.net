<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<script setup lang="ts">
import { chrome } from "~/content/chrome";
import { docCollections } from "~/composables/useDocs";

type Section = { id: string; title: string; titles: string[]; content: string };

const { locale, to } = useSiteLocale();
const words = computed(() => chrome[locale.value].search);
const router = useRouter();

const query = ref("");
const open = ref(false);
const active = ref(0);
const input = ref<HTMLInputElement>();
// The sections of the documentation of each language, read once, when the box is first used.
const sections = new Map<string, Section[]>();
const loaded = ref<Section[]>([]);

async function load() {
  const collection = docCollections[locale.value];
  if (!sections.has(collection)) {
    sections.set(collection, await queryCollectionSearchSections(collection));
  }
  loaded.value = sections.get(collection) ?? [];
}

watch(locale, () => {
  loaded.value = [];
  if (open.value) void load();
});

// A section matches when every word of the query is in its heading path or its text; matches in
// the heading come first.
const results = computed(() => {
  const words = query.value.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return loaded.value
    .map((section) => {
      const heading = [...section.titles, section.title].join(" ").toLocaleLowerCase();
      const text = section.content.toLocaleLowerCase();
      if (!words.every((word) => heading.includes(word) || text.includes(word))) return null;
      const score = words.filter((word) => heading.includes(word)).length;
      const at = text.indexOf(words[0] ?? "");
      const excerpt =
        at < 0
          ? section.content.slice(0, 110)
          : (at > 40 ? "…" : "") + section.content.slice(Math.max(0, at - 40), at + 80);
      return { section, score, excerpt };
    })
    .filter((result) => result !== null)
    .sort((left, right) => right.score - left.score)
    .slice(0, 8);
});

watch(results, () => (active.value = 0));

function focus() {
  open.value = true;
  void load();
}

function go(id: string) {
  open.value = false;
  query.value = "";
  input.value?.blur();
  void router.push(to(id));
}

function onKey(event: KeyboardEvent) {
  const count = results.value.length;
  if (event.key === "ArrowDown" && count) {
    active.value = (active.value + 1) % count;
    event.preventDefault();
  } else if (event.key === "ArrowUp" && count) {
    active.value = (active.value - 1 + count) % count;
    event.preventDefault();
  } else if (event.key === "Enter") {
    const chosen = results.value[active.value];
    if (chosen) go(chosen.section.id);
  } else if (event.key === "Escape") {
    open.value = false;
    input.value?.blur();
  }
}

// Ctrl K or ⌘ K moves to the box from anywhere on the page.
function onShortcut(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    input.value?.focus();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onShortcut);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onShortcut);
});
</script>

<template>
  <div class="search">
    <label class="box">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <input
        ref="input"
        v-model="query"
        type="search"
        :placeholder="words.placeholder"
        :aria-label="words.label"
        autocomplete="off"
        spellcheck="false"
        @focus="focus"
        @blur="open = false"
        @keydown="onKey"
      />
      <kbd>Ctrl K</kbd>
    </label>
    <ul v-if="open && query.trim()" class="results" role="listbox">
      <li v-if="!results.length" class="empty">{{ words.empty }}</li>
      <li
        v-for="(result, index) in results"
        :key="result.section.id"
        role="option"
        :aria-selected="index === active"
        :class="{ active: index === active }"
        @mousedown.prevent="go(result.section.id)"
        @mouseenter="active = index"
      >
        <span class="path">{{ result.section.titles.join(" › ") }}</span>
        <span class="title">{{ result.section.title }}</span>
        <span class="excerpt">{{ result.excerpt }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  flex: 1 1 340px;
  max-width: 440px;
}

.box {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 10px 0 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-muted);
  color: var(--ink-700);
  cursor: text;
}

.box:focus-within {
  border-color: var(--brand-500, var(--ink-700));
  background: var(--surface-raised);
}

.box svg {
  flex: none;
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentcolor;
  stroke-width: 2;
  stroke-linecap: round;
}

input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  color: var(--ink-950);
  font: inherit;
  font-size: 0.94rem;
  outline: none;
}

input::-webkit-search-cancel-button {
  display: none;
}

kbd {
  flex: none;
  padding: 2px 6px;
  border: 1px solid var(--line);
  border-radius: 5px;
  color: var(--ink-700);
  font-family: inherit;
  font-size: 0.75rem;
}

.results {
  position: absolute;
  inset-inline: 0;
  top: calc(100% + 8px);
  max-height: 70vh;
  margin: 0;
  padding: 6px;
  overflow-y: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-raised);
  box-shadow: var(--shadow);
  list-style: none;
}

.results li {
  display: grid;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.results li.active {
  background: var(--surface-muted);
}

.results .empty {
  color: var(--ink-700);
  cursor: default;
}

.path {
  color: var(--ink-700);
  font-size: 0.78rem;
}

.title {
  color: var(--ink-950);
  font-weight: 650;
}

.excerpt {
  overflow: hidden;
  color: var(--ink-700);
  font-size: 0.85rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

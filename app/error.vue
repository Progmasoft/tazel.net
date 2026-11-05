<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<script setup lang="ts">
import { chrome } from "~/content/chrome";
import { localePath } from "~/content/locales";

const { locale } = useSiteLocale();
const words = computed(() => chrome[locale.value].notFound);
useHead(() => ({
  title: `${words.value.title} · Tazel`,
  meta: [{ name: "robots", content: "noindex" }],
}));
</script>

<template>
  <SiteHeader />
  <main id="content" class="shell missing">
    <TazelLogo mark class="leopard" />
    <h1>{{ words.title }}</h1>
    <p>{{ words.text }}</p>
    <NuxtLink class="button button-brand" :to="localePath(locale, '/')">{{ words.home }}</NuxtLink>
  </main>
  <SiteFooter />
</template>

<style scoped>
.missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 96px 120px;
  text-align: center;
}

.leopard {
  width: 160px;
  color: var(--brand-600);
  opacity: 0.5;
}

h1 {
  margin: 24px 0 8px;
}

p {
  margin: 0 0 28px;
  color: var(--ink-700);
}
</style>

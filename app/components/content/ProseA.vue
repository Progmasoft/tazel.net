<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<!-- A link of a document: a page of the site keeps the language of the reader. -->
<script setup lang="ts">
const props = defineProps<{ href?: string; target?: string }>();
const { to } = useSiteLocale();
const local = computed(() => props.href?.startsWith("/") ?? false);
</script>

<template>
  <NuxtLink v-if="local" :to="to(href!)"><slot /></NuxtLink>
  <a v-else :href="href" :target="target"><slot /></a>
</template>

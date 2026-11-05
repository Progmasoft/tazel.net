<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<!-- A sample with the name of its file and a button that copies it. -->
<script setup lang="ts">
import { chrome } from "~/content/chrome";

const props = defineProps<{ label: string; code: string }>();
const { locale } = useSiteLocale();
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
  } catch {
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1600);
}
</script>

<template>
  <figure class="code">
    <figcaption class="code-bar">
      <span>{{ label }}</span>
      <button type="button" @click="copy">
        {{ copied ? chrome[locale].copied : chrome[locale].copy }}
      </button>
    </figcaption>
    <pre><code>{{ code }}</code></pre>
  </figure>
</template>

<style scoped>
figure {
  margin: 0;
}
</style>

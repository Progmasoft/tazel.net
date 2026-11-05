<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<!--
  Text in which the flags of a command line, such as `--jobs` or `--`, are set as code that a
  line never breaks inside; a browser would otherwise break after their dashes.
-->
<script setup lang="ts">
const props = defineProps<{ text: string }>();

// A flag starts a word: the dash of "Build-System" or of the Hebrew "ב-Kotlin" is not one.
const flag = /((?<![\p{L}\p{N}_-])--?[A-Za-z][\w-]*|(?<![\p{L}\p{N}_-])--(?=[\s.,;:)]|$))/u;
const parts = computed(() =>
  props.text
    .split(flag)
    .filter((part) => part !== "")
    .map((part) => ({ part, code: flag.test(part) && /^-/.test(part) })),
);
</script>

<template>
  <template v-for="(item, index) in parts" :key="index"
    ><code v-if="item.code" class="flag">{{ item.part }}</code
    ><template v-else>{{ item.part }}</template></template
  >
</template>

<style>
.flag {
  white-space: nowrap;
  direction: ltr;
  unicode-bidi: isolate;
  font-size: 0.92em;
}
</style>

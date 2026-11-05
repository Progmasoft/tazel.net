<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<!-- The pictures of the features on the home page, in their order. -->
<script setup lang="ts">
defineProps<{ index: number }>();

const paths = [
  // A project file.
  "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4",
  // Fresh: a circular arrow with a check.
  "M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4M9 12.5l2 2 4-4",
  // The machine: a processor.
  "M8 8h8v8H8zM5 5h14v14H5zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3",
  // Cache and remote builds: a cloud with an arrow.
  "M7 18a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.5A4 4 0 0 1 17 18M12 12v7M9 16l3 3 3-3",
  // The lockfile: a padlock.
  "M6 11h12v10H6zM9 11V8a3 3 0 0 1 6 0v3M12 15v2",
  // Plugins: a puzzle piece.
  "M9 4h4v2a1.5 1.5 0 0 0 3 0V4h3v5h-2a1.5 1.5 0 0 0 0 3h2v7h-5v-2a1.5 1.5 0 0 0-3 0v2H4v-5h2a1.5 1.5 0 0 0 0-3H4V4h5",
];
</script>

<template>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path :d="paths[index % paths.length]" />
  </svg>
</template>

<style scoped>
svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>

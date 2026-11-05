<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<!-- Switches between the light and the dark theme and remembers the choice in this browser. -->
<script setup lang="ts">
import { chrome } from "~/content/chrome";

const { locale } = useSiteLocale();
const dark = ref(false);

onMounted(() => {
  dark.value = document.documentElement.dataset.theme === "dark";
});

function toggle() {
  dark.value = !dark.value;
  const theme = dark.value ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("tazel-theme", theme);
  } catch {
    // Without storage the choice lasts until the page is left.
  }
}
</script>

<template>
  <button
    type="button"
    class="icon-button"
    :aria-label="dark ? chrome[locale].toLight : chrome[locale].toDark"
    :title="dark ? chrome[locale].toLight : chrome[locale].toDark"
    @click="toggle"
  >
    <svg class="sun" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path
        d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
      />
    </svg>
    <svg class="moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  </button>
</template>

<style scoped>
/* The theme the page starts in is set before the first paint, so the icon follows it from CSS. */
.sun {
  display: none;
}

:root[data-theme="dark"] .sun {
  display: block;
}

:root[data-theme="dark"] .moon {
  display: none;
}
</style>

<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<script setup lang="ts">
import { chrome } from "~/content/chrome";

const { locale } = useSiteLocale();
</script>

<template>
  <a class="skip" href="#content">{{ chrome[locale].skip }}</a>
  <SiteHeader />
  <main id="content">
    <NuxtPage />
  </main>
  <SiteFooter />
</template>

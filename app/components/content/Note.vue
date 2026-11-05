<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<!-- A remark beside the text of a document, written ::note in Markdown. -->
<template>
  <aside class="note"><slot /></aside>
</template>

<style scoped>
.note {
  margin: 24px 0;
  padding: 14px 18px;
  border-inline-start: 4px solid var(--gold);
  border-radius: 6px;
  background: var(--surface-muted);
  color: var(--ink-700);
}

.note :deep(p) {
  margin: 0;
}
</style>

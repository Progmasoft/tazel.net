<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<script setup lang="ts">
import { chrome } from "~/content/chrome";
import { family } from "~/content/site";

const { locale } = useSiteLocale();
const words = computed(() => chrome[locale.value]);
</script>

<template>
  <footer class="footer">
    <div class="shell grid">
      <div class="about">
        <TazelLogo class="logo" />
        <p>{{ words.footer.tagline }}</p>
      </div>
      <nav :aria-label="words.footer.family">
        <h2>{{ words.footer.family }}</h2>
        <ul>
          <li><a :href="family.tala">Tala</a></li>
          <li><a :href="family.talac">Talac</a></li>
          <li><a :href="family.viget">ViGet</a></li>
        </ul>
      </nav>
      <nav :aria-label="words.footer.company">
        <h2>{{ words.footer.company }}</h2>
        <ul>
          <li><a :href="family.progmasoft">progmasoft.com</a></li>
        </ul>
      </nav>
    </div>
    <div class="shell legal">
      <p>{{ words.footer.license }}</p>
      <p>© 2026 Progmasoft</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 56px 32px;
  background: var(--brand-950);
  color: #c4d6da;
}

.grid {
  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);
  gap: 32px;
}

.logo {
  height: 30px;
  width: auto;
  color: #e3f1f3;
}

.about p {
  max-width: 320px;
  margin: 14px 0 0;
}

h2 {
  margin: 0 0 12px;
  color: #fff;
  font-size: 0.95rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li + li {
  margin-top: 6px;
}

a {
  color: #c4d6da;
}

a:hover {
  color: #fff;
}

.legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgb(255 255 255 / 10%);
  font-size: 0.875rem;
  color: #8ea9ae;
}

.legal p {
  margin: 0;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  .about {
    grid-column: 1 / -1;
  }
}
</style>

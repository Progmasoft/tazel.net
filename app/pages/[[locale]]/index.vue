<!-- SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com> -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1 -->

<script setup lang="ts">
import { home, projectSample, terminalSample } from "~/content/home";
import { localeOfPrefix } from "~/content/locales";
import { repository } from "~/content/site";

definePageMeta({
  validate: (route) =>
    localeOfPrefix(typeof route.params.locale === "string" ? route.params.locale : undefined) !==
    undefined,
});

const { locale, to } = useSiteLocale();
const text = computed(() => home[locale.value]);
usePageHead(() => text.value);

// The headline is two sentences; the second carries the colour of the leopard.
const headline = computed(() => {
  const [first, ...rest] = text.value.headline.split(". ");
  return { first: rest.length ? `${first}.` : first, second: rest.join(". ") };
});
</script>

<template>
  <div>
    <section class="hero">
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">{{ text.eyebrow }}</p>
          <h1>
            {{ headline.first }}
            <span v-if="headline.second" class="accent">{{ headline.second }}</span>
          </h1>
          <p class="lead"><ProseText :text="text.lead" /></p>
          <div class="actions">
            <NuxtLink class="button button-gold" :to="to('/docs/getting-started/first-project')">{{
              text.start
            }}</NuxtLink>
            <NuxtLink class="button button-ghost" :to="to('/docs/reference/commands')">{{
              text.commands
            }}</NuxtLink>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <TazelLogo mark class="leopard" />
          <div class="terminal">
            <span class="dots"><i /><i /><i /></span>
            <pre><code>{{ terminalSample }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section-heading">
          <h2>{{ text.featuresHeading }}</h2>
          <p>{{ text.featuresLead }}</p>
        </div>
        <ul class="features">
          <li v-for="(feature, index) in text.features" :key="feature.title">
            <span class="icon"><FeatureIcon :index="index" /></span>
            <h3>{{ feature.title }}</h3>
            <p><ProseText :text="feature.text" /></p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section section-muted">
      <div class="shell sample">
        <div>
          <div class="section-heading">
            <h2>{{ text.stepsHeading }}</h2>
            <p>{{ text.sampleLead }}</p>
          </div>
          <ol class="steps">
            <li v-for="step in text.steps" :key="step.title">
              <h3>{{ step.title }}</h3>
              <p><ProseText :text="step.text" /></p>
            </li>
          </ol>
        </div>
        <CodeBlock label="BUILD.kts" :code="projectSample" />
      </div>
    </section>

    <section class="closing">
      <div class="shell closing-inner">
        <div>
          <h2>{{ text.closingHeading }}</h2>
          <p>{{ text.closingText }}</p>
        </div>
        <a class="button button-gold" :href="repository">{{ text.closingAction }}</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-block: 88px 96px;
  background:
    radial-gradient(circle at 78% 30%, rgb(242 184 75 / 14%), transparent 38%),
    radial-gradient(circle at 10% 110%, rgb(13 116 134 / 55%), transparent 45%),
    linear-gradient(160deg, var(--brand-900), var(--brand-950));
  color: #fff;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 56px;
}

/* A wide terminal scrolls inside its cell instead of widening the page. */
.hero-grid > *,
.sample > * {
  min-width: 0;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--gold);
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

h1 {
  margin: 0;
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.accent {
  display: block;
  color: var(--gold);
}

.lead {
  max-width: 560px;
  margin: 22px 0 0;
  color: #c9dde1;
  font-size: 1.15rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.hero-art {
  position: relative;
  min-height: 340px;
}

.leopard {
  position: absolute;
  inset-inline-end: -8%;
  top: -6%;
  width: 115%;
  color: rgb(255 255 255 / 7%);
}

.terminal {
  position: relative;
  margin-top: 80px;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 12px;
  background: rgb(2 22 27 / 82%);
  box-shadow: 0 30px 60px rgb(0 0 0 / 35%);
  direction: ltr;
  text-align: left;
}

.dots {
  display: flex;
  gap: 6px;
  padding: 12px 14px 0;
}

.dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(255 255 255 / 18%);
}

.dots i:first-child {
  background: var(--gold);
}

.terminal pre {
  margin: 0;
  padding: 14px 18px 20px;
  overflow-x: auto;
  color: #dcebee;
  font-size: 0.88rem;
  line-height: 1.7;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.features li {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface-raised);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.features li:hover {
  border-color: var(--brand-600);
  box-shadow: var(--shadow);
}

.icon {
  display: inline-flex;
  padding: 10px;
  border-radius: 10px;
  background: var(--brand-100);
  color: var(--link);
}

.features h3,
.steps h3 {
  margin: 16px 0 8px;
  font-size: 1.1rem;
}

.features p,
.steps p {
  margin: 0;
  color: var(--ink-700);
}

.sample {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 56px;
}

.steps {
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}

.steps li {
  position: relative;
  padding-inline-start: 56px;
  counter-increment: step;
}

.steps li + li {
  margin-top: 24px;
}

.steps li::before {
  content: counter(step);
  position: absolute;
  inset-inline-start: 0;
  top: 12px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--brand-900);
  color: var(--gold);
  font-weight: 700;
}

.steps h3 {
  margin-top: 12px;
}

.closing {
  padding-block: 64px;
  background: linear-gradient(120deg, var(--brand-800), var(--brand-900));
  color: #fff;
}

.closing-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.closing h2 {
  margin: 0 0 8px;
  font-size: 1.8rem;
}

.closing p {
  max-width: 640px;
  margin: 0;
  color: #c9dde1;
}

@media (max-width: 960px) {
  .hero-grid,
  .sample {
    grid-template-columns: 1fr;
  }

  .hero-art {
    min-height: 0;
  }

  .terminal {
    margin-top: 0;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero {
    padding-block: 56px 64px;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .closing-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

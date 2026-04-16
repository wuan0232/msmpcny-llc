<template>
  <section class="callout">
    <div class="container callout-inner">
      <p class="callout-text">
        Call us today at
        <a class="callout-phone" :href="`tel:${phone}`">
          {{ phoneFormatted }}
        </a>
        to schedule an appointment to evaluate and treat your musculoskeletal pain problem.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    phone?: string
  }>(),
  {
    phone: '315-478-9710',
  },
)

const { phone } = props
const phoneFormatted = phone
</script>

<style scoped>
.callout {
  background: var(--brand-red);
  padding: 26px 0;
  width: 100%;
  overflow-x: hidden;
}

.callout-inner {
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.callout-text {
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 600;
}

.callout-phone {
  color: #ffffff;
  font-weight: 900;
  text-decoration: none;
}
</style>


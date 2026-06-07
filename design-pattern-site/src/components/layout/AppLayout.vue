<script setup lang="ts">
import AppHeader from './AppHeader.vue'

const emit = defineEmits<{
  search: [query: string]
}>()
</script>

<template>
  <div class="min-h-screen bg-bg text-[var(--color-text)]">
    <AppHeader @search="emit('search', $event)" />
    <main class="pt-14 md:pt-16">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  color?: string
}>()
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
    :style="{
      backgroundColor: (color ?? 'var(--color-primary)') + '18',
      color: color ?? 'var(--color-primary)',
    }"
  >
    {{ text }}
  </span>
</template>

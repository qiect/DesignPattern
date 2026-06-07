<script setup lang="ts">
import * as icons from 'lucide-vue-next'

const props = defineProps<{
  title: string
  subtitle?: string
  icon?: string
}>()

function resolveIcon(name: string) {
  return (icons as Record<string, unknown>)[name] ?? null
}
</script>

<template>
  <div class="flex items-center gap-3 mb-4">
    <div class="w-1 h-8 rounded-full bg-primary shrink-0" />
    <div class="flex items-center gap-2">
      <component
        v-if="icon"
        :is="resolveIcon(icon)"
        :size="20"
        class="text-primary shrink-0"
      />
      <div>
        <h2 class="font-display text-xl font-semibold text-[var(--color-text)] leading-tight">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-sm text-dim mt-0.5">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

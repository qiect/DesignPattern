<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Pattern } from '@/types/pattern'
import StarRating from './StarRating.vue'
import TagBadge from './TagBadge.vue'

const props = defineProps<{
  pattern: Pattern
}>()

const router = useRouter()

const categoryColors: Record<string, string> = {
  creational: '#00d4aa',
  structural: '#6c8cff',
  behavioral: '#ff6b35',
}

function navigate() {
  router.push(`/pattern/${props.pattern.id}`)
}
</script>

<template>
  <div
    class="relative bg-bg-card rounded-xl border border-border overflow-hidden cursor-pointer
           transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,212,170,0.1)]
           hover:border-primary/30"
    :style="{ borderLeftWidth: '3px', borderLeftColor: categoryColors[pattern.category] }"
    @click="navigate"
  >
    <div class="p-5">
      <!-- Header -->
      <div class="flex items-start justify-between mb-3">
        <div>
          <h3 class="font-display text-lg font-semibold text-[var(--color-text)]">{{ pattern.name }}</h3>
          <p class="text-xs text-dim mt-0.5">{{ pattern.nameEn }}</p>
        </div>
        <StarRating :rating="pattern.difficulty" />
      </div>

      <!-- Description -->
      <p class="text-sm text-[var(--color-text-dim)] leading-relaxed mb-4 line-clamp-2">
        {{ pattern.simpleExplanation }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5">
        <TagBadge
          v-for="tag in pattern.tags.slice(0, 3)"
          :key="tag"
          :text="tag"
          :color="categoryColors[pattern.category]"
        />
      </div>
    </div>
  </div>
</template>

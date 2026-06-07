<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ChevronRight } from 'lucide-vue-next'
import { categories } from '@/data/categories'
import { getPatternById } from '@/data/index'

defineProps<{
  activePatternId: string
}>()

const collapsed = ref<Record<string, boolean>>({})

function toggle(categoryId: string) {
  collapsed.value[categoryId] = !collapsed.value[categoryId]
}
</script>

<template>
  <aside class="w-60 shrink-0 bg-bg-card border-r border-border overflow-y-auto h-full">
    <div class="py-4">
      <div v-for="category in categories" :key="category.id" class="mb-1">
        <!-- Category header -->
        <button
          class="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-bg-hover transition-colors"
          @click="toggle(category.id)"
        >
          <component
            :is="collapsed[category.id] ? ChevronRight : ChevronDown"
            :size="14"
            class="text-dim shrink-0"
          />
          <span
            class="w-2 h-2 rounded-full shrink-0"
            :style="{ backgroundColor: category.color }"
          />
          <span class="text-[var(--color-text)]">{{ category.name }}</span>
        </button>

        <!-- Pattern links -->
        <div v-if="!collapsed[category.id]" class="ml-6">
          <router-link
            v-for="patternId in category.patternIds"
            :key="patternId"
            :to="`/pattern/${patternId}`"
            class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors"
            :class="activePatternId === patternId
              ? 'text-primary bg-primary/10'
              : 'text-dim hover:text-[var(--color-text)] hover:bg-bg-hover'"
          >
            {{ getPatternById(patternId)?.name ?? patternId }}
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

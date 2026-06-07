<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CodeExample } from '@/types/pattern'
import CodeBlock from './CodeBlock.vue'

const props = defineProps<{
  examples: CodeExample[]
}>()

const activeIndex = ref(0)

const activeExample = computed(() => props.examples[activeIndex.value])

const tabs = computed(() =>
  props.examples.map((ex, i) => ({
    label: ex.language === 'csharp' ? 'C#' : 'TypeScript',
    index: i,
  }))
)
</script>

<template>
  <div class="rounded-lg border border-border overflow-hidden">
    <!-- Tab 栏 -->
    <div class="flex items-center border-b border-border bg-bg-card">
      <button
        v-for="tab in tabs"
        :key="tab.index"
        class="relative px-5 py-2.5 text-sm font-medium transition-colors"
        :class="[
          activeIndex === tab.index
            ? 'text-primary'
            : 'text-dim hover:text-[var(--color-text)]'
        ]"
        @click="activeIndex = tab.index"
      >
        {{ tab.label }}
        <span
          v-if="activeIndex === tab.index"
          class="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
        />
      </button>
    </div>

    <!-- 代码区域 -->
    <CodeBlock
      v-if="activeExample"
      :code="activeExample.code"
      :language="activeExample.language"
      :highlights="activeExample.highlights"
    />
  </div>
</template>

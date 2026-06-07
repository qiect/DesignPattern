<script setup lang="ts">
import { ref, onMounted, watch, shallowRef } from 'vue'
import { createHighlighter, type Highlighter } from 'shiki'
import { Copy, Check } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const props = defineProps<{
  code: string
  language: 'csharp' | 'typescript'
  highlights?: number[]
}>()

const { theme } = useTheme()

const highlightedHtml = ref('')
const highlighter = shallowRef<Highlighter | null>(null)
const copied = ref(false)

async function initHighlighter() {
  highlighter.value = await createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: ['csharp', 'typescript'],
  })
}

function highlight() {
  if (!highlighter.value) return

  const shikiTheme = theme.value === 'light' ? 'vitesse-light' : 'vitesse-dark'

  const html = highlighter.value.codeToHtml(props.code, {
    lang: props.language,
    theme: shikiTheme,
  })

  if (props.highlights?.length) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const lines = doc.querySelectorAll('.line')
    lines.forEach((line, i) => {
      if (props.highlights!.includes(i + 1)) {
        line.classList.add('highlighted-line')
      }
    })
    highlightedHtml.value = doc.body.innerHTML
  } else {
    highlightedHtml.value = html
  }
}

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

onMounted(async () => {
  await initHighlighter()
  highlight()
})

watch(() => [props.code, props.language, props.highlights, theme.value], highlight)
</script>

<template>
  <div class="relative rounded-lg border border-border bg-bg-card overflow-hidden">
    <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-bg">
      <span class="text-xs text-dim font-mono uppercase tracking-wider">{{ language === 'csharp' ? 'C#' : 'TypeScript' }}</span>
      <button
        class="p-1.5 rounded text-dim hover:text-[var(--color-text)] hover:bg-bg-card transition-colors"
        title="Copy code"
        @click="copyCode"
      >
        <Check v-if="copied" :size="14" class="text-primary" />
        <Copy v-else :size="14" />
      </button>
    </div>
    <div class="overflow-x-auto p-4">
      <div
        class="shiki-container"
        v-html="highlightedHtml"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.shiki) {
  background: transparent !important;
  font-size: 13px;
  line-height: 1.7;
  tab-size: 2;
}

:deep(.line) {
  display: block;
  min-height: 1.7em;
  padding: 0 1rem;
  border-left: 3px solid transparent;
  transition: background-color 0.2s;
}

:deep(.highlighted-line) {
  background-color: rgba(0, 212, 170, 0.08);
  border-left-color: var(--color-primary);
}
</style>

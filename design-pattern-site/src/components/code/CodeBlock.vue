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
  <div class="code-block-wrapper relative">
    <!-- 复制按钮 -->
    <button
      class="absolute top-3 right-3 z-10 p-1.5 rounded-md text-dim hover:text-[var(--color-text)] hover:bg-bg-hover transition-colors"
      title="复制代码"
      @click="copyCode"
    >
      <Check v-if="copied" :size="14" class="text-primary" />
      <Copy v-else :size="14" />
    </button>
    <div class="overflow-x-auto px-5 py-4">
      <div
        class="shiki-container"
        v-html="highlightedHtml"
      />
    </div>
  </div>
</template>

<style scoped>
.code-block-wrapper {
  background: var(--color-bg);
  border-radius: 0 0 0.5rem 0.5rem;
}

:deep(.shiki) {
  background: transparent !important;
  font-size: 13px;
  line-height: 1.7;
  tab-size: 2;
  padding: 0;
  margin: 0;
  counter-reset: line-number;
}

:deep(.line) {
  display: block;
  min-height: 1.7em;
  padding: 0 0.5rem;
  border-left: 3px solid transparent;
  transition: background-color 0.2s;
}

:deep(.highlighted-line) {
  background-color: var(--highlight-line-bg, rgba(0, 212, 170, 0.08));
  border-left-color: var(--color-primary);
}

[data-theme="light"] .code-block-wrapper :deep(.highlighted-line) {
  --highlight-line-bg: rgba(0, 168, 138, 0.08);
}
</style>

<script setup lang="ts">
import mermaid from 'mermaid'
import { ref, onMounted, watch } from 'vue'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#1a1b2e',
    primaryTextColor: '#e4e4f0',
    primaryBorderColor: '#00d4aa',
    lineColor: '#6c8cff',
    secondaryColor: '#222340',
    tertiaryColor: '#0f1021',
    fontFamily: 'Outfit, Noto Sans SC, sans-serif',
  },
})

const props = defineProps<{
  code: string
}>()

const containerRef = ref<HTMLDivElement>()
let renderId = 0

async function renderDiagram() {
  if (!containerRef.value || !props.code) return

  renderId++
  const id = `uml-${renderId}`

  try {
    const { svg } = await mermaid.render(id, props.code)
    containerRef.value.innerHTML = svg
  } catch (e) {
    console.error('Mermaid render error:', e)
    containerRef.value.innerHTML = '<p class="text-dim text-sm p-4">Diagram render failed</p>'
  }
}

onMounted(renderDiagram)

watch(() => props.code, renderDiagram)
</script>

<template>
  <div class="rounded-lg border border-border bg-bg-card p-4 overflow-auto">
    <div ref="containerRef" class="flex justify-center" />
  </div>
</template>

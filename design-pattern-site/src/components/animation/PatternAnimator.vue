<script setup lang="ts">
import { computed } from 'vue'
import type { AnimationStep } from '@/types/pattern'
import { useTheme } from '@/composables/useTheme'

const props = defineProps<{
  steps: AnimationStep[]
  currentStep: number
}>()

const { theme } = useTheme()

const currentStepData = computed(() => props.steps[props.currentStep] ?? { description: '', objects: [], arrows: [] })
const currentObjects = computed(() => currentStepData.value.objects)
const currentArrows = computed(() => currentStepData.value.arrows)

// 主题相关的 SVG 颜色
const svgColors = computed(() => ({
  text: theme.value === 'light' ? '#1a1b2e' : '#e4e4f0',
  dim: theme.value === 'light' ? '#6b6b88' : '#8888a8',
  structural: theme.value === 'light' ? '#4a6cf7' : '#6c8cff',
  accent: theme.value === 'light' ? '#e05520' : '#ff6b35',
}))

function getObjectById(id: string) {
  return currentObjects.value.find((o) => o.id === id)
}

function getArrowCoords(arrow: { from: string; to: string }) {
  const fromObj = getObjectById(arrow.from)
  const toObj = getObjectById(arrow.to)
  if (!fromObj || !toObj) return null

  const fw = fromObj.width ?? (fromObj.type === 'circle' ? 80 : 120)
  const fh = fromObj.height ?? (fromObj.type === 'circle' ? 80 : 50)
  const tw = toObj.width ?? (toObj.type === 'circle' ? 80 : 120)
  const th = toObj.height ?? (toObj.type === 'circle' ? 80 : 50)

  const fx = fromObj.x + fw / 2
  const fy = fromObj.y + fh / 2
  const tx = toObj.x + tw / 2
  const ty = toObj.y + th / 2

  return { x1: fx, y1: fy, x2: tx, y2: ty }
}
</script>

<template>
  <div>
    <svg viewBox="0 0 600 300" class="w-full rounded-lg bg-bg-card border border-border">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" :fill="svgColors.structural" />
        </marker>
        <marker
          id="arrowhead-accent"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" :fill="svgColors.accent" />
        </marker>
      </defs>

      <!-- Arrows -->
      <line
        v-for="arrow in currentArrows"
        :key="`${arrow.from}-${arrow.to}`"
        v-bind="getArrowCoords(arrow)"
        :stroke="arrow.color ?? svgColors.structural"
        :stroke-width="2"
        :stroke-dasharray="arrow.dashed ? '6 4' : undefined"
        :marker-end="arrow.color === '#ff6b35' || arrow.color === svgColors.accent ? 'url(#arrowhead-accent)' : 'url(#arrowhead)'"
        :class="{ 'flow-arrow': arrow.animated }"
      />

      <!-- Arrow labels -->
      <text
        v-for="arrow in currentArrows.filter((a) => a.label && getArrowCoords(a))"
        :key="`label-${arrow.from}-${arrow.to}`"
        v-bind="(() => {
          const c = getArrowCoords(arrow)!
          return { x: (c.x1 + c.x2) / 2, y: (c.y1 + c.y2) / 2 - 6 }
        })()"
        text-anchor="middle"
        fill="currentColor"
        class="svg-dim-fill"
        font-size="11"
        font-family="Outfit, sans-serif"
      >{{ arrow.label }}</text>

      <!-- Objects -->
      <g
        v-for="obj in currentObjects"
        :key="obj.id"
        :transform="`translate(${obj.x}, ${obj.y})`"
        :opacity="obj.opacity ?? 1"
        class="transition-all duration-500 ease-in-out"
      >
        <rect
          v-if="obj.type === 'rect'"
          :width="obj.width ?? 120"
          :height="obj.height ?? 50"
          :rx="8"
          :fill="obj.color"
          fill-opacity="0.2"
          :stroke="obj.color"
          stroke-width="2"
        />
        <circle
          v-else-if="obj.type === 'circle'"
          :r="(obj.width ?? 80) / 2"
          :fill="obj.color"
          fill-opacity="0.2"
          :stroke="obj.color"
          stroke-width="2"
        />
        <rect
          v-else-if="obj.type === 'diamond'"
          :width="obj.width ?? 80"
          :height="obj.height ?? 80"
          :rx="4"
          :fill="obj.color"
          fill-opacity="0.2"
          :stroke="obj.color"
          stroke-width="2"
          transform="rotate(45)"
          :x="-(obj.width ?? 80) / 2"
          :y="-(obj.height ?? 80) / 2"
        />
        <text
          text-anchor="middle"
          dominant-baseline="central"
          :x="(obj.type === 'rect' ? (obj.width ?? 120) / 2 : 0)"
          :y="(obj.type === 'rect' ? (obj.height ?? 50) / 2 : 0)"
          :fill="svgColors.text"
          font-size="13"
          font-family="Outfit, sans-serif"
        >{{ obj.label }}</text>
      </g>
    </svg>

    <p
      v-if="currentStepData.description"
      class="mt-3 text-sm text-dim text-center"
    >
      {{ currentStepData.description }}
    </p>
  </div>
</template>

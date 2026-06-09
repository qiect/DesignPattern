<script setup lang="ts">
import { computed } from 'vue'
import type { AnimationStep, AnimObject, AnimArrow } from '@/types/pattern'
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
  bg: theme.value === 'light' ? '#f0f0f6' : '#12122a',
}))

function getObjectById(id: string) {
  return currentObjects.value.find((o) => o.id === id)
}

function getObjCenter(obj: AnimObject) {
  const w = obj.width ?? (obj.type === 'circle' ? 80 : 120)
  const h = obj.height ?? (obj.type === 'circle' ? 80 : 50)
  return { cx: obj.x + w / 2, cy: obj.y + h / 2, w, h }
}

// 计算从对象边缘出发的箭头端点，避免穿过对象
function getArrowPath(arrow: AnimArrow) {
  const fromObj = getObjectById(arrow.from)
  const toObj = getObjectById(arrow.to)
  if (!fromObj || !toObj) return null

  const from = getObjCenter(fromObj)
  const to = getObjCenter(toObj)

  const dx = to.cx - from.cx
  const dy = to.cy - from.cy
  const angle = Math.atan2(dy, dx)

  // 从 from 边缘出发
  const fromR = fromObj.type === 'circle'
    ? (fromObj.width ?? 80) / 2 + 4
    : getRectEdgeDist(from.w, from.h, angle) + 4
  const x1 = from.cx + Math.cos(angle) * fromR
  const y1 = from.cy + Math.sin(angle) * fromR

  // 到 to 边缘结束（留出箭头空间）
  const toR = toObj.type === 'circle'
    ? (toObj.width ?? 80) / 2 + 12
    : getRectEdgeDist(to.w, to.h, angle + Math.PI) + 12
  const x2 = to.cx - Math.cos(angle) * toR
  const y2 = to.cy - Math.sin(angle) * toR

  // 添加微弱弧度让箭头更优雅
  const dist = Math.sqrt(dx * dx + dy * dy)
  const curveOffset = dist > 100 ? 8 : 0
  const perpX = -Math.sin(angle) * curveOffset
  const perpY = Math.cos(angle) * curveOffset
  const midX = (x1 + x2) / 2 + perpX
  const midY = (y1 + y2) / 2 + perpY

  return { x1, y1, x2, y2, midX, midY }
}

function getRectEdgeDist(w: number, h: number, angle: number): number {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return Math.min(w / 2 / Math.abs(cos || 0.001), h / 2 / Math.abs(sin || 0.001))
}

function getArrowLabelPos(arrow: AnimArrow) {
  const path = getArrowPath(arrow)
  if (!path) return null
  return { x: path.midX, y: path.midY - 8 }
}
</script>

<template>
  <div class="animator-container rounded-xl border border-border overflow-hidden">
    <svg
      viewBox="0 0 600 280"
      class="w-full"
      :style="{ background: svgColors.bg }"
    >
      <defs>
        <!-- 箭头标记 -->
        <marker id="anim-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 L2 3 Z" :fill="svgColors.structural" />
        </marker>
        <marker id="anim-arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 L2 3 Z" :fill="svgColors.accent" />
        </marker>
        <!-- 发光滤镜 -->
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- 箭头路径 -->
      <template v-for="(arrow, i) in currentArrows" :key="`arrow-${i}`">
        <path
          v-bind="(() => {
            const p = getArrowPath(arrow)
            if (!p) return {}
            return { d: `M${p.x1},${p.y1} Q${p.midX},${p.midY} ${p.x2},${p.y2}` }
          })()"
          :stroke="arrow.color ?? svgColors.structural"
          :stroke-width="arrow.animated ? 2.5 : 1.5"
          :stroke-dasharray="arrow.dashed ? '6 4' : undefined"
          fill="none"
          :marker-end="arrow.color === '#ff6b35' || arrow.color === svgColors.accent ? 'url(#anim-arrow-accent)' : 'url(#anim-arrow)'"
          :class="{ 'flow-arrow': arrow.animated }"
          stroke-linecap="round"
        />
      </template>

      <!-- 箭头标签 -->
      <template v-for="(arrow, i) in currentArrows" :key="`label-${i}`">
        <g v-if="arrow.label && getArrowLabelPos(arrow)">
          <rect
            :x="getArrowLabelPos(arrow)!.x - 24"
            :y="getArrowLabelPos(arrow)!.y - 9"
            width="48" height="16" rx="4"
            :fill="svgColors.bg" fill-opacity="0.9"
          />
          <text
            v-bind="getArrowLabelPos(arrow)!"
            text-anchor="middle"
            dominant-baseline="central"
            :fill="arrow.color ?? svgColors.structural"
            font-size="10"
            font-weight="500"
            font-family="Outfit, Noto Sans SC, sans-serif"
          >{{ arrow.label }}</text>
        </g>
      </template>

      <!-- 对象 -->
      <g
        v-for="obj in currentObjects"
        :key="obj.id"
        :transform="`translate(${obj.x}, ${obj.y})`"
        :opacity="obj.opacity ?? 1"
        class="anim-object"
      >
        <!-- 矩形 -->
        <template v-if="obj.type === 'rect'">
          <rect
            :width="obj.width ?? 120"
            :height="obj.height ?? 50"
            :rx="10"
            :fill="obj.color"
            fill-opacity="0.12"
            :stroke="obj.color"
            stroke-width="1.5"
          />
          <rect
            :width="obj.width ?? 120"
            :height="3"
            :x="0"
            :y="0"
            :rx="10"
            :fill="obj.color"
            fill-opacity="0.6"
          />
          <text
            text-anchor="middle"
            dominant-baseline="central"
            :x="(obj.width ?? 120) / 2"
            :y="(obj.height ?? 50) / 2 + 2"
            :fill="svgColors.text"
            font-size="13"
            font-weight="600"
            font-family="Outfit, Noto Sans SC, sans-serif"
          >{{ obj.label }}</text>
        </template>

        <!-- 圆形 -->
        <template v-else-if="obj.type === 'circle'">
          <circle
            :cx="(obj.width ?? 80) / 2"
            :cy="(obj.height ?? 80) / 2"
            :r="(obj.width ?? 80) / 2"
            :fill="obj.color"
            fill-opacity="0.12"
            :stroke="obj.color"
            stroke-width="1.5"
          />
          <text
            text-anchor="middle"
            dominant-baseline="central"
            :x="(obj.width ?? 80) / 2"
            :y="(obj.height ?? 80) / 2"
            :fill="svgColors.text"
            font-size="12"
            font-weight="600"
            font-family="Outfit, Noto Sans SC, sans-serif"
          >{{ obj.label }}</text>
        </template>

        <!-- 菱形 -->
        <template v-else-if="obj.type === 'diamond'">
          <rect
            :width="obj.width ?? 80"
            :height="obj.height ?? 80"
            :rx="6"
            :fill="obj.color"
            fill-opacity="0.12"
            :stroke="obj.color"
            stroke-width="1.5"
            transform="rotate(45)"
            :x="-(obj.width ?? 80) / 2"
            :y="-(obj.height ?? 80) / 2"
          />
          <text
            text-anchor="middle"
            dominant-baseline="central"
            x="0"
            y="0"
            :fill="svgColors.text"
            font-size="12"
            font-weight="600"
            font-family="Outfit, Noto Sans SC, sans-serif"
          >{{ obj.label }}</text>
        </template>
      </g>
    </svg>

    <!-- 步骤描述 -->
    <div class="px-5 py-3 bg-bg-card border-t border-border flex items-center gap-3">
      <span class="shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
        {{ currentStep + 1 }}
      </span>
      <p class="text-sm text-[var(--color-text)] leading-relaxed">
        {{ currentStepData.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.anim-object {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
}

@keyframes flowArrow {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
.flow-arrow {
  stroke-dasharray: 8 6;
  animation: flowArrow 0.8s linear infinite;
}
</style>

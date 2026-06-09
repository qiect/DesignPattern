<script setup lang="ts">
import { ref, watch, onUnmounted, computed } from 'vue'
import { SkipBack, Play, Pause, SkipForward, RotateCcw } from 'lucide-vue-next'

const props = defineProps<{
  totalSteps: number
  currentStep: number
}>()

const emit = defineEmits<{
  'update:currentStep': [step: number]
}>()

const isPlaying = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const progress = computed(() => props.totalSteps > 1 ? props.currentStep / (props.totalSteps - 1) : 0)

function prev() {
  if (props.currentStep > 0) {
    emit('update:currentStep', props.currentStep - 1)
  }
}

function next() {
  if (props.currentStep < props.totalSteps - 1) {
    emit('update:currentStep', props.currentStep + 1)
  }
}

function reset() {
  stopPlay()
  emit('update:currentStep', 0)
}

function togglePlay() {
  if (isPlaying.value) {
    stopPlay()
  } else {
    startPlay()
  }
}

function startPlay() {
  if (props.currentStep >= props.totalSteps - 1) {
    emit('update:currentStep', 0)
  }
  isPlaying.value = true
  timer = setInterval(() => {
    if (props.currentStep < props.totalSteps - 1) {
      emit('update:currentStep', props.currentStep + 1)
    } else {
      stopPlay()
    }
  }, 2500)
}

function stopPlay() {
  isPlaying.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(() => props.currentStep, () => {
  if (isPlaying.value && props.currentStep >= props.totalSteps - 1) {
    stopPlay()
  }
})

onUnmounted(stopPlay)
</script>

<template>
  <div class="step-player">
    <!-- 进度条 -->
    <div class="h-1 bg-border rounded-full overflow-hidden mb-3">
      <div
        class="h-full bg-primary rounded-full transition-all duration-500 ease-out"
        :style="{ width: `${progress * 100}%` }"
      />
    </div>

    <!-- 步骤点 -->
    <div class="flex items-center justify-between mb-3 px-0.5">
      <button
        v-for="i in totalSteps"
        :key="i"
        class="step-dot w-2.5 h-2.5 rounded-full transition-all duration-300"
        :class="i - 1 === currentStep
          ? 'bg-primary scale-125 shadow-[0_0_6px_var(--color-primary)]'
          : i - 1 < currentStep
            ? 'bg-primary/40'
            : 'bg-border'"
        @click="emit('update:currentStep', i - 1)"
      />
    </div>

    <!-- 控制按钮 -->
    <div class="flex items-center gap-2">
      <button
        class="ctrl-btn"
        title="上一步"
        :disabled="currentStep === 0"
        @click="prev"
      >
        <SkipBack :size="15" />
      </button>

      <button
        class="ctrl-btn-play"
        :title="isPlaying ? '暂停' : '播放'"
        @click="togglePlay"
      >
        <Pause v-if="isPlaying" :size="16" />
        <Play v-else :size="16" />
      </button>

      <button
        class="ctrl-btn"
        title="下一步"
        :disabled="currentStep === totalSteps - 1"
        @click="next"
      >
        <SkipForward :size="15" />
      </button>

      <button
        class="ctrl-btn ml-1"
        title="重置"
        @click="reset"
      >
        <RotateCcw :size="14" />
      </button>

      <span class="ml-auto text-xs text-dim font-mono tabular-nums">
        {{ currentStep + 1 }} / {{ totalSteps }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.ctrl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-dim);
  cursor: pointer;
  transition: all 0.2s ease;
}
.ctrl-btn:hover:not(:disabled) {
  color: var(--color-text);
  border-color: var(--color-primary);
}
.ctrl-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.ctrl-btn-play {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 15%, transparent);
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}
.ctrl-btn-play:hover {
  background: color-mix(in srgb, var(--color-primary) 25%, transparent);
}

.step-dot {
  cursor: pointer;
  border: none;
  padding: 0;
}
</style>

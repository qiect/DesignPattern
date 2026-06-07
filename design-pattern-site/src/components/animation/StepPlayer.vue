<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
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
  }, 2000)
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
  <div class="flex items-center gap-2">
    <button
      class="p-2 rounded-md bg-bg-card border border-border text-dim hover:text-[var(--color-text)] hover:border-primary transition-colors"
      title="Previous"
      @click="prev"
    >
      <SkipBack :size="16" />
    </button>

    <button
      class="p-2 rounded-md bg-primary/20 border border-primary text-primary hover:bg-primary/30 transition-colors"
      :title="isPlaying ? 'Pause' : 'Play'"
      @click="togglePlay"
    >
      <Pause v-if="isPlaying" :size="16" />
      <Play v-else :size="16" />
    </button>

    <button
      class="p-2 rounded-md bg-bg-card border border-border text-dim hover:text-[var(--color-text)] hover:border-primary transition-colors"
      title="Next"
      @click="next"
    >
      <SkipForward :size="16" />
    </button>

    <button
      class="p-2 rounded-md bg-bg-card border border-border text-dim hover:text-[var(--color-text)] hover:border-primary transition-colors"
      title="Reset"
      @click="reset"
    >
      <RotateCcw :size="16" />
    </button>

    <span class="ml-2 text-sm text-dim font-mono">
      {{ currentStep + 1 }}/{{ totalSteps }}
    </span>
  </div>
</template>

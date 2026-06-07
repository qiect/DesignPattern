<script setup lang="ts">
defineProps<{
  rating: number
}>()
</script>

<template>
  <div class="flex items-center gap-0.5">
    <template v-for="i in 3" :key="i">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        :class="i <= rating ? 'text-accent' : 'text-border'"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill="currentColor"
        />
      </svg>
    </template>
  </div>
</template>

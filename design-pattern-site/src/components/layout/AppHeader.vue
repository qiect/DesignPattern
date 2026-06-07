<script setup lang="ts">
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')

function onSearch() {
  emit('search', searchQuery.value)
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#1a1b2e] border-b border-border">
    <div class="flex items-center justify-between h-16 px-6 max-w-[1440px] mx-auto">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 shrink-0">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" class="text-primary">
          <path d="M14 2L25 8.5V19.5L14 26L3 19.5V8.5L14 2Z" stroke="currentColor" stroke-width="2" fill="none" />
          <path d="M14 8L20 11.5V18.5L14 22L8 18.5V11.5L14 8Z" fill="currentColor" opacity="0.3" />
        </svg>
        <span class="font-display text-xl font-bold text-[var(--color-text)]">设计模式</span>
      </router-link>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-6">
        <router-link to="/" class="text-sm text-dim hover:text-primary transition-colors">首页</router-link>
        <router-link to="/creational" class="text-sm text-dim hover:text-creational transition-colors">创建型</router-link>
        <router-link to="/structural" class="text-sm text-dim hover:text-structural transition-colors">结构型</router-link>
        <router-link to="/behavioral" class="text-sm text-dim hover:text-behavioral transition-colors">行为型</router-link>
        <router-link to="/compare" class="text-sm text-dim hover:text-accent transition-colors">对比</router-link>
      </nav>

      <!-- Search -->
      <div class="flex items-center gap-2 bg-bg rounded-lg px-3 py-1.5 border border-border focus-within:border-primary/50 transition-colors">
        <Search :size="16" class="text-dim shrink-0" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索模式..."
          class="bg-transparent text-sm text-[var(--color-text)] placeholder:text-dim outline-none w-32 lg:w-48"
          @keyup.enter="onSearch"
        />
      </div>
    </div>
  </header>
</template>

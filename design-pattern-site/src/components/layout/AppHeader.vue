<script setup lang="ts">
import { ref } from 'vue'
import { Search, Sun, Moon, Monitor } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')
const { theme, isAutoMode, toggleTheme, setAutoMode } = useTheme()

const showThemeMenu = ref(false)

function onSearch() {
  emit('search', searchQuery.value)
}

function handleToggleTheme() {
  toggleTheme()
}

function handleSetAuto(auto: boolean) {
  setAutoMode(auto)
  showThemeMenu.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-bg-card border-b border-border">
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

      <!-- Search + Theme -->
      <div class="flex items-center gap-3">
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

        <!-- 主题切换 -->
        <div class="relative">
          <button
            class="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-bg-hover transition-all duration-300"
            title="切换主题"
            @click="showThemeMenu = !showThemeMenu"
          >
            <Sun v-if="theme === 'light'" :size="18" class="text-accent" />
            <Moon v-else :size="18" class="text-primary" />
          </button>

          <!-- 下拉菜单 -->
          <Transition name="theme-menu">
            <div
              v-if="showThemeMenu"
              class="absolute right-0 top-full mt-2 w-48 bg-bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
            >
              <button
                class="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-bg-hover transition-colors"
                :class="theme === 'dark' && !isAutoMode ? 'text-primary' : 'text-dim'"
                @click="isAutoMode = false; theme = 'dark'; showThemeMenu = false"
              >
                <Moon :size="16" />
                <span>深色模式</span>
                <span v-if="theme === 'dark' && !isAutoMode" class="ml-auto text-xs">✓</span>
              </button>
              <button
                class="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-bg-hover transition-colors"
                :class="theme === 'light' && !isAutoMode ? 'text-primary' : 'text-dim'"
                @click="isAutoMode = false; theme = 'light'; showThemeMenu = false"
              >
                <Sun :size="16" />
                <span>浅色模式</span>
                <span v-if="theme === 'light' && !isAutoMode" class="ml-auto text-xs">✓</span>
              </button>
              <div class="border-t border-border" />
              <button
                class="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-bg-hover transition-colors"
                :class="isAutoMode ? 'text-primary' : 'text-dim'"
                @click="handleSetAuto(true)"
              >
                <Monitor :size="16" />
                <span>跟随时间</span>
                <span v-if="isAutoMode" class="ml-auto text-xs">✓</span>
              </button>
              <div class="px-4 py-2 text-xs text-dim border-t border-border">
                6:00-18:00 浅色 · 18:00-6:00 深色
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>

  <!-- 点击外部关闭菜单 -->
  <Teleport to="body">
    <div
      v-if="showThemeMenu"
      class="fixed inset-0 z-40"
      @click="showThemeMenu = false"
    />
  </Teleport>
</template>

<style scoped>
.theme-menu-enter-active,
.theme-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.theme-menu-enter-from,
.theme-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.96);
}
</style>

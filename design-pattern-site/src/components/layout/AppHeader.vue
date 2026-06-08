<script setup lang="ts">
import { ref } from 'vue'
import { Search, Sun, Moon, Monitor, Menu, X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits<{
  search: [query: string]
}>()

const router = useRouter()
const searchQuery = ref('')
const { theme, isAutoMode, toggleTheme, setAutoMode } = useTheme()

const showThemeMenu = ref(false)
const showMobileNav = ref(false)

function onSearch() {
  const q = searchQuery.value.trim()
  if (q) {
    router.push({ name: 'search', query: { q } })
  }
}

function handleSetAuto(auto: boolean) {
  setAutoMode(auto)
  showThemeMenu.value = false
}

function closeMobileNav() {
  showMobileNav.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-bg-card border-b border-border">
    <div class="flex items-center justify-between h-14 md:h-16 px-4 md:px-6 max-w-[1440px] mx-auto">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 shrink-0" @click="closeMobileNav">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" class="text-primary">
          <path d="M14 2L25 8.5V19.5L14 26L3 19.5V8.5L14 2Z" stroke="currentColor" stroke-width="2" fill="none" />
          <path d="M14 8L20 11.5V18.5L14 22L8 18.5V11.5L14 8Z" fill="currentColor" opacity="0.3" />
        </svg>
        <span class="font-display text-lg md:text-xl font-bold text-[var(--color-text)]">设计模式</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-6">
        <router-link to="/" class="text-sm text-dim hover:text-primary transition-colors">首页</router-link>
        <router-link to="/creational" class="text-sm text-dim hover:text-creational transition-colors">创建型</router-link>
        <router-link to="/structural" class="text-sm text-dim hover:text-structural transition-colors">结构型</router-link>
        <router-link to="/behavioral" class="text-sm text-dim hover:text-behavioral transition-colors">行为型</router-link>
        <router-link to="/compare" class="text-sm text-dim hover:text-accent transition-colors">对比</router-link>
      </nav>

      <!-- Search + Theme + Mobile menu -->
      <div class="flex items-center gap-2 md:gap-3">
        <!-- Search -->
        <div class="flex items-center gap-2 bg-bg rounded-lg px-2.5 md:px-3 py-1.5 border border-border focus-within:border-primary/50 transition-colors">
          <Search :size="16" class="text-dim shrink-0" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索模式..."
            class="bg-transparent text-sm text-[var(--color-text)] placeholder:text-dim outline-none w-24 sm:w-32 lg:w-48"
            @keyup.enter="onSearch"
          />
        </div>

        <!-- 主题切换 -->
        <div class="relative hidden sm:block">
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
            </div>
          </Transition>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-bg-hover transition-all"
          @click="showMobileNav = !showMobileNav"
        >
          <X v-if="showMobileNav" :size="20" class="text-[var(--color-text)]" />
          <Menu v-else :size="20" class="text-[var(--color-text)]" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="mobile-nav">
      <div v-if="showMobileNav" class="md:hidden bg-bg-card border-t border-border">
        <nav class="flex flex-col py-2">
          <router-link to="/" class="px-6 py-3 text-sm text-dim hover:text-primary hover:bg-bg-hover transition-colors" @click="closeMobileNav">首页</router-link>
          <router-link to="/creational" class="px-6 py-3 text-sm text-dim hover:text-creational hover:bg-bg-hover transition-colors" @click="closeMobileNav">创建型</router-link>
          <router-link to="/structural" class="px-6 py-3 text-sm text-dim hover:text-structural hover:bg-bg-hover transition-colors" @click="closeMobileNav">结构型</router-link>
          <router-link to="/behavioral" class="px-6 py-3 text-sm text-dim hover:text-behavioral hover:bg-bg-hover transition-colors" @click="closeMobileNav">行为型</router-link>
          <router-link to="/compare" class="px-6 py-3 text-sm text-dim hover:text-accent hover:bg-bg-hover transition-colors" @click="closeMobileNav">对比</router-link>
        </nav>

        <!-- 移动端主题切换 -->
        <div class="border-t border-border px-4 py-3 flex items-center gap-2">
          <button
            class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors"
            :class="theme === 'dark' && !isAutoMode ? 'bg-primary/10 text-primary' : 'text-dim hover:bg-bg-hover'"
            @click="isAutoMode = false; theme = 'dark'"
          >
            <Moon :size="16" />
            <span>深色</span>
          </button>
          <button
            class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors"
            :class="theme === 'light' && !isAutoMode ? 'bg-primary/10 text-primary' : 'text-dim hover:bg-bg-hover'"
            @click="isAutoMode = false; theme = 'light'"
          >
            <Sun :size="16" />
            <span>浅色</span>
          </button>
          <button
            class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors"
            :class="isAutoMode ? 'bg-primary/10 text-primary' : 'text-dim hover:bg-bg-hover'"
            @click="handleSetAuto(true)"
          >
            <Monitor :size="16" />
            <span>自动</span>
          </button>
        </div>
      </div>
    </Transition>
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

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: max-height 0.3s ease, opacity 0.2s ease;
  max-height: 400px;
  overflow: hidden;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

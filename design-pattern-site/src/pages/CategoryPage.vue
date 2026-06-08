<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Hammer, Layers, GitBranch } from 'lucide-vue-next'
import type { PatternCategory } from '@/types/pattern'
import AppLayout from '@/components/layout/AppLayout.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import PatternCard from '@/components/common/PatternCard.vue'
import { categories } from '@/data/categories'
import { getAllPatterns, getPatternsByCategory, searchPatterns } from '@/data'

const props = defineProps<{
  category?: string
}>()

const route = useRoute()
const searchQuery = ref('')

// 从 URL 参数初始化搜索
onMounted(() => {
  const q = route.query.q as string | undefined
  if (q) {
    searchQuery.value = q
  }
})

// 监听路由变化更新搜索
watch(() => route.query.q, (newQ) => {
  if (typeof newQ === 'string' && newQ !== searchQuery.value) {
    searchQuery.value = newQ
  }
})

const categoryParam = computed(() => props.category ?? (route.params.category as string | undefined))
const isAllPatterns = computed(() => !categoryParam.value)

const currentCategory = computed(() =>
  categories.find(c => c.id === categoryParam.value) ?? null
)

const categoryIcons: Record<string, typeof Hammer> = {
  creational: Hammer,
  structural: Layers,
  behavioral: GitBranch,
}

const displayedPatterns = computed(() => {
  let patterns = (isAllPatterns.value || isSearchPage.value)
    ? getAllPatterns()
    : getPatternsByCategory(categoryParam.value as PatternCategory)

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    patterns = patterns.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.simpleExplanation.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  return patterns
})

const isSearchPage = computed(() => route.name === 'search')

const pageTitle = computed(() => {
  if (isSearchPage.value && searchQuery.value.trim()) return `搜索: ${searchQuery.value}`
  return currentCategory.value?.name ?? '全部设计模式'
})

const pageDesc = computed(() => {
  if (isSearchPage.value && searchQuery.value.trim()) return `找到 ${displayedPatterns.value.length} 个匹配的设计模式`
  return currentCategory.value?.description ?? 'GoF 23 种经典设计模式完整列表'
})
</script>

<template>
  <AppLayout>
    <div class="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-3">
          <component
            v-if="currentCategory"
            :is="categoryIcons[currentCategory.id]"
            :size="28"
            :style="{ color: currentCategory.color }"
          />
          <h1 class="font-display text-3xl font-bold text-[var(--color-text)]">
            {{ pageTitle }}
          </h1>
        </div>
        <p class="text-[var(--color-text-dim)]">{{ pageDesc }}</p>
      </div>

      <!-- Search Bar -->
      <div class="relative mb-8">
        <Search :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索模式名称、标签..."
          class="w-full pl-11 pr-4 py-3 bg-bg-card border border-border rounded-xl
                 text-[var(--color-text)] placeholder:text-dim
                 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20
                 transition-all duration-200"
        />
      </div>

      <!-- Category Tabs (shown on all-patterns or search page) -->
      <div v-if="isAllPatterns || isSearchPage" class="flex gap-3 mb-8 flex-wrap">
        <router-link
          v-for="cat in categories"
          :key="cat.id"
          :to="`/${cat.id}`"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-bg-card
                 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
        >
          <component :is="categoryIcons[cat.id]" :size="16" :style="{ color: cat.color }" />
          <span class="text-sm text-[var(--color-text)]">{{ cat.name }}</span>
          <span class="text-xs text-dim">{{ cat.patternIds.length }}</span>
        </router-link>
      </div>

      <!-- Pattern Grid -->
      <div
        v-if="displayedPatterns.length"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <PatternCard
          v-for="pattern in displayedPatterns"
          :key="pattern.id"
          :pattern="pattern"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-20"
      >
        <p class="text-dim text-lg mb-2">未找到匹配的设计模式</p>
        <p class="text-[var(--color-text-dim)] text-sm">尝试调整搜索关键词</p>
      </div>
    </div>
  </AppLayout>
</template>

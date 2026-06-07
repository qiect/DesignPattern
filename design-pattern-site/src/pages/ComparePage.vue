<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAllPatterns, getPatternById } from '@/data/index'
import { categories } from '@/data/categories'
import AppLayout from '@/components/layout/AppLayout.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import TagBadge from '@/components/common/TagBadge.vue'
import StarRating from '@/components/common/StarRating.vue'
import { Check, X } from 'lucide-vue-next'
import type { Pattern } from '@/types/pattern'

const allPatterns = getAllPatterns()

const selectedA = ref<string>('')
const selectedB = ref<string>('')

const patternA = computed(() => selectedA.value ? getPatternById(selectedA.value) : undefined)
const patternB = computed(() => selectedB.value ? getPatternById(selectedB.value) : undefined)

function getCategoryName(category: Pattern['category']) {
  return categories.find(c => c.id === category)?.name ?? category
}

function getCategoryColor(category: Pattern['category']) {
  return categories.find(c => c.id === category)?.color ?? '#00d4aa'
}

interface CompareRow {
  label: string
  renderA: string
  renderB: string
  type?: 'text' | 'list'
}

const compareRows = computed<CompareRow[]>(() => {
  const a = patternA.value
  const b = patternB.value
  if (!a && !b) return []

  return [
    {
      label: '定义',
      renderA: a?.definition ?? '-',
      renderB: b?.definition ?? '-',
    },
    {
      label: '分类',
      renderA: a ? getCategoryName(a.category) : '-',
      renderB: b ? getCategoryName(b.category) : '-',
    },
    {
      label: '难度',
      renderA: a ? `${a.difficulty}/3` : '-',
      renderB: b ? `${b.difficulty}/3` : '-',
    },
    {
      label: '核心角色',
      renderA: a ? a.roles.map(r => r.name).join('、') : '-',
      renderB: b ? b.roles.map(r => r.name).join('、') : '-',
    },
    {
      label: '适用场景',
      renderA: a ? a.scenarios.map(s => s.title).join('、') : '-',
      renderB: b ? b.scenarios.map(s => s.title).join('、') : '-',
    },
    {
      label: '优点',
      renderA: a ? a.pros.join('；') : '-',
      renderB: b ? b.pros.join('；') : '-',
    },
    {
      label: '缺点',
      renderA: a ? a.cons.join('；') : '-',
      renderB: b ? b.cons.join('；') : '-',
    },
  ]
})
</script>

<template>
  <AppLayout>
    <div class="max-w-5xl mx-auto px-6 py-8 space-y-8">
    <SectionTitle title="模式对比" subtitle="Pattern Comparison" icon="GitCompare" />

    <!-- Selectors -->
    <div class="flex items-center gap-4 flex-wrap">
      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm text-dim mb-1">模式 A</label>
        <select
          v-model="selectedA"
          class="w-full rounded-lg border border-border bg-bg-card px-3 py-2 text-[var(--color-text)] text-sm focus:outline-none focus:border-primary"
        >
          <option value="">请选择...</option>
          <option v-for="p in allPatterns" :key="p.id" :value="p.id">{{ p.name }} ({{ p.nameEn }})</option>
        </select>
      </div>

      <span class="text-dim text-lg mt-5">VS</span>

      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm text-dim mb-1">模式 B</label>
        <select
          v-model="selectedB"
          class="w-full rounded-lg border border-border bg-bg-card px-3 py-2 text-[var(--color-text)] text-sm focus:outline-none focus:border-primary"
        >
          <option value="">请选择...</option>
          <option v-for="p in allPatterns" :key="p.id" :value="p.id">{{ p.name }} ({{ p.nameEn }})</option>
        </select>
      </div>
    </div>

    <!-- Pattern headers -->
    <div v-if="patternA || patternB" class="grid grid-cols-2 gap-6">
      <div v-if="patternA" class="rounded-lg border border-border bg-bg-card p-4">
        <div class="flex items-baseline gap-2 mb-1">
          <span class="font-display text-xl font-bold" :style="{ color: getCategoryColor(patternA.category) }">
            {{ patternA.name }}
          </span>
          <span class="text-sm text-dim">{{ patternA.nameEn }}</span>
        </div>
        <div class="flex items-center gap-3">
          <TagBadge :text="getCategoryName(patternA.category)" :color="getCategoryColor(patternA.category)" />
          <StarRating :rating="patternA.difficulty" />
        </div>
      </div>
      <div v-else class="rounded-lg border border-border bg-bg-card p-4 flex items-center justify-center text-dim">
        未选择模式 A
      </div>

      <div v-if="patternB" class="rounded-lg border border-border bg-bg-card p-4">
        <div class="flex items-baseline gap-2 mb-1">
          <span class="font-display text-xl font-bold" :style="{ color: getCategoryColor(patternB.category) }">
            {{ patternB.name }}
          </span>
          <span class="text-sm text-dim">{{ patternB.nameEn }}</span>
        </div>
        <div class="flex items-center gap-3">
          <TagBadge :text="getCategoryName(patternB.category)" :color="getCategoryColor(patternB.category)" />
          <StarRating :rating="patternB.difficulty" />
        </div>
      </div>
      <div v-else class="rounded-lg border border-border bg-bg-card p-4 flex items-center justify-center text-dim">
        未选择模式 B
      </div>
    </div>

    <!-- Comparison table -->
    <div v-if="compareRows.length" class="rounded-lg border border-border overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-bg-card border-b border-border">
            <th class="text-left px-4 py-3 text-dim font-medium w-24">维度</th>
            <th class="text-left px-4 py-3 text-[var(--color-text)] font-medium">
              {{ patternA?.name ?? '模式 A' }}
            </th>
            <th class="text-left px-4 py-3 text-[var(--color-text)] font-medium">
              {{ patternB?.name ?? '模式 B' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in compareRows"
            :key="row.label"
            class="border-b border-border last:border-b-0"
            :class="i % 2 === 0 ? 'bg-bg' : 'bg-bg-card'"
          >
            <td class="px-4 py-3 text-dim font-medium">{{ row.label }}</td>
            <td class="px-4 py-3 text-[var(--color-text)]">{{ row.renderA }}</td>
            <td class="px-4 py-3 text-[var(--color-text)]">{{ row.renderB }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pros & Cons side by side -->
    <div v-if="patternA || patternB" class="grid grid-cols-2 gap-6">
      <div v-if="patternA">
        <div class="space-y-4">
          <div class="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <h4 class="font-display font-semibold text-primary mb-2 flex items-center gap-1">
              <Check :size="14" /> 优点
            </h4>
            <ul class="space-y-1">
              <li v-for="pro in patternA.pros" :key="pro" class="text-sm text-[var(--color-text)] flex items-start gap-1.5">
                <Check :size="14" class="text-primary shrink-0 mt-0.5" />
                {{ pro }}
              </li>
            </ul>
          </div>
          <div class="rounded-lg border border-accent/30 bg-accent/5 p-4">
            <h4 class="font-display font-semibold text-accent mb-2 flex items-center gap-1">
              <X :size="14" /> 缺点
            </h4>
            <ul class="space-y-1">
              <li v-for="con in patternA.cons" :key="con" class="text-sm text-[var(--color-text)] flex items-start gap-1.5">
                <X :size="14" class="text-accent shrink-0 mt-0.5" />
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="patternB">
        <div class="space-y-4">
          <div class="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <h4 class="font-display font-semibold text-primary mb-2 flex items-center gap-1">
              <Check :size="14" /> 优点
            </h4>
            <ul class="space-y-1">
              <li v-for="pro in patternB.pros" :key="pro" class="text-sm text-[var(--color-text)] flex items-start gap-1.5">
                <Check :size="14" class="text-primary shrink-0 mt-0.5" />
                {{ pro }}
              </li>
            </ul>
          </div>
          <div class="rounded-lg border border-accent/30 bg-accent/5 p-4">
            <h4 class="font-display font-semibold text-accent mb-2 flex items-center gap-1">
              <X :size="14" /> 缺点
            </h4>
            <ul class="space-y-1">
              <li v-for="con in patternB.cons" :key="con" class="text-sm text-[var(--color-text)] flex items-start gap-1.5">
                <X :size="14" class="text-accent shrink-0 mt-0.5" />
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!selectedA && !selectedB" class="text-center text-dim py-12">
      请从上方下拉框中选择要对比的设计模式
    </div>
    </div>
  </AppLayout>
</template>

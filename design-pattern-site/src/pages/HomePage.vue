<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Hammer, Layers, GitBranch, ArrowRight, ChevronRight } from 'lucide-vue-next'
import AppLayout from '@/components/layout/AppLayout.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import { categories } from '@/data/categories'
import { getAllPatterns, getPatternsByCategory } from '@/data'
import { patternRelations } from '@/data/relations'

const router = useRouter()

const categoryIcons: Record<string, typeof Hammer> = {
  creational: Hammer,
  structural: Layers,
  behavioral: GitBranch,
}

const learningPath = [
  'singleton', 'strategy', 'observer', 'decorator', 'adapter',
  'factory-method', 'command', 'template-method', 'composite', 'proxy',
]

const allPatterns = getAllPatterns()
const patternMap = new Map(allPatterns.map(p => [p.id, p]))

const principles = [
  { abbr: 'SRP', name: '单一职责', desc: '一个类只负责一项职责', icon: '🎯' },
  { abbr: 'OCP', name: '开闭原则', desc: '对扩展开放，对修改关闭', icon: '🔓' },
  { abbr: 'LSP', name: '里氏替换', desc: '子类必须能替换其基类', icon: '🔄' },
  { abbr: 'ISP', name: '接口隔离', desc: '客户端不应依赖不需要的接口', icon: '✂️' },
  { abbr: 'DIP', name: '依赖倒置', desc: '依赖抽象而非具体实现', icon: '⬆️' },
  { abbr: 'LoD', name: '迪米特', desc: '最少知道原则，降低耦合', icon: '🤫' },
  { abbr: 'CRP', name: '合成复用', desc: '优先使用组合而非继承', icon: '🧩' },
]

// Build SVG network nodes grouped by category
const categoryColorMap: Record<string, string> = {
  creational: '#00d4aa',
  structural: '#6c8cff',
  behavioral: '#ff6b35',
}

const networkNodes: { id: string; label: string; x: number; y: number; color: string }[] = []
const catGroups = [
  { cat: 'creational', x: 120, patterns: getPatternsByCategory('creational') },
  { cat: 'structural', x: 400, patterns: getPatternsByCategory('structural') },
  { cat: 'behavioral', x: 680, patterns: getPatternsByCategory('behavioral') },
]
catGroups.forEach(g => {
  g.patterns.forEach((p, i) => {
    networkNodes.push({
      id: p.id,
      label: p.name,
      x: g.x,
      y: 40 + i * 52,
      color: categoryColorMap[g.cat],
    })
  })
})

const nodeMap = new Map(networkNodes.map(n => [n.id, n]))
const networkEdges = patternRelations
  .map(r => {
    const from = nodeMap.get(r.from)
    const to = nodeMap.get(r.to)
    if (!from || !to) return null
    return { from, to, type: r.type }
  })
  .filter(Boolean) as { from: typeof networkNodes[0]; to: typeof networkNodes[0]; type: string }[]

function navigateToCategory(catId: string) {
  router.push(`/${catId}`)
}
</script>

<template>
  <AppLayout>
    <!-- Hero Section -->
    <section class="relative grid-bg overflow-hidden py-24 px-6">
      <!-- Floating shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-[10%] left-[8%] w-16 h-16 border border-primary/20 rounded-lg rotate-12 animate-float-slow" />
        <div class="absolute top-[30%] right-[12%] w-12 h-12 border border-accent/20 rounded-full animate-float-medium" />
        <div class="absolute bottom-[20%] left-[20%] w-10 h-10 border border-structural/20 rotate-45 animate-float-fast" />
        <div class="absolute top-[55%] right-[25%] w-14 h-14 border border-primary/15 rounded-lg -rotate-12 animate-float-medium" />
        <div class="absolute bottom-[35%] left-[60%] w-8 h-8 border border-accent/20 rounded-full animate-float-slow" />
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h1 class="font-display text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          GoF 23 种设计模式
        </h1>
        <p class="text-xl text-dim mb-6">交互式学习平台 · 看懂设计模式</p>
        <p class="text-[var(--color-text-dim)] max-w-2xl mx-auto leading-relaxed">
          通过动画演示、代码对比和实际场景，深入理解面向对象设计模式。
          从创建型到行为型，掌握软件设计的核心思想。
        </p>
        <button
          class="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 text-primary border border-primary/30
                 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
          @click="router.push('/creational')"
        >
          开始学习 <ArrowRight :size="18" />
        </button>
      </div>
    </section>

    <!-- Category Cards -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <SectionTitle title="三大类模式" subtitle="按目的分类的 GoF 设计模式" icon="Layers" />
      <div class="grid md:grid-cols-3 gap-6 mt-8">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="group relative rounded-xl p-[1px] cursor-pointer transition-all duration-300
                 hover:-translate-y-1 hover:shadow-lg"
          :style="{ background: `linear-gradient(135deg, ${cat.color}40, ${cat.color}10)` }"
          @click="navigateToCategory(cat.id)"
        >
          <div class="bg-bg-card rounded-xl p-6 h-full">
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              :style="{ backgroundColor: cat.color + '18' }"
            >
              <component :is="categoryIcons[cat.id]" :size="24" :style="{ color: cat.color }" />
            </div>
            <h3 class="font-display text-lg font-semibold text-[var(--color-text)] mb-1">{{ cat.name }}</h3>
            <p class="text-xs text-dim mb-3">{{ cat.nameEn }}</p>
            <p class="text-sm text-[var(--color-text-dim)] leading-relaxed mb-4">{{ cat.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs px-2 py-1 rounded-full" :style="{ backgroundColor: cat.color + '18', color: cat.color }">
                {{ cat.patternIds.length }} 种模式
              </span>
              <ChevronRight :size="16" class="text-dim group-hover:text-[var(--color-text)] transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Path -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <SectionTitle title="推荐学习路径" subtitle="由浅入深，循序渐进" icon="Route" />
      <div class="mt-8 overflow-x-auto pb-4 scrollbar-thin">
        <div class="flex items-center gap-3 min-w-max">
          <template v-for="(pid, idx) in learningPath" :key="pid">
            <div
              class="flex items-center gap-2 px-4 py-3 rounded-lg bg-bg-card border border-border
                     hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              @click="router.push(`/pattern/${pid}`)"
            >
              <span class="text-xs font-mono text-dim w-5">{{ idx + 1 }}</span>
              <span class="text-sm text-[var(--color-text)] whitespace-nowrap">
                {{ patternMap.get(pid)?.name ?? pid }}
              </span>
            </div>
            <ArrowRight v-if="idx < learningPath.length - 1" :size="16" class="text-dim shrink-0" />
          </template>
        </div>
      </div>
    </section>

    <!-- Design Principles -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <SectionTitle title="七大设计原则" subtitle="设计模式的理论基础" icon="BookOpen" />
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-8">
        <div
          v-for="p in principles"
          :key="p.abbr"
          class="bg-bg-card border border-border rounded-xl p-4 text-center
                 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
        >
          <div class="text-2xl mb-2">{{ p.icon }}</div>
          <div class="font-display text-sm font-semibold text-[var(--color-text)]">{{ p.abbr }}</div>
          <div class="text-xs text-primary mt-0.5">{{ p.name }}</div>
          <div class="text-xs text-[var(--color-text-dim)] mt-2 leading-relaxed">{{ p.desc }}</div>
        </div>
      </div>
    </section>

    <!-- Pattern Network -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <SectionTitle title="模式关系网络" subtitle="模式之间的互补、替代与组合关系" icon="Network" />
      <div class="mt-8 bg-bg-card border border-border rounded-xl p-6 overflow-x-auto">
        <svg viewBox="0 0 800 620" class="w-full min-w-[600px]" xmlns="http://www.w3.org/2000/svg">
          <!-- Category labels -->
          <text x="120" y="24" text-anchor="middle" :fill="categoryColorMap.creational" font-size="13" font-weight="600">创建型</text>
          <text x="400" y="24" text-anchor="middle" :fill="categoryColorMap.structural" font-size="13" font-weight="600">结构型</text>
          <text x="680" y="24" text-anchor="middle" :fill="categoryColorMap.behavioral" font-size="13" font-weight="600">行为型</text>

          <!-- Edges -->
          <template v-for="(edge, i) in networkEdges" :key="i">
            <line
              :x1="edge.from.x" :y1="edge.from.y"
              :x2="edge.to.x" :y2="edge.to.y"
              :stroke="edge.type === 'complementary' ? categoryColorMap.creational : edge.type === 'alternative' ? categoryColorMap.behavioral : categoryColorMap.structural"
              :stroke-dasharray="edge.type === 'alternative' ? '4 4' : 'none'"
              stroke-width="1"
              opacity="0.3"
            />
          </template>

          <!-- Nodes -->
          <template v-for="node in networkNodes" :key="node.id">
            <circle :cx="node.x" :cy="node.y" r="4" :fill="node.color" opacity="0.8" />
            <text :x="node.x + 10" :y="node.y + 4" class="svg-text-fill" font-size="11">{{ node.label }}</text>
          </template>

          <!-- Legend -->
          <line x1="20" y1="600" x2="50" y2="600" :stroke="categoryColorMap.creational" stroke-width="1.5" />
          <text x="55" y="604" class="svg-dim-fill" font-size="10">互补</text>
          <line x1="120" y1="600" x2="150" y2="600" :stroke="categoryColorMap.behavioral" stroke-width="1.5" stroke-dasharray="4 4" />
          <text x="155" y="604" class="svg-dim-fill" font-size="10">替代</text>
          <line x1="220" y1="600" x2="250" y2="600" :stroke="categoryColorMap.structural" stroke-width="1.5" />
          <text x="255" y="604" class="svg-dim-fill" font-size="10">组合</text>
        </svg>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-20px) rotate(12deg); }
}
@keyframes float-medium {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
@keyframes float-fast {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-10px) rotate(45deg); }
}
.animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
.animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
.animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
</style>

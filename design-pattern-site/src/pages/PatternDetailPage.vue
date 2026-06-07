<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lightbulb, Check, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { getPatternById, getAllPatterns } from '@/data/index'
import { categories } from '@/data/categories'
import AppLayout from '@/components/layout/AppLayout.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import TagBadge from '@/components/common/TagBadge.vue'
import StarRating from '@/components/common/StarRating.vue'
import UmlDiagram from '@/components/diagram/UmlDiagram.vue'
import PatternAnimator from '@/components/animation/PatternAnimator.vue'
import StepPlayer from '@/components/animation/StepPlayer.vue'
import CodeCompare from '@/components/code/CodeCompare.vue'

const route = useRoute()
const router = useRouter()

const patternId = computed(() => route.params.id as string)
const pattern = computed(() => getPatternById(patternId.value))

const categoryColor = computed(() => {
  if (!pattern.value) return '#00d4aa'
  return categories.find(c => c.id === pattern.value!.category)?.color ?? '#00d4aa'
})

const categoryName = computed(() => {
  if (!pattern.value) return ''
  return categories.find(c => c.id === pattern.value!.category)?.name ?? ''
})

const currentStep = ref(0)

const relationTypeMap: Record<string, { label: string; color: string }> = {
  complementary: { label: '互补', color: '#00d4aa' },
  alternative: { label: '替代', color: '#ff6b35' },
  combinable: { label: '组合', color: '#6c8cff' },
}

const allPatterns = getAllPatterns()
const currentIndex = computed(() => allPatterns.findIndex(p => p.id === patternId.value))
const prevPattern = computed(() => currentIndex.value > 0 ? allPatterns[currentIndex.value - 1] : null)
const nextPattern = computed(() => currentIndex.value < allPatterns.length - 1 ? allPatterns[currentIndex.value + 1] : null)

function goToPattern(id: string) {
  router.push(`/pattern/${id}`)
}
</script>

<template>
  <AppLayout>
    <div class="flex h-[calc(100vh-4rem)]">
    <AppSidebar :active-pattern-id="patternId" />

    <div v-if="pattern" class="flex-1 overflow-y-auto px-8 py-6 space-y-10">
      <!-- 1. 模式定义 -->
      <section>
        <SectionTitle title="模式定义" icon="BookOpen" />
        <div class="space-y-4">
          <div class="flex items-baseline gap-3">
            <h1 class="font-display text-3xl font-bold" :style="{ color: categoryColor }">
              {{ pattern.name }}
            </h1>
            <span class="text-lg text-dim font-display">{{ pattern.nameEn }}</span>
          </div>

          <blockquote
            class="border-l-4 pl-4 py-2 text-dim italic"
            :style="{ borderColor: categoryColor }"
          >
            {{ pattern.definition }}
          </blockquote>

          <div class="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p class="text-[var(--color-text)]">{{ pattern.simpleExplanation }}</p>
          </div>

          <div class="rounded-lg border border-accent/30 bg-accent/5 p-4 flex gap-3">
            <Lightbulb :size="20" class="text-accent shrink-0 mt-0.5" />
            <p class="text-[var(--color-text)]">{{ pattern.lifeAnalogy }}</p>
          </div>

          <div class="flex items-center gap-4 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="text-sm text-dim">难度</span>
              <StarRating :rating="pattern.difficulty" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-dim">分类</span>
              <TagBadge :text="categoryName" :color="categoryColor" />
            </div>
            <TagBadge v-for="tag in pattern.tags" :key="tag" :text="tag" />
          </div>
        </div>
      </section>

      <!-- 2. 核心角色 -->
      <section>
        <SectionTitle title="核心角色" subtitle="Core Roles" icon="Users" />
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="role in pattern.roles"
            :key="role.nameEn"
            class="rounded-lg border border-border bg-bg-card p-4 flex gap-3"
          >
            <div class="w-1 shrink-0 rounded-full" :style="{ backgroundColor: role.color }" />
            <div>
              <div class="font-display font-semibold text-[var(--color-text)]">{{ role.name }}</div>
              <div class="text-xs text-dim mb-1">{{ role.nameEn }}</div>
              <div class="text-sm text-dim">{{ role.responsibility }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. UML 类图 -->
      <section>
        <SectionTitle title="UML 类图" subtitle="Class Diagram" icon="GitFork" />
        <UmlDiagram :code="pattern.umlCode" />
      </section>

      <!-- 4. 交互式动画演示 -->
      <section>
        <SectionTitle title="交互式动画演示" subtitle="Interactive Animation" icon="PlayCircle" />
        <PatternAnimator :steps="pattern.animationSteps" :current-step="currentStep" />
        <div class="mt-4 flex items-center justify-between">
          <StepPlayer
            :total-steps="pattern.animationSteps.length"
            v-model:current-step="currentStep"
          />
          <p class="text-sm text-primary font-medium max-w-md text-right">
            {{ pattern.animationSteps[currentStep]?.description }}
          </p>
        </div>
      </section>

      <!-- 5. 代码实现 -->
      <section>
        <SectionTitle title="代码实现" subtitle="Code Implementation" icon="Code2" />
        <CodeCompare :examples="pattern.codeExamples" />
      </section>

      <!-- 6. 适用场景 -->
      <section>
        <SectionTitle title="适用场景" subtitle="When to Use" icon="Target" />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="scenario in pattern.scenarios"
            :key="scenario.title"
            class="rounded-lg border border-border bg-bg-card p-4"
          >
            <div class="text-primary mb-2">
              <component :is="($options.components?.[scenario.icon] as any)" v-if="false" />
              <span class="text-2xl">{{ scenario.icon }}</span>
            </div>
            <h4 class="font-display font-semibold text-[var(--color-text)] mb-1">{{ scenario.title }}</h4>
            <p class="text-sm text-dim">{{ scenario.description }}</p>
          </div>
        </div>
      </section>

      <!-- 7. 优缺点分析 -->
      <section>
        <SectionTitle title="优缺点分析" subtitle="Pros & Cons" icon="Scale" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="rounded-lg border border-primary/30 bg-primary/5 p-5">
            <h3 class="font-display font-semibold text-primary mb-3">优点</h3>
            <ul class="space-y-2">
              <li v-for="pro in pattern.pros" :key="pro" class="flex items-start gap-2">
                <Check :size="16" class="text-primary shrink-0 mt-0.5" />
                <span class="text-sm text-[var(--color-text)]">{{ pro }}</span>
              </li>
            </ul>
          </div>
          <div class="rounded-lg border border-accent/30 bg-accent/5 p-5">
            <h3 class="font-display font-semibold text-accent mb-3">缺点</h3>
            <ul class="space-y-2">
              <li v-for="con in pattern.cons" :key="con" class="flex items-start gap-2">
                <X :size="16" class="text-accent shrink-0 mt-0.5" />
                <span class="text-sm text-[var(--color-text)]">{{ con }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 8. 框架应用 -->
      <section>
        <SectionTitle title="框架应用" subtitle="Framework Examples" icon="Package" />
        <div class="space-y-3">
          <div
            v-for="fw in pattern.frameworkExamples"
            :key="fw.framework"
            class="rounded-lg border border-border bg-bg-card p-4 flex items-start gap-3"
          >
            <TagBadge :text="fw.framework" color="#6c8cff" />
            <p class="text-sm text-[var(--color-text)]">{{ fw.description }}</p>
          </div>
        </div>
      </section>

      <!-- 9. 相关模式 -->
      <section>
        <SectionTitle title="相关模式" subtitle="Related Patterns" icon="Link2" />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="related in pattern.relatedPatterns"
            :key="related.patternId"
            class="rounded-lg border border-border bg-bg-card p-4 cursor-pointer hover:border-primary/50 transition-colors"
            @click="goToPattern(related.patternId)"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-display font-semibold text-[var(--color-text)]">
                {{ getPatternById(related.patternId)?.name ?? related.patternId }}
              </span>
              <TagBadge
                :text="relationTypeMap[related.relationType]?.label ?? related.relationType"
                :color="relationTypeMap[related.relationType]?.color"
              />
            </div>
            <p class="text-sm text-dim">{{ related.description }}</p>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-6 pb-8 border-t border-border">
        <button
          v-if="prevPattern"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-bg-card text-dim hover:text-[var(--color-text)] hover:border-primary/50 transition-colors"
          @click="goToPattern(prevPattern.id)"
        >
          <ChevronLeft :size="16" />
          {{ prevPattern.name }}
        </button>
        <div v-else />

        <button
          v-if="nextPattern"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-bg-card text-dim hover:text-[var(--color-text)] hover:border-primary/50 transition-colors"
          @click="goToPattern(nextPattern.id)"
        >
          {{ nextPattern.name }}
          <ChevronRight :size="16" />
        </button>
      </div>
    </div>

    <div v-else class="flex-1 flex items-center justify-center text-dim text-lg">
      未找到该设计模式
    </div>
    </div>
  </AppLayout>
</template>

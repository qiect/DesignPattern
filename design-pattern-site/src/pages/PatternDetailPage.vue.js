/// <reference types="../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Lightbulb, Check, X, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { getPatternById, getAllPatterns } from '@/data/index';
import { categories } from '@/data/categories';
import AppLayout from '@/components/layout/AppLayout.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import SectionTitle from '@/components/common/SectionTitle.vue';
import TagBadge from '@/components/common/TagBadge.vue';
import StarRating from '@/components/common/StarRating.vue';
import UmlDiagram from '@/components/diagram/UmlDiagram.vue';
import PatternAnimator from '@/components/animation/PatternAnimator.vue';
import StepPlayer from '@/components/animation/StepPlayer.vue';
import CodeCompare from '@/components/code/CodeCompare.vue';
const route = useRoute();
const router = useRouter();
const patternId = computed(() => route.params.id);
const pattern = computed(() => getPatternById(patternId.value));
const categoryColor = computed(() => {
    if (!pattern.value)
        return '#00d4aa';
    return categories.find(c => c.id === pattern.value.category)?.color ?? '#00d4aa';
});
const categoryName = computed(() => {
    if (!pattern.value)
        return '';
    return categories.find(c => c.id === pattern.value.category)?.name ?? '';
});
const currentStep = ref(0);
const relationTypeMap = {
    complementary: { label: '互补', color: '#00d4aa' },
    alternative: { label: '替代', color: '#ff6b35' },
    combinable: { label: '组合', color: '#6c8cff' },
};
const allPatterns = getAllPatterns();
const currentIndex = computed(() => allPatterns.findIndex(p => p.id === patternId.value));
const prevPattern = computed(() => currentIndex.value > 0 ? allPatterns[currentIndex.value - 1] : null);
const nextPattern = computed(() => currentIndex.value < allPatterns.length - 1 ? allPatterns[currentIndex.value + 1] : null);
function goToPattern(id) {
    router.push(`/pattern/${id}`);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = AppLayout || AppLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex h-[calc(100vh-4rem)]" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[calc(100vh-4rem)]']} */ ;
const __VLS_7 = AppSidebar;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    activePatternId: (__VLS_ctx.patternId),
    ...{ class: "hidden lg:block" },
}));
const __VLS_9 = __VLS_8({
    activePatternId: (__VLS_ctx.patternId),
    ...{ class: "hidden lg:block" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:block']} */ ;
if (__VLS_ctx.pattern) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-10" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_12 = SectionTitle;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        title: "模式定义",
        icon: "BookOpen",
    }));
    const __VLS_14 = __VLS_13({
        title: "模式定义",
        icon: "BookOpen",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-4" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-baseline gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "font-display text-3xl font-bold" },
        ...{ style: ({ color: __VLS_ctx.categoryColor }) },
    });
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    (__VLS_ctx.pattern.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-lg text-dim font-display" },
    });
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    (__VLS_ctx.pattern.nameEn);
    __VLS_asFunctionalElement1(__VLS_intrinsics.blockquote, __VLS_intrinsics.blockquote)({
        ...{ class: "border-l-4 pl-4 py-2 text-dim italic" },
        ...{ style: ({ borderColor: __VLS_ctx.categoryColor }) },
    });
    /** @type {__VLS_StyleScopedClasses['border-l-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['italic']} */ ;
    (__VLS_ctx.pattern.definition);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-lg border border-primary/30 bg-primary/5 p-4" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-[var(--color-text)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
    (__VLS_ctx.pattern.simpleExplanation);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-lg border border-accent/30 bg-accent/5 p-4 flex gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-accent/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-accent/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    let __VLS_17;
    /** @ts-ignore @type { | typeof __VLS_components.Lightbulb} */
    Lightbulb;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        size: (20),
        ...{ class: "text-accent shrink-0 mt-0.5" },
    }));
    const __VLS_19 = __VLS_18({
        size: (20),
        ...{ class: "text-accent shrink-0 mt-0.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    /** @type {__VLS_StyleScopedClasses['text-accent']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-[var(--color-text)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
    (__VLS_ctx.pattern.lifeAnalogy);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-4 flex-wrap" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-dim" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    const __VLS_22 = StarRating;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        rating: (__VLS_ctx.pattern.difficulty),
    }));
    const __VLS_24 = __VLS_23({
        rating: (__VLS_ctx.pattern.difficulty),
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-dim" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    const __VLS_27 = TagBadge;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        text: (__VLS_ctx.categoryName),
        color: (__VLS_ctx.categoryColor),
    }));
    const __VLS_29 = __VLS_28({
        text: (__VLS_ctx.categoryName),
        color: (__VLS_ctx.categoryColor),
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    for (const [tag] of __VLS_vFor((__VLS_ctx.pattern.tags))) {
        const __VLS_32 = TagBadge;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
            key: (tag),
            text: (tag),
        }));
        const __VLS_34 = __VLS_33({
            key: (tag),
            text: (tag),
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        // @ts-ignore
        [patternId, pattern, pattern, pattern, pattern, pattern, pattern, pattern, pattern, categoryColor, categoryColor, categoryColor, categoryName,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_37 = SectionTitle;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        title: "核心角色",
        subtitle: "Core Roles",
        icon: "Users",
    }));
    const __VLS_39 = __VLS_38({
        title: "核心角色",
        subtitle: "Core Roles",
        icon: "Users",
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    for (const [role] of __VLS_vFor((__VLS_ctx.pattern.roles))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (role.nameEn),
            ...{ class: "rounded-lg border border-border bg-bg-card p-4 flex gap-3" },
        });
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "w-1 shrink-0 rounded-full" },
            ...{ style: ({ backgroundColor: role.color }) },
        });
        /** @type {__VLS_StyleScopedClasses['w-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "font-display font-semibold text-[var(--color-text)]" },
        });
        /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
        (role.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-xs text-dim mb-1" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        (role.nameEn);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm text-dim" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
        (role.responsibility);
        // @ts-ignore
        [pattern,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_42 = SectionTitle;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
        title: "UML 类图",
        subtitle: "Class Diagram",
        icon: "GitFork",
    }));
    const __VLS_44 = __VLS_43({
        title: "UML 类图",
        subtitle: "Class Diagram",
        icon: "GitFork",
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    const __VLS_47 = UmlDiagram;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        code: (__VLS_ctx.pattern.umlCode),
    }));
    const __VLS_49 = __VLS_48({
        code: (__VLS_ctx.pattern.umlCode),
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_52 = SectionTitle;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
        title: "交互式动画演示",
        subtitle: "Interactive Animation",
        icon: "PlayCircle",
    }));
    const __VLS_54 = __VLS_53({
        title: "交互式动画演示",
        subtitle: "Interactive Animation",
        icon: "PlayCircle",
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    const __VLS_57 = PatternAnimator;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        steps: (__VLS_ctx.pattern.animationSteps),
        currentStep: (__VLS_ctx.currentStep),
    }));
    const __VLS_59 = __VLS_58({
        steps: (__VLS_ctx.pattern.animationSteps),
        currentStep: (__VLS_ctx.currentStep),
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-4" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    const __VLS_62 = StepPlayer;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
        totalSteps: (__VLS_ctx.pattern.animationSteps.length),
        currentStep: (__VLS_ctx.currentStep),
    }));
    const __VLS_64 = __VLS_63({
        totalSteps: (__VLS_ctx.pattern.animationSteps.length),
        currentStep: (__VLS_ctx.currentStep),
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_67 = SectionTitle;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
        title: "代码实现",
        subtitle: "Code Implementation",
        icon: "Code2",
    }));
    const __VLS_69 = __VLS_68({
        title: "代码实现",
        subtitle: "Code Implementation",
        icon: "Code2",
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    const __VLS_72 = CodeCompare;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
        examples: (__VLS_ctx.pattern.codeExamples),
    }));
    const __VLS_74 = __VLS_73({
        examples: (__VLS_ctx.pattern.codeExamples),
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_77 = SectionTitle;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        title: "适用场景",
        subtitle: "When to Use",
        icon: "Target",
    }));
    const __VLS_79 = __VLS_78({
        title: "适用场景",
        subtitle: "When to Use",
        icon: "Target",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    for (const [scenario] of __VLS_vFor((__VLS_ctx.pattern.scenarios))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (scenario.title),
            ...{ class: "rounded-lg border border-border bg-bg-card p-4" },
        });
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-primary mb-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
        if (false) {
            const __VLS_82 = __VLS_ctx.$options.components?.[scenario.icon];
            // @ts-ignore
            const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({}));
            const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-2xl" },
        });
        /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
        (scenario.icon);
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
            ...{ class: "font-display font-semibold text-[var(--color-text)] mb-1" },
        });
        /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        (scenario.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-sm text-dim" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
        (scenario.description);
        // @ts-ignore
        [pattern, pattern, pattern, pattern, pattern, currentStep, currentStep, $options,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_87 = SectionTitle;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
        title: "优缺点分析",
        subtitle: "Pros & Cons",
        icon: "Scale",
    }));
    const __VLS_89 = __VLS_88({
        title: "优缺点分析",
        subtitle: "Pros & Cons",
        icon: "Scale",
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-6" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-lg border border-primary/30 bg-primary/5 p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "font-display font-semibold text-primary mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    for (const [pro] of __VLS_vFor((__VLS_ctx.pattern.pros))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (pro),
            ...{ class: "flex items-start gap-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        let __VLS_92;
        /** @ts-ignore @type { | typeof __VLS_components.Check} */
        Check;
        // @ts-ignore
        const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
            size: (16),
            ...{ class: "text-primary shrink-0 mt-0.5" },
        }));
        const __VLS_94 = __VLS_93({
            size: (16),
            ...{ class: "text-primary shrink-0 mt-0.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_93));
        /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-[var(--color-text)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
        (pro);
        // @ts-ignore
        [pattern,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-lg border border-accent/30 bg-accent/5 p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-accent/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-accent/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "font-display font-semibold text-accent mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-accent']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    for (const [con] of __VLS_vFor((__VLS_ctx.pattern.cons))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (con),
            ...{ class: "flex items-start gap-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        let __VLS_97;
        /** @ts-ignore @type { | typeof __VLS_components.X} */
        X;
        // @ts-ignore
        const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
            size: (16),
            ...{ class: "text-accent shrink-0 mt-0.5" },
        }));
        const __VLS_99 = __VLS_98({
            size: (16),
            ...{ class: "text-accent shrink-0 mt-0.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_98));
        /** @type {__VLS_StyleScopedClasses['text-accent']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-[var(--color-text)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
        (con);
        // @ts-ignore
        [pattern,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_102 = SectionTitle;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
        title: "框架应用",
        subtitle: "Framework Examples",
        icon: "Package",
    }));
    const __VLS_104 = __VLS_103({
        title: "框架应用",
        subtitle: "Framework Examples",
        icon: "Package",
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-3" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
    for (const [fw] of __VLS_vFor((__VLS_ctx.pattern.frameworkExamples))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (fw.framework),
            ...{ class: "rounded-lg border border-border bg-bg-card p-4 flex items-start gap-3" },
        });
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        const __VLS_107 = TagBadge;
        // @ts-ignore
        const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
            text: (fw.framework),
            color: "#6c8cff",
        }));
        const __VLS_109 = __VLS_108({
            text: (fw.framework),
            color: "#6c8cff",
        }, ...__VLS_functionalComponentArgsRest(__VLS_108));
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-sm text-[var(--color-text)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
        (fw.description);
        // @ts-ignore
        [pattern,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    const __VLS_112 = SectionTitle;
    // @ts-ignore
    const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
        title: "相关模式",
        subtitle: "Related Patterns",
        icon: "Link2",
    }));
    const __VLS_114 = __VLS_113({
        title: "相关模式",
        subtitle: "Related Patterns",
        icon: "Link2",
    }, ...__VLS_functionalComponentArgsRest(__VLS_113));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    for (const [related] of __VLS_vFor((__VLS_ctx.pattern.relatedPatterns))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.pattern))
                        return;
                    __VLS_ctx.goToPattern(related.patternId);
                    // @ts-ignore
                    [pattern, goToPattern,];
                } },
            key: (related.patternId),
            ...{ class: "rounded-lg border border-border bg-bg-card p-4 cursor-pointer hover:border-primary/50 transition-colors" },
        });
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-between mb-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "font-display font-semibold text-[var(--color-text)]" },
        });
        /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
        (__VLS_ctx.getPatternById(related.patternId)?.name ?? related.patternId);
        const __VLS_117 = TagBadge;
        // @ts-ignore
        const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
            text: (__VLS_ctx.relationTypeMap[related.relationType]?.label ?? related.relationType),
            color: (__VLS_ctx.relationTypeMap[related.relationType]?.color),
        }));
        const __VLS_119 = __VLS_118({
            text: (__VLS_ctx.relationTypeMap[related.relationType]?.label ?? related.relationType),
            color: (__VLS_ctx.relationTypeMap[related.relationType]?.color),
        }, ...__VLS_functionalComponentArgsRest(__VLS_118));
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-sm text-dim" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
        (related.description);
        // @ts-ignore
        [getPatternById, relationTypeMap, relationTypeMap,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between gap-4 pt-6 pb-8 border-t border-border" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
    if (__VLS_ctx.prevPattern) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.pattern))
                        return;
                    if (!(__VLS_ctx.prevPattern))
                        return;
                    __VLS_ctx.goToPattern(__VLS_ctx.prevPattern.id);
                    // @ts-ignore
                    [goToPattern, prevPattern, prevPattern,];
                } },
            ...{ class: "flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border border-border bg-bg-card text-dim hover:text-[var(--color-text)] hover:border-primary/50 transition-colors text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-text)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        let __VLS_122;
        /** @ts-ignore @type { | typeof __VLS_components.ChevronLeft} */
        ChevronLeft;
        // @ts-ignore
        const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
            size: (16),
        }));
        const __VLS_124 = __VLS_123({
            size: (16),
        }, ...__VLS_functionalComponentArgsRest(__VLS_123));
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "hidden sm:inline" },
        });
        /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
        (__VLS_ctx.prevPattern.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "sm:hidden" },
        });
        /** @type {__VLS_StyleScopedClasses['sm:hidden']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
    }
    if (__VLS_ctx.nextPattern) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.pattern))
                        return;
                    if (!(__VLS_ctx.nextPattern))
                        return;
                    __VLS_ctx.goToPattern(__VLS_ctx.nextPattern.id);
                    // @ts-ignore
                    [goToPattern, prevPattern, nextPattern, nextPattern,];
                } },
            ...{ class: "flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border border-border bg-bg-card text-dim hover:text-[var(--color-text)] hover:border-primary/50 transition-colors text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-text)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "hidden sm:inline" },
        });
        /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
        (__VLS_ctx.nextPattern.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "sm:hidden" },
        });
        /** @type {__VLS_StyleScopedClasses['sm:hidden']} */ ;
        let __VLS_127;
        /** @ts-ignore @type { | typeof __VLS_components.ChevronRight} */
        ChevronRight;
        // @ts-ignore
        const __VLS_128 = __VLS_asFunctionalComponent1(__VLS_127, new __VLS_127({
            size: (16),
        }));
        const __VLS_129 = __VLS_128({
            size: (16),
        }, ...__VLS_functionalComponentArgsRest(__VLS_128));
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 flex items-center justify-center text-dim text-lg" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
}
// @ts-ignore
[nextPattern,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};

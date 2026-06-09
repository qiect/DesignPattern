/// <reference types="../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Search, Hammer, Layers, GitBranch } from 'lucide-vue-next';
import AppLayout from '@/components/layout/AppLayout.vue';
import PatternCard from '@/components/common/PatternCard.vue';
import { categories } from '@/data/categories';
import { getAllPatterns, getPatternsByCategory } from '@/data';
const props = defineProps();
const route = useRoute();
const searchQuery = ref('');
// 从 URL 参数初始化搜索
onMounted(() => {
    const q = route.query.q;
    if (q) {
        searchQuery.value = q;
    }
});
// 监听路由变化更新搜索
watch(() => route.query.q, (newQ) => {
    if (typeof newQ === 'string' && newQ !== searchQuery.value) {
        searchQuery.value = newQ;
    }
});
const categoryParam = computed(() => props.category ?? route.params.category);
const isAllPatterns = computed(() => !categoryParam.value);
const currentCategory = computed(() => categories.find(c => c.id === categoryParam.value) ?? null);
const categoryIcons = {
    creational: Hammer,
    structural: Layers,
    behavioral: GitBranch,
};
const displayedPatterns = computed(() => {
    let patterns = (isAllPatterns.value || isSearchPage.value)
        ? getAllPatterns()
        : getPatternsByCategory(categoryParam.value);
    if (searchQuery.value.trim()) {
        const q = searchQuery.value.trim().toLowerCase();
        patterns = patterns.filter(p => p.name.toLowerCase().includes(q) ||
            p.nameEn.toLowerCase().includes(q) ||
            p.simpleExplanation.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q)));
    }
    return patterns;
});
const isSearchPage = computed(() => route.name === 'search');
const pageTitle = computed(() => {
    if (isSearchPage.value && searchQuery.value.trim())
        return `搜索: ${searchQuery.value}`;
    return currentCategory.value?.name ?? '全部设计模式';
});
const pageDesc = computed(() => {
    if (isSearchPage.value && searchQuery.value.trim())
        return `找到 ${displayedPatterns.value.length} 个匹配的设计模式`;
    return currentCategory.value?.description ?? 'GoF 23 种经典设计模式完整列表';
});
const __VLS_ctx = {
    ...{},
    ...{},
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
    ...{ class: "max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12" },
});
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-12']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mb-8" },
});
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3 mb-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
if (__VLS_ctx.currentCategory) {
    const __VLS_7 = (__VLS_ctx.categoryIcons[__VLS_ctx.currentCategory.id]);
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        size: (28),
        ...{ style: ({ color: __VLS_ctx.currentCategory.color }) },
    }));
    const __VLS_9 = __VLS_8({
        size: (28),
        ...{ style: ({ color: __VLS_ctx.currentCategory.color }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "font-display text-3xl font-bold text-[var(--color-text)]" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
(__VLS_ctx.pageTitle);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-[var(--color-text-dim)]" },
});
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-dim)]']} */ ;
(__VLS_ctx.pageDesc);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative mb-8" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.Search} */
Search;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    size: (18),
    ...{ class: "absolute left-4 top-1/2 -translate-y-1/2 text-dim" },
}));
const __VLS_14 = __VLS_13({
    size: (18),
    ...{ class: "absolute left-4 top-1/2 -translate-y-1/2 text-dim" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-4']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    value: (__VLS_ctx.searchQuery),
    type: "text",
    placeholder: "搜索模式名称、标签...",
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0070\u006c\u002d\u0031\u0031\u0020\u0070\u0072\u002d\u0034\u0020\u0070\u0079\u002d\u0033\u0020\u0062\u0067\u002d\u0062\u0067\u002d\u0063\u0061\u0072\u0064\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0078\u006c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0065\u0078\u0074\u002d\u005b\u0076\u0061\u0072\u0028\u002d\u002d\u0063\u006f\u006c\u006f\u0072\u002d\u0074\u0065\u0078\u0074\u0029\u005d\u0020\u0070\u006c\u0061\u0063\u0065\u0068\u006f\u006c\u0064\u0065\u0072\u003a\u0074\u0065\u0078\u0074\u002d\u0064\u0069\u006d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0035\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0031\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0032\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-11']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl
']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-dim
']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary/20
']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
if (__VLS_ctx.isAllPatterns || __VLS_ctx.isSearchPage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex gap-3 mb-8 flex-wrap" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    for (const [cat] of __VLS_vFor((__VLS_ctx.categories))) {
        let __VLS_17;
        /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
        routerLink;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
            key: (cat.id),
            to: (`/${cat.id}`),
            ...{ class: "\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0067\u0061\u0070\u002d\u0032\u0020\u0070\u0078\u002d\u0034\u0020\u0070\u0079\u002d\u0032\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u0067\u002d\u0062\u0067\u002d\u0063\u0061\u0072\u0064\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0033\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u002d\u0074\u0072\u0061\u006e\u0073\u006c\u0061\u0074\u0065\u002d\u0079\u002d\u0030\u002e\u0035\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030" },
        }));
        const __VLS_19 = __VLS_18({
            key: (cat.id),
            to: (`/${cat.id}`),
            ...{ class: "\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0067\u0061\u0070\u002d\u0032\u0020\u0070\u0078\u002d\u0034\u0020\u0070\u0079\u002d\u0032\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u0067\u002d\u0062\u0067\u002d\u0063\u0061\u0072\u0064\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0033\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u002d\u0074\u0072\u0061\u006e\u0073\u006c\u0061\u0074\u0065\u002d\u0079\u002d\u0030\u002e\u0035\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-bg-card
        ']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:border-primary/30']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:-translate-y-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        const { default: __VLS_22 } = __VLS_20.slots;
        const __VLS_23 = (__VLS_ctx.categoryIcons[cat.id]);
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
            size: (16),
            ...{ style: ({ color: cat.color }) },
        }));
        const __VLS_25 = __VLS_24({
            size: (16),
            ...{ style: ({ color: cat.color }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_24));
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-[var(--color-text)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
        (cat.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs text-dim" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
        (cat.patternIds.length);
        // @ts-ignore
        [currentCategory, currentCategory, currentCategory, categoryIcons, categoryIcons, pageTitle, pageDesc, searchQuery, isAllPatterns, isSearchPage, categories,];
        var __VLS_20;
        // @ts-ignore
        [];
    }
}
if (__VLS_ctx.displayedPatterns.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
    for (const [pattern] of __VLS_vFor((__VLS_ctx.displayedPatterns))) {
        const __VLS_28 = PatternCard;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
            key: (pattern.id),
            pattern: (pattern),
        }));
        const __VLS_30 = __VLS_29({
            key: (pattern.id),
            pattern: (pattern),
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        // @ts-ignore
        [displayedPatterns, displayedPatterns,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-20" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-dim text-lg mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-[var(--color-text-dim)] text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-dim)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

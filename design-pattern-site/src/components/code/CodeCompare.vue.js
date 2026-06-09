/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from 'vue';
import CodeBlock from './CodeBlock.vue';
const props = defineProps();
const activeIndex = ref(0);
const activeExample = computed(() => props.examples[activeIndex.value]);
const tabs = computed(() => props.examples.map((ex, i) => ({
    label: ex.language === 'csharp' ? 'C#' : 'TypeScript',
    index: i,
})));
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-lg border border-border overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center border-b border-border bg-bg-card" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
for (const [tab] of __VLS_vFor((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeIndex = tab.index;
                // @ts-ignore
                [tabs, activeIndex,];
            } },
        key: (tab.index),
        ...{ class: "relative px-5 py-2.5 text-sm font-medium transition-colors" },
        ...{ class: ([
                __VLS_ctx.activeIndex === tab.index
                    ? 'text-primary'
                    : 'text-dim hover:text-[var(--color-text)]'
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    (tab.label);
    if (__VLS_ctx.activeIndex === tab.index) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ class: "absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full" },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['left-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['right-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-[2px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    }
    // @ts-ignore
    [activeIndex, activeIndex,];
}
if (__VLS_ctx.activeExample) {
    const __VLS_0 = CodeBlock;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        code: (__VLS_ctx.activeExample.code),
        language: (__VLS_ctx.activeExample.language),
        highlights: (__VLS_ctx.activeExample.highlights),
    }));
    const __VLS_2 = __VLS_1({
        code: (__VLS_ctx.activeExample.code),
        language: (__VLS_ctx.activeExample.language),
        highlights: (__VLS_ctx.activeExample.highlights),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
// @ts-ignore
[activeExample, activeExample, activeExample, activeExample,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

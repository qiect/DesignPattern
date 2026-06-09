/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import { ChevronDown, ChevronRight } from 'lucide-vue-next';
import { categories } from '@/data/categories';
import { getPatternById } from '@/data/index';
const __VLS_props = defineProps();
const collapsed = ref({});
function toggle(categoryId) {
    collapsed.value[categoryId] = !collapsed.value[categoryId];
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "w-60 shrink-0 bg-bg-card border-r border-border overflow-y-auto h-full" },
});
/** @type {__VLS_StyleScopedClasses['w-60']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "py-4" },
});
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
for (const [category] of __VLS_vFor((__VLS_ctx.categories))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (category.id),
        ...{ class: "mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggle(category.id);
                // @ts-ignore
                [categories, toggle,];
            } },
        ...{ class: "w-full flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-bg-hover transition-colors" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    const __VLS_0 = (__VLS_ctx.collapsed[category.id] ? __VLS_ctx.ChevronRight : __VLS_ctx.ChevronDown);
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        size: (14),
        ...{ class: "text-dim shrink-0" },
    }));
    const __VLS_2 = __VLS_1({
        size: (14),
        ...{ class: "text-dim shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "w-2 h-2 rounded-full shrink-0" },
        ...{ style: ({ backgroundColor: category.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[var(--color-text)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
    (category.name);
    if (!__VLS_ctx.collapsed[category.id]) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "ml-6" },
        });
        /** @type {__VLS_StyleScopedClasses['ml-6']} */ ;
        for (const [patternId] of __VLS_vFor((category.patternIds))) {
            let __VLS_5;
            /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
            routerLink;
            // @ts-ignore
            const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
                key: (patternId),
                to: (`/pattern/${patternId}`),
                ...{ class: "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors" },
                ...{ class: (__VLS_ctx.activePatternId === patternId
                        ? 'text-primary bg-primary/10'
                        : 'text-dim hover:text-[var(--color-text)] hover:bg-bg-hover') },
            }));
            const __VLS_7 = __VLS_6({
                key: (patternId),
                to: (`/pattern/${patternId}`),
                ...{ class: "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors" },
                ...{ class: (__VLS_ctx.activePatternId === patternId
                        ? 'text-primary bg-primary/10'
                        : 'text-dim hover:text-[var(--color-text)] hover:bg-bg-hover') },
            }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            const { default: __VLS_10 } = __VLS_8.slots;
            (__VLS_ctx.getPatternById(patternId)?.name ?? patternId);
            // @ts-ignore
            [collapsed, collapsed, ChevronRight, ChevronDown, activePatternId, getPatternById,];
            var __VLS_8;
            // @ts-ignore
            [];
        }
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

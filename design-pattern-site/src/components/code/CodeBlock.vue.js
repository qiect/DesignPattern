/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, watch, shallowRef } from 'vue';
import { createHighlighter } from 'shiki';
import { Copy, Check } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';
const props = defineProps();
const { theme } = useTheme();
const highlightedHtml = ref('');
const highlighter = shallowRef(null);
const copied = ref(false);
async function initHighlighter() {
    highlighter.value = await createHighlighter({
        themes: ['vitesse-dark', 'vitesse-light'],
        langs: ['csharp', 'typescript'],
    });
}
function highlight() {
    if (!highlighter.value)
        return;
    const shikiTheme = theme.value === 'light' ? 'vitesse-light' : 'vitesse-dark';
    const html = highlighter.value.codeToHtml(props.code, {
        lang: props.language,
        theme: shikiTheme,
    });
    if (props.highlights?.length) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const lines = doc.querySelectorAll('.line');
        lines.forEach((line, i) => {
            if (props.highlights.includes(i + 1)) {
                line.classList.add('highlighted-line');
            }
        });
        highlightedHtml.value = doc.body.innerHTML;
    }
    else {
        highlightedHtml.value = html;
    }
}
async function copyCode() {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
}
onMounted(async () => {
    await initHighlighter();
    highlight();
});
watch(() => [props.code, props.language, props.highlights, theme.value], highlight);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['code-block-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['highlighted-line']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "code-block-wrapper relative" },
});
/** @type {__VLS_StyleScopedClasses['code-block-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute top-2.5 right-3 z-10 flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
if (__VLS_ctx.highlights?.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex items-center gap-1.5 text-xs text-dim" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "inline-block w-3 h-3 rounded-sm border-l-2 border-primary bg-primary/10" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-l-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.copyCode) },
    ...{ class: "p-1.5 rounded-md text-dim hover:text-[var(--color-text)] hover:bg-bg-hover transition-colors" },
    title: "复制代码",
});
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-text)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
if (__VLS_ctx.copied) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Check} */
    Check;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        size: (14),
        ...{ class: "text-primary" },
    }));
    const __VLS_2 = __VLS_1({
        size: (14),
        ...{ class: "text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
}
else {
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.Copy} */
    Copy;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        size: (14),
    }));
    const __VLS_7 = __VLS_6({
        size: (14),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overflow-x-auto px-5 py-4" },
});
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "shiki-container" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.highlightedHtml) }, null, null);
/** @type {__VLS_StyleScopedClasses['shiki-container']} */ ;
// @ts-ignore
[highlights, copyCode, copied, highlightedHtml,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

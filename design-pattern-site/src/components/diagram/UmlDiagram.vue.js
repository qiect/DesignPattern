/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import mermaid from 'mermaid';
import { ref, onMounted, watch } from 'vue';
import { useTheme } from '@/composables/useTheme';
const { theme } = useTheme();
const darkThemeVars = {
    primaryColor: '#1a1b2e',
    primaryTextColor: '#e4e4f0',
    primaryBorderColor: '#00d4aa',
    lineColor: '#6c8cff',
    secondaryColor: '#222340',
    tertiaryColor: '#0f1021',
    fontFamily: 'Outfit, Noto Sans SC, sans-serif',
};
const lightThemeVars = {
    primaryColor: '#ffffff',
    primaryTextColor: '#1a1b2e',
    primaryBorderColor: '#00a88a',
    lineColor: '#4a6cf7',
    secondaryColor: '#eeeef4',
    tertiaryColor: '#f5f5fa',
    fontFamily: 'Outfit, Noto Sans SC, sans-serif',
};
function initMermaid() {
    const isLight = theme.value === 'light';
    mermaid.initialize({
        startOnLoad: false,
        theme: isLight ? 'default' : 'dark',
        themeVariables: isLight ? lightThemeVars : darkThemeVars,
    });
}
const props = defineProps();
const containerRef = ref();
let renderId = 0;
async function renderDiagram() {
    if (!containerRef.value || !props.code)
        return;
    initMermaid();
    renderId++;
    const id = `uml-${renderId}`;
    try {
        const { svg } = await mermaid.render(id, props.code);
        containerRef.value.innerHTML = svg;
    }
    catch (e) {
        console.error('Mermaid render error:', e);
        containerRef.value.innerHTML = '<p class="text-dim text-sm p-4">Diagram render failed</p>';
    }
}
onMounted(renderDiagram);
watch(() => props.code, renderDiagram);
watch(theme, renderDiagram);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-lg border border-border bg-bg-card p-4 overflow-auto" },
});
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ref: "containerRef",
    ...{ class: "flex justify-center" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

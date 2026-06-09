/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';
const props = defineProps();
const { theme } = useTheme();
const currentStepData = computed(() => props.steps[props.currentStep] ?? { description: '', objects: [], arrows: [] });
const currentObjects = computed(() => currentStepData.value.objects);
const currentArrows = computed(() => currentStepData.value.arrows);
// 主题相关的 SVG 颜色
const svgColors = computed(() => ({
    text: theme.value === 'light' ? '#1a1b2e' : '#e4e4f0',
    dim: theme.value === 'light' ? '#6b6b88' : '#8888a8',
    structural: theme.value === 'light' ? '#4a6cf7' : '#6c8cff',
    accent: theme.value === 'light' ? '#e05520' : '#ff6b35',
    bg: theme.value === 'light' ? '#f0f0f6' : '#12122a',
}));
function getObjectById(id) {
    return currentObjects.value.find((o) => o.id === id);
}
function getObjCenter(obj) {
    const w = obj.width ?? (obj.type === 'circle' ? 80 : 120);
    const h = obj.height ?? (obj.type === 'circle' ? 80 : 50);
    return { cx: obj.x + w / 2, cy: obj.y + h / 2, w, h };
}
// 计算从对象边缘出发的箭头端点，避免穿过对象
function getArrowPath(arrow) {
    const fromObj = getObjectById(arrow.from);
    const toObj = getObjectById(arrow.to);
    if (!fromObj || !toObj)
        return null;
    const from = getObjCenter(fromObj);
    const to = getObjCenter(toObj);
    const dx = to.cx - from.cx;
    const dy = to.cy - from.cy;
    const angle = Math.atan2(dy, dx);
    // 从 from 边缘出发
    const fromR = fromObj.type === 'circle'
        ? (fromObj.width ?? 80) / 2 + 4
        : getRectEdgeDist(from.w, from.h, angle) + 4;
    const x1 = from.cx + Math.cos(angle) * fromR;
    const y1 = from.cy + Math.sin(angle) * fromR;
    // 到 to 边缘结束（留出箭头空间）
    const toR = toObj.type === 'circle'
        ? (toObj.width ?? 80) / 2 + 12
        : getRectEdgeDist(to.w, to.h, angle + Math.PI) + 12;
    const x2 = to.cx - Math.cos(angle) * toR;
    const y2 = to.cy - Math.sin(angle) * toR;
    // 添加微弱弧度让箭头更优雅
    const dist = Math.sqrt(dx * dx + dy * dy);
    const curveOffset = dist > 100 ? 8 : 0;
    const perpX = -Math.sin(angle) * curveOffset;
    const perpY = Math.cos(angle) * curveOffset;
    const midX = (x1 + x2) / 2 + perpX;
    const midY = (y1 + y2) / 2 + perpY;
    return { x1, y1, x2, y2, midX, midY };
}
function getRectEdgeDist(w, h, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return Math.min(w / 2 / Math.abs(cos || 0.001), h / 2 / Math.abs(sin || 0.001));
}
function getArrowLabelPos(arrow) {
    const path = getArrowPath(arrow);
    if (!path)
        return null;
    return { x: path.midX, y: path.midY - 8 };
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "animator-container rounded-xl border border-border overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['animator-container']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 600 280",
    ...{ class: "w-full" },
    ...{ style: ({ background: __VLS_ctx.svgColors.bg }) },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.marker, __VLS_intrinsics.marker)({
    id: "anim-arrow",
    markerWidth: "8",
    markerHeight: "6",
    refX: "7",
    refY: "3",
    orient: "auto",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M0 0 L8 3 L0 6 L2 3 Z",
    fill: (__VLS_ctx.svgColors.structural),
});
__VLS_asFunctionalElement1(__VLS_intrinsics.marker, __VLS_intrinsics.marker)({
    id: "anim-arrow-accent",
    markerWidth: "8",
    markerHeight: "6",
    refX: "7",
    refY: "3",
    orient: "auto",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M0 0 L8 3 L0 6 L2 3 Z",
    fill: (__VLS_ctx.svgColors.accent),
});
__VLS_asFunctionalElement1(__VLS_intrinsics.filter, __VLS_intrinsics.filter)({
    id: "glow",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.feGaussianBlur)({
    stdDeviation: "3",
    result: "blur",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.feMerge, __VLS_intrinsics.feMerge)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.feMergeNode)({
    in: "blur",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.feMergeNode)({
    in: "SourceGraphic",
});
for (const [arrow, i] of __VLS_vFor((__VLS_ctx.currentArrows))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.template)({
        key: (`arrow-${i}`),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        ...((() => {
            const p = __VLS_ctx.getArrowPath(arrow);
            if (!p)
                return {};
            return { d: `M${p.x1},${p.y1} Q${p.midX},${p.midY} ${p.x2},${p.y2}` };
        })()),
        stroke: (arrow.color ?? __VLS_ctx.svgColors.structural),
        'stroke-width': (arrow.animated ? 2.5 : 1.5),
        'stroke-dasharray': (arrow.dashed ? '6 4' : undefined),
        fill: "none",
        'marker-end': (arrow.color === '#ff6b35' || arrow.color === __VLS_ctx.svgColors.accent ? 'url(#anim-arrow-accent)' : 'url(#anim-arrow)'),
        ...{ class: ({ 'flow-arrow': arrow.animated }) },
        'stroke-linecap': "round",
    });
    /** @type {__VLS_StyleScopedClasses['flow-arrow']} */ ;
    // @ts-ignore
    [svgColors, svgColors, svgColors, svgColors, svgColors, currentArrows, getArrowPath,];
}
for (const [arrow, i] of __VLS_vFor((__VLS_ctx.currentArrows))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.template)({
        key: (`label-${i}`),
    });
    if (arrow.label && __VLS_ctx.getArrowLabelPos(arrow)) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.g, __VLS_intrinsics.g)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
            x: (__VLS_ctx.getArrowLabelPos(arrow).x - 24),
            y: (__VLS_ctx.getArrowLabelPos(arrow).y - 9),
            width: "48",
            height: "16",
            rx: "4",
            fill: (__VLS_ctx.svgColors.bg),
            'fill-opacity': "0.9",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
            ...(__VLS_ctx.getArrowLabelPos(arrow)),
            'text-anchor': "middle",
            'dominant-baseline': "central",
            fill: (arrow.color ?? __VLS_ctx.svgColors.structural),
            'font-size': "10",
            'font-weight': "500",
            'font-family': "Outfit, Noto Sans SC, sans-serif",
        });
        (arrow.label);
    }
    // @ts-ignore
    [svgColors, svgColors, currentArrows, getArrowLabelPos, getArrowLabelPos, getArrowLabelPos, getArrowLabelPos,];
}
for (const [obj] of __VLS_vFor((__VLS_ctx.currentObjects))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.g, __VLS_intrinsics.g)({
        key: (obj.id),
        transform: (`translate(${obj.x}, ${obj.y})`),
        opacity: (obj.opacity ?? 1),
        ...{ class: "anim-object" },
    });
    /** @type {__VLS_StyleScopedClasses['anim-object']} */ ;
    if (obj.type === 'rect') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
            width: (obj.width ?? 120),
            height: (obj.height ?? 50),
            rx: (10),
            fill: (obj.color),
            'fill-opacity': "0.12",
            stroke: (obj.color),
            'stroke-width': "1.5",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
            width: (obj.width ?? 120),
            height: (3),
            x: (0),
            y: (0),
            rx: (10),
            fill: (obj.color),
            'fill-opacity': "0.6",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
            'text-anchor': "middle",
            'dominant-baseline': "central",
            x: ((obj.width ?? 120) / 2),
            y: ((obj.height ?? 50) / 2 + 2),
            fill: (__VLS_ctx.svgColors.text),
            'font-size': "13",
            'font-weight': "600",
            'font-family': "Outfit, Noto Sans SC, sans-serif",
        });
        (obj.label);
    }
    else if (obj.type === 'circle') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
            cx: ((obj.width ?? 80) / 2),
            cy: ((obj.height ?? 80) / 2),
            r: ((obj.width ?? 80) / 2),
            fill: (obj.color),
            'fill-opacity': "0.12",
            stroke: (obj.color),
            'stroke-width': "1.5",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
            'text-anchor': "middle",
            'dominant-baseline': "central",
            x: ((obj.width ?? 80) / 2),
            y: ((obj.height ?? 80) / 2),
            fill: (__VLS_ctx.svgColors.text),
            'font-size': "12",
            'font-weight': "600",
            'font-family': "Outfit, Noto Sans SC, sans-serif",
        });
        (obj.label);
    }
    else if (obj.type === 'diamond') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
            width: (obj.width ?? 80),
            height: (obj.height ?? 80),
            rx: (6),
            fill: (obj.color),
            'fill-opacity': "0.12",
            stroke: (obj.color),
            'stroke-width': "1.5",
            transform: "rotate(45)",
            x: (-(obj.width ?? 80) / 2),
            y: (-(obj.height ?? 80) / 2),
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
            'text-anchor': "middle",
            'dominant-baseline': "central",
            x: "0",
            y: "0",
            fill: (__VLS_ctx.svgColors.text),
            'font-size': "12",
            'font-weight': "600",
            'font-family': "Outfit, Noto Sans SC, sans-serif",
        });
        (obj.label);
    }
    // @ts-ignore
    [svgColors, svgColors, svgColors, currentObjects,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "px-5 py-3 bg-bg-card border-t border-border flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center" },
});
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary/15']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
(__VLS_ctx.currentStep + 1);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm text-[var(--color-text)] leading-relaxed" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
(__VLS_ctx.currentStepData.description);
// @ts-ignore
[currentStep, currentStepData,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

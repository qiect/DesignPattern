/// <reference types="../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useRouter } from 'vue-router';
import { Hammer, Layers, GitBranch, ArrowRight, ChevronRight } from 'lucide-vue-next';
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionTitle from '@/components/common/SectionTitle.vue';
import { categories } from '@/data/categories';
import { getAllPatterns, getPatternsByCategory } from '@/data';
import { patternRelations } from '@/data/relations';
const router = useRouter();
const categoryIcons = {
    creational: Hammer,
    structural: Layers,
    behavioral: GitBranch,
};
const learningPath = [
    'singleton', 'strategy', 'observer', 'decorator', 'adapter',
    'factory-method', 'command', 'template-method', 'composite', 'proxy',
];
const allPatterns = getAllPatterns();
const patternMap = new Map(allPatterns.map(p => [p.id, p]));
const principles = [
    { abbr: 'SRP', name: '单一职责', desc: '一个类只负责一项职责', icon: '🎯' },
    { abbr: 'OCP', name: '开闭原则', desc: '对扩展开放，对修改关闭', icon: '🔓' },
    { abbr: 'LSP', name: '里氏替换', desc: '子类必须能替换其基类', icon: '🔄' },
    { abbr: 'ISP', name: '接口隔离', desc: '客户端不应依赖不需要的接口', icon: '✂️' },
    { abbr: 'DIP', name: '依赖倒置', desc: '依赖抽象而非具体实现', icon: '⬆️' },
    { abbr: 'LoD', name: '迪米特', desc: '最少知道原则，降低耦合', icon: '🤫' },
    { abbr: 'CRP', name: '合成复用', desc: '优先使用组合而非继承', icon: '🧩' },
];
// Build SVG network nodes grouped by category
const categoryColorMap = {
    creational: '#00d4aa',
    structural: '#6c8cff',
    behavioral: '#ff6b35',
};
const networkNodes = [];
const catGroups = [
    { cat: 'creational', x: 120, patterns: getPatternsByCategory('creational') },
    { cat: 'structural', x: 400, patterns: getPatternsByCategory('structural') },
    { cat: 'behavioral', x: 680, patterns: getPatternsByCategory('behavioral') },
];
catGroups.forEach(g => {
    g.patterns.forEach((p, i) => {
        networkNodes.push({
            id: p.id,
            label: p.name,
            x: g.x,
            y: 40 + i * 52,
            color: categoryColorMap[g.cat],
        });
    });
});
const nodeMap = new Map(networkNodes.map(n => [n.id, n]));
const networkEdges = patternRelations
    .map(r => {
    const from = nodeMap.get(r.from);
    const to = nodeMap.get(r.to);
    if (!from || !to)
        return null;
    return { from, to, type: r.type };
})
    .filter(Boolean);
function navigateToCategory(catId) {
    router.push(`/${catId}`);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "relative grid-bg overflow-hidden py-16 md:py-24 px-4 md:px-6" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['py-16']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-24']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 overflow-hidden pointer-events-none" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "absolute top-[10%] left-[8%] w-16 h-16 border border-primary/20 rounded-lg rotate-12 animate-float-slow" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[10%]']} */ ;
/** @type {__VLS_StyleScopedClasses['left-[8%]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-12']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-float-slow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "absolute top-[30%] right-[12%] w-12 h-12 border border-accent/20 rounded-full animate-float-medium" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[30%]']} */ ;
/** @type {__VLS_StyleScopedClasses['right-[12%]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-accent/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-float-medium']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "absolute bottom-[20%] left-[20%] w-10 h-10 border border-structural/20 rotate-45 animate-float-fast" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-[20%]']} */ ;
/** @type {__VLS_StyleScopedClasses['left-[20%]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-structural/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-45']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-float-fast']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "absolute top-[55%] right-[25%] w-14 h-14 border border-primary/15 rounded-lg -rotate-12 animate-float-medium" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[55%]']} */ ;
/** @type {__VLS_StyleScopedClasses['right-[25%]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary/15']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['-rotate-12']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-float-medium']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "absolute bottom-[35%] left-[60%] w-8 h-8 border border-accent/20 rounded-full animate-float-slow" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-[35%]']} */ ;
/** @type {__VLS_StyleScopedClasses['left-[60%]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-accent/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-float-slow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative max-w-4xl mx-auto text-center" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['to-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-clip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['text-transparent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-lg sm:text-xl text-dim mb-6" },
});
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-[var(--color-text-dim)] max-w-2xl mx-auto leading-relaxed" },
});
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-dim)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.router.push('/creational');
            // @ts-ignore
            [router,];
        } },
    ...{ class: "\u006d\u0074\u002d\u0038\u0020\u0069\u006e\u006c\u0069\u006e\u0065\u002d\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0067\u0061\u0070\u002d\u0032\u0020\u0070\u0078\u002d\u0036\u0020\u0070\u0079\u002d\u0033\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0062\u0067\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0031\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0033\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u0067\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0032\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0035\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0033\u0030\u0030" },
});
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary/30
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
/** @type {__VLS_StyleScopedClasses['hover:bg-primary/20']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.ArrowRight} */
ArrowRight;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    size: (18),
}));
const __VLS_9 = __VLS_8({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16" },
});
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-16']} */ ;
const __VLS_12 = SectionTitle;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    title: "三大类模式",
    subtitle: "按目的分类的 GoF 设计模式",
    icon: "Layers",
}));
const __VLS_14 = __VLS_13({
    title: "三大类模式",
    subtitle: "按目的分类的 GoF 设计模式",
    icon: "Layers",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid md:grid-cols-3 gap-6 mt-8" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
for (const [cat] of __VLS_vFor((__VLS_ctx.categories))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.navigateToCategory(cat.id);
                // @ts-ignore
                [categories, navigateToCategory,];
            } },
        key: (cat.id),
        ...{ class: "\u0067\u0072\u006f\u0075\u0070\u0020\u0072\u0065\u006c\u0061\u0074\u0069\u0076\u0065\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0078\u006c\u0020\u0070\u002d\u005b\u0031\u0070\u0078\u005d\u0020\u0063\u0075\u0072\u0073\u006f\u0072\u002d\u0070\u006f\u0069\u006e\u0074\u0065\u0072\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0033\u0030\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u002d\u0074\u0072\u0061\u006e\u0073\u006c\u0061\u0074\u0065\u002d\u0079\u002d\u0031\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u006c\u0067" },
        ...{ style: ({ background: `linear-gradient(135deg, ${cat.color}40, ${cat.color}10)` }) },
    });
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-[1px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300
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
    /** @type {__VLS_StyleScopedClasses['hover:-translate-y-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:shadow-lg']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-bg-card rounded-xl p-6 h-full" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-12 h-12 rounded-lg flex items-center justify-center mb-4" },
        ...{ style: ({ backgroundColor: cat.color + '18' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    const __VLS_17 = (__VLS_ctx.categoryIcons[cat.id]);
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        size: (24),
        ...{ style: ({ color: cat.color }) },
    }));
    const __VLS_19 = __VLS_18({
        size: (24),
        ...{ style: ({ color: cat.color }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "font-display text-lg font-semibold text-[var(--color-text)] mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    (cat.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-dim mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    (cat.nameEn);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm text-[var(--color-text-dim)] leading-relaxed mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-dim)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    (cat.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs px-2 py-1 rounded-full" },
        ...{ style: ({ backgroundColor: cat.color + '18', color: cat.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    (cat.patternIds.length);
    let __VLS_22;
    /** @ts-ignore @type { | typeof __VLS_components.ChevronRight} */
    ChevronRight;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        size: (16),
        ...{ class: "text-dim group-hover:text-[var(--color-text)] transition-colors" },
    }));
    const __VLS_24 = __VLS_23({
        size: (16),
        ...{ class: "text-dim group-hover:text-[var(--color-text)] transition-colors" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:text-[var(--color-text)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    // @ts-ignore
    [categoryIcons,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16" },
});
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-16']} */ ;
const __VLS_27 = SectionTitle;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    title: "推荐学习路径",
    subtitle: "由浅入深，循序渐进",
    icon: "Route",
}));
const __VLS_29 = __VLS_28({
    title: "推荐学习路径",
    subtitle: "由浅入深，循序渐进",
    icon: "Route",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-8 overflow-x-auto pb-4 scrollbar-thin" },
});
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['scrollbar-thin']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3 min-w-max" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-max']} */ ;
for (const [pid, idx] of __VLS_vFor((__VLS_ctx.learningPath))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.template)({
        key: (pid),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.router.push(`/pattern/${pid}`);
                // @ts-ignore
                [router, learningPath,];
            } },
        ...{ class: "\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0067\u0061\u0070\u002d\u0032\u0020\u0070\u0078\u002d\u0034\u0020\u0070\u0079\u002d\u0033\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0062\u0067\u002d\u0062\u0067\u002d\u0063\u0061\u0072\u0064\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006f\u0072\u0064\u0065\u0072\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0033\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u002d\u0074\u0072\u0061\u006e\u0073\u006c\u0061\u0074\u0065\u002d\u0079\u002d\u0030\u002e\u0035\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0033\u0030\u0030\u0020\u0063\u0075\u0072\u0073\u006f\u0072\u002d\u0070\u006f\u0069\u006e\u0074\u0065\u0072" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-border
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
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:border-primary/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:-translate-y-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-mono text-dim w-5" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    (idx + 1);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-[var(--color-text)] whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    (__VLS_ctx.patternMap.get(pid)?.name ?? pid);
    if (idx < __VLS_ctx.learningPath.length - 1) {
        let __VLS_32;
        /** @ts-ignore @type { | typeof __VLS_components.ArrowRight} */
        ArrowRight;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
            size: (16),
            ...{ class: "text-dim shrink-0" },
        }));
        const __VLS_34 = __VLS_33({
            size: (16),
            ...{ class: "text-dim shrink-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    }
    // @ts-ignore
    [learningPath, patternMap,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16" },
});
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-16']} */ ;
const __VLS_37 = SectionTitle;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
    title: "七大设计原则",
    subtitle: "设计模式的理论基础",
    icon: "BookOpen",
}));
const __VLS_39 = __VLS_38({
    title: "七大设计原则",
    subtitle: "设计模式的理论基础",
    icon: "BookOpen",
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 mt-8" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-7']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
for (const [p] of __VLS_vFor((__VLS_ctx.principles))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (p.abbr),
        ...{ class: "\u0062\u0067\u002d\u0062\u0067\u002d\u0063\u0061\u0072\u0064\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0078\u006c\u0020\u0070\u002d\u0034\u0020\u0074\u0065\u0078\u0074\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002f\u0033\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u002d\u0074\u0072\u0061\u006e\u0073\u006c\u0061\u0074\u0065\u002d\u0079\u002d\u0031\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0033\u0030\u0030" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center
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
    /** @type {__VLS_StyleScopedClasses['hover:-translate-y-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-2xl mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    (p.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "font-display text-sm font-semibold text-[var(--color-text)]" },
    });
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
    (p.abbr);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-primary mt-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
    (p.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-[var(--color-text-dim)] mt-2 leading-relaxed" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-dim)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    (p.desc);
    // @ts-ignore
    [principles,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16" },
});
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-16']} */ ;
const __VLS_42 = SectionTitle;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    title: "模式关系网络",
    subtitle: "模式之间的互补、替代与组合关系",
    icon: "Network",
}));
const __VLS_44 = __VLS_43({
    title: "模式关系网络",
    subtitle: "模式之间的互补、替代与组合关系",
    icon: "Network",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-8 bg-bg-card border border-border rounded-xl p-6 overflow-x-auto" },
});
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 800 620",
    ...{ class: "w-full min-w-[600px]" },
    xmlns: "http://www.w3.org/2000/svg",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[600px]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "120",
    y: "24",
    'text-anchor': "middle",
    fill: (__VLS_ctx.categoryColorMap.creational),
    'font-size': "13",
    'font-weight': "600",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "400",
    y: "24",
    'text-anchor': "middle",
    fill: (__VLS_ctx.categoryColorMap.structural),
    'font-size': "13",
    'font-weight': "600",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "680",
    y: "24",
    'text-anchor': "middle",
    fill: (__VLS_ctx.categoryColorMap.behavioral),
    'font-size': "13",
    'font-weight': "600",
});
for (const [edge, i] of __VLS_vFor((__VLS_ctx.networkEdges))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.template)({
        key: (i),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: (edge.from.x),
        y1: (edge.from.y),
        x2: (edge.to.x),
        y2: (edge.to.y),
        stroke: (edge.type === 'complementary' ? __VLS_ctx.categoryColorMap.creational : edge.type === 'alternative' ? __VLS_ctx.categoryColorMap.behavioral : __VLS_ctx.categoryColorMap.structural),
        'stroke-dasharray': (edge.type === 'alternative' ? '4 4' : 'none'),
        'stroke-width': "1",
        opacity: "0.3",
    });
    // @ts-ignore
    [categoryColorMap, categoryColorMap, categoryColorMap, categoryColorMap, categoryColorMap, categoryColorMap, networkEdges,];
}
for (const [node] of __VLS_vFor((__VLS_ctx.networkNodes))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.template)({
        key: (node.id),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: (node.x),
        cy: (node.y),
        r: "4",
        fill: (node.color),
        opacity: "0.8",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
        x: (node.x + 10),
        y: (node.y + 4),
        ...{ class: "svg-text-fill" },
        'font-size': "11",
    });
    /** @type {__VLS_StyleScopedClasses['svg-text-fill']} */ ;
    (node.label);
    // @ts-ignore
    [networkNodes,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.line)({
    x1: "20",
    y1: "600",
    x2: "50",
    y2: "600",
    stroke: (__VLS_ctx.categoryColorMap.creational),
    'stroke-width': "1.5",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "55",
    y: "604",
    ...{ class: "svg-dim-fill" },
    'font-size': "10",
});
/** @type {__VLS_StyleScopedClasses['svg-dim-fill']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.line)({
    x1: "120",
    y1: "600",
    x2: "150",
    y2: "600",
    stroke: (__VLS_ctx.categoryColorMap.behavioral),
    'stroke-width': "1.5",
    'stroke-dasharray': "4 4",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "155",
    y: "604",
    ...{ class: "svg-dim-fill" },
    'font-size': "10",
});
/** @type {__VLS_StyleScopedClasses['svg-dim-fill']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.line)({
    x1: "220",
    y1: "600",
    x2: "250",
    y2: "600",
    stroke: (__VLS_ctx.categoryColorMap.structural),
    'stroke-width': "1.5",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "255",
    y: "604",
    ...{ class: "svg-dim-fill" },
    'font-size': "10",
});
/** @type {__VLS_StyleScopedClasses['svg-dim-fill']} */ ;
// @ts-ignore
[categoryColorMap, categoryColorMap, categoryColorMap,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};

/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import { Search, Sun, Moon, Monitor, Menu, X } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
const emit = defineEmits();
const router = useRouter();
const searchQuery = ref('');
const { theme, isAutoMode, toggleTheme, setAutoMode } = useTheme();
const showThemeMenu = ref(false);
const showMobileNav = ref(false);
function onSearch() {
    const q = searchQuery.value.trim();
    if (q) {
        router.push({ name: 'search', query: { q } });
    }
}
function handleSetAuto(auto) {
    setAutoMode(auto);
    showThemeMenu.value = false;
}
function closeMobileNav() {
    showMobileNav.value = false;
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "fixed top-0 left-0 right-0 z-50 bg-bg-card border-b border-border" },
});
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between h-14 md:h-16 px-4 md:px-6 max-w-[1440px] mx-auto" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[1440px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    to: "/",
    ...{ class: "flex items-center gap-2 shrink-0" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    to: "/",
    ...{ class: "flex items-center gap-2 shrink-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    ...{ click: {} },
    onClick: (__VLS_ctx.closeMobileNav),
};
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    ...{ class: "text-primary" },
});
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M14 2L25 8.5V19.5L14 26L3 19.5V8.5L14 2Z",
    stroke: "currentColor",
    'stroke-width': "2",
    fill: "none",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M14 8L20 11.5V18.5L14 22L8 18.5V11.5L14 8Z",
    fill: "currentColor",
    opacity: "0.3",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-display text-lg md:text-xl font-bold text-[var(--color-text)]" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
// @ts-ignore
[closeMobileNav,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "hidden md:flex items-center gap-6" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    to: "/",
    ...{ class: "text-sm text-dim hover:text-primary transition-colors" },
}));
const __VLS_10 = __VLS_9({
    to: "/",
    ...{ class: "text-sm text-dim hover:text-primary transition-colors" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
const { default: __VLS_13 } = __VLS_11.slots;
// @ts-ignore
[];
var __VLS_11;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    to: "/creational",
    ...{ class: "text-sm text-dim hover:text-creational transition-colors" },
}));
const __VLS_16 = __VLS_15({
    to: "/creational",
    ...{ class: "text-sm text-dim hover:text-creational transition-colors" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-creational']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
const { default: __VLS_19 } = __VLS_17.slots;
// @ts-ignore
[];
var __VLS_17;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    to: "/structural",
    ...{ class: "text-sm text-dim hover:text-structural transition-colors" },
}));
const __VLS_22 = __VLS_21({
    to: "/structural",
    ...{ class: "text-sm text-dim hover:text-structural transition-colors" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-structural']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
const { default: __VLS_25 } = __VLS_23.slots;
// @ts-ignore
[];
var __VLS_23;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    to: "/behavioral",
    ...{ class: "text-sm text-dim hover:text-behavioral transition-colors" },
}));
const __VLS_28 = __VLS_27({
    to: "/behavioral",
    ...{ class: "text-sm text-dim hover:text-behavioral transition-colors" },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-behavioral']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
const { default: __VLS_31 } = __VLS_29.slots;
// @ts-ignore
[];
var __VLS_29;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    to: "/compare",
    ...{ class: "text-sm text-dim hover:text-accent transition-colors" },
}));
const __VLS_34 = __VLS_33({
    to: "/compare",
    ...{ class: "text-sm text-dim hover:text-accent transition-colors" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
const { default: __VLS_37 } = __VLS_35.slots;
// @ts-ignore
[];
var __VLS_35;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 md:gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 bg-bg rounded-lg px-2.5 md:px-3 py-1.5 border border-border focus-within:border-primary/50 transition-colors" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-within:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.Search} */
Search;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    size: (16),
    ...{ class: "text-dim shrink-0" },
}));
const __VLS_40 = __VLS_39({
    size: (16),
    ...{ class: "text-dim shrink-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onKeyup: (__VLS_ctx.onSearch) },
    value: (__VLS_ctx.searchQuery),
    type: "text",
    placeholder: "搜索模式...",
    ...{ class: "bg-transparent text-sm text-[var(--color-text)] placeholder:text-dim outline-none w-24 sm:w-32 lg:w-48" },
});
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-48']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative hidden sm:block" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:block']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showThemeMenu = !__VLS_ctx.showThemeMenu;
            // @ts-ignore
            [onSearch, searchQuery, showThemeMenu, showThemeMenu,];
        } },
    ...{ class: "p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-bg-hover transition-all duration-300" },
    title: "切换主题",
});
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
if (__VLS_ctx.theme === 'light') {
    let __VLS_43;
    /** @ts-ignore @type { | typeof __VLS_components.Sun} */
    Sun;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
        size: (18),
        ...{ class: "text-accent" },
    }));
    const __VLS_45 = __VLS_44({
        size: (18),
        ...{ class: "text-accent" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    /** @type {__VLS_StyleScopedClasses['text-accent']} */ ;
}
else {
    let __VLS_48;
    /** @ts-ignore @type { | typeof __VLS_components.Moon} */
    Moon;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        size: (18),
        ...{ class: "text-primary" },
    }));
    const __VLS_50 = __VLS_49({
        size: (18),
        ...{ class: "text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
}
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    name: "theme-menu",
}));
const __VLS_55 = __VLS_54({
    name: "theme-menu",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_58 } = __VLS_56.slots;
if (__VLS_ctx.showThemeMenu) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute right-0 top-full mt-2 w-48 bg-bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-48']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showThemeMenu))
                    return;
                __VLS_ctx.isAutoMode = false;
                __VLS_ctx.theme = 'dark';
                __VLS_ctx.showThemeMenu = false;
                // @ts-ignore
                [showThemeMenu, showThemeMenu, theme, theme, isAutoMode,];
            } },
        ...{ class: "w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-bg-hover transition-colors" },
        ...{ class: (__VLS_ctx.theme === 'dark' && !__VLS_ctx.isAutoMode ? 'text-primary' : 'text-dim') },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    let __VLS_59;
    /** @ts-ignore @type { | typeof __VLS_components.Moon} */
    Moon;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
        size: (16),
    }));
    const __VLS_61 = __VLS_60({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    if (__VLS_ctx.theme === 'dark' && !__VLS_ctx.isAutoMode) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ml-auto text-xs" },
        });
        /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showThemeMenu))
                    return;
                __VLS_ctx.isAutoMode = false;
                __VLS_ctx.theme = 'light';
                __VLS_ctx.showThemeMenu = false;
                // @ts-ignore
                [showThemeMenu, theme, theme, theme, isAutoMode, isAutoMode, isAutoMode,];
            } },
        ...{ class: "w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-bg-hover transition-colors" },
        ...{ class: (__VLS_ctx.theme === 'light' && !__VLS_ctx.isAutoMode ? 'text-primary' : 'text-dim') },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    let __VLS_64;
    /** @ts-ignore @type { | typeof __VLS_components.Sun} */
    Sun;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
        size: (16),
    }));
    const __VLS_66 = __VLS_65({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    if (__VLS_ctx.theme === 'light' && !__VLS_ctx.isAutoMode) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ml-auto text-xs" },
        });
        /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "border-t border-border" },
    });
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showThemeMenu))
                    return;
                __VLS_ctx.handleSetAuto(true);
                // @ts-ignore
                [theme, theme, isAutoMode, isAutoMode, handleSetAuto,];
            } },
        ...{ class: "w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-bg-hover transition-colors" },
        ...{ class: (__VLS_ctx.isAutoMode ? 'text-primary' : 'text-dim') },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    let __VLS_69;
    /** @ts-ignore @type { | typeof __VLS_components.Monitor} */
    Monitor;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
        size: (16),
    }));
    const __VLS_71 = __VLS_70({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    if (__VLS_ctx.isAutoMode) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ml-auto text-xs" },
        });
        /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    }
}
// @ts-ignore
[isAutoMode, isAutoMode,];
var __VLS_56;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showMobileNav = !__VLS_ctx.showMobileNav;
            // @ts-ignore
            [showMobileNav, showMobileNav,];
        } },
    ...{ class: "md:hidden p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-bg-hover transition-all" },
});
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
if (__VLS_ctx.showMobileNav) {
    let __VLS_74;
    /** @ts-ignore @type { | typeof __VLS_components.X} */
    X;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
        size: (20),
        ...{ class: "text-[var(--color-text)]" },
    }));
    const __VLS_76 = __VLS_75({
        size: (20),
        ...{ class: "text-[var(--color-text)]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
}
else {
    let __VLS_79;
    /** @ts-ignore @type { | typeof __VLS_components.Menu} */
    Menu;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
        size: (20),
        ...{ class: "text-[var(--color-text)]" },
    }));
    const __VLS_81 = __VLS_80({
        size: (20),
        ...{ class: "text-[var(--color-text)]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
}
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    name: "mobile-nav",
}));
const __VLS_86 = __VLS_85({
    name: "mobile-nav",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_89 } = __VLS_87.slots;
if (__VLS_ctx.showMobileNav) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "md:hidden bg-bg-card border-t border-border" },
    });
    /** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-bg-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
        ...{ class: "flex flex-col py-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    let __VLS_90;
    /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
    routerLink;
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
        ...{ 'onClick': {} },
        to: "/",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-primary hover:bg-bg-hover transition-colors" },
    }));
    const __VLS_92 = __VLS_91({
        ...{ 'onClick': {} },
        to: "/",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-primary hover:bg-bg-hover transition-colors" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    let __VLS_95;
    const __VLS_96 = {
        ...{ click: {} },
        onClick: (__VLS_ctx.closeMobileNav),
    };
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    const { default: __VLS_97 } = __VLS_93.slots;
    // @ts-ignore
    [closeMobileNav, showMobileNav, showMobileNav,];
    var __VLS_93;
    var __VLS_94;
    let __VLS_98;
    /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
    routerLink;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
        ...{ 'onClick': {} },
        to: "/creational",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-creational hover:bg-bg-hover transition-colors" },
    }));
    const __VLS_100 = __VLS_99({
        ...{ 'onClick': {} },
        to: "/creational",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-creational hover:bg-bg-hover transition-colors" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    let __VLS_103;
    const __VLS_104 = {
        ...{ click: {} },
        onClick: (__VLS_ctx.closeMobileNav),
    };
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-creational']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    const { default: __VLS_105 } = __VLS_101.slots;
    // @ts-ignore
    [closeMobileNav,];
    var __VLS_101;
    var __VLS_102;
    let __VLS_106;
    /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
    routerLink;
    // @ts-ignore
    const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
        ...{ 'onClick': {} },
        to: "/structural",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-structural hover:bg-bg-hover transition-colors" },
    }));
    const __VLS_108 = __VLS_107({
        ...{ 'onClick': {} },
        to: "/structural",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-structural hover:bg-bg-hover transition-colors" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_107));
    let __VLS_111;
    const __VLS_112 = {
        ...{ click: {} },
        onClick: (__VLS_ctx.closeMobileNav),
    };
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-structural']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    const { default: __VLS_113 } = __VLS_109.slots;
    // @ts-ignore
    [closeMobileNav,];
    var __VLS_109;
    var __VLS_110;
    let __VLS_114;
    /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
    routerLink;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
        ...{ 'onClick': {} },
        to: "/behavioral",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-behavioral hover:bg-bg-hover transition-colors" },
    }));
    const __VLS_116 = __VLS_115({
        ...{ 'onClick': {} },
        to: "/behavioral",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-behavioral hover:bg-bg-hover transition-colors" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    let __VLS_119;
    const __VLS_120 = {
        ...{ click: {} },
        onClick: (__VLS_ctx.closeMobileNav),
    };
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-behavioral']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    const { default: __VLS_121 } = __VLS_117.slots;
    // @ts-ignore
    [closeMobileNav,];
    var __VLS_117;
    var __VLS_118;
    let __VLS_122;
    /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
    routerLink;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
        ...{ 'onClick': {} },
        to: "/compare",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-accent hover:bg-bg-hover transition-colors" },
    }));
    const __VLS_124 = __VLS_123({
        ...{ 'onClick': {} },
        to: "/compare",
        ...{ class: "px-6 py-3 text-sm text-dim hover:text-accent hover:bg-bg-hover transition-colors" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    let __VLS_127;
    const __VLS_128 = {
        ...{ click: {} },
        onClick: (__VLS_ctx.closeMobileNav),
    };
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-accent']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-bg-hover']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    const { default: __VLS_129 } = __VLS_125.slots;
    // @ts-ignore
    [closeMobileNav,];
    var __VLS_125;
    var __VLS_126;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "border-t border-border px-4 py-3 flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showMobileNav))
                    return;
                __VLS_ctx.isAutoMode = false;
                __VLS_ctx.theme = 'dark';
                // @ts-ignore
                [theme, isAutoMode,];
            } },
        ...{ class: "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors" },
        ...{ class: (__VLS_ctx.theme === 'dark' && !__VLS_ctx.isAutoMode ? 'bg-primary/10 text-primary' : 'text-dim hover:bg-bg-hover') },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    let __VLS_130;
    /** @ts-ignore @type { | typeof __VLS_components.Moon} */
    Moon;
    // @ts-ignore
    const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
        size: (16),
    }));
    const __VLS_132 = __VLS_131({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_131));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showMobileNav))
                    return;
                __VLS_ctx.isAutoMode = false;
                __VLS_ctx.theme = 'light';
                // @ts-ignore
                [theme, theme, isAutoMode, isAutoMode,];
            } },
        ...{ class: "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors" },
        ...{ class: (__VLS_ctx.theme === 'light' && !__VLS_ctx.isAutoMode ? 'bg-primary/10 text-primary' : 'text-dim hover:bg-bg-hover') },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    let __VLS_135;
    /** @ts-ignore @type { | typeof __VLS_components.Sun} */
    Sun;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
        size: (16),
    }));
    const __VLS_137 = __VLS_136({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showMobileNav))
                    return;
                __VLS_ctx.handleSetAuto(true);
                // @ts-ignore
                [theme, isAutoMode, handleSetAuto,];
            } },
        ...{ class: "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors" },
        ...{ class: (__VLS_ctx.isAutoMode ? 'bg-primary/10 text-primary' : 'text-dim hover:bg-bg-hover') },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    let __VLS_140;
    /** @ts-ignore @type { | typeof __VLS_components.Monitor} */
    Monitor;
    // @ts-ignore
    const __VLS_141 = __VLS_asFunctionalComponent1(__VLS_140, new __VLS_140({
        size: (16),
    }));
    const __VLS_142 = __VLS_141({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_141));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[isAutoMode,];
var __VLS_87;
let __VLS_145;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent1(__VLS_145, new __VLS_145({
    to: "body",
}));
const __VLS_147 = __VLS_146({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_146));
const { default: __VLS_150 } = __VLS_148.slots;
if (__VLS_ctx.showThemeMenu) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showThemeMenu))
                    return;
                __VLS_ctx.showThemeMenu = false;
                // @ts-ignore
                [showThemeMenu, showThemeMenu,];
            } },
        ...{ class: "fixed inset-0 z-40" },
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-40']} */ ;
}
// @ts-ignore
[];
var __VLS_148;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};

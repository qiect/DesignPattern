/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch, onUnmounted, computed } from 'vue';
import { SkipBack, Play, Pause, SkipForward, RotateCcw } from 'lucide-vue-next';
const props = defineProps();
const emit = defineEmits();
const isPlaying = ref(false);
let timer = null;
const progress = computed(() => props.totalSteps > 1 ? props.currentStep / (props.totalSteps - 1) : 0);
function prev() {
    if (props.currentStep > 0) {
        emit('update:currentStep', props.currentStep - 1);
    }
}
function next() {
    if (props.currentStep < props.totalSteps - 1) {
        emit('update:currentStep', props.currentStep + 1);
    }
}
function reset() {
    stopPlay();
    emit('update:currentStep', 0);
}
function togglePlay() {
    if (isPlaying.value) {
        stopPlay();
    }
    else {
        startPlay();
    }
}
function startPlay() {
    if (props.currentStep >= props.totalSteps - 1) {
        emit('update:currentStep', 0);
    }
    isPlaying.value = true;
    timer = setInterval(() => {
        if (props.currentStep < props.totalSteps - 1) {
            emit('update:currentStep', props.currentStep + 1);
        }
        else {
            stopPlay();
        }
    }, 2500);
}
function stopPlay() {
    isPlaying.value = false;
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}
watch(() => props.currentStep, () => {
    if (isPlaying.value && props.currentStep >= props.totalSteps - 1) {
        stopPlay();
    }
});
onUnmounted(stopPlay);
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
/** @type {__VLS_StyleScopedClasses['ctrl-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['ctrl-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['ctrl-btn-play']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "step-player" },
});
/** @type {__VLS_StyleScopedClasses['step-player']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-1 bg-border rounded-full overflow-hidden mb-3" },
});
/** @type {__VLS_StyleScopedClasses['h-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "h-full bg-primary rounded-full transition-all duration-500 ease-out" },
    ...{ style: ({ width: `${__VLS_ctx.progress * 100}%` }) },
});
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between mb-3 px-0.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-0.5']} */ ;
for (const [i] of __VLS_vFor((__VLS_ctx.totalSteps))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.emit('update:currentStep', i - 1);
                // @ts-ignore
                [progress, totalSteps, emit,];
            } },
        key: (i),
        ...{ class: "step-dot w-2.5 h-2.5 rounded-full transition-all duration-300" },
        ...{ class: (i - 1 === __VLS_ctx.currentStep
                ? 'bg-primary scale-125 shadow-[0_0_6px_var(--color-primary)]'
                : i - 1 < __VLS_ctx.currentStep
                    ? 'bg-primary/40'
                    : 'bg-border') },
    });
    /** @type {__VLS_StyleScopedClasses['step-dot']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    // @ts-ignore
    [currentStep, currentStep,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.prev) },
    ...{ class: "ctrl-btn" },
    title: "上一步",
    disabled: (__VLS_ctx.currentStep === 0),
});
/** @type {__VLS_StyleScopedClasses['ctrl-btn']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.SkipBack} */
SkipBack;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    size: (15),
}));
const __VLS_2 = __VLS_1({
    size: (15),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.togglePlay) },
    ...{ class: "ctrl-btn-play" },
    title: (__VLS_ctx.isPlaying ? '暂停' : '播放'),
});
/** @type {__VLS_StyleScopedClasses['ctrl-btn-play']} */ ;
if (__VLS_ctx.isPlaying) {
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.Pause} */
    Pause;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        size: (16),
    }));
    const __VLS_7 = __VLS_6({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
else {
    let __VLS_10;
    /** @ts-ignore @type { | typeof __VLS_components.Play} */
    Play;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        size: (16),
    }));
    const __VLS_12 = __VLS_11({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.next) },
    ...{ class: "ctrl-btn" },
    title: "下一步",
    disabled: (__VLS_ctx.currentStep === __VLS_ctx.totalSteps - 1),
});
/** @type {__VLS_StyleScopedClasses['ctrl-btn']} */ ;
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.SkipForward} */
SkipForward;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    size: (15),
}));
const __VLS_17 = __VLS_16({
    size: (15),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.reset) },
    ...{ class: "ctrl-btn ml-1" },
    title: "重置",
});
/** @type {__VLS_StyleScopedClasses['ctrl-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.RotateCcw} */
RotateCcw;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    size: (14),
}));
const __VLS_22 = __VLS_21({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ml-auto text-xs text-dim font-mono tabular-nums" },
});
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-dim']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
(__VLS_ctx.currentStep + 1);
(__VLS_ctx.totalSteps);
// @ts-ignore
[totalSteps, totalSteps, currentStep, currentStep, currentStep, prev, togglePlay, isPlaying, isPlaying, next, reset,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};

import { ref, watch, onMounted, onUnmounted } from 'vue';
const STORAGE_KEY = 'theme-preference';
const LIGHT_START_HOUR = 6; // 6:00 切换为浅色
const DARK_START_HOUR = 18; // 18:00 切换为深色
const theme = ref('dark');
const isAutoMode = ref(true);
let timer = null;
function getTimeBasedTheme() {
    const hour = new Date().getHours();
    return hour >= LIGHT_START_HOUR && hour < DARK_START_HOUR ? 'light' : 'dark';
}
function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    // 同步 Tailwind dark mode（class 策略）
    document.documentElement.classList.toggle('dark', t === 'dark');
}
function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedAuto = localStorage.getItem(STORAGE_KEY + '-auto');
    if (storedAuto !== null) {
        isAutoMode.value = storedAuto === 'true';
    }
    if (stored && !isAutoMode.value) {
        theme.value = stored;
    }
    else {
        theme.value = getTimeBasedTheme();
    }
    applyTheme(theme.value);
}
export function useTheme() {
    function toggleTheme() {
        isAutoMode.value = false;
        theme.value = theme.value === 'dark' ? 'light' : 'dark';
    }
    function setAutoMode(auto) {
        isAutoMode.value = auto;
        if (auto) {
            theme.value = getTimeBasedTheme();
        }
    }
    // 监听主题变化，持久化并应用
    watch(theme, (val) => {
        applyTheme(val);
        localStorage.setItem(STORAGE_KEY, val);
        localStorage.setItem(STORAGE_KEY + '-auto', String(isAutoMode.value));
    });
    // 每分钟检查是否需要自动切换
    function checkAutoSwitch() {
        if (!isAutoMode.value)
            return;
        const target = getTimeBasedTheme();
        if (target !== theme.value) {
            theme.value = target;
        }
    }
    onMounted(() => {
        initTheme();
        timer = setInterval(checkAutoSwitch, 60_000);
    });
    onUnmounted(() => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    });
    return {
        theme,
        isAutoMode,
        toggleTheme,
        setAutoMode,
    };
}

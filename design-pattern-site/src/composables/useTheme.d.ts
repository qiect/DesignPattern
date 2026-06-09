export type Theme = 'light' | 'dark';
export declare function useTheme(): {
    theme: any;
    isAutoMode: any;
    toggleTheme: () => void;
    setAutoMode: (auto: boolean) => void;
};

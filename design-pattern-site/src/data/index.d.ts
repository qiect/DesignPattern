import type { Pattern } from '@/types/pattern';
export declare function getAllPatterns(): Pattern[];
export declare function getPatternById(id: string): Pattern | undefined;
export declare function getPatternsByCategory(category: string): Pattern[];
export declare function searchPatterns(query: string): Pattern[];

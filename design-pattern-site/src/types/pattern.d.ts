export type PatternCategory = 'creational' | 'structural' | 'behavioral';
export type Difficulty = 1 | 2 | 3;
export type RelationType = 'complementary' | 'alternative' | 'combinable';
export type CodeLanguage = 'csharp' | 'typescript';
export interface PatternRole {
    name: string;
    nameEn: string;
    responsibility: string;
    color: string;
}
export interface AnimObject {
    id: string;
    type: 'circle' | 'rect' | 'diamond';
    x: number;
    y: number;
    width?: number;
    height?: number;
    label: string;
    color: string;
    opacity?: number;
    scale?: number;
}
export interface AnimArrow {
    from: string;
    to: string;
    label?: string;
    color?: string;
    animated?: boolean;
    dashed?: boolean;
}
export interface AnimationStep {
    description: string;
    objects: AnimObject[];
    arrows: AnimArrow[];
}
export interface CodeExample {
    language: CodeLanguage;
    title: string;
    code: string;
    highlights: number[];
}
export interface Scenario {
    title: string;
    description: string;
    icon: string;
}
export interface RelatedPattern {
    patternId: string;
    relationType: RelationType;
    description: string;
}
export interface FrameworkExample {
    framework: string;
    description: string;
    code?: string;
}
export interface Pattern {
    id: string;
    name: string;
    nameEn: string;
    category: PatternCategory;
    difficulty: Difficulty;
    tags: string[];
    definition: string;
    simpleExplanation: string;
    lifeAnalogy: string;
    roles: PatternRole[];
    umlCode: string;
    animationSteps: AnimationStep[];
    scenarios: Scenario[];
    codeExamples: CodeExample[];
    pros: string[];
    cons: string[];
    relatedPatterns: RelatedPattern[];
    frameworkExamples: FrameworkExample[];
}
export interface Category {
    id: PatternCategory;
    name: string;
    nameEn: string;
    description: string;
    icon: string;
    color: string;
    patternIds: string[];
}
export interface PatternRelation {
    from: string;
    to: string;
    type: RelationType;
    description: string;
}

export const categories = [
    {
        id: 'creational',
        name: '创建型模式',
        nameEn: 'Creational Patterns',
        description: '关注对象的创建机制，提供创建对象的灵活性，将对象的创建与使用分离。',
        icon: 'Hammer',
        color: '#00d4aa',
        patternIds: ['singleton', 'factory-method', 'abstract-factory', 'builder', 'prototype'],
    },
    {
        id: 'structural',
        name: '结构型模式',
        nameEn: 'Structural Patterns',
        description: '关注类和对象的组合，通过继承和组合的方式构建更大的结构。',
        icon: 'Layers',
        color: '#6c8cff',
        patternIds: ['adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy'],
    },
    {
        id: 'behavioral',
        name: '行为型模式',
        nameEn: 'Behavioral Patterns',
        description: '关注对象之间的通信和职责分配，描述对象之间的协作方式。',
        icon: 'GitBranch',
        color: '#ff6b35',
        patternIds: ['strategy', 'mediator', 'observer', 'command', 'chain-of-responsibility', 'state', 'template-method', 'iterator', 'memento', 'interpreter', 'visitor'],
    },
];

import type { PatternRelation } from '@/types/pattern'

export const patternRelations: PatternRelation[] = [
  // 互补关系
  { from: 'strategy', to: 'factory-method', type: 'complementary', description: '策略模式常与工厂方法配合，由工厂创建具体策略对象' },
  { from: 'observer', to: 'mediator', type: 'complementary', description: '观察者模式可与中介者配合，通过中介者协调观察者' },
  { from: 'composite', to: 'visitor', type: 'complementary', description: '组合模式定义结构，访问者模式为结构添加操作' },
  { from: 'composite', to: 'iterator', type: 'complementary', description: '迭代器遍历组合结构的树形节点' },
  { from: 'command', to: 'memento', type: 'complementary', description: '命令模式配合备忘录实现撤销功能' },
  { from: 'state', to: 'strategy', type: 'complementary', description: '状态模式可看作策略的特化，策略切换由状态驱动' },
  { from: 'abstract-factory', to: 'factory-method', type: 'complementary', description: '抽象工厂常使用工厂方法实现具体产品创建' },
  { from: 'builder', to: 'composite', type: 'complementary', description: '建造者可逐步构建复杂的组合结构' },
  { from: 'facade', to: 'mediator', type: 'complementary', description: '外观简化接口，中介者简化交互，可配合使用' },

  // 替代关系
  { from: 'decorator', to: 'proxy', type: 'alternative', description: '两者都包装对象，但装饰器增加功能，代理控制访问' },
  { from: 'decorator', to: 'adapter', type: 'alternative', description: '装饰器不改变接口，适配器改变接口' },
  { from: 'bridge', to: 'adapter', type: 'alternative', description: '桥接模式事前设计分离，适配器模式事后补救兼容' },
  { from: 'strategy', to: 'state', type: 'alternative', description: '策略由客户端选择，状态由对象自身状态决定' },
  { from: 'factory-method', to: 'abstract-factory', type: 'alternative', description: '工厂方法创建单一产品，抽象工厂创建产品族' },
  { from: 'facade', to: 'mediator', type: 'alternative', description: '外观提供简化接口（单向），中介者协调交互（双向）' },
  { from: 'command', to: 'strategy', type: 'alternative', description: '命令封装请求（关注调用），策略封装算法（关注选择）' },
  { from: 'flyweight', to: 'prototype', type: 'alternative', description: '享元共享不可变部分，原型克隆创建新对象' },

  // 组合关系
  { from: 'observer', to: 'command', type: 'combinable', description: '观察者通知时可使用命令对象封装操作' },
  { from: 'decorator', to: 'composite', type: 'combinable', description: '装饰器可装饰组合结构中的节点' },
  { from: 'chain-of-responsibility', to: 'command', type: 'combinable', description: '命令对象可沿责任链传递处理' },
  { from: 'iterator', to: 'visitor', type: 'combinable', description: '迭代器遍历元素，访问者对元素执行操作' },
  { from: 'template-method', to: 'strategy', type: 'combinable', description: '模板方法定义骨架，策略实现可变的算法步骤' },
  { from: 'proxy', to: 'observer', type: 'combinable', description: '代理可充当观察者，在访问时触发通知' },
]

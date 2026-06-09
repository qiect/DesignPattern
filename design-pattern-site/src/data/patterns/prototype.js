export const prototype = {
    id: 'prototype',
    name: '原型模式',
    nameEn: 'Prototype Pattern',
    category: 'creational',
    difficulty: 2,
    tags: ['创建型', '克隆', '深拷贝'],
    definition: '用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。',
    simpleExplanation: '不通过new创建对象，而是通过复制一个已有的对象来创建新对象，就像复印文件一样。',
    lifeAnalogy: '就像用印章盖章，你不需要每次都重新刻一个章，只要用同一个印章印出相同的图案。',
    roles: [
        { name: '抽象原型', nameEn: 'Prototype', responsibility: '声明克隆方法的接口', color: '#6c8cff' },
        { name: '具体原型', nameEn: 'ConcretePrototype', responsibility: '实现克隆方法', color: '#00d4aa' },
        { name: '原型注册表', nameEn: 'PrototypeRegistry', responsibility: '管理预定义的原型对象', color: '#ff6b35' },
    ],
    umlCode: `classDiagram
    class IPrototype~T~ {
      <<interface>>
      +Clone() T
    }
    class Resume {
      +Name string
      +Age int
      +Skills List~string~
      +Clone() Resume
    }
    class ShapeCache {
      -cache Dictionary
      +RegisterShape() void
      +GetShape() Shape
    }
    IPrototype <|.. Resume
    ShapeCache --> Resume : manages`,
    animationSteps: [
        {
            description: '创建原型对象',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'prototype', type: 'rect', x: 300, y: 80, width: 120, height: 50, label: '原型对象', color: '#00d4aa', opacity: 1 },
                { id: 'clone', type: 'rect', x: 520, y: 80, width: 120, height: 50, label: '克隆对象', color: '#ff6b35', opacity: 0.3 },
            ],
            arrows: [
                { from: 'client', to: 'prototype', label: '获取原型', color: '#6c8cff' },
            ],
        },
        {
            description: '调用Clone()创建副本',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'prototype', type: 'rect', x: 300, y: 80, width: 120, height: 50, label: '原型对象', color: '#00d4aa', opacity: 1 },
                { id: 'clone', type: 'rect', x: 520, y: 80, width: 120, height: 50, label: '克隆对象', color: '#ff6b35', opacity: 1 },
            ],
            arrows: [
                { from: 'client', to: 'prototype', label: 'Clone()', color: '#6c8cff', animated: true },
                { from: 'prototype', to: 'clone', label: '复制', color: '#00d4aa', animated: true },
            ],
        },
        {
            description: '修改克隆对象不影响原型',
            objects: [
                { id: 'prototype', type: 'rect', x: 200, y: 80, width: 120, height: 50, label: '原型(不变)', color: '#00d4aa', opacity: 1 },
                { id: 'clone1', type: 'rect', x: 400, y: 50, width: 120, height: 40, label: '克隆1(已修改)', color: '#ff6b35', opacity: 1 },
                { id: 'clone2', type: 'rect', x: 400, y: 120, width: 120, height: 40, label: '克隆2(已修改)', color: '#ffd93d', opacity: 1 },
            ],
            arrows: [],
        },
    ],
    scenarios: [
        { title: '简历模板', description: '基于模板快速生成不同简历', icon: 'FileUser' },
        { title: '图形编辑器', description: '复制已有图形创建新实例', icon: 'Copy' },
        { title: '游戏角色', description: '基于模板克隆角色属性', icon: 'Gamepad2' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface IPrototype<T> { T Clone(); }

public class Resume : IPrototype<Resume>
{
    public string Name { get; set; }
    public int Age { get; set; }
    public List<string> Skills { get; set; }

    public Resume(string name, int age, string education)
    {
        Name = name;
        Age = age;
        Skills = new List<string>();
    }

    // 私有拷贝构造函数 - 深拷贝
    private Resume(Resume source)
    {
        Name = source.Name;
        Age = source.Age;
        Skills = new List<string>(source.Skills); // 深拷贝
        WorkExperience = source.WorkExperience;
    }

    public void AddSkill(string skill) => Skills.Add(skill);

    public Resume Clone() => new Resume(this);
}

// 原型注册表
public class ShapeCache
{
    private readonly Dictionary<string, Shape> _cache = new();

    public void RegisterShape(string key, Shape shape) => _cache[key] = shape;

    public Shape GetShape(string key)
    {
        if (_cache.TryGetValue(key, out var shape))
            return shape.Clone();
        throw new KeyNotFoundException($"未找到形状: {key}");
    }
}`,
            highlights: [1, 14, 15, 16, 17, 23, 32],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface Prototype<T> {
  clone(): T
}

class Resume implements Prototype<Resume> {
  name: string
  age: number
  skills: string[]

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.skills = []
  }

  addSkill(skill: string): void {
    this.skills.push(skill)
  }

  clone(): Resume {
    const copy = new Resume(this.name, this.age)
    copy.skills = [...this.skills] // 深拷贝数组
    return copy
  }
}

// 原型注册表
class ShapeCache {
  private cache = new Map<string, Shape>()

  register(key: string, shape: Shape): void {
    this.cache.set(key, shape)
  }

  get(key: string): Shape {
    const shape = this.cache.get(key)
    if (!shape) throw new Error(\`未找到: \${key}\`)
    return shape.clone()
  }
}`,
            highlights: [1, 16, 17, 18, 19, 24, 32],
        },
    ],
    pros: ['通过克隆创建对象，避免重复初始化代码', '简化对象的创建过程', '保护原型对象不被修改', '适用于创建成本较高的对象'],
    cons: ['深拷贝实现较复杂', '循环引用时克隆困难', '需要为每个类实现Clone方法'],
    relatedPatterns: [
        { patternId: 'abstract-factory', relationType: 'alternative', description: '抽象工厂通过new创建，原型通过克隆创建' },
        { patternId: 'composite', relationType: 'combinable', description: '组合模式的结果可用原型来克隆' },
        { patternId: 'factory-method', relationType: 'alternative', description: '工厂方法创建新对象，原型复制已有对象' },
    ],
    frameworkExamples: [
        { framework: 'JavaScript', description: 'Object.create() 基于原型链创建新对象，是原型模式的语言级支持' },
        { framework: 'Java', description: 'Cloneable 接口和 Object.clone() 方法是原型模式的标准实现' },
    ],
};

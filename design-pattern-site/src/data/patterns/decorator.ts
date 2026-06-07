import type { Pattern } from '@/types/pattern'

export const decorator: Pattern = {
  id: 'decorator',
  name: '装饰模式',
  nameEn: 'Decorator Pattern',
  category: 'structural',
  difficulty: 1,
  tags: ['结构型', '动态扩展', '包装器'],
  definition: '动态地给一个对象增加一些额外的职责，就增加功能来说，装饰模式比生成子类更为灵活。',
  simpleExplanation: '不修改原有代码，通过"包装"的方式给对象添加新功能，可以层层包装、灵活组合。',
  lifeAnalogy: '就像给照片加滤镜，你可以加一个美颜滤镜，再加一个复古滤镜，每加一层效果就叠加一层。',
  roles: [
    { name: '抽象构件', nameEn: 'Component', responsibility: '定义对象的接口', color: '#6c8cff' },
    { name: '具体构件', nameEn: 'ConcreteComponent', responsibility: '定义具体对象', color: '#00d4aa' },
    { name: '抽象装饰', nameEn: 'Decorator', responsibility: '持有构件引用，实现构件接口', color: '#ff6b35' },
    { name: '具体装饰', nameEn: 'ConcreteDecorator', responsibility: '给构件添加职责', color: '#ffd93d' },
  ],
  umlCode: `classDiagram
    class ICoffee {
      <<interface>>
      +GetDescription() string
      +GetCost() decimal
    }
    class SimpleCoffee {
      +GetDescription() string
      +GetCost() decimal
    }
    class CoffeeDecorator {
      #coffee ICoffee
      +GetDescription()* string
      +GetCost()* decimal
    }
    class MilkDecorator {
      +GetDescription() string
      +GetCost() decimal
    }
    class SugarDecorator {
      +GetDescription() string
      +GetCost() decimal
    }
    ICoffee <|.. SimpleCoffee
    ICoffee <|.. CoffeeDecorator
    CoffeeDecorator <|-- MilkDecorator
    CoffeeDecorator <|-- SugarDecorator
    CoffeeDecorator --> ICoffee`,
  animationSteps: [
    {
      description: '创建基础对象',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'coffee', type: 'rect', x: 300, y: 80, width: 120, height: 50, label: 'SimpleCoffee', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'client', to: 'coffee', label: '¥10', color: '#6c8cff' },
      ],
    },
    {
      description: '用牛奶装饰器包装',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'milk', type: 'rect', x: 250, y: 80, width: 120, height: 50, label: 'MilkDecorator', color: '#ffd93d', opacity: 1 },
        { id: 'coffee', type: 'rect', x: 450, y: 80, width: 120, height: 50, label: 'SimpleCoffee', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'client', to: 'milk', label: '¥13', color: '#6c8cff', animated: true },
        { from: 'milk', to: 'coffee', label: '包装', color: '#ffd93d' },
      ],
    },
    {
      description: '继续用糖装饰器包装',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'sugar', type: 'rect', x: 180, y: 80, width: 110, height: 50, label: 'SugarDecorator', color: '#ff6b35', opacity: 1 },
        { id: 'milk', type: 'rect', x: 340, y: 80, width: 120, height: 50, label: 'MilkDecorator', color: '#ffd93d', opacity: 1 },
        { id: 'coffee', type: 'rect', x: 510, y: 80, width: 120, height: 50, label: 'SimpleCoffee', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'client', to: 'sugar', label: '¥14', color: '#6c8cff', animated: true },
        { from: 'sugar', to: 'milk', label: '包装', color: '#ff6b35' },
        { from: 'milk', to: 'coffee', label: '包装', color: '#ffd93d' },
      ],
    },
  ],
  scenarios: [
    { title: '咖啡订单系统', description: '动态添加配料，计算价格', icon: 'Coffee' },
    { title: '通知系统', description: '多渠道通知灵活组合', icon: 'Bell' },
    { title: '数据流处理', description: '流式处理中添加过滤、转换等操作', icon: 'Filter' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public interface ICoffee
{
    string GetDescription();
    decimal GetCost();
}

public class SimpleCoffee : ICoffee
{
    public string GetDescription() => "简单咖啡";
    public decimal GetCost() => 10.0m;
}

public abstract class CoffeeDecorator : ICoffee
{
    protected ICoffee _coffee;
    protected CoffeeDecorator(ICoffee coffee) { _coffee = coffee; }
    public abstract string GetDescription();
    public abstract decimal GetCost();
}

public class MilkDecorator : CoffeeDecorator
{
    public MilkDecorator(ICoffee coffee) : base(coffee) { }
    public override string GetDescription() => $"{_coffee.GetDescription()} + 牛奶";
    public override decimal GetCost() => _coffee.GetCost() + 3.0m;
}

public class SugarDecorator : CoffeeDecorator
{
    public SugarDecorator(ICoffee coffee) : base(coffee) { }
    public override string GetDescription() => $"{_coffee.GetDescription()} + 糖";
    public override decimal GetCost() => _coffee.GetCost() + 1.0m;
}`,
      highlights: [1, 12, 13, 14, 18, 19, 20, 24, 25],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `interface Coffee {
  getDescription(): string
  getCost(): number
}

class SimpleCoffee implements Coffee {
  getDescription(): string { return '简单咖啡' }
  getCost(): number { return 10 }
}

abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee
  constructor(coffee: Coffee) { this.coffee = coffee }
  abstract getDescription(): string
  abstract getCost(): number
}

class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) { super(coffee) }
  getDescription(): string { return \`\${this.coffee.getDescription()} + 牛奶\` }
  getCost(): number { return this.coffee.getCost() + 3 }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) { super(coffee) }
  getDescription(): string { return \`\${this.coffee.getDescription()} + 糖\` }
  getCost(): number { return this.coffee.getCost() + 1 }
}

// 链式装饰
let coffee: Coffee = new SimpleCoffee()
coffee = new MilkDecorator(coffee)
coffee = new SugarDecorator(coffee)
console.log(coffee.getDescription()) // 简单咖啡 + 牛奶 + 糖
console.log(coffee.getCost()) // 14`,
      highlights: [1, 10, 11, 12, 16, 17, 18, 22, 23],
    },
  ],
  pros: ['动态地给对象添加额外职责', '比继承更灵活，避免类爆炸', '符合开闭原则', '可以组合多个装饰器'],
  cons: ['装饰链过长时调试困难', '装饰顺序可能影响结果', '增加系统复杂度'],
  relatedPatterns: [
    { patternId: 'adapter', relationType: 'alternative', description: '适配器转换接口，装饰器增强功能但保持接口不变' },
    { patternId: 'composite', relationType: 'complementary', description: '装饰器可视为只有一个子组件的组合' },
    { patternId: 'strategy', relationType: 'alternative', description: '策略通过替换改变行为，装饰器通过包装扩展行为' },
  ],
  frameworkExamples: [
    { framework: 'React', description: '高阶组件(HOC)是装饰模式的典型应用，如 withRouter()、connect()' },
    { framework: 'Express', description: '中间件机制就是装饰模式，层层包装请求处理函数' },
  ],
}

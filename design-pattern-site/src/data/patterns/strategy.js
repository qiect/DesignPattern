export const strategy = {
    id: 'strategy',
    name: '策略模式',
    nameEn: 'Strategy Pattern',
    category: 'behavioral',
    difficulty: 1,
    tags: ['行为型', '算法切换', '消除条件'],
    definition: '定义一系列算法，把它们封装起来，并使它们可以互相替换。策略模式让算法独立于使用它的客户端而变化。',
    simpleExplanation: '把不同的算法封装成独立的策略类，运行时可以自由切换，避免一堆if-else。',
    lifeAnalogy: '就像出行策略，你可以选择开车、坐地铁、骑车，根据不同情况选择不同策略。',
    roles: [
        { name: '抽象策略', nameEn: 'Strategy', responsibility: '定义算法的公共接口', color: '#6c8cff' },
        { name: '具体策略', nameEn: 'ConcreteStrategy', responsibility: '实现具体的算法', color: '#00d4aa' },
        { name: '上下文', nameEn: 'Context', responsibility: '持有策略引用，调用策略执行算法', color: '#ff6b35' },
    ],
    umlCode: `classDiagram
    class IDiscountStrategy {
      <<interface>>
      +CalculateDiscount() decimal
      +GetStrategyName() string
    }
    class NormalDiscountStrategy {
      +CalculateDiscount() decimal
      +GetStrategyName() string
    }
    class GoldDiscountStrategy {
      +CalculateDiscount() decimal
      +GetStrategyName() string
    }
    class PriceCalculator {
      -strategy IDiscountStrategy
      +SetStrategy() void
      +CalculateFinalPrice() decimal
    }
    IDiscountStrategy <|.. NormalDiscountStrategy
    IDiscountStrategy <|.. GoldDiscountStrategy
    PriceCalculator --> IDiscountStrategy`,
    animationSteps: [
        {
            description: '上下文持有当前策略',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'context', type: 'rect', x: 250, y: 80, width: 140, height: 50, label: 'PriceCalculator', color: '#ff6b35', opacity: 1 },
                { id: 'strategy', type: 'rect', x: 480, y: 80, width: 120, height: 50, label: 'NormalStrategy', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'context', to: 'strategy', label: '持有', color: '#ff6b35' },
            ],
        },
        {
            description: '调用策略执行算法',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'context', type: 'rect', x: 250, y: 80, width: 140, height: 50, label: 'PriceCalculator', color: '#ff6b35', opacity: 1 },
                { id: 'strategy', type: 'rect', x: 480, y: 80, width: 120, height: 50, label: 'NormalStrategy', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'client', to: 'context', label: 'Calculate()', color: '#6c8cff', animated: true },
                { from: 'context', to: 'strategy', label: 'CalculateDiscount()', color: '#ff6b35', animated: true },
            ],
        },
        {
            description: '运行时切换策略',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'context', type: 'rect', x: 250, y: 80, width: 140, height: 50, label: 'PriceCalculator', color: '#ff6b35', opacity: 1 },
                { id: 'strategy', type: 'rect', x: 480, y: 80, width: 120, height: 50, label: 'GoldStrategy', color: '#ffd93d', opacity: 1 },
            ],
            arrows: [
                { from: 'client', to: 'context', label: 'SetStrategy()', color: '#6c8cff', animated: true },
                { from: 'context', to: 'strategy', label: '切换策略', color: '#ff6b35', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '电商折扣', description: '不同会员等级享受不同折扣策略', icon: 'Percent' },
        { title: '排序算法', description: '根据数据特征选择不同排序策略', icon: 'ArrowUpDown' },
        { title: '出行导航', description: '根据路况选择不同路线策略', icon: 'Navigation' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface IDiscountStrategy
{
    decimal CalculateDiscount(decimal originalPrice);
    string GetStrategyName();
}

public class NormalDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice) => originalPrice * 0.95m;
    public string GetStrategyName() => "普通会员折扣(95折)";
}

public class GoldDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice) => originalPrice * 0.85m;
    public string GetStrategyName() => "金牌会员折扣(85折)";
}

public class PlatinumDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice) => originalPrice * 0.80m;
    public string GetStrategyName() => "白金会员折扣(8折)";
}

public class PriceCalculator
{
    private IDiscountStrategy _discountStrategy;

    public PriceCalculator(IDiscountStrategy strategy) { _discountStrategy = strategy; }

    public void SetStrategy(IDiscountStrategy strategy) => _discountStrategy = strategy;

    public decimal CalculateFinalPrice(decimal originalPrice)
    {
        Console.WriteLine($"使用策略: {_discountStrategy.GetStrategyName()}");
        return _discountStrategy.CalculateDiscount(originalPrice);
    }
}`,
            highlights: [1, 8, 9, 14, 15, 22, 23, 28, 30],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface DiscountStrategy {
  calculateDiscount(originalPrice: number): number
  getStrategyName(): string
}

class NormalDiscountStrategy implements DiscountStrategy {
  calculateDiscount(originalPrice: number): number { return originalPrice * 0.95 }
  getStrategyName(): string { return '普通会员折扣(95折)' }
}

class GoldDiscountStrategy implements DiscountStrategy {
  calculateDiscount(originalPrice: number): number { return originalPrice * 0.85 }
  getStrategyName(): string { return '金牌会员折扣(85折)' }
}

class PriceCalculator {
  private strategy: DiscountStrategy

  constructor(strategy: DiscountStrategy) { this.strategy = strategy }

  setStrategy(strategy: DiscountStrategy): void { this.strategy = strategy }

  calculateFinalPrice(originalPrice: number): number {
    console.log('使用策略: ' + this.strategy.getStrategyName())
    return this.strategy.calculateDiscount(originalPrice)
  }
}

// 运行时切换策略
const calculator = new PriceCalculator(new NormalDiscountStrategy())
calculator.calculateFinalPrice(1000) // 950
calculator.setStrategy(new GoldDiscountStrategy())
calculator.calculateFinalPrice(1000) // 850`,
            highlights: [1, 8, 9, 14, 15, 19, 20, 22, 23],
        },
    ],
    pros: ['算法可以自由切换', '避免使用多重条件判断', '扩展性良好，符合开闭原则', '易于维护和测试'],
    cons: ['客户端必须了解所有策略的区别', '策略对象数量增加', '策略与上下文通信开销'],
    relatedPatterns: [
        { patternId: 'state', relationType: 'complementary', description: '状态模式的结构与策略模式类似，但意图不同' },
        { patternId: 'factory-method', relationType: 'combinable', description: '工厂方法可用于创建策略对象' },
        { patternId: 'template-method', relationType: 'alternative', description: '模板方法用继承扩展算法，策略用组合替换算法' },
    ],
    frameworkExamples: [
        { framework: 'Vue 3', description: 'Vue 的渲染器支持不同平台的渲染策略(浏览器/原生)' },
        { framework: 'Express', description: 'Express 的中间件选择策略，根据路由匹配不同处理函数' },
    ],
};

import type { Pattern } from '@/types/pattern'

export const adapter: Pattern = {
  id: 'adapter',
  name: '适配器模式',
  nameEn: 'Adapter Pattern',
  category: 'structural',
  difficulty: 1,
  tags: ['结构型', '接口转换', '兼容性'],
  definition: '将一个类的接口转换成客户希望的另一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。',
  simpleExplanation: '就像转换插头，把不兼容的接口转换成你需要的接口，让原本不能一起工作的类可以协作。',
  lifeAnalogy: '就像出国旅行时的电源转换器，把外国的插座接口转换成你能用的接口。',
  roles: [
    { name: '目标接口', nameEn: 'Target', responsibility: '客户端期望的接口', color: '#6c8cff' },
    { name: '被适配者', nameEn: 'Adaptee', responsibility: '需要被适配的现有接口', color: '#00d4aa' },
    { name: '适配器', nameEn: 'Adapter', responsibility: '将被适配者接口转换为目标接口', color: '#ff6b35' },
  ],
  umlCode: `classDiagram
    class ITarget {
      <<interface>>
      +Request() void
    }
    class Adaptee {
      +SpecificRequest() void
    }
    class ObjectAdapter {
      -adaptee Adaptee
      +Request() void
    }
    ITarget <|.. ObjectAdapter
    ObjectAdapter --> Adaptee : wraps`,
  animationSteps: [
    {
      description: '客户端只能识别目标接口',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'target', type: 'rect', x: 280, y: 80, width: 120, height: 50, label: 'ITarget', color: '#6c8cff', opacity: 1 },
        { id: 'adaptee', type: 'rect', x: 500, y: 80, width: 120, height: 50, label: 'Adaptee', color: '#00d4aa', opacity: 0.3 },
      ],
      arrows: [
        { from: 'client', to: 'target', label: 'Request()', color: '#6c8cff' },
      ],
    },
    {
      description: '适配器包装被适配者',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'adapter', type: 'rect', x: 280, y: 80, width: 120, height: 50, label: 'Adapter', color: '#ff6b35', opacity: 1 },
        { id: 'adaptee', type: 'rect', x: 500, y: 80, width: 120, height: 50, label: 'Adaptee', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'client', to: 'adapter', label: 'Request()', color: '#6c8cff', animated: true },
        { from: 'adapter', to: 'adaptee', label: 'SpecificRequest()', color: '#ff6b35', animated: true },
      ],
    },
    {
      description: '接口转换完成，客户端无感知',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'adapter', type: 'rect', x: 280, y: 80, width: 120, height: 50, label: 'Adapter', color: '#ff6b35', opacity: 1 },
        { id: 'adaptee', type: 'rect', x: 500, y: 80, width: 120, height: 50, label: 'Adaptee', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'client', to: 'adapter', label: 'Request()', color: '#6c8cff' },
        { from: 'adapter', to: 'adaptee', label: '转换调用', color: '#ff6b35', dashed: true },
      ],
    },
  ],
  scenarios: [
    { title: '支付系统集成', description: '新系统适配旧支付接口', icon: 'CreditCard' },
    { title: '媒体播放器', description: '统一不同格式的播放接口', icon: 'Play' },
    { title: '第三方SDK适配', description: '将第三方接口适配为内部接口', icon: 'Puzzle' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public interface INewPaymentSystem
{
    void ProcessPayment(decimal amount);
    void Refund(decimal amount);
}

public class LegacyPaymentSystem
{
    public void MakePayment(double amount) =>
        Console.WriteLine($"旧支付系统: 处理支付 ¥{amount:F2}");

    public void CancelPayment(double amount) =>
        Console.WriteLine($"旧支付系统: 取消支付 ¥{amount:F2}");
}

public class PaymentAdapter : INewPaymentSystem
{
    private readonly LegacyPaymentSystem _legacySystem;

    public PaymentAdapter(LegacyPaymentSystem legacySystem)
    {
        _legacySystem = legacySystem;
    }

    public void ProcessPayment(decimal amount)
    {
        _legacySystem.MakePayment((double)amount);
    }

    public void Refund(decimal amount)
    {
        _legacySystem.CancelPayment((double)amount);
    }
}`,
      highlights: [1, 8, 16, 24, 29],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `interface NewPaymentSystem {
  processPayment(amount: number): void
  refund(amount: number): void
}

class LegacyPaymentSystem {
  makePayment(amount: number): void {
    console.log('旧支付系统: 处理支付 ¥' + amount.toFixed(2))
  }

  cancelPayment(amount: number): void {
    console.log('旧支付系统: 取消支付 ¥' + amount.toFixed(2))
  }
}

class PaymentAdapter implements NewPaymentSystem {
  private legacySystem: LegacyPaymentSystem

  constructor(legacySystem: LegacyPaymentSystem) {
    this.legacySystem = legacySystem
  }

  processPayment(amount: number): void {
    this.legacySystem.makePayment(amount)
  }

  refund(amount: number): void {
    this.legacySystem.cancelPayment(amount)
  }
}`,
      highlights: [1, 8, 16, 24, 28],
    },
  ],
  pros: ['让不兼容的接口能够协同工作', '提高类的复用性', '符合开闭原则', '灵活性好，可以使用对象适配器替代继承'],
  cons: ['增加系统复杂度', '过多使用会使系统凌乱', '可能引入性能开销'],
  relatedPatterns: [
    { patternId: 'bridge', relationType: 'alternative', description: '桥接是预先设计接口分离，适配器是事后补救接口不兼容' },
    { patternId: 'decorator', relationType: 'alternative', description: '装饰器增强功能不改变接口，适配器转换接口' },
    { patternId: 'facade', relationType: 'alternative', description: '外观简化接口，适配器转换接口' },
  ],
  frameworkExamples: [
    { framework: 'Vue 3', description: 'Vue Adapter 模式用于将模板编译器适配不同构建工具' },
    { framework: 'Express', description: '中间件本质上是适配器，将不同格式的请求适配为统一接口' },
  ],
}

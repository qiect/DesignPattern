export const chainOfResponsibility = {
    id: 'chain-of-responsibility',
    name: '责任链模式',
    nameEn: 'Chain of Responsibility Pattern',
    category: 'behavioral',
    difficulty: 2,
    tags: ['行为型', '请求传递', '解耦'],
    definition: '使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递请求，直到有一个对象处理它为止。',
    simpleExplanation: '把多个处理器串成一条链，请求沿着链传递，直到某个处理器能处理为止。',
    lifeAnalogy: '就像公司审批流程，请假申请先给组长，组长批不了给经理，经理批不了给总监。',
    roles: [
        { name: '抽象处理者', nameEn: 'Handler', responsibility: '定义处理接口和后继者设置', color: '#6c8cff' },
        { name: '具体处理者', nameEn: 'ConcreteHandler', responsibility: '处理它负责的请求，可访问后继者', color: '#00d4aa' },
    ],
    umlCode: `classDiagram
    class Handler {
      <<abstract>>
      #nextHandler Handler
      +SetNext() Handler
      +Handle()* bool
    }
    class Manager {
      +Handle() bool
    }
    class Director {
      +Handle() bool
    }
    class CEO {
      +Handle() bool
    }
    Handler <|-- Manager
    Handler <|-- Director
    Handler <|-- CEO
    Handler --> Handler : next`,
    animationSteps: [
        {
            description: '构建责任链',
            objects: [
                { id: 'h1', type: 'rect', x: 80, y: 80, width: 100, height: 50, label: 'Manager', color: '#6c8cff', opacity: 1 },
                { id: 'h2', type: 'rect', x: 260, y: 80, width: 100, height: 50, label: 'Director', color: '#00d4aa', opacity: 1 },
                { id: 'h3', type: 'rect', x: 440, y: 80, width: 100, height: 50, label: 'CEO', color: '#ff6b35', opacity: 1 },
            ],
            arrows: [
                { from: 'h1', to: 'h2', label: 'SetNext', color: '#6c8cff' },
                { from: 'h2', to: 'h3', label: 'SetNext', color: '#00d4aa' },
            ],
        },
        {
            description: '请求沿链传递，Manager无法处理',
            objects: [
                { id: 'req', type: 'circle', x: 30, y: 80, width: 40, height: 40, label: '请求', color: '#ffd93d', opacity: 1 },
                { id: 'h1', type: 'rect', x: 120, y: 80, width: 100, height: 50, label: 'Manager', color: '#6c8cff', opacity: 1 },
                { id: 'h2', type: 'rect', x: 300, y: 80, width: 100, height: 50, label: 'Director', color: '#00d4aa', opacity: 0.5 },
                { id: 'h3', type: 'rect', x: 480, y: 80, width: 100, height: 50, label: 'CEO', color: '#ff6b35', opacity: 0.3 },
            ],
            arrows: [
                { from: 'req', to: 'h1', label: '', color: '#ffd93d', animated: true },
                { from: 'h1', to: 'h2', label: '无法处理', color: '#6c8cff', animated: true },
            ],
        },
        {
            description: 'Director处理请求',
            objects: [
                { id: 'h1', type: 'rect', x: 120, y: 80, width: 100, height: 50, label: 'Manager', color: '#6c8cff', opacity: 0.3 },
                { id: 'h2', type: 'rect', x: 300, y: 80, width: 100, height: 50, label: 'Director', color: '#00d4aa', opacity: 1 },
                { id: 'h3', type: 'rect', x: 480, y: 80, width: 100, height: 50, label: 'CEO', color: '#ff6b35', opacity: 0.3 },
            ],
            arrows: [
                { from: 'h2', to: 'h2', label: '处理✓', color: '#00d4aa', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '采购审批流程', description: '不同金额由不同级别审批', icon: 'CheckCircle' },
        { title: 'HTTP中间件', description: '请求经过认证、授权、日志等处理', icon: 'Shield' },
        { title: '异常处理', description: '不同类型的异常由不同处理器处理', icon: 'AlertTriangle' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public abstract class Approver
{
    protected Approver? _nextApprover;
    protected readonly string _name;

    public Approver(string name) { _name = name; }
    public Approver SetNext(Approver approver)
    { _nextApprover = approver; return approver; }
    public abstract void ProcessRequest(PurchaseRequest request);
}

public class Manager : Approver
{
    public Manager(string name) : base(name) { }
    public override void ProcessRequest(PurchaseRequest request)
    {
        if (request.Amount <= 10000)
            Console.WriteLine($"经理[{_name}] 批准: ¥{request.Amount}");
        else
            _nextApprover?.ProcessRequest(request);
    }
}

public class Director : Approver
{
    public Director(string name) : base(name) { }
    public override void ProcessRequest(PurchaseRequest request)
    {
        if (request.Amount <= 50000)
            Console.WriteLine($"总监[{_name}] 批准: ¥{request.Amount}");
        else
            _nextApprover?.ProcessRequest(request);
    }
}

public class CEO : Approver
{
    public CEO(string name) : base(name) { }
    public override void ProcessRequest(PurchaseRequest request) =>
        Console.WriteLine($"CEO[{_name}] 批准: ¥{request.Amount}");
}`,
            highlights: [1, 7, 8, 12, 13, 14, 16, 17, 20, 21, 22, 24, 25],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `abstract class Approver {
  protected nextApprover: Approver | null = null
  constructor(protected name: string) {}

  setNext(approver: Approver): Approver {
    this.nextApprover = approver
    return approver
  }

  abstract processRequest(request: PurchaseRequest): void
}

class Manager extends Approver {
  processRequest(request: PurchaseRequest): void {
    if (request.amount <= 10000) {
      console.log('经理[' + this.name + '] 批准: ¥' + request.amount)
    } else {
      this.nextApprover?.processRequest(request)
    }
  }
}

class Director extends Approver {
  processRequest(request: PurchaseRequest): void {
    if (request.amount <= 50000) {
      console.log('总监[' + this.name + '] 批准: ¥' + request.amount)
    } else {
      this.nextApprover?.processRequest(request)
    }
  }
}

class CEO extends Approver {
  processRequest(request: PurchaseRequest): void {
    console.log('CEO[' + this.name + '] 批准: ¥' + request.amount)
  }
}

// 构建责任链
const manager = new Manager('张经理')
const director = new Director('李总监')
const ceo = new CEO('王CEO')
manager.setNext(director).setNext(ceo)`,
            highlights: [1, 7, 8, 12, 13, 14, 16, 20, 21, 22, 24, 38],
        },
    ],
    pros: ['解耦请求发送者和接收者', '简化对象间的连接', '动态调整处理链', '符合单一职责原则'],
    cons: ['不能保证请求一定被处理', '链过长时调试困难', '可能影响性能'],
    relatedPatterns: [
        { patternId: 'composite', relationType: 'combinable', description: '组合模式的父节点可将请求传递给子节点' },
        { patternId: 'command', relationType: 'combinable', description: '命令对象可沿责任链传递' },
        { patternId: 'mediator', relationType: 'alternative', description: '中介者集中处理，责任链分散处理' },
    ],
    frameworkExamples: [
        { framework: 'Express', description: 'Express 中间件管道就是责任链模式，请求沿中间件链传递' },
        { framework: 'Vue 3', description: 'Vue Router 的导航守卫(beforeEach/afterEach)是责任链模式' },
    ],
};

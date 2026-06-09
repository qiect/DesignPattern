export const state = {
    id: 'state',
    name: '状态模式',
    nameEn: 'State Pattern',
    category: 'behavioral',
    difficulty: 2,
    tags: ['行为型', '状态转换', '消除条件'],
    definition: '允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。',
    simpleExplanation: '把不同状态的行为封装到不同的状态类中，对象在不同状态下表现不同，避免大量if-else。',
    lifeAnalogy: '就像自动售货机，投币状态、选择商品状态、出货状态各有不同的行为，状态切换行为也跟着变。',
    roles: [
        { name: '抽象状态', nameEn: 'State', responsibility: '定义与上下文状态相关的行为接口', color: '#6c8cff' },
        { name: '具体状态', nameEn: 'ConcreteState', responsibility: '实现与上下文一个状态相关的行为', color: '#00d4aa' },
        { name: '上下文', nameEn: 'Context', responsibility: '维护一个具体状态实例，定义当前状态', color: '#ff6b35' },
    ],
    umlCode: `classDiagram
    class IOrderState {
      <<interface>>
      +Pay() void
      +Ship() void
      +Deliver() void
      +Cancel() void
    }
    class NewOrderState {
      +Pay() void
      +Ship() void
      +Cancel() void
    }
    class PaidOrderState {
      +Pay() void
      +Ship() void
      +Cancel() void
    }
    class OrderContext {
      -state IOrderState
      +SetState() void
      +Pay() void
      +Ship() void
    }
    IOrderState <|.. NewOrderState
    IOrderState <|.. PaidOrderState
    OrderContext --> IOrderState`,
    animationSteps: [
        {
            description: '订单初始为"新建"状态',
            objects: [
                { id: 'context', type: 'rect', x: 250, y: 50, width: 120, height: 50, label: 'OrderContext', color: '#ff6b35', opacity: 1 },
                { id: 'state', type: 'rect', x: 250, y: 150, width: 120, height: 40, label: '新建状态', color: '#6c8cff', opacity: 1 },
            ],
            arrows: [
                { from: 'context', to: 'state', label: '当前状态', color: '#ff6b35' },
            ],
        },
        {
            description: '支付后切换到"已支付"状态',
            objects: [
                { id: 'context', type: 'rect', x: 250, y: 50, width: 120, height: 50, label: 'OrderContext', color: '#ff6b35', opacity: 1 },
                { id: 'old', type: 'rect', x: 100, y: 150, width: 120, height: 40, label: '新建状态', color: '#6c8cff', opacity: 0.3 },
                { id: 'state', type: 'rect', x: 350, y: 150, width: 120, height: 40, label: '已支付状态', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'context', to: 'state', label: 'Pay()→切换', color: '#ff6b35', animated: true },
            ],
        },
        {
            description: '发货后切换到"已发货"状态',
            objects: [
                { id: 'context', type: 'rect', x: 250, y: 50, width: 120, height: 50, label: 'OrderContext', color: '#ff6b35', opacity: 1 },
                { id: 'old', type: 'rect', x: 100, y: 150, width: 120, height: 40, label: '已支付状态', color: '#00d4aa', opacity: 0.3 },
                { id: 'state', type: 'rect', x: 350, y: 150, width: 120, height: 40, label: '已发货状态', color: '#ffd93d', opacity: 1 },
            ],
            arrows: [
                { from: 'context', to: 'state', label: 'Ship()→切换', color: '#ff6b35', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '订单状态管理', description: '订单从新建到完成的复杂状态流转', icon: 'Package' },
        { title: '交通信号灯', description: '红绿灯的状态循环切换', icon: 'CircleDot' },
        { title: '游戏角色状态', description: '角色在不同状态下行为不同', icon: 'Gamepad2' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface IOrderState
{
    void Pay(OrderContext order);
    void Ship(OrderContext order);
    void Deliver(OrderContext order);
    void Cancel(OrderContext order);
    string GetStateName();
}

public class OrderContext
{
    private IOrderState _state;
    public OrderContext(IOrderState initialState) { _state = initialState; }
    public void SetState(IOrderState state) { _state = state; }
    public void Pay() => _state.Pay(this);
    public void Ship() => _state.Ship(this);
    public void Deliver() => _state.Deliver(this);
    public void Cancel() => _state.Cancel(this);
    public string GetState() => _state.GetStateName();
}

public class NewOrderState : IOrderState
{
    public void Pay(OrderContext order)
    { Console.WriteLine("订单已支付"); order.SetState(new PaidOrderState()); }
    public void Ship(OrderContext order) =>
        Console.WriteLine("无法发货: 订单尚未支付");
    public void Deliver(OrderContext order) =>
        Console.WriteLine("无法确认收货: 订单尚未支付");
    public void Cancel(OrderContext order)
    { Console.WriteLine("订单已取消"); order.SetState(new CancelledOrderState()); }
    public string GetStateName() => "新建订单";
}`,
            highlights: [1, 12, 13, 14, 15, 16, 19, 20, 23, 24, 27, 28],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface OrderState {
  pay(order: OrderContext): void
  ship(order: OrderContext): void
  deliver(order: OrderContext): void
  cancel(order: OrderContext): void
  getStateName(): string
}

class OrderContext {
  private state: OrderState

  constructor(initialState: OrderState) { this.state = initialState }

  setState(state: OrderState): void { this.state = state }
  pay(): void { this.state.pay(this) }
  ship(): void { this.state.ship(this) }
  deliver(): void { this.state.deliver(this) }
  cancel(): void { this.state.cancel(this) }
  getState(): string { return this.state.getStateName() }
}

class NewOrderState implements OrderState {
  pay(order: OrderContext): void {
    console.log('订单已支付')
    order.setState(new PaidOrderState())
  }
  ship(order: OrderContext): void {
    console.log('无法发货: 订单尚未支付')
  }
  cancel(order: OrderContext): void {
    console.log('订单已取消')
    order.setState(new CancelledOrderState())
  }
  deliver(order: OrderContext): void {
    console.log('无法确认收货: 订单尚未支付')
  }
  getStateName(): string { return '新建订单' }
}`,
            highlights: [1, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23],
        },
    ],
    pros: ['将状态转换逻辑封装在状态类中', '消除大量的条件判断语句', '符合开闭原则，易于添加新状态', '状态转换逻辑清晰'],
    cons: ['增加了类的数量', '状态较多时系统变得复杂', '状态切换逻辑分散在各个状态类中'],
    relatedPatterns: [
        { patternId: 'strategy', relationType: 'complementary', description: '策略和状态结构相似，但策略是客户端切换，状态是自动切换' },
        { patternId: 'observer', relationType: 'combinable', description: '状态变化时可通知观察者' },
        { patternId: 'singleton', relationType: 'combinable', description: '状态类通常不需要保存数据，可设计为单例' },
    ],
    frameworkExamples: [
        { framework: 'Vue 3', description: 'Vue Router 的导航状态管理类似状态模式，不同路由状态渲染不同组件' },
        { framework: 'XState', description: 'XState 是 JavaScript 状态机库，是状态模式的完整实现' },
    ],
};

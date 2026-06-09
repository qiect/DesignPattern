export const observer = {
    id: 'observer',
    name: '观察者模式',
    nameEn: 'Observer Pattern',
    category: 'behavioral',
    difficulty: 1,
    tags: ['行为型', '发布-订阅', '一对多'],
    definition: '定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。',
    simpleExplanation: '一个对象状态变化时，自动通知所有关注它的对象，就像订阅公众号一样，有新文章就推送给你。',
    lifeAnalogy: '就像YouTube订阅，你关注了某个频道，他发新视频你就会收到通知。',
    roles: [
        { name: '抽象主题', nameEn: 'Subject', responsibility: '把所有观察者保存在集合中，提供添加和删除接口', color: '#6c8cff' },
        { name: '具体主题', nameEn: 'ConcreteSubject', responsibility: '状态改变时通知所有观察者', color: '#ff6b35' },
        { name: '抽象观察者', nameEn: 'Observer', responsibility: '定义更新接口', color: '#00d4aa' },
        { name: '具体观察者', nameEn: 'ConcreteObserver', responsibility: '实现更新接口，响应主题通知', color: '#ffd93d' },
    ],
    umlCode: `classDiagram
    class ISubject {
      <<interface>>
      +Attach() void
      +Detach() void
      +Notify() void
    }
    class IObserver {
      <<interface>>
      +Update() void
    }
    class NewsAgency {
      -observers List
      +Attach() void
      +Detach() void
      +Notify() void
    }
    class NewsChannel {
      +Update() void
    }
    class MobileApp {
      +Update() void
    }
    ISubject <|.. NewsAgency
    IObserver <|.. NewsChannel
    IObserver <|.. MobileApp
    NewsAgency o-- IObserver`,
    animationSteps: [
        {
            description: '观察者订阅主题',
            objects: [
                { id: 'subject', type: 'rect', x: 250, y: 50, width: 120, height: 50, label: 'Subject', color: '#ff6b35', opacity: 1 },
                { id: 'obs1', type: 'circle', x: 120, y: 180, width: 60, height: 60, label: '观察者1', color: '#00d4aa', opacity: 1 },
                { id: 'obs2', type: 'circle', x: 280, y: 180, width: 60, height: 60, label: '观察者2', color: '#ffd93d', opacity: 1 },
                { id: 'obs3', type: 'circle', x: 440, y: 180, width: 60, height: 60, label: '观察者3', color: '#6c8cff', opacity: 1 },
            ],
            arrows: [
                { from: 'obs1', to: 'subject', label: 'Attach', color: '#00d4aa' },
                { from: 'obs2', to: 'subject', label: 'Attach', color: '#ffd93d' },
                { from: 'obs3', to: 'subject', label: 'Attach', color: '#6c8cff' },
            ],
        },
        {
            description: '主题状态变化，通知所有观察者',
            objects: [
                { id: 'subject', type: 'rect', x: 250, y: 50, width: 120, height: 50, label: 'Subject', color: '#ff6b35', opacity: 1 },
                { id: 'obs1', type: 'circle', x: 120, y: 180, width: 60, height: 60, label: '观察者1', color: '#00d4aa', opacity: 1 },
                { id: 'obs2', type: 'circle', x: 280, y: 180, width: 60, height: 60, label: '观察者2', color: '#ffd93d', opacity: 1 },
                { id: 'obs3', type: 'circle', x: 440, y: 180, width: 60, height: 60, label: '观察者3', color: '#6c8cff', opacity: 1 },
            ],
            arrows: [
                { from: 'subject', to: 'obs1', label: 'Notify', color: '#ff6b35', animated: true },
                { from: 'subject', to: 'obs2', label: 'Notify', color: '#ff6b35', animated: true },
                { from: 'subject', to: 'obs3', label: 'Notify', color: '#ff6b35', animated: true },
            ],
        },
        {
            description: '观察者各自响应更新',
            objects: [
                { id: 'subject', type: 'rect', x: 250, y: 50, width: 120, height: 50, label: 'Subject', color: '#ff6b35', opacity: 1 },
                { id: 'obs1', type: 'circle', x: 120, y: 180, width: 60, height: 60, label: '更新✓', color: '#00d4aa', opacity: 1 },
                { id: 'obs2', type: 'circle', x: 280, y: 180, width: 60, height: 60, label: '更新✓', color: '#ffd93d', opacity: 1 },
                { id: 'obs3', type: 'circle', x: 440, y: 180, width: 60, height: 60, label: '更新✓', color: '#6c8cff', opacity: 1 },
            ],
            arrows: [],
        },
    ],
    scenarios: [
        { title: '新闻发布系统', description: '新闻社发布新闻，多个频道同步更新', icon: 'Newspaper' },
        { title: '股票价格监控', description: '价格变动自动通知投资者', icon: 'TrendingUp' },
        { title: '事件处理系统', description: '按钮点击触发多个事件处理器', icon: 'MousePointerClick' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface IObserver { void Update(string message); }

public interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify(string message);
}

public class NewsAgency : ISubject
{
    private readonly List<IObserver> _observers = new();

    public void Attach(IObserver observer)
    { _observers.Add(observer); }

    public void Detach(IObserver observer)
    { _observers.Remove(observer); }

    public void Notify(string message)
    {
        Console.WriteLine($"\\n新闻社发布: {message}");
        foreach (var observer in _observers)
            observer.Update(message);
    }
}

public class NewsChannel : IObserver
{
    private readonly string _name;
    public NewsChannel(string name) { _name = name; }
    public void Update(string message) =>
        Console.WriteLine($"[{_name}] 收到新闻: {message}");
}`,
            highlights: [1, 3, 13, 14, 15, 17, 18, 19, 24, 25],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface Observer {
  update(message: string): void
}

interface Subject {
  attach(observer: Observer): void
  detach(observer: Observer): void
  notify(message: string): void
}

class NewsAgency implements Subject {
  private observers: Observer[] = []

  attach(observer: Observer): void { this.observers.push(observer) }
  detach(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer)
  }
  notify(message: string): void {
    console.log('新闻社发布: ' + message)
    this.observers.forEach(o => o.update(message))
  }
}

class NewsChannel implements Observer {
  constructor(private name: string) {}
  update(message: string): void {
    console.log('[' + this.name + '] 收到新闻: ' + message)
  }
}

// 使用
const agency = new NewsAgency()
agency.attach(new NewsChannel('央视新闻'))
agency.attach(new NewsChannel('新华社'))
agency.notify('重大新闻发布')`,
            highlights: [1, 6, 12, 13, 14, 16, 17, 18, 22, 23],
        },
    ],
    pros: ['对象之间的一对多依赖关系', '主题和观察者之间松耦合', '符合开闭原则', '支持广播通信'],
    cons: ['观察者过多时通知耗时', '循环依赖可能导致无限循环', '观察者不知道更新原因'],
    relatedPatterns: [
        { patternId: 'mediator', relationType: 'alternative', description: '中介者集中协调，观察者分散通知' },
        { patternId: 'strategy', relationType: 'complementary', description: '策略可用来决定通知哪些观察者' },
        { patternId: 'singleton', relationType: 'combinable', description: '主题对象常被设计为单例' },
    ],
    frameworkExamples: [
        { framework: 'Vue 3', description: 'Vue 的响应式系统(reactive/ref)是观察者模式的实现，数据变化自动更新视图' },
        { framework: 'Node.js', description: 'EventEmitter 是观察者模式，on()注册监听器，emit()触发事件' },
    ],
};

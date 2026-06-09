export const mediator = {
    id: 'mediator',
    name: '中介者模式',
    nameEn: 'Mediator Pattern',
    category: 'behavioral',
    difficulty: 2,
    tags: ['行为型', '解耦', '集中控制'],
    definition: '用一个中介对象封装一系列对象的交互，中介者使各对象不需要显式地相互引用，从而使其耦合松散。',
    simpleExplanation: '对象之间不直接通信，而是通过一个中介者来协调，减少对象之间的复杂依赖关系。',
    lifeAnalogy: '就像机场塔台，飞机之间不直接协调，都通过塔台来安排起降，避免混乱。',
    roles: [
        { name: '抽象中介者', nameEn: 'Mediator', responsibility: '定义同事对象到中介者的接口', color: '#6c8cff' },
        { name: '具体中介者', nameEn: 'ConcreteMediator', responsibility: '实现协调各同事对象的交互', color: '#ff6b35' },
        { name: '抽象同事类', nameEn: 'Colleague', responsibility: '定义同事对象的接口', color: '#00d4aa' },
        { name: '具体同事类', nameEn: 'ConcreteColleague', responsibility: '每个同事都知道中介者对象', color: '#ffd93d' },
    ],
    umlCode: `classDiagram
    class IChatMediator {
      <<interface>>
      +SendMessage() void
      +RegisterUser() void
    }
    class User {
      <<abstract>>
      #mediator IChatMediator
      +Send() void
      +Receive()* void
    }
    class ChatUser {
      +Send() void
      +Receive() void
    }
    class ChatRoom {
      -users List
      +SendMessage() void
      +RegisterUser() void
    }
    IChatMediator <|.. ChatRoom
    User <|-- ChatUser
    User --> IChatMediator
    ChatRoom o-- User`,
    animationSteps: [
        {
            description: '没有中介者：对象间直接通信（混乱）',
            objects: [
                { id: 'a', type: 'circle', x: 150, y: 80, width: 60, height: 60, label: 'A', color: '#00d4aa', opacity: 1 },
                { id: 'b', type: 'circle', x: 350, y: 80, width: 60, height: 60, label: 'B', color: '#ffd93d', opacity: 1 },
                { id: 'c', type: 'circle', x: 250, y: 180, width: 60, height: 60, label: 'C', color: '#6c8cff', opacity: 1 },
            ],
            arrows: [
                { from: 'a', to: 'b', label: '', color: '#ff6b35' },
                { from: 'a', to: 'c', label: '', color: '#ff6b35' },
                { from: 'b', to: 'a', label: '', color: '#ff6b35' },
                { from: 'b', to: 'c', label: '', color: '#ff6b35' },
                { from: 'c', to: 'a', label: '', color: '#ff6b35' },
                { from: 'c', to: 'b', label: '', color: '#ff6b35' },
            ],
        },
        {
            description: '引入中介者：所有通信通过中介者',
            objects: [
                { id: 'a', type: 'circle', x: 120, y: 80, width: 60, height: 60, label: 'A', color: '#00d4aa', opacity: 1 },
                { id: 'b', type: 'circle', x: 380, y: 80, width: 60, height: 60, label: 'B', color: '#ffd93d', opacity: 1 },
                { id: 'c', type: 'circle', x: 250, y: 180, width: 60, height: 60, label: 'C', color: '#6c8cff', opacity: 1 },
                { id: 'mediator', type: 'rect', x: 210, y: 50, width: 100, height: 40, label: 'Mediator', color: '#ff6b35', opacity: 1 },
            ],
            arrows: [
                { from: 'a', to: 'mediator', label: '', color: '#00d4aa' },
                { from: 'b', to: 'mediator', label: '', color: '#ffd93d' },
                { from: 'c', to: 'mediator', label: '', color: '#6c8cff' },
            ],
        },
        {
            description: 'A发送消息，中介者转发给B和C',
            objects: [
                { id: 'a', type: 'circle', x: 120, y: 80, width: 60, height: 60, label: 'A', color: '#00d4aa', opacity: 1 },
                { id: 'b', type: 'circle', x: 380, y: 80, width: 60, height: 60, label: 'B', color: '#ffd93d', opacity: 1 },
                { id: 'c', type: 'circle', x: 250, y: 180, width: 60, height: 60, label: 'C', color: '#6c8cff', opacity: 1 },
                { id: 'mediator', type: 'rect', x: 210, y: 50, width: 100, height: 40, label: 'Mediator', color: '#ff6b35', opacity: 1 },
            ],
            arrows: [
                { from: 'a', to: 'mediator', label: 'Send()', color: '#00d4aa', animated: true },
                { from: 'mediator', to: 'b', label: 'Receive()', color: '#ff6b35', animated: true },
                { from: 'mediator', to: 'c', label: 'Receive()', color: '#ff6b35', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '聊天室', description: '用户通过聊天室中介者通信', icon: 'MessageCircle' },
        { title: '机场塔台', description: '飞机通过塔台协调起降', icon: 'Plane' },
        { title: 'UI组件交互', description: '表单组件通过中介者联动', icon: 'Layout' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface IChatMediator
{
    void SendMessage(string message, User sender);
    void RegisterUser(User user);
}

public abstract class User
{
    protected IChatMediator _mediator;
    public string Name { get; }
    public User(IChatMediator mediator, string name)
    { _mediator = mediator; Name = name; }
    public abstract void Send(string message);
    public abstract void Receive(string message, string from);
}

public class ChatUser : User
{
    public ChatUser(IChatMediator mediator, string name) : base(mediator, name) { }
    public override void Send(string message)
    {
        Console.WriteLine($"[{Name}] 发送: {message}");
        _mediator.SendMessage(message, this);
    }
    public override void Receive(string message, string from) =>
        Console.WriteLine($"[{Name}] 收到来自[{from}]: {message}");
}

public class ChatRoom : IChatMediator
{
    private readonly List<User> _users = new();
    public void RegisterUser(User user) { _users.Add(user); }
    public void SendMessage(string message, User sender)
    {
        foreach (var user in _users)
            if (user != sender) user.Receive(message, sender.Name);
    }
}`,
            highlights: [1, 10, 11, 12, 22, 23, 24, 29, 30, 31],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface ChatMediator {
  sendMessage(message: string, sender: User): void
  registerUser(user: User): void
}

abstract class User {
  protected mediator: ChatMediator
  constructor(mediator: ChatMediator, public name: string) {
    this.mediator = mediator
  }
  abstract send(message: string): void
  abstract receive(message: string, from: string): void
}

class ChatUser extends User {
  send(message: string): void {
    console.log('[' + this.name + '] 发送: ' + message)
    this.mediator.sendMessage(message, this)
  }
  receive(message: string, from: string): void {
    console.log('[' + this.name + '] 收到来自[' + from + ']: ' + message)
  }
}

class ChatRoom implements ChatMediator {
  private users: User[] = []
  registerUser(user: User): void { this.users.push(user) }
  sendMessage(message: string, sender: User): void {
    this.users
      .filter(u => u !== sender)
      .forEach(u => u.receive(message, sender.name))
  }
}`,
            highlights: [1, 8, 9, 10, 16, 17, 18, 23, 24, 25],
        },
    ],
    pros: ['降低对象间的耦合度', '集中控制交互逻辑', '简化对象间的通信', '易于扩展新的中介者'],
    cons: ['中介者可能变得过于复杂', '中介者成为系统瓶颈', '调试困难'],
    relatedPatterns: [
        { patternId: 'observer', relationType: 'alternative', description: '观察者通过订阅通知，中介者通过中心协调' },
        { patternId: 'facade', relationType: 'alternative', description: '外观简化子系统访问，中介者协调同事间交互' },
        { patternId: 'chain-of-responsibility', relationType: 'alternative', description: '责任链沿链传递，中介者集中处理' },
    ],
    frameworkExamples: [
        { framework: 'Vue 3', description: 'Vuex/Pinia 的 Store 充当组件间的中介者，协调状态共享' },
        { framework: 'React', description: 'Redux 的 Store 是中介者模式，组件通过 Store 通信' },
    ],
};

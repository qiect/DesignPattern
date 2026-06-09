export const command = {
    id: 'command',
    name: '命令模式',
    nameEn: 'Command Pattern',
    category: 'behavioral',
    difficulty: 2,
    tags: ['行为型', '请求封装', '撤销重做'],
    definition: '将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。',
    simpleExplanation: '把"请求"变成一个对象，这样你可以存储、传递、排队、撤销它，把"做什么"和"谁来做"分开。',
    lifeAnalogy: '就像餐厅点单，你写下订单（命令），服务员传给厨房（调用者），厨师做菜（接收者），你还可以取消订单（撤销）。',
    roles: [
        { name: '抽象命令', nameEn: 'Command', responsibility: '声明执行和撤销接口', color: '#6c8cff' },
        { name: '具体命令', nameEn: 'ConcreteCommand', responsibility: '将接收者绑定于一个动作', color: '#00d4aa' },
        { name: '调用者', nameEn: 'Invoker', responsibility: '要求命令执行请求', color: '#ff6b35' },
        { name: '接收者', nameEn: 'Receiver', responsibility: '知道如何实施与执行请求', color: '#ffd93d' },
    ],
    umlCode: `classDiagram
    class ICommand {
      <<interface>>
      +Execute() void
      +Undo() void
    }
    class LightOnCommand {
      -light Light
      +Execute() void
      +Undo() void
    }
    class RemoteControl {
      -onCommands ICommand[]
      -undoCommand ICommand
      +OnButtonPressed() void
      +UndoButtonPressed() void
    }
    class Light {
      +TurnOn() void
      +TurnOff() void
    }
    ICommand <|.. LightOnCommand
    RemoteControl --> ICommand
    LightOnCommand --> Light`,
    animationSteps: [
        {
            description: '调用者持有命令对象',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'invoker', type: 'rect', x: 250, y: 80, width: 120, height: 50, label: 'RemoteControl', color: '#ff6b35', opacity: 1 },
                { id: 'command', type: 'rect', x: 450, y: 80, width: 130, height: 50, label: 'LightOnCommand', color: '#00d4aa', opacity: 1 },
                { id: 'receiver', type: 'rect', x: 450, y: 180, width: 100, height: 40, label: 'Light', color: '#ffd93d', opacity: 1 },
            ],
            arrows: [
                { from: 'invoker', to: 'command', label: '持有', color: '#ff6b35' },
                { from: 'command', to: 'receiver', label: '绑定', color: '#00d4aa' },
            ],
        },
        {
            description: '按下按钮，执行命令',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'invoker', type: 'rect', x: 250, y: 80, width: 120, height: 50, label: 'RemoteControl', color: '#ff6b35', opacity: 1 },
                { id: 'command', type: 'rect', x: 450, y: 80, width: 130, height: 50, label: 'LightOnCommand', color: '#00d4aa', opacity: 1 },
                { id: 'receiver', type: 'rect', x: 450, y: 180, width: 100, height: 40, label: 'Light', color: '#ffd93d', opacity: 1 },
            ],
            arrows: [
                { from: 'client', to: 'invoker', label: 'OnButton()', color: '#6c8cff', animated: true },
                { from: 'invoker', to: 'command', label: 'Execute()', color: '#ff6b35', animated: true },
                { from: 'command', to: 'receiver', label: 'TurnOn()', color: '#00d4aa', animated: true },
            ],
        },
        {
            description: '撤销操作',
            objects: [
                { id: 'invoker', type: 'rect', x: 250, y: 80, width: 120, height: 50, label: 'RemoteControl', color: '#ff6b35', opacity: 1 },
                { id: 'command', type: 'rect', x: 450, y: 80, width: 130, height: 50, label: 'LightOnCommand', color: '#00d4aa', opacity: 1 },
                { id: 'receiver', type: 'rect', x: 450, y: 180, width: 100, height: 40, label: 'Light', color: '#ffd93d', opacity: 1 },
            ],
            arrows: [
                { from: 'invoker', to: 'command', label: 'Undo()', color: '#ff6b35', animated: true },
                { from: 'command', to: 'receiver', label: 'TurnOff()', color: '#00d4aa', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '智能家居遥控器', description: '按钮控制设备，支持撤销', icon: 'Lightbulb' },
        { title: '文本编辑器', description: '撤销/重做操作', icon: 'FileEdit' },
        { title: '宏命令', description: '批量执行一组命令', icon: 'Play' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface ICommand
{
    void Execute();
    void Undo();
}

public class Light
{
    public void TurnOn() => Console.WriteLine("灯已打开");
    public void TurnOff() => Console.WriteLine("灯已关闭");
}

public class LightOnCommand : ICommand
{
    private readonly Light _light;
    public LightOnCommand(Light light) { _light = light; }
    public void Execute() => _light.TurnOn();
    public void Undo() => _light.TurnOff();
}

public class RemoteControl
{
    private readonly ICommand[] _onCommands;
    private ICommand _undoCommand;

    public RemoteControl(int slots = 5)
    {
        _onCommands = new ICommand[slots];
    }

    public void SetCommand(int slot, ICommand onCmd)
    { _onCommands[slot] = onCmd; }

    public void OnButtonPressed(int slot)
    {
        _onCommands[slot].Execute();
        _undoCommand = _onCommands[slot];
    }

    public void UndoButtonPressed() => _undoCommand.Undo();
}`,
            highlights: [1, 9, 10, 15, 16, 17, 18, 21, 30, 31],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface Command {
  execute(): void
  undo(): void
}

class Light {
  turnOn(): void { console.log('灯已打开') }
  turnOff(): void { console.log('灯已关闭') }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute(): void { this.light.turnOn() }
  undo(): void { this.light.turnOff() }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute(): void { this.light.turnOff() }
  undo(): void { this.light.turnOn() }
}

class RemoteControl {
  private onCommands: Command[] = []
  private undoCommand: Command | null = null

  setCommand(slot: number, onCmd: Command): void {
    this.onCommands[slot] = onCmd
  }

  onButtonPressed(slot: number): void {
    this.onCommands[slot].execute()
    this.undoCommand = this.onCommands[slot]
  }

  undoButtonPressed(): void { this.undoCommand?.undo() }
}`,
            highlights: [1, 8, 9, 13, 14, 15, 18, 19, 20, 28, 29],
        },
    ],
    pros: ['将请求封装为对象', '支持撤销操作', '支持宏命令', '解耦请求者和执行者'],
    cons: ['增加了类的数量', '命令对象可能过多', '简单的操作也会变得复杂'],
    relatedPatterns: [
        { patternId: 'strategy', relationType: 'alternative', description: '策略封装算法，命令封装请求' },
        { patternId: 'memento', relationType: 'combinable', description: '命令可用备忘录保存状态以支持撤销' },
        { patternId: 'composite', relationType: 'combinable', description: '宏命令使用组合模式组合多个命令' },
    ],
    frameworkExamples: [
        { framework: 'Vue 3', description: 'Pinia 的 $patch 和 $reset 支持状态变更的撤销，类似命令模式' },
        { framework: 'Redux', description: 'Redux 的 action 就是命令对象，描述"发生了什么"' },
    ],
};

/**
 * 命令模式 (Command Pattern)
 * 
 * 定义：将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；
 *       对请求排队或记录请求日志，以及支持可撤销的操作。
 * 
 * 核心角色：
 * 1. 抽象命令(Command) - 声明执行操作的接口
 * 2. 具体命令(Concrete Command) - 将一个接收者对象绑定于一个动作，调用接收者相应的操作
 * 3. 调用者(Invoker) - 要求该命令执行这个请求
 * 4. 接收者(Receiver) - 知道如何实施与执行一个请求相关的操作
 * 
 * 适用场景：
 * - 需要将请求调用者和接收者解耦
 * - 需要在不同的时间指定请求、排队请求
 * - 需要支持撤销操作
 * - 需要支持修改日志
 * 
 * 本示例展示了三个场景：
 * 1. 智能家居遥控器 - 支持撤销操作
 * 2. 文本编辑器 - 撤销/重做
 * 3. 宏命令 - 批量执行
 */

namespace 命令模式;

/// <summary>
/// 抽象命令 - 定义执行和撤销接口
/// </summary>
public interface ICommand
{
    /// <summary>
    /// 执行命令
    /// </summary>
    void Execute();
    
    /// <summary>
    /// 撤销命令
    /// </summary>
    void Undo();
}

#region 场景1: 智能家居遥控器

/// <summary>
/// 接收者 - 灯
/// </summary>
public class Light
{
    public void TurnOn()
    {
        Console.WriteLine("灯已打开");
    }
    
    public void TurnOff()
    {
        Console.WriteLine("灯已关闭");
    }
}

/// <summary>
/// 具体命令 - 开灯命令
/// </summary>
public class LightOnCommand : ICommand
{
    private readonly Light _light;
    
    public LightOnCommand(Light light)
    {
        _light = light;
    }
    
    public void Execute()
    {
        _light.TurnOn();
    }
    
    public void Undo()
    {
        _light.TurnOff();
    }
}

/// <summary>
/// 具体命令 - 关灯命令
/// </summary>
public class LightOffCommand : ICommand
{
    private readonly Light _light;
    
    public LightOffCommand(Light light)
    {
        _light = light;
    }
    
    public void Execute()
    {
        _light.TurnOff();
    }
    
    public void Undo()
    {
        _light.TurnOn();
    }
}

/// <summary>
/// 接收者 - 空调
/// </summary>
public class AirConditioner
{
    public void TurnOn()
    {
        Console.WriteLine("空调已打开");
    }
    
    public void TurnOff()
    {
        Console.WriteLine("空调已关闭");
    }
    
    public void SetTemperature(int temperature)
    {
        Console.WriteLine($"空调温度设置为 {temperature}°C");
    }
}

/// <summary>
/// 具体命令 - 开空调命令（带参数）
/// </summary>
public class AirConditionerOnCommand : ICommand
{
    private readonly AirConditioner _ac;
    private readonly int _temperature;
    
    public AirConditionerOnCommand(AirConditioner ac, int temperature = 24)
    {
        _ac = ac;
        _temperature = temperature;
    }
    
    public void Execute()
    {
        _ac.TurnOn();
        _ac.SetTemperature(_temperature);
    }
    
    public void Undo()
    {
        _ac.TurnOff();
    }
}

/// <summary>
/// 具体命令 - 关空调命令
/// </summary>
public class AirConditionerOffCommand : ICommand
{
    private readonly AirConditioner _ac;
    
    public AirConditionerOffCommand(AirConditioner ac)
    {
        _ac = ac;
    }
    
    public void Execute()
    {
        _ac.TurnOff();
    }
    
    public void Undo()
    {
        _ac.TurnOn();
    }
}

/// <summary>
/// 空命令 - 用于初始化，避免空指针
/// </summary>
public class NoCommand : ICommand
{
    public void Execute() { }
    public void Undo() { }
}

/// <summary>
/// 调用者 - 遥控器
/// 持有命令对象，负责调用命令执行
/// 
/// 关键点：
/// - 将命令对象参数化
/// - 支持撤销操作
/// - 命令的调用者不需要知道具体实现
/// </summary>
public class RemoteControl
{
    private readonly ICommand[] _onCommands;
    private readonly ICommand[] _offCommands;
    private ICommand _undoCommand;
    
    public RemoteControl(int slots = 5)
    {
        _onCommands = new ICommand[slots];
        _offCommands = new ICommand[slots];
        _undoCommand = new NoCommand();
        
        for (int i = 0; i < slots; i++)
        {
            _onCommands[i] = new NoCommand();
            _offCommands[i] = new NoCommand();
        }
    }
    
    public void SetCommand(int slot, ICommand onCommand, ICommand offCommand)
    {
        _onCommands[slot] = onCommand;
        _offCommands[slot] = offCommand;
    }
    
    public void OnButtonPressed(int slot)
    {
        _onCommands[slot].Execute();
        _undoCommand = _onCommands[slot];
    }
    
    public void OffButtonPressed(int slot)
    {
        _offCommands[slot].Execute();
        _undoCommand = _offCommands[slot];
    }
    
    public void UndoButtonPressed()
    {
        Console.Write("撤销: ");
        _undoCommand.Undo();
    }
}

#endregion

#region 场景2: 文本编辑器

/// <summary>
/// 接收者 - 文本编辑器
/// </summary>
public class TextEditor
{
    private string _text = string.Empty;
    
    public void Write(string text)
    {
        _text += text;
        Console.WriteLine($"当前文本: {_text}");
    }
    
    public void Delete(int count)
    {
        if (count <= _text.Length)
        {
            _text = _text[..^count];
        }
        Console.WriteLine($"当前文本: {_text}");
    }
    
    public string GetText() => _text;
}

/// <summary>
/// 具体命令 - 写入命令
/// </summary>
public class WriteCommand : ICommand
{
    private readonly TextEditor _editor;
    private readonly string _text;
    
    public WriteCommand(TextEditor editor, string text)
    {
        _editor = editor;
        _text = text;
    }
    
    public void Execute()
    {
        _editor.Write(_text);
    }
    
    public void Undo()
    {
        _editor.Delete(_text.Length);
    }
}

/// <summary>
/// 具体命令 - 删除命令
/// </summary>
public class DeleteCommand : ICommand
{
    private readonly TextEditor _editor;
    private readonly int _count;
    private string? _deletedText;
    
    public DeleteCommand(TextEditor editor, int count)
    {
        _editor = editor;
        _count = count;
    }
    
    public void Execute()
    {
        var text = _editor.GetText();
        if (text.Length >= _count)
        {
            _deletedText = text[^_count..];
        }
        _editor.Delete(_count);
    }
    
    public void Undo()
    {
        if (_deletedText != null)
        {
            _editor.Write(_deletedText);
        }
    }
}

#endregion

#region 场景3: 宏命令

/// <summary>
/// 具体命令 - 宏命令
/// 组合多个命令，批量执行
/// 
/// 关键点：
/// - 将多个命令组合成一个命令
/// - 支持批量执行和批量撤销
/// </summary>
public class MacroCommand : ICommand
{
    private readonly List<ICommand> _commands = new();
    
    public MacroCommand(params ICommand[] commands)
    {
        _commands.AddRange(commands);
    }
    
    public void Execute()
    {
        foreach (var command in _commands)
        {
            command.Execute();
        }
    }
    
    public void Undo()
    {
        // 撤销时按相反顺序执行
        for (int i = _commands.Count - 1; i >= 0; i--)
        {
            _commands[i].Undo();
        }
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 命令模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 智能家居遥控器\n");
        
        var remote = new RemoteControl(3);
        
        var livingRoomLight = new Light();
        var bedroomLight = new Light();
        var ac = new AirConditioner();
        
        remote.SetCommand(0, new LightOnCommand(livingRoomLight), new LightOffCommand(livingRoomLight));
        remote.SetCommand(1, new LightOnCommand(bedroomLight), new LightOffCommand(bedroomLight));
        remote.SetCommand(2, new AirConditionerOnCommand(ac, 26), new AirConditionerOffCommand(ac));
        
        Console.WriteLine("--- 打开客厅灯 ---");
        remote.OnButtonPressed(0);
        
        Console.WriteLine("\n--- 打开空调 ---");
        remote.OnButtonPressed(2);
        
        Console.WriteLine("\n--- 撤销 ---");
        remote.UndoButtonPressed();
        
        Console.WriteLine("\n--- 关闭客厅灯 ---");
        remote.OffButtonPressed(0);
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 文本编辑器\n");
        
        var editor = new TextEditor();
        
        var writeHello = new WriteCommand(editor, "Hello ");
        var writeWorld = new WriteCommand(editor, "World!");
        var deleteCmd = new DeleteCommand(editor, 6);
        
        Console.WriteLine("--- 写入文本 ---");
        writeHello.Execute();
        writeWorld.Execute();
        
        Console.WriteLine("\n--- 删除文本 ---");
        deleteCmd.Execute();
        
        Console.WriteLine("\n--- 撤销删除 ---");
        deleteCmd.Undo();
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 宏命令\n");
        
        var light = new Light();
        var airConditioner = new AirConditioner();
        
        var allOn = new MacroCommand(
            new LightOnCommand(light),
            new AirConditionerOnCommand(airConditioner, 25)
        );
        
        var allOff = new MacroCommand(
            new LightOffCommand(light),
            new AirConditionerOffCommand(airConditioner)
        );
        
        Console.WriteLine("--- 一键开启所有设备 ---");
        allOn.Execute();
        
        Console.WriteLine("\n--- 一键关闭所有设备 ---");
        allOff.Execute();
        #endregion
        
        Console.WriteLine("\n命令模式优点:");
        Console.WriteLine("- 将请求封装为对象");
        Console.WriteLine("- 支持撤销操作");
        Console.WriteLine("- 支持宏命令");
        Console.WriteLine("- 解耦请求者和执行者");
    }
}

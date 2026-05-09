namespace 命令模式;

public interface ICommand
{
    void Execute();
    void Undo();
}

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

public class NoCommand : ICommand
{
    public void Execute() { }
    public void Undo() { }
}

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
        for (int i = _commands.Count - 1; i >= 0; i--)
        {
            _commands[i].Undo();
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 命令模式示例 ===\n");
        
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
        
        Console.WriteLine("\n----------------------------------------\n");
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
        
        Console.WriteLine("\n----------------------------------------\n");
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
        
        Console.WriteLine("\n命令模式优点:");
        Console.WriteLine("- 将请求封装为对象");
        Console.WriteLine("- 支持撤销操作");
        Console.WriteLine("- 支持宏命令");
        Console.WriteLine("- 解耦请求者和执行者");
    }
}

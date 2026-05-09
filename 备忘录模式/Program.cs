/**
 * 备忘录模式 (Memento Pattern)
 * 
 * 定义：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。
 *       这样以后就可将该对象恢复到原先保存的状态。
 * 
 * 核心角色：
 * 1. 备忘录(Memento) - 存储发起人对象的内部状态
 * 2. 发起人(Originator) - 创建一个备忘录，记录当前内部状态
 * 3. 管理者(Caretaker) - 负责保存备忘录，但不能对备忘录内容进行操作
 * 
 * 适用场景：
 * - 必须保存一个对象在某一个时刻的状态
 * - 不希望暴露对象内部状态
 * - 需要实现撤销功能
 * 
 * 本示例展示了三个场景：
 * 1. 文本编辑器撤销功能 - 栈式历史记录
 * 2. 游戏存档系统 - 多槽位存档
 * 3. 联系人信息备份 - 状态快照
 */

namespace 备忘录模式;

#region 场景1: 文本编辑器撤销功能

/// <summary>
/// 备忘录 - 编辑器状态备忘录
/// 存储编辑器的内部状态
/// 
/// 关键点：
/// - 不可变对象，创建后不能修改
/// - 只暴露必要的信息
/// - 保护发起人的封装性
/// </summary>
public class EditorMemento
{
    public string Content { get; }
    public int CursorPosition { get; }
    public DateTime SavedAt { get; }
    
    public EditorMemento(string content, int cursorPosition)
    {
        Content = content;
        CursorPosition = cursorPosition;
        SavedAt = DateTime.Now;
    }
}

/// <summary>
/// 发起人 - 文本编辑器
/// 创建备忘录保存状态，也可以从备忘录恢复状态
/// 
/// 关键点：
/// - Save() 创建备忘录
/// - Restore() 从备忘录恢复
/// - 备忘录由管理者保存
/// </summary>
public class TextEditor
{
    private string _content = string.Empty;
    private int _cursorPosition = 0;
    
    public void Type(string text)
    {
        _content = _content.Insert(_cursorPosition, text);
        _cursorPosition += text.Length;
        Console.WriteLine($"输入: \"{text}\"");
        Console.WriteLine($"当前内容: \"{_content}\"");
        Console.WriteLine($"光标位置: {_cursorPosition}");
    }
    
    public void MoveCursor(int position)
    {
        if (position >= 0 && position <= _content.Length)
        {
            _cursorPosition = position;
            Console.WriteLine($"光标移动到位置: {_cursorPosition}");
        }
    }
    
    public void Delete(int count)
    {
        if (_cursorPosition >= count)
        {
            _content = _content.Remove(_cursorPosition - count, count);
            _cursorPosition -= count;
            Console.WriteLine($"删除 {count} 个字符");
            Console.WriteLine($"当前内容: \"{_content}\"");
        }
    }
    
    /// <summary>
    /// 创建备忘录 - 保存当前状态
    /// </summary>
    public EditorMemento Save()
    {
        Console.WriteLine($"保存状态: \"{_content}\"");
        return new EditorMemento(_content, _cursorPosition);
    }
    
    /// <summary>
    /// 从备忘录恢复状态
    /// </summary>
    public void Restore(EditorMemento memento)
    {
        _content = memento.Content;
        _cursorPosition = memento.CursorPosition;
        Console.WriteLine($"恢复状态: \"{_content}\"");
        Console.WriteLine($"光标位置: {_cursorPosition}");
    }
    
    public void Display()
    {
        Console.WriteLine($"\n当前编辑器状态:");
        Console.WriteLine($"  内容: \"{_content}\"");
        Console.WriteLine($"  光标: {_cursorPosition}");
    }
}

/// <summary>
/// 管理者 - 编辑器历史记录
/// 负责保存和管理备忘录
/// 
/// 关键点：
/// - 只负责保存备忘录，不修改内容
/// - 使用栈实现撤销历史
/// </summary>
public class EditorHistory
{
    private readonly Stack<EditorMemento> _history = new();
    
    public void Push(EditorMemento memento)
    {
        _history.Push(memento);
    }
    
    public EditorMemento? Pop()
    {
        return _history.Count > 0 ? _history.Pop() : null;
    }
    
    public bool HasHistory => _history.Count > 0;
}

#endregion

#region 场景2: 游戏存档系统

/// <summary>
/// 备忘录 - 游戏状态
/// </summary>
public class GameState
{
    public int Level { get; }
    public int Score { get; }
    public int Health { get; }
    public string Location { get; }
    
    public GameState(int level, int score, int health, string location)
    {
        Level = level;
        Score = score;
        Health = health;
        Location = location;
    }
    
    public override string ToString()
    {
        return $"关卡: {Level}, 分数: {Score}, 生命值: {Health}, 位置: {Location}";
    }
}

/// <summary>
/// 发起人 - 游戏
/// </summary>
public class Game
{
    private int _level = 1;
    private int _score = 0;
    private int _health = 100;
    private string _location = "起点";
    
    public void Play(string action)
    {
        Console.WriteLine($"\n执行动作: {action}");
        switch (action)
        {
            case "过关":
                _level++;
                _score += 100;
                break;
            case "获得金币":
                _score += 50;
                break;
            case "受伤":
                _health -= 20;
                break;
            case "移动":
                _location = $"位置_{new Random().Next(1, 10)}";
                break;
        }
        Console.WriteLine($"当前状态: {this}");
    }
    
    /// <summary>
    /// 保存游戏状态
    /// </summary>
    public GameState SaveGame()
    {
        Console.WriteLine($"\n保存游戏: {this}");
        return new GameState(_level, _score, _health, _location);
    }
    
    /// <summary>
    /// 加载游戏状态
    /// </summary>
    public void LoadGame(GameState state)
    {
        _level = state.Level;
        _score = state.Score;
        _health = state.Health;
        _location = state.Location;
        Console.WriteLine($"\n加载游戏: {this}");
    }
    
    public override string ToString()
    {
        return $"关卡: {_level}, 分数: {_score}, 生命值: {_health}, 位置: {_location}";
    }
}

/// <summary>
/// 管理者 - 游戏存档管理器
/// 支持多槽位存档
/// </summary>
public class GameSaveManager
{
    private readonly Dictionary<string, GameState> _saves = new();
    
    public void Save(string slot, GameState state)
    {
        _saves[slot] = state;
        Console.WriteLine($"存档已保存到槽位: {slot}");
    }
    
    public GameState? Load(string slot)
    {
        if (_saves.TryGetValue(slot, out var state))
        {
            Console.WriteLine($"从槽位 {slot} 加载存档");
            return state;
        }
        Console.WriteLine($"槽位 {slot} 没有存档");
        return null;
    }
    
    public void ListSaves()
    {
        Console.WriteLine("\n存档列表:");
        foreach (var save in _saves)
        {
            Console.WriteLine($"  {save.Key}: {save.Value}");
        }
    }
}

#endregion

#region 场景3: 联系人信息备份

/// <summary>
/// 发起人 - 联系人
/// </summary>
public class Contact
{
    public string Name { get; }
    public string Phone { get; }
    public string Email { get; }
    
    public Contact(string name, string phone, string email)
    {
        Name = name;
        Phone = phone;
        Email = email;
    }
    
    /// <summary>
    /// 保存联系人状态
    /// </summary>
    public ContactMemento Save()
    {
        return new ContactMemento(Name, Phone, Email);
    }
    
    /// <summary>
    /// 恢复联系人状态
    /// </summary>
    public void Restore(ContactMemento memento)
    {
        var type = typeof(Contact);
        type.GetProperty("Name")?.SetValue(this, memento.Name);
        type.GetProperty("Phone")?.SetValue(this, memento.Phone);
        type.GetProperty("Email")?.SetValue(this, memento.Email);
    }
    
    public override string ToString() => $"{Name} - {Phone} - {Email}";
}

/// <summary>
/// 备忘录 - 联系人备忘录
/// </summary>
public class ContactMemento
{
    public string Name { get; }
    public string Phone { get; }
    public string Email { get; }
    
    public ContactMemento(string name, string phone, string email)
    {
        Name = name;
        Phone = phone;
        Email = email;
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 备忘录模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 文本编辑器撤销功能\n");
        
        var editor = new TextEditor();
        var history = new EditorHistory();
        
        history.Push(editor.Save());
        editor.Type("Hello");
        
        history.Push(editor.Save());
        editor.Type(" World");
        
        history.Push(editor.Save());
        editor.MoveCursor(5);
        editor.Type("Beautiful ");
        
        editor.Display();
        
        Console.WriteLine("\n--- 撤销操作 ---");
        if (history.HasHistory)
        {
            var state = history.Pop();
            if (state != null) editor.Restore(state);
        }
        
        Console.WriteLine("\n--- 再次撤销 ---");
        if (history.HasHistory)
        {
            var state = history.Pop();
            if (state != null) editor.Restore(state);
        }
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 游戏存档系统\n");
        
        var game = new Game();
        var saveManager = new GameSaveManager();
        
        saveManager.Save("初始", game.SaveGame());
        
        game.Play("过关");
        game.Play("获得金币");
        saveManager.Save("存档1", game.SaveGame());
        
        game.Play("受伤");
        game.Play("移动");
        saveManager.Save("存档2", game.SaveGame());
        
        saveManager.ListSaves();
        
        Console.WriteLine("\n--- 加载存档1 ---");
        var save1 = saveManager.Load("存档1");
        if (save1 != null) game.LoadGame(save1);
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 联系人信息备份\n");
        
        var contact = new Contact("张三", "13800138000", "zhangsan@example.com");
        Console.WriteLine($"原始联系人: {contact}");
        
        var backup = contact.Save();
        
        Console.WriteLine("\n修改联系人信息...");
        #endregion
        
        Console.WriteLine("\n备忘录模式优点:");
        Console.WriteLine("- 不破坏封装性,保存内部状态");
        Console.WriteLine("- 提供状态恢复机制");
        Console.WriteLine("- 简化发起人的职责");
        Console.WriteLine("- 符合单一职责原则");
    }
}

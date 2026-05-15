/**
 * 享元模式 (Flyweight Pattern)
 * 
 * 定义：运用共享技术有效地支持大量细粒度的对象。
 * 
 * 核心角色：
 * 1. 抽象享元(Flyweight) - 声明公共接口，通过此接口享元可以接受并作用于外部状态
 * 2. 具体享元(Concrete Flyweight) - 实现抽象享元接口，为内部状态提供存储空间
 * 3. 享元工厂(Flyweight Factory) - 创建和管理享元对象，确保合理共享
 * 4. 客户端(Client) - 维护对享元的引用，存储外部状态
 * 
 * 内部状态 vs 外部状态：
 * - 内部状态：可以共享的、不随环境变化的状态
 * - 外部状态：不可以共享的、随环境变化的状态
 * 
 * 适用场景：
 * - 应用程序使用了大量的同类对象
 * - 对象的大部分状态可以变为外部状态
 * - 需要缓冲池的场景
 * 
 * 本示例展示了三个场景：
 * 1. 棋盘游戏 - 棋子共享
 * 2. 文字编辑器 - 字符共享
 * 3. 纹理缓存 - 游戏纹理共享
 */

namespace 享元模式;

#region 场景1: 棋盘游戏

/// <summary>
/// 抽象享元 - 棋子接口
/// </summary>
public interface IChessPiece
{
    /// <summary>
    /// 显示棋子信息
    /// 外部状态（位置）通过参数传入
    /// </summary>
    /// <param name="x">X坐标（外部状态）</param>
    /// <param name="y">Y坐标（外部状态）</param>
    void Display(int x, int y);
    
    /// <summary>
    /// 获取棋子颜色（内部状态）
    /// </summary>
    string GetColor();
}

/// <summary>
/// 具体享元 - 棋子
/// 内部状态：颜色
/// 外部状态：位置（通过方法参数传入）
/// 
/// 关键点：
/// - 内部状态（颜色）存储在享元对象中
/// - 外部状态（位置）由客户端维护
/// - 相同颜色的棋子共享同一个享元对象
/// </summary>
public class ChessPiece : IChessPiece
{
    private readonly string _color;
    
    public ChessPiece(string color)
    {
        _color = color;
        Console.WriteLine($"创建棋子: 颜色={_color}");
    }
    
    public void Display(int x, int y)
    {
        Console.WriteLine($"棋子 [{_color}] 位置: ({x}, {y})");
    }
    
    public string GetColor() => _color;
}

/// <summary>
/// 享元工厂 - 棋子工厂
/// 管理棋子对象的共享
/// 
/// 关键点：
/// - 维护享元对象池
/// - 相同颜色返回同一对象
/// - 不同颜色创建新对象
/// </summary>
public class ChessPieceFactory
{
    private readonly Dictionary<string, IChessPiece> _pool = new();
    
    /// <summary>
    /// 获取棋子 - 相同颜色共享同一实例
    /// </summary>
    public IChessPiece GetChessPiece(string color)
    {
        if (!_pool.ContainsKey(color))
        {
            _pool[color] = new ChessPiece(color);
        }
        return _pool[color];
    }
    
    /// <summary>
    /// 获取已创建的棋子种类数量
    /// </summary>
    public int GetPoolSize() => _pool.Count;
}

/// <summary>
/// 客户端 - 棋盘上的棋子位置
/// 维护外部状态（位置）
/// </summary>
public class ChessPosition
{
    public IChessPiece ChessPiece { get; }
    public int X { get; }
    public int Y { get; }
    
    public ChessPosition(IChessPiece chessPiece, int x, int y)
    {
        ChessPiece = chessPiece;
        X = x;
        Y = y;
    }
    
    public void Display()
    {
        ChessPiece.Display(X, Y);
    }
}

#endregion

#region 场景2: 文字编辑器

/// <summary>
/// 抽象享元 - 字符接口
/// </summary>
public interface ICharacter
{
    void Display(int fontSize, string fontFamily, int x, int y);
    char GetSymbol();
}

/// <summary>
/// 具体享元 - 字符
/// 内部状态：字符符号
/// 外部状态：字体大小、字体族、位置
/// </summary>
public class Character : ICharacter
{
    private readonly char _symbol;
    
    public Character(char symbol)
    {
        _symbol = symbol;
    }
    
    public void Display(int fontSize, string fontFamily, int x, int y)
    {
        Console.WriteLine($"字符 '{_symbol}' - 字体: {fontFamily} {fontSize}px, 位置: ({x}, {y})");
    }
    
    public char GetSymbol() => _symbol;
}

/// <summary>
/// 享元工厂 - 字符工厂
/// </summary>
public class CharacterFactory
{
    private readonly Dictionary<char, ICharacter> _pool = new();
    
    public ICharacter GetCharacter(char c)
    {
        if (!_pool.ContainsKey(c))
        {
            _pool[c] = new Character(c);
        }
        return _pool[c];
    }
    
    public int GetPoolSize() => _pool.Count;
}

/// <summary>
/// 客户端 - 文本行
/// 维护字符的外部状态
/// </summary>
public class TextLine
{
    private readonly List<(ICharacter character, int fontSize, string fontFamily, int x, int y)> _chars = new();
    
    public void AddCharacter(ICharacter character, int fontSize, string fontFamily, int x, int y)
    {
        _chars.Add((character, fontSize, fontFamily, x, y));
    }
    
    public void Display()
    {
        foreach (var (character, fontSize, fontFamily, x, y) in _chars)
        {
            character.Display(fontSize, fontFamily, x, y);
        }
    }
}

#endregion

#region 场景3: 纹理缓存

/// <summary>
/// 抽象享元 - 纹理接口
/// </summary>
public interface ITexture
{
    void Render(int x, int y, int width, int height);
    string GetName();
}

/// <summary>
/// 具体享元 - 纹理
/// 内部状态：纹理名称和数据
/// 外部状态：渲染位置和大小
/// </summary>
public class Texture : ITexture
{
    private readonly string _name;
    private readonly byte[] _data;
    
    public Texture(string name)
    {
        _name = name;
        _data = new byte[1024 * 1024];
        Console.WriteLine($"加载纹理: {name} (1MB)");
    }
    
    public void Render(int x, int y, int width, int height)
    {
        Console.WriteLine($"渲染纹理 [{_name}] 位置: ({x}, {y}), 大小: {width}x{height}");
    }
    
    public string GetName() => _name;
}

/// <summary>
/// 享元工厂 - 纹理工厂
/// </summary>
public class TextureFactory
{
    private readonly Dictionary<string, ITexture> _pool = new();
    
    public ITexture GetTexture(string name)
    {
        if (!_pool.ContainsKey(name))
        {
            _pool[name] = new Texture(name);
        }
        return _pool[name];
    }
    
    public int GetPoolSize() => _pool.Count;
}

/// <summary>
/// 客户端 - 游戏对象
/// 维护纹理的外部状态
/// </summary>
public class GameObject
{
    public ITexture Texture { get; }
    public int X { get; }
    public int Y { get; }
    public int Width { get; }
    public int Height { get; }
    
    public GameObject(ITexture texture, int x, int y, int width, int height)
    {
        Texture = texture;
        X = x;
        Y = y;
        Width = width;
        Height = height;
    }
    
    public void Render()
    {
        Texture.Render(X, Y, Width, Height);
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 享元模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 棋盘游戏\n");
        
        var factory = new ChessPieceFactory();
        var positions = new List<ChessPosition>();
        
        // 黑色棋子共享同一个享元对象
        var blackPiece = factory.GetChessPiece("黑色");
        var whitePiece = factory.GetChessPiece("白色");
        
        positions.Add(new ChessPosition(blackPiece, 0, 0));
        positions.Add(new ChessPosition(whitePiece, 1, 0));
        positions.Add(new ChessPosition(blackPiece, 2, 0));
        positions.Add(new ChessPosition(whitePiece, 3, 0));
        positions.Add(new ChessPosition(blackPiece, 4, 0));
        
        foreach (var pos in positions)
        {
            pos.Display();
        }
        
        Console.WriteLine($"\n棋子种类数: {factory.GetPoolSize()} (仅2种: 黑/白)");
        Console.WriteLine($"棋盘上棋子数: {positions.Count} (5个)");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 文字编辑器\n");
        
        var charFactory = new CharacterFactory();
        var line = new TextLine();
        
        string text = "Hello";
        int xPos = 0;
        foreach (char c in text)
        {
            var character = charFactory.GetCharacter(c);
            line.AddCharacter(character, 12, "宋体", xPos, 0);
            xPos += 10;
        }
        
        line.Display();
        Console.WriteLine($"\n字符对象池大小: {charFactory.GetPoolSize()}");
        Console.WriteLine($"显示的字符数: {text.Length}");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 纹理缓存\n");
        
        var textureFactory = new TextureFactory();
        
        var tree1 = new GameObject(textureFactory.GetTexture("树"), 10, 20, 50, 80);
        var tree2 = new GameObject(textureFactory.GetTexture("树"), 100, 20, 50, 80);
        var tree3 = new GameObject(textureFactory.GetTexture("树"), 200, 20, 50, 80);
        var rock1 = new GameObject(textureFactory.GetTexture("石头"), 50, 30, 30, 30);
        
        tree1.Render();
        tree2.Render();
        tree3.Render();
        rock1.Render();
        
        Console.WriteLine($"\n纹理对象池大小: {textureFactory.GetPoolSize()} (仅2种纹理)");
        Console.WriteLine($"游戏对象数: 4 (3棵树 + 1块石头)");
        #endregion
        
        Console.WriteLine("\n享元模式优点:");
        Console.WriteLine("- 减少对象的创建数量,节省内存");
        Console.WriteLine("- 共享内部状态,外部状态由客户端维护");
        Console.WriteLine("- 适合大量相似对象的场景");
        Console.WriteLine("- 符合开闭原则");
    }
}

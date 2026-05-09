/**
 * 单例模式 (Singleton Pattern)
 * 
 * 定义：确保一个类只有一个实例，并提供一个全局访问点。
 * 
 * 核心要点：
 * 1. 私有构造函数 - 防止外部通过 new 创建实例
 * 2. 静态实例字段 - 保存唯一的实例
 * 3. 公共静态访问方法 - 提供全局访问点
 * 
 * 适用场景：
 * - 需要严格控制全局只有一个实例的场景
 * - 如：日志记录器、配置管理器、数据库连接池、线程池等
 * 
 * 本示例展示了两种实现方式：
 * 1. Lazy<T> 方式 - 简洁且线程安全（推荐）
 * 2. 双重检查锁定方式 - 传统实现，手动控制线程安全
 */

namespace 单例模式;

/// <summary>
/// 日志记录器 - 使用 Lazy&lt;T&gt; 实现线程安全的单例
/// 
/// 特点：
/// - 代码简洁，由 Lazy&lt;T&gt; 自动处理线程安全
/// - 延迟初始化，首次访问时才创建实例
/// - 性能优秀，无需手动加锁
/// </summary>
public sealed class Logger
{
    /// <summary>
    /// 静态只读字段，使用 Lazy&lt;T&gt; 包装单例实例
    /// Lazy&lt;T&gt; 保证线程安全的延迟初始化
    /// </summary>
    private static readonly Lazy<Logger> _instance = new(() => new Logger());
    
    /// <summary>
    /// 全局访问点 - 获取 Logger 的唯一实例
    /// </summary>
    public static Logger Instance => _instance.Value;
    
    /// <summary>
    /// 私有构造函数 - 防止外部通过 new 创建实例
    /// 只能通过 Instance 属性访问
    /// </summary>
    private Logger()
    {
        Console.WriteLine("Logger 初始化完成");
    }
    
    /// <summary>
    /// 记录日志消息
    /// </summary>
    /// <param name="message">日志内容</param>
    public void Log(string message)
    {
        Console.WriteLine($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {message}");
    }
}

/// <summary>
/// 配置管理器 - 使用双重检查锁定(Double-Check Locking)实现的单例
/// 
/// 特点：
/// - 手动控制线程安全
/// - 延迟初始化
/// - 双重检查减少锁的开销
/// </summary>
public sealed class ConfigurationManager
{
    /// <summary>
    /// 静态实例字段，可为空（延迟初始化）
    /// </summary>
    private static ConfigurationManager? _instance;
    
    /// <summary>
    /// 锁对象，用于保证线程安全
    /// </summary>
    private static readonly object _lock = new();
    
    /// <summary>
    /// 配置项字典，存储键值对形式的配置
    /// </summary>
    private readonly Dictionary<string, string> _settings;
    
    /// <summary>
    /// 全局访问点 - 使用双重检查锁定获取实例
    /// 
    /// 双重检查的好处：
    /// 1. 第一次检查避免不必要的锁等待
    /// 2. 锁内再次检查确保只创建一个实例
    /// </summary>
    public static ConfigurationManager Instance
    {
        get
        {
            // 第一次检查：如果实例已存在，直接返回（避免加锁开销）
            if (_instance == null)
            {
                // 加锁保证线程安全
                lock (_lock)
                {
                    // 第二次检查：确保在等待锁期间没有其他线程创建实例
                    _instance ??= new ConfigurationManager();
                }
            }
            return _instance;
        }
    }
    
    /// <summary>
    /// 私有构造函数 - 初始化默认配置
    /// </summary>
    private ConfigurationManager()
    {
        _settings = new Dictionary<string, string>
        {
            ["AppName"] = "设计模式示例",
            ["Version"] = "1.0.0",
            ["Environment"] = "Development"
        };
        Console.WriteLine("ConfigurationManager 初始化完成");
    }
    
    /// <summary>
    /// 获取配置项
    /// </summary>
    /// <param name="key">配置键</param>
    /// <returns>配置值，不存在则返回 null</returns>
    public string? GetSetting(string key)
    {
        return _settings.TryGetValue(key, out var value) ? value : null;
    }
    
    /// <summary>
    /// 设置配置项
    /// </summary>
    /// <param name="key">配置键</param>
    /// <param name="value">配置值</param>
    public void SetSetting(string key, string value)
    {
        _settings[key] = value;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 单例模式示例 ===\n");
        
        Console.WriteLine("1. 使用 Lazy<T> 实现的线程安全单例:");
        var logger1 = Logger.Instance;
        var logger2 = Logger.Instance;
        
        Console.WriteLine($"logger1 和 logger2 是否为同一实例: {logger1 == logger2}");
        logger1.Log("这是一条日志消息");
        logger2.Log("这是另一条日志消息");
        
        Console.WriteLine("\n2. 使用双重检查锁定实现的单例:");
        var config1 = ConfigurationManager.Instance;
        var config2 = ConfigurationManager.Instance;
        
        Console.WriteLine($"config1 和 config2 是否为同一实例: {config1 == config2}");
        Console.WriteLine($"应用名称: {config1.GetSetting("AppName")}");
        Console.WriteLine($"版本: {config1.GetSetting("Version")}");
        
        config1.SetSetting("CustomSetting", "自定义值");
        Console.WriteLine($"自定义设置: {config2.GetSetting("CustomSetting")}");
        
        Console.WriteLine("\n单例模式优点:");
        Console.WriteLine("- 保证一个类只有一个实例");
        Console.WriteLine("- 提供全局访问点");
        Console.WriteLine("- 延迟初始化");
        Console.WriteLine("- 线程安全");
    }
}

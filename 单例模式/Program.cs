namespace 单例模式;

public sealed class Logger
{
    private static readonly Lazy<Logger> _instance = new(() => new Logger());
    
    public static Logger Instance => _instance.Value;
    
    private Logger()
    {
        Console.WriteLine("Logger 初始化完成");
    }
    
    public void Log(string message)
    {
        Console.WriteLine($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {message}");
    }
}

public sealed class ConfigurationManager
{
    private static ConfigurationManager? _instance;
    private static readonly object _lock = new();
    
    private readonly Dictionary<string, string> _settings;
    
    public static ConfigurationManager Instance
    {
        get
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    _instance ??= new ConfigurationManager();
                }
            }
            return _instance;
        }
    }
    
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
    
    public string? GetSetting(string key)
    {
        return _settings.TryGetValue(key, out var value) ? value : null;
    }
    
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

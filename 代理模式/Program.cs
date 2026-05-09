/**
 * 代理模式 (Proxy Pattern)
 * 
 * 定义：为其他对象提供一种代理以控制对这个对象的访问。
 * 
 * 核心角色：
 * 1. 抽象主题(Subject) - 定义真实主题和代理的公共接口
 * 2. 真实主题(Real Subject) - 定义代理所代表的真实对象
 * 3. 代理(Proxy) - 控制对真实主题的访问
 * 
 * 代理类型：
 * - 虚拟代理：延迟创建开销大的对象
 * - 保护代理：控制对原始对象的访问权限
 * - 缓存代理：为开销大的运算结果提供缓存
 * - 智能代理：在访问对象时执行额外操作
 * 
 * 适用场景：
 * - 需要控制对对象的访问
 * - 需要延迟创建开销大的对象
 * - 需要在访问对象时添加额外功能
 * 
 * 本示例展示了四种代理类型
 */

namespace 代理模式;

#region 虚拟代理 - 图片延迟加载

/// <summary>
/// 抽象主题 - 图片接口
/// </summary>
public interface IImage
{
    void Display();
}

/// <summary>
/// 真实主题 - 真实图片
/// 加载图片需要较长时间
/// </summary>
public class RealImage : IImage
{
    private readonly string _fileName;
    
    public RealImage(string fileName)
    {
        _fileName = fileName;
        LoadFromDisk();
    }
    
    private void LoadFromDisk()
    {
        Console.WriteLine($"从磁盘加载图片: {_fileName}");
    }
    
    public void Display()
    {
        Console.WriteLine($"显示图片: {_fileName}");
    }
}

/// <summary>
/// 代理 - 图片代理
/// 延迟加载图片，只有在真正需要时才创建真实对象
/// 
/// 关键点：
/// - 代理与真实对象实现相同接口
/// - 持有真实对象的引用（延迟初始化）
/// - 在需要时才创建真实对象
/// </summary>
public class ImageProxy : IImage
{
    private readonly string _fileName;
    private RealImage? _realImage;
    
    public ImageProxy(string fileName)
    {
        _fileName = fileName;
    }
    
    public void Display()
    {
        // 延迟初始化：只有在真正需要显示时才加载图片
        _realImage ??= new RealImage(_fileName);
        _realImage.Display();
    }
}

#endregion

#region 缓存代理 + 保护代理 - 数据库查询

/// <summary>
/// 抽象主题 - 数据库接口
/// </summary>
public interface IDatabase
{
    string Query(string sql);
}

/// <summary>
/// 真实主题 - 真实数据库
/// </summary>
public class RealDatabase : IDatabase
{
    public string Query(string sql)
    {
        Console.WriteLine($"执行SQL查询: {sql}");
        return $"查询结果: [{sql}] 的数据";
    }
}

/// <summary>
/// 代理 - 数据库代理
/// 结合了缓存代理和保护代理的功能
/// 
/// 关键点：
/// - 缓存代理：缓存查询结果，避免重复查询
/// - 保护代理：检查用户权限，控制访问
/// </summary>
public class DatabaseProxy : IDatabase
{
    private readonly RealDatabase? _realDatabase;
    private readonly Dictionary<string, string> _cache = new();
    private readonly string _userRole;
    
    public DatabaseProxy(string userRole)
    {
        _userRole = userRole;
    }
    
    public string Query(string sql)
    {
        // 保护代理：权限检查
        if (!CheckPermission())
        {
            throw new UnauthorizedAccessException("无权限执行此操作");
        }
        
        // 缓存代理：检查缓存
        if (_cache.TryGetValue(sql, out var cachedResult))
        {
            Console.WriteLine($"从缓存返回结果: {sql}");
            return cachedResult;
        }
        
        // 延迟初始化真实对象
        _realDatabase ??= new RealDatabase();
        var result = _realDatabase.Query(sql);
        _cache[sql] = result;
        return result;
    }
    
    private bool CheckPermission()
    {
        var hasPermission = _userRole == "admin" || _userRole == "user";
        Console.WriteLine($"权限检查: {_userRole} - {(hasPermission ? "通过" : "拒绝")}");
        return hasPermission;
    }
}

#endregion

#region 保护代理和智能代理

/// <summary>
/// 抽象主题 - 服务接口
/// </summary>
public interface IService
{
    void Operation();
}

/// <summary>
/// 真实主题 - 真实服务
/// </summary>
public class RealService : IService
{
    public void Operation()
    {
        Console.WriteLine("执行真实服务操作");
    }
}

/// <summary>
/// 保护代理 - 权限控制代理
/// 控制对真实服务的访问权限
/// </summary>
public class ProtectionProxy : IService
{
    private readonly RealService _realService = new();
    private readonly string _userRole;
    
    public ProtectionProxy(string userRole)
    {
        _userRole = userRole;
    }
    
    public void Operation()
    {
        if (!HasAccess())
        {
            Console.WriteLine("访问被拒绝: 权限不足");
            return;
        }
        
        _realService.Operation();
    }
    
    private bool HasAccess()
    {
        return _userRole == "admin";
    }
}

/// <summary>
/// 智能代理 - 日志代理
/// 在访问对象时添加日志记录功能
/// </summary>
public class LoggingProxy : IService
{
    private readonly IService _service;
    
    public LoggingProxy(IService service)
    {
        _service = service;
    }
    
    public void Operation()
    {
        Console.WriteLine($"[日志] 操作开始 - {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
        _service.Operation();
        Console.WriteLine($"[日志] 操作结束 - {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 代理模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 虚拟代理 - 图片延迟加载\n");
        
        Console.WriteLine("--- 创建代理对象(不加载图片) ---");
        IImage image1 = new ImageProxy("photo1.jpg");
        IImage image2 = new ImageProxy("photo2.jpg");
        
        Console.WriteLine("\n--- 第一次显示图片(加载图片) ---");
        image1.Display();
        
        Console.WriteLine("\n--- 第二次显示同一图片(已加载) ---");
        image1.Display();
        
        Console.WriteLine("\n--- 显示另一张图片 ---");
        image2.Display();
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 缓存代理 - 数据库查询\n");
        
        IDatabase dbAdmin = new DatabaseProxy("admin");
        IDatabase dbUser = new DatabaseProxy("user");
        IDatabase dbGuest = new DatabaseProxy("guest");
        
        Console.WriteLine("--- 管理员查询 ---");
        Console.WriteLine(dbAdmin.Query("SELECT * FROM users"));
        Console.WriteLine(dbAdmin.Query("SELECT * FROM users"));
        
        Console.WriteLine("\n--- 普通用户查询 ---");
        Console.WriteLine(dbUser.Query("SELECT * FROM products"));
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 保护代理 - 权限控制\n");
        
        IService adminService = new ProtectionProxy("admin");
        IService userService = new ProtectionProxy("user");
        
        Console.WriteLine("--- 管理员访问 ---");
        adminService.Operation();
        
        Console.WriteLine("\n--- 普通用户访问 ---");
        userService.Operation();
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景4演示
        Console.WriteLine("场景4: 智能代理 - 日志记录\n");
        
        IService service = new RealService();
        IService loggingService = new LoggingProxy(service);
        loggingService.Operation();
        #endregion
        
        Console.WriteLine("\n代理模式优点:");
        Console.WriteLine("- 控制对原始对象的访问");
        Console.WriteLine("- 在访问对象时添加额外功能");
        Console.WriteLine("- 延迟加载,优化性能");
        Console.WriteLine("- 符合开闭原则");
    }
}

namespace 代理模式;

public interface IImage
{
    void Display();
}

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
        _realImage ??= new RealImage(_fileName);
        _realImage.Display();
    }
}

public interface IDatabase
{
    string Query(string sql);
}

public class RealDatabase : IDatabase
{
    public string Query(string sql)
    {
        Console.WriteLine($"执行SQL查询: {sql}");
        return $"查询结果: [{sql}] 的数据";
    }
}

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
        if (!CheckPermission())
        {
            throw new UnauthorizedAccessException("无权限执行此操作");
        }
        
        if (_cache.TryGetValue(sql, out var cachedResult))
        {
            Console.WriteLine($"从缓存返回结果: {sql}");
            return cachedResult;
        }
        
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

public interface IService
{
    void Operation();
}

public class RealService : IService
{
    public void Operation()
    {
        Console.WriteLine("执行真实服务操作");
    }
}

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

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 代理模式示例 ===\n");
        
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
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景2: 缓存代理 - 数据库查询\n");
        
        IDatabase dbAdmin = new DatabaseProxy("admin");
        IDatabase dbUser = new DatabaseProxy("user");
        IDatabase dbGuest = new DatabaseProxy("guest");
        
        Console.WriteLine("--- 管理员查询 ---");
        Console.WriteLine(dbAdmin.Query("SELECT * FROM users"));
        Console.WriteLine(dbAdmin.Query("SELECT * FROM users"));
        
        Console.WriteLine("\n--- 普通用户查询 ---");
        Console.WriteLine(dbUser.Query("SELECT * FROM products"));
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景3: 保护代理 - 权限控制\n");
        
        IService adminService = new ProtectionProxy("admin");
        IService userService = new ProtectionProxy("user");
        
        Console.WriteLine("--- 管理员访问 ---");
        adminService.Operation();
        
        Console.WriteLine("\n--- 普通用户访问 ---");
        userService.Operation();
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景4: 智能代理 - 日志记录\n");
        
        IService service = new RealService();
        IService loggingService = new LoggingProxy(service);
        loggingService.Operation();
        
        Console.WriteLine("\n代理模式优点:");
        Console.WriteLine("- 控制对原始对象的访问");
        Console.WriteLine("- 在访问对象时添加额外功能");
        Console.WriteLine("- 延迟加载,优化性能");
        Console.WriteLine("- 符合开闭原则");
    }
}

namespace 责任链模式;

public abstract class Handler
{
    protected Handler? _nextHandler;
    
    public Handler SetNext(Handler handler)
    {
        _nextHandler = handler;
        return handler;
    }
    
    public abstract bool Handle(string request);
}

public class LowLevelHandler : Handler
{
    public override bool Handle(string request)
    {
        if (request == "简单问题")
        {
            Console.WriteLine($"低级处理者: 处理 {request}");
            return true;
        }
        
        Console.WriteLine($"低级处理者: 无法处理 {request}, 传递给下一级");
        return _nextHandler?.Handle(request) ?? false;
    }
}

public class MidLevelHandler : Handler
{
    public override bool Handle(string request)
    {
        if (request == "中等问题")
        {
            Console.WriteLine($"中级处理者: 处理 {request}");
            return true;
        }
        
        Console.WriteLine($"中级处理者: 无法处理 {request}, 传递给下一级");
        return _nextHandler?.Handle(request) ?? false;
    }
}

public class HighLevelHandler : Handler
{
    public override bool Handle(string request)
    {
        if (request == "复杂问题")
        {
            Console.WriteLine($"高级处理者: 处理 {request}");
            return true;
        }
        
        Console.WriteLine($"高级处理者: 无法处理 {request}");
        return _nextHandler?.Handle(request) ?? false;
    }
}

public class PurchaseRequest
{
    public decimal Amount { get; }
    public string Description { get; }
    
    public PurchaseRequest(decimal amount, string description)
    {
        Amount = amount;
        Description = description;
    }
}

public abstract class Approver
{
    protected Approver? _nextApprover;
    protected readonly string _name;
    
    public Approver(string name)
    {
        _name = name;
    }
    
    public Approver SetNext(Approver approver)
    {
        _nextApprover = approver;
        return approver;
    }
    
    public abstract void ProcessRequest(PurchaseRequest request);
}

public class Manager : Approver
{
    private const decimal ApprovalLimit = 10000;
    
    public Manager(string name) : base(name) { }
    
    public override void ProcessRequest(PurchaseRequest request)
    {
        if (request.Amount <= ApprovalLimit)
        {
            Console.WriteLine($"经理 [{_name}] 批准采购请求: {request.Description}, 金额: ¥{request.Amount}");
        }
        else
        {
            Console.WriteLine($"经理 [{_name}] 无权批准金额 ¥{request.Amount}, 转交给上级");
            _nextApprover?.ProcessRequest(request);
        }
    }
}

public class Director : Approver
{
    private const decimal ApprovalLimit = 50000;
    
    public Director(string name) : base(name) { }
    
    public override void ProcessRequest(PurchaseRequest request)
    {
        if (request.Amount <= ApprovalLimit)
        {
            Console.WriteLine($"总监 [{_name}] 批准采购请求: {request.Description}, 金额: ¥{request.Amount}");
        }
        else
        {
            Console.WriteLine($"总监 [{_name}] 无权批准金额 ¥{request.Amount}, 转交给上级");
            _nextApprover?.ProcessRequest(request);
        }
    }
}

public class CEO : Approver
{
    public CEO(string name) : base(name) { }
    
    public override void ProcessRequest(PurchaseRequest request)
    {
        Console.WriteLine($"CEO [{_name}] 批准采购请求: {request.Description}, 金额: ¥{request.Amount}");
    }
}

public class HttpRequest
{
    public string? Token { get; set; }
    public string? Role { get; set; }
    public string Path { get; set; } = string.Empty;
}

public abstract class Middleware
{
    protected Middleware? _next;
    
    public Middleware Use(Middleware middleware)
    {
        _next = middleware;
        return middleware;
    }
    
    public abstract bool Handle(HttpRequest request);
}

public class AuthenticationMiddleware : Middleware
{
    public override bool Handle(HttpRequest request)
    {
        if (string.IsNullOrEmpty(request.Token))
        {
            Console.WriteLine("认证失败: 缺少Token");
            return false;
        }
        
        Console.WriteLine($"认证通过: Token = {request.Token}");
        return _next?.Handle(request) ?? true;
    }
}

public class AuthorizationMiddleware : Middleware
{
    public override bool Handle(HttpRequest request)
    {
        if (string.IsNullOrEmpty(request.Role))
        {
            Console.WriteLine("授权失败: 缺少角色信息");
            return false;
        }
        
        Console.WriteLine($"授权通过: Role = {request.Role}");
        return _next?.Handle(request) ?? true;
    }
}

public class LoggingMiddleware : Middleware
{
    public override bool Handle(HttpRequest request)
    {
        Console.WriteLine($"日志: 请求路径 = {request.Path}, 时间 = {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
        return _next?.Handle(request) ?? true;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 责任链模式示例 ===\n");
        
        Console.WriteLine("场景1: 问题处理链\n");
        
        var low = new LowLevelHandler();
        var mid = new MidLevelHandler();
        var high = new HighLevelHandler();
        
        low.SetNext(mid).SetNext(high);
        
        Console.WriteLine("--- 处理简单问题 ---");
        low.Handle("简单问题");
        
        Console.WriteLine("\n--- 处理中等问题 ---");
        low.Handle("中等问题");
        
        Console.WriteLine("\n--- 处理复杂问题 ---");
        low.Handle("复杂问题");
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景2: 采购审批流程\n");
        
        var manager = new Manager("张经理");
        var director = new Director("李总监");
        var ceo = new CEO("王CEO");
        
        manager.SetNext(director).SetNext(ceo);
        
        Console.WriteLine("--- 采购申请 ¥5,000 ---");
        manager.ProcessRequest(new PurchaseRequest(5000, "办公用品"));
        
        Console.WriteLine("\n--- 采购申请 ¥30,000 ---");
        manager.ProcessRequest(new PurchaseRequest(30000, "服务器设备"));
        
        Console.WriteLine("\n--- 采购申请 ¥100,000 ---");
        manager.ProcessRequest(new PurchaseRequest(100000, "公司车辆"));
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景3: HTTP请求处理中间件\n");
        
        var auth = new AuthenticationMiddleware();
        var authorize = new AuthorizationMiddleware();
        var logging = new LoggingMiddleware();
        
        auth.Use(authorize).Use(logging);
        
        Console.WriteLine("--- 有效请求 ---");
        var validRequest = new HttpRequest
        {
            Token = "abc123",
            Role = "admin",
            Path = "/api/users"
        };
        auth.Handle(validRequest);
        
        Console.WriteLine("\n--- 无效请求(缺少Token) ---");
        var invalidRequest = new HttpRequest
        {
            Role = "user",
            Path = "/api/data"
        };
        auth.Handle(invalidRequest);
        
        Console.WriteLine("\n责任链模式优点:");
        Console.WriteLine("- 解耦请求发送者和接收者");
        Console.WriteLine("- 简化对象间的连接");
        Console.WriteLine("- 动态调整处理链");
        Console.WriteLine("- 符合单一职责原则");
    }
}

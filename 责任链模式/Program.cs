/**
 * 责任链模式 (Chain of Responsibility Pattern)
 * 
 * 定义：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。
 *       将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
 * 
 * 核心角色：
 * 1. 抽象处理者(Handler) - 定义一个处理请求的接口，并设置后继者
 * 2. 具体处理者(Concrete Handler) - 处理它所负责的请求，可访问它的后继者
 * 3. 客户端(Client) - 向链上的具体处理者对象提交请求
 * 
 * 适用场景：
 * - 有多个对象可以处理一个请求，哪个对象处理由运行时决定
 * - 在不明确指定接收者的情况下，向多个对象中的一个提交请求
 * - 可动态指定一组对象处理请求
 * 
 * 本示例展示了三个场景：
 * 1. 问题处理链 - 不同级别处理不同问题
 * 2. 采购审批流程 - 根据金额级别审批
 * 3. HTTP请求处理中间件 - 请求预处理链
 */

namespace 责任链模式;

#region 场景1: 问题处理链

/// <summary>
/// 抽象处理者 - 定义处理接口和后继者设置
/// </summary>
public abstract class Handler
{
    protected Handler? _nextHandler;
    
    /// <summary>
    /// 设置下一个处理者 - 支持链式调用
    /// </summary>
    public Handler SetNext(Handler handler)
    {
        _nextHandler = handler;
        return handler;
    }
    
    /// <summary>
    /// 处理请求的抽象方法
    /// </summary>
    /// <param name="request">请求内容</param>
    /// <returns>是否处理成功</returns>
    public abstract bool Handle(string request);
}

/// <summary>
/// 具体处理者 - 低级处理者
/// </summary>
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

/// <summary>
/// 具体处理者 - 中级处理者
/// </summary>
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

/// <summary>
/// 具体处理者 - 高级处理者
/// </summary>
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

#endregion

#region 场景2: 采购审批流程

/// <summary>
/// 请求类 - 采购申请
/// </summary>
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

/// <summary>
/// 抽象处理者 - 审批者
/// </summary>
public abstract class Approver
{
    protected Approver? _nextApprover;
    protected readonly string _name;
    
    public Approver(string name)
    {
        _name = name;
    }
    
    /// <summary>
    /// 设置下一级审批者
    /// </summary>
    public Approver SetNext(Approver approver)
    {
        _nextApprover = approver;
        return approver;
    }
    
    /// <summary>
    /// 处理采购申请
    /// </summary>
    public abstract void ProcessRequest(PurchaseRequest request);
}

/// <summary>
/// 具体处理者 - 经理（审批限额 10000）
/// </summary>
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

/// <summary>
/// 具体处理者 - 总监（审批限额 50000）
/// </summary>
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

/// <summary>
/// 具体处理者 - CEO（无审批限额）
/// </summary>
public class CEO : Approver
{
    public CEO(string name) : base(name) { }
    
    public override void ProcessRequest(PurchaseRequest request)
    {
        Console.WriteLine($"CEO [{_name}] 批准采购请求: {request.Description}, 金额: ¥{request.Amount}");
    }
}

#endregion

#region 场景3: HTTP请求处理中间件

/// <summary>
/// 请求类 - HTTP请求
/// </summary>
public class HttpRequest
{
    public string? Token { get; set; }
    public string? Role { get; set; }
    public string Path { get; set; } = string.Empty;
}

/// <summary>
/// 抽象处理者 - 中间件
/// 
/// 关键点：
/// - 类似 ASP.NET Core 的中间件管道
/// - 每个中间件可以决定是否继续传递请求
/// </summary>
public abstract class Middleware
{
    protected Middleware? _next;
    
    /// <summary>
    /// 设置下一个中间件
    /// </summary>
    public Middleware Use(Middleware middleware)
    {
        _next = middleware;
        return middleware;
    }
    
    /// <summary>
    /// 处理请求
    /// </summary>
    public abstract bool Handle(HttpRequest request);
}

/// <summary>
/// 具体处理者 - 认证中间件
/// </summary>
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

/// <summary>
/// 具体处理者 - 授权中间件
/// </summary>
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

/// <summary>
/// 具体处理者 - 日志中间件
/// </summary>
public class LoggingMiddleware : Middleware
{
    public override bool Handle(HttpRequest request)
    {
        Console.WriteLine($"日志: 请求路径 = {request.Path}, 时间 = {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
        return _next?.Handle(request) ?? true;
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 责任链模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 问题处理链\n");
        
        var low = new LowLevelHandler();
        var mid = new MidLevelHandler();
        var high = new HighLevelHandler();
        
        // 构建责任链
        low.SetNext(mid).SetNext(high);
        
        Console.WriteLine("--- 处理简单问题 ---");
        low.Handle("简单问题");
        
        Console.WriteLine("\n--- 处理中等问题 ---");
        low.Handle("中等问题");
        
        Console.WriteLine("\n--- 处理复杂问题 ---");
        low.Handle("复杂问题");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 采购审批流程\n");
        
        var manager = new Manager("张经理");
        var director = new Director("李总监");
        var ceo = new CEO("王CEO");
        
        // 构建审批链
        manager.SetNext(director).SetNext(ceo);
        
        Console.WriteLine("--- 采购申请 ¥5,000 ---");
        manager.ProcessRequest(new PurchaseRequest(5000, "办公用品"));
        
        Console.WriteLine("\n--- 采购申请 ¥30,000 ---");
        manager.ProcessRequest(new PurchaseRequest(30000, "服务器设备"));
        
        Console.WriteLine("\n--- 采购申请 ¥100,000 ---");
        manager.ProcessRequest(new PurchaseRequest(100000, "公司车辆"));
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: HTTP请求处理中间件\n");
        
        var auth = new AuthenticationMiddleware();
        var authorize = new AuthorizationMiddleware();
        var logging = new LoggingMiddleware();
        
        // 构建中间件管道
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
        #endregion
        
        Console.WriteLine("\n责任链模式优点:");
        Console.WriteLine("- 解耦请求发送者和接收者");
        Console.WriteLine("- 简化对象间的连接");
        Console.WriteLine("- 动态调整处理链");
        Console.WriteLine("- 符合单一职责原则");
    }
}

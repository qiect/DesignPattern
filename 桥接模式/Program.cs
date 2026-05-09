/**
 * 桥接模式 (Bridge Pattern)
 * 
 * 定义：将抽象部分与它的实现部分分离，使它们都可以独立地变化。
 * 
 * 核心角色：
 * 1. 抽象化(Abstraction) - 定义抽象接口，持有实现化对象的引用
 * 2. 扩展抽象化(Refined Abstraction) - 扩展抽象化接口
 * 3. 实现化(Implementor) - 定义实现化接口
 * 4. 具体实现化(Concrete Implementor) - 实现实现化接口
 * 
 * 适用场景：
 * - 需要在抽象化和实现化之间增加更多灵活性
 * - 不希望抽象和实现之间有固定的绑定关系
 * - 一个类存在两个独立变化的维度
 * 
 * 本示例展示了两个场景：
 * 1. 图形渲染系统 - 形状与渲染器分离
 * 2. 消息发送系统 - 消息类型与发送方式分离
 */

namespace 桥接模式;

#region 场景1: 图形渲染系统

/// <summary>
/// 实现化接口 - 渲染器
/// 定义渲染操作的接口
/// </summary>
public interface IRenderer
{
    void RenderCircle(float radius);
    void RenderSquare(float side);
}

/// <summary>
/// 具体实现化 - 矢量渲染器
/// </summary>
public class VectorRenderer : IRenderer
{
    public void RenderCircle(float radius)
    {
        Console.WriteLine($"矢量渲染: 绘制半径为 {radius} 的圆形");
    }
    
    public void RenderSquare(float side)
    {
        Console.WriteLine($"矢量渲染: 绘制边长为 {side} 的正方形");
    }
}

/// <summary>
/// 具体实现化 - 栅格渲染器
/// </summary>
public class RasterRenderer : IRenderer
{
    public void RenderCircle(float radius)
    {
        Console.WriteLine($"栅格渲染: 绘制半径为 {radius} 的圆形");
    }
    
    public void RenderSquare(float side)
    {
        Console.WriteLine($"栅格渲染: 绘制边长为 {side} 的正方形");
    }
}

/// <summary>
/// 抽象化 - 形状基类
/// 持有渲染器的引用，将绘制操作委托给渲染器
/// 
/// 关键点：
/// - 抽象部分（形状）与实现部分（渲染器）分离
/// - 可以独立扩展形状类型和渲染方式
/// </summary>
public abstract class Shape
{
    protected IRenderer Renderer;
    
    protected Shape(IRenderer renderer)
    {
        Renderer = renderer;
    }
    
    public abstract void Draw();
}

/// <summary>
/// 扩展抽象化 - 圆形
/// </summary>
public class Circle : Shape
{
    private readonly float _radius;
    
    public Circle(IRenderer renderer, float radius) : base(renderer)
    {
        _radius = radius;
    }
    
    public override void Draw()
    {
        Renderer.RenderCircle(_radius);
    }
}

/// <summary>
/// 扩展抽象化 - 正方形
/// </summary>
public class Square : Shape
{
    private readonly float _side;
    
    public Square(IRenderer renderer, float side) : base(renderer)
    {
        _side = side;
    }
    
    public override void Draw()
    {
        Renderer.RenderSquare(_side);
    }
}

#endregion

#region 场景2: 消息发送系统

/// <summary>
/// 实现化接口 - 消息发送器
/// </summary>
public interface IMessageSender
{
    void SendMessage(string to, string message);
}

/// <summary>
/// 具体实现化 - 邮件发送器
/// </summary>
public class EmailSender : IMessageSender
{
    public void SendMessage(string to, string message)
    {
        Console.WriteLine($"[邮件] 发送到 {to}: {message}");
    }
}

/// <summary>
/// 具体实现化 - 短信发送器
/// </summary>
public class SmsSender : IMessageSender
{
    public void SendMessage(string to, string message)
    {
        Console.WriteLine($"[短信] 发送到 {to}: {message}");
    }
}

/// <summary>
/// 具体实现化 - 微信发送器
/// </summary>
public class WeChatSender : IMessageSender
{
    public void SendMessage(string to, string message)
    {
        Console.WriteLine($"[微信] 发送到 {to}: {message}");
    }
}

/// <summary>
/// 抽象化 - 消息基类
/// 持有消息发送器的引用
/// </summary>
public abstract class Message
{
    protected IMessageSender Sender;
    
    protected Message(IMessageSender sender)
    {
        Sender = sender;
    }
    
    public abstract void Send(string to, string content);
}

/// <summary>
/// 扩展抽象化 - 文本消息
/// </summary>
public class TextMessage : Message
{
    public TextMessage(IMessageSender sender) : base(sender) { }
    
    public override void Send(string to, string content)
    {
        Console.WriteLine("发送文本消息:");
        Sender.SendMessage(to, content);
    }
}

/// <summary>
/// 扩展抽象化 - 告警消息
/// </summary>
public class AlertMessage : Message
{
    public AlertMessage(IMessageSender sender) : base(sender) { }
    
    public override void Send(string to, string content)
    {
        Console.WriteLine("发送告警消息:");
        Sender.SendMessage(to, $"[告警] {content}");
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 桥接模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 图形渲染系统\n");
        
        IRenderer vectorRenderer = new VectorRenderer();
        IRenderer rasterRenderer = new RasterRenderer();
        
        Console.WriteLine("--- 矢量渲染 ---");
        var vectorCircle = new Circle(vectorRenderer, 5.0f);
        var vectorSquare = new Square(vectorRenderer, 4.0f);
        vectorCircle.Draw();
        vectorSquare.Draw();
        
        Console.WriteLine("\n--- 栅格渲染 ---");
        var rasterCircle = new Circle(rasterRenderer, 5.0f);
        var rasterSquare = new Square(rasterRenderer, 4.0f);
        rasterCircle.Draw();
        rasterSquare.Draw();
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 消息发送系统\n");
        
        IMessageSender emailSender = new EmailSender();
        IMessageSender smsSender = new SmsSender();
        IMessageSender wechatSender = new WeChatSender();
        
        Console.WriteLine("--- 文本消息 ---");
        var textEmail = new TextMessage(emailSender);
        var textSms = new TextMessage(smsSender);
        var textWechat = new TextMessage(wechatSender);
        
        textEmail.Send("user@example.com", "您的订单已发货");
        textSms.Send("13800138000", "您的订单已发货");
        textWechat.Send("wx_user_001", "您的订单已发货");
        
        Console.WriteLine("\n--- 告警消息 ---");
        var alertEmail = new AlertMessage(emailSender);
        var alertSms = new AlertMessage(smsSender);
        
        alertEmail.Send("admin@example.com", "服务器CPU使用率超过90%");
        alertSms.Send("13900139000", "数据库连接数达到上限");
        #endregion
        
        Console.WriteLine("\n桥接模式优点:");
        Console.WriteLine("- 分离抽象接口及其实现部分");
        Console.WriteLine("- 提高系统的可扩展性");
        Console.WriteLine("- 实现细节对客户端透明");
        Console.WriteLine("- 符合开闭原则和合成复用原则");
    }
}

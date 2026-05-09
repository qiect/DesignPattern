namespace 桥接模式;

public interface IRenderer
{
    void RenderCircle(float radius);
    void RenderSquare(float side);
}

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

public abstract class Shape
{
    protected IRenderer Renderer;
    
    protected Shape(IRenderer renderer)
    {
        Renderer = renderer;
    }
    
    public abstract void Draw();
}

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

public interface IMessageSender
{
    void SendMessage(string to, string message);
}

public class EmailSender : IMessageSender
{
    public void SendMessage(string to, string message)
    {
        Console.WriteLine($"[邮件] 发送到 {to}: {message}");
    }
}

public class SmsSender : IMessageSender
{
    public void SendMessage(string to, string message)
    {
        Console.WriteLine($"[短信] 发送到 {to}: {message}");
    }
}

public class WeChatSender : IMessageSender
{
    public void SendMessage(string to, string message)
    {
        Console.WriteLine($"[微信] 发送到 {to}: {message}");
    }
}

public abstract class Message
{
    protected IMessageSender Sender;
    
    protected Message(IMessageSender sender)
    {
        Sender = sender;
    }
    
    public abstract void Send(string to, string content);
}

public class TextMessage : Message
{
    public TextMessage(IMessageSender sender) : base(sender) { }
    
    public override void Send(string to, string content)
    {
        Console.WriteLine("发送文本消息:");
        Sender.SendMessage(to, content);
    }
}

public class AlertMessage : Message
{
    public AlertMessage(IMessageSender sender) : base(sender) { }
    
    public override void Send(string to, string content)
    {
        Console.WriteLine("发送告警消息:");
        Sender.SendMessage(to, $"[告警] {content}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 桥接模式示例 ===\n");
        
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
        
        Console.WriteLine("\n----------------------------------------\n");
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
        
        Console.WriteLine("\n桥接模式优点:");
        Console.WriteLine("- 分离抽象接口及其实现部分");
        Console.WriteLine("- 提高系统的可扩展性");
        Console.WriteLine("- 实现细节对客户端透明");
        Console.WriteLine("- 符合开闭原则和合成复用原则");
    }
}

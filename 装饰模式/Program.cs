namespace 装饰模式;

public interface ICoffee
{
    string GetDescription();
    decimal GetCost();
}

public class SimpleCoffee : ICoffee
{
    public string GetDescription() => "简单咖啡";
    public decimal GetCost() => 10.0m;
}

public abstract class CoffeeDecorator : ICoffee
{
    protected ICoffee _coffee;
    
    protected CoffeeDecorator(ICoffee coffee)
    {
        _coffee = coffee;
    }
    
    public abstract string GetDescription();
    public abstract decimal GetCost();
}

public class MilkDecorator : CoffeeDecorator
{
    public MilkDecorator(ICoffee coffee) : base(coffee) { }
    
    public override string GetDescription()
    {
        return $"{_coffee.GetDescription()} + 牛奶";
    }
    
    public override decimal GetCost()
    {
        return _coffee.GetCost() + 3.0m;
    }
}

public class SugarDecorator : CoffeeDecorator
{
    public SugarDecorator(ICoffee coffee) : base(coffee) { }
    
    public override string GetDescription()
    {
        return $"{_coffee.GetDescription()} + 糖";
    }
    
    public override decimal GetCost()
    {
        return _coffee.GetCost() + 1.0m;
    }
}

public class WhipDecorator : CoffeeDecorator
{
    public WhipDecorator(ICoffee coffee) : base(coffee) { }
    
    public override string GetDescription()
    {
        return $"{_coffee.GetDescription()} + 奶油";
    }
    
    public override decimal GetCost()
    {
        return _coffee.GetCost() + 5.0m;
    }
}

public interface INotifier
{
    void Send(string message);
}

public class EmailNotifier : INotifier
{
    public void Send(string message)
    {
        Console.WriteLine($"[邮件] {message}");
    }
}

public abstract class NotifierDecorator : INotifier
{
    protected INotifier _notifier;
    
    protected NotifierDecorator(INotifier notifier)
    {
        _notifier = notifier;
    }
    
    public abstract void Send(string message);
}

public class SmsNotifierDecorator : NotifierDecorator
{
    public SmsNotifierDecorator(INotifier notifier) : base(notifier) { }
    
    public override void Send(string message)
    {
        _notifier.Send(message);
        Console.WriteLine($"[短信] {message}");
    }
}

public class WeChatNotifierDecorator : NotifierDecorator
{
    public WeChatNotifierDecorator(INotifier notifier) : base(notifier) { }
    
    public override void Send(string message)
    {
        _notifier.Send(message);
        Console.WriteLine($"[微信] {message}");
    }
}

public class LogNotifierDecorator : NotifierDecorator
{
    public LogNotifierDecorator(INotifier notifier) : base(notifier) { }
    
    public override void Send(string message)
    {
        Console.WriteLine($"[日志] 记录消息: {message} - {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
        _notifier.Send(message);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 装饰模式示例 ===\n");
        
        Console.WriteLine("场景1: 咖啡订单系统\n");
        
        ICoffee coffee = new SimpleCoffee();
        Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        
        coffee = new MilkDecorator(coffee);
        Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        
        coffee = new SugarDecorator(coffee);
        Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        
        coffee = new WhipDecorator(coffee);
        Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        
        Console.WriteLine("\n--- 另一种组合 ---");
        ICoffee anotherCoffee = new SimpleCoffee();
        anotherCoffee = new WhipDecorator(new MilkDecorator(anotherCoffee));
        Console.WriteLine($"{anotherCoffee.GetDescription()} - ¥{anotherCoffee.GetCost()}");
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景2: 通知系统\n");
        
        INotifier notifier = new EmailNotifier();
        Console.WriteLine("--- 仅邮件通知 ---");
        notifier.Send("您的订单已发货");
        
        Console.WriteLine("\n--- 邮件 + 短信通知 ---");
        notifier = new SmsNotifierDecorator(new EmailNotifier());
        notifier.Send("您的订单已签收");
        
        Console.WriteLine("\n--- 邮件 + 短信 + 微信通知 ---");
        notifier = new WeChatNotifierDecorator(
            new SmsNotifierDecorator(new EmailNotifier()));
        notifier.Send("您的账户余额不足");
        
        Console.WriteLine("\n--- 带日志的通知 ---");
        notifier = new LogNotifierDecorator(
            new SmsNotifierDecorator(new EmailNotifier()));
        notifier.Send("系统维护通知");
        
        Console.WriteLine("\n装饰模式优点:");
        Console.WriteLine("- 动态地给对象添加额外职责");
        Console.WriteLine("- 比继承更灵活,避免类爆炸");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 可以组合多个装饰器");
    }
}

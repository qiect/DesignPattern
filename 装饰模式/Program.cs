/**
 * 装饰模式 (Decorator Pattern)
 * 
 * 定义：动态地给一个对象增加一些额外的职责，就增加功能来说，装饰模式比生成子类更为灵活。
 * 
 * 核心角色：
 * 1. 抽象构件(Component) - 定义对象的接口
 * 2. 具体构件(Concrete Component) - 定义具体对象
 * 3. 抽象装饰(Decorator) - 持有构件引用，实现构件接口
 * 4. 具体装饰(Concrete Decorator) - 给构件添加职责
 * 
 * 适用场景：
 * - 需要动态地给对象添加功能
 * - 需要组合多种功能
 * - 不能使用继承进行扩展（如final类）
 * 
 * 本示例展示了两个场景：
 * 1. 咖啡订单系统 - 动态添加配料
 * 2. 通知系统 - 多渠道通知组合
 */

namespace 装饰模式;

#region 场景1: 咖啡订单系统

/// <summary>
/// 抽象构件 - 咖啡接口
/// </summary>
public interface ICoffee
{
    string GetDescription();
    decimal GetCost();
}

/// <summary>
/// 具体构件 - 简单咖啡
/// 基础咖啡，可以被装饰
/// </summary>
public class SimpleCoffee : ICoffee
{
    public string GetDescription() => "简单咖啡";
    public decimal GetCost() => 10.0m;
}

/// <summary>
/// 抽象装饰 - 咖啡装饰器基类
/// 持有ICoffee引用，实现ICoffee接口
/// 
/// 关键点：
/// - 装饰器与具体构件实现相同接口
/// - 可以包装其他装饰器，形成装饰链
/// </summary>
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

/// <summary>
/// 具体装饰 - 牛奶装饰器
/// 给咖啡添加牛奶
/// </summary>
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

/// <summary>
/// 具体装饰 - 糖装饰器
/// 给咖啡添加糖
/// </summary>
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

/// <summary>
/// 具体装饰 - 奶油装饰器
/// 给咖啡添加奶油
/// </summary>
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

#endregion

#region 场景2: 通知系统

/// <summary>
/// 抽象构件 - 通知器接口
/// </summary>
public interface INotifier
{
    void Send(string message);
}

/// <summary>
/// 具体构件 - 邮件通知器
/// </summary>
public class EmailNotifier : INotifier
{
    public void Send(string message)
    {
        Console.WriteLine($"[邮件] {message}");
    }
}

/// <summary>
/// 抽象装饰 - 通知器装饰器基类
/// </summary>
public abstract class NotifierDecorator : INotifier
{
    protected INotifier _notifier;
    
    protected NotifierDecorator(INotifier notifier)
    {
        _notifier = notifier;
    }
    
    public abstract void Send(string message);
}

/// <summary>
/// 具体装饰 - 短信通知装饰器
/// 在原有通知基础上增加短信通知
/// </summary>
public class SmsNotifierDecorator : NotifierDecorator
{
    public SmsNotifierDecorator(INotifier notifier) : base(notifier) { }
    
    public override void Send(string message)
    {
        _notifier.Send(message);
        Console.WriteLine($"[短信] {message}");
    }
}

/// <summary>
/// 具体装饰 - 微信通知装饰器
/// 在原有通知基础上增加微信通知
/// </summary>
public class WeChatNotifierDecorator : NotifierDecorator
{
    public WeChatNotifierDecorator(INotifier notifier) : base(notifier) { }
    
    public override void Send(string message)
    {
        _notifier.Send(message);
        Console.WriteLine($"[微信] {message}");
    }
}

/// <summary>
/// 具体装饰 - 日志装饰器
/// 在发送通知前记录日志
/// </summary>
public class LogNotifierDecorator : NotifierDecorator
{
    public LogNotifierDecorator(INotifier notifier) : base(notifier) { }
    
    public override void Send(string message)
    {
        Console.WriteLine($"[日志] 记录消息: {message} - {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
        _notifier.Send(message);
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 装饰模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 咖啡订单系统\n");
        
        // 逐步添加装饰
        ICoffee coffee = new SimpleCoffee();
        Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        
        coffee = new MilkDecorator(coffee);
        Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        
        coffee = new SugarDecorator(coffee);
        Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        
        coffee = new WhipDecorator(coffee);
        Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        
        Console.WriteLine("\n--- 另一种组合 ---");
        // 一次性组合多个装饰器
        ICoffee anotherCoffee = new SimpleCoffee();
        anotherCoffee = new WhipDecorator(new MilkDecorator(anotherCoffee));
        Console.WriteLine($"{anotherCoffee.GetDescription()} - ¥{anotherCoffee.GetCost()}");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
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
        #endregion
        
        Console.WriteLine("\n装饰模式优点:");
        Console.WriteLine("- 动态地给对象添加额外职责");
        Console.WriteLine("- 比继承更灵活,避免类爆炸");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 可以组合多个装饰器");
    }
}

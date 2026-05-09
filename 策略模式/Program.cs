/**
 * 策略模式 (Strategy Pattern)
 * 
 * 定义：定义一系列算法，把它们封装起来，并使它们可以互相替换。
 *       策略模式让算法独立于使用它的客户端而变化。
 * 
 * 核心角色：
 * 1. 抽象策略(Strategy) - 定义算法的公共接口
 * 2. 具体策略(Concrete Strategy) - 实现具体的算法
 * 3. 上下文(Context) - 持有策略引用，调用策略执行算法
 * 
 * 适用场景：
 * - 需要在运行时选择算法
 * - 有多种方式完成同一任务
 * - 避免使用多重条件判断语句
 * 
 * 本示例场景：电商购物车价格计算，不同会员等级享受不同折扣
 */

namespace 策略模式;

/// <summary>
/// 抽象策略接口 - 定义折扣计算的公共接口
/// 所有具体的折扣策略都必须实现此接口
/// </summary>
public interface IDiscountStrategy
{
    /// <summary>
    /// 计算折扣后的价格
    /// </summary>
    /// <param name="originalPrice">原始价格</param>
    /// <returns>折扣后的价格</returns>
    decimal CalculateDiscount(decimal originalPrice);
    
    /// <summary>
    /// 获取策略名称（用于展示）
    /// </summary>
    string GetStrategyName();
}

/// <summary>
/// 具体策略：普通会员折扣策略
/// 享受95折优惠
/// </summary>
public class NormalDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice)
    {
        return originalPrice * 0.95m;
    }
    
    public string GetStrategyName() => "普通会员折扣(95折)";
}

/// <summary>
/// 具体策略：银牌会员折扣策略
/// 享受9折优惠
/// </summary>
public class SilverDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice)
    {
        return originalPrice * 0.90m;
    }
    
    public string GetStrategyName() => "银牌会员折扣(9折)";
}

/// <summary>
/// 具体策略：金牌会员折扣策略
/// 享受85折优惠
/// </summary>
public class GoldDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice)
    {
        return originalPrice * 0.85m;
    }
    
    public string GetStrategyName() => "金牌会员折扣(85折)";
}

/// <summary>
/// 具体策略：白金会员折扣策略
/// 享受8折优惠
/// </summary>
public class PlatinumDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice)
    {
        return originalPrice * 0.80m;
    }
    
    public string GetStrategyName() => "白金会员折扣(8折)";
}

/// <summary>
/// 上下文类 - 价格计算器
/// 持有折扣策略的引用，负责调用策略计算最终价格
/// 
/// 关键点：
/// - 通过构造函数或 SetStrategy 方法注入策略
/// - 客户端无需知道具体策略的实现细节
/// - 可以在运行时动态切换策略
/// </summary>
public class PriceCalculator
{
    /// <summary>
    /// 当前使用的折扣策略
    /// </summary>
    private IDiscountStrategy _discountStrategy;
    
    /// <summary>
    /// 构造函数 - 通过依赖注入初始化策略
    /// </summary>
    /// <param name="discountStrategy">初始折扣策略</param>
    public PriceCalculator(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }
    
    /// <summary>
    /// 设置新的折扣策略 - 实现运行时策略切换
    /// </summary>
    /// <param name="discountStrategy">新的折扣策略</param>
    public void SetStrategy(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }
    
    /// <summary>
    /// 计算最终价格 - 调用策略执行具体计算
    /// </summary>
    /// <param name="originalPrice">原始价格</param>
    /// <returns>折扣后的最终价格</returns>
    public decimal CalculateFinalPrice(decimal originalPrice)
    {
        Console.WriteLine($"使用策略: {_discountStrategy.GetStrategyName()}");
        Console.WriteLine($"原价: {originalPrice:C}");
        var finalPrice = _discountStrategy.CalculateDiscount(originalPrice);
        Console.WriteLine($"折后价: {finalPrice:C}");
        return finalPrice;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 策略模式示例 ===\n");
        
        // 初始化价格计算器，使用普通会员策略
        var calculator = new PriceCalculator(new NormalDiscountStrategy());
        
        Console.WriteLine("场景: 电商购物车价格计算\n");
        
        Console.WriteLine("--- 订单1 ---");
        calculator.CalculateFinalPrice(1000);
        
        Console.WriteLine("\n--- 订单2 (升级为银牌会员) ---");
        // 运行时切换策略：普通会员 -> 银牌会员
        calculator.SetStrategy(new SilverDiscountStrategy());
        calculator.CalculateFinalPrice(1000);
        
        Console.WriteLine("\n--- 订单3 (升级为金牌会员) ---");
        // 运行时切换策略：银牌会员 -> 金牌会员
        calculator.SetStrategy(new GoldDiscountStrategy());
        calculator.CalculateFinalPrice(1000);
        
        Console.WriteLine("\n--- 订单4 (升级为白金会员) ---");
        // 运行时切换策略：金牌会员 -> 白金会员
        calculator.SetStrategy(new PlatinumDiscountStrategy());
        calculator.CalculateFinalPrice(1000);
        
        Console.WriteLine("\n策略模式优点:");
        Console.WriteLine("- 算法可以自由切换");
        Console.WriteLine("- 避免使用多重条件判断");
        Console.WriteLine("- 扩展性良好,符合开闭原则");
        Console.WriteLine("- 易于维护和测试");
    }
}

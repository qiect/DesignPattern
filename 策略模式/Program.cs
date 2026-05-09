namespace 策略模式;

public interface IDiscountStrategy
{
    decimal CalculateDiscount(decimal originalPrice);
    string GetStrategyName();
}

public class NormalDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice)
    {
        return originalPrice * 0.95m;
    }
    
    public string GetStrategyName() => "普通会员折扣(95折)";
}

public class SilverDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice)
    {
        return originalPrice * 0.90m;
    }
    
    public string GetStrategyName() => "银牌会员折扣(9折)";
}

public class GoldDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice)
    {
        return originalPrice * 0.85m;
    }
    
    public string GetStrategyName() => "金牌会员折扣(85折)";
}

public class PlatinumDiscountStrategy : IDiscountStrategy
{
    public decimal CalculateDiscount(decimal originalPrice)
    {
        return originalPrice * 0.80m;
    }
    
    public string GetStrategyName() => "白金会员折扣(8折)";
}

public class PriceCalculator
{
    private IDiscountStrategy _discountStrategy;
    
    public PriceCalculator(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }
    
    public void SetStrategy(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }
    
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
        
        var calculator = new PriceCalculator(new NormalDiscountStrategy());
        
        Console.WriteLine("场景: 电商购物车价格计算\n");
        
        Console.WriteLine("--- 订单1 ---");
        calculator.CalculateFinalPrice(1000);
        
        Console.WriteLine("\n--- 订单2 (升级为银牌会员) ---");
        calculator.SetStrategy(new SilverDiscountStrategy());
        calculator.CalculateFinalPrice(1000);
        
        Console.WriteLine("\n--- 订单3 (升级为金牌会员) ---");
        calculator.SetStrategy(new GoldDiscountStrategy());
        calculator.CalculateFinalPrice(1000);
        
        Console.WriteLine("\n--- 订单4 (升级为白金会员) ---");
        calculator.SetStrategy(new PlatinumDiscountStrategy());
        calculator.CalculateFinalPrice(1000);
        
        Console.WriteLine("\n策略模式优点:");
        Console.WriteLine("- 算法可以自由切换");
        Console.WriteLine("- 避免使用多重条件判断");
        Console.WriteLine("- 扩展性良好,符合开闭原则");
        Console.WriteLine("- 易于维护和测试");
    }
}

/**
 * 解释器模式 (Interpreter Pattern)
 * 
 * 定义：给定一个语言，定义它的文法的一种表示，并定义一个解释器，
 *       这个解释器使用该表示来解释语言中的句子。
 * 
 * 核心角色：
 * 1. 抽象表达式(AbstractExpression) - 声明抽象的解释操作
 * 2. 终结符表达式(TerminalExpression) - 实现与文法中终结符相关的解释操作
 * 3. 非终结符表达式(NonterminalExpression) - 实现与文法中非终结符相关的解释操作
 * 4. 上下文(Context) - 包含解释器之外的全局信息
 * 5. 客户端(Client) - 构建抽象语法树，调用解释操作
 * 
 * 适用场景：
 * - 需要将一个语言解释执行
 * - 简单语法规则的场景
 * - 需要自定义语法的场景
 * 
 * 本示例展示了三个场景：
 * 1. 简单数学表达式解释器 - 加减法运算
 * 2. 布尔表达式解释器 - 逻辑运算
 * 3. 日期表达式解释器 - 日期计算
 */

namespace 解释器模式;

#region 场景1: 简单数学表达式解释器

/// <summary>
/// 上下文 - 表达式上下文
/// </summary>
public class Context
{
    public Dictionary<string, int> Variables { get; } = new();
    
    public int GetVariable(string name)
    {
        return Variables.TryGetValue(name, out var value) ? value : 0;
    }
    
    public void SetVariable(string name, int value)
    {
        Variables[name] = value;
    }
}

/// <summary>
/// 抽象表达式 - 表达式接口
/// </summary>
public interface IExpression
{
    int Interpret(Context context);
}

/// <summary>
/// 终结符表达式 - 数字常量
/// </summary>
public class NumberExpression : IExpression
{
    private readonly int _value;
    
    public NumberExpression(int value)
    {
        _value = value;
    }
    
    public int Interpret(Context context)
    {
        return _value;
    }
    
    public override string ToString() => _value.ToString();
}

/// <summary>
/// 终结符表达式 - 变量
/// </summary>
public class VariableExpression : IExpression
{
    private readonly string _name;
    
    public VariableExpression(string name)
    {
        _name = name;
    }
    
    public int Interpret(Context context)
    {
        return context.GetVariable(_name);
    }
    
    public override string ToString() => _name;
}

/// <summary>
/// 非终结符表达式 - 加法
/// </summary>
public class AddExpression : IExpression
{
    private readonly IExpression _left;
    private readonly IExpression _right;
    
    public AddExpression(IExpression left, IExpression right)
    {
        _left = left;
        _right = right;
    }
    
    public int Interpret(Context context)
    {
        return _left.Interpret(context) + _right.Interpret(context);
    }
    
    public override string ToString() => $"({_left} + {_right})";
}

/// <summary>
/// 非终结符表达式 - 减法
/// </summary>
public class SubtractExpression : IExpression
{
    private readonly IExpression _left;
    private readonly IExpression _right;
    
    public SubtractExpression(IExpression left, IExpression right)
    {
        _left = left;
        _right = right;
    }
    
    public int Interpret(Context context)
    {
        return _left.Interpret(context) - _right.Interpret(context);
    }
    
    public override string ToString() => $"({_left} - {_right})";
}

/// <summary>
/// 非终结符表达式 - 乘法
/// </summary>
public class MultiplyExpression : IExpression
{
    private readonly IExpression _left;
    private readonly IExpression _right;
    
    public MultiplyExpression(IExpression left, IExpression right)
    {
        _left = left;
        _right = right;
    }
    
    public int Interpret(Context context)
    {
        return _left.Interpret(context) * _right.Interpret(context);
    }
    
    public override string ToString() => $"({_left} * {_right})";
}

#endregion

#region 场景2: 布尔表达式解释器

/// <summary>
/// 抽象表达式 - 布尔表达式接口
/// </summary>
public interface IBooleanExpression
{
    bool Evaluate(Dictionary<string, bool> context);
}

/// <summary>
/// 终结符表达式 - 布尔变量
/// </summary>
public class BooleanVariable : IBooleanExpression
{
    private readonly string _name;
    
    public BooleanVariable(string name)
    {
        _name = name;
    }
    
    public bool Evaluate(Dictionary<string, bool> context)
    {
        return context.TryGetValue(_name, out var value) && value;
    }
    
    public override string ToString() => _name;
}

/// <summary>
/// 非终结符表达式 - 与运算
/// </summary>
public class AndExpression : IBooleanExpression
{
    private readonly IBooleanExpression _left;
    private readonly IBooleanExpression _right;
    
    public AndExpression(IBooleanExpression left, IBooleanExpression right)
    {
        _left = left;
        _right = right;
    }
    
    public bool Evaluate(Dictionary<string, bool> context)
    {
        return _left.Evaluate(context) && _right.Evaluate(context);
    }
    
    public override string ToString() => $"({_left} AND {_right})";
}

/// <summary>
/// 非终结符表达式 - 或运算
/// </summary>
public class OrExpression : IBooleanExpression
{
    private readonly IBooleanExpression _left;
    private readonly IBooleanExpression _right;
    
    public OrExpression(IBooleanExpression left, IBooleanExpression right)
    {
        _left = left;
        _right = right;
    }
    
    public bool Evaluate(Dictionary<string, bool> context)
    {
        return _left.Evaluate(context) || _right.Evaluate(context);
    }
    
    public override string ToString() => $"({_left} OR {_right})";
}

/// <summary>
/// 非终结符表达式 - 非运算
/// </summary>
public class NotExpression : IBooleanExpression
{
    private readonly IBooleanExpression _expression;
    
    public NotExpression(IBooleanExpression expression)
    {
        _expression = expression;
    }
    
    public bool Evaluate(Dictionary<string, bool> context)
    {
        return !_expression.Evaluate(context);
    }
    
    public override string ToString() => $"NOT {_expression}";
}

#endregion

#region 场景3: 日期表达式解释器

/// <summary>
/// 抽象表达式 - 日期表达式接口
/// </summary>
public interface IDateExpression
{
    DateTime Evaluate(DateTime context);
}

/// <summary>
/// 终结符表达式 - 当前日期
/// </summary>
public class NowExpression : IDateExpression
{
    public DateTime Evaluate(DateTime context)
    {
        return context;
    }
    
    public override string ToString() => "now";
}

/// <summary>
/// 非终结符表达式 - 日期加减天数
/// </summary>
public class DayOffsetExpression : IDateExpression
{
    private readonly IDateExpression _dateExpression;
    private readonly int _days;
    
    public DayOffsetExpression(IDateExpression dateExpression, int days)
    {
        _dateExpression = dateExpression;
        _days = days;
    }
    
    public DateTime Evaluate(DateTime context)
    {
        return _dateExpression.Evaluate(context).AddDays(_days);
    }
    
    public override string ToString() => _days >= 0 
        ? $"({_dateExpression} + {_days}天)" 
        : $"({_dateExpression} - {Math.Abs(_days)}天)";
}

/// <summary>
/// 非终结符表达式 - 日期加减月份
/// </summary>
public class MonthOffsetExpression : IDateExpression
{
    private readonly IDateExpression _dateExpression;
    private readonly int _months;
    
    public MonthOffsetExpression(IDateExpression dateExpression, int months)
    {
        _dateExpression = dateExpression;
        _months = months;
    }
    
    public DateTime Evaluate(DateTime context)
    {
        return _dateExpression.Evaluate(context).AddMonths(_months);
    }
    
    public override string ToString() => _months >= 0 
        ? $"({_dateExpression} + {_months}月)" 
        : $"({_dateExpression} - {Math.Abs(_months)}月)";
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 解释器模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 简单数学表达式解释器\n");
        
        var context = new Context();
        context.SetVariable("x", 10);
        context.SetVariable("y", 5);
        
        // 构建: (x + y) * (x - y)
        var expression = new MultiplyExpression(
            new AddExpression(new VariableExpression("x"), new VariableExpression("y")),
            new SubtractExpression(new VariableExpression("x"), new VariableExpression("y"))
        );
        
        Console.WriteLine($"表达式: {expression}");
        Console.WriteLine($"x = {context.GetVariable("x")}, y = {context.GetVariable("y")}");
        Console.WriteLine($"结果: {expression.Interpret(context)}");
        
        // 构建: (3 + 5) * 2
        var expr2 = new MultiplyExpression(
            new AddExpression(new NumberExpression(3), new NumberExpression(5)),
            new NumberExpression(2)
        );
        Console.WriteLine($"\n表达式: {expr2}");
        Console.WriteLine($"结果: {expr2.Interpret(context)}");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 布尔表达式解释器\n");
        
        var boolContext = new Dictionary<string, bool>
        {
            ["isVip"] = true,
            ["hasCoupon"] = false,
            ["inStock"] = true
        };
        
        // 构建: isVip AND inStock
        var canBuy = new AndExpression(
            new BooleanVariable("isVip"),
            new BooleanVariable("inStock")
        );
        Console.WriteLine($"表达式: {canBuy}");
        Console.WriteLine($"结果: {canBuy.Evaluate(boolContext)}");
        
        // 构建: hasCoupon OR isVip
        var canDiscount = new OrExpression(
            new BooleanVariable("hasCoupon"),
            new BooleanVariable("isVip")
        );
        Console.WriteLine($"\n表达式: {canDiscount}");
        Console.WriteLine($"结果: {canDiscount.Evaluate(boolContext)}");
        
        // 构建: NOT hasCoupon
        var noCoupon = new NotExpression(new BooleanVariable("hasCoupon"));
        Console.WriteLine($"\n表达式: {noCoupon}");
        Console.WriteLine($"结果: {noCoupon.Evaluate(boolContext)}");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 日期表达式解释器\n");
        
        var now = DateTime.Now;
        Console.WriteLine($"当前日期: {now:yyyy-MM-dd}");
        
        // 构建: now + 7天
        var nextWeek = new DayOffsetExpression(new NowExpression(), 7);
        Console.WriteLine($"\n表达式: {nextWeek}");
        Console.WriteLine($"结果: {nextWeek.Evaluate(now):yyyy-MM-dd}");
        
        // 构建: now + 3月
        var threeMonthsLater = new MonthOffsetExpression(new NowExpression(), 3);
        Console.WriteLine($"\n表达式: {threeMonthsLater}");
        Console.WriteLine($"结果: {threeMonthsLater.Evaluate(now):yyyy-MM-dd}");
        
        // 构建: (now + 1月) + 15天
        var complexDate = new DayOffsetExpression(
            new MonthOffsetExpression(new NowExpression(), 1),
            15
        );
        Console.WriteLine($"\n表达式: {complexDate}");
        Console.WriteLine($"结果: {complexDate.Evaluate(now):yyyy-MM-dd}");
        #endregion
        
        Console.WriteLine("\n解释器模式优点:");
        Console.WriteLine("- 易于实现简单文法");
        Console.WriteLine("- 易于扩展新的表达式");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 将文法规则表示为类层次结构");
    }
}

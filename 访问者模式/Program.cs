/**
 * 访问者模式 (Visitor Pattern)
 * 
 * 定义：表示一个作用于某对象结构中的各元素的操作。
 *       它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。
 * 
 * 核心角色：
 * 1. 抽象访问者(Visitor) - 为每个具体元素类声明一个访问操作
 * 2. 具体访问者(Concrete Visitor) - 实现每个由抽象访问者声明的操作
 * 3. 抽象元素(Element) - 声明一个接受操作，以一个访问者为参数
 * 4. 具体元素(Concrete Element) - 实现接受操作
 * 5. 对象结构(Object Structure) - 能枚举它的元素，提供高层接口
 * 
 * 双分派机制：
 * - 客户端调用元素的 Accept 方法，传入访问者
 * - 元素的 Accept 方法回调访问者的 Visit 方法，传入自身
 * - 这样访问者可以根据元素的具体类型执行不同操作
 * 
 * 适用场景：
 * - 对象结构很少变化，但需要在此结构上定义很多新操作
 * - 需要对一个对象结构中的对象进行很多不同的操作
 * - 对象结构中的类很少变化，但经常需要在此结构上增加新操作
 * 
 * 本示例展示了三个场景：
 * 1. 形状导出 - 不同格式的导出
 * 2. 员工报表 - 不同维度的统计
 * 3. 语法树分析 - 代码检查
 */

namespace 访问者模式;

#region 场景1: 形状导出

/// <summary>
/// 抽象访问者 - 形状访问者
/// 为每种具体形状声明一个访问操作
/// </summary>
public interface IShapeVisitor
{
    void Visit(Circle circle);
    void Visit(Rectangle rectangle);
    void Visit(Triangle triangle);
}

/// <summary>
/// 抽象元素 - 形状
/// 声明 Accept 方法，接受访问者
/// </summary>
public interface IShape
{
    void Accept(IShapeVisitor visitor);
    string GetName();
}

/// <summary>
/// 具体元素 - 圆形
/// </summary>
public class Circle : IShape
{
    public double Radius { get; }
    
    public Circle(double radius)
    {
        Radius = radius;
    }
    
    /// <summary>
    /// 双分派：回调访问者的 Visit 方法
    /// </summary>
    public void Accept(IShapeVisitor visitor)
    {
        visitor.Visit(this);
    }
    
    public string GetName() => "圆形";
    
    public double GetArea() => Math.PI * Radius * Radius;
}

/// <summary>
/// 具体元素 - 矩形
/// </summary>
public class Rectangle : IShape
{
    public double Width { get; }
    public double Height { get; }
    
    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }
    
    public void Accept(IShapeVisitor visitor)
    {
        visitor.Visit(this);
    }
    
    public string GetName() => "矩形";
    
    public double GetArea() => Width * Height;
}

/// <summary>
/// 具体元素 - 三角形
/// </summary>
public class Triangle : IShape
{
    public double Base { get; }
    public double Height { get; }
    
    public Triangle(double @base, double height)
    {
        Base = @base;
        Height = height;
    }
    
    public void Accept(IShapeVisitor visitor)
    {
        visitor.Visit(this);
    }
    
    public string GetName() => "三角形";
    
    public double GetArea() => 0.5 * Base * Height;
}

/// <summary>
/// 具体访问者 - XML导出访问者
/// </summary>
public class XmlExportVisitor : IShapeVisitor
{
    public void Visit(Circle circle)
    {
        Console.WriteLine($"<circle radius=\"{circle.Radius}\" area=\"{circle.GetArea():F2}\" />");
    }
    
    public void Visit(Rectangle rectangle)
    {
        Console.WriteLine($"<rectangle width=\"{rectangle.Width}\" height=\"{rectangle.Height}\" area=\"{rectangle.GetArea():F2}\" />");
    }
    
    public void Visit(Triangle triangle)
    {
        Console.WriteLine($"<triangle base=\"{triangle.Base}\" height=\"{triangle.Height}\" area=\"{triangle.GetArea():F2}\" />");
    }
}

/// <summary>
/// 具体访问者 - JSON导出访问者
/// </summary>
public class JsonExportVisitor : IShapeVisitor
{
    public void Visit(Circle circle)
    {
        Console.WriteLine($"{{ \"type\": \"circle\", \"radius\": {circle.Radius}, \"area\": {circle.GetArea():F2} }}");
    }
    
    public void Visit(Rectangle rectangle)
    {
        Console.WriteLine($"{{ \"type\": \"rectangle\", \"width\": {rectangle.Width}, \"height\": {rectangle.Height}, \"area\": {rectangle.GetArea():F2} }}");
    }
    
    public void Visit(Triangle triangle)
    {
        Console.WriteLine($"{{ \"type\": \"triangle\", \"base\": {triangle.Base}, \"height\": {triangle.Height}, \"area\": {triangle.GetArea():F2} }}");
    }
}

/// <summary>
/// 具体访问者 - 面积计算访问者
/// </summary>
public class AreaCalculationVisitor : IShapeVisitor
{
    public double TotalArea { get; private set; }
    
    public void Visit(Circle circle)
    {
        TotalArea += circle.GetArea();
    }
    
    public void Visit(Rectangle rectangle)
    {
        TotalArea += rectangle.GetArea();
    }
    
    public void Visit(Triangle triangle)
    {
        TotalArea += triangle.GetArea();
    }
}

/// <summary>
/// 对象结构 - 形状集合
/// </summary>
public class ShapeCollection
{
    private readonly List<IShape> _shapes = new();
    
    public void Add(IShape shape)
    {
        _shapes.Add(shape);
    }
    
    /// <summary>
    /// 接受访问者 - 遍历所有元素
    /// </summary>
    public void Accept(IShapeVisitor visitor)
    {
        foreach (var shape in _shapes)
        {
            shape.Accept(visitor);
        }
    }
}

#endregion

#region 场景2: 员工报表

/// <summary>
/// 抽象访问者 - 员工访问者
/// </summary>
public interface IEmployeeVisitor
{
    void Visit(ManagerEmployee manager);
    void Visit(DeveloperEmployee developer);
    void Visit(DesignerEmployee designer);
}

/// <summary>
/// 抽象元素 - 员工
/// </summary>
public interface IEmployee
{
    string Name { get; }
    double Salary { get; }
    void Accept(IEmployeeVisitor visitor);
}

/// <summary>
/// 具体元素 - 经理
/// </summary>
public class ManagerEmployee : IEmployee
{
    public string Name { get; }
    public double Salary { get; }
    public int TeamSize { get; }
    
    public ManagerEmployee(string name, double salary, int teamSize)
    {
        Name = name;
        Salary = salary;
        TeamSize = teamSize;
    }
    
    public void Accept(IEmployeeVisitor visitor)
    {
        visitor.Visit(this);
    }
}

/// <summary>
/// 具体元素 - 开发者
/// </summary>
public class DeveloperEmployee : IEmployee
{
    public string Name { get; }
    public double Salary { get; }
    public string Language { get; }
    
    public DeveloperEmployee(string name, double salary, string language)
    {
        Name = name;
        Salary = salary;
        Language = language;
    }
    
    public void Accept(IEmployeeVisitor visitor)
    {
        visitor.Visit(this);
    }
}

/// <summary>
/// 具体元素 - 设计师
/// </summary>
public class DesignerEmployee : IEmployee
{
    public string Name { get; }
    public double Salary { get; }
    public string Tool { get; }
    
    public DesignerEmployee(string name, double salary, string tool)
    {
        Name = name;
        Salary = salary;
        Tool = tool;
    }
    
    public void Accept(IEmployeeVisitor visitor)
    {
        visitor.Visit(this);
    }
}

/// <summary>
/// 具体访问者 - 薪资报表访问者
/// </summary>
public class SalaryReportVisitor : IEmployeeVisitor
{
    public double TotalSalary { get; private set; }
    
    public void Visit(ManagerEmployee manager)
    {
        Console.WriteLine($"经理: {manager.Name}, 薪资: ¥{manager.Salary}, 团队: {manager.TeamSize}人");
        TotalSalary += manager.Salary;
    }
    
    public void Visit(DeveloperEmployee developer)
    {
        Console.WriteLine($"开发者: {developer.Name}, 薪资: ¥{developer.Salary}, 语言: {developer.Language}");
        TotalSalary += developer.Salary;
    }
    
    public void Visit(DesignerEmployee designer)
    {
        Console.WriteLine($"设计师: {designer.Name}, 薪资: ¥{designer.Salary}, 工具: {designer.Tool}");
        TotalSalary += designer.Salary;
    }
}

/// <summary>
/// 具体访问者 - 年终奖计算访问者
/// </summary>
public class BonusCalculationVisitor : IEmployeeVisitor
{
    public double TotalBonus { get; private set; }
    
    public void Visit(ManagerEmployee manager)
    {
        var bonus = manager.Salary * 3;
        Console.WriteLine($"经理 {manager.Name} 年终奖: ¥{bonus} (3倍月薪)");
        TotalBonus += bonus;
    }
    
    public void Visit(DeveloperEmployee developer)
    {
        var bonus = developer.Salary * 2;
        Console.WriteLine($"开发者 {developer.Name} 年终奖: ¥{bonus} (2倍月薪)");
        TotalBonus += bonus;
    }
    
    public void Visit(DesignerEmployee designer)
    {
        var bonus = designer.Salary * 2;
        Console.WriteLine($"设计师 {designer.Name} 年终奖: ¥{bonus} (2倍月薪)");
        TotalBonus += bonus;
    }
}

/// <summary>
/// 对象结构 - 员工列表
/// </summary>
public class EmployeeList
{
    private readonly List<IEmployee> _employees = new();
    
    public void Add(IEmployee employee)
    {
        _employees.Add(employee);
    }
    
    public void Accept(IEmployeeVisitor visitor)
    {
        foreach (var employee in _employees)
        {
            employee.Accept(visitor);
        }
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 访问者模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 形状导出\n");
        
        var shapes = new ShapeCollection();
        shapes.Add(new Circle(5));
        shapes.Add(new Rectangle(4, 6));
        shapes.Add(new Triangle(3, 4));
        
        Console.WriteLine("--- XML导出 ---");
        shapes.Accept(new XmlExportVisitor());
        
        Console.WriteLine("\n--- JSON导出 ---");
        shapes.Accept(new JsonExportVisitor());
        
        Console.WriteLine("\n--- 面积计算 ---");
        var areaVisitor = new AreaCalculationVisitor();
        shapes.Accept(areaVisitor);
        Console.WriteLine($"总面积: {areaVisitor.TotalArea:F2}");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 员工报表\n");
        
        var employees = new EmployeeList();
        employees.Add(new ManagerEmployee("张经理", 30000, 5));
        employees.Add(new DeveloperEmployee("李开发", 20000, "C#"));
        employees.Add(new DeveloperEmployee("王开发", 18000, "Java"));
        employees.Add(new DesignerEmployee("陈设计", 22000, "Figma"));
        
        Console.WriteLine("--- 薪资报表 ---");
        var salaryVisitor = new SalaryReportVisitor();
        employees.Accept(salaryVisitor);
        Console.WriteLine($"薪资总计: ¥{salaryVisitor.TotalSalary}");
        
        Console.WriteLine("\n--- 年终奖计算 ---");
        var bonusVisitor = new BonusCalculationVisitor();
        employees.Accept(bonusVisitor);
        Console.WriteLine($"年终奖总计: ¥{bonusVisitor.TotalBonus}");
        #endregion
        
        Console.WriteLine("\n访问者模式优点:");
        Console.WriteLine("- 在不改变元素类的前提下定义新操作");
        Console.WriteLine("- 相关操作集中在一个访问者中");
        Console.WriteLine("- 符合单一职责原则");
        Console.WriteLine("- 易于添加新的访问者");
    }
}

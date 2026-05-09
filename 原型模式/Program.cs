/**
 * 原型模式 (Prototype Pattern)
 * 
 * 定义：用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。
 * 
 * 核心角色：
 * 1. 抽象原型(Prototype) - 声明克隆方法的接口
 * 2. 具体原型(Concrete Prototype) - 实现克隆方法
 * 3. 客户端(Client) - 通过请求原型克隆来创建新对象
 * 
 * 浅拷贝 vs 深拷贝：
 * - 浅拷贝：复制对象本身和值类型字段，引用类型只复制引用
 * - 深拷贝：复制对象本身和所有字段，包括引用类型指向的对象
 * 
 * 适用场景：
 * - 创建新对象成本较高
 * - 需要保护原型对象不被修改
 * - 需要动态创建对象，且对象类型在运行时确定
 * 
 * 本示例展示了两个场景：
 * 1. 简历模板克隆 - 深拷贝示例
 * 2. 图形缓存系统 - 原型注册表模式
 */

namespace 原型模式;

/// <summary>
/// 抽象原型接口 - 定义克隆方法
/// </summary>
/// <typeparam name="T">原型类型</typeparam>
public interface IPrototype<T>
{
    /// <summary>
    /// 克隆方法 - 创建当前对象的副本
    /// </summary>
    T Clone();
}

/// <summary>
/// 具体原型 - 简历类
/// 实现深拷贝，确保引用类型字段也被正确复制
/// 
/// 关键点：
/// - 私有拷贝构造函数用于实现克隆
/// - Skills 列表需要深拷贝
/// </summary>
public class Resume : IPrototype<Resume>
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Education { get; set; }
    
    /// <summary>
    /// 技能列表 - 引用类型，需要深拷贝
    /// </summary>
    public List<string> Skills { get; set; }
    
    public string? WorkExperience { get; set; }
    
    public Resume(string name, int age, string education)
    {
        Name = name;
        Age = age;
        Education = education;
        Skills = new List<string>();
    }
    
    /// <summary>
    /// 私有拷贝构造函数 - 用于实现深拷贝
    /// </summary>
    /// <param name="source">源对象</param>
    private Resume(Resume source)
    {
        Name = source.Name;
        Age = source.Age;
        Education = source.Education;
        // 深拷贝：创建新的列表并复制元素
        Skills = new List<string>(source.Skills);
        WorkExperience = source.WorkExperience;
    }
    
    public void AddSkill(string skill)
    {
        Skills.Add(skill);
    }
    
    public void SetWorkExperience(string experience)
    {
        WorkExperience = experience;
    }
    
    /// <summary>
    /// 克隆方法 - 通过拷贝构造函数创建新对象
    /// </summary>
    public Resume Clone()
    {
        return new Resume(this);
    }
    
    public void Display()
    {
        Console.WriteLine($"姓名: {Name}");
        Console.WriteLine($"年龄: {Age}");
        Console.WriteLine($"学历: {Education}");
        Console.WriteLine($"技能: {string.Join(", ", Skills)}");
        Console.WriteLine($"工作经验: {WorkExperience ?? "无"}");
    }
}

/// <summary>
/// 具体原型 - 图形类
/// </summary>
public class Shape : IPrototype<Shape>
{
    public string Type { get; set; }
    public string Color { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    
    public Shape(string type, string color, int x, int y)
    {
        Type = type;
        Color = color;
        X = x;
        Y = y;
    }
    
    private Shape(Shape source)
    {
        Type = source.Type;
        Color = source.Color;
        X = source.X;
        Y = source.Y;
    }
    
    public Shape Clone()
    {
        return new Shape(this);
    }
    
    public void Display()
    {
        Console.WriteLine($"形状: {Type}, 颜色: {Color}, 位置: ({X}, {Y})");
    }
}

/// <summary>
/// 原型注册表/缓存
/// 存储预定义的原型对象，通过键值获取克隆
/// 
/// 关键点：
/// - 预先注册常用原型
/// - 返回原型的克隆而非原型本身
/// </summary>
public class ShapeCache
{
    private readonly Dictionary<string, Shape> _cache = new();
    
    /// <summary>
    /// 注册原型到缓存
    /// </summary>
    public void RegisterShape(string key, Shape shape)
    {
        _cache[key] = shape;
    }
    
    /// <summary>
    /// 从缓存获取原型的克隆
    /// </summary>
    public Shape GetShape(string key)
    {
        if (_cache.TryGetValue(key, out var shape))
        {
            return shape.Clone();
        }
        throw new KeyNotFoundException($"未找到形状: {key}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 原型模式示例 ===\n");
        
        #region 场景1: 简历模板克隆
        Console.WriteLine("场景1: 简历模板克隆\n");
        
        // 创建简历模板
        var resumeTemplate = new Resume("张三", 28, "本科-计算机科学");
        resumeTemplate.AddSkill("C#");
        resumeTemplate.AddSkill("SQL Server");
        resumeTemplate.AddSkill("ASP.NET Core");
        resumeTemplate.SetWorkExperience("5年后端开发经验");
        
        Console.WriteLine("原始简历:");
        resumeTemplate.Display();
        
        // 克隆并修改
        Console.WriteLine("\n克隆简历1 (修改姓名和年龄):");
        var resume1 = resumeTemplate.Clone();
        resume1.Name = "李四";
        resume1.Age = 25;
        resume1.Display();
        
        Console.WriteLine("\n克隆简历2 (添加技能):");
        var resume2 = resumeTemplate.Clone();
        resume2.Name = "王五";
        resume2.AddSkill("Docker");
        resume2.AddSkill("Kubernetes");
        resume2.Display();
        
        // 验证深拷贝：修改克隆对象不影响原对象
        Console.WriteLine("\n验证原始简历未被修改:");
        resumeTemplate.Display();
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2: 图形缓存系统
        Console.WriteLine("场景2: 图形缓存系统\n");
        
        var cache = new ShapeCache();
        cache.RegisterShape("circle", new Shape("圆形", "红色", 0, 0));
        cache.RegisterShape("rectangle", new Shape("矩形", "蓝色", 10, 10));
        
        Console.WriteLine("从缓存获取图形:");
        var circle1 = cache.GetShape("circle");
        circle1.X = 100;
        circle1.Y = 100;
        circle1.Display();
        
        var circle2 = cache.GetShape("circle");
        circle2.Color = "绿色";
        circle2.Display();
        
        var rectangle = cache.GetShape("rectangle");
        rectangle.Display();
        #endregion
        
        Console.WriteLine("\n原型模式优点:");
        Console.WriteLine("- 通过克隆创建对象,避免重复初始化代码");
        Console.WriteLine("- 简化对象的创建过程");
        Console.WriteLine("- 保护原型对象不被修改");
        Console.WriteLine("- 适用于创建成本较高的对象");
    }
}

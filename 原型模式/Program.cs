namespace 原型模式;

public interface IPrototype<T>
{
    T Clone();
}

public class Resume : IPrototype<Resume>
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Education { get; set; }
    public List<string> Skills { get; set; }
    public string? WorkExperience { get; set; }
    
    public Resume(string name, int age, string education)
    {
        Name = name;
        Age = age;
        Education = education;
        Skills = new List<string>();
    }
    
    private Resume(Resume source)
    {
        Name = source.Name;
        Age = source.Age;
        Education = source.Education;
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

public class ShapeCache
{
    private readonly Dictionary<string, Shape> _cache = new();
    
    public void RegisterShape(string key, Shape shape)
    {
        _cache[key] = shape;
    }
    
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
        
        Console.WriteLine("场景1: 简历模板克隆\n");
        
        var resumeTemplate = new Resume("张三", 28, "本科-计算机科学");
        resumeTemplate.AddSkill("C#");
        resumeTemplate.AddSkill("SQL Server");
        resumeTemplate.AddSkill("ASP.NET Core");
        resumeTemplate.SetWorkExperience("5年后端开发经验");
        
        Console.WriteLine("原始简历:");
        resumeTemplate.Display();
        
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
        
        Console.WriteLine("\n验证原始简历未被修改:");
        resumeTemplate.Display();
        
        Console.WriteLine("\n----------------------------------------\n");
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
        
        Console.WriteLine("\n原型模式优点:");
        Console.WriteLine("- 通过克隆创建对象,避免重复初始化代码");
        Console.WriteLine("- 简化对象的创建过程");
        Console.WriteLine("- 保护原型对象不被修改");
        Console.WriteLine("- 适用于创建成本较高的对象");
    }
}

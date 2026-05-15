/**
 * 组合模式 (Composite Pattern)
 * 
 * 定义：将对象组合成树形结构以表示"部分-整体"的层次结构。
 *       组合模式使得用户对单个对象和组合对象的使用具有一致性。
 * 
 * 核心角色：
 * 1. 抽象构件(Component) - 为叶子节点和组合节点声明公共接口
 * 2. 叶子节点(Leaf) - 表示叶子节点对象，没有子节点
 * 3. 组合节点(Composite) - 表示有子节点的对象，实现与子节点相关的操作
 * 
 * 适用场景：
 * - 需要表示对象的部分-整体层次结构
 * - 希望用户忽略组合对象与单个对象的不同
 * - 树形结构的数据处理
 * 
 * 本示例展示了三个场景：
 * 1. 文件系统 - 文件和文件夹的树形结构
 * 2. 组织架构 - 公司部门层级
 * 3. 图形绘制 - 组合图形
 */

namespace 组合模式;

#region 场景1: 文件系统

/// <summary>
/// 抽象构件 - 文件系统节点
/// 定义文件和文件夹的公共接口
/// </summary>
public abstract class FileSystemNode
{
    public string Name { get; }
    
    protected FileSystemNode(string name)
    {
        Name = name;
    }
    
    /// <summary>
    /// 显示节点信息
    /// </summary>
    /// <param name="indent">缩进层级</param>
    public abstract void Display(int indent = 0);
    
    /// <summary>
    /// 获取大小
    /// </summary>
    public abstract long GetSize();
}

/// <summary>
/// 叶子节点 - 文件
/// 没有子节点，实现具体操作
/// </summary>
public class FileItem : FileSystemNode
{
    private readonly long _size;
    
    public FileItem(string name, long size) : base(name)
    {
        _size = size;
    }
    
    public override void Display(int indent = 0)
    {
        Console.WriteLine($"{new string(' ', indent * 2)}📄 {Name} ({_size}KB)");
    }
    
    public override long GetSize()
    {
        return _size;
    }
}

/// <summary>
/// 组合节点 - 文件夹
/// 包含子节点，实现子节点的管理操作
/// 
/// 关键点：
/// - 实现与叶子节点相同的接口
/// - 内部维护子节点列表
/// - 递归调用子节点的方法
/// </summary>
public class Folder : FileSystemNode
{
    private readonly List<FileSystemNode> _children = new();
    
    public Folder(string name) : base(name) { }
    
    /// <summary>
    /// 添加子节点
    /// </summary>
    public void Add(FileSystemNode node)
    {
        _children.Add(node);
    }
    
    /// <summary>
    /// 移除子节点
    /// </summary>
    public void Remove(FileSystemNode node)
    {
        _children.Remove(node);
    }
    
    /// <summary>
    /// 获取子节点
    /// </summary>
    public FileSystemNode? GetChild(int index)
    {
        return index >= 0 && index < _children.Count ? _children[index] : null;
    }
    
    /// <summary>
    /// 递归显示文件夹内容
    /// </summary>
    public override void Display(int indent = 0)
    {
        Console.WriteLine($"{new string(' ', indent * 2)}📁 {Name}/");
        foreach (var child in _children)
        {
            child.Display(indent + 1);
        }
    }
    
    /// <summary>
    /// 递归计算文件夹大小
    /// </summary>
    public override long GetSize()
    {
        long total = 0;
        foreach (var child in _children)
        {
            total += child.GetSize();
        }
        return total;
    }
}

#endregion

#region 场景2: 组织架构

/// <summary>
/// 抽象构件 - 组织节点
/// </summary>
public abstract class OrganizationNode
{
    public string Name { get; }
    
    protected OrganizationNode(string name)
    {
        Name = name;
    }
    
    public abstract void Display(int indent = 0);
    public abstract int GetEmployeeCount();
}

/// <summary>
/// 叶子节点 - 员工
/// </summary>
public class Employee : OrganizationNode
{
    private readonly string _position;
    
    public Employee(string name, string position) : base(name)
    {
        _position = position;
    }
    
    public override void Display(int indent = 0)
    {
        Console.WriteLine($"{new string(' ', indent * 2)}👤 {Name} - {_position}");
    }
    
    public override int GetEmployeeCount()
    {
        return 1;
    }
}

/// <summary>
/// 组合节点 - 部门
/// </summary>
public class Department : OrganizationNode
{
    private readonly List<OrganizationNode> _members = new();
    
    public Department(string name) : base(name) { }
    
    public void Add(OrganizationNode node)
    {
        _members.Add(node);
    }
    
    public void Remove(OrganizationNode node)
    {
        _members.Remove(node);
    }
    
    public override void Display(int indent = 0)
    {
        Console.WriteLine($"{new string(' ', indent * 2)}🏢 {Name}");
        foreach (var member in _members)
        {
            member.Display(indent + 1);
        }
    }
    
    public override int GetEmployeeCount()
    {
        int count = 0;
        foreach (var member in _members)
        {
            count += member.GetEmployeeCount();
        }
        return count;
    }
}

#endregion

#region 场景3: 图形绘制

/// <summary>
/// 抽象构件 - 图形
/// </summary>
public interface IGraphic
{
    void Draw();
    void Move(int x, int y);
}

/// <summary>
/// 叶子节点 - 简单图形（圆形）
/// </summary>
public class CircleShape : IGraphic
{
    private int _x;
    private int _y;
    private readonly int _radius;
    
    public CircleShape(int x, int y, int radius)
    {
        _x = x;
        _y = y;
        _radius = radius;
    }
    
    public void Draw()
    {
        Console.WriteLine($"绘制圆形: 位置({_x}, {_y}), 半径={_radius}");
    }
    
    public void Move(int x, int y)
    {
        _x += x;
        _y += y;
        Console.WriteLine($"移动圆形到: ({_x}, {_y})");
    }
}

/// <summary>
/// 叶子节点 - 简单图形（矩形）
/// </summary>
public class RectangleShape : IGraphic
{
    private int _x;
    private int _y;
    private readonly int _width;
    private readonly int _height;
    
    public RectangleShape(int x, int y, int width, int height)
    {
        _x = x;
        _y = y;
        _width = width;
        _height = height;
    }
    
    public void Draw()
    {
        Console.WriteLine($"绘制矩形: 位置({_x}, {_y}), 宽={_width}, 高={_height}");
    }
    
    public void Move(int x, int y)
    {
        _x += x;
        _y += y;
        Console.WriteLine($"移动矩形到: ({_x}, {_y})");
    }
}

/// <summary>
/// 组合节点 - 组合图形
/// 
/// 关键点：
/// - 实现与叶子节点相同的接口
/// - 统一管理子图形
/// - 客户端无需区分简单图形和组合图形
/// </summary>
public class CompositeGraphic : IGraphic
{
    private readonly List<IGraphic> _graphics = new();
    private readonly string _name;
    
    public CompositeGraphic(string name)
    {
        _name = name;
    }
    
    public void Add(IGraphic graphic)
    {
        _graphics.Add(graphic);
    }
    
    public void Remove(IGraphic graphic)
    {
        _graphics.Remove(graphic);
    }
    
    public void Draw()
    {
        Console.WriteLine($"--- 绘制组合图形: {_name} ---");
        foreach (var graphic in _graphics)
        {
            graphic.Draw();
        }
    }
    
    public void Move(int x, int y)
    {
        Console.WriteLine($"--- 移动组合图形: {_name} ---");
        foreach (var graphic in _graphics)
        {
            graphic.Move(x, y);
        }
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 组合模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 文件系统\n");
        
        var root = new Folder("根目录");
        var documents = new Folder("文档");
        var pictures = new Folder("图片");
        
        documents.Add(new FileItem("报告.docx", 256));
        documents.Add(new FileItem("笔记.txt", 32));
        
        pictures.Add(new FileItem("照片.jpg", 1024));
        pictures.Add(new FileItem("图标.png", 64));
        
        root.Add(documents);
        root.Add(pictures);
        root.Add(new FileItem("说明.txt", 16));
        
        root.Display();
        Console.WriteLine($"\n总大小: {root.GetSize()}KB");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 组织架构\n");
        
        var company = new Department("总公司");
        var techDept = new Department("技术部");
        var hrDept = new Department("人力资源部");
        
        techDept.Add(new Employee("张三", "高级工程师"));
        techDept.Add(new Employee("李四", "工程师"));
        
        var devTeam = new Department("开发组");
        devTeam.Add(new Employee("王五", "开发工程师"));
        devTeam.Add(new Employee("赵六", "开发工程师"));
        techDept.Add(devTeam);
        
        hrDept.Add(new Employee("陈七", "HR经理"));
        
        company.Add(techDept);
        company.Add(hrDept);
        
        company.Display();
        Console.WriteLine($"\n总人数: {company.GetEmployeeCount()}");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 图形绘制\n");
        
        var circle = new CircleShape(10, 20, 5);
        var rect = new RectangleShape(30, 40, 100, 50);
        
        var group = new CompositeGraphic("我的图形");
        group.Add(circle);
        group.Add(rect);
        
        group.Draw();
        Console.WriteLine();
        group.Move(5, 10);
        #endregion
        
        Console.WriteLine("\n组合模式优点:");
        Console.WriteLine("- 统一处理单个对象和组合对象");
        Console.WriteLine("- 简化客户端代码");
        Console.WriteLine("- 易于添加新的构件类型");
        Console.WriteLine("- 符合开闭原则");
    }
}

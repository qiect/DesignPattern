/**
 * 抽象工厂模式 (Abstract Factory Pattern)
 * 
 * 定义：提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。
 * 
 * 核心角色：
 * 1. 抽象工厂(Abstract Factory) - 声明创建抽象产品对象的方法
 * 2. 具体工厂(Concrete Factory) - 实现创建具体产品对象的方法
 * 3. 抽象产品(Abstract Product) - 定义产品的公共接口
 * 4. 具体产品(Concrete Product) - 实现抽象产品接口
 * 
 * 与工厂方法的区别：
 * - 工厂方法：一个工厂只创建一种产品
 * - 抽象工厂：一个工厂创建一系列相关的产品（产品族）
 * 
 * 适用场景：
 * - 系统需要独立于产品的创建、组合和表示
 * - 系统需要多个产品族中的一个来配置
 * - 需要保证产品族的一致性
 * 
 * 本示例场景：跨平台 UI 组件库，不同平台有不同的组件风格
 */

namespace 抽象工厂模式;

#region 抽象产品定义

/// <summary>
/// 抽象产品 - 按钮接口
/// </summary>
public interface IButton
{
    /// <summary>
    /// 渲染按钮
    /// </summary>
    void Render();
    
    /// <summary>
    /// 获取按钮风格
    /// </summary>
    string GetStyle();
}

/// <summary>
/// 抽象产品 - 文本框接口
/// </summary>
public interface ITextBox
{
    /// <summary>
    /// 渲染文本框
    /// </summary>
    void Render();
    
    /// <summary>
    /// 获取文本框风格
    /// </summary>
    string GetStyle();
}

/// <summary>
/// 抽象产品 - 复选框接口
/// </summary>
public interface ICheckBox
{
    /// <summary>
    /// 渲染复选框
    /// </summary>
    void Render();
    
    /// <summary>
    /// 获取复选框风格
    /// </summary>
    string GetStyle();
}

#endregion

#region Windows 产品族

/// <summary>
/// 具体产品 - Windows风格按钮
/// </summary>
public class WindowsButton : IButton
{
    public void Render()
    {
        Console.WriteLine("渲染 Windows 风格按钮");
    }
    
    public string GetStyle() => "Windows";
}

/// <summary>
/// 具体产品 - Windows风格文本框
/// </summary>
public class WindowsTextBox : ITextBox
{
    public void Render()
    {
        Console.WriteLine("渲染 Windows 风格文本框");
    }
    
    public string GetStyle() => "Windows";
}

/// <summary>
/// 具体产品 - Windows风格复选框
/// </summary>
public class WindowsCheckBox : ICheckBox
{
    public void Render()
    {
        Console.WriteLine("渲染 Windows 风格复选框");
    }
    
    public string GetStyle() => "Windows";
}

#endregion

#region Mac 产品族

/// <summary>
/// 具体产品 - Mac风格按钮
/// </summary>
public class MacButton : IButton
{
    public void Render()
    {
        Console.WriteLine("渲染 Mac 风格按钮");
    }
    
    public string GetStyle() => "Mac";
}

/// <summary>
/// 具体产品 - Mac风格文本框
/// </summary>
public class MacTextBox : ITextBox
{
    public void Render()
    {
        Console.WriteLine("渲染 Mac 风格文本框");
    }
    
    public string GetStyle() => "Mac";
}

/// <summary>
/// 具体产品 - Mac风格复选框
/// </summary>
public class MacCheckBox : ICheckBox
{
    public void Render()
    {
        Console.WriteLine("渲染 Mac 风格复选框");
    }
    
    public string GetStyle() => "Mac";
}

#endregion

#region 抽象工厂和具体工厂

/// <summary>
/// 抽象工厂 - GUI工厂接口
/// 定义创建一系列相关产品的方法
/// 
/// 关键点：
/// - 每个方法返回一个抽象产品类型
/// - 一个工厂可以创建多个相关产品
/// - 保证产品族的一致性
/// </summary>
public interface IGUIFactory
{
    /// <summary>
    /// 创建按钮
    /// </summary>
    IButton CreateButton();
    
    /// <summary>
    /// 创建文本框
    /// </summary>
    ITextBox CreateTextBox();
    
    /// <summary>
    /// 创建复选框
    /// </summary>
    ICheckBox CreateCheckBox();
}

/// <summary>
/// 具体工厂 - Windows GUI工厂
/// 创建 Windows 风格的产品族
/// 
/// 关键点：
/// - 所有产品都属于同一产品族（Windows风格）
/// - 保证产品风格的一致性
/// </summary>
public class WindowsFactory : IGUIFactory
{
    public IButton CreateButton() => new WindowsButton();
    public ITextBox CreateTextBox() => new WindowsTextBox();
    public ICheckBox CreateCheckBox() => new WindowsCheckBox();
}

/// <summary>
/// 具体工厂 - Mac GUI工厂
/// 创建 Mac 风格的产品族
/// 
/// 关键点：
/// - 所有产品都属于同一产品族（Mac风格）
/// - 保证产品风格的一致性
/// </summary>
public class MacFactory : IGUIFactory
{
    public IButton CreateButton() => new MacButton();
    public ITextBox CreateTextBox() => new MacTextBox();
    public ICheckBox CreateCheckBox() => new MacCheckBox();
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 抽象工厂模式示例 ===\n");
        
        Console.WriteLine("场景: 跨平台 UI 组件库\n");
        
        // 使用 Windows 工厂创建 Windows 风格组件
        Console.WriteLine("--- Windows 平台 ---");
        IGUIFactory windowsFactory = new WindowsFactory();
        RenderUI(windowsFactory);
        
        // 使用 Mac 工厂创建 Mac 风格组件
        Console.WriteLine("\n--- Mac 平台 ---");
        IGUIFactory macFactory = new MacFactory();
        RenderUI(macFactory);
        
        Console.WriteLine("\n抽象工厂模式优点:");
        Console.WriteLine("- 保证产品族的一致性");
        Console.WriteLine("- 客户端与具体产品解耦");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 易于切换产品族");
    }
    
    /// <summary>
    /// 渲染UI组件
    /// 客户端代码只依赖抽象工厂和抽象产品
    /// </summary>
    /// <param name="factory">GUI工厂</param>
    static void RenderUI(IGUIFactory factory)
    {
        // 通过工厂创建产品，无需知道具体产品类
        var button = factory.CreateButton();
        var textBox = factory.CreateTextBox();
        var checkBox = factory.CreateCheckBox();
        
        Console.WriteLine($"按钮风格: {button.GetStyle()}");
        button.Render();
        
        Console.WriteLine($"文本框风格: {textBox.GetStyle()}");
        textBox.Render();
        
        Console.WriteLine($"复选框风格: {checkBox.GetStyle()}");
        checkBox.Render();
    }
}

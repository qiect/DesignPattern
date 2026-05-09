namespace 抽象工厂模式;

public interface IButton
{
    void Render();
    string GetStyle();
}

public interface ITextBox
{
    void Render();
    string GetStyle();
}

public interface ICheckBox
{
    void Render();
    string GetStyle();
}

public class WindowsButton : IButton
{
    public void Render()
    {
        Console.WriteLine("渲染 Windows 风格按钮");
    }
    
    public string GetStyle() => "Windows";
}

public class WindowsTextBox : ITextBox
{
    public void Render()
    {
        Console.WriteLine("渲染 Windows 风格文本框");
    }
    
    public string GetStyle() => "Windows";
}

public class WindowsCheckBox : ICheckBox
{
    public void Render()
    {
        Console.WriteLine("渲染 Windows 风格复选框");
    }
    
    public string GetStyle() => "Windows";
}

public class MacButton : IButton
{
    public void Render()
    {
        Console.WriteLine("渲染 Mac 风格按钮");
    }
    
    public string GetStyle() => "Mac";
}

public class MacTextBox : ITextBox
{
    public void Render()
    {
        Console.WriteLine("渲染 Mac 风格文本框");
    }
    
    public string GetStyle() => "Mac";
}

public class MacCheckBox : ICheckBox
{
    public void Render()
    {
        Console.WriteLine("渲染 Mac 风格复选框");
    }
    
    public string GetStyle() => "Mac";
}

public interface IGUIFactory
{
    IButton CreateButton();
    ITextBox CreateTextBox();
    ICheckBox CreateCheckBox();
}

public class WindowsFactory : IGUIFactory
{
    public IButton CreateButton() => new WindowsButton();
    public ITextBox CreateTextBox() => new WindowsTextBox();
    public ICheckBox CreateCheckBox() => new WindowsCheckBox();
}

public class MacFactory : IGUIFactory
{
    public IButton CreateButton() => new MacButton();
    public ITextBox CreateTextBox() => new MacTextBox();
    public ICheckBox CreateCheckBox() => new MacCheckBox();
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 抽象工厂模式示例 ===\n");
        
        Console.WriteLine("场景: 跨平台 UI 组件库\n");
        
        Console.WriteLine("--- Windows 平台 ---");
        IGUIFactory windowsFactory = new WindowsFactory();
        RenderUI(windowsFactory);
        
        Console.WriteLine("\n--- Mac 平台 ---");
        IGUIFactory macFactory = new MacFactory();
        RenderUI(macFactory);
        
        Console.WriteLine("\n抽象工厂模式优点:");
        Console.WriteLine("- 保证产品族的一致性");
        Console.WriteLine("- 客户端与具体产品解耦");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 易于切换产品族");
    }
    
    static void RenderUI(IGUIFactory factory)
    {
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

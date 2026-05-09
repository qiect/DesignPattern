/**
 * 建造者模式 (Builder Pattern)
 * 
 * 定义：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。
 * 
 * 核心角色：
 * 1. 产品(Product) - 要构建的复杂对象
 * 2. 抽象建造者(Builder) - 定义创建产品各个部件的抽象接口
 * 3. 具体建造者(Concrete Builder) - 实现Builder接口，构造和装配各个部件
 * 4. 指挥者(Director) - 构建一个使用Builder接口的对象
 * 
 * 适用场景：
 * - 创建复杂对象，对象有多个组成部分
 * - 需要创建的对象有很多可选配置
 * - 构建过程需要分步进行
 * 
 * 本示例场景：电脑配置组装系统，支持不同配置的电脑组装
 */

namespace 建造者模式;

/// <summary>
/// 产品类 - 电脑
/// 包含多个配置属性，代表复杂对象
/// </summary>
public class Computer
{
    /// <summary>CPU - 必需配置</summary>
    public string? CPU { get; set; }
    
    /// <summary>内存 - 必需配置</summary>
    public string? RAM { get; set; }
    
    /// <summary>存储 - 必需配置</summary>
    public string? Storage { get; set; }
    
    /// <summary>显卡 - 可选配置</summary>
    public string? GPU { get; set; }
    
    /// <summary>显示器 - 可选配置</summary>
    public string? Monitor { get; set; }
    
    /// <summary>WiFi - 可选配置</summary>
    public bool HasWiFi { get; set; }
    
    /// <summary>蓝牙 - 可选配置</summary>
    public bool HasBluetooth { get; set; }
    
    /// <summary>
    /// 显示电脑配置信息
    /// </summary>
    public void ShowConfiguration()
    {
        Console.WriteLine("电脑配置:");
        Console.WriteLine($"  CPU: {CPU}");
        Console.WriteLine($"  内存: {RAM}");
        Console.WriteLine($"  存储: {Storage}");
        Console.WriteLine($"  显卡: {GPU ?? "集成显卡"}");
        Console.WriteLine($"  显示器: {Monitor ?? "未配置"}");
        Console.WriteLine($"  WiFi: {(HasWiFi ? "已安装" : "未安装")}");
        Console.WriteLine($"  蓝牙: {(HasBluetooth ? "已安装" : "未安装")}");
    }
}

/// <summary>
/// 抽象建造者 - 电脑建造者接口
/// 定义构建电脑各个部件的方法
/// 
/// 关键点：
/// - 返回 IComputerBuilder 支持链式调用
/// - 定义构建各个部件的抽象方法
/// - Build() 方法返回最终产品
/// </summary>
public interface IComputerBuilder
{
    IComputerBuilder SetCPU(string cpu);
    IComputerBuilder SetRAM(string ram);
    IComputerBuilder SetStorage(string storage);
    IComputerBuilder SetGPU(string gpu);
    IComputerBuilder SetMonitor(string monitor);
    IComputerBuilder EnableWiFi(bool enable = true);
    IComputerBuilder EnableBluetooth(bool enable = true);
    Computer Build();
}

/// <summary>
/// 具体建造者 - 电脑建造者实现
/// 实现构建电脑各个部件的具体逻辑
/// 
/// 关键点：
/// - 内部维护一个 Computer 对象
/// - 每个设置方法返回 this，支持链式调用
/// - Build() 方法进行验证并返回产品
/// </summary>
public class ComputerBuilder : IComputerBuilder
{
    private readonly Computer _computer = new();
    
    public IComputerBuilder SetCPU(string cpu)
    {
        _computer.CPU = cpu;
        return this;
    }
    
    public IComputerBuilder SetRAM(string ram)
    {
        _computer.RAM = ram;
        return this;
    }
    
    public IComputerBuilder SetStorage(string storage)
    {
        _computer.Storage = storage;
        return this;
    }
    
    public IComputerBuilder SetGPU(string gpu)
    {
        _computer.GPU = gpu;
        return this;
    }
    
    public IComputerBuilder SetMonitor(string monitor)
    {
        _computer.Monitor = monitor;
        return this;
    }
    
    public IComputerBuilder EnableWiFi(bool enable = true)
    {
        _computer.HasWiFi = enable;
        return this;
    }
    
    public IComputerBuilder EnableBluetooth(bool enable = true)
    {
        _computer.HasBluetooth = enable;
        return this;
    }
    
    /// <summary>
    /// 构建最终产品
    /// 进行必要的验证，确保必需配置已设置
    /// </summary>
    public Computer Build()
    {
        if (string.IsNullOrEmpty(_computer.CPU))
            throw new InvalidOperationException("CPU 是必需的配置");
        if (string.IsNullOrEmpty(_computer.RAM))
            throw new InvalidOperationException("内存是必需的配置");
        if (string.IsNullOrEmpty(_computer.Storage))
            throw new InvalidOperationException("存储是必需的配置");
        
        return _computer;
    }
}

/// <summary>
/// 指挥者 - 电脑组装指导
/// 封装常用的电脑配置方案
/// 
/// 关键点：
/// - 定义标准的构建流程
/// - 客户端可以直接使用预设方案
/// - 也可以自定义配置
/// </summary>
public class ComputerDirector
{
    /// <summary>
    /// 构建办公电脑 - 基础配置
    /// </summary>
    public Computer BuildOfficeComputer(IComputerBuilder builder)
    {
        return builder
            .SetCPU("Intel i5-12400")
            .SetRAM("16GB DDR4")
            .SetStorage("512GB SSD")
            .EnableWiFi()
            .EnableBluetooth()
            .Build();
    }
    
    /// <summary>
    /// 构建游戏电脑 - 高性能配置
    /// </summary>
    public Computer BuildGamingComputer(IComputerBuilder builder)
    {
        return builder
            .SetCPU("Intel i7-13700K")
            .SetRAM("32GB DDR5")
            .SetStorage("1TB NVMe SSD")
            .SetGPU("NVIDIA RTX 4080")
            .SetMonitor("27寸 4K 144Hz")
            .EnableWiFi()
            .EnableBluetooth()
            .Build();
    }
    
    /// <summary>
    /// 构建服务器 - 企业级配置
    /// </summary>
    public Computer BuildServerComputer(IComputerBuilder builder)
    {
        return builder
            .SetCPU("AMD EPYC 7763")
            .SetRAM("256GB DDR4 ECC")
            .SetStorage("4TB NVMe SSD RAID")
            .EnableWiFi(false)
            .EnableBluetooth(false)
            .Build();
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 建造者模式示例 ===\n");
        
        Console.WriteLine("场景: 电脑配置组装系统\n");
        
        var director = new ComputerDirector();
        var builder = new ComputerBuilder();
        
        // 使用指挥者构建预设配置
        Console.WriteLine("--- 办公电脑 ---");
        var officeComputer = director.BuildOfficeComputer(builder);
        officeComputer.ShowConfiguration();
        
        Console.WriteLine("\n--- 游戏电脑 ---");
        builder = new ComputerBuilder();
        var gamingComputer = director.BuildGamingComputer(builder);
        gamingComputer.ShowConfiguration();
        
        Console.WriteLine("\n--- 服务器 ---");
        builder = new ComputerBuilder();
        var serverComputer = director.BuildServerComputer(builder);
        serverComputer.ShowConfiguration();
        
        // 自定义配置 - 不使用指挥者
        Console.WriteLine("\n--- 自定义电脑 ---");
        builder = new ComputerBuilder();
        var customComputer = builder
            .SetCPU("AMD Ryzen 9 7950X")
            .SetRAM("64GB DDR5")
            .SetStorage("2TB NVMe SSD")
            .SetGPU("NVIDIA RTX 4090")
            .EnableWiFi()
            .EnableBluetooth()
            .Build();
        customComputer.ShowConfiguration();
        
        Console.WriteLine("\n建造者模式优点:");
        Console.WriteLine("- 分步创建复杂对象");
        Console.WriteLine("- 相同的构建过程可以创建不同的表示");
        Console.WriteLine("- 构建代码与表示代码分离");
        Console.WriteLine("- 符合单一职责原则");
    }
}

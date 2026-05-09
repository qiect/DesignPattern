namespace 建造者模式;

public class Computer
{
    public string? CPU { get; set; }
    public string? RAM { get; set; }
    public string? Storage { get; set; }
    public string? GPU { get; set; }
    public string? Monitor { get; set; }
    public bool HasWiFi { get; set; }
    public bool HasBluetooth { get; set; }
    
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

public class ComputerDirector
{
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

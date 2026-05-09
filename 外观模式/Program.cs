namespace 外观模式;

public class CPU
{
    public void Freeze()
    {
        Console.WriteLine("CPU: 冻结处理器");
    }
    
    public void Jump(long position)
    {
        Console.WriteLine($"CPU: 跳转到位置 {position}");
    }
    
    public void Execute()
    {
        Console.WriteLine("CPU: 开始执行指令");
    }
}

public class Memory
{
    public void Load(long position, byte[] data)
    {
        Console.WriteLine($"内存: 在位置 {position} 加载数据");
    }
}

public class HardDrive
{
    public byte[] Read(long lba, int size)
    {
        Console.WriteLine($"硬盘: 从扇区 {lba} 读取 {size} 字节");
        return new byte[size];
    }
}

public class ComputerFacade
{
    private readonly CPU _cpu = new();
    private readonly Memory _memory = new();
    private readonly HardDrive _hardDrive = new();
    
    private const long BootAddress = 0x7C00;
    private const long BootSector = 0;
    private const int SectorSize = 512;
    
    public void Start()
    {
        Console.WriteLine("=== 启动计算机 ===");
        _cpu.Freeze();
        var bootData = _hardDrive.Read(BootSector, SectorSize);
        _memory.Load(BootAddress, bootData);
        _cpu.Jump(BootAddress);
        _cpu.Execute();
        Console.WriteLine("计算机启动完成!\n");
    }
}

public class SubsystemA
{
    public void OperationA1()
    {
        Console.WriteLine("子系统A: 执行操作A1");
    }
    
    public void OperationA2()
    {
        Console.WriteLine("子系统A: 执行操作A2");
    }
}

public class SubsystemB
{
    public void OperationB1()
    {
        Console.WriteLine("子系统B: 执行操作B1");
    }
    
    public void OperationB2()
    {
        Console.WriteLine("子系统B: 执行操作B2");
    }
}

public class SubsystemC
{
    public void OperationC1()
    {
        Console.WriteLine("子系统C: 执行操作C1");
    }
    
    public void OperationC2()
    {
        Console.WriteLine("子系统C: 执行操作C2");
    }
}

public class Facade
{
    private readonly SubsystemA _subsystemA = new();
    private readonly SubsystemB _subsystemB = new();
    private readonly SubsystemC _subsystemC = new();
    
    public void Operation1()
    {
        Console.WriteLine("外观: 执行操作1");
        _subsystemA.OperationA1();
        _subsystemB.OperationB1();
        Console.WriteLine();
    }
    
    public void Operation2()
    {
        Console.WriteLine("外观: 执行操作2");
        _subsystemA.OperationA2();
        _subsystemC.OperationC1();
        _subsystemB.OperationB2();
        Console.WriteLine();
    }
    
    public void ComplexOperation()
    {
        Console.WriteLine("外观: 执行复杂操作");
        _subsystemA.OperationA1();
        _subsystemA.OperationA2();
        _subsystemB.OperationB1();
        _subsystemB.OperationB2();
        _subsystemC.OperationC1();
        _subsystemC.OperationC2();
        Console.WriteLine();
    }
}

public class OrderSystem
{
    public void CreateOrder(string productId, int quantity)
    {
        Console.WriteLine($"订单系统: 创建订单 - 产品ID: {productId}, 数量: {quantity}");
    }
}

public class InventorySystem
{
    public bool CheckStock(string productId, int quantity)
    {
        Console.WriteLine($"库存系统: 检查库存 - 产品ID: {productId}");
        return true;
    }
    
    public void ReduceStock(string productId, int quantity)
    {
        Console.WriteLine($"库存系统: 扣减库存 - 产品ID: {productId}, 数量: {quantity}");
    }
}

public class PaymentSystem
{
    public bool ProcessPayment(decimal amount)
    {
        Console.WriteLine($"支付系统: 处理支付 - 金额: ¥{amount}");
        return true;
    }
}

public class ShippingSystem
{
    public void ArrangeShipping(string productId, string address)
    {
        Console.WriteLine($"物流系统: 安排发货 - 产品ID: {productId}, 地址: {address}");
    }
}

public class ECommerceFacade
{
    private readonly OrderSystem _orderSystem = new();
    private readonly InventorySystem _inventorySystem = new();
    private readonly PaymentSystem _paymentSystem = new();
    private readonly ShippingSystem _shippingSystem = new();
    
    public void PlaceOrder(string productId, int quantity, decimal amount, string address)
    {
        Console.WriteLine("=== 开始下单流程 ===\n");
        
        if (!_inventorySystem.CheckStock(productId, quantity))
        {
            Console.WriteLine("库存不足,下单失败");
            return;
        }
        
        _orderSystem.CreateOrder(productId, quantity);
        
        if (!_paymentSystem.ProcessPayment(amount))
        {
            Console.WriteLine("支付失败,下单失败");
            return;
        }
        
        _inventorySystem.ReduceStock(productId, quantity);
        _shippingSystem.ArrangeShipping(productId, address);
        
        Console.WriteLine("\n下单成功!");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 外观模式示例 ===\n");
        
        Console.WriteLine("场景1: 计算机启动\n");
        var computer = new ComputerFacade();
        computer.Start();
        
        Console.WriteLine("----------------------------------------\n");
        Console.WriteLine("场景2: 子系统操作\n");
        var facade = new Facade();
        facade.Operation1();
        facade.Operation2();
        facade.ComplexOperation();
        
        Console.WriteLine("----------------------------------------\n");
        Console.WriteLine("场景3: 电商下单流程\n");
        var ecommerce = new ECommerceFacade();
        ecommerce.PlaceOrder("PROD-001", 2, 299.99m, "北京市朝阳区xxx街道");
        
        Console.WriteLine("\n外观模式优点:");
        Console.WriteLine("- 简化客户端与复杂子系统的交互");
        Console.WriteLine("- 降低系统耦合度");
        Console.WriteLine("- 客户端无需了解子系统细节");
        Console.WriteLine("- 符合迪米特法则");
    }
}

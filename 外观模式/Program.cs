/**
 * 外观模式 (Facade Pattern)
 * 
 * 定义：为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，
 *       这个接口使得这一子系统更加容易使用。
 * 
 * 核心角色：
 * 1. 外观(Facade) - 提供统一的接口，简化子系统的使用
 * 2. 子系统(Subsystem) - 实现具体功能，被外观调用
 * 3. 客户端(Client) - 通过外观接口与子系统交互
 * 
 * 适用场景：
 * - 需要为复杂的子系统提供一个简单接口
 * - 客户端与子系统之间存在很多依赖
 * - 需要分层构建系统
 * 
 * 本示例展示了三个场景：
 * 1. 计算机启动 - 封装硬件启动流程
 * 2. 子系统操作 - 统一多个子系统的操作
 * 3. 电商下单流程 - 整合多个业务系统
 */

namespace 外观模式;

#region 场景1: 计算机启动

/// <summary>
/// 子系统 - CPU
/// </summary>
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

/// <summary>
/// 子系统 - 内存
/// </summary>
public class Memory
{
    public void Load(long position, byte[] data)
    {
        Console.WriteLine($"内存: 在位置 {position} 加载数据");
    }
}

/// <summary>
/// 子系统 - 硬盘
/// </summary>
public class HardDrive
{
    public byte[] Read(long lba, int size)
    {
        Console.WriteLine($"硬盘: 从扇区 {lba} 读取 {size} 字节");
        return new byte[size];
    }
}

/// <summary>
/// 外观 - 计算机外观类
/// 封装计算机启动的复杂流程
/// 
/// 关键点：
/// - 客户端只需调用 Start() 方法
/// - 内部协调 CPU、内存、硬盘的启动顺序
/// - 隐藏了复杂的启动细节
/// </summary>
public class ComputerFacade
{
    private readonly CPU _cpu = new();
    private readonly Memory _memory = new();
    private readonly HardDrive _hardDrive = new();
    
    private const long BootAddress = 0x7C00;
    private const long BootSector = 0;
    private const int SectorSize = 512;
    
    /// <summary>
    /// 启动计算机 - 封装复杂的启动流程
    /// </summary>
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

#endregion

#region 场景2: 子系统操作

/// <summary>
/// 子系统A
/// </summary>
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

/// <summary>
/// 子系统B
/// </summary>
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

/// <summary>
/// 子系统C
/// </summary>
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

/// <summary>
/// 外观 - 统一操作多个子系统
/// </summary>
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

#endregion

#region 场景3: 电商下单流程

/// <summary>
/// 子系统 - 订单系统
/// </summary>
public class OrderSystem
{
    public void CreateOrder(string productId, int quantity)
    {
        Console.WriteLine($"订单系统: 创建订单 - 产品ID: {productId}, 数量: {quantity}");
    }
}

/// <summary>
/// 子系统 - 库存系统
/// </summary>
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

/// <summary>
/// 子系统 - 支付系统
/// </summary>
public class PaymentSystem
{
    public bool ProcessPayment(decimal amount)
    {
        Console.WriteLine($"支付系统: 处理支付 - 金额: ¥{amount}");
        return true;
    }
}

/// <summary>
/// 子系统 - 物流系统
/// </summary>
public class ShippingSystem
{
    public void ArrangeShipping(string productId, string address)
    {
        Console.WriteLine($"物流系统: 安排发货 - 产品ID: {productId}, 地址: {address}");
    }
}

/// <summary>
/// 外观 - 电商外观类
/// 整合下单流程涉及的多个系统
/// 
/// 关键点：
/// - 客户端只需调用 PlaceOrder()
/// - 内部协调库存检查、订单创建、支付、发货等流程
/// - 处理各步骤之间的依赖关系
/// </summary>
public class ECommerceFacade
{
    private readonly OrderSystem _orderSystem = new();
    private readonly InventorySystem _inventorySystem = new();
    private readonly PaymentSystem _paymentSystem = new();
    private readonly ShippingSystem _shippingSystem = new();
    
    /// <summary>
    /// 下单 - 封装完整的下单流程
    /// </summary>
    public void PlaceOrder(string productId, int quantity, decimal amount, string address)
    {
        Console.WriteLine("=== 开始下单流程 ===\n");
        
        // 检查库存
        if (!_inventorySystem.CheckStock(productId, quantity))
        {
            Console.WriteLine("库存不足,下单失败");
            return;
        }
        
        // 创建订单
        _orderSystem.CreateOrder(productId, quantity);
        
        // 处理支付
        if (!_paymentSystem.ProcessPayment(amount))
        {
            Console.WriteLine("支付失败,下单失败");
            return;
        }
        
        // 扣减库存
        _inventorySystem.ReduceStock(productId, quantity);
        
        // 安排发货
        _shippingSystem.ArrangeShipping(productId, address);
        
        Console.WriteLine("\n下单成功!");
    }
}

#endregion

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

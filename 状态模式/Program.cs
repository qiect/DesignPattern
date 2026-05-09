/**
 * 状态模式 (State Pattern)
 * 
 * 定义：允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。
 * 
 * 核心角色：
 * 1. 抽象状态(State) - 定义一个接口以封装与上下文的一个特定状态相关的行为
 * 2. 具体状态(Concrete State) - 每一个子类实现一个与上下文的一个状态相关的行为
 * 3. 上下文(Context) - 维护一个具体状态实例，定义当前状态
 * 
 * 适用场景：
 * - 对象的行为取决于它的状态，并且它必须在运行时根据状态改变行为
 * - 一个操作中含有庞大的多分支条件语句，且这些分支依赖于该对象的状态
 * 
 * 本示例展示了两个场景：
 * 1. 订单状态管理 - 复杂状态转换
 * 2. 交通信号灯 - 简单状态循环
 */

namespace 状态模式;

#region 场景1: 订单状态管理

/// <summary>
/// 抽象状态 - 订单状态接口
/// 定义所有订单状态共有的行为
/// </summary>
public interface IOrderState
{
    /// <summary>
    /// 支付订单
    /// </summary>
    void Pay(OrderContext order);
    
    /// <summary>
    /// 发货
    /// </summary>
    void Ship(OrderContext order);
    
    /// <summary>
    /// 确认收货
    /// </summary>
    void Deliver(OrderContext order);
    
    /// <summary>
    /// 取消订单
    /// </summary>
    void Cancel(OrderContext order);
    
    /// <summary>
    /// 获取状态名称
    /// </summary>
    string GetStateName();
}

/// <summary>
/// 上下文 - 订单上下文
/// 维护当前订单状态，并将行为委托给当前状态对象
/// 
/// 关键点：
/// - 持有当前状态对象的引用
/// - 将请求委托给当前状态处理
/// - 状态对象负责状态转换
/// </summary>
public class OrderContext
{
    private IOrderState _state;
    
    /// <summary>
    /// 构造函数 - 设置初始状态
    /// </summary>
    public OrderContext(IOrderState initialState)
    {
        _state = initialState;
    }
    
    /// <summary>
    /// 设置新状态 - 由状态对象调用
    /// </summary>
    public void SetState(IOrderState state)
    {
        _state = state;
    }
    
    /// <summary>
    /// 支付 - 委托给当前状态处理
    /// </summary>
    public void Pay()
    {
        _state.Pay(this);
    }
    
    /// <summary>
    /// 发货 - 委托给当前状态处理
    /// </summary>
    public void Ship()
    {
        _state.Ship(this);
    }
    
    /// <summary>
    /// 确认收货 - 委托给当前状态处理
    /// </summary>
    public void Deliver()
    {
        _state.Deliver(this);
    }
    
    /// <summary>
    /// 取消订单 - 委托给当前状态处理
    /// </summary>
    public void Cancel()
    {
        _state.Cancel(this);
    }
    
    /// <summary>
    /// 获取当前状态名称
    /// </summary>
    public string GetState()
    {
        return _state.GetStateName();
    }
}

/// <summary>
/// 具体状态 - 新建订单状态
/// 订单刚创建，等待支付
/// </summary>
public class NewOrderState : IOrderState
{
    public void Pay(OrderContext order)
    {
        Console.WriteLine("订单已支付");
        order.SetState(new PaidOrderState());
    }
    
    public void Ship(OrderContext order)
    {
        Console.WriteLine("无法发货: 订单尚未支付");
    }
    
    public void Deliver(OrderContext order)
    {
        Console.WriteLine("无法确认收货: 订单尚未支付");
    }
    
    public void Cancel(OrderContext order)
    {
        Console.WriteLine("订单已取消");
        order.SetState(new CancelledOrderState());
    }
    
    public string GetStateName() => "新建订单";
}

/// <summary>
/// 具体状态 - 已支付状态
/// 订单已支付，等待发货
/// </summary>
public class PaidOrderState : IOrderState
{
    public void Pay(OrderContext order)
    {
        Console.WriteLine("订单已支付,无需重复支付");
    }
    
    public void Ship(OrderContext order)
    {
        Console.WriteLine("订单已发货");
        order.SetState(new ShippedOrderState());
    }
    
    public void Deliver(OrderContext order)
    {
        Console.WriteLine("无法确认收货: 订单尚未发货");
    }
    
    public void Cancel(OrderContext order)
    {
        Console.WriteLine("订单已取消,退款将在3-5个工作日内到账");
        order.SetState(new CancelledOrderState());
    }
    
    public string GetStateName() => "已支付";
}

/// <summary>
/// 具体状态 - 已发货状态
/// 订单已发货，等待收货
/// </summary>
public class ShippedOrderState : IOrderState
{
    public void Pay(OrderContext order)
    {
        Console.WriteLine("订单已支付,无需重复支付");
    }
    
    public void Ship(OrderContext order)
    {
        Console.WriteLine("订单已发货,无需重复发货");
    }
    
    public void Deliver(OrderContext order)
    {
        Console.WriteLine("订单已确认收货");
        order.SetState(new DeliveredOrderState());
    }
    
    public void Cancel(OrderContext order)
    {
        Console.WriteLine("订单已发货,无法取消,请申请退货");
    }
    
    public string GetStateName() => "已发货";
}

/// <summary>
/// 具体状态 - 已收货状态
/// 订单已完成
/// </summary>
public class DeliveredOrderState : IOrderState
{
    public void Pay(OrderContext order)
    {
        Console.WriteLine("订单已支付,无需重复支付");
    }
    
    public void Ship(OrderContext order)
    {
        Console.WriteLine("订单已发货,无需重复发货");
    }
    
    public void Deliver(OrderContext order)
    {
        Console.WriteLine("订单已确认收货,无需重复确认");
    }
    
    public void Cancel(OrderContext order)
    {
        Console.WriteLine("订单已完成,无法取消,请申请退货");
    }
    
    public string GetStateName() => "已收货";
}

/// <summary>
/// 具体状态 - 已取消状态
/// 订单已取消，无法进行任何操作
/// </summary>
public class CancelledOrderState : IOrderState
{
    public void Pay(OrderContext order)
    {
        Console.WriteLine("订单已取消,无法支付");
    }
    
    public void Ship(OrderContext order)
    {
        Console.WriteLine("订单已取消,无法发货");
    }
    
    public void Deliver(OrderContext order)
    {
        Console.WriteLine("订单已取消,无法确认收货");
    }
    
    public void Cancel(OrderContext order)
    {
        Console.WriteLine("订单已取消,无需重复取消");
    }
    
    public string GetStateName() => "已取消";
}

#endregion

#region 场景2: 交通信号灯

/// <summary>
/// 抽象状态 - 交通灯状态接口
/// </summary>
public interface ITrafficLightState
{
    /// <summary>
    /// 处理状态变化
    /// </summary>
    void Handle(TrafficLightContext context);
    
    /// <summary>
    /// 获取灯的颜色
    /// </summary>
    string GetColor();
}

/// <summary>
/// 上下文 - 交通灯上下文
/// </summary>
public class TrafficLightContext
{
    private ITrafficLightState _state;
    
    public TrafficLightContext(ITrafficLightState initialState)
    {
        _state = initialState;
    }
    
    public void SetState(ITrafficLightState state)
    {
        _state = state;
    }
    
    /// <summary>
    /// 切换信号灯
    /// </summary>
    public void Change()
    {
        _state.Handle(this);
    }
    
    public string GetCurrentColor()
    {
        return _state.GetColor();
    }
}

/// <summary>
/// 具体状态 - 红灯状态
/// </summary>
public class RedLightState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("红灯 -> 绿灯");
        context.SetState(new GreenLightState());
    }
    
    public string GetColor() => "红灯";
}

/// <summary>
/// 具体状态 - 绿灯状态
/// </summary>
public class GreenLightState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("绿灯 -> 黄灯");
        context.SetState(new YellowLightState());
    }
    
    public string GetColor() => "绿灯";
}

/// <summary>
/// 具体状态 - 黄灯状态
/// </summary>
public class YellowLightState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("黄灯 -> 红灯");
        context.SetState(new RedLightState());
    }
    
    public string GetColor() => "黄灯";
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 状态模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 订单状态管理\n");
        
        var order = new OrderContext(new NewOrderState());
        Console.WriteLine($"当前状态: {order.GetState()}");
        
        Console.WriteLine("\n--- 尝试发货 ---");
        order.Ship();
        
        Console.WriteLine("\n--- 支付订单 ---");
        order.Pay();
        Console.WriteLine($"当前状态: {order.GetState()}");
        
        Console.WriteLine("\n--- 发货 ---");
        order.Ship();
        Console.WriteLine($"当前状态: {order.GetState()}");
        
        Console.WriteLine("\n--- 尝试取消 ---");
        order.Cancel();
        
        Console.WriteLine("\n--- 确认收货 ---");
        order.Deliver();
        Console.WriteLine($"当前状态: {order.GetState()}");
        
        Console.WriteLine("\n--- 尝试再次取消 ---");
        order.Cancel();
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 交通信号灯\n");
        
        var trafficLight = new TrafficLightContext(new RedLightState());
        
        Console.WriteLine($"当前信号: {trafficLight.GetCurrentColor()}");
        
        for (int i = 0; i < 6; i++)
        {
            Console.WriteLine($"\n--- 切换信号 {i + 1} ---");
            trafficLight.Change();
            Console.WriteLine($"当前信号: {trafficLight.GetCurrentColor()}");
        }
        #endregion
        
        Console.WriteLine("\n状态模式优点:");
        Console.WriteLine("- 将状态转换逻辑封装在状态类中");
        Console.WriteLine("- 消除大量的条件判断语句");
        Console.WriteLine("- 符合开闭原则,易于添加新状态");
        Console.WriteLine("- 状态转换逻辑清晰");
    }
}

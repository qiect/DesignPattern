namespace 状态模式;

public interface IOrderState
{
    void Pay(OrderContext order);
    void Ship(OrderContext order);
    void Deliver(OrderContext order);
    void Cancel(OrderContext order);
    string GetStateName();
}

public class OrderContext
{
    private IOrderState _state;
    
    public OrderContext(IOrderState initialState)
    {
        _state = initialState;
    }
    
    public void SetState(IOrderState state)
    {
        _state = state;
    }
    
    public void Pay()
    {
        _state.Pay(this);
    }
    
    public void Ship()
    {
        _state.Ship(this);
    }
    
    public void Deliver()
    {
        _state.Deliver(this);
    }
    
    public void Cancel()
    {
        _state.Cancel(this);
    }
    
    public string GetState()
    {
        return _state.GetStateName();
    }
}

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

public interface ITrafficLightState
{
    void Handle(TrafficLightContext context);
    string GetColor();
}

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
    
    public void Change()
    {
        _state.Handle(this);
    }
    
    public string GetCurrentColor()
    {
        return _state.GetColor();
    }
}

public class RedLightState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("红灯 -> 绿灯");
        context.SetState(new GreenLightState());
    }
    
    public string GetColor() => "红灯";
}

public class GreenLightState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("绿灯 -> 黄灯");
        context.SetState(new YellowLightState());
    }
    
    public string GetColor() => "绿灯";
}

public class YellowLightState : ITrafficLightState
{
    public void Handle(TrafficLightContext context)
    {
        Console.WriteLine("黄灯 -> 红灯");
        context.SetState(new RedLightState());
    }
    
    public string GetColor() => "黄灯";
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 状态模式示例 ===\n");
        
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
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景2: 交通信号灯\n");
        
        var trafficLight = new TrafficLightContext(new RedLightState());
        
        Console.WriteLine($"当前信号: {trafficLight.GetCurrentColor()}");
        
        for (int i = 0; i < 6; i++)
        {
            Console.WriteLine($"\n--- 切换信号 {i + 1} ---");
            trafficLight.Change();
            Console.WriteLine($"当前信号: {trafficLight.GetCurrentColor()}");
        }
        
        Console.WriteLine("\n状态模式优点:");
        Console.WriteLine("- 将状态转换逻辑封装在状态类中");
        Console.WriteLine("- 消除大量的条件判断语句");
        Console.WriteLine("- 符合开闭原则,易于添加新状态");
        Console.WriteLine("- 状态转换逻辑清晰");
    }
}

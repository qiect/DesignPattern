/**
 * 中介者模式 (Mediator Pattern)
 * 
 * 定义：用一个中介对象封装一系列对象的交互，中介者使各对象不需要显式地相互引用，
 *       从而使其耦合松散，而且可以独立地改变它们之间的交互。
 * 
 * 核心角色：
 * 1. 抽象中介者(Mediator) - 定义同事对象到中介者对象的接口
 * 2. 具体中介者(Concrete Mediator) - 实现抽象中介者接口，协调各同事对象
 * 3. 抽象同事类(Colleague) - 定义同事对象的接口
 * 4. 具体同事类(Concrete Colleague) - 实现抽象同事类，每个同事对象都知道中介者对象
 * 
 * 适用场景：
 * - 对象间存在复杂的引用关系，导致系统结构混乱
 * - 一个对象引用很多其他对象，导致难以复用
 * - 想通过一个中间类来封装多个类中的行为
 * 
 * 本示例展示了两个场景：
 * 1. 聊天室系统 - 用户通过聊天室中介者进行通信
 * 2. 机场塔台调度系统 - 飞机通过塔台中介者协调起降
 */

namespace 中介者模式;

#region 场景1: 聊天室系统

/// <summary>
/// 抽象中介者 - 聊天室中介者接口
/// 定义用户注册和消息发送的抽象方法
/// </summary>
public interface IChatMediator
{
    /// <summary>
    /// 发送消息给其他用户
    /// </summary>
    /// <param name="message">消息内容</param>
    /// <param name="sender">发送者</param>
    void SendMessage(string message, User sender);
    
    /// <summary>
    /// 注册用户到聊天室
    /// </summary>
    /// <param name="user">要注册的用户</param>
    void RegisterUser(User user);
}

/// <summary>
/// 抽象同事类 - 用户基类
/// 持有中介者引用，定义发送和接收消息的抽象方法
/// </summary>
public abstract class User
{
    /// <summary>
    /// 中介者引用 - 用于与其他用户通信
    /// </summary>
    protected IChatMediator _mediator;
    
    /// <summary>
    /// 用户名称
    /// </summary>
    public string Name { get; }
    
    /// <summary>
    /// 构造函数 - 注入中介者
    /// </summary>
    public User(IChatMediator mediator, string name)
    {
        _mediator = mediator;
        Name = name;
    }
    
    /// <summary>
    /// 发送消息
    /// </summary>
    public abstract void Send(string message);
    
    /// <summary>
    /// 接收消息
    /// </summary>
    /// <param name="message">消息内容</param>
    /// <param name="from">发送者名称</param>
    public abstract void Receive(string message, string from);
}

/// <summary>
/// 具体同事类 - 聊天用户
/// 实现具体的发送和接收消息逻辑
/// </summary>
public class ChatUser : User
{
    public ChatUser(IChatMediator mediator, string name) : base(mediator, name) { }
    
    /// <summary>
    /// 发送消息 - 通过中介者转发给其他用户
    /// </summary>
    public override void Send(string message)
    {
        Console.WriteLine($"[{Name}] 发送消息: {message}");
        _mediator.SendMessage(message, this);
    }
    
    /// <summary>
    /// 接收消息 - 显示来自其他用户的消息
    /// </summary>
    public override void Receive(string message, string from)
    {
        Console.WriteLine($"[{Name}] 收到来自 [{from}] 的消息: {message}");
    }
}

/// <summary>
/// 具体中介者 - 聊天室
/// 管理所有用户，负责消息的转发
/// 
/// 关键点：
/// - 用户之间不直接通信，都通过聊天室转发
/// - 降低了用户之间的耦合度
/// </summary>
public class ChatRoom : IChatMediator
{
    /// <summary>
    /// 聊天室内的所有用户列表
    /// </summary>
    private readonly List<User> _users = new();
    
    /// <summary>
    /// 注册用户到聊天室
    /// </summary>
    public void RegisterUser(User user)
    {
        _users.Add(user);
        Console.WriteLine($"用户 [{user.Name}] 加入聊天室");
    }
    
    /// <summary>
    /// 发送消息 - 将消息转发给除发送者外的所有用户
    /// </summary>
    public void SendMessage(string message, User sender)
    {
        foreach (var user in _users)
        {
            // 不发给自己
            if (user != sender)
            {
                user.Receive(message, sender.Name);
            }
        }
    }
}

#endregion

#region 场景2: 机场塔台调度系统

/// <summary>
/// 抽象中介者 - 塔台中介者接口
/// 定义飞机注册和起降请求的抽象方法
/// </summary>
public interface ITowerMediator
{
    /// <summary>
    /// 请求降落
    /// </summary>
    void RequestLanding(Airplane airplane);
    
    /// <summary>
    /// 请求起飞
    /// </summary>
    void RequestTakeoff(Airplane airplane);
    
    /// <summary>
    /// 注册飞机
    /// </summary>
    void RegisterAirplane(Airplane airplane);
}

/// <summary>
/// 具体同事类 - 飞机
/// 通过塔台中介者协调起降
/// </summary>
public class Airplane
{
    /// <summary>
    /// 航班号
    /// </summary>
    public string FlightNumber { get; }
    
    /// <summary>
    /// 塔台中介者引用
    /// </summary>
    private ITowerMediator _tower;
    
    public Airplane(string flightNumber, ITowerMediator tower)
    {
        FlightNumber = flightNumber;
        _tower = tower;
    }
    
    /// <summary>
    /// 请求降落 - 向塔台发送请求
    /// </summary>
    public void RequestLanding()
    {
        Console.WriteLine($"航班 {FlightNumber} 请求降落");
        _tower.RequestLanding(this);
    }
    
    /// <summary>
    /// 请求起飞 - 向塔台发送请求
    /// </summary>
    public void RequestTakeoff()
    {
        Console.WriteLine($"航班 {FlightNumber} 请求起飞");
        _tower.RequestTakeoff(this);
    }
    
    /// <summary>
    /// 执行降落
    /// </summary>
    public void Land()
    {
        Console.WriteLine($"航班 {FlightNumber} 正在降落...");
    }
    
    /// <summary>
    /// 执行起飞
    /// </summary>
    public void Takeoff()
    {
        Console.WriteLine($"航班 {FlightNumber} 正在起飞...");
    }
}

/// <summary>
/// 具体中介者 - 控制塔台
/// 协调飞机的起降顺序，管理跑道资源
/// 
/// 关键点：
/// - 飞机之间不直接协调，都通过塔台
/// - 塔台负责管理共享资源（跑道）
/// - 实现了排队等待机制
/// </summary>
public class ControlTower : ITowerMediator
{
    /// <summary>
    /// 降落等待队列
    /// </summary>
    private readonly Queue<Airplane> _landingQueue = new();
    
    /// <summary>
    /// 起飞等待队列
    /// </summary>
    private readonly Queue<Airplane> _takeoffQueue = new();
    
    /// <summary>
    /// 跑道是否可用
    /// </summary>
    private bool _runwayAvailable = true;
    
    /// <summary>
    /// 注册飞机
    /// </summary>
    public void RegisterAirplane(Airplane airplane)
    {
        Console.WriteLine($"塔台: 航班 {airplane.FlightNumber} 已注册");
    }
    
    /// <summary>
    /// 处理降落请求
    /// 如果跑道空闲则批准，否则加入等待队列
    /// </summary>
    public void RequestLanding(Airplane airplane)
    {
        if (_runwayAvailable)
        {
            _runwayAvailable = false;
            Console.WriteLine($"塔台: 批准航班 {airplane.FlightNumber} 降落");
            airplane.Land();
            _runwayAvailable = true;
        }
        else
        {
            Console.WriteLine($"塔台: 跑道繁忙,航班 {airplane.FlightNumber} 进入等待队列");
            _landingQueue.Enqueue(airplane);
        }
    }
    
    /// <summary>
    /// 处理起飞请求
    /// 如果跑道空闲则批准，否则加入等待队列
    /// </summary>
    public void RequestTakeoff(Airplane airplane)
    {
        if (_runwayAvailable)
        {
            _runwayAvailable = false;
            Console.WriteLine($"塔台: 批准航班 {airplane.FlightNumber} 起飞");
            airplane.Takeoff();
            _runwayAvailable = true;
        }
        else
        {
            Console.WriteLine($"塔台: 跑道繁忙,航班 {airplane.FlightNumber} 进入等待队列");
            _takeoffQueue.Enqueue(airplane);
        }
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 中介者模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 聊天室系统\n");
        
        // 创建中介者（聊天室）
        var chatRoom = new ChatRoom();
        
        // 创建用户并注册到聊天室
        var alice = new ChatUser(chatRoom, "Alice");
        var bob = new ChatUser(chatRoom, "Bob");
        var charlie = new ChatUser(chatRoom, "Charlie");
        
        chatRoom.RegisterUser(alice);
        chatRoom.RegisterUser(bob);
        chatRoom.RegisterUser(charlie);
        
        Console.WriteLine();
        alice.Send("大家好!");
        Console.WriteLine();
        bob.Send("你好 Alice!");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 机场塔台调度系统\n");
        
        // 创建中介者（控制塔台）
        var tower = new ControlTower();
        
        // 创建飞机并注册
        var flight1 = new Airplane("CA123", tower);
        var flight2 = new Airplane("MU456", tower);
        var flight3 = new Airplane("CZ789", tower);
        
        tower.RegisterAirplane(flight1);
        tower.RegisterAirplane(flight2);
        tower.RegisterAirplane(flight3);
        
        Console.WriteLine();
        flight1.RequestLanding();
        Console.WriteLine();
        flight2.RequestLanding();
        Console.WriteLine();
        flight3.RequestTakeoff();
        #endregion
        
        Console.WriteLine("\n中介者模式优点:");
        Console.WriteLine("- 降低对象间的耦合度");
        Console.WriteLine("- 集中控制交互逻辑");
        Console.WriteLine("- 简化对象间的通信");
        Console.WriteLine("- 易于扩展新的中介者");
    }
}

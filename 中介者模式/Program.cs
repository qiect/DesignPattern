namespace 中介者模式;

public interface IChatMediator
{
    void SendMessage(string message, User sender);
    void RegisterUser(User user);
}

public abstract class User
{
    protected IChatMediator _mediator;
    public string Name { get; }
    
    public User(IChatMediator mediator, string name)
    {
        _mediator = mediator;
        Name = name;
    }
    
    public abstract void Send(string message);
    public abstract void Receive(string message, string from);
}

public class ChatUser : User
{
    public ChatUser(IChatMediator mediator, string name) : base(mediator, name) { }
    
    public override void Send(string message)
    {
        Console.WriteLine($"[{Name}] 发送消息: {message}");
        _mediator.SendMessage(message, this);
    }
    
    public override void Receive(string message, string from)
    {
        Console.WriteLine($"[{Name}] 收到来自 [{from}] 的消息: {message}");
    }
}

public class ChatRoom : IChatMediator
{
    private readonly List<User> _users = new();
    
    public void RegisterUser(User user)
    {
        _users.Add(user);
        Console.WriteLine($"用户 [{user.Name}] 加入聊天室");
    }
    
    public void SendMessage(string message, User sender)
    {
        foreach (var user in _users)
        {
            if (user != sender)
            {
                user.Receive(message, sender.Name);
            }
        }
    }
}

public interface ITowerMediator
{
    void RequestLanding(Airplane airplane);
    void RequestTakeoff(Airplane airplane);
    void RegisterAirplane(Airplane airplane);
}

public class Airplane
{
    public string FlightNumber { get; }
    private ITowerMediator _tower;
    
    public Airplane(string flightNumber, ITowerMediator tower)
    {
        FlightNumber = flightNumber;
        _tower = tower;
    }
    
    public void RequestLanding()
    {
        Console.WriteLine($"航班 {FlightNumber} 请求降落");
        _tower.RequestLanding(this);
    }
    
    public void RequestTakeoff()
    {
        Console.WriteLine($"航班 {FlightNumber} 请求起飞");
        _tower.RequestTakeoff(this);
    }
    
    public void Land()
    {
        Console.WriteLine($"航班 {FlightNumber} 正在降落...");
    }
    
    public void Takeoff()
    {
        Console.WriteLine($"航班 {FlightNumber} 正在起飞...");
    }
}

public class ControlTower : ITowerMediator
{
    private readonly Queue<Airplane> _landingQueue = new();
    private readonly Queue<Airplane> _takeoffQueue = new();
    private bool _runwayAvailable = true;
    
    public void RegisterAirplane(Airplane airplane)
    {
        Console.WriteLine($"塔台: 航班 {airplane.FlightNumber} 已注册");
    }
    
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

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 中介者模式示例 ===\n");
        
        Console.WriteLine("场景1: 聊天室系统\n");
        var chatRoom = new ChatRoom();
        
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
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景2: 机场塔台调度系统\n");
        
        var tower = new ControlTower();
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
        
        Console.WriteLine("\n中介者模式优点:");
        Console.WriteLine("- 降低对象间的耦合度");
        Console.WriteLine("- 集中控制交互逻辑");
        Console.WriteLine("- 简化对象间的通信");
        Console.WriteLine("- 易于扩展新的中介者");
    }
}

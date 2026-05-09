/**
 * 观察者模式 (Observer Pattern)
 * 
 * 定义：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，
 *       所有依赖于它的对象都得到通知并被自动更新。
 * 
 * 核心角色：
 * 1. 抽象主题(Subject) - 把所有观察者对象保存在一个集合中，提供添加和删除观察者的接口
 * 2. 具体主题(Concrete Subject) - 将有关状态存入具体观察者对象，在状态改变时通知观察者
 * 3. 抽象观察者(Observer) - 为所有具体观察者定义一个接口，在得到主题通知时更新自己
 * 4. 具体观察者(Concrete Observer) - 实现抽象观察者角色所要求的更新接口
 * 
 * 适用场景：
 * - 一个对象的改变需要同时改变其他对象
 * - 对象需要在不了解其他对象的情况下通知其他对象
 * - 事件处理系统
 * 
 * 本示例展示了三个场景：
 * 1. 新闻发布系统 - 一对多通知
 * 2. 股票价格监控 - 状态变化通知
 * 3. 天气监测站 - 数据更新通知
 */

namespace 观察者模式;

/// <summary>
/// 抽象观察者 - 定义更新接口
/// </summary>
public interface IObserver
{
    /// <summary>
    /// 接收主题通知并更新
    /// </summary>
    /// <param name="message">通知消息</param>
    void Update(string message);
}

/// <summary>
/// 抽象主题 - 定义注册、移除和通知观察者的接口
/// </summary>
public interface ISubject
{
    /// <summary>
    /// 添加观察者
    /// </summary>
    void Attach(IObserver observer);
    
    /// <summary>
    /// 移除观察者
    /// </summary>
    void Detach(IObserver observer);
    
    /// <summary>
    /// 通知所有观察者
    /// </summary>
    void Notify(string message);
}

#region 场景1: 新闻发布系统

/// <summary>
/// 具体主题 - 新闻社
/// 维护订阅者列表，发布新闻时通知所有订阅者
/// 
/// 关键点：
/// - 维护观察者列表
/// - 状态改变时遍历通知所有观察者
/// - 支持动态添加和移除观察者
/// </summary>
public class NewsAgency : ISubject
{
    private readonly List<IObserver> _observers = new();
    private string _latestNews = string.Empty;
    
    public void Attach(IObserver observer)
    {
        _observers.Add(observer);
        Console.WriteLine($"订阅者已添加,当前订阅者数量: {_observers.Count}");
    }
    
    public void Detach(IObserver observer)
    {
        _observers.Remove(observer);
        Console.WriteLine($"订阅者已移除,当前订阅者数量: {_observers.Count}");
    }
    
    public void Notify(string message)
    {
        _latestNews = message;
        Console.WriteLine($"\n新闻社发布新闻: {message}");
        foreach (var observer in _observers)
        {
            observer.Update(message);
        }
    }
}

/// <summary>
/// 具体观察者 - 新闻频道
/// </summary>
public class NewsChannel : IObserver
{
    private readonly string _name;
    
    public NewsChannel(string name)
    {
        _name = name;
    }
    
    public void Update(string message)
    {
        Console.WriteLine($"[{_name}] 收到新闻: {message}");
    }
}

/// <summary>
/// 具体观察者 - 移动应用
/// </summary>
public class MobileApp : IObserver
{
    private readonly string _appName;
    
    public MobileApp(string appName)
    {
        _appName = appName;
    }
    
    public void Update(string message)
    {
        Console.WriteLine($"[{_appName} App] 推送通知: {message}");
    }
}

/// <summary>
/// 具体观察者 - 网站
/// </summary>
public class Website : IObserver
{
    private readonly string _url;
    
    public Website(string url)
    {
        _url = url;
    }
    
    public void Update(string message)
    {
        Console.WriteLine($"[{_url}] 更新首页新闻: {message}");
    }
}

#endregion

#region 场景2: 股票价格监控

/// <summary>
/// 具体主题 - 股票
/// 当价格变化时自动通知投资者
/// </summary>
public class Stock
{
    private readonly string _symbol;
    private decimal _price;
    private readonly List<IObserver> _investors = new();
    
    public Stock(string symbol, decimal price)
    {
        _symbol = symbol;
        _price = price;
    }
    
    public void Attach(IObserver investor)
    {
        _investors.Add(investor);
    }
    
    public void Detach(IObserver investor)
    {
        _investors.Remove(investor);
    }
    
    /// <summary>
    /// 价格属性 - 设置时自动通知观察者
    /// </summary>
    public decimal Price
    {
        get => _price;
        set
        {
            var oldPrice = _price;
            _price = value;
            var change = ((_price - oldPrice) / oldPrice) * 100;
            Notify($"股票 {_symbol} 价格从 {oldPrice:C} 变为 {_price:C} (变化: {change:+0.00;-0.00}%)");
        }
    }
    
    private void Notify(string message)
    {
        foreach (var investor in _investors)
        {
            investor.Update(message);
        }
    }
}

/// <summary>
/// 具体观察者 - 投资者
/// </summary>
public class Investor : IObserver
{
    private readonly string _name;
    
    public Investor(string name)
    {
        _name = name;
    }
    
    public void Update(string message)
    {
        Console.WriteLine($"投资者 [{_name}] 收到通知: {message}");
    }
}

#endregion

#region 场景3: 天气监测站

/// <summary>
/// 具体主题 - 气象站
/// </summary>
public class WeatherStation
{
    private readonly List<IObserver> _displays = new();
    private float _temperature;
    private float _humidity;
    
    public void Attach(IObserver display)
    {
        _displays.Add(display);
    }
    
    /// <summary>
    /// 设置测量数据并通知观察者
    /// </summary>
    public void SetMeasurements(float temperature, float humidity)
    {
        _temperature = temperature;
        _humidity = humidity;
        Notify();
    }
    
    private void Notify()
    {
        var data = $"温度: {_temperature}°C, 湿度: {_humidity}%";
        foreach (var display in _displays)
        {
            display.Update(data);
        }
    }
}

/// <summary>
/// 具体观察者 - 当前天气显示
/// </summary>
public class CurrentConditionsDisplay : IObserver
{
    public void Update(string message)
    {
        Console.WriteLine($"[当前天气] {message}");
    }
}

/// <summary>
/// 具体观察者 - 统计数据显示
/// </summary>
public class StatisticsDisplay : IObserver
{
    public void Update(string message)
    {
        Console.WriteLine($"[统计数据] 记录天气数据: {message}");
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 观察者模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 新闻发布系统\n");
        
        var newsAgency = new NewsAgency();
        
        var channel1 = new NewsChannel("央视新闻");
        var channel2 = new NewsChannel("新华社");
        var app = new MobileApp("今日头条");
        var website = new Website("news.example.com");
        
        newsAgency.Attach(channel1);
        newsAgency.Attach(channel2);
        newsAgency.Attach(app);
        newsAgency.Attach(website);
        
        newsAgency.Notify("重大新闻: 我国成功发射新一代卫星");
        
        Console.WriteLine();
        newsAgency.Detach(channel2);
        newsAgency.Notify("科技新闻: 新款智能手机发布");
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 股票价格监控\n");
        
        var stock = new Stock("AAPL", 150.00m);
        
        var investor1 = new Investor("张三");
        var investor2 = new Investor("李四");
        var investor3 = new Investor("王五");
        
        stock.Attach(investor1);
        stock.Attach(investor2);
        stock.Attach(investor3);
        
        stock.Price = 155.00m;
        Console.WriteLine();
        stock.Price = 148.50m;
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 天气监测站\n");
        
        var weatherStation = new WeatherStation();
        
        var currentDisplay = new CurrentConditionsDisplay();
        var statsDisplay = new StatisticsDisplay();
        
        weatherStation.Attach(currentDisplay);
        weatherStation.Attach(statsDisplay);
        
        weatherStation.SetMeasurements(25.5f, 65.0f);
        Console.WriteLine();
        weatherStation.SetMeasurements(28.0f, 70.0f);
        #endregion
        
        Console.WriteLine("\n观察者模式优点:");
        Console.WriteLine("- 对象之间的一对多依赖关系");
        Console.WriteLine("- 主题和观察者之间松耦合");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 支持广播通信");
    }
}

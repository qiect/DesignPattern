namespace 观察者模式;

public interface IObserver
{
    void Update(string message);
}

public interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify(string message);
}

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

public class WeatherStation
{
    private readonly List<IObserver> _displays = new();
    private float _temperature;
    private float _humidity;
    
    public void Attach(IObserver display)
    {
        _displays.Add(display);
    }
    
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

public class CurrentConditionsDisplay : IObserver
{
    public void Update(string message)
    {
        Console.WriteLine($"[当前天气] {message}");
    }
}

public class StatisticsDisplay : IObserver
{
    public void Update(string message)
    {
        Console.WriteLine($"[统计数据] 记录天气数据: {message}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 观察者模式示例 ===\n");
        
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
        
        Console.WriteLine("\n----------------------------------------\n");
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
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景3: 天气监测站\n");
        
        var weatherStation = new WeatherStation();
        
        var currentDisplay = new CurrentConditionsDisplay();
        var statsDisplay = new StatisticsDisplay();
        
        weatherStation.Attach(currentDisplay);
        weatherStation.Attach(statsDisplay);
        
        weatherStation.SetMeasurements(25.5f, 65.0f);
        Console.WriteLine();
        weatherStation.SetMeasurements(28.0f, 70.0f);
        
        Console.WriteLine("\n观察者模式优点:");
        Console.WriteLine("- 对象之间的一对多依赖关系");
        Console.WriteLine("- 主题和观察者之间松耦合");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 支持广播通信");
    }
}

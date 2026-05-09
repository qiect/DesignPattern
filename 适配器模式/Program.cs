namespace 适配器模式;

public interface ITarget
{
    void Request();
}

public class Adaptee
{
    public void SpecificRequest()
    {
        Console.WriteLine("被适配者的特定请求方法");
    }
}

public class ClassAdapter : Adaptee, ITarget
{
    public void Request()
    {
        Console.WriteLine("类适配器: 调用被适配者的方法");
        SpecificRequest();
    }
}

public class ObjectAdapter : ITarget
{
    private readonly Adaptee _adaptee;
    
    public ObjectAdapter(Adaptee adaptee)
    {
        _adaptee = adaptee;
    }
    
    public void Request()
    {
        Console.WriteLine("对象适配器: 委托给被适配者");
        _adaptee.SpecificRequest();
    }
}

public interface INewPaymentSystem
{
    void ProcessPayment(decimal amount);
    void Refund(decimal amount);
}

public class LegacyPaymentSystem
{
    public void MakePayment(double amount)
    {
        Console.WriteLine($"旧支付系统: 处理支付 ¥{amount:F2}");
    }
    
    public void CancelPayment(double amount)
    {
        Console.WriteLine($"旧支付系统: 取消支付 ¥{amount:F2}");
    }
}

public class PaymentAdapter : INewPaymentSystem
{
    private readonly LegacyPaymentSystem _legacySystem;
    
    public PaymentAdapter(LegacyPaymentSystem legacySystem)
    {
        _legacySystem = legacySystem;
    }
    
    public void ProcessPayment(decimal amount)
    {
        Console.WriteLine($"支付适配器: 转换新接口到旧系统");
        _legacySystem.MakePayment((double)amount);
    }
    
    public void Refund(decimal amount)
    {
        Console.WriteLine($"支付适配器: 转换退款请求到旧系统");
        _legacySystem.CancelPayment((double)amount);
    }
}

public interface IMediaPlayer
{
    void Play(string fileName);
}

public interface IAdvancedMediaPlayer
{
    void PlayVlc(string fileName);
    void PlayMp4(string fileName);
}

public class VlcPlayer : IAdvancedMediaPlayer
{
    public void PlayVlc(string fileName)
    {
        Console.WriteLine($"VLC播放器: 播放 {fileName}");
    }
    
    public void PlayMp4(string fileName)
    {
    }
}

public class Mp4Player : IAdvancedMediaPlayer
{
    public void PlayVlc(string fileName)
    {
    }
    
    public void PlayMp4(string fileName)
    {
        Console.WriteLine($"MP4播放器: 播放 {fileName}");
    }
}

public class MediaAdapter : IMediaPlayer
{
    private readonly IAdvancedMediaPlayer _advancedMusicPlayer;
    
    public MediaAdapter(string audioType)
    {
        if (audioType.Equals("vlc", StringComparison.OrdinalIgnoreCase))
        {
            _advancedMusicPlayer = new VlcPlayer();
        }
        else if (audioType.Equals("mp4", StringComparison.OrdinalIgnoreCase))
        {
            _advancedMusicPlayer = new Mp4Player();
        }
        else
        {
            throw new NotSupportedException($"不支持的格式: {audioType}");
        }
    }
    
    public void Play(string fileName)
    {
        if (fileName.EndsWith(".vlc", StringComparison.OrdinalIgnoreCase))
        {
            _advancedMusicPlayer.PlayVlc(fileName);
        }
        else if (fileName.EndsWith(".mp4", StringComparison.OrdinalIgnoreCase))
        {
            _advancedMusicPlayer.PlayMp4(fileName);
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 适配器模式示例 ===\n");
        
        Console.WriteLine("场景1: 基本适配器\n");
        
        Console.WriteLine("--- 类适配器 ---");
        ITarget classAdapter = new ClassAdapter();
        classAdapter.Request();
        
        Console.WriteLine("\n--- 对象适配器 ---");
        ITarget objectAdapter = new ObjectAdapter(new Adaptee());
        objectAdapter.Request();
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景2: 支付系统集成\n");
        
        INewPaymentSystem paymentAdapter = new PaymentAdapter(new LegacyPaymentSystem());
        paymentAdapter.ProcessPayment(199.99m);
        paymentAdapter.Refund(50.00m);
        
        Console.WriteLine("\n----------------------------------------\n");
        Console.WriteLine("场景3: 媒体播放器适配\n");
        
        var vlcAdapter = new MediaAdapter("vlc");
        vlcAdapter.Play("movie.vlc");
        
        var mp4Adapter = new MediaAdapter("mp4");
        mp4Adapter.Play("video.mp4");
        
        Console.WriteLine("\n适配器模式优点:");
        Console.WriteLine("- 让不兼容的接口能够协同工作");
        Console.WriteLine("- 提高类的复用性");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 灵活性好,可以使用对象适配器替代继承");
    }
}

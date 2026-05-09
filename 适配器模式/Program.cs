/**
 * 适配器模式 (Adapter Pattern)
 * 
 * 定义：将一个类的接口转换成客户希望的另一个接口。适配器模式使得原本由于接口不兼容
 *       而不能一起工作的那些类可以一起工作。
 * 
 * 核心角色：
 * 1. 目标接口(Target) - 客户端期望的接口
 * 2. 被适配者(Adaptee) - 需要被适配的现有接口
 * 3. 适配器(Adapter) - 将被适配者接口转换为目标接口
 * 
 * 两种实现方式：
 * - 类适配器：通过继承实现（C#不支持多继承，只能继承一个类）
 * - 对象适配器：通过组合实现（推荐）
 * 
 * 适用场景：
 * - 需要使用现有类，但其接口与需要的接口不匹配
 * - 想创建一个可以复用的类，该类可以与其他不相关的类协同工作
 * - 需要统一多个类的接口
 * 
 * 本示例展示了三个场景：
 * 1. 基本适配器（类适配器和对象适配器）
 * 2. 支付系统集成
 * 3. 媒体播放器适配
 */

namespace 适配器模式;

#region 场景1: 基本适配器

/// <summary>
/// 目标接口 - 客户端期望的接口
/// </summary>
public interface ITarget
{
    void Request();
}

/// <summary>
/// 被适配者 - 现有的类，接口与目标不兼容
/// </summary>
public class Adaptee
{
    public void SpecificRequest()
    {
        Console.WriteLine("被适配者的特定请求方法");
    }
}

/// <summary>
/// 类适配器 - 通过继承实现
/// 
/// 特点：
/// - 直接继承被适配者
/// - C#不支持多继承，灵活性较低
/// </summary>
public class ClassAdapter : Adaptee, ITarget
{
    public void Request()
    {
        Console.WriteLine("类适配器: 调用被适配者的方法");
        SpecificRequest();
    }
}

/// <summary>
/// 对象适配器 - 通过组合实现（推荐）
/// 
/// 特点：
/// - 持有被适配者的引用
/// - 更灵活，可以适配多个被适配者
/// - 符合组合优于继承原则
/// </summary>
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

#endregion

#region 场景2: 支付系统集成

/// <summary>
/// 目标接口 - 新的支付系统接口
/// </summary>
public interface INewPaymentSystem
{
    void ProcessPayment(decimal amount);
    void Refund(decimal amount);
}

/// <summary>
/// 被适配者 - 旧的支付系统
/// 接口方法名和参数类型与新系统不同
/// </summary>
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

/// <summary>
/// 适配器 - 将旧支付系统适配到新接口
/// 
/// 关键点：
/// - 方法名映射：ProcessPayment -> MakePayment
/// - 参数类型转换：decimal -> double
/// </summary>
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

#endregion

#region 场景3: 媒体播放器适配

/// <summary>
/// 目标接口 - 简单媒体播放器
/// </summary>
public interface IMediaPlayer
{
    void Play(string fileName);
}

/// <summary>
/// 被适配者接口 - 高级媒体播放器
/// </summary>
public interface IAdvancedMediaPlayer
{
    void PlayVlc(string fileName);
    void PlayMp4(string fileName);
}

/// <summary>
/// 具体被适配者 - VLC播放器
/// </summary>
public class VlcPlayer : IAdvancedMediaPlayer
{
    public void PlayVlc(string fileName)
    {
        Console.WriteLine($"VLC播放器: 播放 {fileName}");
    }
    
    public void PlayMp4(string fileName)
    {
        // VLC播放器不支持MP4
    }
}

/// <summary>
/// 具体被适配者 - MP4播放器
/// </summary>
public class Mp4Player : IAdvancedMediaPlayer
{
    public void PlayVlc(string fileName)
    {
        // MP4播放器不支持VLC
    }
    
    public void PlayMp4(string fileName)
    {
        Console.WriteLine($"MP4播放器: 播放 {fileName}");
    }
}

/// <summary>
/// 适配器 - 将高级播放器适配到简单播放器接口
/// 
/// 关键点：
/// - 根据文件类型选择合适的播放器
/// - 统一了不同播放器的接口
/// </summary>
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

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 适配器模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 基本适配器\n");
        
        Console.WriteLine("--- 类适配器 ---");
        ITarget classAdapter = new ClassAdapter();
        classAdapter.Request();
        
        Console.WriteLine("\n--- 对象适配器 ---");
        ITarget objectAdapter = new ObjectAdapter(new Adaptee());
        objectAdapter.Request();
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 支付系统集成\n");
        
        INewPaymentSystem paymentAdapter = new PaymentAdapter(new LegacyPaymentSystem());
        paymentAdapter.ProcessPayment(199.99m);
        paymentAdapter.Refund(50.00m);
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 媒体播放器适配\n");
        
        var vlcAdapter = new MediaAdapter("vlc");
        vlcAdapter.Play("movie.vlc");
        
        var mp4Adapter = new MediaAdapter("mp4");
        mp4Adapter.Play("video.mp4");
        #endregion
        
        Console.WriteLine("\n适配器模式优点:");
        Console.WriteLine("- 让不兼容的接口能够协同工作");
        Console.WriteLine("- 提高类的复用性");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 灵活性好,可以使用对象适配器替代继承");
    }
}

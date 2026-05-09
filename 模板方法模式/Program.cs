/**
 * 模板方法模式 (Template Method Pattern)
 * 
 * 定义：定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。
 *       模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。
 * 
 * 核心角色：
 * 1. 抽象类(Abstract Class) - 定义抽象的原语操作，实现模板方法
 * 2. 具体类(Concrete Class) - 实现原语操作以完成算法中特定步骤
 * 
 * 方法类型：
 * - 抽象方法：子类必须实现
 * - 具体方法：子类可直接继承
 * - 钩子方法：子类可选择重写
 * 
 * 适用场景：
 * - 一次性实现一个算法的不变部分，并将可变的行为留给子类实现
 * - 各子类中公共行为应被提取出来集中到一个公共父类中
 * - 控制子类扩展
 * 
 * 本示例展示了三个场景：
 * 1. 数据挖掘 - 不同格式文件的处理
 * 2. 饮品制作 - 相同流程不同实现
 * 3. 报告生成 - 统一骨架不同细节
 */

namespace 模板方法模式;

#region 场景1: 数据挖掘

/// <summary>
/// 抽象类 - 数据挖掘基类
/// 定义数据挖掘的算法骨架
/// 
/// 关键点：
/// - Mine() 是模板方法，定义算法骨架
/// - OpenFile/ExtractData/CloseFile 是抽象方法，子类必须实现
/// - ParseData/AnalyzeData/SendReport 是钩子方法，子类可选重写
/// </summary>
public abstract class DataMiner
{
    /// <summary>
    /// 模板方法 - 定义算法骨架
    /// 用 sealed 防止子类重写
    /// </summary>
    public void Mine(string path)
    {
        OpenFile(path);
        ExtractData();
        ParseData();
        AnalyzeData();
        SendReport();
        CloseFile();
    }
    
    /// <summary>
    /// 抽象方法 - 打开文件，子类必须实现
    /// </summary>
    protected abstract void OpenFile(string path);
    
    /// <summary>
    /// 抽象方法 - 提取数据，子类必须实现
    /// </summary>
    protected abstract void ExtractData();
    
    /// <summary>
    /// 抽象方法 - 关闭文件，子类必须实现
    /// </summary>
    protected abstract void CloseFile();
    
    /// <summary>
    /// 钩子方法 - 解析数据，子类可选重写
    /// </summary>
    protected virtual void ParseData()
    {
        Console.WriteLine("解析数据...");
    }
    
    /// <summary>
    /// 钩子方法 - 分析数据，子类可选重写
    /// </summary>
    protected virtual void AnalyzeData()
    {
        Console.WriteLine("分析数据...");
    }
    
    /// <summary>
    /// 钩子方法 - 发送报告，子类可选重写
    /// </summary>
    protected virtual void SendReport()
    {
        Console.WriteLine("发送分析报告...");
    }
}

/// <summary>
/// 具体类 - PDF数据挖掘
/// 实现PDF特定的文件操作
/// </summary>
public class PdfDataMiner : DataMiner
{
    protected override void OpenFile(string path)
    {
        Console.WriteLine($"打开PDF文件: {path}");
    }
    
    protected override void ExtractData()
    {
        Console.WriteLine("从PDF提取文本数据");
    }
    
    protected override void CloseFile()
    {
        Console.WriteLine("关闭PDF文件");
    }
}

/// <summary>
/// 具体类 - CSV数据挖掘
/// 实现CSV特定的文件操作，并重写解析方法
/// </summary>
public class CsvDataMiner : DataMiner
{
    protected override void OpenFile(string path)
    {
        Console.WriteLine($"打开CSV文件: {path}");
    }
    
    protected override void ExtractData()
    {
        Console.WriteLine("读取CSV行数据");
    }
    
    protected override void CloseFile()
    {
        Console.WriteLine("关闭CSV文件");
    }
    
    /// <summary>
    /// 重写钩子方法 - CSV特定的解析逻辑
    /// </summary>
    protected override void ParseData()
    {
        Console.WriteLine("解析CSV格式数据...");
    }
}

#endregion

#region 场景2: 饮品制作

/// <summary>
/// 抽象类 - 饮品制作基类
/// 定义饮品制作的算法骨架
/// 
/// 关键点：
/// - PrepareBeverage() 是模板方法
/// - BoilWater/PourInCup 是具体方法，所有子类共享
/// - Brew/AddCondiments 是抽象方法，子类必须实现
/// - CustomerWantsCondiments 是钩子方法，控制流程分支
/// </summary>
public abstract class BeverageMaker
{
    /// <summary>
    /// 模板方法 - 定义饮品制作流程
    /// </summary>
    public void PrepareBeverage()
    {
        BoilWater();
        Brew();
        PourInCup();
        if (CustomerWantsCondiments())
        {
            AddCondiments();
        }
        Console.WriteLine("饮品制作完成!\n");
    }
    
    /// <summary>
    /// 具体方法 - 烧开水，所有子类共享
    /// </summary>
    protected void BoilWater()
    {
        Console.WriteLine("烧开水");
    }
    
    /// <summary>
    /// 具体方法 - 倒入杯中，所有子类共享
    /// </summary>
    protected void PourInCup()
    {
        Console.WriteLine("倒入杯中");
    }
    
    /// <summary>
    /// 抽象方法 - 冲泡，子类必须实现
    /// </summary>
    protected abstract void Brew();
    
    /// <summary>
    /// 抽象方法 - 添加调料，子类必须实现
    /// </summary>
    protected abstract void AddCondiments();
    
    /// <summary>
    /// 钩子方法 - 是否需要调料
    /// 子类可重写以控制流程
    /// </summary>
    protected virtual bool CustomerWantsCondiments()
    {
        return true;
    }
}

/// <summary>
/// 具体类 - 咖啡制作
/// </summary>
public class CoffeeMaker : BeverageMaker
{
    protected override void Brew()
    {
        Console.WriteLine("用沸水冲泡咖啡");
    }
    
    protected override void AddCondiments()
    {
        Console.WriteLine("加糖和牛奶");
    }
    
    /// <summary>
    /// 重写钩子方法 - 询问用户是否需要调料
    /// </summary>
    protected override bool CustomerWantsCondiments()
    {
        Console.Write("是否需要加糖和牛奶? (y/n): ");
        return Console.ReadLine()?.ToLower() == "y";
    }
}

/// <summary>
/// 具体类 - 茶制作
/// </summary>
public class TeaMaker : BeverageMaker
{
    protected override void Brew()
    {
        Console.WriteLine("用沸水浸泡茶叶");
    }
    
    protected override void AddCondiments()
    {
        Console.WriteLine("加柠檬");
    }
}

#endregion

#region 场景3: 报告生成

/// <summary>
/// 抽象类 - 报告生成器基类
/// 定义报告生成的算法骨架
/// </summary>
public abstract class ReportGenerator
{
    /// <summary>
    /// 模板方法 - 定义报告生成流程
    /// </summary>
    public void GenerateReport()
    {
        Console.WriteLine("=== 开始生成报告 ===\n");
        var data = GatherData();
        var processedData = ProcessData(data);
        var report = FormatReport(processedData);
        ExportReport(report);
        Console.WriteLine("\n=== 报告生成完成 ===\n");
    }
    
    /// <summary>
    /// 抽象方法 - 收集数据
    /// </summary>
    protected abstract string GatherData();
    
    /// <summary>
    /// 抽象方法 - 处理数据
    /// </summary>
    protected abstract string ProcessData(string data);
    
    /// <summary>
    /// 抽象方法 - 格式化报告
    /// </summary>
    protected abstract string FormatReport(string data);
    
    /// <summary>
    /// 钩子方法 - 导出报告
    /// </summary>
    protected virtual void ExportReport(string report)
    {
        Console.WriteLine($"导出报告:\n{report}");
    }
}

/// <summary>
/// 具体类 - 销售报告生成器
/// </summary>
public class SalesReportGenerator : ReportGenerator
{
    protected override string GatherData()
    {
        Console.WriteLine("收集销售数据...");
        return "销售数据: 产品A-100件, 产品B-200件, 产品C-150件";
    }
    
    protected override string ProcessData(string data)
    {
        Console.WriteLine("处理销售数据...");
        return $"处理后的数据: [{data}]";
    }
    
    protected override string FormatReport(string data)
    {
        Console.WriteLine("格式化销售报告...");
        return $"""
        ===== 销售报告 =====
        {data}
        生成时间: {DateTime.Now:yyyy-MM-dd HH:mm:ss}
        ====================
        """;
    }
}

/// <summary>
/// 具体类 - 库存报告生成器
/// 重写导出方法以输出到Excel
/// </summary>
public class InventoryReportGenerator : ReportGenerator
{
    protected override string GatherData()
    {
        Console.WriteLine("收集库存数据...");
        return "库存数据: 原材料-500kg, 成品-1000件, 半成品-300件";
    }
    
    protected override string ProcessData(string data)
    {
        Console.WriteLine("处理库存数据...");
        return $"库存统计: [{data}]";
    }
    
    protected override string FormatReport(string data)
    {
        Console.WriteLine("格式化库存报告...");
        return $"""
        ===== 库存报告 =====
        {data}
        盘点时间: {DateTime.Now:yyyy-MM-dd HH:mm:ss}
        ====================
        """;
    }
    
    /// <summary>
    /// 重写钩子方法 - 导出到Excel
    /// </summary>
    protected override void ExportReport(string report)
    {
        Console.WriteLine("导出库存报告到Excel...");
        Console.WriteLine(report);
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 模板方法模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 数据挖掘\n");
        
        Console.WriteLine("--- PDF数据挖掘 ---");
        var pdfMiner = new PdfDataMiner();
        pdfMiner.Mine("document.pdf");
        
        Console.WriteLine("\n--- CSV数据挖掘 ---");
        var csvMiner = new CsvDataMiner();
        csvMiner.Mine("data.csv");
        #endregion
        
        Console.WriteLine("----------------------------------------\n");
        Console.WriteLine("场景2: 饮品制作\n");
        
        Console.WriteLine("--- 制作茶 ---");
        var teaMaker = new TeaMaker();
        teaMaker.PrepareBeverage();
        
        Console.WriteLine("--- 制作咖啡 ---");
        var coffeeMaker = new CoffeeMaker();
        coffeeMaker.PrepareBeverage();
        #endregion
        
        Console.WriteLine("----------------------------------------\n");
        Console.WriteLine("场景3: 报告生成\n");
        
        Console.WriteLine("--- 销售报告 ---");
        var salesReport = new SalesReportGenerator();
        salesReport.GenerateReport();
        
        Console.WriteLine("--- 库存报告 ---");
        var inventoryReport = new InventoryReportGenerator();
        inventoryReport.GenerateReport();
        #endregion
        
        Console.WriteLine("模板方法模式优点:");
        Console.WriteLine("- 定义算法骨架,子类实现具体步骤");
        Console.WriteLine("- 代码复用,减少重复代码");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 控制子类扩展点");
    }
}

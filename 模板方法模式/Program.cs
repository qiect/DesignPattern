namespace 模板方法模式;

public abstract class DataMiner
{
    public void Mine(string path)
    {
        OpenFile(path);
        ExtractData();
        ParseData();
        AnalyzeData();
        SendReport();
        CloseFile();
    }
    
    protected abstract void OpenFile(string path);
    protected abstract void ExtractData();
    protected abstract void CloseFile();
    
    protected virtual void ParseData()
    {
        Console.WriteLine("解析数据...");
    }
    
    protected virtual void AnalyzeData()
    {
        Console.WriteLine("分析数据...");
    }
    
    protected virtual void SendReport()
    {
        Console.WriteLine("发送分析报告...");
    }
}

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
    
    protected override void ParseData()
    {
        Console.WriteLine("解析CSV格式数据...");
    }
}

public abstract class BeverageMaker
{
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
    
    protected void BoilWater()
    {
        Console.WriteLine("烧开水");
    }
    
    protected void PourInCup()
    {
        Console.WriteLine("倒入杯中");
    }
    
    protected abstract void Brew();
    protected abstract void AddCondiments();
    
    protected virtual bool CustomerWantsCondiments()
    {
        return true;
    }
}

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
    
    protected override bool CustomerWantsCondiments()
    {
        Console.Write("是否需要加糖和牛奶? (y/n): ");
        return Console.ReadLine()?.ToLower() == "y";
    }
}

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

public abstract class ReportGenerator
{
    public void GenerateReport()
    {
        Console.WriteLine("=== 开始生成报告 ===\n");
        var data = GatherData();
        var processedData = ProcessData(data);
        var report = FormatReport(processedData);
        ExportReport(report);
        Console.WriteLine("\n=== 报告生成完成 ===\n");
    }
    
    protected abstract string GatherData();
    protected abstract string ProcessData(string data);
    protected abstract string FormatReport(string data);
    
    protected virtual void ExportReport(string report)
    {
        Console.WriteLine($"导出报告:\n{report}");
    }
}

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
    
    protected override void ExportReport(string report)
    {
        Console.WriteLine("导出库存报告到Excel...");
        Console.WriteLine(report);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 模板方法模式示例 ===\n");
        
        Console.WriteLine("场景1: 数据挖掘\n");
        
        Console.WriteLine("--- PDF数据挖掘 ---");
        var pdfMiner = new PdfDataMiner();
        pdfMiner.Mine("document.pdf");
        
        Console.WriteLine("\n--- CSV数据挖掘 ---");
        var csvMiner = new CsvDataMiner();
        csvMiner.Mine("data.csv");
        
        Console.WriteLine("----------------------------------------\n");
        Console.WriteLine("场景2: 饮品制作\n");
        
        Console.WriteLine("--- 制作茶 ---");
        var teaMaker = new TeaMaker();
        teaMaker.PrepareBeverage();
        
        Console.WriteLine("--- 制作咖啡 ---");
        var coffeeMaker = new CoffeeMaker();
        coffeeMaker.PrepareBeverage();
        
        Console.WriteLine("----------------------------------------\n");
        Console.WriteLine("场景3: 报告生成\n");
        
        Console.WriteLine("--- 销售报告 ---");
        var salesReport = new SalesReportGenerator();
        salesReport.GenerateReport();
        
        Console.WriteLine("--- 库存报告 ---");
        var inventoryReport = new InventoryReportGenerator();
        inventoryReport.GenerateReport();
        
        Console.WriteLine("模板方法模式优点:");
        Console.WriteLine("- 定义算法骨架,子类实现具体步骤");
        Console.WriteLine("- 代码复用,减少重复代码");
        Console.WriteLine("- 符合开闭原则");
        Console.WriteLine("- 控制子类扩展点");
    }
}

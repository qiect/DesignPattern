/**
 * 工厂方法模式 (Factory Method Pattern)
 * 
 * 定义：定义一个创建对象的接口，让子类决定实例化哪一个类。
 *       工厂方法使一个类的实例化延迟到其子类。
 * 
 * 核心角色：
 * 1. 抽象产品(Product) - 定义产品的公共接口
 * 2. 具体产品(Concrete Product) - 实现抽象产品接口
 * 3. 抽象工厂(Creator) - 声明工厂方法，返回产品对象
 * 4. 具体工厂(Concrete Creator) - 实现工厂方法，返回具体产品实例
 * 
 * 适用场景：
 * - 客户端不需要知道具体产品的类名
 * - 将对象的创建和使用分离
 * - 需要灵活扩展产品族
 * 
 * 本示例场景：文档处理系统，支持多种文档格式
 */

namespace 工厂方法模式;

/// <summary>
/// 抽象产品 - 文档接口
/// 定义所有文档类型的公共操作
/// </summary>
public interface IDocument
{
    /// <summary>
    /// 打开文档
    /// </summary>
    void Open();
    
    /// <summary>
    /// 保存文档
    /// </summary>
    void Save();
    
    /// <summary>
    /// 获取文档类型描述
    /// </summary>
    string GetDocumentType();
}

/// <summary>
/// 具体产品 - Word文档
/// 实现 Word 格式文档的具体操作
/// </summary>
public class WordDocument : IDocument
{
    public void Open()
    {
        Console.WriteLine("打开 Word 文档");
    }
    
    public void Save()
    {
        Console.WriteLine("保存 Word 文档");
    }
    
    public string GetDocumentType() => "Word文档(.docx)";
}

/// <summary>
/// 具体产品 - PDF文档
/// 实现 PDF 格式文档的具体操作
/// </summary>
public class PdfDocument : IDocument
{
    public void Open()
    {
        Console.WriteLine("打开 PDF 文档");
    }
    
    public void Save()
    {
        Console.WriteLine("保存 PDF 文档");
    }
    
    public string GetDocumentType() => "PDF文档(.pdf)";
}

/// <summary>
/// 具体产品 - Excel文档
/// 实现 Excel 格式文档的具体操作
/// </summary>
public class ExcelDocument : IDocument
{
    public void Open()
    {
        Console.WriteLine("打开 Excel 文档");
    }
    
    public void Save()
    {
        Console.WriteLine("保存 Excel 文档");
    }
    
    public string GetDocumentType() => "Excel文档(.xlsx)";
}

/// <summary>
/// 抽象工厂 - 文档工厂接口
/// 声明工厂方法，返回文档对象
/// 
/// 关键点：
/// - 工厂方法返回抽象产品类型
/// - 具体创建逻辑由子类实现
/// - 客户端依赖抽象而非具体实现
/// </summary>
public interface IDocumentFactory
{
    /// <summary>
    /// 工厂方法 - 创建文档对象
    /// </summary>
    /// <returns>文档对象实例</returns>
    IDocument CreateDocument();
}

/// <summary>
/// 具体工厂 - Word文档工厂
/// 专门负责创建 Word 文档对象
/// </summary>
public class WordDocumentFactory : IDocumentFactory
{
    public IDocument CreateDocument()
    {
        return new WordDocument();
    }
}

/// <summary>
/// 具体工厂 - PDF文档工厂
/// 专门负责创建 PDF 文档对象
/// </summary>
public class PdfDocumentFactory : IDocumentFactory
{
    public IDocument CreateDocument()
    {
        return new PdfDocument();
    }
}

/// <summary>
/// 具体工厂 - Excel文档工厂
/// 专门负责创建 Excel 文档对象
/// </summary>
public class ExcelDocumentFactory : IDocumentFactory
{
    public IDocument CreateDocument()
    {
        return new ExcelDocument();
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 工厂方法模式示例 ===\n");
        
        Console.WriteLine("场景: 文档处理系统\n");
        
        // 创建不同的工厂实例
        // 客户端只依赖工厂接口，不依赖具体产品类
        IDocumentFactory wordFactory = new WordDocumentFactory();
        IDocumentFactory pdfFactory = new PdfDocumentFactory();
        IDocumentFactory excelFactory = new ExcelDocumentFactory();
        
        // 使用工厂创建产品
        Console.WriteLine("--- 处理 Word 文档 ---");
        var wordDoc = wordFactory.CreateDocument();
        Console.WriteLine($"文档类型: {wordDoc.GetDocumentType()}");
        wordDoc.Open();
        wordDoc.Save();
        
        Console.WriteLine("\n--- 处理 PDF 文档 ---");
        var pdfDoc = pdfFactory.CreateDocument();
        Console.WriteLine($"文档类型: {pdfDoc.GetDocumentType()}");
        pdfDoc.Open();
        pdfDoc.Save();
        
        Console.WriteLine("\n--- 处理 Excel 文档 ---");
        var excelDoc = excelFactory.CreateDocument();
        Console.WriteLine($"文档类型: {excelDoc.GetDocumentType()}");
        excelDoc.Open();
        excelDoc.Save();
        
        Console.WriteLine("\n工厂方法模式优点:");
        Console.WriteLine("- 符合开闭原则,扩展时无需修改现有代码");
        Console.WriteLine("- 将对象的创建延迟到子类");
        Console.WriteLine("- 客户端无需知道具体产品类的类名");
        Console.WriteLine("- 符合单一职责原则");
    }
}

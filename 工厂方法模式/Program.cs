namespace 工厂方法模式;

public interface IDocument
{
    void Open();
    void Save();
    string GetDocumentType();
}

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

public interface IDocumentFactory
{
    IDocument CreateDocument();
}

public class WordDocumentFactory : IDocumentFactory
{
    public IDocument CreateDocument()
    {
        return new WordDocument();
    }
}

public class PdfDocumentFactory : IDocumentFactory
{
    public IDocument CreateDocument()
    {
        return new PdfDocument();
    }
}

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
        
        IDocumentFactory wordFactory = new WordDocumentFactory();
        IDocumentFactory pdfFactory = new PdfDocumentFactory();
        IDocumentFactory excelFactory = new ExcelDocumentFactory();
        
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

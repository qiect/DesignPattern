export const factoryMethod = {
    id: 'factory-method',
    name: '工厂方法模式',
    nameEn: 'Factory Method Pattern',
    category: 'creational',
    difficulty: 2,
    tags: ['创建型', '多态', '开闭原则'],
    definition: '定义一个创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。',
    simpleExplanation: '父类定义创建对象的接口，子类决定创建哪种具体对象，将"用什么"和"怎么创建"分离。',
    lifeAnalogy: '就像招聘，HR只定义"我们需要一个工程师"，具体招前端还是后端由各部门决定。',
    roles: [
        { name: '抽象产品', nameEn: 'Product', responsibility: '定义产品的公共接口', color: '#6c8cff' },
        { name: '具体产品', nameEn: 'ConcreteProduct', responsibility: '实现抽象产品接口', color: '#00d4aa' },
        { name: '抽象工厂', nameEn: 'Creator', responsibility: '声明工厂方法，返回产品对象', color: '#ff6b35' },
        { name: '具体工厂', nameEn: 'ConcreteCreator', responsibility: '实现工厂方法，返回具体产品', color: '#ffd93d' },
    ],
    umlCode: `classDiagram
    class IDocument {
      <<interface>>
      +Open() void
      +Save() void
      +GetDocumentType() string
    }
    class WordDocument {
      +Open() void
      +Save() void
      +GetDocumentType() string
    }
    class PdfDocument {
      +Open() void
      +Save() void
      +GetDocumentType() string
    }
    class IDocumentFactory {
      <<interface>>
      +CreateDocument() IDocument
    }
    class WordDocumentFactory {
      +CreateDocument() IDocument
    }
    class PdfDocumentFactory {
      +CreateDocument() IDocument
    }
    IDocument <|.. WordDocument
    IDocument <|.. PdfDocument
    IDocumentFactory <|.. WordDocumentFactory
    IDocumentFactory <|.. PdfDocumentFactory
    WordDocumentFactory ..> WordDocument : creates
    PdfDocumentFactory ..> PdfDocument : creates`,
    animationSteps: [
        {
            description: '客户端持有抽象工厂引用',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'factory', type: 'rect', x: 250, y: 80, width: 140, height: 50, label: 'IDocumentFactory', color: '#ff6b35', opacity: 1 },
                { id: 'product', type: 'rect', x: 480, y: 80, width: 120, height: 50, label: 'IDocument', color: '#6c8cff', opacity: 0.3 },
            ],
            arrows: [
                { from: 'client', to: 'factory', label: '持有', color: '#6c8cff' },
            ],
        },
        {
            description: '调用工厂方法创建产品',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'factory', type: 'rect', x: 250, y: 80, width: 140, height: 50, label: 'WordFactory', color: '#ff6b35', opacity: 1 },
                { id: 'product', type: 'rect', x: 480, y: 80, width: 120, height: 50, label: 'WordDocument', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'client', to: 'factory', label: 'CreateDocument()', color: '#6c8cff', animated: true },
                { from: 'factory', to: 'product', label: 'new WordDocument()', color: '#ff6b35', animated: true },
            ],
        },
        {
            description: '切换工厂，创建不同产品',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'factory', type: 'rect', x: 250, y: 80, width: 140, height: 50, label: 'PdfFactory', color: '#ffd93d', opacity: 1 },
                { id: 'product', type: 'rect', x: 480, y: 80, width: 120, height: 50, label: 'PdfDocument', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'client', to: 'factory', label: 'CreateDocument()', color: '#6c8cff', animated: true },
                { from: 'factory', to: 'product', label: 'new PdfDocument()', color: '#ffd93d', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '文档处理系统', description: '根据格式创建不同文档处理器', icon: 'FileText' },
        { title: '日志框架', description: '根据配置创建不同日志输出器', icon: 'ScrollText' },
        { title: '数据库驱动', description: '根据数据库类型创建对应连接器', icon: 'Database' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface IDocument
{
    void Open();
    void Save();
    string GetDocumentType();
}

public class WordDocument : IDocument
{
    public void Open() => Console.WriteLine("打开 Word 文档");
    public void Save() => Console.WriteLine("保存 Word 文档");
    public string GetDocumentType() => "Word文档(.docx)";
}

public class PdfDocument : IDocument
{
    public void Open() => Console.WriteLine("打开 PDF 文档");
    public void Save() => Console.WriteLine("保存 PDF 文档");
    public string GetDocumentType() => "PDF文档(.pdf)";
}

public interface IDocumentFactory
{
    IDocument CreateDocument();
}

public class WordDocumentFactory : IDocumentFactory
{
    public IDocument CreateDocument() => new WordDocument();
}

public class PdfDocumentFactory : IDocumentFactory
{
    public IDocument CreateDocument() => new PdfDocument();
}`,
            highlights: [1, 16, 23, 26, 31],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface Document {
  open(): void
  save(): void
  getDocumentType(): string
}

class WordDocument implements Document {
  open(): void { console.log('打开 Word 文档') }
  save(): void { console.log('保存 Word 文档') }
  getDocumentType(): string { return 'Word文档(.docx)' }
}

class PdfDocument implements Document {
  open(): void { console.log('打开 PDF 文档') }
  save(): void { console.log('保存 PDF 文档') }
  getDocumentType(): string { return 'PDF文档(.pdf)' }
}

interface DocumentFactory {
  createDocument(): Document
}

class WordDocumentFactory implements DocumentFactory {
  createDocument(): Document { return new WordDocument() }
}

class PdfDocumentFactory implements DocumentFactory {
  createDocument(): Document { return new PdfDocument() }
}`,
            highlights: [1, 17, 22, 27],
        },
    ],
    pros: ['符合开闭原则，扩展时无需修改现有代码', '将对象的创建延迟到子类', '客户端无需知道具体产品类的类名', '符合单一职责原则'],
    cons: ['每增加一个产品类就要增加一个工厂类', '增加了系统的抽象性和理解难度', '简单场景下显得过度设计'],
    relatedPatterns: [
        { patternId: 'abstract-factory', relationType: 'combinable', description: '抽象工厂常使用工厂方法来实现产品创建' },
        { patternId: 'singleton', relationType: 'combinable', description: '工厂类本身常被设计为单例' },
        { patternId: 'prototype', relationType: 'alternative', description: '原型通过克隆创建对象，工厂方法通过new创建' },
    ],
    frameworkExamples: [
        { framework: 'Vue 3', description: 'createApp() 工厂方法创建应用实例，不同配置产生不同行为' },
        { framework: 'Spring', description: 'FactoryBean 接口就是工厂方法的典型应用' },
    ],
};

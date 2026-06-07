import type { Pattern } from '@/types/pattern'

export const proxy: Pattern = {
  id: 'proxy',
  name: '代理模式',
  nameEn: 'Proxy Pattern',
  category: 'structural',
  difficulty: 2,
  tags: ['结构型', '访问控制', '延迟加载'],
  definition: '为其他对象提供一种代理以控制对这个对象的访问。',
  simpleExplanation: '不直接访问目标对象，而是通过一个代理来访问，代理可以在访问前后添加额外逻辑。',
  lifeAnalogy: '就像明星的经纪人，你想找明星合作，得先通过经纪人，经纪人帮你过滤、安排、记录。',
  roles: [
    { name: '抽象主题', nameEn: 'Subject', responsibility: '定义真实主题和代理的公共接口', color: '#6c8cff' },
    { name: '真实主题', nameEn: 'RealSubject', responsibility: '定义代理所代表的真实对象', color: '#00d4aa' },
    { name: '代理', nameEn: 'Proxy', responsibility: '控制对真实主题的访问', color: '#ff6b35' },
  ],
  umlCode: `classDiagram
    class IImage {
      <<interface>>
      +Display() void
    }
    class RealImage {
      -fileName string
      +Display() void
      -LoadFromDisk() void
    }
    class ImageProxy {
      -fileName string
      -realImage RealImage
      +Display() void
    }
    IImage <|.. RealImage
    IImage <|.. ImageProxy
    ImageProxy --> RealImage : controls`,
  animationSteps: [
    {
      description: '客户端通过代理访问',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'proxy', type: 'rect', x: 280, y: 80, width: 120, height: 50, label: 'ImageProxy', color: '#ff6b35', opacity: 1 },
        { id: 'real', type: 'rect', x: 500, y: 80, width: 120, height: 50, label: 'RealImage', color: '#00d4aa', opacity: 0.3 },
      ],
      arrows: [
        { from: 'client', to: 'proxy', label: 'Display()', color: '#6c8cff', animated: true },
      ],
    },
    {
      description: '代理延迟创建真实对象',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'proxy', type: 'rect', x: 280, y: 80, width: 120, height: 50, label: 'ImageProxy', color: '#ff6b35', opacity: 1 },
        { id: 'real', type: 'rect', x: 500, y: 80, width: 120, height: 50, label: 'RealImage', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'proxy', to: 'real', label: '首次创建', color: '#ff6b35', animated: true },
        { from: 'real', to: 'client', label: '返回结果', color: '#00d4aa', animated: true },
      ],
    },
    {
      description: '后续调用直接使用已创建的对象',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'proxy', type: 'rect', x: 280, y: 80, width: 120, height: 50, label: 'ImageProxy', color: '#ff6b35', opacity: 1 },
        { id: 'real', type: 'rect', x: 500, y: 80, width: 120, height: 50, label: 'RealImage', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'client', to: 'proxy', label: 'Display()', color: '#6c8cff', animated: true },
        { from: 'proxy', to: 'real', label: '委托调用', color: '#ff6b35' },
      ],
    },
  ],
  scenarios: [
    { title: '图片延迟加载', description: '虚拟代理，只在需要时加载大图', icon: 'Image' },
    { title: '权限控制', description: '保护代理，检查用户是否有访问权限', icon: 'Shield' },
    { title: '缓存代理', description: '缓存查询结果，避免重复计算', icon: 'Database' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public interface IImage { void Display(); }

public class RealImage : IImage
{
    private readonly string _fileName;
    public RealImage(string fileName)
    {
        _fileName = fileName;
        LoadFromDisk();
    }
    private void LoadFromDisk() =>
        Console.WriteLine($"从磁盘加载图片: {_fileName}");
    public void Display() =>
        Console.WriteLine($"显示图片: {_fileName}");
}

public class ImageProxy : IImage
{
    private readonly string _fileName;
    private RealImage? _realImage;

    public ImageProxy(string fileName) { _fileName = fileName; }

    public void Display()
    {
        _realImage ??= new RealImage(_fileName); // 延迟初始化
        _realImage.Display();
    }
}`,
      highlights: [1, 5, 6, 7, 17, 18, 20, 21],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `interface Image {
  display(): void
}

class RealImage implements Image {
  private fileName: string

  constructor(fileName: string) {
    this.fileName = fileName
    this.loadFromDisk()
  }

  private loadFromDisk(): void {
    console.log('从磁盘加载图片: ' + this.fileName)
  }

  display(): void {
    console.log('显示图片: ' + this.fileName)
  }
}

class ImageProxy implements Image {
  private realImage: RealImage | null = null

  constructor(private fileName: string) {}

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.fileName) // 延迟加载
    }
    this.realImage.display()
  }
}

// 使用
const image: Image = new ImageProxy('photo.jpg')
image.display() // 首次调用才加载
image.display() // 后续直接使用`,
      highlights: [1, 5, 6, 7, 19, 20, 21, 22],
    },
  ],
  pros: ['控制对原始对象的访问', '在访问对象时添加额外功能', '延迟加载，优化性能', '符合开闭原则'],
  cons: ['增加了代理类，系统复杂度增加', '可能增加响应延迟', '不同类型代理实现差异大'],
  relatedPatterns: [
    { patternId: 'adapter', relationType: 'alternative', description: '适配器转换接口，代理控制访问但接口不变' },
    { patternId: 'decorator', relationType: 'alternative', description: '装饰器增强功能，代理控制访问' },
    { patternId: 'facade', relationType: 'alternative', description: '外观简化接口，代理控制访问' },
  ],
  frameworkExamples: [
    { framework: 'Vue 3', description: 'reactive() 和 ref() 返回的是代理对象，拦截get/set实现响应式' },
    { framework: 'Spring', description: 'Spring AOP 使用动态代理实现切面编程' },
  ],
}

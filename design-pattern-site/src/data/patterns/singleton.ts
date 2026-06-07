import type { Pattern } from '@/types/pattern'

export const singleton: Pattern = {
  id: 'singleton',
  name: '单例模式',
  nameEn: 'Singleton Pattern',
  category: 'creational',
  difficulty: 1,
  tags: ['创建型', '线程安全', '全局访问'],
  definition: '确保一个类只有一个实例，并提供一个全局访问点。',
  simpleExplanation: '一个类只允许创建一个对象实例，所有地方都共享这同一个实例。',
  lifeAnalogy: '就像一个国家只有一个总统，无论谁问"总统是谁"，得到的都是同一个人。',
  roles: [
    { name: '单例类', nameEn: 'Singleton', responsibility: '包含私有构造函数、静态实例和全局访问方法', color: '#00d4aa' },
  ],
  umlCode: `classDiagram
    class Singleton {
      -Singleton instance$
      +Instance()$ Singleton
      -Singleton()
    }
    note for Singleton "私有构造函数防止外部new"`,
  animationSteps: [
    {
      description: '第一次调用 Instance，创建唯一实例',
      objects: [
        { id: 'client', type: 'rect', x: 100, y: 50, width: 120, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'singleton', type: 'rect', x: 350, y: 50, width: 120, height: 50, label: 'Singleton', color: '#00d4aa', opacity: 1 },
        { id: 'instance', type: 'circle', x: 350, y: 180, width: 80, height: 80, label: 'instance', color: '#ff6b35', opacity: 0.3 },
      ],
      arrows: [
        { from: 'client', to: 'singleton', label: 'Instance()', color: '#6c8cff', animated: true },
      ],
    },
    {
      description: '实例被创建，保存到静态字段',
      objects: [
        { id: 'client', type: 'rect', x: 100, y: 50, width: 120, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'singleton', type: 'rect', x: 350, y: 50, width: 120, height: 50, label: 'Singleton', color: '#00d4aa', opacity: 1 },
        { id: 'instance', type: 'circle', x: 350, y: 180, width: 80, height: 80, label: 'instance', color: '#ff6b35', opacity: 1 },
      ],
      arrows: [
        { from: 'singleton', to: 'instance', label: '创建实例', color: '#00d4aa', animated: true },
      ],
    },
    {
      description: '后续调用直接返回已有实例',
      objects: [
        { id: 'client2', type: 'rect', x: 100, y: 50, width: 120, height: 50, label: 'Client2', color: '#6c8cff', opacity: 1 },
        { id: 'singleton', type: 'rect', x: 350, y: 50, width: 120, height: 50, label: 'Singleton', color: '#00d4aa', opacity: 1 },
        { id: 'instance', type: 'circle', x: 350, y: 180, width: 80, height: 80, label: 'instance', color: '#ff6b35', opacity: 1 },
      ],
      arrows: [
        { from: 'client2', to: 'singleton', label: 'Instance()', color: '#6c8cff', animated: true },
        { from: 'singleton', to: 'instance', label: '返回同一实例', color: '#00d4aa', animated: true },
      ],
    },
  ],
  scenarios: [
    { title: '日志记录器', description: '全局共享一个日志实例，避免重复创建', icon: 'FileText' },
    { title: '配置管理器', description: '应用配置只加载一次，全局共享', icon: 'Settings' },
    { title: '数据库连接池', description: '统一管理数据库连接，避免资源浪费', icon: 'Database' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public sealed class Logger
{
    private static readonly Lazy<Logger> _instance = new(() => new Logger());

    public static Logger Instance => _instance.Value;

    private Logger()
    {
        Console.WriteLine("Logger 初始化完成");
    }

    public void Log(string message)
    {
        Console.WriteLine($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {message}");
    }
}

public sealed class ConfigurationManager
{
    private static ConfigurationManager? _instance;
    private static readonly object _lock = new();
    private readonly Dictionary<string, string> _settings;

    public static ConfigurationManager Instance
    {
        get
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    _instance ??= new ConfigurationManager();
                }
            }
            return _instance;
        }
    }

    private ConfigurationManager()
    {
        _settings = new Dictionary<string, string>
        {
            ["AppName"] = "设计模式示例",
            ["Version"] = "1.0.0"
        };
    }

    public string? GetSetting(string key)
    {
        return _settings.TryGetValue(key, out var value) ? value : null;
    }
}`,
      highlights: [3, 4, 5, 16, 20, 24, 25],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `class Logger {
  private static instance: Logger | null = null

  private constructor() {
    console.log('Logger 初始化完成')
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  public log(message: string): void {
    console.log(\`[\${new Date().toISOString()}] \${message}\`)
  }
}

// 使用方式
const logger1 = Logger.getInstance()
const logger2 = Logger.getInstance()
console.log(logger1 === logger2) // true`,
      highlights: [3, 7, 8, 9],
    },
  ],
  pros: ['保证只有一个实例', '提供全局访问点', '延迟初始化', '线程安全'],
  cons: ['违反单一职责原则', '难以测试', '隐藏依赖关系', '可能过度使用'],
  relatedPatterns: [
    { patternId: 'factory-method', relationType: 'alternative', description: '工厂方法也可以控制对象创建，但更灵活' },
    { patternId: 'abstract-factory', relationType: 'combinable', description: '抽象工厂常用单例模式来确保工厂唯一' },
    { patternId: 'prototype', relationType: 'alternative', description: '原型通过克隆创建对象，单例限制为唯一实例' },
  ],
  frameworkExamples: [
    { framework: 'Vue 3', description: 'Pinia Store 默认是单例模式，整个应用共享同一个 Store 实例' },
    { framework: 'Spring', description: 'Spring Bean 默认作用域是 Singleton' },
  ],
}

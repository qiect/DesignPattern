export const builder = {
    id: 'builder',
    name: '建造者模式',
    nameEn: 'Builder Pattern',
    category: 'creational',
    difficulty: 2,
    tags: ['创建型', '分步构建', '链式调用'],
    definition: '将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。',
    simpleExplanation: '把复杂对象的创建过程拆分成一步步的，每一步都可以自定义，最终组装成完整对象。',
    lifeAnalogy: '就像组装电脑，你可以自己选CPU、内存、硬盘，一步步搭配出你想要的配置。',
    roles: [
        { name: '产品', nameEn: 'Product', responsibility: '要构建的复杂对象', color: '#6c8cff' },
        { name: '抽象建造者', nameEn: 'Builder', responsibility: '定义创建产品各部件的抽象接口', color: '#00d4aa' },
        { name: '具体建造者', nameEn: 'ConcreteBuilder', responsibility: '实现Builder接口，构造和装配各部件', color: '#ff6b35' },
        { name: '指挥者', nameEn: 'Director', responsibility: '构建使用Builder接口的对象', color: '#ffd93d' },
    ],
    umlCode: `classDiagram
    class Computer {
      +CPU string
      +RAM string
      +Storage string
      +GPU string
      +ShowConfiguration() void
    }
    class IComputerBuilder {
      <<interface>>
      +SetCPU() IComputerBuilder
      +SetRAM() IComputerBuilder
      +SetStorage() IComputerBuilder
      +Build() Computer
    }
    class ComputerBuilder {
      +SetCPU() IComputerBuilder
      +SetRAM() IComputerBuilder
      +Build() Computer
    }
    class ComputerDirector {
      +BuildOfficeComputer() Computer
      +BuildGamingComputer() Computer
    }
    IComputerBuilder <|.. ComputerBuilder
    ComputerBuilder ..> Computer : creates
    ComputerDirector --> IComputerBuilder`,
    animationSteps: [
        {
            description: '创建建造者实例',
            objects: [
                { id: 'director', type: 'rect', x: 50, y: 80, width: 120, height: 50, label: 'Director', color: '#ffd93d', opacity: 1 },
                { id: 'builder', type: 'rect', x: 280, y: 80, width: 140, height: 50, label: 'ComputerBuilder', color: '#ff6b35', opacity: 1 },
                { id: 'product', type: 'rect', x: 500, y: 80, width: 120, height: 50, label: 'Computer', color: '#6c8cff', opacity: 0.3 },
            ],
            arrows: [
                { from: 'director', to: 'builder', label: '使用', color: '#ffd93d' },
            ],
        },
        {
            description: '逐步构建：设置CPU、内存、存储',
            objects: [
                { id: 'director', type: 'rect', x: 50, y: 80, width: 120, height: 50, label: 'Director', color: '#ffd93d', opacity: 1 },
                { id: 'builder', type: 'rect', x: 280, y: 80, width: 140, height: 50, label: 'ComputerBuilder', color: '#ff6b35', opacity: 1 },
                { id: 'step1', type: 'circle', x: 200, y: 200, width: 70, height: 70, label: 'CPU', color: '#00d4aa', opacity: 1 },
                { id: 'step2', type: 'circle', x: 320, y: 200, width: 70, height: 70, label: 'RAM', color: '#00d4aa', opacity: 1 },
                { id: 'step3', type: 'circle', x: 440, y: 200, width: 70, height: 70, label: 'Storage', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'director', to: 'builder', label: 'BuildOfficePC', color: '#ffd93d', animated: true },
                { from: 'builder', to: 'step1', label: 'SetCPU', color: '#ff6b35', animated: true },
                { from: 'builder', to: 'step2', label: 'SetRAM', color: '#ff6b35', animated: true },
                { from: 'builder', to: 'step3', label: 'SetStorage', color: '#ff6b35', animated: true },
            ],
        },
        {
            description: '调用Build()返回完整产品',
            objects: [
                { id: 'builder', type: 'rect', x: 280, y: 80, width: 140, height: 50, label: 'ComputerBuilder', color: '#ff6b35', opacity: 1 },
                { id: 'product', type: 'rect', x: 280, y: 200, width: 140, height: 60, label: 'Computer\n(完整配置)', color: '#6c8cff', opacity: 1 },
            ],
            arrows: [
                { from: 'builder', to: 'product', label: 'Build()', color: '#ff6b35', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '电脑配置组装', description: '灵活选择CPU、内存、硬盘等配置', icon: 'Cpu' },
        { title: 'SQL查询构建', description: '链式调用构建复杂SQL语句', icon: 'Database' },
        { title: 'HTTP请求配置', description: '分步设置URL、方法、头部、请求体', icon: 'Globe' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public class Computer
{
    public string? CPU { get; set; }
    public string? RAM { get; set; }
    public string? Storage { get; set; }
    public string? GPU { get; set; }
    public bool HasWiFi { get; set; }
}

public interface IComputerBuilder
{
    IComputerBuilder SetCPU(string cpu);
    IComputerBuilder SetRAM(string ram);
    IComputerBuilder SetStorage(string storage);
    IComputerBuilder SetGPU(string gpu);
    IComputerBuilder EnableWiFi(bool enable = true);
    Computer Build();
}

public class ComputerBuilder : IComputerBuilder
{
    private readonly Computer _computer = new();

    public IComputerBuilder SetCPU(string cpu) { _computer.CPU = cpu; return this; }
    public IComputerBuilder SetRAM(string ram) { _computer.RAM = ram; return this; }
    public IComputerBuilder SetStorage(string storage) { _computer.Storage = storage; return this; }
    public IComputerBuilder SetGPU(string gpu) { _computer.GPU = gpu; return this; }
    public IComputerBuilder EnableWiFi(bool enable = true) { _computer.HasWiFi = enable; return this; }

    public Computer Build()
    {
        if (string.IsNullOrEmpty(_computer.CPU))
            throw new InvalidOperationException("CPU 是必需的配置");
        return _computer;
    }
}

public class ComputerDirector
{
    public Computer BuildOfficeComputer(IComputerBuilder builder) =>
        builder.SetCPU("Intel i5").SetRAM("16GB").SetStorage("512GB SSD")
              .EnableWiFi().Build();

    public Computer BuildGamingComputer(IComputerBuilder builder) =>
        builder.SetCPU("Intel i7").SetRAM("32GB").SetStorage("1TB NVMe")
              .SetGPU("RTX 4080").EnableWiFi().Build();
}`,
            highlights: [10, 24, 25, 26, 27, 34, 39],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface Computer {
  cpu: string
  ram: string
  storage: string
  gpu?: string
  hasWiFi: boolean
}

class ComputerBuilder {
  private computer: Computer = { cpu: '', ram: '', storage: '', hasWiFi: false }

  setCPU(cpu: string): this { this.computer.cpu = cpu; return this }
  setRAM(ram: string): this { this.computer.ram = ram; return this }
  setStorage(storage: string): this { this.computer.storage = storage; return this }
  setGPU(gpu: string): this { this.computer.gpu = gpu; return this }
  enableWiFi(enable = true): this { this.computer.hasWiFi = enable; return this }

  build(): Computer {
    if (!this.computer.cpu) throw new Error('CPU 是必需的配置')
    return this.computer
  }
}

// 使用链式调用
const gamingPC = new ComputerBuilder()
  .setCPU('Intel i7')
  .setRAM('32GB DDR5')
  .setStorage('1TB NVMe SSD')
  .setGPU('RTX 4080')
  .enableWiFi()
  .build()`,
            highlights: [11, 12, 13, 14, 15, 16],
        },
    ],
    pros: ['分步创建复杂对象', '相同构建过程可创建不同表示', '构建代码与表示代码分离', '支持链式调用'],
    cons: ['增加了类的数量', '产品差异大时不适用', '建造者需要了解产品内部结构'],
    relatedPatterns: [
        { patternId: 'abstract-factory', relationType: 'alternative', description: '抽象工厂关注产品族，建造者关注分步构建' },
        { patternId: 'composite', relationType: 'combinable', description: '组合模式创建的树形结构可用建造者来构建' },
        { patternId: 'factory-method', relationType: 'complementary', description: '建造者中的Build()方法类似工厂方法' },
    ],
    frameworkExamples: [
        { framework: 'Vue 3', description: 'Vue Router 的 createRouter() 使用链式配置构建路由实例' },
        { framework: 'Express', description: 'Express 的 app.use().use().listen() 链式调用是建造者思想的体现' },
    ],
};

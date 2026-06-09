export const facade = {
    id: 'facade',
    name: '外观模式',
    nameEn: 'Facade Pattern',
    category: 'structural',
    difficulty: 1,
    tags: ['结构型', '简化接口', '封装子系统'],
    definition: '为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。',
    simpleExplanation: '给复杂的子系统提供一个简单的入口，客户端只需要跟这个入口打交道，不用了解内部细节。',
    lifeAnalogy: '就像餐厅的服务员，你只需要告诉他"我要一份套餐"，他会帮你协调厨房、收银台、饮料台。',
    roles: [
        { name: '外观', nameEn: 'Facade', responsibility: '提供统一的接口，简化子系统的使用', color: '#6c8cff' },
        { name: '子系统', nameEn: 'Subsystem', responsibility: '实现具体功能，被外观调用', color: '#00d4aa' },
    ],
    umlCode: `classDiagram
    class ComputerFacade {
      -cpu CPU
      -memory Memory
      -hardDrive HardDrive
      +Start() void
    }
    class CPU {
      +Freeze() void
      +Jump() void
      +Execute() void
    }
    class Memory {
      +Load() void
    }
    class HardDrive {
      +Read() byte[]
    }
    ComputerFacade --> CPU
    ComputerFacade --> Memory
    ComputerFacade --> HardDrive`,
    animationSteps: [
        {
            description: '客户端直接面对多个子系统',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 100, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'cpu', type: 'rect', x: 300, y: 30, width: 100, height: 40, label: 'CPU', color: '#00d4aa', opacity: 1 },
                { id: 'mem', type: 'rect', x: 300, y: 100, width: 100, height: 40, label: 'Memory', color: '#00d4aa', opacity: 1 },
                { id: 'hd', type: 'rect', x: 300, y: 170, width: 100, height: 40, label: 'HardDrive', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'client', to: 'cpu', label: 'Freeze()', color: '#6c8cff' },
                { from: 'client', to: 'hd', label: 'Read()', color: '#6c8cff' },
                { from: 'client', to: 'mem', label: 'Load()', color: '#6c8cff' },
                { from: 'client', to: 'cpu', label: 'Execute()', color: '#6c8cff' },
            ],
        },
        {
            description: '引入外观类，统一入口',
            objects: [
                { id: 'client', type: 'rect', x: 50, y: 100, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
                { id: 'facade', type: 'rect', x: 250, y: 100, width: 130, height: 50, label: 'ComputerFacade', color: '#ff6b35', opacity: 1 },
                { id: 'cpu', type: 'rect', x: 450, y: 30, width: 100, height: 40, label: 'CPU', color: '#00d4aa', opacity: 1 },
                { id: 'mem', type: 'rect', x: 450, y: 100, width: 100, height: 40, label: 'Memory', color: '#00d4aa', opacity: 1 },
                { id: 'hd', type: 'rect', x: 450, y: 170, width: 100, height: 40, label: 'HardDrive', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'client', to: 'facade', label: 'Start()', color: '#6c8cff', animated: true },
                { from: 'facade', to: 'cpu', label: '', color: '#ff6b35' },
                { from: 'facade', to: 'mem', label: '', color: '#ff6b35' },
                { from: 'facade', to: 'hd', label: '', color: '#ff6b35' },
            ],
        },
        {
            description: '外观内部协调子系统调用顺序',
            objects: [
                { id: 'facade', type: 'rect', x: 200, y: 100, width: 130, height: 50, label: 'ComputerFacade', color: '#ff6b35', opacity: 1 },
                { id: 'step1', type: 'circle', x: 120, y: 200, width: 60, height: 60, label: '1.Freeze', color: '#00d4aa', opacity: 1 },
                { id: 'step2', type: 'circle', x: 240, y: 200, width: 60, height: 60, label: '2.Read', color: '#00d4aa', opacity: 1 },
                { id: 'step3', type: 'circle', x: 360, y: 200, width: 60, height: 60, label: '3.Load', color: '#00d4aa', opacity: 1 },
                { id: 'step4', type: 'circle', x: 480, y: 200, width: 60, height: 60, label: '4.Execute', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'facade', to: 'step1', label: '', color: '#ff6b35', animated: true },
                { from: 'step1', to: 'step2', label: '', color: '#00d4aa', animated: true },
                { from: 'step2', to: 'step3', label: '', color: '#00d4aa', animated: true },
                { from: 'step3', to: 'step4', label: '', color: '#00d4aa', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '计算机启动', description: '封装CPU、内存、硬盘的启动流程', icon: 'Power' },
        { title: '电商下单', description: '整合库存、订单、支付、物流系统', icon: 'ShoppingCart' },
        { title: '智能家居', description: '一键控制灯光、空调、窗帘等设备', icon: 'Home' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public class CPU
{
    public void Freeze() => Console.WriteLine("CPU: 冻结处理器");
    public void Jump(long position) => Console.WriteLine($"CPU: 跳转到位置 {position}");
    public void Execute() => Console.WriteLine("CPU: 开始执行指令");
}

public class Memory
{
    public void Load(long position, byte[] data) =>
        Console.WriteLine($"内存: 在位置 {position} 加载数据");
}

public class HardDrive
{
    public byte[] Read(long lba, int size)
    {
        Console.WriteLine($"硬盘: 从扇区 {lba} 读取 {size} 字节");
        return new byte[size];
    }
}

public class ComputerFacade
{
    private readonly CPU _cpu = new();
    private readonly Memory _memory = new();
    private readonly HardDrive _hardDrive = new();

    public void Start()
    {
        _cpu.Freeze();
        var bootData = _hardDrive.Read(0, 512);
        _memory.Load(0x7C00, bootData);
        _cpu.Jump(0x7C00);
        _cpu.Execute();
    }
}`,
            highlights: [27, 28, 29, 30, 31, 32, 33],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `class CPU {
  freeze(): void { console.log('CPU: 冻结处理器') }
  jump(position: number): void { console.log('CPU: 跳转到位置 ' + position) }
  execute(): void { console.log('CPU: 开始执行指令') }
}

class Memory {
  load(position: number, data: Buffer): void {
    console.log('内存: 在位置 ' + position + ' 加载数据')
  }
}

class HardDrive {
  read(lba: number, size: number): Buffer {
    console.log('硬盘: 从扇区 ' + lba + ' 读取 ' + size + ' 字节')
    return Buffer.alloc(size)
  }
}

class ComputerFacade {
  private cpu = new CPU()
  private memory = new Memory()
  private hardDrive = new HardDrive()

  start(): void {
    this.cpu.freeze()
    const bootData = this.hardDrive.read(0, 512)
    this.memory.load(0x7C00, bootData)
    this.cpu.jump(0x7C00)
    this.cpu.execute()
  }
}

// 客户端只需调用一个方法
const computer = new ComputerFacade()
computer.start()`,
            highlights: [24, 25, 26, 27, 28, 29, 30],
        },
    ],
    pros: ['简化客户端与复杂子系统的交互', '降低系统耦合度', '客户端无需了解子系统细节', '符合迪米特法则'],
    cons: ['可能成为"上帝对象"', '不符合开闭原则时需要修改外观类', '不能限制客户端直接使用子系统'],
    relatedPatterns: [
        { patternId: 'adapter', relationType: 'alternative', description: '适配器转换接口，外观简化接口' },
        { patternId: 'mediator', relationType: 'alternative', description: '中介者协调同事间交互，外观简化子系统访问' },
        { patternId: 'abstract-factory', relationType: 'combinable', description: '抽象工厂可配合外观来简化产品创建' },
    ],
    frameworkExamples: [
        { framework: 'Vue 3', description: 'createApp() 是外观模式，封装了应用创建的复杂流程' },
        { framework: 'Express', description: 'app.listen() 封装了HTTP服务器的创建和启动流程' },
    ],
};

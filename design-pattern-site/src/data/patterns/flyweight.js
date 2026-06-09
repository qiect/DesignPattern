export const flyweight = {
    id: 'flyweight',
    name: '享元模式',
    nameEn: 'Flyweight Pattern',
    category: 'structural',
    difficulty: 3,
    tags: ['结构型', '对象共享', '内存优化'],
    definition: '运用共享技术有效地支持大量细粒度的对象。',
    simpleExplanation: '把相同的数据共享给多个对象使用，避免重复创建，从而节省内存。',
    lifeAnalogy: '就像围棋棋子，黑白两色就够了，不需要每个棋子都自带颜色属性，位置是外部状态。',
    roles: [
        { name: '抽象享元', nameEn: 'Flyweight', responsibility: '声明公共接口，接受外部状态', color: '#6c8cff' },
        { name: '具体享元', nameEn: 'ConcreteFlyweight', responsibility: '实现接口，为内部状态提供存储', color: '#00d4aa' },
        { name: '享元工厂', nameEn: 'FlyweightFactory', responsibility: '创建和管理享元对象，确保合理共享', color: '#ff6b35' },
    ],
    umlCode: `classDiagram
    class IChessPiece {
      <<interface>>
      +Display() void
      +GetColor() string
    }
    class ChessPiece {
      -color string
      +Display() void
      +GetColor() string
    }
    class ChessPieceFactory {
      -pool Dictionary
      +GetChessPiece() IChessPiece
      +GetPoolSize() int
    }
    IChessPiece <|.. ChessPiece
    ChessPieceFactory --> ChessPiece : manages`,
    animationSteps: [
        {
            description: '大量相似对象占用大量内存',
            objects: [
                { id: 'p1', type: 'circle', x: 80, y: 80, width: 50, height: 50, label: '黑棋', color: '#333', opacity: 1 },
                { id: 'p2', type: 'circle', x: 160, y: 80, width: 50, height: 50, label: '黑棋', color: '#333', opacity: 1 },
                { id: 'p3', type: 'circle', x: 240, y: 80, width: 50, height: 50, label: '白棋', color: '#eee', opacity: 1 },
                { id: 'p4', type: 'circle', x: 320, y: 80, width: 50, height: 50, label: '白棋', color: '#eee', opacity: 1 },
                { id: 'p5', type: 'circle', x: 400, y: 80, width: 50, height: 50, label: '黑棋', color: '#333', opacity: 1 },
                { id: 'mem', type: 'rect', x: 200, y: 180, width: 160, height: 40, label: '5个对象(内存多)', color: '#ff6b35', opacity: 1 },
            ],
            arrows: [],
        },
        {
            description: '享元工厂共享相同内部状态',
            objects: [
                { id: 'factory', type: 'rect', x: 200, y: 30, width: 140, height: 50, label: 'FlyweightFactory', color: '#ff6b35', opacity: 1 },
                { id: 'black', type: 'circle', x: 180, y: 130, width: 70, height: 70, label: '黑棋(共享)', color: '#333', opacity: 1 },
                { id: 'white', type: 'circle', x: 320, y: 130, width: 70, height: 70, label: '白棋(共享)', color: '#eee', opacity: 1 },
                { id: 'mem', type: 'rect', x: 200, y: 220, width: 160, height: 40, label: '2个对象(内存少)', color: '#00d4aa', opacity: 1 },
            ],
            arrows: [
                { from: 'factory', to: 'black', label: '共享', color: '#ff6b35' },
                { from: 'factory', to: 'white', label: '共享', color: '#ff6b35' },
            ],
        },
        {
            description: '外部状态由客户端维护',
            objects: [
                { id: 'factory', type: 'rect', x: 200, y: 30, width: 140, height: 50, label: 'FlyweightFactory', color: '#ff6b35', opacity: 1 },
                { id: 'black', type: 'circle', x: 180, y: 130, width: 70, height: 70, label: '黑棋', color: '#333', opacity: 1 },
                { id: 'pos1', type: 'rect', x: 80, y: 230, width: 80, height: 30, label: '位置(0,0)', color: '#6c8cff', opacity: 1 },
                { id: 'pos2', type: 'rect', x: 200, y: 230, width: 80, height: 30, label: '位置(2,0)', color: '#6c8cff', opacity: 1 },
                { id: 'pos3', type: 'rect', x: 320, y: 230, width: 80, height: 30, label: '位置(4,0)', color: '#6c8cff', opacity: 1 },
            ],
            arrows: [
                { from: 'black', to: 'pos1', label: '外部状态', color: '#6c8cff', dashed: true },
                { from: 'black', to: 'pos2', label: '外部状态', color: '#6c8cff', dashed: true },
                { from: 'black', to: 'pos3', label: '外部状态', color: '#6c8cff', dashed: true },
            ],
        },
    ],
    scenarios: [
        { title: '棋盘游戏', description: '大量棋子共享颜色属性', icon: 'Grid3x3' },
        { title: '文字编辑器', description: '字符对象共享字形数据', icon: 'Type' },
        { title: '游戏纹理缓存', description: '共享纹理数据，减少内存占用', icon: 'Image' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface IChessPiece
{
    void Display(int x, int y);
    string GetColor();
}

public class ChessPiece : IChessPiece
{
    private readonly string _color; // 内部状态
    public ChessPiece(string color) { _color = color; }
    public void Display(int x, int y) =>
        Console.WriteLine($"棋子 [{_color}] 位置: ({x}, {y})");
    public string GetColor() => _color;
}

public class ChessPieceFactory
{
    private readonly Dictionary<string, IChessPiece> _pool = new();

    public IChessPiece GetChessPiece(string color)
    {
        if (!_pool.ContainsKey(color))
            _pool[color] = new ChessPiece(color);
        return _pool[color];
    }

    public int GetPoolSize() => _pool.Count;
}`,
            highlights: [1, 9, 10, 11, 16, 19, 20, 21],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface ChessPiece {
  display(x: number, y: number): void
  getColor(): string
}

class ChessPieceImpl implements ChessPiece {
  private color: string // 内部状态
  constructor(color: string) { this.color = color }
  display(x: number, y: number): void {
    console.log('棋子 [' + this.color + '] 位置: (' + x + ', ' + y + ')')
  }
  getColor(): string { return this.color }
}

class ChessPieceFactory {
  private pool = new Map<string, ChessPiece>()

  getChessPiece(color: string): ChessPiece {
    if (!this.pool.has(color)) {
      this.pool.set(color, new ChessPieceImpl(color))
    }
    return this.pool.get(color)!
  }

  getPoolSize(): number { return this.pool.size }
}

// 使用：5个棋子只创建2个对象
const factory = new ChessPieceFactory()
const black = factory.getChessPiece('黑色')
const white = factory.getChessPiece('白色')
black.display(0, 0)  // 外部状态由客户端传入
black.display(2, 0)
white.display(1, 0)`,
            highlights: [1, 8, 9, 15, 17, 18, 19],
        },
    ],
    pros: ['减少对象的创建数量，节省内存', '共享内部状态，外部状态由客户端维护', '适合大量相似对象的场景', '符合开闭原则'],
    cons: ['需要区分内部状态和外部状态', '增加了系统复杂度', '线程安全需要额外处理', '可能增加运行时间换取内存'],
    relatedPatterns: [
        { patternId: 'composite', relationType: 'combinable', description: '组合模式的结果可用享元来共享叶子节点' },
        { patternId: 'factory-method', relationType: 'complementary', description: '享元工厂使用工厂方法来创建享元对象' },
        { patternId: 'singleton', relationType: 'alternative', description: '单例保证唯一实例，享元允许有限数量的共享实例' },
    ],
    frameworkExamples: [
        { framework: 'Java', description: 'String 的字符串常量池和 Integer 的小整数缓存是享元模式' },
        { framework: 'Vue 3', description: 'Vue 的静态提升(Static Hoisting)共享静态节点是享元思想' },
    ],
};

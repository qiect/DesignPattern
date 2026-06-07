import type { Pattern } from '@/types/pattern'

export const bridge: Pattern = {
  id: 'bridge',
  name: '桥接模式',
  nameEn: 'Bridge Pattern',
  category: 'structural',
  difficulty: 2,
  tags: ['结构型', '分离抽象', '多维度变化'],
  definition: '将抽象部分与它的实现部分分离，使它们都可以独立地变化。',
  simpleExplanation: '把一个大类拆成两个独立的维度，通过组合而不是继承来扩展，两个维度可以各自变化。',
  lifeAnalogy: '就像电视和遥控器，电视品牌和遥控器类型可以独立变化，通过红外线桥接起来。',
  roles: [
    { name: '抽象化', nameEn: 'Abstraction', responsibility: '定义抽象接口，持有实现化对象的引用', color: '#6c8cff' },
    { name: '扩展抽象化', nameEn: 'RefinedAbstraction', responsibility: '扩展抽象化接口', color: '#00d4aa' },
    { name: '实现化', nameEn: 'Implementor', responsibility: '定义实现化接口', color: '#ff6b35' },
    { name: '具体实现化', nameEn: 'ConcreteImplementor', responsibility: '实现实现化接口', color: '#ffd93d' },
  ],
  umlCode: `classDiagram
    class Shape {
      #Renderer renderer
      +Draw() void
    }
    class Circle {
      -radius float
      +Draw() void
    }
    class IRenderer {
      <<interface>>
      +RenderCircle() void
      +RenderSquare() void
    }
    class VectorRenderer {
      +RenderCircle() void
      +RenderSquare() void
    }
    class RasterRenderer {
      +RenderCircle() void
      +RenderSquare() void
    }
    Shape <|-- Circle
    Shape --> IRenderer
    IRenderer <|.. VectorRenderer
    IRenderer <|.. RasterRenderer`,
  animationSteps: [
    {
      description: '抽象部分持有实现部分的引用',
      objects: [
        { id: 'abstraction', type: 'rect', x: 150, y: 50, width: 120, height: 50, label: 'Shape', color: '#6c8cff', opacity: 1 },
        { id: 'impl', type: 'rect', x: 400, y: 50, width: 120, height: 50, label: 'IRenderer', color: '#ff6b35', opacity: 1 },
      ],
      arrows: [
        { from: 'abstraction', to: 'impl', label: '持有引用', color: '#6c8cff' },
      ],
    },
    {
      description: '两个维度独立扩展：形状 + 渲染器',
      objects: [
        { id: 'circle', type: 'rect', x: 80, y: 50, width: 100, height: 40, label: 'Circle', color: '#00d4aa', opacity: 1 },
        { id: 'square', type: 'rect', x: 80, y: 130, width: 100, height: 40, label: 'Square', color: '#00d4aa', opacity: 1 },
        { id: 'vector', type: 'rect', x: 380, y: 50, width: 120, height: 40, label: 'VectorRenderer', color: '#ffd93d', opacity: 1 },
        { id: 'raster', type: 'rect', x: 380, y: 130, width: 120, height: 40, label: 'RasterRenderer', color: '#ffd93d', opacity: 1 },
      ],
      arrows: [
        { from: 'circle', to: 'vector', label: '组合', color: '#00d4aa', animated: true },
        { from: 'square', to: 'raster', label: '组合', color: '#ffd93d', animated: true },
      ],
    },
    {
      description: '运行时切换实现',
      objects: [
        { id: 'circle', type: 'rect', x: 80, y: 80, width: 100, height: 40, label: 'Circle', color: '#00d4aa', opacity: 1 },
        { id: 'vector', type: 'rect', x: 380, y: 40, width: 120, height: 40, label: 'VectorRenderer', color: '#ffd93d', opacity: 0.5 },
        { id: 'raster', type: 'rect', x: 380, y: 120, width: 120, height: 40, label: 'RasterRenderer', color: '#ffd93d', opacity: 1 },
      ],
      arrows: [
        { from: 'circle', to: 'raster', label: '切换渲染器', color: '#ff6b35', animated: true },
      ],
    },
  ],
  scenarios: [
    { title: '图形渲染系统', description: '形状与渲染方式独立变化', icon: 'Shapes' },
    { title: '消息发送系统', description: '消息类型与发送渠道独立变化', icon: 'MessageSquare' },
    { title: '设备控制', description: '设备类型与通信协议独立变化', icon: 'Wifi' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public interface IRenderer
{
    void RenderCircle(float radius);
    void RenderSquare(float side);
}

public class VectorRenderer : IRenderer
{
    public void RenderCircle(float radius) =>
        Console.WriteLine($"矢量渲染: 绘制半径为 {radius} 的圆形");
    public void RenderSquare(float side) =>
        Console.WriteLine($"矢量渲染: 绘制边长为 {side} 的正方形");
}

public class RasterRenderer : IRenderer
{
    public void RenderCircle(float radius) =>
        Console.WriteLine($"栅格渲染: 绘制半径为 {radius} 的圆形");
    public void RenderSquare(float side) =>
        Console.WriteLine($"栅格渲染: 绘制边长为 {side} 的正方形");
}

public abstract class Shape
{
    protected IRenderer Renderer;
    protected Shape(IRenderer renderer) { Renderer = renderer; }
    public abstract void Draw();
}

public class Circle : Shape
{
    private readonly float _radius;
    public Circle(IRenderer renderer, float radius) : base(renderer) { _radius = radius; }
    public override void Draw() => Renderer.RenderCircle(_radius);
}`,
      highlights: [1, 21, 22, 23, 29, 33],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `interface Renderer {
  renderCircle(radius: number): void
  renderSquare(side: number): void
}

class VectorRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log('矢量渲染: 绘制半径为 ' + radius + ' 的圆形')
  }
  renderSquare(side: number): void {
    console.log('矢量渲染: 绘制边长为 ' + side + ' 的正方形')
  }
}

class RasterRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log('栅格渲染: 绘制半径为 ' + radius + ' 的圆形')
  }
  renderSquare(side: number): void {
    console.log('栅格渲染: 绘制边长为 ' + side + ' 的正方形')
  }
}

abstract class Shape {
  protected renderer: Renderer
  constructor(renderer: Renderer) { this.renderer = renderer }
  abstract draw(): void
}

class Circle extends Shape {
  constructor(renderer: Renderer, private radius: number) { super(renderer) }
  draw(): void { this.renderer.renderCircle(this.radius) }
}

// 使用
const circle = new Circle(new VectorRenderer(), 5)
circle.draw()`,
      highlights: [1, 22, 23, 24, 27, 28],
    },
  ],
  pros: ['分离抽象接口及其实现部分', '提高系统的可扩展性', '实现细节对客户端透明', '符合开闭原则和合成复用原则'],
  cons: ['增加系统理解难度', '需要正确识别独立变化的维度', '增加了类的数量'],
  relatedPatterns: [
    { patternId: 'adapter', relationType: 'alternative', description: '适配器是事后补救，桥接是预先设计' },
    { patternId: 'strategy', relationType: 'complementary', description: '策略模式是桥接模式的简化版，关注算法切换' },
    { patternId: 'abstract-factory', relationType: 'combinable', description: '抽象工厂可用来创建桥接中的实现部分' },
  ],
  frameworkExamples: [
    { framework: 'React', description: 'React 的组件与平台渲染器(ReactDOM/ReactNative)分离就是桥接模式' },
    { framework: 'JDBC', description: 'JDBC 的 Driver 接口和具体数据库驱动是桥接模式的体现' },
  ],
}

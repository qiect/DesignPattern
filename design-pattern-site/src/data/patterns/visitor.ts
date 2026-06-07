import type { Pattern } from '@/types/pattern'

export const visitor: Pattern = {
  id: 'visitor',
  name: '访问者模式',
  nameEn: 'Visitor Pattern',
  category: 'behavioral',
  difficulty: 2,
  tags: ['行为型', '双分派', '操作分离'],
  definition: '表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。',
  simpleExplanation: '把"操作"从"数据结构"中分离出来，新增操作时不需要修改数据结构类，只需添加新的访问者。',
  lifeAnalogy: '就像体检，你（元素）不需要知道每项检查怎么做，医生（访问者）会来检查你，不同医生做不同检查。',
  roles: [
    { name: '抽象访问者', nameEn: 'Visitor', responsibility: '为每个具体元素声明一个访问操作', color: '#6c8cff' },
    { name: '具体访问者', nameEn: 'ConcreteVisitor', responsibility: '实现每个访问操作', color: '#00d4aa' },
    { name: '抽象元素', nameEn: 'Element', responsibility: '声明Accept方法，接受访问者', color: '#ff6b35' },
    { name: '具体元素', nameEn: 'ConcreteElement', responsibility: '实现Accept方法，回调访问者', color: '#ffd93d' },
  ],
  umlCode: `classDiagram
    class IShapeVisitor {
      <<interface>>
      +Visit(Circle) void
      +Visit(Rectangle) void
      +Visit(Triangle) void
    }
    class IShape {
      <<interface>>
      +Accept(IShapeVisitor) void
    }
    class Circle {
      +Radius double
      +Accept() void
    }
    class XmlExportVisitor {
      +Visit(Circle) void
      +Visit(Rectangle) void
    }
    class JsonExportVisitor {
      +Visit(Circle) void
      +Visit(Rectangle) void
    }
    IShapeVisitor <|.. XmlExportVisitor
    IShapeVisitor <|.. JsonExportVisitor
    IShape <|.. Circle
    Circle --> IShapeVisitor : Accept(visitor)`,
  animationSteps: [
    {
      description: '元素接受访问者',
      objects: [
        { id: 'visitor', type: 'rect', x: 50, y: 80, width: 120, height: 50, label: 'Visitor', color: '#6c8cff', opacity: 1 },
        { id: 'element', type: 'rect', x: 350, y: 80, width: 120, height: 50, label: 'Circle', color: '#ff6b35', opacity: 1 },
      ],
      arrows: [
        { from: 'visitor', to: 'element', label: '访问', color: '#6c8cff', animated: true },
      ],
    },
    {
      description: '双分派：元素回调访问者的Visit方法',
      objects: [
        { id: 'visitor', type: 'rect', x: 50, y: 80, width: 120, height: 50, label: 'Visitor', color: '#6c8cff', opacity: 1 },
        { id: 'element', type: 'rect', x: 350, y: 80, width: 120, height: 50, label: 'Circle', color: '#ff6b35', opacity: 1 },
      ],
      arrows: [
        { from: 'element', to: 'visitor', label: 'Accept(this)\n→ Visit(Circle)', color: '#ff6b35', animated: true },
      ],
    },
    {
      description: '不同访问者执行不同操作',
      objects: [
        { id: 'xml', type: 'rect', x: 80, y: 50, width: 140, height: 40, label: 'XmlExportVisitor', color: '#00d4aa', opacity: 1 },
        { id: 'json', type: 'rect', x: 80, y: 130, width: 140, height: 40, label: 'JsonExportVisitor', color: '#ffd93d', opacity: 1 },
        { id: 'circle', type: 'rect', x: 380, y: 80, width: 120, height: 50, label: 'Circle', color: '#ff6b35', opacity: 1 },
      ],
      arrows: [
        { from: 'circle', to: 'xml', label: 'XML输出', color: '#00d4aa', animated: true },
        { from: 'circle', to: 'json', label: 'JSON输出', color: '#ffd93d', animated: true },
      ],
    },
  ],
  scenarios: [
    { title: '形状导出', description: '同一组形状导出为不同格式', icon: 'Download' },
    { title: '员工报表', description: '不同维度的员工数据统计', icon: 'Users' },
    { title: '编译器AST', description: '对语法树进行类型检查、代码生成等操作', icon: 'Code' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public interface IShapeVisitor
{
    void Visit(Circle circle);
    void Visit(Rectangle rectangle);
    void Visit(Triangle triangle);
}

public interface IShape
{
    void Accept(IShapeVisitor visitor);
}

public class Circle : IShape
{
    public double Radius { get; }
    public Circle(double radius) { Radius = radius; }
    public double GetArea() => Math.PI * Radius * Radius;

    public void Accept(IShapeVisitor visitor) => visitor.Visit(this);
}

public class Rectangle : IShape
{
    public double Width { get; }
    public double Height { get; }
    public Rectangle(double width, double height) { Width = width; Height = height; }
    public double GetArea() => Width * Height;

    public void Accept(IShapeVisitor visitor) => visitor.Visit(this);
}

public class XmlExportVisitor : IShapeVisitor
{
    public void Visit(Circle circle) =>
        Console.WriteLine($"<circle radius=\"{circle.Radius}\" area=\"{circle.GetArea():F2}\" />");
    public void Visit(Rectangle rect) =>
        Console.WriteLine($"<rect width=\"{rect.Width}\" height=\"{rect.Height}\" />");
    public void Visit(Triangle tri) =>
        Console.WriteLine($"<triangle base=\"{tri.Base}\" height=\"{tri.Height}\" />");
}`,
      highlights: [1, 9, 17, 18, 26, 27, 28, 29, 30],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `interface ShapeVisitor {
  visitCircle(circle: Circle): void
  visitRectangle(rectangle: Rectangle): void
}

interface Shape {
  accept(visitor: ShapeVisitor): void
}

class Circle implements Shape {
  constructor(public radius: number) {}
  getArea(): number { return Math.PI * this.radius * this.radius }

  accept(visitor: ShapeVisitor): void { visitor.visitCircle(this) }
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}
  getArea(): number { return this.width * this.height }

  accept(visitor: ShapeVisitor): void { visitor.visitRectangle(this) }
}

class XmlExportVisitor implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    console.log('<circle radius="' + circle.radius + '" area="' + circle.getArea().toFixed(2) + '" />')
  }
  visitRectangle(rect: Rectangle): void {
    console.log('<rect width="' + rect.width + '" height="' + rect.height + '" />')
  }
}

class JsonExportVisitor implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    console.log(JSON.stringify({ type: 'circle', radius: circle.radius }))
  }
  visitRectangle(rect: Rectangle): void {
    console.log(JSON.stringify({ type: 'rectangle', width: rect.width, height: rect.height }))
  }
}`,
      highlights: [1, 8, 9, 10, 14, 15, 16, 20, 21, 22, 26, 27, 28],
    },
  ],
  pros: ['在不改变元素类的前提下定义新操作', '相关操作集中在一个访问者中', '符合单一职责原则', '易于添加新的访问者'],
  cons: ['增加新元素类型需要修改所有访问者', '破坏了元素的封装性', '元素与访问者耦合', '复杂度较高'],
  relatedPatterns: [
    { patternId: 'composite', relationType: 'combinable', description: '访问者常用于遍历组合结构并执行操作' },
    { patternId: 'interpreter', relationType: 'combinable', description: '解释器的语法树可用访问者来操作' },
    { patternId: 'iterator', relationType: 'alternative', description: '迭代器遍历结构，访问者在遍历时执行操作' },
  ],
  frameworkExamples: [
    { framework: 'TypeScript', description: 'TypeScript 编译器的 AST 访问者模式，用于代码检查和转换' },
    { framework: 'Babel', description: 'Babel 插件系统使用访问者模式遍历和转换 AST 节点' },
  ],
}

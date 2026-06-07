import type { Pattern } from '@/types/pattern'

export const composite: Pattern = {
  id: 'composite',
  name: '组合模式',
  nameEn: 'Composite Pattern',
  category: 'structural',
  difficulty: 2,
  tags: ['结构型', '树形结构', '部分-整体'],
  definition: '将对象组合成树形结构以表示"部分-整体"的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。',
  simpleExplanation: '把单个对象和组合对象同等对待，让你不用区分是处理一个还是一组，统一用相同的方式操作。',
  lifeAnalogy: '就像公司组织架构，CEO管总监，总监管经理，经理管员工，不管管谁都是"管理"这个动作。',
  roles: [
    { name: '抽象构件', nameEn: 'Component', responsibility: '为叶子节点和组合节点声明公共接口', color: '#6c8cff' },
    { name: '叶子节点', nameEn: 'Leaf', responsibility: '表示叶子节点对象，没有子节点', color: '#00d4aa' },
    { name: '组合节点', nameEn: 'Composite', responsibility: '表示有子节点的对象，实现子节点管理操作', color: '#ff6b35' },
  ],
  umlCode: `classDiagram
    class FileSystemNode {
      <<abstract>>
      +Name string
      +Display() void
      +GetSize() long
    }
    class FileItem {
      -size long
      +Display() void
      +GetSize() long
    }
    class Folder {
      -children List
      +Add() void
      +Remove() void
      +Display() void
      +GetSize() long
    }
    FileSystemNode <|-- FileItem
    FileSystemNode <|-- Folder
    Folder o-- FileSystemNode`,
  animationSteps: [
    {
      description: '构建树形结构',
      objects: [
        { id: 'root', type: 'rect', x: 250, y: 30, width: 100, height: 40, label: '根目录/', color: '#ff6b35', opacity: 1 },
        { id: 'doc', type: 'rect', x: 130, y: 110, width: 100, height: 40, label: '文档/', color: '#ff6b35', opacity: 1 },
        { id: 'pic', type: 'rect', x: 370, y: 110, width: 100, height: 40, label: '图片/', color: '#ff6b35', opacity: 1 },
        { id: 'f1', type: 'circle', x: 100, y: 200, width: 60, height: 60, label: '报告', color: '#00d4aa', opacity: 1 },
        { id: 'f2', type: 'circle', x: 200, y: 200, width: 60, height: 60, label: '笔记', color: '#00d4aa', opacity: 1 },
        { id: 'f3', type: 'circle', x: 340, y: 200, width: 60, height: 60, label: '照片', color: '#00d4aa', opacity: 1 },
        { id: 'f4', type: 'circle', x: 440, y: 200, width: 60, height: 60, label: '图标', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'root', to: 'doc', label: '', color: '#ff6b35' },
        { from: 'root', to: 'pic', label: '', color: '#ff6b35' },
        { from: 'doc', to: 'f1', label: '', color: '#6c8cff' },
        { from: 'doc', to: 'f2', label: '', color: '#6c8cff' },
        { from: 'pic', to: 'f3', label: '', color: '#6c8cff' },
        { from: 'pic', to: 'f4', label: '', color: '#6c8cff' },
      ],
    },
    {
      description: '统一调用Display()，递归遍历',
      objects: [
        { id: 'root', type: 'rect', x: 250, y: 30, width: 100, height: 40, label: '根目录/', color: '#ff6b35', opacity: 1 },
        { id: 'doc', type: 'rect', x: 130, y: 110, width: 100, height: 40, label: '文档/', color: '#ff6b35', opacity: 1 },
        { id: 'pic', type: 'rect', x: 370, y: 110, width: 100, height: 40, label: '图片/', color: '#ff6b35', opacity: 1 },
        { id: 'f1', type: 'circle', x: 100, y: 200, width: 60, height: 60, label: '报告', color: '#00d4aa', opacity: 1 },
        { id: 'f2', type: 'circle', x: 200, y: 200, width: 60, height: 60, label: '笔记', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'root', to: 'doc', label: 'Display()', color: '#ff6b35', animated: true },
        { from: 'doc', to: 'f1', label: 'Display()', color: '#6c8cff', animated: true },
      ],
    },
    {
      description: '统一调用GetSize()，递归求和',
      objects: [
        { id: 'root', type: 'rect', x: 250, y: 30, width: 100, height: 40, label: 'GetSize()', color: '#ff6b35', opacity: 1 },
        { id: 'doc', type: 'rect', x: 130, y: 110, width: 100, height: 40, label: '288KB', color: '#ff6b35', opacity: 1 },
        { id: 'pic', type: 'rect', x: 370, y: 110, width: 100, height: 40, label: '1088KB', color: '#ff6b35', opacity: 1 },
        { id: 'f1', type: 'circle', x: 100, y: 200, width: 60, height: 60, label: '256', color: '#00d4aa', opacity: 1 },
        { id: 'f2', type: 'circle', x: 200, y: 200, width: 60, height: 60, label: '32', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'root', to: 'doc', label: '求和', color: '#ff6b35', animated: true },
        { from: 'root', to: 'pic', label: '求和', color: '#ff6b35', animated: true },
      ],
    },
  ],
  scenarios: [
    { title: '文件系统', description: '文件和文件夹的树形结构管理', icon: 'FolderTree' },
    { title: '组织架构', description: '公司部门与员工的层级管理', icon: 'Building2' },
    { title: '图形编辑器', description: '简单图形与组合图形的统一操作', icon: 'PenTool' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public abstract class FileSystemNode
{
    public string Name { get; }
    protected FileSystemNode(string name) { Name = name; }
    public abstract void Display(int indent = 0);
    public abstract long GetSize();
}

public class FileItem : FileSystemNode
{
    private readonly long _size;
    public FileItem(string name, long size) : base(name) { _size = size; }
    public override void Display(int indent = 0) =>
        Console.WriteLine($"{new string(' ', indent * 2)}📄 {Name} ({_size}KB)");
    public override long GetSize() => _size;
}

public class Folder : FileSystemNode
{
    private readonly List<FileSystemNode> _children = new();
    public Folder(string name) : base(name) { }
    public void Add(FileSystemNode node) => _children.Add(node);
    public void Remove(FileSystemNode node) => _children.Remove(node);

    public override void Display(int indent = 0)
    {
        Console.WriteLine($"{new string(' ', indent * 2)}📁 {Name}/");
        foreach (var child in _children) child.Display(indent + 1);
    }

    public override long GetSize() => _children.Sum(c => c.GetSize());
}`,
      highlights: [1, 11, 19, 20, 21, 24, 25, 29],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `abstract class FileSystemNode {
  name: string
  constructor(name: string) { this.name = name }
  abstract display(indent?: number): void
  abstract getSize(): number
}

class FileItem extends FileSystemNode {
  constructor(name: string, private size: number) { super(name) }
  display(indent = 0): void {
    console.log(\`\${' '.repeat(indent * 2)}📄 \${this.name} (\${this.size}KB)\`)
  }
  getSize(): number { return this.size }
}

class Folder extends FileSystemNode {
  private children: FileSystemNode[] = []
  constructor(name: string) { super(name) }
  add(node: FileSystemNode): void { this.children.push(node) }
  remove(node: FileSystemNode): void {
    this.children = this.children.filter(c => c !== node)
  }
  display(indent = 0): void {
    console.log(\`\${' '.repeat(indent * 2)}📁 \${this.name}/\`)
    this.children.forEach(c => c.display(indent + 1))
  }
  getSize(): number {
    return this.children.reduce((sum, c) => sum + c.getSize(), 0)
  }
}`,
      highlights: [1, 10, 11, 16, 17, 21, 22, 25],
    },
  ],
  pros: ['统一处理单个对象和组合对象', '简化客户端代码', '易于添加新的构件类型', '符合开闭原则'],
  cons: ['难以限制组合中的构件类型', '设计过于通用可能不够安全', '增加系统复杂性'],
  relatedPatterns: [
    { patternId: 'visitor', relationType: 'combinable', description: '访问者模式常用于遍历组合结构并执行操作' },
    { patternId: 'iterator', relationType: 'combinable', description: '迭代器可用于遍历组合结构' },
    { patternId: 'decorator', relationType: 'alternative', description: '装饰器动态添加职责，组合器管理子对象' },
  ],
  frameworkExamples: [
    { framework: 'Vue 3', description: 'Vue 的虚拟DOM树就是组合模式，VNode可以是元素节点或文本节点' },
    { framework: 'React', description: 'React 组件树是组合模式，组件可以包含子组件' },
  ],
}

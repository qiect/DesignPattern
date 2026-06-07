import type { Pattern } from '@/types/pattern'

export const templateMethod: Pattern = {
  id: 'template-method',
  name: '模板方法模式',
  nameEn: 'Template Method Pattern',
  category: 'behavioral',
  difficulty: 1,
  tags: ['行为型', '算法骨架', '代码复用'],
  definition: '定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。',
  simpleExplanation: '父类定义算法的骨架（哪些步骤、什么顺序），子类只实现具体的步骤细节，不改整体流程。',
  lifeAnalogy: '就像泡茶的流程固定为：烧水→泡茶→倒杯→加料，但泡什么茶、加什么料由子类决定。',
  roles: [
    { name: '抽象类', nameEn: 'AbstractClass', responsibility: '定义抽象原语操作，实现模板方法', color: '#6c8cff' },
    { name: '具体类', nameEn: 'ConcreteClass', responsibility: '实现原语操作以完成算法特定步骤', color: '#00d4aa' },
  ],
  umlCode: `classDiagram
    class DataMiner {
      <<abstract>>
      +Mine() void
      #OpenFile()* void
      #ExtractData()* void
      #ParseData() void
      #AnalyzeData() void
      #CloseFile()* void
    }
    class PdfDataMiner {
      #OpenFile() void
      #ExtractData() void
      #CloseFile() void
    }
    class CsvDataMiner {
      #OpenFile() void
      #ExtractData() void
      #CloseFile() void
      #ParseData() void
    }
    DataMiner <|-- PdfDataMiner
    DataMiner <|-- CsvDataMiner`,
  animationSteps: [
    {
      description: '模板方法定义算法骨架',
      objects: [
        { id: 'step1', type: 'circle', x: 80, y: 80, width: 60, height: 60, label: 'OpenFile', color: '#6c8cff', opacity: 1 },
        { id: 'step2', type: 'circle', x: 200, y: 80, width: 60, height: 60, label: 'Extract', color: '#6c8cff', opacity: 1 },
        { id: 'step3', type: 'circle', x: 320, y: 80, width: 60, height: 60, label: 'Parse', color: '#ffd93d', opacity: 1 },
        { id: 'step4', type: 'circle', x: 440, y: 80, width: 60, height: 60, label: 'Analyze', color: '#ffd93d', opacity: 1 },
        { id: 'step5', type: 'circle', x: 560, y: 80, width: 60, height: 60, label: 'Close', color: '#6c8cff', opacity: 1 },
      ],
      arrows: [
        { from: 'step1', to: 'step2', label: '', color: '#6c8cff', animated: true },
        { from: 'step2', to: 'step3', label: '', color: '#6c8cff', animated: true },
        { from: 'step3', to: 'step4', label: '', color: '#6c8cff', animated: true },
        { from: 'step4', to: 'step5', label: '', color: '#6c8cff', animated: true },
      ],
    },
    {
      description: '子类实现抽象步骤(蓝色)，钩子步骤(黄色)可选重写',
      objects: [
        { id: 'pdf', type: 'rect', x: 150, y: 30, width: 120, height: 40, label: 'PdfDataMiner', color: '#00d4aa', opacity: 1 },
        { id: 'csv', type: 'rect', x: 380, y: 30, width: 120, height: 40, label: 'CsvDataMiner', color: '#ff6b35', opacity: 1 },
        { id: 'step1', type: 'circle', x: 80, y: 130, width: 60, height: 60, label: 'Open', color: '#6c8cff', opacity: 1 },
        { id: 'step2', type: 'circle', x: 200, y: 130, width: 60, height: 60, label: 'Extract', color: '#6c8cff', opacity: 1 },
        { id: 'step3', type: 'circle', x: 320, y: 130, width: 60, height: 60, label: 'Parse', color: '#ffd93d', opacity: 1 },
        { id: 'step4', type: 'circle', x: 440, y: 130, width: 60, height: 60, label: 'Analyze', color: '#ffd93d', opacity: 1 },
        { id: 'step5', type: 'circle', x: 560, y: 130, width: 60, height: 60, label: 'Close', color: '#6c8cff', opacity: 1 },
      ],
      arrows: [
        { from: 'pdf', to: 'step1', label: '实现', color: '#00d4aa' },
        { from: 'csv', to: 'step3', label: '重写', color: '#ff6b35' },
      ],
    },
  ],
  scenarios: [
    { title: '数据挖掘', description: '不同格式文件的处理流程相同，细节不同', icon: 'Search' },
    { title: '饮品制作', description: '泡茶和泡咖啡流程相同，具体步骤不同', icon: 'Coffee' },
    { title: '报告生成', description: '报告生成骨架相同，数据收集和格式化不同', icon: 'FileBarChart' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public abstract class DataMiner
{
    public void Mine(string path) // 模板方法
    {
        OpenFile(path);
        ExtractData();
        ParseData();
        AnalyzeData();
        SendReport();
        CloseFile();
    }

    protected abstract void OpenFile(string path);
    protected abstract void ExtractData();
    protected abstract void CloseFile();

    protected virtual void ParseData() => Console.WriteLine("解析数据...");
    protected virtual void AnalyzeData() => Console.WriteLine("分析数据...");
    protected virtual void SendReport() => Console.WriteLine("发送报告...");
}

public class PdfDataMiner : DataMiner
{
    protected override void OpenFile(string path) =>
        Console.WriteLine($"打开PDF文件: {path}");
    protected override void ExtractData() =>
        Console.WriteLine("从PDF提取文本数据");
    protected override void CloseFile() =>
        Console.WriteLine("关闭PDF文件");
}

public class CsvDataMiner : DataMiner
{
    protected override void OpenFile(string path) =>
        Console.WriteLine($"打开CSV文件: {path}");
    protected override void ExtractData() =>
        Console.WriteLine("读取CSV行数据");
    protected override void CloseFile() =>
        Console.WriteLine("关闭CSV文件");
    protected override void ParseData() =>
        Console.WriteLine("解析CSV格式数据...");
}`,
      highlights: [3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 24, 25, 26],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `abstract class DataMiner {
  // 模板方法 - 定义算法骨架
  mine(path: string): void {
    this.openFile(path)
    this.extractData()
    this.parseData()
    this.analyzeData()
    this.sendReport()
    this.closeFile()
  }

  protected abstract openFile(path: string): void
  protected abstract extractData(): void
  protected abstract closeFile(): void

  // 钩子方法 - 子类可选重写
  protected parseData(): void { console.log('解析数据...') }
  protected analyzeData(): void { console.log('分析数据...') }
  protected sendReport(): void { console.log('发送报告...') }
}

class PdfDataMiner extends DataMiner {
  protected openFile(path: string): void { console.log('打开PDF: ' + path) }
  protected extractData(): void { console.log('从PDF提取文本') }
  protected closeFile(): void { console.log('关闭PDF') }
}

class CsvDataMiner extends DataMiner {
  protected openFile(path: string): void { console.log('打开CSV: ' + path) }
  protected extractData(): void { console.log('读取CSV行') }
  protected closeFile(): void { console.log('关闭CSV') }
  protected parseData(): void { console.log('解析CSV格式...') }
}`,
      highlights: [3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 23, 24, 25],
    },
  ],
  pros: ['定义算法骨架，子类实现具体步骤', '代码复用，减少重复代码', '符合开闭原则', '控制子类扩展点'],
  cons: ['每个不同实现都需要一个子类', '增加了类的数量', '骨架修改会影响所有子类'],
  relatedPatterns: [
    { patternId: 'strategy', relationType: 'alternative', description: '策略用组合替换算法，模板方法用继承扩展算法' },
    { patternId: 'factory-method', relationType: 'complementary', description: '工厂方法是模板方法的一种特殊应用' },
    { patternId: 'builder', relationType: 'alternative', description: '建造者关注分步构建，模板方法关注算法骨架' },
  ],
  frameworkExamples: [
    { framework: 'Vue 3', description: 'Vue 组件的生命周期钩子(onMounted/onUpdated)是模板方法模式' },
    { framework: 'React', description: 'React 类组件的 componentDidMount 等生命周期方法是模板方法' },
  ],
}

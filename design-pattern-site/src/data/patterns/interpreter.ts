import type { Pattern } from '@/types/pattern'

export const interpreter: Pattern = {
  id: 'interpreter',
  name: '解释器模式',
  nameEn: 'Interpreter Pattern',
  category: 'behavioral',
  difficulty: 3,
  tags: ['行为型', '语法解析', '表达式求值'],
  definition: '给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。',
  simpleExplanation: '把一种语言或表达式的语法规则用类来表示，然后解释执行这些表达式。',
  lifeAnalogy: '就像翻译官，你给他一句外语（表达式），他按照语法规则翻译成你能理解的意思。',
  roles: [
    { name: '抽象表达式', nameEn: 'AbstractExpression', responsibility: '声明抽象的解释操作', color: '#6c8cff' },
    { name: '终结符表达式', nameEn: 'TerminalExpression', responsibility: '实现与终结符相关的解释操作', color: '#00d4aa' },
    { name: '非终结符表达式', nameEn: 'NonterminalExpression', responsibility: '实现与非终结符相关的解释操作', color: '#ff6b35' },
    { name: '上下文', nameEn: 'Context', responsibility: '包含解释器之外的全局信息', color: '#ffd93d' },
  ],
  umlCode: `classDiagram
    class IExpression {
      <<interface>>
      +Interpret() int
    }
    class NumberExpression {
      -value int
      +Interpret() int
    }
    class AddExpression {
      -left IExpression
      -right IExpression
      +Interpret() int
    }
    class SubtractExpression {
      -left IExpression
      -right IExpression
      +Interpret() int
    }
    IExpression <|.. NumberExpression
    IExpression <|.. AddExpression
    IExpression <|.. SubtractExpression
    AddExpression --> IExpression
    SubtractExpression --> IExpression`,
  animationSteps: [
    {
      description: '构建表达式树：(3 + 5) * 2',
      objects: [
        { id: 'mul', type: 'diamond', x: 280, y: 30, width: 60, height: 60, label: '*', color: '#ff6b35', opacity: 1 },
        { id: 'add', type: 'diamond', x: 150, y: 130, width: 60, height: 60, label: '+', color: '#ff6b35', opacity: 1 },
        { id: 'num2', type: 'circle', x: 420, y: 130, width: 50, height: 50, label: '2', color: '#00d4aa', opacity: 1 },
        { id: 'num3', type: 'circle', x: 80, y: 230, width: 50, height: 50, label: '3', color: '#00d4aa', opacity: 1 },
        { id: 'num5', type: 'circle', x: 220, y: 230, width: 50, height: 50, label: '5', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'mul', to: 'add', label: 'left', color: '#ff6b35' },
        { from: 'mul', to: 'num2', label: 'right', color: '#ff6b35' },
        { from: 'add', to: 'num3', label: 'left', color: '#ff6b35' },
        { from: 'add', to: 'num5', label: 'right', color: '#ff6b35' },
      ],
    },
    {
      description: '递归解释：先计算3+5=8',
      objects: [
        { id: 'mul', type: 'diamond', x: 280, y: 30, width: 60, height: 60, label: '*', color: '#ff6b35', opacity: 0.5 },
        { id: 'add', type: 'diamond', x: 150, y: 130, width: 60, height: 60, label: '8', color: '#00d4aa', opacity: 1 },
        { id: 'num2', type: 'circle', x: 420, y: 130, width: 50, height: 50, label: '2', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'add', to: 'add', label: '3+5=8', color: '#00d4aa', animated: true },
      ],
    },
    {
      description: '最终计算：8*2=16',
      objects: [
        { id: 'result', type: 'circle', x: 280, y: 80, width: 80, height: 80, label: '16', color: '#ffd93d', opacity: 1 },
      ],
      arrows: [],
    },
  ],
  scenarios: [
    { title: '数学表达式', description: '解析和计算加减乘除表达式', icon: 'Calculator' },
    { title: '布尔表达式', description: '解析和计算逻辑运算表达式', icon: 'ToggleLeft' },
    { title: '规则引擎', description: '解析业务规则并执行', icon: 'Brain' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public interface IExpression { int Interpret(Context context); }

public class NumberExpression : IExpression
{
    private readonly int _value;
    public NumberExpression(int value) { _value = value; }
    public int Interpret(Context context) => _value;
}

public class VariableExpression : IExpression
{
    private readonly string _name;
    public VariableExpression(string name) { _name = name; }
    public int Interpret(Context context) => context.GetVariable(_name);
}

public class AddExpression : IExpression
{
    private readonly IExpression _left;
    private readonly IExpression _right;
    public AddExpression(IExpression left, IExpression right)
    { _left = left; _right = right; }
    public int Interpret(Context context) =>
        _left.Interpret(context) + _right.Interpret(context);
}

public class MultiplyExpression : IExpression
{
    private readonly IExpression _left;
    private readonly IExpression _right;
    public MultiplyExpression(IExpression left, IExpression right)
    { _left = left; _right = right; }
    public int Interpret(Context context) =>
        _left.Interpret(context) * _right.Interpret(context);
}

public class Context
{
    public Dictionary<string, int> Variables { get; } = new();
    public int GetVariable(string name) =>
        Variables.TryGetValue(name, out var value) ? value : 0;
}`,
      highlights: [1, 4, 5, 6, 10, 11, 12, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `interface Expression {
  interpret(context: Context): number
}

class NumberExpression implements Expression {
  constructor(private value: number) {}
  interpret(_context: Context): number { return this.value }
}

class VariableExpression implements Expression {
  constructor(private name: string) {}
  interpret(context: Context): number { return context.getVariable(this.name) }
}

class AddExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(context: Context): number {
    return this.left.interpret(context) + this.right.interpret(context)
  }
}

class MultiplyExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(context: Context): number {
    return this.left.interpret(context) * this.right.interpret(context)
  }
}

class Context {
  private variables = new Map<string, number>()
  getVariable(name: string): number { return this.variables.get(name) ?? 0 }
  setVariable(name: string, value: number): void { this.variables.set(name, value) }
}

// 构建: (x + y) * 2
const ctx = new Context()
ctx.setVariable('x', 10)
ctx.setVariable('y', 5)
const expr = new MultiplyExpression(
  new AddExpression(new VariableExpression('x'), new VariableExpression('y')),
  new NumberExpression(2)
)
console.log(expr.interpret(ctx)) // 30`,
      highlights: [1, 5, 6, 10, 11, 14, 15, 16, 20, 21, 22, 26, 27, 28],
    },
  ],
  pros: ['易于实现简单文法', '易于扩展新的表达式', '符合开闭原则', '将文法规则表示为类层次结构'],
  cons: ['复杂文法难以维护', '类数量随文法规则膨胀', '效率较低', '实际应用场景有限'],
  relatedPatterns: [
    { patternId: 'composite', relationType: 'complementary', description: '解释器的抽象语法树是组合结构' },
    { patternId: 'visitor', relationType: 'combinable', description: '访问者可用于遍历和操作语法树' },
    { patternId: 'iterator', relationType: 'combinable', description: '迭代器可用于遍历语法树' },
  ],
  frameworkExamples: [
    { framework: 'JavaScript', description: '正则表达式是解释器模式的内置实现，RegExp 引擎解释正则语法' },
    { framework: 'SQL', description: 'SQL 解析器是解释器模式，将 SQL 语句解释为数据库操作' },
  ],
}

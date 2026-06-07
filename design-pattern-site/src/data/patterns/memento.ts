import type { Pattern } from '@/types/pattern'

export const memento: Pattern = {
  id: 'memento',
  name: '备忘录模式',
  nameEn: 'Memento Pattern',
  category: 'behavioral',
  difficulty: 2,
  tags: ['行为型', '状态保存', '撤销恢复'],
  definition: '在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后恢复。',
  simpleExplanation: '把对象的状态拍个"快照"保存起来，需要的时候可以恢复到之前的状态，就像游戏的存档读档。',
  lifeAnalogy: '就像游戏存档，你打Boss前存个档，打输了可以读档重来，不需要从头开始。',
  roles: [
    { name: '备忘录', nameEn: 'Memento', responsibility: '存储发起人对象的内部状态', color: '#6c8cff' },
    { name: '发起人', nameEn: 'Originator', responsibility: '创建备忘录，记录当前状态', color: '#00d4aa' },
    { name: '管理者', nameEn: 'Caretaker', responsibility: '保存备忘录，不能修改内容', color: '#ff6b35' },
  ],
  umlCode: `classDiagram
    class EditorMemento {
      +Content string
      +CursorPosition int
    }
    class TextEditor {
      -content string
      -cursorPosition int
      +Type() void
      +Save() EditorMemento
      +Restore() void
    }
    class EditorHistory {
      -history Stack
      +Push() void
      +Pop() EditorMemento
    }
    TextEditor ..> EditorMemento : creates
    EditorHistory o-- EditorMemento`,
  animationSteps: [
    {
      description: '编辑器当前状态',
      objects: [
        { id: 'editor', type: 'rect', x: 250, y: 50, width: 120, height: 50, label: 'TextEditor', color: '#00d4aa', opacity: 1 },
        { id: 'state', type: 'rect', x: 250, y: 150, width: 120, height: 40, label: '"Hello"', color: '#6c8cff', opacity: 1 },
      ],
      arrows: [
        { from: 'editor', to: 'state', label: '当前内容', color: '#00d4aa' },
      ],
    },
    {
      description: '保存状态到备忘录',
      objects: [
        { id: 'editor', type: 'rect', x: 150, y: 50, width: 120, height: 50, label: 'TextEditor', color: '#00d4aa', opacity: 1 },
        { id: 'memento', type: 'rect', x: 350, y: 50, width: 120, height: 50, label: 'Memento', color: '#6c8cff', opacity: 1 },
        { id: 'history', type: 'rect', x: 350, y: 150, width: 120, height: 50, label: 'History', color: '#ff6b35', opacity: 1 },
      ],
      arrows: [
        { from: 'editor', to: 'memento', label: 'Save()', color: '#00d4aa', animated: true },
        { from: 'memento', to: 'history', label: 'Push()', color: '#6c8cff', animated: true },
      ],
    },
    {
      description: '撤销：从备忘录恢复状态',
      objects: [
        { id: 'editor', type: 'rect', x: 150, y: 50, width: 120, height: 50, label: 'TextEditor', color: '#00d4aa', opacity: 1 },
        { id: 'memento', type: 'rect', x: 350, y: 50, width: 120, height: 50, label: 'Memento', color: '#6c8cff', opacity: 1 },
        { id: 'history', type: 'rect', x: 350, y: 150, width: 120, height: 50, label: 'History', color: '#ff6b35', opacity: 1 },
      ],
      arrows: [
        { from: 'history', to: 'memento', label: 'Pop()', color: '#ff6b35', animated: true },
        { from: 'memento', to: 'editor', label: 'Restore()', color: '#6c8cff', animated: true },
      ],
    },
  ],
  scenarios: [
    { title: '文本编辑器', description: '撤销功能，栈式历史记录', icon: 'FileEdit' },
    { title: '游戏存档', description: '多槽位存档和读档', icon: 'Save' },
    { title: '配置回滚', description: '系统配置变更后可回滚', icon: 'Settings' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public class EditorMemento
{
    public string Content { get; }
    public int CursorPosition { get; }

    public EditorMemento(string content, int cursorPosition)
    {
        Content = content;
        CursorPosition = cursorPosition;
    }
}

public class TextEditor
{
    private string _content = string.Empty;
    private int _cursorPosition = 0;

    public void Type(string text)
    {
        _content = _content.Insert(_cursorPosition, text);
        _cursorPosition += text.Length;
    }

    public EditorMemento Save() => new(_content, _cursorPosition);

    public void Restore(EditorMemento memento)
    {
        _content = memento.Content;
        _cursorPosition = memento.CursorPosition;
    }
}

public class EditorHistory
{
    private readonly Stack<EditorMemento> _history = new();
    public void Push(EditorMemento memento) => _history.Push(memento);
    public EditorMemento? Pop() => _history.Count > 0 ? _history.Pop() : null;
    public bool HasHistory => _history.Count > 0;
}`,
      highlights: [1, 9, 10, 11, 16, 17, 18, 20, 21, 22, 23, 27, 28, 29],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `class EditorMemento {
  constructor(
    public readonly content: string,
    public readonly cursorPosition: number
  ) {}
}

class TextEditor {
  private content = ''
  private cursorPosition = 0

  type(text: string): void {
    this.content =
      this.content.slice(0, this.cursorPosition) +
      text +
      this.content.slice(this.cursorPosition)
    this.cursorPosition += text.length
  }

  save(): EditorMemento {
    return new EditorMemento(this.content, this.cursorPosition)
  }

  restore(memento: EditorMemento): void {
    this.content = memento.content
    this.cursorPosition = memento.cursorPosition
  }
}

class EditorHistory {
  private history: EditorMemento[] = []

  push(memento: EditorMemento): void { this.history.push(memento) }
  pop(): EditorMemento | undefined { return this.history.pop() }
  get hasHistory(): boolean { return this.history.length > 0 }
}

// 使用
const editor = new TextEditor()
const history = new EditorHistory()
history.push(editor.save())
editor.type('Hello')
history.push(editor.save())
editor.type(' World')
editor.restore(history.pop()!) // 撤销`,
      highlights: [1, 9, 10, 11, 17, 18, 19, 22, 23, 24, 28, 29, 30],
    },
  ],
  pros: ['不破坏封装性，保存内部状态', '提供状态恢复机制', '简化发起人的职责', '符合单一职责原则'],
  cons: ['备忘录可能消耗大量内存', '管理者无法检查备忘录内容', '频繁保存状态影响性能'],
  relatedPatterns: [
    { patternId: 'command', relationType: 'combinable', description: '命令模式可用备忘录实现撤销功能' },
    { patternId: 'iterator', relationType: 'alternative', description: '迭代器遍历历史记录，备忘录保存状态' },
    { patternId: 'state', relationType: 'combinable', description: '状态变化时可使用备忘录保存之前的状态' },
  ],
  frameworkExamples: [
    { framework: 'Vue 3', description: 'Pinia 的 $subscribe 和 $patch 组合可实现状态快照和回滚' },
    { framework: 'Redux', description: 'Redux DevTools 的时间旅行调试是备忘录模式的典型应用' },
  ],
}

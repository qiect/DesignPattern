export const iterator = {
    id: 'iterator',
    name: '迭代器模式',
    nameEn: 'Iterator Pattern',
    category: 'behavioral',
    difficulty: 1,
    tags: ['行为型', '遍历', '封装集合'],
    definition: '提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示。',
    simpleExplanation: '提供统一的方式来遍历不同类型的集合，不用关心集合内部是怎么存储的。',
    lifeAnalogy: '就像电视遥控器的"下一个频道"按钮，你不需要知道频道怎么存储的，按一下就切到下一个。',
    roles: [
        { name: '迭代器', nameEn: 'Iterator', responsibility: '定义访问和遍历元素的接口', color: '#6c8cff' },
        { name: '具体迭代器', nameEn: 'ConcreteIterator', responsibility: '实现迭代器接口', color: '#00d4aa' },
        { name: '聚合', nameEn: 'Aggregate', responsibility: '定义创建迭代器的接口', color: '#ff6b35' },
        { name: '具体聚合', nameEn: 'ConcreteAggregate', responsibility: '实现创建迭代器的接口', color: '#ffd93d' },
    ],
    umlCode: `classDiagram
    class IIterator~T~ {
      <<interface>>
      +HasNext() bool
      +Next() T
      +Reset() void
    }
    class IAggregate~T~ {
      <<interface>>
      +CreateIterator() IIterator
    }
    class Bookshelf {
      -books List
      +CreateIterator() IIterator
    }
    class BookshelfIterator {
      -bookshelf Bookshelf
      -currentIndex int
      +HasNext() bool
      +Next() Book
      +Reset() void
    }
    IIterator <|.. BookshelfIterator
    IAggregate <|.. Bookshelf
    Bookshelf ..> BookshelfIterator`,
    animationSteps: [
        {
            description: '聚合对象创建迭代器',
            objects: [
                { id: 'aggregate', type: 'rect', x: 250, y: 50, width: 120, height: 50, label: 'Bookshelf', color: '#ff6b35', opacity: 1 },
                { id: 'iterator', type: 'rect', x: 250, y: 150, width: 120, height: 50, label: 'Iterator', color: '#6c8cff', opacity: 1 },
            ],
            arrows: [
                { from: 'aggregate', to: 'iterator', label: 'CreateIterator()', color: '#ff6b35', animated: true },
            ],
        },
        {
            description: '迭代器遍历集合元素',
            objects: [
                { id: 'iterator', type: 'rect', x: 50, y: 80, width: 120, height: 50, label: 'Iterator', color: '#6c8cff', opacity: 1 },
                { id: 'e1', type: 'circle', x: 230, y: 50, width: 60, height: 60, label: 'Book1', color: '#00d4aa', opacity: 1 },
                { id: 'e2', type: 'circle', x: 330, y: 50, width: 60, height: 60, label: 'Book2', color: '#00d4aa', opacity: 0.5 },
                { id: 'e3', type: 'circle', x: 430, y: 50, width: 60, height: 60, label: 'Book3', color: '#00d4aa', opacity: 0.3 },
            ],
            arrows: [
                { from: 'iterator', to: 'e1', label: 'Next()', color: '#6c8cff', animated: true },
            ],
        },
        {
            description: '继续遍历下一个元素',
            objects: [
                { id: 'iterator', type: 'rect', x: 50, y: 80, width: 120, height: 50, label: 'Iterator', color: '#6c8cff', opacity: 1 },
                { id: 'e1', type: 'circle', x: 230, y: 50, width: 60, height: 60, label: 'Book1', color: '#00d4aa', opacity: 0.5 },
                { id: 'e2', type: 'circle', x: 330, y: 50, width: 60, height: 60, label: 'Book2', color: '#00d4aa', opacity: 1 },
                { id: 'e3', type: 'circle', x: 430, y: 50, width: 60, height: 60, label: 'Book3', color: '#00d4aa', opacity: 0.3 },
            ],
            arrows: [
                { from: 'iterator', to: 'e2', label: 'Next()', color: '#6c8cff', animated: true },
            ],
        },
    ],
    scenarios: [
        { title: '书架遍历', description: '不暴露内部List结构遍历书籍', icon: 'BookOpen' },
        { title: '二叉树遍历', description: '支持中序、前序等多种遍历方式', icon: 'GitBranch' },
        { title: '播放列表', description: '支持顺序播放和随机播放', icon: 'Music' },
    ],
    codeExamples: [
        {
            language: 'csharp',
            title: 'C# 实现',
            code: `public interface IIterator<T>
{
    bool HasNext();
    T? Next();
    void Reset();
}

public interface IAggregate<T> { IIterator<T> CreateIterator(); }

public class Bookshelf : IAggregate<Book>
{
    private readonly List<Book> _books = new();
    public void AddBook(Book book) => _books.Add(book);
    public Book GetBookAt(int index) => _books[index];
    public int Count => _books.Count;
    public IIterator<Book> CreateIterator() => new BookshelfIterator(this);
}

public class BookshelfIterator : IIterator<Book>
{
    private readonly Bookshelf _bookshelf;
    private int _currentIndex = 0;

    public BookshelfIterator(Bookshelf bookshelf) { _bookshelf = bookshelf; }
    public bool HasNext() => _currentIndex < _bookshelf.Count;
    public Book? Next() => HasNext() ? _bookshelf.GetBookAt(_currentIndex++) : null;
    public void Reset() => _currentIndex = 0;
}`,
            highlights: [1, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19],
        },
        {
            language: 'typescript',
            title: 'TypeScript 实现',
            code: `interface Iterator<T> {
  hasNext(): boolean
  next(): T | null
  reset(): void
}

interface Aggregate<T> {
  createIterator(): Iterator<T>
}

class Bookshelf implements Aggregate<Book> {
  private books: Book[] = []

  addBook(book: Book): void { this.books.push(book) }
  getBookAt(index: number): Book { return this.books[index] }
  get count(): number { return this.books.length }

  createIterator(): Iterator<Book> {
    return new BookshelfIterator(this)
  }
}

class BookshelfIterator implements Iterator<Book> {
  private currentIndex = 0

  constructor(private bookshelf: Bookshelf) {}

  hasNext(): boolean { return this.currentIndex < this.bookshelf.count }

  next(): Book | null {
    return this.hasNext()
      ? this.bookshelf.getBookAt(this.currentIndex++)
      : null
  }

  reset(): void { this.currentIndex = 0 }
}

// JavaScript 内置迭代器: for...of / Symbol.iterator
// const arr = [1, 2, 3]
// for (const item of arr) { ... }`,
            highlights: [1, 8, 9, 10, 11, 16, 17, 18, 19, 20, 23, 24, 25],
        },
    ],
    pros: ['提供统一的遍历接口', '分离集合对象的遍历逻辑', '支持多种遍历方式', '符合单一职责原则'],
    cons: ['增加了类的数量', '简单遍历显得过度设计', '遍历中修改集合可能导致问题'],
    relatedPatterns: [
        { patternId: 'composite', relationType: 'combinable', description: '迭代器常用于遍历组合结构' },
        { patternId: 'visitor', relationType: 'complementary', description: '访问者可替代迭代器执行复杂操作' },
        { patternId: 'factory-method', relationType: 'complementary', description: '聚合的CreateIterator()是工厂方法' },
    ],
    frameworkExamples: [
        { framework: 'JavaScript', description: 'ES6 的 Iterator 协议和 for...of 语法是迭代器模式的语言级支持' },
        { framework: 'Java', description: 'Java 的 Iterator 接口和 for-each 语法是迭代器模式的标准实现' },
    ],
};

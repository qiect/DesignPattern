/**
 * 迭代器模式 (Iterator Pattern)
 * 
 * 定义：提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示。
 * 
 * 核心角色：
 * 1. 迭代器(Iterator) - 定义访问和遍历元素的接口
 * 2. 具体迭代器(Concrete Iterator) - 实现迭代器接口
 * 3. 聚合(Aggregate) - 定义创建迭代器对象的接口
 * 4. 具体聚合(Concrete Aggregate) - 实现创建相应迭代器对象的接口
 * 
 * 适用场景：
 * - 访问一个聚合对象的内容而不暴露它的内部表示
 * - 需要为遍历不同的聚合结构提供统一的接口
 * - 支持多种遍历方式
 * 
 * 本示例展示了三个场景：
 * 1. 书架遍历 - 基本迭代器
 * 2. 二叉树遍历 - 多种遍历方式（中序、前序）
 * 3. 播放列表 - 顺序和随机播放
 */

namespace 迭代器模式;

/// <summary>
/// 迭代器接口 - 定义遍历元素的接口
/// </summary>
/// <typeparam name="T">元素类型</typeparam>
public interface IIterator<T>
{
    /// <summary>
    /// 是否还有下一个元素
    /// </summary>
    bool HasNext();
    
    /// <summary>
    /// 获取下一个元素
    /// </summary>
    T? Next();
    
    /// <summary>
    /// 重置迭代器
    /// </summary>
    void Reset();
}

/// <summary>
/// 聚合接口 - 定义创建迭代器的接口
/// </summary>
/// <typeparam name="T">元素类型</typeparam>
public interface IAggregate<T>
{
    /// <summary>
    /// 创建迭代器
    /// </summary>
    IIterator<T> CreateIterator();
}

#region 场景1: 书架遍历

/// <summary>
/// 元素类 - 书籍
/// </summary>
public class Book
{
    public string Title { get; }
    public string Author { get; }
    
    public Book(string title, string author)
    {
        Title = title;
        Author = author;
    }
    
    public override string ToString() => $"《{Title}》- {Author}";
}

/// <summary>
/// 具体聚合 - 书架
/// 内部使用 List 存储，但不暴露给客户端
/// </summary>
public class Bookshelf : IAggregate<Book>
{
    private readonly List<Book> _books = new();
    
    public void AddBook(Book book)
    {
        _books.Add(book);
    }
    
    public Book GetBookAt(int index)
    {
        return _books[index];
    }
    
    public int Count => _books.Count;
    
    /// <summary>
    /// 创建书架迭代器
    /// </summary>
    public IIterator<Book> CreateIterator()
    {
        return new BookshelfIterator(this);
    }
}

/// <summary>
/// 具体迭代器 - 书架迭代器
/// 实现顺序遍历
/// 
/// 关键点：
/// - 持有聚合对象的引用
/// - 维护当前遍历位置
/// - 不暴露聚合对象的内部结构
/// </summary>
public class BookshelfIterator : IIterator<Book>
{
    private readonly Bookshelf _bookshelf;
    private int _currentIndex = 0;
    
    public BookshelfIterator(Bookshelf bookshelf)
    {
        _bookshelf = bookshelf;
    }
    
    public bool HasNext()
    {
        return _currentIndex < _bookshelf.Count;
    }
    
    public Book? Next()
    {
        if (HasNext())
        {
            return _bookshelf.GetBookAt(_currentIndex++);
        }
        return null;
    }
    
    public void Reset()
    {
        _currentIndex = 0;
    }
}

#endregion

#region 场景2: 二叉树遍历

/// <summary>
/// 树节点
/// </summary>
public class TreeNode<T>
{
    public T Data { get; }
    public TreeNode<T>? Left { get; set; }
    public TreeNode<T>? Right { get; set; }
    
    public TreeNode(T data)
    {
        Data = data;
    }
}

/// <summary>
/// 具体聚合 - 二叉树
/// 支持多种遍历方式
/// </summary>
public class BinaryTree<T> : IAggregate<T>
{
    public TreeNode<T>? Root { get; set; }
    
    /// <summary>
    /// 创建中序遍历迭代器
    /// </summary>
    public IIterator<T> CreateIterator()
    {
        return new InOrderIterator<T>(Root);
    }
    
    /// <summary>
    /// 创建前序遍历迭代器
    /// </summary>
    public IIterator<T> CreatePreOrderIterator()
    {
        return new PreOrderIterator<T>(Root);
    }
}

/// <summary>
/// 具体迭代器 - 中序遍历迭代器
/// 遍历顺序：左子树 -> 根节点 -> 右子树
/// </summary>
public class InOrderIterator<T> : IIterator<T>
{
    private readonly Stack<TreeNode<T>> _stack = new();
    private TreeNode<T>? _current;
    
    public InOrderIterator(TreeNode<T>? root)
    {
        _current = root;
        PushLeft(_current);
    }
    
    private void PushLeft(TreeNode<T>? node)
    {
        while (node != null)
        {
            _stack.Push(node);
            node = node.Left;
        }
    }
    
    public bool HasNext()
    {
        return _stack.Count > 0;
    }
    
    public T? Next()
    {
        if (!HasNext()) return default;
        
        var node = _stack.Pop();
        PushLeft(node.Right);
        return node.Data;
    }
    
    public void Reset()
    {
        _stack.Clear();
    }
}

/// <summary>
/// 具体迭代器 - 前序遍历迭代器
/// 遍历顺序：根节点 -> 左子树 -> 右子树
/// </summary>
public class PreOrderIterator<T> : IIterator<T>
{
    private readonly Stack<TreeNode<T>> _stack = new();
    
    public PreOrderIterator(TreeNode<T>? root)
    {
        if (root != null)
        {
            _stack.Push(root);
        }
    }
    
    public bool HasNext()
    {
        return _stack.Count > 0;
    }
    
    public T? Next()
    {
        if (!HasNext()) return default;
        
        var node = _stack.Pop();
        
        if (node.Right != null) _stack.Push(node.Right);
        if (node.Left != null) _stack.Push(node.Left);
        
        return node.Data;
    }
    
    public void Reset()
    {
        _stack.Clear();
    }
}

#endregion

#region 场景3: 播放列表

/// <summary>
/// 具体聚合 - 播放列表
/// 支持顺序播放和随机播放
/// </summary>
public class Playlist : IAggregate<string>
{
    private readonly List<string> _songs = new();
    
    public void AddSong(string song)
    {
        _songs.Add(song);
    }
    
    public int Count => _songs.Count;
    
    public string GetSongAt(int index)
    {
        return _songs[index];
    }
    
    /// <summary>
    /// 创建顺序播放迭代器
    /// </summary>
    public IIterator<string> CreateIterator()
    {
        return new PlaylistIterator(this);
    }
    
    /// <summary>
    /// 创建随机播放迭代器
    /// </summary>
    public IIterator<string> CreateShuffleIterator()
    {
        return new ShuffleIterator(this);
    }
}

/// <summary>
/// 具体迭代器 - 顺序播放迭代器
/// </summary>
public class PlaylistIterator : IIterator<string>
{
    private readonly Playlist _playlist;
    private int _currentIndex = 0;
    
    public PlaylistIterator(Playlist playlist)
    {
        _playlist = playlist;
    }
    
    public bool HasNext() => _currentIndex < _playlist.Count;
    
    public string? Next()
    {
        if (HasNext())
        {
            return _playlist.GetSongAt(_currentIndex++);
        }
        return null;
    }
    
    public void Reset() => _currentIndex = 0;
}

/// <summary>
/// 具体迭代器 - 随机播放迭代器
/// 每次重置时重新打乱顺序
/// </summary>
public class ShuffleIterator : IIterator<string>
{
    private readonly Playlist _playlist;
    private readonly List<int> _shuffledIndices;
    private int _currentIndex = 0;
    
    public ShuffleIterator(Playlist playlist)
    {
        _playlist = playlist;
        _shuffledIndices = Enumerable.Range(0, playlist.Count).ToList();
        Shuffle();
    }
    
    private void Shuffle()
    {
        var random = new Random();
        for (int i = _shuffledIndices.Count - 1; i > 0; i--)
        {
            int j = random.Next(i + 1);
            (_shuffledIndices[i], _shuffledIndices[j]) = (_shuffledIndices[j], _shuffledIndices[i]);
        }
    }
    
    public bool HasNext() => _currentIndex < _playlist.Count;
    
    public string? Next()
    {
        if (HasNext())
        {
            return _playlist.GetSongAt(_shuffledIndices[_currentIndex++]);
        }
        return null;
    }
    
    public void Reset()
    {
        _currentIndex = 0;
        Shuffle();
    }
}

#endregion

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 迭代器模式示例 ===\n");
        
        #region 场景1演示
        Console.WriteLine("场景1: 书架遍历\n");
        
        var bookshelf = new Bookshelf();
        bookshelf.AddBook(new Book("设计模式", "GoF"));
        bookshelf.AddBook(new Book("代码整洁之道", "Robert C. Martin"));
        bookshelf.AddBook(new Book("重构", "Martin Fowler"));
        bookshelf.AddBook(new Book("深入理解计算机系统", "Randal E. Bryant"));
        
        Console.WriteLine("--- 遍历书架 ---");
        var iterator = bookshelf.CreateIterator();
        while (iterator.HasNext())
        {
            var book = iterator.Next();
            Console.WriteLine(book);
        }
        #endregion
        
        Console.WriteLine("\n----------------------------------------\n");
        
        #region 场景2演示
        Console.WriteLine("场景2: 二叉树遍历\n");
        
        var tree = new BinaryTree<int>
        {
            Root = new TreeNode<int>(5)
            {
                Left = new TreeNode<int>(3)
                {
                    Left = new TreeNode<int>(1),
                    Right = new TreeNode<int>(4)
                },
                Right = new TreeNode<int>(7)
                {
                    Left = new TreeNode<int>(6),
                    Right = new TreeNode<int>(9)
                }
            }
        };
        
        Console.WriteLine("--- 中序遍历 ---");
        var inOrderIterator = tree.CreateIterator();
        while (inOrderIterator.HasNext())
        {
            Console.Write($"{inOrderIterator.Next()} ");
        }
        
        Console.WriteLine("\n\n--- 前序遍历 ---");
        var preOrderIterator = tree.CreatePreOrderIterator();
        while (preOrderIterator.HasNext())
        {
            Console.Write($"{preOrderIterator.Next()} ");
        }
        #endregion
        
        Console.WriteLine("\n\n----------------------------------------\n");
        
        #region 场景3演示
        Console.WriteLine("场景3: 播放列表\n");
        
        var playlist = new Playlist();
        playlist.AddSong("歌曲A");
        playlist.AddSong("歌曲B");
        playlist.AddSong("歌曲C");
        playlist.AddSong("歌曲D");
        
        Console.WriteLine("--- 顺序播放 ---");
        var normalIterator = playlist.CreateIterator();
        while (normalIterator.HasNext())
        {
            Console.WriteLine($"播放: {normalIterator.Next()}");
        }
        
        Console.WriteLine("\n--- 随机播放 ---");
        var shuffleIterator = playlist.CreateShuffleIterator();
        while (shuffleIterator.HasNext())
        {
            Console.WriteLine($"播放: {shuffleIterator.Next()}");
        }
        #endregion
        
        Console.WriteLine("\n迭代器模式优点:");
        Console.WriteLine("- 提供统一的遍历接口");
        Console.WriteLine("- 分离集合对象的遍历逻辑");
        Console.WriteLine("- 支持多种遍历方式");
        Console.WriteLine("- 符合单一职责原则");
    }
}

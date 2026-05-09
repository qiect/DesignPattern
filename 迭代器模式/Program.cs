namespace 迭代器模式;

public interface IIterator<T>
{
    bool HasNext();
    T? Next();
    void Reset();
}

public interface IAggregate<T>
{
    IIterator<T> CreateIterator();
}

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
    
    public IIterator<Book> CreateIterator()
    {
        return new BookshelfIterator(this);
    }
}

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

public class BinaryTree<T> : IAggregate<T>
{
    public TreeNode<T>? Root { get; set; }
    
    public IIterator<T> CreateIterator()
    {
        return new InOrderIterator<T>(Root);
    }
    
    public IIterator<T> CreatePreOrderIterator()
    {
        return new PreOrderIterator<T>(Root);
    }
}

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
    
    public IIterator<string> CreateIterator()
    {
        return new PlaylistIterator(this);
    }
    
    public IIterator<string> CreateShuffleIterator()
    {
        return new ShuffleIterator(this);
    }
}

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

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== 迭代器模式示例 ===\n");
        
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
        
        Console.WriteLine("\n----------------------------------------\n");
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
        
        Console.WriteLine("\n\n----------------------------------------\n");
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
        
        Console.WriteLine("\n迭代器模式优点:");
        Console.WriteLine("- 提供统一的遍历接口");
        Console.WriteLine("- 分离集合对象的遍历逻辑");
        Console.WriteLine("- 支持多种遍历方式");
        Console.WriteLine("- 符合单一职责原则");
    }
}

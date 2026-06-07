import type { Pattern } from '@/types/pattern'

export const abstractFactory: Pattern = {
  id: 'abstract-factory',
  name: '抽象工厂模式',
  nameEn: 'Abstract Factory Pattern',
  category: 'creational',
  difficulty: 2,
  tags: ['创建型', '产品族', '一致性'],
  definition: '提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。',
  simpleExplanation: '一个工厂可以创建一整套相关的产品，保证这些产品风格一致、互相搭配。',
  lifeAnalogy: '就像装修，你选了北欧风格，工厂就会给你配套的北欧风家具：沙发、茶几、书架，保证风格统一。',
  roles: [
    { name: '抽象工厂', nameEn: 'AbstractFactory', responsibility: '声明创建一系列产品的方法', color: '#ff6b35' },
    { name: '具体工厂', nameEn: 'ConcreteFactory', responsibility: '实现创建具体产品族的方法', color: '#ffd93d' },
    { name: '抽象产品', nameEn: 'AbstractProduct', responsibility: '定义产品的公共接口', color: '#6c8cff' },
    { name: '具体产品', nameEn: 'ConcreteProduct', responsibility: '实现抽象产品接口，属于特定产品族', color: '#00d4aa' },
  ],
  umlCode: `classDiagram
    class IGUIFactory {
      <<interface>>
      +CreateButton() IButton
      +CreateTextBox() ITextBox
      +CreateCheckBox() ICheckBox
    }
    class WindowsFactory {
      +CreateButton() IButton
      +CreateTextBox() ITextBox
      +CreateCheckBox() ICheckBox
    }
    class MacFactory {
      +CreateButton() IButton
      +CreateTextBox() ITextBox
      +CreateCheckBox() ICheckBox
    }
    IGUIFactory <|.. WindowsFactory
    IGUIFactory <|.. MacFactory
    WindowsFactory ..> WindowsButton : creates
    WindowsFactory ..> WindowsTextBox : creates
    MacFactory ..> MacButton : creates
    MacFactory ..> MacTextBox : creates`,
  animationSteps: [
    {
      description: '客户端选择一个具体工厂',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'factory', type: 'diamond', x: 280, y: 80, width: 140, height: 60, label: 'IGUIFactory', color: '#ff6b35', opacity: 1 },
        { id: 'win', type: 'rect', x: 200, y: 200, width: 120, height: 40, label: 'WindowsFactory', color: '#ffd93d', opacity: 0.5 },
        { id: 'mac', type: 'rect', x: 380, y: 200, width: 120, height: 40, label: 'MacFactory', color: '#00d4aa', opacity: 0.5 },
      ],
      arrows: [
        { from: 'client', to: 'factory', label: '选择工厂', color: '#6c8cff', animated: true },
      ],
    },
    {
      description: '使用Windows工厂创建产品族',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'win', type: 'rect', x: 280, y: 80, width: 140, height: 50, label: 'WindowsFactory', color: '#ffd93d', opacity: 1 },
        { id: 'btn', type: 'rect', x: 180, y: 200, width: 100, height: 40, label: 'WinButton', color: '#ffd93d', opacity: 1 },
        { id: 'txt', type: 'rect', x: 320, y: 200, width: 100, height: 40, label: 'WinTextBox', color: '#ffd93d', opacity: 1 },
        { id: 'chk', type: 'rect', x: 460, y: 200, width: 100, height: 40, label: 'WinCheckBox', color: '#ffd93d', opacity: 1 },
      ],
      arrows: [
        { from: 'win', to: 'btn', label: 'CreateButton()', color: '#ffd93d', animated: true },
        { from: 'win', to: 'txt', label: 'CreateTextBox()', color: '#ffd93d', animated: true },
        { from: 'win', to: 'chk', label: 'CreateCheckBox()', color: '#ffd93d', animated: true },
      ],
    },
    {
      description: '切换到Mac工厂，创建不同风格的产品族',
      objects: [
        { id: 'client', type: 'rect', x: 50, y: 80, width: 100, height: 50, label: 'Client', color: '#6c8cff', opacity: 1 },
        { id: 'mac', type: 'rect', x: 280, y: 80, width: 140, height: 50, label: 'MacFactory', color: '#00d4aa', opacity: 1 },
        { id: 'btn', type: 'rect', x: 180, y: 200, width: 100, height: 40, label: 'MacButton', color: '#00d4aa', opacity: 1 },
        { id: 'txt', type: 'rect', x: 320, y: 200, width: 100, height: 40, label: 'MacTextBox', color: '#00d4aa', opacity: 1 },
        { id: 'chk', type: 'rect', x: 460, y: 200, width: 100, height: 40, label: 'MacCheckBox', color: '#00d4aa', opacity: 1 },
      ],
      arrows: [
        { from: 'mac', to: 'btn', label: 'CreateButton()', color: '#00d4aa', animated: true },
        { from: 'mac', to: 'txt', label: 'CreateTextBox()', color: '#00d4aa', animated: true },
        { from: 'mac', to: 'chk', label: 'CreateCheckBox()', color: '#00d4aa', animated: true },
      ],
    },
  ],
  scenarios: [
    { title: '跨平台UI组件库', description: '不同平台创建风格一致的UI组件', icon: 'Monitor' },
    { title: '数据库访问层', description: '不同数据库创建对应的连接、命令、适配器', icon: 'Database' },
    { title: '主题切换', description: '亮色/暗色主题创建配套的配色方案', icon: 'Palette' },
  ],
  codeExamples: [
    {
      language: 'csharp',
      title: 'C# 实现',
      code: `public interface IButton { void Render(); string GetStyle(); }
public interface ITextBox { void Render(); string GetStyle(); }
public interface ICheckBox { void Render(); string GetStyle(); }

public class WindowsButton : IButton {
    public void Render() => Console.WriteLine("渲染 Windows 风格按钮");
    public string GetStyle() => "Windows";
}
public class MacButton : IButton {
    public void Render() => Console.WriteLine("渲染 Mac 风格按钮");
    public string GetStyle() => "Mac";
}

public interface IGUIFactory {
    IButton CreateButton();
    ITextBox CreateTextBox();
    ICheckBox CreateCheckBox();
}

public class WindowsFactory : IGUIFactory {
    public IButton CreateButton() => new WindowsButton();
    public ITextBox CreateTextBox() => new WindowsTextBox();
    public ICheckBox CreateCheckBox() => new WindowsCheckBox();
}

public class MacFactory : IGUIFactory {
    public IButton CreateButton() => new MacButton();
    public ITextBox CreateTextBox() => new MacTextBox();
    public ICheckBox CreateCheckBox() => new MacCheckBox();
}`,
      highlights: [1, 12, 16, 20, 26, 31],
    },
    {
      language: 'typescript',
      title: 'TypeScript 实现',
      code: `interface Button { render(): void; getStyle(): string }
interface TextBox { render(): void; getStyle(): string }
interface CheckBox { render(): void; getStyle(): string }

class WindowsButton implements Button {
  render(): void { console.log('渲染 Windows 风格按钮') }
  getStyle(): string { return 'Windows' }
}
class MacButton implements Button {
  render(): void { console.log('渲染 Mac 风格按钮') }
  getStyle(): string { return 'Mac' }
}

interface GUIFactory {
  createButton(): Button
  createTextBox(): TextBox
  createCheckBox(): CheckBox
}

class WindowsFactory implements GUIFactory {
  createButton(): Button { return new WindowsButton() }
  createTextBox(): TextBox { return new WindowsTextBox() }
  createCheckBox(): CheckBox { return new WindowsCheckBox() }
}

class MacFactory implements GUIFactory {
  createButton(): Button { return new MacButton() }
  createTextBox(): TextBox { return new MacTextBox() }
  createCheckBox(): CheckBox { return new MacCheckBox() }
}`,
      highlights: [1, 12, 16, 22, 28],
    },
  ],
  pros: ['保证产品族的一致性', '客户端与具体产品解耦', '符合开闭原则', '易于切换产品族'],
  cons: ['增加新的产品类型需要修改所有工厂类', '增加了系统的抽象性和复杂度', '产品族扩展困难'],
  relatedPatterns: [
    { patternId: 'factory-method', relationType: 'complementary', description: '抽象工厂常使用工厂方法来实现产品创建' },
    { patternId: 'singleton', relationType: 'combinable', description: '具体工厂通常设计为单例' },
    { patternId: 'builder', relationType: 'alternative', description: '建造者关注分步构建，抽象工厂关注产品族一致性' },
  ],
  frameworkExamples: [
    { framework: 'React', description: 'styled-components 的 ThemeProvider 提供整套主题配置' },
    { framework: 'Java', description: 'java.sql.Connection 是抽象工厂，创建 Statement、PreparedStatement 等' },
  ],
}

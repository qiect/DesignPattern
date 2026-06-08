# GoF 23 种设计模式 - 交互式学习平台

基于 Vue 3 + TypeScript + Vite 构建的设计模式交互式学习网站，涵盖 GoF 23 种经典设计模式的动画演示、代码对比和实际场景分析。

## 功能特性

- **三大类模式分类** — 创建型、结构型、行为型，按目的清晰分类
- **交互式动画演示** — 每种模式配备步骤动画，直观理解对象间的协作流程
- **UML 类图** — Mermaid 驱动的类图展示，一目了然模式结构
- **代码实现对比** — C# / TypeScript 双语言实现，高亮关键代码行
- **模式对比** — 任意两种模式并排对比，快速区分异同
- **浅色/深色主题** — 支持手动切换和跟随时间自动切换（6:00-18:00 浅色，18:00-6:00 深色）
- **响应式布局** — 适配桌面端和移动端

## 技术栈

- **框架**: Vue 3 (Composition API + `<script setup>`)
- **语言**: TypeScript
- **构建**: Vite
- **样式**: Tailwind CSS
- **状态管理**: Pinia
- **路由**: Vue Router
- **代码高亮**: Shiki
- **UML 图表**: Mermaid
- **图标**: Lucide Icons
- **字体**: Outfit / Noto Sans SC / JetBrains Mono

## 项目结构

```
src/
├── components/
│   ├── animation/      # 动画演示组件
│   ├── code/           # 代码展示组件
│   ├── common/         # 通用组件（卡片、标签等）
│   ├── diagram/        # UML 图表组件
│   └── layout/         # 布局组件（头部、侧边栏）
├── composables/        # 组合式函数（主题切换等）
├── data/
│   ├── patterns/       # 23 种设计模式数据
│   ├── categories.ts   # 分类定义
│   ├── index.ts        # 数据导出
│   └── relations.ts    # 模式关系
├── pages/              # 页面组件
├── router/             # 路由配置
└── types/              # TypeScript 类型定义
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npx vue-tsc -b

# 构建生产版本
npm run build
```

## 主题切换

网站支持三种主题模式：

- **深色模式** — 默认深色背景
- **浅色模式** — 亮色背景
- **跟随时间** — 根据当前时间自动切换（6:00-18:00 浅色，18:00-6:00 深色）

主题偏好会持久化到 localStorage，页面加载前通过内联脚本初始化，避免闪烁。

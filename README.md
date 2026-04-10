# 开发规范

## 技术栈

- 前端: React 19 + TypeScript
- 样式: Tailwind CSS v4
- UI 组件: shadcn/ui `import { Button } from "@/components/ui/button";`
- 图标: lucide-react `import { SearchIcon } from "lucide-react";`
- 图表: recharts `import { LineChart } from "recharts";`
- 动画: framer-motion `import { motion } from "framer-motion";`
- 路由: react-router-dom `import { Link, useNavigate } from "react-router-dom";`

---

## 项目结构

```
client/src/
├── app.tsx              # 路由注册
├── index.css            # 全局样式 + 主题变量
├── components/          # 基础 UI 组件（禁止存放业务组件）
│   └── ui/              # shadcn/ui 内置组件（勿手动修改）
├── pages/               # 页面模块（每个页面一个目录）
│   └── HomePage/        # 占位示例页，开发时替换为业务首页
│       ├── HomePage.tsx        # 页面入口文件与目录同名
│       └── components/         # 页面专属组件
├── hooks/               # 自定义 Hooks
└── lib/                 # 工具函数（cn() 等）
```

---

## 页面与组件规范

**页面文件只做骨架编排，不包含具体 UI 实现。**

```tsx
// client/src/pages/DashboardPage/DashboardPage.tsx
import { StatsSection } from "./components/stats-section";
import { DataTableSection } from "./components/data-table-section";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <StatsSection />
      <DataTableSection />
    </div>
  );
}
```

**规则：**

- 每个视觉上独立的区块拆为一个组件文件，即使只出现一次
- 单个组件文件不超过 **150 行**，超出时进一步拆分子组件
- 页面专属组件放在 `pages/<page>/components/`
- `client/src/components/` 仅存放基础 UI 组件（如 shadcn/ui），**禁止存放业务组件**
- 文件名 kebab-case（`stat-card.tsx`），组件名 PascalCase（`StatCard`）
- 组件之间**禁止循环引用**

### Section 独立性（并行开发规范）

每个 Section 级组件（如 `StatsSection`、`DataTableSection`）必须做到**完全自包含**：

**1. 页面文件 = 纯布局组合器**

- 页面入口文件（如 `DashboardPage.tsx`）只做 import + JSX 排列，**禁止包含** `useState`、`useEffect`、数据请求或业务逻辑
- 页面文件无 props 接口定义，不承担任何数据协调职责

**2. Section 自包含原则**

每个 Section 组件独立拥有自己的：
- **数据获取**（API 调用、fetch）— 即使多个 Section 需要同一份数据，各自获取
- **状态管理**（useState、useReducer）
- **类型定义**（写在同文件或同目录下的 `types.ts`）
- **子组件**（如需拆分，平铺在 `components/` 目录下，禁止嵌套子目录）

**3. 禁止 Section 间横向依赖**

- 兄弟 Section 之间**禁止互相 import**
- 兄弟 Section 之间**禁止通过 Context、全局 store、事件总线、页面 props 共享状态**
- 每个 Section 可独立开发、独立测试，不依赖其他 Section 的存在

---

## 路由注册

新增页面在 `client/src/app.tsx` 中注册。

> ⚠️ **首页路由替换（必做）**
>
> 模板默认的 `HomePage` 是占位示例页，**不是业务首页**。开发时必须将 `index` 路由替换为真实的业务首页组件（如 `DashboardPage`），并删除 `HomePage` 目录。

**替换后的路由示例：**

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import DashboardPage from "@/pages/DashboardPage/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

declare const __APP_BASE_PATH__: string;

export default function App() {
  return (
    <BrowserRouter basename={__APP_BASE_PATH__}>
      <Routes>
        <Route element={<Layout />}>
          {/* 将 index 路由指向真实的业务首页 */}
          <Route index element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**新增页面步骤：**

1. 在 `client/src/pages/` 下新建页面目录（如 `SettingsPage`）和 `SettingsPage.tsx`
2. 在 `app.tsx` 的 `<Routes>` 内添加 `<Route>` 配置

**路由跳转必须使用 react-router-dom：**

- 组件内跳转：`<Link to="/dashboard">Dashboard</Link>`
- 编程式跳转：`const navigate = useNavigate(); navigate("/dashboard");`
- **禁止使用** `<a href="/">` 或 `window.location` 进行页面内跳转

---

## 样式与主题

### 主题变量

主题色定义在 `client/src/index.css` 中，通过 `:root` CSS 变量 + `@theme inline` 注册到 Tailwind。

**语义化颜色对照：**

| 用途 | Tailwind 类 | CSS 变量 |
|------|------------|----------|
| 页面背景 | `bg-background` | `--background` |
| 主文本 | `text-foreground` | `--foreground` |
| 卡片背景 | `bg-card` | `--card` |
| 次要文本 | `text-muted-foreground` | `--muted-foreground` |
| 主色 | `bg-primary` / `text-primary` | `--primary` |
| 强调色 | `bg-accent` | `--accent` |
| 边框 | `border-border` | `--border` |
| 危险色 | `text-destructive` | `--destructive` |
| 成功色 | `text-success-foreground` | `--success-foreground` |
| 警告色 | `text-warning-foreground` | `--warning-foreground` |
| 图表色 | `bg-chart-1` ~ `bg-chart-5` | `--chart-1` ~ `--chart-5` |

**颜色使用规则：**

- 主题色（背景、文本、主色、边框等）**必须使用语义化变量类**
- 灰阶辅助色（细节装饰、次要分隔线）可使用 Tailwind 原生色（如 `text-gray-500`）
- 类名合并使用 `cn()`：`import { cn } from "@/lib/utils"`

### 主题增量修改规范

修改主题时，**只覆盖需要变更的变量**：

```css
/* 正确：仅修改需要的变量 */
:root {
  --primary: hsl(150, 60%, 40%);
  --primary-foreground: hsl(0, 0%, 100%);
}

/* 禁止：复制整个 :root 块后修改 */
```

- 新增自定义颜色变量时，必须同时在 `:root` 和 `@theme inline` 中注册
- 禁止直接修改 `@theme inline` 中已有的 `--color-*` 映射关系
- 禁止删除已有的主题变量（可能被 shadcn/ui 组件依赖）

---

## 布局与交互

### 响应式布局

- 容器使用 `max-w-*` + `mx-auto` 居中，禁止内容在大屏贴边延伸
- 多列布局使用 `grid` + 断点类：`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- flex 子元素设置 `min-w-0`，多元素横排时加 `flex-wrap`
- 禁止固定像素宽度作为主容器（如 `w-[720px]`）

### 内容自适应

- 区块高度由内容撑开，禁止固定 `h-` 值（图表容器除外）
- 图片：`max-w-full h-auto`
- 长文本：`break-words`
- 单行截断：`truncate`
- 表格/代码块：`overflow-x-auto`

### 交互规范

- 所有交互元素（按钮、链接、标签页等）必须有**实际交互逻辑**和**可见反馈**
- 禁止空函数（`onClick={() => {}}`）或仅 `console.log` 的响应
- 禁止 `href="#"` 占位链接、无内容切换的标签页、空下拉菜单
- 禁止"导出"、"分享"等无法真正执行的操作按钮
- 如功能暂未实现，**删除该入口**，不实现假按钮

---

## 自检清单

| 检查项 | 验收标准 |
|--------|---------|
| 页面拆分 | 页面文件只做骨架编排（无 state/effect/逻辑）；每个 Section 自包含数据+状态+类型；兄弟 Section 间无互相 import；单文件 ≤150 行 |
| 命名规范 | 文件名 kebab-case，组件名 PascalCase |
| 路由注册 | 默认 `HomePage` 已替换为业务首页；新页面已在 `app.tsx` 注册；跳转使用 `<Link>` / `useNavigate()`，无 `<a href>` |
| 主题色 | 使用语义化变量类（`bg-background`、`text-primary` 等）；未硬编码颜色值 |
| 主题修改 | 仅增量覆盖变更的变量；新增色同时注册 `:root` 和 `@theme inline` |
| 响应式 | 容器 `max-w-*` + `mx-auto`；多列布局窄屏退化单列；flex 有 `min-w-0` |
| 内容自适应 | 无固定 `h-`（图表除外）；长文本 `break-words`；表格 `overflow-x-auto` |
| 交互完整性 | 所有按钮/链接有实际处理器和可见反馈；无空响应、无假按钮 |

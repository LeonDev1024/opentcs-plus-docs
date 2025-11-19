# OpenTCS Plus 文档

OpenTCS Plus 项目文档网站，基于 VitePress 构建。

## 项目简介

OpenTCS Plus 是基于 OpenTCS 核心思想构建的企业级 AGV 调度系统。在保留 OpenTCS 稳定调度内核的同时，提供了更现代化的架构、更友好的用户界面和更强大的功能扩展。

## 项目结构

```
opentcs-plus-docs/
├── .vitepress/           # VitePress 配置
│   ├── cache/            # 缓存
│   └── config.ts         # 配置文件
├── src/                  # 文档源代码
│   ├── development/      # 开发文档
│   │   ├── backend.md    # 后端文档
│   │   └── frontend.md   # 前端文档
│   ├── index.md          # 首页
│   ├── overview/         # 概述文档
│   │   ├── about.md      # 关于
│   │   ├── overview.md   # 概述
│   │   └── why.md        # 为什么选择
│   └── quickstart/       # 快速开始
│      └── start.md       # 开始指南
├── LICENSE               # 许可证
├── package.json          # 项目依赖文件
└── README.md             # 项目说明文档
```

## 🔗 源码仓库

| 平台 | 仓库地址 |
|------|---------|
| GitHub | [后端工程](https://github.com/LeonDev1024/opentcs-plus) \| [前端工程](https://github.com/LeonDev1024/opentcs-plus-web) \| [文档工程](https://github.com/LeonDev1024/opentcs-plus-docs) |

## 快速开始

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 运行文档工程

```bash
# 使用 pnpm
pnpm run docs:dev

# 或使用 npm
npm run docs:dev
```

文档将在 `http://localhost:5173` 启动。

### 构建文档工程

```bash
# 使用 pnpm
pnpm run docs:build

# 或使用 npm
npm run docs:build
```

构建产物在 `.vitepress/dist` 目录。

### 预览构建结果

```bash
# 使用 pnpm
pnpm run docs:preview

# 或使用 npm
npm run docs:preview
```

## 技术栈

- **VitePress** - 基于 Vite 的静态站点生成器
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

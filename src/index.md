---
layout: home

hero:
  name: OpenTCSPlus
  text: 企业级AMR调度系统
  tagline: 基于 OpenTCS 核心思想构建，提供更现代化的架构、更友好的用户界面和更强大的功能扩展
  image:
    src: /logo.png
    alt: OpenTCS Plus
  actions:
    - theme: brand
      text: 快速开始
      link: /quickstart/start
    - theme: alt
      text: 项目概述
      link: /overview/overview

features:
  - icon: 🚀
    title: 现代化架构
    details: 采用 Spring Boot + Vue3 技术栈，提供高性能、可扩展的系统架构
  - icon: 🎯
    title: 稳定调度内核
    details: 保留 OpenTCS 稳定的调度内核，确保系统可靠性和稳定性
  - icon: 🎨
    title: 友好用户界面
    details: 基于 Vue3 + TypeScript + Vite + Element Plus 构建的现代化前端界面
  - icon: 🔧
    title: 强大功能扩展
    details: 提供丰富的模块化功能，支持灵活的定制和扩展
  - icon: 📊
    title: 实时监控
    details: 提供完善的监控和报表功能，实时掌握系统运行状态
  - icon: 🔌
    title: 设备驱动
    details: 支持多种通信协议，灵活适配不同类型的 AGV 设备
---

## 项目简介

OpenTCS Plus 是基于 OpenTCS 核心思想构建的企业级 AGV 调度系统。在保留 OpenTCS 稳定调度内核的同时，提供了更现代化的架构、更友好的用户界面和更强大的功能扩展。

## 核心特性

### 🏗️ 模块化架构

系统采用模块化设计，包含以下核心模块：

- **opentcs-admin** - 系统管理后台
- **opentcs-common** - 通用工具和基础组件
- **opentcs-module-system** - 系统管理模块（用户、权限、配置）
- **opentcs-module-map** - 地图管理模块
- **opentcs-module-vehicles** - 车辆管理模块
- **opentcs-module-task** - 订单任务模块
- **opentcs-module-algorithm** - 算法模块（路径规划、任务分配）
- **opentcs-module-driver** - 车辆驱动模块
- **opentcs-module-job** - Job 任务管理模块
- **opentcs-module-monitor** - 监控模块

### 🎯 技术栈

**后端技术：**
- Spring Boot
- Spring Security
- MyBatis Plus
- MySQL / PostgreSQL
- Redis

**前端技术：**
- Vue 3
- TypeScript
- Vite
- Pinia
- Element Plus

### 📦 源码仓库

| 平台 | 仓库地址 |
|------|---------|
| GitHub | [后端工程](https://github.com/LeonDev1024/opentcs-plus) \| [前端工程](https://github.com/LeonDev1024/opentcs-plus-web) |

## 快速开始

```bash
# 克隆后端项目
git clone https://github.com/LeonDev1024/opentcs-plus.git

# 克隆前端项目
git clone https://github.com/LeonDev1024/opentcs-plus-web.git
```

更多详细信息请查看 [快速开始指南](/quickstart/start)。

## 许可证

本项目采用 [MIT 许可证](https://github.com/LeonDev1024/opentcs-plus/blob/master/LICENSE)。


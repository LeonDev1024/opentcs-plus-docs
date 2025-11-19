# 快速开始

本指南将帮助您快速搭建和运行 OpenTCS Plus 项目。

## 环境要求

### 后端环境

- **JDK**: 17 或更高版本
- **Maven**: 3.6 或更高版本
- **MySQL**: 8.0 或更高版本（或 PostgreSQL 12+）
- **Redis**: 6.0 或更高版本

### 前端环境

- **Node.js**: 18.0 或更高版本
- **pnpm**: 8.0 或更高版本（推荐）或 npm 9.0+

## 项目结构

```
opentcs-plus/
├── opentcs-admin/          # 系统管理后台
├── opentcs-common/         # 通用工具和基础组件
├── opentcs-module-system/  # 系统管理模块
├── opentcs-module-map/     # 地图管理模块
├── opentcs-module-vehicles/# 车辆管理模块
├── opentcs-module-task/    # 订单任务模块
├── opentcs-module-algorithm/# 算法模块
├── opentcs-module-driver/  # 车辆驱动模块
├── opentcs-module-job/     # Job任务管理模块
└── opentcs-module-monitor/ # 监控模块

opentcs-plus-web/           # 前端项目
├── src/
│   ├── api/               # API 接口
│   ├── components/        # 组件
│   ├── views/             # 页面
│   ├── router/            # 路由
│   └── store/             # 状态管理
└── package.json
```

## 后端部署

### 1. 克隆项目

```bash
git clone https://github.com/LeonDev1024/opentcs-plus.git
cd opentcs-plus
```

### 2. 数据库配置

创建数据库：

```sql
CREATE DATABASE opentcs_plus DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

修改配置文件 `opentcs-admin/src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/opentcs_plus?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  redis:
    host: localhost
    port: 6379
    password: your_redis_password
    database: 0
```

### 3. 初始化数据库

执行数据库初始化脚本（如果项目提供了 SQL 脚本）：

```bash
mysql -u root -p opentcs_plus < sql/init.sql
```

### 4. 编译项目

```bash
mvn clean install -DskipTests
```

### 5. 运行项目

```bash
cd opentcs-admin
mvn spring-boot:run
```

或者直接运行打包后的 jar 文件：

```bash
java -jar opentcs-admin/target/opentcs-admin.jar
```

### 6. 验证部署

访问 `http://localhost:8080`，如果看到系统界面，说明后端部署成功。

默认管理员账号：
- 用户名: `admin`
- 密码: `admin123`（请首次登录后修改）

## 前端部署

### 1. 克隆项目

```bash
git clone https://github.com/LeonDev1024/opentcs-plus-web.git
cd opentcs-plus-web
```

### 2. 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 3. 配置 API 地址

修改 `.env.development` 文件：

```env
VITE_API_BASE_URL=http://localhost:8080
```

### 4. 启动开发服务器

```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev
```

### 5. 构建生产版本

```bash
# 使用 pnpm
pnpm build

# 或使用 npm
npm run build
```

构建产物在 `dist` 目录，可以部署到 Nginx 或其他 Web 服务器。

### 6. 验证部署

访问 `http://localhost:5173`（开发环境），如果看到登录页面，说明前端部署成功。

## Docker 部署（可选）

### 后端 Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY opentcs-admin/target/opentcs-admin.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

构建和运行：

```bash
docker build -t opentcs-plus:latest .
docker run -d -p 8080:8080 --name opentcs-plus opentcs-plus:latest
```

### 前端 Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
docker build -t opentcs-plus-web:latest .
docker run -d -p 80:80 --name opentcs-plus-web opentcs-plus-web:latest
```

## 常见问题

### 1. 数据库连接失败

- 检查数据库服务是否启动
- 检查数据库用户名和密码是否正确
- 检查数据库地址和端口是否正确

### 2. Redis 连接失败

- 检查 Redis 服务是否启动
- 检查 Redis 密码是否正确
- 检查 Redis 地址和端口是否正确

### 3. 前端无法访问后端 API

- 检查后端服务是否启动
- 检查前端配置的 API 地址是否正确
- 检查是否存在跨域问题（需要在后端配置 CORS）

### 4. 端口被占用

- 修改 `application.yml` 中的端口配置
- 或停止占用端口的进程

## 下一步

- 查看 [后端开发文档](/development/backend) 了解后端开发
- 查看 [前端开发文档](/development/frontend) 了解前端开发
- 查看 [项目概述](/overview/overview) 了解系统架构

## 获取帮助

如果遇到问题，可以通过以下方式获取帮助：

- 提交 [GitHub Issue](https://github.com/LeonDev1024/opentcs-plus/issues)
- 查看项目文档
- 联系项目维护者


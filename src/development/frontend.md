# 前端开发文档

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 下一代前端构建工具
- **Pinia** - 状态管理库
- **Element Plus** - 组件库
- **Vue Router** - 路由管理
- **Axios** - HTTP 客户端

## 项目结构

```
opentcs-plus-web/
├── src/
│   ├── api/                 # API 接口
│   │   ├── user.ts         # 用户相关接口
│   │   ├── map.ts          # 地图相关接口
│   │   └── vehicle.ts      # 车辆相关接口
│   ├── assets/             # 静态资源
│   │   ├── images/         # 图片
│   │   └── styles/         # 样式文件
│   ├── components/         # 公共组件
│   │   ├── common/         # 通用组件
│   │   └── business/       # 业务组件
│   ├── views/              # 页面组件
│   │   ├── system/         # 系统管理
│   │   ├── map/            # 地图管理
│   │   ├── vehicle/        # 车辆管理
│   │   └── task/           # 任务管理
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── store/              # 状态管理
│   │   ├── user.ts         # 用户状态
│   │   └── app.ts          # 应用状态
│   ├── utils/              # 工具函数
│   │   ├── request.ts      # 请求封装
│   │   └── auth.ts         # 认证工具
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── public/                 # 公共文件
├── .env.development        # 开发环境配置
├── .env.production         # 生产环境配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目配置
```

## 开发规范

### 文件命名规范

- 组件文件: `PascalCase.vue` (如 `UserList.vue`)
- 工具文件: `camelCase.ts` (如 `request.ts`)
- 常量文件: `UPPER_SNAKE_CASE.ts` (如 `API_CONSTANTS.ts`)

### 代码规范

1. **组件结构**
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 脚本内容
</script>

<style scoped>
/* 样式内容 */
</style>
```

2. **TypeScript 类型定义**
```typescript
// 接口定义
interface User {
  id: number
  name: string
  email: string
}

// 类型别名
type UserStatus = 'active' | 'inactive' | 'disabled'
```

## 核心功能开发

### 1. API 接口封装

```typescript
// src/api/user.ts
import request from '@/utils/request'

export interface User {
  id: number
  name: string
  email: string
  status: number
}

export interface UserListParams {
  keyword?: string
  page: number
  pageSize: number
}

export const getUserList = (params: UserListParams) => {
  return request.get<{ list: User[], total: number }>('/api/system/user/list', { params })
}

export const createUser = (data: Partial<User>) => {
  return request.post('/api/system/user/create', data)
}

export const updateUser = (id: number, data: Partial<User>) => {
  return request.put(`/api/system/user/${id}`, data)
}

export const deleteUser = (id: number) => {
  return request.delete(`/api/system/user/${id}`)
}
```

### 2. 请求封装

```typescript
// src/utils/request.ts
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './auth'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { code, data, message } = response.data
    if (code === 200) {
      return data
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default request
```

### 3. 状态管理

```typescript
// src/store/user.ts
import { defineStore } from 'pinia'
import { getUserInfo, login, logout } from '@/api/user'

export interface UserState {
  token: string
  userInfo: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    userInfo: null
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  
  actions: {
    async login(username: string, password: string) {
      const { token } = await login({ username, password })
      this.token = token
      localStorage.setItem('token', token)
      await this.getUserInfo()
    },
    
    async getUserInfo() {
      const userInfo = await getUserInfo()
      this.userInfo = userInfo
    },
    
    async logout() {
      await logout()
      this.token = ''
      this.userInfo = null
      localStorage.removeItem('token')
    }
  }
})
```

### 4. 路由配置

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue')
      },
      {
        path: 'system/user',
        name: 'UserList',
        component: () => import('@/views/system/user/UserList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth !== false && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
```

### 5. 页面组件示例

```vue
<!-- src/views/system/user/UserList.vue -->
<template>
  <div class="user-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-button type="primary" @click="handleCreate">新增用户</el-button>
        </div>
      </template>
      
      <el-table :data="userList" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="loadData"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, deleteUser } from '@/api/user'
import type { User } from '@/api/user'

const userList = ref<User[]>([])
const loading = ref(false)
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

const loadData = async () => {
  loading.value = true
  try {
    const { list, total } = await getUserList({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    })
    userList.value = list
    pagination.value.total = total
  } catch (error) {
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  // 打开创建对话框
}

const handleEdit = (row: User) => {
  // 打开编辑对话框
}

const handleDelete = async (row: User) => {
  try {
    await ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
      type: 'warning'
    })
    await deleteUser(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.user-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

## 环境配置

### 开发环境

```env
# .env.development
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=OpenTCS Plus
```

### 生产环境

```env
# .env.production
VITE_API_BASE_URL=https://api.opentcs-plus.com
VITE_APP_TITLE=OpenTCS Plus
```

## 构建和部署

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 更多资源

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://cn.vitejs.dev/)
- [Element Plus 官方文档](https://element-plus.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)


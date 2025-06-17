# Homebrew Search

一个基于 Nuxt.js 的现代前端应用程序，用于快速搜索的 Homebrew 包（ Cask 和 Formula ）。

## 🚀 特性

- **即时搜索**：支持关键词匹配的高速模糊搜索
- **详细信息**：展示 Cask 和 Formula 的完整元数据
- **交互设计**：暗黑模式支持 & 响应式布局
- **RESTful API**：基于 TypeScript 构建的后端数据接口
- **自动化更新**：每 10 分钟自动同步最新软件包数据

## 🧰 技术栈

| 类别 | 技术选型                      |
| ---- | ----------------------------- |
| 框架 | [Nuxt 3](https://nuxtjs.org/) |
| 搜索 | [Fuse.js](https://fusejs.io/) |
| CSS  | Tailwind CSS                  |
| 存储 | Nitro Storage KV 缓存         |

## 🛠️ 开发环境要求

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产环境
npm run build

# 本地预览生产环境
npm run preview
```

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证

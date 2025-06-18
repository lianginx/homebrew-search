# Homebrew Search

可能是最易用的 Homebrew Cask/Formula 在线搜索工具，提供简洁美观的界面与快速精准的搜索体验。

![brew](https://github.com/user-attachments/assets/8275615e-736a-4511-91d8-eb1dadb9bc21)

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

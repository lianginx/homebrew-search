# Homebrew Search

可能是最易用的 Homebrew Cask/Formula 快速搜索工具，界面简洁美观，支持深色模式与响应式布局。

![brew](https://github.com/user-attachments/assets/6adc612d-66ed-4381-a9e1-dbacb238fdfe)

## 🚀 特性

- 🔍 实时搜索：支持关键词模糊匹配，响应迅速
- 📦 快捷翻译：点击软件包描述即可快捷翻译为中文
- 🎨 美观界面：深色模式、自适应布局，适配桌面与移动端
- 🔧 高效实用：支持 URL Query 快速查询，一键复制安装命令
- 🔄 数据同步：每 10 分钟自动同步最新 Homebrew 数据

## 🔗 URL 查询技巧

支持通过 URL 参数实现快速搜索，便于结合第三方启动器（如 Raycast、Alfred、LaunchBar）或浏览器书签实现快速查询。

通过 `?q=` 参数传入关键词，即可直接定位搜索内容。例如：

```
https://brew.in-x.cc?q=docker
```

访问该链接将直接跳转并展示包含关键词 “docker” 的搜索结果。

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

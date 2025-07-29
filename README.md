# Kotoba Vault (Local) - 纯本地日语单词卡片学习应用

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PWA](https://img.shields.io/badge/PWA-enabled-green.svg)
![Offline](https://img.shields.io/badge/offline-ready-orange.svg)
![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)

> **🇯🇵 专为日语学习者设计的纯本地单词卡片应用**

一个完全本地化的日语单词卡片学习应用，**无需网络、无需账户、数据100%私有**。采用现代 PWA 技术，提供媲美原生应用的学习体验。

[🌟 **在线演示**](http://localhost:5175/) | [📖 **使用指南**](./USAGE.md) | [🇺🇸 **English**](./README_EN.md)

## ✨ 核心特性

### 🔒 隐私保护
- **100% 本地存储**: 所有数据存储在浏览器 IndexedDB 中，永不上传
- **无需注册**: 不需要任何账户或登录
- **完全离线**: 支持完全离线使用，保护学习隐私

### 📱 PWA 体验
- **可安装应用**: 支持安装到桌面和手机主屏幕
- **原生体验**: 独立窗口运行，无浏览器界面干扰
- **快速启动**: 瞬间加载，媲美原生应用性能

### � 学习功能
- **3D 卡片翻转**: 流畅的翻转动画，模拟真实卡片
- **日语语音播放**: 内置 TTS 发音，支持单词和例句朗读
- **智能洗牌**: 随机化学习顺序，避免记忆位置
- **学习进度**: 实时显示当前进度和剩余卡片数量
- **振假名支持**: 完美显示 Ruby 注音，帮助读音学习

### 🎨 用户体验
- **深色模式**: 支持明暗主题切换，保护眼睛
- **响应式设计**: 完美适配手机、平板、桌面各种设备
- **流畅动画**: 精心设计的过渡效果，提升使用体验
- **专业字体**: 使用 Google Fonts 的 Noto Sans JP/SC 字体

### � 数据管理
- **Markdown 导入**: 支持标准 Markdown 格式的卡片数据
- **批量管理**: 支持多个卡片组的创建和管理
- **数据导出**: 一键导出所有数据，支持备份和迁移
- **安全删除**: 防误删设计，确认后才能删除卡片组

## 🚀 快速开始

### 方式一：在线使用（推荐）

1. **访问应用**
   ```
   http://localhost:5175/  (开发版本)
   http://localhost:4173/  (生产版本)
   ```

2. **上传卡片组**
   - 点击上传区域或直接拖拽 `.md` 文件
   - 系统自动解析并保存到本地数据库
   - 支持的文件：项目中的 `単語３.md` 可作为测试文件

3. **开始学习**
   - 在主页点击任意卡片组的"开始学习"按钮
   - 享受沉浸式的学习体验

### 方式二：安装为桌面应用（最佳体验）

#### 在 Chrome/Edge 浏览器中安装：
1. 访问应用网址
2. 在地址栏右侧找到 **"安装"** 图标 📥
3. 点击安装，选择"安装"确认
4. 应用将添加到：
   - **Windows**: 开始菜单和桌面
   - **macOS**: 应用程序文件夹和 Dock
   - **Linux**: 应用程序菜单

#### 在手机浏览器中安装：
1. 用手机浏览器打开应用
2. **iOS Safari**: 点击分享按钮 → "添加到主屏幕"
3. **Android Chrome**: 点击菜单 → "添加到主屏幕"

### 方式三：本地开发运行

```bash
# 1. 克隆或下载项目
cd kotoba-vault

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 在浏览器中访问
open http://localhost:5175
```

## 📖 详细使用说明

### 🎮 学习界面操作

#### 卡片交互
- **查看答案**: 点击卡片正面或"显示答案"按钮
- **语音播放**: 点击 🔊 图标听取日语发音
- **卡片导航**: 使用"上一个"/"下一个"按钮切换卡片

#### 学习控制
- **重新洗牌**: 点击 🔀 按钮随机打乱卡片顺序
- **进度查看**: 右上角显示当前进度（如 "5 / 20"）
- **主题切换**: 点击 🌙/☀️ 切换明暗模式
- **返回主页**: 点击 🏠 或"结束学习"按钮

#### 快捷键支持
- **空格键**: 翻转卡片（显示/隐藏答案）
- **左右箭头**: 切换上一个/下一个卡片
- **ESC键**: 返回主页

### 📁 数据管理

#### 上传卡片组
1. **支持格式**: `.md` (Markdown) 文件
2. **上传方式**: 
   - 点击上传区域选择文件
   - 直接拖拽文件到上传区域
3. **文件要求**: 必须符合指定的 Markdown 格式

#### 管理卡片组
- **查看详情**: 每个卡片组显示卡片数量和创建时间
- **删除卡片组**: 点击 🗑️ 图标，确认后删除
- **数据导出**: 点击主页的"📤 导出"按钮备份所有数据

#### 数据导出与备份
1. 在主页点击"📤 导出"按钮
2. 系统生成 JSON 格式的备份文件
3. 文件命名格式：`kotoba-vault-backup-YYYY-MM-DD.json`
4. 可保存到云盘或其他设备作为备份

## 📁 支持的文件格式

### Markdown 文件结构

应用支持特定格式的 Markdown 文件，以下是完整的格式说明：

```markdown
# 第三课 形容词

---

## 厚かましい（あつかましい）
### 含义
1. 厚脸皮；不害羞；无耻
2. 放肆；无礼

### 例句
1. <ruby>厚<rt>あつ</rt></ruby>かましいにも<ruby>程<rt>ほど</rt></ruby>がある／竟无耻到这般地步
2. <ruby>厚<rt>あつ</rt></ruby>かましくもまた<ruby>金<rt>かね</rt></ruby>を<ruby>借<rt>か</rt></ruby>りにきた／居然还腆着脸又来借钱

---

## 慌しい（あわただしい）
### 含义
1. 慌忙的；匆忙的
2. 不稳定的；动荡不安的

### 例句
1. <ruby>慌<rt>あわ</rt></ruby>ただしく<ruby>旅立<rt>たびだ</rt></ruby>つ／匆忙起程
2. <ruby>政局<rt>せいきょく</rt></ruby>が<ruby>慌<rt>あわ</rt></ruby>ただしい／政局动荡不安
```

### 格式要求详解

| 元素 | 格式 | 说明 | 示例 |
|------|------|------|------|
| **课程标题** | `# 标题` | 定义卡片组名称，显示在主页 | `# 第三课 形容词` |
| **单词条目** | `## 单词（读音）` | 单词和其读音，括号内为平假名 | `## 厚かましい（あつかましい）` |
| **含义部分** | `### 含义` | 单词的中文含义列表 | 见上方示例 |
| **例句部分** | `### 例句` | 带中文翻译的例句 | 见上方示例 |
| **振假名** | `<ruby>字<rt>音</rt></ruby>` | 汉字上方的注音 | `<ruby>厚<rt>あつ</rt></ruby>` |
| **翻译分隔** | `／` | 日语和中文之间的分隔符 | `日语例句／中文翻译` |
| **条目分隔** | `---` | 不同单词之间的分隔线 | 每个单词后添加 |

### 文件制作建议

1. **统一格式**: 严格按照上述格式编写，确保解析成功
2. **编码格式**: 使用 UTF-8 编码保存文件
3. **文件命名**: 建议使用有意义的名称，如 `N1词汇-第一课.md`
4. **振假名**: 对于生僻汉字建议添加 Ruby 注音
5. **例句长度**: 建议每个例句不超过 30 字，便于在卡片上显示

### 示例文件

项目中包含 `単語３.md` 作为完整示例，您可以：
- 直接使用该文件测试应用功能
- 参考其格式制作自己的词汇文件
- 复制其结构创建新的课程内容

## 🛠 开发说明

### 环境要求

- **Node.js**: 18.0+ 或更高版本
- **包管理器**: npm、pnpm 或 yarn
- **浏览器**: 支持 PWA 的现代浏览器

### 本地开发流程

```bash
# 1. 克隆项目
git clone <repository-url>
cd kotoba-vault

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# 访问 http://localhost:5173

# 4. 构建生产版本
npm run build

# 5. 预览生产版本
npm run preview
# 访问 http://localhost:4173
```

### 项目脚本说明

| 命令 | 功能 | 用途 |
|------|------|------|
| `npm run dev` | 启动开发服务器 | 开发时使用，支持热重载 |
| `npm run build` | 构建生产版本 | 生成优化后的生产文件 |
| `npm run preview` | 预览生产版本 | 本地测试生产版本性能 |
| `npm run check` | 类型检查 | 检查 TypeScript 类型错误 |
| `./start-demo.sh` | 演示脚本 | 一键启动演示环境 |

### 自定义配置

#### PWA 配置
编辑 `vite.config.ts` 中的 PWA 设置：
```typescript
SvelteKitPWA({
  manifest: {
    name: '您的应用名称',
    short_name: '短名称',
    description: '应用描述',
    theme_color: '#您的主题色',
    // ... 其他配置
  }
})
```

#### 主题定制
修改 `src/app.css` 中的 CSS 变量：
```css
:root {
  --accent-color: #3498db;  /* 主色调 */
  --bg-color: #f4f7f9;      /* 背景色 */
  /* ... 其他颜色变量 */
}
```

## 🏗 技术架构

### 核心技术栈

- **前端框架**: [SvelteKit](https://kit.svelte.dev/) - 现代全栈框架
- **开发语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全
- **PWA 支持**: [@vite-pwa/sveltekit](https://vite-pwa-org.netlify.app/frameworks/sveltekit.html) - PWA 功能
- **数据存储**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) + [Dexie.js](https://dexie.org/) - 本地数据库
- **构建工具**: [Vite](https://vitejs.dev/) - 快速构建
- **样式方案**: 纯 CSS + CSS 变量 - 轻量级样式

### 项目结构

```
kotoba-vault/
├── src/
│   ├── lib/
│   │   ├── components/          # Svelte 组件
│   │   │   ├── DashboardHeader.svelte
│   │   │   ├── FileUpload.svelte
│   │   │   ├── DeckList.svelte
│   │   │   ├── FlashCard.svelte
│   │   │   ├── StudyHeader.svelte
│   │   │   └── StudyNavigation.svelte
│   │   ├── db.ts               # 数据库操作
│   │   └── parser.ts           # Markdown 解析
│   ├── routes/
│   │   ├── +layout.svelte      # 全局布局
│   │   ├── +page.svelte        # 主页
│   │   └── study/[id]/         # 学习页面路由
│   │       ├── +page.ts        # 页面数据加载
│   │       └── +page.svelte    # 学习页面
│   ├── app.html                # HTML 模板
│   └── app.css                 # 全局样式
├── static/                     # 静态资源
│   ├── icon-192.png
│   ├── icon-512.png
│   └── manifest.webmanifest
├── vite.config.ts              # Vite 配置
├── package.json                # 项目配置
└── README.md                   # 说明文档
```

### 数据流架构

```
用户操作 → Svelte 组件 → 数据服务层 → IndexedDB
    ↑                                        ↓
UI 更新 ← 响应式状态 ← 数据处理 ← 数据查询结果
```

### PWA 功能实现

1. **Service Worker**: 自动缓存应用资源，支持离线访问
2. **Web App Manifest**: 定义应用元数据，支持安装到设备
3. **响应式设计**: 适配各种设备尺寸
4. **本地存储**: 使用 IndexedDB 存储所有用户数据

## 📱 浏览器兼容性

### 完全支持
- ✅ **Chrome 80+** - 完整功能支持
- ✅ **Edge 80+** - 完整功能支持  
- ✅ **Firefox 75+** - 完整功能支持
- ✅ **Safari 13+** - 完整功能支持

### 功能限制
- ⚠️ **Safari < 13**: 不支持 PWA 安装
- ⚠️ **Firefox < 75**: 语音合成功能受限
- ❌ **IE 浏览器**: 不支持

### 移动端支持
- ✅ **iOS Safari 13+**: 支持添加到主屏幕
- ✅ **Android Chrome 80+**: 完整 PWA 支持
- ✅ **Android Firefox 75+**: 基本功能支持

## 🔧 卸载说明

### 从浏览器卸载
1. **Chrome/Edge**: 
   - 进入 `chrome://apps/` 或 `edge://apps/`
   - 右键点击 "Kotoba Vault"
   - 选择"从 Chrome 中移除"

2. **Firefox**:
   - 进入设置 → 隐私与安全 → 通知
   - 找到应用域名并删除权限

### 从设备卸载
1. **Windows**: 
   - 开始菜单中找到应用，右键选择"卸载"
   - 或在设置 → 应用中搜索并卸载

2. **macOS**: 
   - 从应用程序文件夹中删除
   - 或从 Dock 中移除

3. **移动设备**: 
   - 长按应用图标选择删除/卸载

### 清理数据
卸载应用后，浏览器中的数据会保留。如需完全清理：

1. **Chrome/Edge**:
   ```
   设置 → 隐私和安全 → 网站设置 → 查看所有网站和应用权限
   → 找到应用域名 → 清除数据
   ```

2. **Firefox**:
   ```
   设置 → 隐私与安全 → Cookie 和网站数据 → 管理数据
   → 搜索域名 → 移除选定项
   ```

3. **Safari**:
   ```
   偏好设置 → 隐私 → 管理网站数据
   → 搜索域名 → 移除
   ```

## 🎯 使用场景

### 👨‍🎓 日语学习者
- **词汇积累**: 系统化学习和记忆日语单词
- **考试准备**: N1-N5 各级别词汇复习
- **读音练习**: 通过振假名和语音功能掌握正确发音
- **例句学习**: 在实际语境中学习单词用法

### 👨‍🏫 教育工作者
- **课件制作**: 快速制作交互式词汇卡片
- **教学辅助**: 课堂上展示和讲解词汇
- **作业布置**: 学生可离线完成词汇学习任务
- **进度跟踪**: 了解学生学习情况

### 📚 个人学习
- **知识管理**: 整理和复习个人词汇笔记
- **移动学习**: 随时随地进行碎片化学习
- **长期记忆**: 通过重复练习加强记忆
- **自定义内容**: 根据个人需求制作专属卡片

## 🔍 故障排除

### 常见问题

#### 📁 文件上传问题
**问题**: 文件上传失败或解析错误
**解决方案**:
1. 确保文件格式为 `.md` (Markdown)
2. 检查文件编码为 UTF-8
3. 验证文件内容符合指定格式
4. 查看浏览器开发者工具的错误信息

#### 🔊 语音播放问题
**问题**: 点击语音图标无反应
**解决方案**:
1. 确保浏览器支持 Web Speech API
2. 检查设备音量和浏览器音量设置
3. 某些浏览器需要用户交互后才能播放音频
4. 在 HTTPS 环境下使用以获得最佳兼容性

#### 💾 数据丢失问题
**问题**: 重新打开应用后数据不见了
**解决方案**:
1. 检查是否在隐私/无痕模式下使用
2. 确认浏览器数据没有被清理软件删除
3. 建议定期使用"导出"功能备份数据
4. 避免在多个浏览器间切换使用

#### 📱 PWA 安装问题
**问题**: 浏览器没有显示安装提示
**解决方案**:
1. 确保使用支持 PWA 的浏览器
2. 需要通过 HTTPS 访问应用
3. 某些浏览器需要多次访问后才显示安装选项
4. 可以手动添加到主屏幕（移动端）

### 性能优化建议

1. **卡片数量**: 建议单个卡片组不超过 100 张卡片
2. **图片内容**: 避免在 Markdown 中使用大量图片
3. **浏览器缓存**: 定期清理浏览器缓存以获得最佳性能
4. **设备存储**: 确保设备有足够的存储空间

## 🤝 贡献指南

我们欢迎任何形式的贡献！

### 🐛 报告问题
- 在 [Issues](../../issues) 页面创建新问题
- 详细描述问题现象和复现步骤
- 提供浏览器版本和操作系统信息
- 如有可能，提供错误截图

### 💡 功能建议
- 在 [Issues](../../issues) 页面提交功能请求
- 描述新功能的使用场景和预期效果
- 讨论实现方案的可行性

### 🛠 代码贡献
1. Fork 项目到您的 GitHub 账户
2. 创建功能分支: `git checkout -b feature/your-feature`
3. 提交更改: `git commit -am 'Add some feature'`
4. 推送到分支: `git push origin feature/your-feature`
5. 创建 Pull Request

### 📝 文档贡献
- 改进 README 和使用说明
- 添加多语言支持
- 完善 API 文档

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

```
MIT License

Copyright (c) 2025 Kotoba Vault

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 致谢

- [SvelteKit](https://kit.svelte.dev/) - 优秀的全栈框架
- [Dexie.js](https://dexie.org/) - 简化 IndexedDB 操作
- [Google Fonts](https://fonts.google.com/) - 提供优质的日文字体
- [Vite PWA](https://vite-pwa-org.netlify.app/) - PWA 功能支持
- 所有测试和反馈的用户们

## 📞 联系方式

- **项目地址**: [GitHub Repository](../../)
- **问题反馈**: [Issues](../../issues)
- **功能讨论**: [Discussions](../../discussions)

---

<div align="center">

**🎌 享受您的日语学习之旅！**

Made with ❤️ for Japanese learners worldwide

[⬆ 回到顶部](#kotoba-vault-local---纯本地日语单词卡片学习应用)

</div>

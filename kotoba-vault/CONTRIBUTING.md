# Contributing to Kotoba Vault (Local)

感谢您对 Kotoba Vault (Local) 项目的关注！我们欢迎任何形式的贡献。

## 贡献方式

### 🐛 问题反馈
- 通过 GitHub Issues 报告 bug
- 提供详细的问题描述和重现步骤
- 包含浏览器版本和操作系统信息

### 💡 功能建议
- 通过 GitHub Issues 提出新功能建议
- 详细描述功能需求和使用场景
- 考虑功能的可行性和用户价值

### 🛠️ 代码贡献
- Fork 项目仓库
- 创建功能分支：`git checkout -b feature/amazing-feature`
- 提交更改：`git commit -m '添加了惊人的功能'`
- 推送到分支：`git push origin feature/amazing-feature`
- 创建 Pull Request

### 📝 文档改进
- 修正文档中的错误或不清楚的地方
- 添加更多使用示例
- 改进安装和使用说明

### 🌐 国际化
- 添加新语言的界面翻译
- 改进现有翻译的准确性
- 本地化文档和说明

## 开发环境设置

### 前置要求
- Node.js 18+
- npm 或 yarn
- Git

### 克隆仓库
```bash
git clone https://github.com/yourusername/kotoba-vault.git
cd kotoba-vault
```

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 代码规范

### TypeScript
- 使用 TypeScript 进行类型安全
- 遵循项目现有的类型定义风格
- 为新功能添加适当的类型注解

### Svelte 组件
- 使用组合式 API 风格
- 保持组件单一职责
- 适当添加注释说明复杂逻辑

### CSS 样式
- 使用 CSS 自定义属性（变量）
- 遵循 BEM 命名规范
- 支持深色模式

### 代码格式
- 使用 2 空格缩进
- 使用分号结尾
- 使用单引号
- 遵循 ESLint 配置

## 提交规范

使用语义化提交信息：

- `feat:` 新功能
- `fix:` 错误修复
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建工具或辅助工具

示例：
```
feat: 添加夜间模式切换功能
fix: 修复卡片翻转动画问题
docs: 更新安装说明
```

## Pull Request 指南

### 提交前检查
- [ ] 代码通过 TypeScript 检查
- [ ] 功能在不同浏览器中测试通过
- [ ] 添加了必要的文档
- [ ] 遵循项目代码规范

### PR 描述模板
```markdown
## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 重构
- [ ] 其他

## 变更描述
简要描述此次变更的内容和原因。

## 测试
描述如何测试此次变更。

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 功能经过测试
- [ ] 文档已更新
- [ ] 变更日志已更新（如需要）
```

## 技术架构

### 核心技术栈
- **前端框架**: SvelteKit
- **语言**: TypeScript
- **构建工具**: Vite
- **数据库**: IndexedDB (Dexie.js)
- **PWA**: @vite-pwa/sveltekit

### 项目结构
```
src/
├── lib/
│   ├── components/    # 可复用组件
│   ├── db.ts         # 数据库服务
│   └── parser.ts     # Markdown 解析器
├── routes/           # 页面路由
└── app.html         # HTML 模板
```

### 关键组件
- `FlashCard`: 核心学习卡片组件
- `DeckList`: 卡组管理界面
- `FileUpload`: 文件导入组件
- `StudyNavigation`: 学习导航

## 测试

### 手动测试
- 测试文件上传功能
- 验证卡片学习流程
- 检查 PWA 安装功能
- 确认离线工作模式
- 测试数据导出功能

### 浏览器测试
- Chrome/Edge (主要支持)
- Firefox (核心功能)
- Safari (核心功能)
- 移动端浏览器

## 发布流程

1. 更新版本号（package.json）
2. 更新 CHANGELOG.md
3. 创建发布标签
4. 生产构建测试
5. 发布到主分支

## 联系方式

如有任何问题或建议，请通过以下方式联系：

- GitHub Issues: 项目问题讨论
- GitHub Discussions: 功能讨论和交流
- Email: [项目邮箱]

## 行为准则

请遵循友善、包容、尊重的原则：

- 尊重不同观点和经验
- 接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

## 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下分发。

---

再次感谢您的贡献！🎌

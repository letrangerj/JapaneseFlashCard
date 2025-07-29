#!/bin/bash

# Kotoba Vault (Local) 演示脚本
# 这个脚本将启动应用并提供完整的功能演示

echo "🎉 欢迎使用 Kotoba Vault (Local)!"
echo "======================================"
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    echo "请运行: cd /home/wulong/JapaneseFlashCard/kotoba-vault"
    exit 1
fi

echo "📋 项目信息:"
echo "  - 名称: Kotoba Vault (Local)"
echo "  - 类型: PWA 日语学习应用"
echo "  - 技术: SvelteKit + TypeScript + IndexedDB"
echo ""

echo "🔧 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

echo "✅ 依赖检查完成"
echo ""

echo "🚀 启动开发服务器..."
echo "  - 开发服务器将在后台启动"
echo "  - 访问地址: http://localhost:5173 (或其他端口)"
echo ""

echo "📖 使用说明:"
echo "  1. 上传测试文件 '単語３.md'"
echo "  2. 点击 '开始学习' 体验卡片功能"
echo "  3. 测试语音播放、主题切换等功能"
echo "  4. 尝试导出数据功能"
echo ""

echo "🎯 核心功能清单:"
echo "  ✅ 文件上传和解析"
echo "  ✅ 卡片翻转学习"
echo "  ✅ 日语语音播放"
echo "  ✅ 进度跟踪"
echo "  ✅ 深色模式"
echo "  ✅ PWA 离线功能"
echo "  ✅ 数据导入导出"
echo ""

echo "🎨 PWA 特性:"
echo "  - 可安装到桌面/主屏幕"
echo "  - 完全离线工作"
echo "  - 数据100%本地存储"
echo ""

echo "按 Ctrl+C 停止服务器"
echo "======================================"
echo ""

# 启动开发服务器
npm run dev

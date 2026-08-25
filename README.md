# CTF-BTFly 宣传站

这是一个零构建、零外部依赖的响应式静态站，可直接部署到 GitHub Pages、Cloudflare Pages、Netlify、Vercel 或任意对象存储/静态服务器。

## 本地预览

在项目根目录运行：

~~~powershell
python -m http.server 4173 --directory site
~~~

然后打开 `http://127.0.0.1:4173/`。

也可以直接双击 `index.html`，但通过本地 HTTP 服务预览更接近实际部署环境。

## 部署

把 `site/` 目录中的全部内容作为站点根目录上传。无需执行 npm、Go 或 Wails 构建。

- 首页：`index.html`
- 样式：`styles.css`
- 交互：`app.js`
- 产品与主题图片：`assets/`
- 15 套主题交互展厅：`themes/`
- `.nojekyll`：避免 GitHub Pages 对目录做 Jekyll 处理

## 素材安全

首页引用的产品截图均为虚拟任务和占位数据，不包含真实任务名称、工作区路径、令牌、密钥或服务器地址。发布新截图前，请继续按这一标准检查：

1. 隐藏真实任务名、Flag、题目附件名和本机路径。
2. 隐藏 API Key、Cookie、Token、MCP 地址及授权标识。
3. 优先使用专门构造的演示数据；必须使用真实截图时，再进行不可逆打码并复查。
4. 检查图片元数据以及截图边缘、模态框背景中的残留信息。

## 内容维护

近期功能入口集中在 `index.html#new`；功能文案或版本能力变化时，应同步更新统计数字、安全说明和工具矩阵。主题预览源自项目的 UI 预览页面，视觉规范与桌面端一致。

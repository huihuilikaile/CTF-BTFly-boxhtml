# CTF-BTFly 官网（静态站）

面向 CTF-BTFly 2.9.5 的产品介绍站，可直接部署到任意静态托管平台的零构建站点，不依赖 Node.js、CDN 或后端服务。

## 页面结构

| 文件 | 角色 |
| --- | --- |
| `index.html` | 首页：版本定位、三大能力、2.9.5 新增摘要、授权与问答引导、获取渠道 |
| `features.html` | 功能全景：能力总览、启动与做题流程、四种协作模式、五路工具体系、版本对比、安全边界、2.8–2.9 新增 |
| `license.html` | 授权与激活：四步激活（购买取开通码 → 复制设备码 → 授权助手生成 `.ctflic` → 导入软件）、30 天续期、激活界面示意、授权管理、导入失败对照、授权边界 |
| `faq.html` | 常见问题：购买与授权 / 安装启动 / 模型 / 沙箱与工具 / 在线更新 / 数据与隐私六组 27 条，每条带锚点 |
| `themes/index.html` | 15 套 UI 配色预览（独立页面集，样式由 `themes/preview.css` 提供） |

共享资源：`styles.css`（全站唯一样式表）、`app.js`（导航当前页态、移动菜单、灯箱、FAQ 展开）、`assets/`（图标与产品截图）。

## 本地预览

在仓库根目录运行：

```powershell
python -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。请从根目录启动，`themes/` 与 `assets/` 的所有引用都是相对路径。

## 部署

将本目录内的全部文件上传到静态站点根目录，确保 `index.html` 与 `assets/`、`themes/` 位于同一级。`.nojekyll` 供 GitHub Pages 使用，避免 `_` 开头资源被忽略。

## 导航片段唯一来源

站点没有模板引擎，5 个页面各自内联了一份 `<header>`。**修改导航时必须同步全部 5 处**：

- `index.html`、`features.html`、`license.html`、`faq.html` 使用以仓库根为基准的相对路径；
- `themes/index.html` 中的同一份片段统一加 `../` 前缀（样式表、图标、页面链接），且「配色主题」这一项指向自身的 `index.html`。这两点是唯一允许的差异；
- 当前页高亮不在 HTML 里写死，而由 `app.js` 依据 `<body data-page="…">` 自动为对应 `data-nav` 链接添加 `aria-current="page"`。

自查（应输出 5 个相同哈希；已把 `../` 前缀与主题页自链接归一化）：

```powershell
"index.html","features.html","license.html","faq.html","themes/index.html" | ForEach-Object {
  $b = Get-Content $_ -Raw
  $null = $b -match '(?s)(<header class="site-header".*?</header>)'
  $n = ($matches[1] -replace '\.\./','' -replace 'aria-current="page"','' -replace '<a href="index.html" data-nav="themes">','<a href="themes/index.html" data-nav="themes">') -replace '\s+',' '
  "{0}  {1}" -f $n.Trim().GetHashCode(), $_
}
```

导航条目固定为五项：首页 / 功能 / 授权激活 / 常见问题 / 配色主题。

## 内容口径

- 当前最新版按 `2.9.5` 展示，对应 Windows x64 便携版；带构建号的内部迭代版本（如 `2.9.5.3`）不上站。
- `1.3.1` 为开源版，具备基本功能，不含镜像一键导入和黑板模式。
- 历史 Docker 版用于迁移对照；当前 Windows 原生版不依赖 Docker Desktop 或 WSL。
- 新增能力描述必须以软件仓库 `docs/` 的可核实文档为依据，不写未经验证的承诺。

## 授权内容边界

`license.html` 只描述**使用者侧**流程：购买取得一次性开通码 → 复制本机设备码 → 在授权助手注册并生成 30 天 `.ctflic` → 导入软件，以及之后的续期、更换、删除与失败排查。

管理侧的工具链（签发器、私钥、License Manager、授权门户的部署与配置）**不得出现在本站任何页面**：它们既不服务网站访客，也会暴露内部信任链结构。授权来源只表述为「授权助手自助生成」，不谈后端如何签发。

购买信息只写渠道，**不贴店铺链接、不写价格**：页面统一写「在官方店铺购买授权商品，店铺入口可在 QQ 群获取」。

站点同样不出现：真实设备码、许可证 ID、本机绝对路径、授权助手下载直链、更新服务器地址。

## 图片安全

`assets/v279-*.png` 等产品截图取自 **2.7.9 实机运行界面**（原分辨率），本机路径、历史数量等敏感信息经过不透明遮盖处理，不包含许可证、模型密钥或真实题目内容。2.9.5 尚未重拍截图，因此页面图注不标版本号，页脚统一注明截图来源版本；补充 2.9.5 截图时请沿用同一脱敏标准。

## 待补项

以下内容需要先确认最终对外域名，避免写入会引发错误的地址：

- `og:image`、`og:url`、`rel="canonical"` 的绝对 URL（当前仅有 `og:type/title/description` 与 `twitter:card`）。
  生产站目前由 Netlify 项目 `ctf-btfly-box` 托管（形如 `ctf-btfly-box.netlify.app`）。若后续接入自定义域名，
  canonical 必须同步改为最终域名，否则会把自定义域名的收录权重让给 Netlify 子域，因此这里不做硬编码。
- `robots.txt`、`sitemap.xml`（同样依赖最终域名）
- 未被任何页面引用的历史截图清理（约 7.9 MB）

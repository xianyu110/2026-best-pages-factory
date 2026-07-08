# 2026 AI Tools Pages Factory

一个可发布到 GitHub Pages 的静态 SEO 榜单站样板。它演示如何把 `2026 best AI tools`、AI 产品对比、替代品关键词、公开可核对的产品资料、评分规则和页面模板组合起来，批量生成高质量榜单页。

## 它做什么

- 从 `data/pages.json` 读取关键词、产品、评分和 FAQ。
- 生成首页、分类榜单页、`sitemap.xml`、`robots.txt`。
- 输出到 `docs/`，可直接用 GitHub Pages 发布。
- 不抓取别人的正文，不复制竞品文章，只使用结构化事实字段和自己的评价模板。

## 本地使用

```bash
npm run build
npm run serve
```

然后打开：

```text
http://localhost:8787/
```

## 添加新的榜单页

编辑 `data/pages.json`，新增一个对象：

```json
{
  "slug": "best-ai-video-generators-2026",
  "keyword": "2026 best AI video generators",
  "title": "Best AI Video Generators in 2026",
  "description": "A practical shortlist for creators and growth teams.",
  "audience": "Creators, marketers, and solo founders",
  "updated": "2026-07-08",
  "products": [
    {
      "name": "Example Tool",
      "url": "https://example.com",
      "price": "Free trial, paid plans",
      "bestFor": "Short-form video testing",
      "score": 8.7,
      "features": ["Prompt-to-video", "Templates", "Exports"],
      "pros": ["Fast workflow", "Clear pricing"],
      "cons": ["Limited free tier"]
    }
  ],
  "faqs": [
    {
      "question": "What should I check before choosing a tool?",
      "answer": "Start with output quality, pricing, export rights, and update cadence."
    }
  ]
}
```

重新运行：

```bash
npm run build
```

## GitHub Pages 发布方式

仓库推到 GitHub 后，在仓库设置里选择：

```text
Settings -> Pages -> Build and deployment -> Deploy from a branch
Branch: main
Folder: /docs
```

如果安装了 GitHub CLI，也可以用：

```bash
gh repo edit --enable-pages
```

再在网页端确认 Pages source 为 `main / docs`。

## 内容质量原则

这个项目刻意避免“抓竞品文章再改写”的低质路线。更稳的流程是：

1. 用 SERP API 做关键词和页面结构研究。
2. 只提取产品名、官网、价格、功能、适合人群等可核对字段。
3. 用自己的评分规则、对比表、选择建议和 FAQ 生成页面。
4. 定期更新价格、可用性和失效链接。

这样更接近可长期运营的 AI 工具程序化 SEO，而不是短期垃圾站。

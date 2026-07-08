const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const docsDir = path.join(root, "docs");
const assetsDir = path.join(docsDir, "assets");
const dataPath = path.join(root, "data", "pages.json");
const pages = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const site = {
  name: "2026 Best Pages Factory",
  description: "A GitHub Pages-ready static demo for generating high-quality 2026 best xxx SEO listicle pages.",
  baseUrl: process.env.SITE_URL || "https://xianyu110.github.io/2026-best-pages-factory"
};

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugUrl(slug) {
  return `${site.baseUrl}/${slug}/`;
}

function layout({ title, description, body, canonical, schema, depth = 0 }) {
  const schemaBlock = schema
    ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    : "";
  const prefix = depth > 0 ? "../".repeat(depth) : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}styles.css">
  ${schemaBlock}
</head>
<body>
${body}
</body>
</html>`;
}

function header(active = "", depth = 0) {
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  const homeHref = prefix || "./";
  return `<header class="site-header">
  <a class="brand" href="${homeHref}" aria-label="${escapeHtml(site.name)} home">
    <span class="brand-mark">26</span>
    <span>${escapeHtml(site.name)}</span>
  </a>
  <nav>
    <a href="${homeHref}" class="${active === "home" ? "active" : ""}">Factory</a>
    <a href="${prefix}best-ai-video-generators-2026/" class="${active.includes("video") ? "active" : ""}">AI video</a>
    <a href="${prefix}best-keyword-research-tools-2026/" class="${active.includes("keyword") ? "active" : ""}">Keyword tools</a>
  </nav>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <p>Built as a static GitHub Pages demo. Research structure, product facts, scoring notes, and generated pages live in the repository.</p>
  <p>No article scraping, no copied rankings, no hidden tracking.</p>
</footer>`;
}

function pageCard(page) {
  const topProducts = page.products.slice(0, 3).map((product) => escapeHtml(product.name)).join(", ");
  return `<article class="page-card">
    <div>
      <p class="label">${escapeHtml(page.keyword)}</p>
      <h3><a href="${escapeHtml(page.slug)}/">${escapeHtml(page.title)}</a></h3>
      <p>${escapeHtml(page.description)}</p>
    </div>
    <dl>
      <div><dt>Intent</dt><dd>${escapeHtml(page.intent)}</dd></div>
      <div><dt>Audience</dt><dd>${escapeHtml(page.audience)}</dd></div>
      <div><dt>Sample tools</dt><dd>${topProducts}</dd></div>
    </dl>
  </article>`;
}

function renderHome() {
  const body = `${header("home")}
<main>
  <section class="hero">
    <div class="hero-copy">
      <h1>Generate useful 2026 “best xxx” pages from structured research.</h1>
      <p>Turn keyword intent, SERP notes, product facts, scoring criteria, and FAQs into GitHub Pages-ready static pages. The system is built for reviewable content, not thin AI rewrites.</p>
      <div class="actions">
        <a class="button primary" href="#pages">View generated pages</a>
        <a class="button" href="https://github.com/xianyu110/2026-best-pages-factory">GitHub repo</a>
      </div>
    </div>
    <div class="workflow" aria-label="SEO page generation workflow">
      <div class="workflow-row complete"><span>1</span><strong>Keywords</strong><em>2026 best AI video generators</em></div>
      <div class="workflow-row complete"><span>2</span><strong>SERP research</strong><em>titles, intent, gaps, questions</em></div>
      <div class="workflow-row complete"><span>3</span><strong>Structured data</strong><em>products, scores, features, FAQs</em></div>
      <div class="workflow-row active"><span>4</span><strong>Generated pages</strong><em>HTML, sitemap, robots</em></div>
      <div class="workflow-row"><span>5</span><strong>GitHub Pages ready</strong><em>publish docs/ from main</em></div>
    </div>
  </section>

  <section class="section grid-two">
    <div>
      <h2>What gets generated</h2>
      <p>Every page uses a consistent structure: clear search intent, editorial criteria, comparison table, product notes, decision guidance, FAQ schema, and canonical URLs.</p>
    </div>
    <div class="quality-list">
      <div><strong>Facts first</strong><span>Product URLs, pricing notes, features, and suitability are stored as data.</span></div>
      <div><strong>Own criteria</strong><span>Scores are explained through workflow fit, clarity, export readiness, and maintenance.</span></div>
      <div><strong>Static output</strong><span>The final site is plain HTML/CSS with sitemap and robots files.</span></div>
    </div>
  </section>

  <section class="section grid-two concept-grid">
    <div>
      <h2>Visual direction</h2>
      <p>The project is intentionally framed as an operator workbench: compact pipeline, reviewable records, and generated outputs. This avoids a thin content-farm feel and makes each page easier to audit before publishing.</p>
    </div>
    <figure class="concept-image">
      <img src="assets/factory-concept.png" alt="Concept mockup of the 2026 Best Pages Factory workflow UI">
    </figure>
  </section>

  <section class="section" id="pages">
    <div class="section-heading">
      <h2>Generated sample pages</h2>
      <p>These are starter examples. Add more records in <code>data/pages.json</code> and run <code>npm run build</code>.</p>
    </div>
    <div class="page-grid">
      ${pages.map(pageCard).join("\n")}
    </div>
  </section>

  <section class="section process">
    <h2>Operator workflow</h2>
    <ol>
      <li><strong>Research keywords.</strong> Find patterns like <code>2026 best {category}</code>, <code>{tool} alternatives</code>, and <code>{tool A} vs {tool B}</code>.</li>
      <li><strong>Collect facts.</strong> Use official pages and reliable public sources for pricing, product positioning, and features.</li>
      <li><strong>Write criteria.</strong> Decide why the list exists and who each product is best for.</li>
      <li><strong>Generate and review.</strong> Build pages, check claims, test links, and publish through GitHub Pages.</li>
    </ol>
  </section>
</main>
${footer()}`;

  return layout({
    title: `${site.name} - GitHub Pages SEO Listicle Generator`,
    description: site.description,
    canonical: `${site.baseUrl}/`,
    body,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.baseUrl,
      description: site.description
    }
  });
}

function productRows(page) {
  return page.products
    .map((product, index) => `<tr>
      <td><span class="rank">#${index + 1}</span></td>
      <td><a href="${escapeHtml(product.url)}">${escapeHtml(product.name)}</a><small>${escapeHtml(product.bestFor)}</small></td>
      <td>${escapeHtml(product.price)}</td>
      <td>${escapeHtml(product.features.slice(0, 3).join(", "))}</td>
      <td><strong>${escapeHtml(product.score)}</strong>/10</td>
    </tr>`)
    .join("\n");
}

function renderListPage(page) {
  const itemList = page.products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: product.url
  }));
  const body = `${header(page.slug, 1)}
<main>
  <section class="article-hero">
    <a class="back-link" href="../">Back to factory</a>
    <h1>${escapeHtml(page.title)}</h1>
    <p>${escapeHtml(page.description)}</p>
    <div class="article-meta">
      <span>Keyword: ${escapeHtml(page.keyword)}</span>
      <span>Audience: ${escapeHtml(page.audience)}</span>
      <span>Updated: ${escapeHtml(page.updated)}</span>
    </div>
  </section>

  <section class="section">
    <h2>Quick comparison</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Tool</th>
            <th>Pricing note</th>
            <th>Core features</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>${productRows(page)}</tbody>
      </table>
    </div>
  </section>

  <section class="section product-notes">
    <h2>Detailed notes</h2>
    ${page.products
      .map(
        (product, index) => `<article class="product-note">
        <div class="product-heading">
          <span class="rank">#${index + 1}</span>
          <div>
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.bestFor)}</p>
          </div>
        </div>
        <div class="note-grid">
          <div>
            <h4>Pros</h4>
            <ul>${product.pros.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
          <div>
            <h4>Cons</h4>
            <ul>${product.cons.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
        </div>
      </article>`
      )
      .join("\n")}
  </section>

  <section class="section criteria">
    <h2>How this page should be maintained</h2>
    <p>This page is generated from structured records. Before publishing at scale, verify every official URL, pricing claim, feature list, and score rationale. Do not use scraped article paragraphs as source material.</p>
  </section>

  <section class="section faq">
    <h2>FAQ</h2>
    ${page.faqs
      .map(
        (faq) => `<details>
      <summary>${escapeHtml(faq.question)}</summary>
      <p>${escapeHtml(faq.answer)}</p>
    </details>`
      )
      .join("\n")}
  </section>
</main>
${footer()}`;

  return layout({
    title: `${page.title} - ${site.name}`,
    description: page.description,
    canonical: slugUrl(page.slug),
    body,
    depth: 1,
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: page.title,
      description: page.description,
      url: slugUrl(page.slug),
      itemListElement: itemList
    }
  });
}

function writeStyles() {
  const css = `:root {
  color-scheme: light;
  --bg: #f6f8f4;
  --surface: #ffffff;
  --ink: #18221e;
  --muted: #64706a;
  --line: #dfe6df;
  --teal: #0f766e;
  --teal-dark: #115e59;
  --amber: #c47a10;
  --soft-teal: #e7f3ef;
  --soft-amber: #fff1d6;
  --shadow: 0 18px 50px rgba(24, 34, 30, 0.08);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
}

a { color: inherit; }

code {
  padding: 2px 6px;
  border: 1px solid var(--line);
  border-radius: 5px;
  background: #f7faf8;
  font-size: 0.92em;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px clamp(18px, 4vw, 56px);
  background: rgba(246, 248, 244, 0.92);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(14px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  text-decoration: none;
}

.brand-mark {
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--ink);
  color: white;
  font-size: 0.85rem;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

nav a {
  padding: 8px 10px;
  border-radius: 7px;
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
}

nav a:hover,
nav a.active {
  background: var(--soft-teal);
  color: var(--teal-dark);
}

main {
  width: min(1160px, calc(100% - 36px));
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
  gap: clamp(28px, 6vw, 72px);
  align-items: center;
  min-height: 76vh;
  padding: 64px 0 42px;
}

h1, h2, h3, h4, p { margin-top: 0; }

h1 {
  max-width: 760px;
  font-size: clamp(2.5rem, 6vw, 5.6rem);
  line-height: 0.96;
  letter-spacing: 0;
  margin-bottom: 24px;
}

h2 {
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.08;
  letter-spacing: 0;
  margin-bottom: 16px;
}

h3 {
  font-size: 1.25rem;
  line-height: 1.25;
  margin-bottom: 8px;
}

p {
  color: var(--muted);
  font-size: 1.02rem;
}

.hero-copy p {
  max-width: 650px;
  font-size: 1.16rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-weight: 700;
  text-decoration: none;
}

.button.primary {
  border-color: var(--teal);
  background: var(--teal);
  color: white;
}

.workflow {
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.concept-image {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.concept-image img {
  display: block;
  width: 100%;
  height: auto;
}

.workflow-row {
  display: grid;
  grid-template-columns: 38px 1fr;
  gap: 8px 14px;
  align-items: center;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fbfcfb;
}

.workflow-row span,
.rank {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background: var(--soft-amber);
  color: #8a4e05;
  font-weight: 800;
  font-size: 0.82rem;
}

.workflow-row strong { line-height: 1.1; }
.workflow-row em {
  grid-column: 2;
  color: var(--muted);
  font-style: normal;
  font-size: 0.9rem;
}

.workflow-row.complete span,
.workflow-row.active span {
  background: var(--soft-teal);
  color: var(--teal-dark);
}

.workflow-row.active {
  border-color: rgba(15, 118, 110, 0.35);
  background: #f0faf7;
}

.section {
  padding: 56px 0;
  border-top: 1px solid var(--line);
}

.grid-two {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 48px;
  align-items: start;
}

.quality-list {
  display: grid;
  gap: 12px;
}

.quality-list div {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}

.quality-list span {
  color: var(--muted);
}

.section-heading {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: end;
  margin-bottom: 22px;
}

.section-heading p { max-width: 520px; }

.page-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.page-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 360px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.label {
  margin-bottom: 12px;
  color: var(--amber);
  font-size: 0.86rem;
  font-weight: 800;
}

.page-card h3 a { text-decoration: none; }
.page-card h3 a:hover { color: var(--teal); }

dl {
  display: grid;
  gap: 10px;
  margin: 20px 0 0;
}

dt {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

dd {
  margin: 0;
  font-size: 0.94rem;
}

.process ol {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  padding: 0;
  list-style: none;
}

.process li {
  padding: 18px;
  border-top: 4px solid var(--teal);
  background: var(--surface);
}

.article-hero {
  padding: 56px 0 36px;
}

.article-hero h1 {
  max-width: 900px;
  font-size: clamp(2.4rem, 5vw, 4.8rem);
}

.article-hero p {
  max-width: 820px;
  font-size: 1.15rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 18px;
  color: var(--teal-dark);
  font-weight: 800;
  text-decoration: none;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.article-meta span {
  padding: 8px 10px;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: var(--surface);
  color: var(--muted);
  font-size: 0.9rem;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
}

th, td {
  padding: 16px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

th {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
}

td small {
  display: block;
  margin-top: 4px;
  color: var(--muted);
}

.product-notes {
  display: grid;
  gap: 16px;
}

.product-note {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.product-heading {
  display: flex;
  gap: 14px;
  align-items: start;
}

.note-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 18px;
}

.note-grid ul {
  margin: 0;
  padding-left: 20px;
  color: var(--muted);
}

.criteria {
  padding: 28px;
  border: 1px solid rgba(196, 122, 16, 0.28);
  border-radius: 8px;
  background: var(--soft-amber);
}

.faq details {
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}

.faq summary {
  cursor: pointer;
  font-weight: 800;
}

.faq details p {
  max-width: 760px;
  margin-top: 12px;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  width: min(1160px, calc(100% - 36px));
  margin: 40px auto 0;
  padding: 28px 0 40px;
  border-top: 1px solid var(--line);
}

.site-footer p {
  max-width: 540px;
  font-size: 0.92rem;
}

@media (max-width: 900px) {
  .site-header,
  .section-heading,
  .site-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero,
  .grid-two,
  .concept-grid,
  .page-grid,
  .process ol,
  .note-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding-top: 38px;
  }

  .page-card {
    min-height: auto;
  }
}

@media (max-width: 560px) {
  main,
  .site-footer {
    width: min(100% - 28px, 1160px);
  }

  h1 {
    font-size: 2.55rem;
    line-height: 1;
  }

  .quality-list div {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .workflow-row {
    grid-template-columns: 32px 1fr;
    padding: 12px;
  }

  th, td {
    padding: 12px;
  }
}`;

  fs.writeFileSync(path.join(docsDir, "styles.css"), css);
}

function copyAssets() {
  fs.mkdirSync(assetsDir, { recursive: true });
  const conceptSrc = path.join(
    process.env.HOME || "/Users/chinamanor",
    ".codex",
    "generated_images",
    "019f423e-dd7a-7161-80ac-f8d53bb4c9e5",
    "ig_02c10601a4a98c35016a4e680307908191a0cee798cdf238e8.png"
  );
  if (fs.existsSync(conceptSrc)) {
    fs.copyFileSync(conceptSrc, path.join(assetsDir, "factory-concept.png"));
  }
}

function writePage(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html);
}

function writeSitemap() {
  const urls = [`${site.baseUrl}/`, ...pages.map((page) => slugUrl(page.slug))];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeHtml(url)}</loc>
    <lastmod>2026-07-08</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;
  fs.writeFileSync(path.join(docsDir, "sitemap.xml"), xml);
}

function writeRobots() {
  fs.writeFileSync(
    path.join(docsDir, "robots.txt"),
    `User-agent: *
Allow: /

Sitemap: ${site.baseUrl}/sitemap.xml
`
  );
}

function writeFavicon() {
  fs.writeFileSync(
    path.join(docsDir, "favicon.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#18221e"/>
  <text x="32" y="39" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#ffffff">26</text>
</svg>
`
  );
}

function writeNotFound() {
  writePage(
    path.join(docsDir, "404.html"),
    layout({
      title: `Page not found - ${site.name}`,
      description: "The requested page does not exist.",
      canonical: `${site.baseUrl}/404.html`,
      body: `${header()}<main><section class="article-hero"><h1>Page not found</h1><p>This static demo did not generate that URL yet.</p><a class="button primary" href="./">Back home</a></section></main>${footer()}`
    })
  );
}

cleanDir(docsDir);
copyAssets();
writeStyles();
writePage(path.join(docsDir, "index.html"), renderHome());
pages.forEach((page) => {
  writePage(path.join(docsDir, page.slug, "index.html"), renderListPage(page));
});
writeSitemap();
writeRobots();
writeFavicon();
writeNotFound();

console.log(`Generated ${pages.length + 1} pages in ${path.relative(root, docsDir)}`);

import fs from "fs";
import path from "path";
import { blogPosts, BlogSection, BlogPost } from "../src/data/blogPosts.js";

const DIST = path.resolve(import.meta.dirname, "..", "dist");
const SITE = "https://www.readsidekick.com";
const CHROME_STORE_URL =
    "https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa";

// --- Utility functions ---

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/<[^>]*>/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function stripHtml(text: string): string {
    return text.replace(/<[^>]*>/g, "");
}

// --- Section rendering (mirrors BlogPost.tsx renderSection) ---

function renderSection(section: BlogSection, index: number): string {
    switch (section.type) {
        case "heading": {
            const id = slugify(section.content || "");
            return section.html
                ? `<h2 id="${id}" class="font-serif text-display-sm text-ink-900 mt-12 mb-6 blog-html-content scroll-mt-24">${section.content}</h2>`
                : `<h2 id="${id}" class="font-serif text-display-sm text-ink-900 mt-12 mb-6 scroll-mt-24">${escapeHtml(section.content || "")}</h2>`;
        }
        case "subheading":
            return section.html
                ? `<h3 class="font-serif text-xl text-ink-900 mt-8 mb-4 blog-html-content">${section.content}</h3>`
                : `<h3 class="font-serif text-xl text-ink-900 mt-8 mb-4">${escapeHtml(section.content || "")}</h3>`;
        case "paragraph":
            return section.html
                ? `<p class="font-mono text-body-md text-ink-700/80 leading-relaxed mb-6 blog-html-content">${section.content}</p>`
                : `<p class="font-mono text-body-md text-ink-700/80 leading-relaxed mb-6">${escapeHtml(section.content || "")}</p>`;
        case "bold":
            return section.html
                ? `<p class="font-mono text-body-md text-ink-900 font-semibold leading-relaxed mb-6 blog-html-content">${section.content}</p>`
                : `<p class="font-mono text-body-md text-ink-900 font-semibold leading-relaxed mb-6">${escapeHtml(section.content || "")}</p>`;
        case "quote":
            return `<blockquote class="border-l-4 border-coral-500 pl-6 py-2 my-8 bg-coral-50/50 rounded-r-lg">${
                section.html
                    ? `<p class="font-serif text-lg text-ink-700 italic leading-relaxed blog-html-content">${section.content}</p>`
                    : `<p class="font-serif text-lg text-ink-700 italic leading-relaxed">${escapeHtml(section.content || "")}</p>`
            }</blockquote>`;
        case "list":
            return `<ul class="list-disc list-outside ml-6 mb-6 space-y-2">${(section.items || [])
                .map((item) =>
                    section.html
                        ? `<li class="font-mono text-body-md text-ink-700/80 leading-relaxed blog-html-content">${item}</li>`
                        : `<li class="font-mono text-body-md text-ink-700/80 leading-relaxed">${escapeHtml(item)}</li>`
                )
                .join("")}</ul>`;
        case "table":
            return `<div class="my-8 overflow-x-auto rounded-lg border border-ink-800/10"><table class="w-full min-w-[640px] border-collapse"><thead><tr class="bg-ink-900 text-white">${(section.headers || [])
                .map(
                    (h) =>
                        `<th class="font-mono text-body-sm font-semibold px-4 py-3 text-left">${escapeHtml(h)}</th>`
                )
                .join("")}</tr></thead><tbody>${(section.rows || [])
                .map(
                    (row, ri) =>
                        `<tr class="${ri % 2 === 0 ? "bg-ivory-100" : "bg-ivory-50"}">${row
                            .map(
                                (cell, ci) =>
                                    `<td class="font-mono text-body-sm px-4 py-3 text-ink-700/80 border-t border-ink-800/10${ci === 0 ? " font-semibold text-ink-900" : ""}">${escapeHtml(cell)}</td>`
                            )
                            .join("")}</tr>`
                )
                .join("")}</tbody></table></div>`;
        case "separator":
            return `<div class="flex items-center justify-center my-12"><div class="w-16 h-px bg-ink-800/20"></div><div class="w-2 h-2 rounded-full bg-coral-500 mx-4"></div><div class="w-16 h-px bg-ink-800/20"></div></div>`;
        default:
            return "";
    }
}

// --- Build blog post HTML ---

function buildBlogPostHtml(template: string, post: BlogPost): string {
    const url = `${SITE}/blog/${post.slug}`;
    const headings = post.content.filter(
        (s) => s.type === "heading" && s.content
    );

    // Schema.org
    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { "@type": "Person", name: post.author },
        publisher: {
            "@type": "Organization",
            name: "Read Sidekick",
            url: SITE,
            logo: `${SITE}/logo.png`,
        },
        url,
        keywords: post.tags.join(", "),
    };

    const faqSchema =
        post.faq && post.faq.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: post.faq.map((item) => ({
                      "@type": "Question",
                      name: item.question,
                      acceptedAnswer: {
                          "@type": "Answer",
                          text: item.answer,
                      },
                  })),
              }
            : null;

    // Table of contents
    const tocHtml =
        headings.length > 0
            ? `<nav class="mb-12 p-6 md:p-8 bg-white rounded-xl border border-ink-800/10 shadow-sm" aria-label="Table of contents">
        <h2 class="font-serif text-lg text-ink-900 mb-4">In This Article</h2>
        <ol class="space-y-2">${headings
                  .map((s, i) => {
                      const plainText = stripHtml(s.content || "");
                      return `<li><a href="#${slugify(s.content || "")}" class="font-mono text-body-sm text-ink-700/70 hover:text-coral-500 transition-colors duration-200 flex items-start gap-3"><span class="text-coral-500/60 font-semibold flex-shrink-0">${String(i + 1).padStart(2, "0")}</span>${escapeHtml(plainText)}</a></li>`;
                  })
                  .join("")}</ol></nav>`
            : "";

    // Article content
    const articleHtml = post.content
        .map((section, i) => renderSection(section, i))
        .join("\n");

    // FAQ section (all visible, no accordion)
    const faqHtml =
        post.faq && post.faq.length > 0
            ? `<div class="mt-16">
        <div class="mb-10">
            <span class="editorial-label block mb-4">Common Questions</span>
            <h2 class="font-serif text-display-sm md:text-display-md text-ink-900">Frequently Asked <span class="italic">Questions</span></h2>
        </div>
        <div class="max-w-3xl">${post.faq
                  .map(
                      (item) =>
                          `<div class="border-b border-ink-800/10"><div class="py-6"><span class="font-mono text-body-md md:text-body-lg text-ink-900 block mb-3">${escapeHtml(item.question)}</span><p class="font-mono text-body-sm md:text-body-md text-ink-700/70 leading-relaxed">${escapeHtml(item.answer)}</p></div></div>`
                  )
                  .join("")}</div></div>`
            : "";

    // Full page content inside #root
    const rootContent = `<section class="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen">
    <div class="editorial-container">
        <div class="max-w-3xl mx-auto">
            <!-- Back Link -->
            <div class="mb-12">
                <a href="/blog" class="inline-flex items-center gap-2 font-mono text-body-sm text-ink-700/60 hover:text-coral-500 transition-colors duration-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    Back to Blog
                </a>
            </div>

            <!-- Header -->
            <header class="mb-12 md:mb-16">
                <div class="flex flex-wrap gap-2 mb-6">${post.tags.map((tag) => `<span class="font-mono text-caption uppercase tracking-wider text-coral-500 bg-coral-50 px-3 py-1 rounded-full">${escapeHtml(tag)}</span>`).join("")}</div>
                <h1 class="font-serif text-display-sm md:text-display-md text-ink-900 mb-6">${escapeHtml(post.title)}</h1>
                <p class="font-mono text-body-lg text-ink-700/60 italic mb-8">${escapeHtml(post.subtitle)}</p>
                <div class="flex flex-wrap items-center gap-4 text-ink-700/50 pb-8 border-b border-ink-800/10">
                    <span class="font-mono text-body-sm">By ${escapeHtml(post.author)}</span>
                    <span class="w-1 h-1 rounded-full bg-ink-700/30"></span>
                    <span class="font-mono text-body-sm">${escapeHtml(post.date)}</span>
                    <span class="w-1 h-1 rounded-full bg-ink-700/30"></span>
                    <span class="font-mono text-body-sm">${post.readingTime} min read</span>
                </div>
            </header>

            ${tocHtml}

            <!-- Content -->
            <article class="prose-editorial">
${articleHtml}
            </article>

            <!-- CTA -->
            <div class="mt-16 text-center bg-white rounded-xl p-10 md:p-14 shadow-sm border border-ink-800/10">
                <h2 class="font-serif text-display-sm md:text-display-md text-ink-900 mb-4">Get Read Sidekick <span class="italic">Free</span></h2>
                <p class="font-mono text-body-md text-ink-700/70 max-w-xl mx-auto mb-8">Turn dense articles, legal jargon, and confusing content into clear, simple language — in one click.</p>
                <a href="${CHROME_STORE_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-coral-500 text-white font-mono text-body-md font-medium px-8 py-3 rounded-full hover:bg-coral-600 transition-colors duration-300">
                    Add to Chrome — It&#039;s Free
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>

            ${faqHtml}

            <!-- Footer -->
            <footer class="mt-16 pt-8 border-t border-ink-800/10">
                <a href="/blog" class="inline-flex items-center gap-2 font-mono text-body-md text-coral-500 hover:text-coral-600 transition-colors duration-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    Back to all posts
                </a>
            </footer>
        </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10"></div>
</section>`;

    // Build the full HTML by modifying the template
    let html = template;

    // Replace <title>
    html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${escapeHtml(post.title)} | Read Sidekick Blog</title>`
    );

    // Replace meta description
    html = html.replace(
        /<meta name="description" content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${escapeHtml(post.excerpt)}" />`
    );

    // Replace OG tags
    html = html.replace(
        /<meta property="og:type" content="[^"]*"\s*\/?>/,
        `<meta property="og:type" content="article" />`
    );
    html = html.replace(
        /<meta property="og:url" content="[^"]*"\s*\/?>/,
        `<meta property="og:url" content="${url}" />`
    );
    html = html.replace(
        /<meta property="og:title" content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="${escapeHtml(post.title)} | Read Sidekick Blog" />`
    );
    html = html.replace(
        /<meta property="og:description" content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="${escapeHtml(post.excerpt)}" />`
    );

    // Replace Twitter tags
    html = html.replace(
        /<meta name="twitter:url" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:url" content="${url}" />`
    );
    html = html.replace(
        /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:title" content="${escapeHtml(post.title)} | Read Sidekick Blog" />`
    );
    html = html.replace(
        /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />`
    );

    // Add canonical link before </head>
    html = html.replace(
        "</head>",
        `    <link rel="canonical" href="${url}" />\n  </head>`
    );

    // Replace Schema.org JSON-LD (replace the first script block, add blog-specific ones)
    const schemaScripts = `<script type="application/ld+json">${JSON.stringify(blogPostingSchema)}</script>${
        faqSchema
            ? `\n    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`
            : ""
    }`;
    // Replace the existing Organization schema with blog post schemas
    html = html.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        schemaScripts
    );

    // Inject content into #root
    html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${rootContent}</div>`
    );

    return html;
}

// --- Build blog listing page HTML ---

function buildBlogListingHtml(template: string): string {
    const url = `${SITE}/blog`;

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Read Sidekick Blog",
        description:
            "Tips on reading comprehension, AI-powered reading tools, and guides to understanding complex text.",
        url,
        publisher: {
            "@type": "Organization",
            name: "Read Sidekick",
            url: SITE,
            logo: `${SITE}/logo.png`,
        },
        blogPost: blogPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author },
            url: `${SITE}/blog/${post.slug}`,
        })),
    };

    const blogFaqItems = [
        {
            question: "What topics does the Read Sidekick blog cover?",
            answer: "Our blog covers reading comprehension strategies, AI-powered reading tools, text simplification techniques, educational technology, and tips for understanding complex articles, legal documents, and academic papers.",
        },
        {
            question:
                "How can Read Sidekick help me understand complex articles?",
            answer: "Read Sidekick is a free Chrome extension that simplifies dense text in one click. It rewrites confusing sentences, explains jargon, and breaks down complex paragraphs so you can understand any article, document, or webpage.",
        },
        {
            question: "Is Read Sidekick free to use?",
            answer: 'Yes! Read Sidekick is completely free. You can install it from the Chrome Web Store and start simplifying text immediately — no account or payment required.',
        },
        {
            question: "How do I get started with Read Sidekick?",
            answer: 'Simply visit the Chrome Web Store, click "Add to Chrome," and the extension will be ready to use. Highlight any text on a webpage and click the Read Sidekick icon to get a simplified version instantly.',
        },
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blogFaqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };

    // Blog listing content
    const postsHtml = blogPosts
        .map(
            (post) => `<article>
                <a href="/blog/${post.slug}" class="block bg-white rounded-xl p-8 md:p-10 border-l-4 border-coral-500 shadow-sm hover:shadow-md transition-shadow duration-300 group">
                    <div class="flex flex-wrap gap-2 mb-4">${post.tags
                        .slice(0, 3)
                        .map(
                            (tag) =>
                                `<span class="font-mono text-caption uppercase tracking-wider text-coral-500 bg-coral-50 px-3 py-1 rounded-full">${escapeHtml(tag)}</span>`
                        )
                        .join("")}</div>
                    <h2 class="font-serif text-display-sm md:text-2xl text-ink-900 mb-4 group-hover:text-coral-500 transition-colors duration-300">${escapeHtml(post.title)}</h2>
                    <p class="font-mono text-body-md text-ink-700/60 italic mb-6">${escapeHtml(post.subtitle)}</p>
                    <p class="font-mono text-body-md text-ink-700/80 leading-relaxed mb-6">${escapeHtml(post.excerpt)}</p>
                    <div class="flex flex-wrap items-center gap-4 text-ink-700/50">
                        <span class="font-mono text-body-sm">${escapeHtml(post.author)}</span>
                        <span class="w-1 h-1 rounded-full bg-ink-700/30"></span>
                        <span class="font-mono text-body-sm">${escapeHtml(post.date)}</span>
                        <span class="w-1 h-1 rounded-full bg-ink-700/30"></span>
                        <span class="font-mono text-body-sm">${post.readingTime} min read</span>
                    </div>
                </a>
            </article>`
        )
        .join("\n");

    const faqListHtml = blogFaqItems
        .map(
            (item) =>
                `<div class="border-b border-ink-800/10"><div class="py-6"><span class="font-mono text-body-md md:text-body-lg text-ink-900 block mb-3">${escapeHtml(item.question)}</span><p class="font-mono text-body-sm md:text-body-md text-ink-700/70 leading-relaxed">${escapeHtml(item.answer)}</p></div></div>`
        )
        .join("");

    const rootContent = `<section class="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen">
    <div class="editorial-container">
        <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-16 md:mb-20">
                <span class="editorial-label block mb-6">Stories &amp; Insights</span>
                <h1 class="font-serif text-display-md md:text-display-lg text-ink-900 mb-6">Reading Tips &amp; Insights from <span class="italic">Read Sidekick</span></h1>
                <p class="font-mono text-body-md text-ink-700/70 max-w-2xl mx-auto">Thoughts on language, reading, and building tools that make complex text clear.</p>
            </div>

            <!-- Blog Posts Grid -->
            <div class="grid grid-cols-1 gap-8">
${postsHtml}
            </div>

            <!-- CTA -->
            <div class="mt-16 md:mt-20 text-center bg-white rounded-xl p-10 md:p-14 shadow-sm border border-ink-800/10">
                <h2 class="font-serif text-display-sm md:text-display-md text-ink-900 mb-4">Get Read Sidekick <span class="italic">Free</span></h2>
                <p class="font-mono text-body-md text-ink-700/70 max-w-xl mx-auto mb-8">Turn dense articles, legal jargon, and confusing content into clear, simple language — in one click.</p>
                <a href="${CHROME_STORE_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-coral-500 text-white font-mono text-body-md font-medium px-8 py-3 rounded-full hover:bg-coral-600 transition-colors duration-300">
                    Add to Chrome — It&#039;s Free
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>

            <!-- FAQ Section -->
            <div class="mt-16 md:mt-20">
                <div class="mb-10">
                    <span class="editorial-label block mb-4">Common Questions</span>
                    <h2 class="font-serif text-display-sm md:text-display-md text-ink-900">Frequently Asked <span class="italic">Questions</span></h2>
                </div>
                <div class="max-w-3xl">${faqListHtml}</div>
            </div>
        </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10"></div>
</section>`;

    let html = template;

    // Replace <title>
    html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>Read Sidekick Blog | Reading Tips, AI Tools &amp; Comprehension Guides</title>`
    );

    // Replace meta description
    html = html.replace(
        /<meta name="description" content="[^"]*"\s*\/?>/,
        `<meta name="description" content="Explore the Read Sidekick blog for reading comprehension tips, AI-powered reading tools, and guides to understanding complex text." />`
    );

    // Replace OG tags
    html = html.replace(
        /<meta property="og:url" content="[^"]*"\s*\/?>/,
        `<meta property="og:url" content="${url}" />`
    );
    html = html.replace(
        /<meta property="og:title" content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="Read Sidekick Blog | Reading Tips, AI Tools &amp; Comprehension Guides" />`
    );
    html = html.replace(
        /<meta property="og:description" content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="Explore the Read Sidekick blog for reading comprehension tips, AI-powered reading tools, and guides to understanding complex text." />`
    );

    // Replace Twitter tags
    html = html.replace(
        /<meta name="twitter:url" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:url" content="${url}" />`
    );
    html = html.replace(
        /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:title" content="Read Sidekick Blog | Reading Tips, AI Tools &amp; Comprehension Guides" />`
    );
    html = html.replace(
        /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:description" content="Explore the Read Sidekick blog for reading comprehension tips, AI-powered reading tools, and guides to understanding complex text." />`
    );

    // Add canonical link
    html = html.replace(
        "</head>",
        `    <link rel="canonical" href="${url}" />\n  </head>`
    );

    // Replace Schema.org JSON-LD
    const schemaScripts = `<script type="application/ld+json">${JSON.stringify(blogSchema)}</script>\n    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
    html = html.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        schemaScripts
    );

    // Inject content
    html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${rootContent}</div>`
    );

    return html;
}

// --- Generate sitemap ---

function generateSitemap(): string {
    const today = new Date().toISOString().split("T")[0];
    const urls = [
        { loc: `${SITE}/`, changefreq: "weekly", priority: "1.0" },
        { loc: `${SITE}/blog`, changefreq: "weekly", priority: "0.8" },
        ...blogPosts.map((post) => ({
            loc: `${SITE}/blog/${post.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
        })),
        { loc: `${SITE}/privacy`, changefreq: "yearly", priority: "0.3" },
        { loc: `${SITE}/terms`, changefreq: "yearly", priority: "0.3" },
        { loc: `${SITE}/feedback`, changefreq: "monthly", priority: "0.5" },
        {
            loc: `${SITE}/aslearlyaccess`,
            changefreq: "monthly",
            priority: "0.5",
        },
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>
`;
}

// --- Main ---

function main() {
    const templatePath = path.join(DIST, "index.html");
    if (!fs.existsSync(templatePath)) {
        console.error("Error: dist/index.html not found. Run vite build first.");
        process.exit(1);
    }

    const template = fs.readFileSync(templatePath, "utf-8");

    // Generate blog post pages
    for (const post of blogPosts) {
        const outDir = path.join(DIST, "blog", post.slug);
        fs.mkdirSync(outDir, { recursive: true });
        const html = buildBlogPostHtml(template, post);
        const outPath = path.join(outDir, "index.html");
        fs.writeFileSync(outPath, html);
        console.log(`  blog/${post.slug}/index.html`);
    }

    // Generate blog listing page
    const blogDir = path.join(DIST, "blog");
    fs.mkdirSync(blogDir, { recursive: true });
    const listingHtml = buildBlogListingHtml(template);
    fs.writeFileSync(path.join(blogDir, "index.html"), listingHtml);
    console.log("  blog/index.html");

    // Generate sitemap
    const sitemapHtml = generateSitemap();
    fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemapHtml);
    console.log("  sitemap.xml");

    console.log(`\nPrerender complete: ${blogPosts.length} posts + listing + sitemap`);
}

main();

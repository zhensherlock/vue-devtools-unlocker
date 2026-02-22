import tailwindcss from '@tailwindcss/vite'
import { isUndefined } from 'lodash-es'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'
import pkg from '../../../packages/chrome-extension/package.json' with { type: 'json' };

const isGithubPages = isUndefined(process.env.VERCEL)
const base = isGithubPages ? '/vue-devtools-unlocker/' : '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue DevTools Unlocker',
  description: 'Enable Vue DevTools in production environments',
  rewrites: {
    'en/:rest*': ':rest*',
    'en/index.md': 'index.md',
    'en/guide/what-is-it.md': 'guide/what-is-it.md',
    'en/guide/getting-started.md': 'guide/getting-started.md',
  },
  base,
  head: [
    ['link', { rel: 'shortcut icon', href: `${base}icon.png` }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}icon.png` }],
  ],
  locales: {
    root: { label: 'English', lang: 'en-US', dir: 'ltr' },
    zh: { label: '简体中文', lang: 'zh-Hans', dir: 'ltr' },
  },
  themeConfig: {
    logo: '/icon.png',
    socialLinks: [{ icon: 'github', link: 'https://github.com/zhensherlock/vue-devtools-unlocker' }],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      {
        text: pkg.version,
        items: [
          {
            text: 'Chrome Web Store',
            link: 'https://chromewebstore.google.com/detail/vue-devtools-unlocker/fbihgkimpchlnlcnbffhbpcghafemopa',
          },
          {
            text: 'Microsoft Edge Add-ons',
            link: 'https://microsoftedge.microsoft.com/addons/detail/vue-devtools-unlocker/lehadmjlbmlapdkapjoapbhhbcpcoepd',
          },
          {
            text: 'Firefox Add-ons',
            link: 'https://addons.mozilla.org/zh-CN/firefox/addon/vue-devtools-unlocker/',
          },
        ],
      },
    ],

    outline: {
      level: [2, 6],
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is it?', link: '/guide/what-is-it' },
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: 'V6CF28P0PS',
        apiKey: '692752b7b3c6f794997d8ae22aed79fa',
        indexName: 'vue-devtools-unlocker',
        searchParameters: {
          facetFilters: [`tags:${isGithubPages ? 'gh' : 'vercel'}`],
        },
      },
    },
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    server: {
      open: true,
    },
    plugins: [
      tailwindcss(),
      llmstxt({
        ignoreFiles: ['en/index.md', 'zh/index.md'],
        description: 'Enable Vue DevTools in production environments',
        sidebar: [
          {
            text: 'Introduction',
            base: '',
            items: [
              { text: 'What is it?', link: '/guide/what-is-it' },
              { text: 'Getting Started', link: '/guide/getting-started' },
            ],
          },
          {
            text: '简介',
            base: '',
            items: [
              { text: '这是什么？', link: '/zh/guide/what-is-it' },
              { text: '快速开始', link: '/zh/guide/getting-started' },
            ],
          },
        ],
        details: `\
- � Unlock Vue DevTools in production
- 🌐 Works with both Vue 2 and Vue 3
- � Shows detected Vue version in popup
- ⚙️ No changes required to your app code
- � Simple browser extension workflow for debugging
`,
      }),
      groupIconVitePlugin(),
    ],
  },
});

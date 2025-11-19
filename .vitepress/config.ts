import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OpenTCS Plus',
  description: '基于 OpenTCS 核心思想构建的企业级 AGV 调度系统',
  base: '/',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '概述', link: '/overview/overview' },
      { text: '快速开始', link: '/quickstart/start' },
      { text: '开发文档', link: '/development/backend' },
      {
        text: '更多',
        items: [
          { text: '关于', link: '/overview/about' },
          { text: '为什么选择', link: '/overview/why' }
        ]
      }
    ],

    sidebar: {
      '/overview/': [
        {
          text: '概述',
          items: [
            { text: '关于 OpenTCS Plus', link: '/overview/about' },
            { text: '项目概述', link: '/overview/overview' },
            { text: '为什么选择', link: '/overview/why' }
          ]
        }
      ],
      '/quickstart/': [
        {
          text: '快速开始',
          items: [
            { text: '开始指南', link: '/quickstart/start' }
          ]
        }
      ],
      '/development/': [
        {
          text: '开发文档',
          items: [
            { text: '后端开发', link: '/development/backend' },
            { text: '前端开发', link: '/development/frontend' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LeonDev1024/opentcs-plus' }
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2025 OpenTCS Plus'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/LeonDev1024/opentcs-plus-docs/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})


import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OpenTCSPlus',
  description: 'OpenTCS Plus 项目文档网站',
  base: '/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  
  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '概述', link: '/overview/about' },
      { text: '快速开始', link: '/quickstart/start' },
      { text: '开发指南', link: '/development/frontend' }
    ],
    
    sidebar: {
      '/overview/': [
        {
          text: '概述',
          items: [
            { text: '关于', link: '/overview/about' },
            { text: '为什么选择 OpenTCS', link: '/overview/why' },
            { text: '版本信息', link: '/overview/version' }
          ]
        }
      ],
      '/quickstart/': [
        {
          text: '快速开始',
          items: [
            { text: '入门指南', link: '/quickstart/start' }
          ]
        }
      ],
      '/development/': [
        {
          text: '开发指南',
          items: [
            { text: '前端开发', link: '/development/frontend' },
            { text: '后端开发', link: '/development/backend' },
            { text: 'VDA5050协议（中文版）', link: '/development/VDA5050_ZH' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ]
  }
})


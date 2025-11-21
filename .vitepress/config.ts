import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  srcDir: 'src',
  outDir: 'dist',
  lang: 'zh-CN',
  title: 'OpenTCS Plus',
  description: '基于 OpenTCS 核心思想构建的企业级 AGV 调度系统',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '开发指南', 
        items: [
          { text: '后端开发', link: '/development/backend' },
          { text: '前端开发', link: '/development/frontend' }
        ] 
      },
      { text: '版本', link: '/overview/version' },
      { text: '关于', link: '/overview/about' }
    ],

    sidebar: [
      {
        text: '概述',
        collapsed: false,
        items: [
          { text: '关于 OpenTCS Plus', link: '/overview/about' },
          { text: '项目概述', link: '/overview/overview' },
          { text: '为什么选择', link: '/overview/why' },
          { text: '版本历史', link: '/overview/version' }
        ]
      },
      {
        text: '快速开始',
        collapsed: false,
        items: [
          { text: '开始指南', link: '/quickstart/start' }
        ]
      },
      {
        text: '开发文档',
        collapsed: false,
        items: [
          { text: '后端开发', link: '/development/backend' },
          { text: '前端开发', link: '/development/frontend' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LeonDev1024/opentcs-plus' }
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2025 OpenTCS Plus'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    editLink: {
      pattern: 'https://github.com/LeonDev1024/opentcs-plus-docs/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    returnToTopLabel: '回到顶部'
  }
})


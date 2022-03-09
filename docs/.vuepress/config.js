const plug = require('./config/pluginsConf')
const nav = require('./config/nav')
const headConf = require('./config/headConf')


module.exports = {
  "title": "易曦翰",
  "description": "易曦翰的个人博客",
  "head": headConf,
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  "theme": "reco",
  "themeConfig": {
    "subSidebar": 'auto',
    "nav": nav,
    // 文章侧边栏设置
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ],
      "/blogs/SpringCloud/": [
        "SpringCloud1",
        "SpringCloud2",
        "SpringCloud3",
        "SpringCloud4",
        "SpringCloud5",
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    // 友情链接
    "friendLink": [
      // {
      //   "title": "午后南杂",
      //   "desc": "Enjoy when you can, and endure when you must.",
      //   "email": "1156743527@qq.com",
      //   "link": "https://www.recoluan.com"
      // },
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
    ],
    plugins: plug,
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "yixihan",
    "authorAvatar": "/avatar.png",
    "record": "蜀ICP备2021030835号",
    "startYear": "2022"
  },
  "markdown": {
    "lineNumbers": true
  }
}

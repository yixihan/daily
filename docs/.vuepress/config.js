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
    
    // 评论功能
    valineConfig: {
      appId: 'BOgljzlVmuYgXTshtrW2vs3q-gzGzoHsz',// your appId
      appKey: 'wEKrHTB35XUU1J3KQsxmNKCx', // your appKey
    },
    
    // 主页顶部栏设置
    "nav": nav,
    
    // 侧边栏设置
    "subSidebar": 'auto',
    "sidebar": {
      "/blogs/SpringCloud/": [
        "SpringCloud1",
        "SpringCloud2",
        "SpringCloud3",
        "SpringCloud4",
        "SpringCloud5",      
      ],
      "/blogs/MySQL/": [
        "MySQL_linux",
        "MySQL1",
        "MySQL2",
        "MySQL3",
        "MySQL4",
      ],
      "/blogs/RabbitMQ/": [
        "RabbitMQ_alone",
        "RabbitMQ_colony",
        "RabbitMQ1",
        "RabbitMQ2",
      ],
      "/blogs/JavaSE/": [
        "JavaSE1",
        "JavaSE2",
        "JavaSE3",
        "JavaSE4",
        "JavaSE5",
        "JavaSE6",
        "JDBC",
      ],
      "/blogs/Nginx/": [
        "Nginx"
      ],
      "/blogs/Zookeeper/": [
        "zookeeper"
      ],


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
    "author": "易曦翰",
    "authorAvatar": "/avatar.png",
    "record": "蜀ICP备2021030835号",
    "startYear": "2022"
  },
  "markdown": {
    "lineNumbers": true
  }
}

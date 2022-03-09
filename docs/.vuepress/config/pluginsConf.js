module.exports = {
  '@vuepress/pwa':  {
    serviceWorker: true,
    updatePopup: { // 更改刷新内容的弹窗的显示文字
      message: "内容有更新啦~",
      buttonText: "我看看"
    },
    '@vuepress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    },
    '@vuepress/container': {
        type: 'tip',
        locales: {
          '/': {
            defaultInfo: 'TIP',
          },
          '/zh/': {
            defaultInfo: '提示',
          },
        },
      },
  },
}
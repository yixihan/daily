module.exports = {
  '@vuepress/pwa':  {
    serviceWorker: true,
    updatePopup: { // 更改刷新内容的弹窗的显示文字
      message: "内容有更新啦~",
      buttonText: "我看看"
    }
  }
}
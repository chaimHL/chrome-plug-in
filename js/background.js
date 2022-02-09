// 创建 contextMenus (在网页上鼠标右键弹出的菜单的某一项)
const contextMenuOptionForLFA = {
  id: 'lookingForAkali',
  title: '寻找阿卡丽',
  contexts: ['selection'] // 上下文语境为选中的文本
}
const contextMenuOptionForTranslate = {
  id: 'translate',
  title: '弟弟需要翻译',
  contexts: ['selection']
}

chrome.runtime.onInstalled.addListener(() => {
  // 为了防止 Cannot create item with duplicate id 报错，要在 onInstalled 的时候创建
  chrome.contextMenus.create(contextMenuOptionForLFA)
  chrome.contextMenus.create(contextMenuOptionForTranslate)
  chrome.action.disable()
  chrome.runtime.onMessage.addListener((request) => {
    if (request.todo === 'enableAction') {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        (tabs) => {
          chrome.action.enable(tabs[0].id)
        }
      )
    }
  })
})

// 监听 contextMenus 的点击事件
chrome.contextMenus.onClicked.addListener((clickData) => {
  // 有选中文字
  if (clickData.selectionText) {
    // 寻找阿卡丽
    if (clickData.menuItemId === 'lookingForAkali') {
      if (clickData.selectionText === '阿卡丽') {
        const notificationOption = {
          type: 'basic',
          title: '那好',
          iconUrl: '../imgs/di.png',
          message: '开始今天的阿卡丽练习吧~'
        }
        chrome.notifications.create('notification02', notificationOption)
      } else {
        const notificationOption = {
          type: 'basic',
          title: '选择错误',
          iconUrl: '../imgs/di.png',
          message: '只能寻找飘逸的阿卡丽'
        }
        chrome.notifications.create('notification03', notificationOption)
      }
    }
    // 百度翻译
    if (clickData.menuItemId === 'translate') {
      // 创建窗口
      const windowOptionForTranslate = {
        url: 'https://fanyi.baidu.com/#zh/en/' + clickData.selectionText,
        type: 'popup',
        top: 20,
        left: 20,
        width: 1200,
        height: 350
      }
      chrome.windows.create(windowOptionForTranslate)
    }
  }
})

// 监听 storage 的改变
chrome.storage.onChanged.addListener((changes) => {
  // 给图标添加 badge
  chrome.action.setBadgeBackgroundColor({
    color: 'rgba(29, 125, 250, 0.8)'
  })
  if (changes.heroes && changes.heroes.newValue) {
    chrome.action.setBadgeText({
      text: changes.heroes.newValue.length.toString()
    })
  } else {
    chrome.action.setBadgeText({
      text: '0'
    })
  }
})

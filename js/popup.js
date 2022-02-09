;(function () {
  const content = document.getElementById('content')
  const select = document.getElementById('select')
  const chosen = document.getElementById('chosen')
  const btn = document.getElementById('btn')
  let tempArr = []
  chrome.storage.sync.get('heroes', (res) => {
    if (Array.isArray(res.heroes)) {
      tempArr = res.heroes
      showImg(tempArr)
    }
  })

  function showImg(tempArr) {
    tempArr.forEach((item) => {
      switch (item) {
        case '阿卡丽':
          chosen.innerHTML = chosen.innerHTML + '<img src="imgs/akali.png" />'
          break
        case '熊熊警官':
          chosen.innerHTML = chosen.innerHTML + '<img src="imgs/xx.png" />'
          break
        case '德邦总管':
          chosen.innerHTML = chosen.innerHTML + '<img src="imgs/db.png" />'
          break
        case '蒙多':
          chosen.innerHTML = chosen.innerHTML + '<img src="imgs/md.png" />'
          break
        default:
          break
      }
    })
  }

  select.addEventListener('change', () => {
    if (select.value !== 'default' && !tempArr.includes(select.value)) {
      tempArr.push(select.value)
      // chosen.innerText = tempArr.join()
      chosen.innerHTML = ''
      showImg(tempArr)
      chrome.storage.sync.set({ heroes: tempArr })
    }
    switch (select.value) {
      case '阿卡丽':
        content.innerText = '又菜又爱秀，真是个弟弟'
        break
      case '熊熊警官':
        content.innerText = '玩了太多把，多练点其它英雄吧'
        break
      case '德邦总管':
        content.innerText = '不错的选择'
        break
      case '蒙多':
        content.innerText = '那就开摆'
        break
      default:
        content.innerText = '请选择一个英雄'
        break
    }
  })

  btn.addEventListener('click', () => {
    chrome.storage.sync.remove('heroes', () => {
      chosen.innerHTML = ''
      tempArr = []
      const notificationOption = {
        type: 'basic',
        title: '来自哥哥的提示',
        iconUrl: 'imgs/di.png',
        message: '英雄已清除'
      }
      chrome.notifications.create('notification01', notificationOption) // notification01 为 id
    })
  })
})()

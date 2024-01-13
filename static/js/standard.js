window.owoStandardTemp = {
    "alert": {
      "cancel": function (id) {
        window.owoStandardTemp.alert[id].show = false
        document.querySelector('#' + id).outerHTML = ''
      },
      "define": function (id, typeStr) {
        switch (typeStr) {
          case 'prompt': {
            let tempValue = window.owoStandardTemp.alert[id].el.querySelector('textarea').value
            if (!tempValue) return
            if (window.owoStandardTemp.alert[id].define) window.owoStandardTemp.alert[id].define(tempValue)
            break;
          }
          default:
            if (window.owoStandardTemp.alert[id].define) window.owoStandardTemp.alert[id].define()
        }
        
        document.querySelector('#' + id).outerHTML = ''
      },
      "minimize": function (id) {
        const domEl = document.querySelector('#' + id)
        if (domEl.style.bottom == '5px' || !domEl.style.bottom) {
          domEl.style.bottom = -domEl.offsetHeight + 45 + 'px'
        } else {
          domEl.style.bottom = 5 + 'px'
        }
        
      },
    }
}
if (!window.owo) window.owo = {}
if (!window.owo.tool) window.owo.tool = {}


owo.tool.alert = function (text, callBack) {
  if(!text) return
  var insertElement = document.createElement("div");
  insertElement.classList.add('cd-popup')
  insertElement.id = 'alert' + Math.ceil(Math.random()*100000); 
  window.owoStandardTemp.alert[insertElement.id] = {
    show: true,
    define: callBack,
    el: insertElement
  }
  insertElement.innerHTML = `
  <div class="cd-popup-container">
    <p class="conn">${text}</p>
    <ul class="cd-buttons">
      <li onclick="window.owoStandardTemp.alert.define('${insertElement.id}')">确定</li>
      <li onclick="window.owoStandardTemp.alert.cancel('${insertElement.id}')">取消</li>
    </ul>
    <div class="cd-popup-close img-replace" onclick="window.owoStandardTemp.alert.cancel('${insertElement.id}')"></div>
  </div>`
  document.body.appendChild(insertElement);
}

owo.tool.prompt = function (title, callBack, text) {
  if(!title) return
  var insertElement = document.createElement("div");
  insertElement.classList.add('cd-popup')
  insertElement.id = 'alert' + Math.ceil(Math.random()*100000); 
  window.owoStandardTemp.alert[insertElement.id] = {
    show: true,
    define: callBack,
    el: insertElement
  }
  insertElement.innerHTML = `
  <div class="cd-popup-container prompt">
    <p class="title-text">${title}</p>
    <textarea>${text || ""}</textarea>
    <ul class="cd-buttons">
      <li onclick="window.owoStandardTemp.alert.define('${insertElement.id}', 'prompt')">确定</li>
      <li onclick="window.owoStandardTemp.alert.cancel('${insertElement.id}')">取消</li>
    </ul>
    <div class="cd-popup-close img-replace" onclick="window.owoStandardTemp.alert.cancel('${insertElement.id}')"></div>
  </div>`
  document.body.appendChild(insertElement);
}

owo.tool.panel = function (htmlStr, text, callBack) {
  if(!text) return
  var insertElement = document.createElement("div");
  insertElement.classList.add('cd-popup')
  insertElement.id = 'alert' + Math.ceil(Math.random()*100000); 
  window.owoStandardTemp.alert[insertElement.id] = {
    show: true,
    define: callBack,
    el: insertElement
  }
  insertElement.innerHTML = `
  <div class="cd-popup-container popup-panel owo">
    <p class="title-text">${text}</p>
    <div class="conn">
      ${htmlStr}
    </div>
    <div class="cd-popup-close img-replace" onclick="window.owoStandardTemp.alert.cancel('${insertElement.id}')"></div>
  </div>`
  document.body.appendChild(insertElement);
  setTimeout(() => {
    const container = insertElement.querySelector('.cd-popup-container')
    container.style.height = container.offsetHeight + 'px'
    container.style.top = '0px'
    container.style.bottom = '0px'
    if (callBack) callBack()
  }, 0);
}

owo.tool.panelBox = function (htmlStr, text, callBack) {
  if(!text) return
  var insertElement = document.createElement("div");
  insertElement.classList.add('panel-box')
  insertElement.classList.add('owo')
  insertElement.id = 'alert' + Math.ceil(Math.random()*100000); 
  window.owoStandardTemp.alert[insertElement.id] = {
    show: true,
    define: callBack,
    el: insertElement
  }
  insertElement.innerHTML = `
  <div class="popup-panel">
    <p class="title-text">${text}</p>
    <div class="tool-panel">
      <svg  class="mini-button icon-button" onclick="window.owoStandardTemp.alert.minimize('${insertElement.id}')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5267" width="32" height="32"><path d="M784 80H240c-88 0-160 72-160 160v544c0 88 72 160 160 160h544c88 0 160-72 160-160V240c0-88-72-160-160-160z m96 704c0 52.8-43.2 96-96 96h-96v-96c0-52.8 43.2-96 96-96h96v96z m0-160h-96c-88 0-160 72-160 160v96H240c-52.8 0-96-43.2-96-96V240c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v384z" p-id="5268" ></path><path d="M560 336c-17.6 0-32 14.4-32 32v115.2L302.4 257.6c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8L483.2 528H368c-17.6 0-32 14.4-32 32s14.4 32 32 32h192c9.6 0 17.6-3.2 22.4-9.6 6.4-6.4 9.6-14.4 9.6-22.4V368c0-17.6-14.4-32-32-32z" p-id="5269" ></path></svg>
    </div>
    
    <div class="conn">
      ${htmlStr}
    </div>
    <div class="cd-popup-close img-replace" onclick="window.owoStandardTemp.alert.cancel('${insertElement.id}')"></div>
  </div>`
  document.body.appendChild(insertElement);
  if (callBack) callBack()
}

// 数组编辑
function arrEdit(domEl, startValue) {
  function randomString (n){const str = 'abcdefghijklmnopqrstuvwxyz9876543210';let tmp = '',i = 0,l = str.length;for (i = 0; i < n; i++) {tmp += str.charAt(Math.floor(Math.random() * l));}return tmp;}
  const tempKey = randomString(4)
  this.key = tempKey
  this.activeIndex = 0
  this.domEl = domEl
  this.value = startValue || []
  window['arrEdit' + tempKey] = this
  domEl.innerHTML = `
  <div class="arr-edit">
    <div class="tool-bar">
      <div class="icon-button arr-clear" onclick="window['${'arrEdit' + tempKey}'].arrEditClear()">
        <svg t="1666595355320" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5537" width="32" height="32"><path d="M901.3 504.8l-76.3-150c-13.4-26.3-40-42.6-69.5-42.6H639c-1.1 0-2-0.9-2-2V120.6c0-31.1-25.3-56.3-56.3-56.3h-90c-31.1 0-56.3 25.3-56.3 56.3v189.6c0 1.1-0.9 2-2 2H315.8c-29.5 0-56.1 16.3-69.5 42.6l-76.3 150c-9.2 18.1-8.4 39.3 2.2 56.6 10.3 16.8 27.9 27 47.4 27.6-4.8 101-38.3 205.9-90.2 279.5-12.5 17.8-14.1 40.8-4.1 60.1 10 19.3 29.7 31.3 51.5 31.3h601.5c35 0 66-23.6 75.2-57.4 15.5-56.5 28.4-107.9 29.4-164.9C884 685 874 636 852.9 589c19-1.1 36.1-11.2 46.2-27.6 10.6-17.3 11.4-38.5 2.2-56.6z m-681.4 25.4l76.3-150c3.8-7.4 11.3-12 19.6-12h116.4c32 0 58-26 58-58V120.6c0-0.1 0.2-0.3 0.3-0.3h90c0.1 0 0.3 0.2 0.3 0.3v189.6c0 32 26 58 58 58h116.4c8.3 0 15.8 4.6 19.6 12l76.3 150c0.2 0.3 0.5 1-0.1 2s-1.3 1-1.7 1H221.7c-0.4 0-1.1 0-1.7-1-0.6-1-0.3-1.7-0.1-2zM827 736.6c-0.9 50.5-12.9 98.3-27.4 151.1-2.6 9.5-11.3 16.2-21.2 16.2H651.8c11.3-22.3 18.5-44 23.1-61.2 7.1-26.7 10.7-53.5 10.6-78-0.1-17.1-15.5-30.1-32.4-27.4-13.6 2.2-23.6 14-23.6 27.8 0.1 42.7-14.1 98.2-42.7 138.8H406.2c15.2-21.7 26.1-43.8 33.6-61.9 10-24.3 17.4-49.7 21.2-72.5 2.8-17-10.4-32.5-27.6-32.5-13.6 0-25.3 9.8-27.6 23.3-2.8 16.6-8.3 37.7-17.7 60.4-10.1 24.6-27.8 58.1-55.6 83.3H176.9c-0.5 0-1.2 0-1.8-1.1-0.6-1.1-0.2-1.6 0.1-2 29.7-42.1 54.8-94.5 72.5-151.4 16.2-52.1 25.7-106.9 28-160.3h514.6C816 635.6 828 684 827 736.6z" fill="#bfbfbf" p-id="5538"></path></svg>
        <span>清空</span>
      </div>
      <div class="icon-button arr-delete" onclick="window['${'arrEdit' + tempKey}'].arrEditDelete()">
        <svg t="1666593353081" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3327" width="18" height="18"><path d="M353.67 769.987c-7.62 0-13.787 6.083-13.787 13.577v27.159c0 7.497 6.167 13.577 13.787 13.577 7.62 0 13.787-6.08 13.787-13.577v-27.159c0-7.494-6.167-13.577-13.787-13.577zM353.67 471.27c-7.62 0-13.787 6.083-13.787 13.582v230.825c0 7.497 6.167 13.574 13.787 13.574 7.62 0 13.787-6.077 13.787-13.574V484.852c0-7.5-6.167-13.582-13.787-13.582zM519.109 471.27c-7.62 0-13.787 6.083-13.787 13.582v325.871c0 7.497 6.167 13.577 13.787 13.577 7.62 0 13.787-6.08 13.787-13.577V484.852c0-7.5-6.167-13.582-13.787-13.582zM684.548 471.27c-7.62 0-13.787 6.083-13.787 13.582v325.871c0 7.497 6.167 13.577 13.787 13.577 7.62 0 13.787-6.08 13.787-13.577V484.852c0-7.5-6.167-13.582-13.787-13.582zM918.056 276.865a75.258 75.258 0 0 1-0.108 1.764c0.066 1.412 0.108 2.825 0.108 4.24v-6.004z" p-id="3328" fill="#707070"></path><path d="M806.101 175.941l-67.431-0.031c-5.88-75.746-38.858-111.986-141.257-111.986H431.974c-94.972 0-127.166 28.912-132.583 111.787l-79.708-0.036c-62.821 0-113.739 42.722-113.739 95.407v5.783c0 47.775 41.864 87.351 96.505 94.318v458.211c0 112.527 34.09 130.682 133.449 130.682h357.587c107.116 0 142.285-26.868 142.285-130.682V371.953c60.202-1.169 80.179-65.405 82.179-93.324-2.478-52.614-50.669-102.688-111.848-102.688z m-374.127-57.705h165.439c62.157 0 81.858 5.994 86.148 57.649l-329.492-0.149c1.98-49.8 13.479-57.5 77.905-57.5z m261.511 787.536H335.898c-80.133 0-78.302-5.002-78.302-76.378v-457.14l523.026-0.248v457.388c0 74.236-9.681 76.378-87.137 76.378z m112.616-582.797l-586.418 3.036c-32.368 0-58.592-22.009-58.592-49.146v-5.783c0-27.145 26.224-49.151 58.592-49.151l586.418 3.019c32.368 0 56.01 21.121 56.01 49.014 0 27.884-23.642 49.011-56.01 49.011z" p-id="3329" fill="#707070"></path></svg>
        <span>删除</span>
      </div>
      <div class="icon-button arr-forward" onclick="window['${'arrEdit' + tempKey}'].arrEditForward()">
        <svg t="1666596426111" class="icon" style="transform:rotate(180deg);" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15698" width="32" height="32"><path d="M793.1392 544l-198.8096 198.8096a32 32 0 0 0 45.2608 45.2608l249.856-249.856a37.12 37.12 0 0 0 0-52.48l-249.856-249.8048a32 32 0 0 0-45.2608 45.2608l198.8096 198.8096H153.6a32 32 0 1 0 0 64h639.5392z" fill="#5A5A68" p-id="15699"></path></svg>
        <span>前移</span>
      </div>
      <div class="icon-button arr-backward" onclick="window['${'arrEdit' + tempKey}'].arrEditBackward()">
        <svg t="1666596426111" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15698" width="32" height="32"><path d="M793.1392 544l-198.8096 198.8096a32 32 0 0 0 45.2608 45.2608l249.856-249.856a37.12 37.12 0 0 0 0-52.48l-249.856-249.8048a32 32 0 0 0-45.2608 45.2608l198.8096 198.8096H153.6a32 32 0 1 0 0 64h639.5392z" fill="#5A5A68" p-id="15699"></path></svg>
        <span>后移</span>
      </div>
    </div>
    <div class="arr-show-box"></div>
  </div>`
  setTimeout(() => {
    this.create()
  }, 100)
}
arrEdit.prototype.create = function (selectIndex) {
  let tempValue = ''
  if (selectIndex) selectIndex = parseInt(selectIndex)
  for (let index = 0; index < this.value.length; index++) {
    const element = this.value[index];
    if ((selectIndex != undefined ? selectIndex : this.activeIndex) == index) {
      this.activeIndex = index
      tempValue += `<span class="active" onclick="window['${'arrEdit' + this.key}'].create(${index})">${element}</span>`
    } else {
      tempValue += `<span onclick="window['${'arrEdit' + this.key}'].create(${index})">${element}</span>`
    }
  }
  if (this.activeIndex == 0) {
    this.domEl.querySelector('.arr-forward').style.display = 'none'
  } else {
    this.domEl.querySelector('.arr-forward').style.display = ''
  }
  if (this.activeIndex == (this.value.length - 1)) {
    this.domEl.querySelector('.arr-backward').style.display = 'none'
  } else {
    this.domEl.querySelector('.arr-backward').style.display = ''
  }
  this.domEl.querySelector('.arr-show-box').innerHTML = tempValue
}
arrEdit.prototype.arrEditClear = function () {
  this.value = []
  this.activeIndex = 0
  if (confirm('是否清空所有项目?')) {
    this.create()
  }
}
arrEdit.prototype.arrEditDelete = function () {
  this.value.splice(this.activeIndex, 1)
  this.activeIndex = 0
  this.create()
}
arrEdit.prototype.setArr = function (arr) {
  this.value = arr
  this.activeIndex = 0
  this.create()
}
arrEdit.prototype.arrEditForward = function () {
  if (!this.value[this.activeIndex - 1]) return
  let temp = this.value[this.activeIndex]
  this.value[this.activeIndex] = this.value[this.activeIndex - 1]
  this.value[this.activeIndex - 1] = temp
  this.activeIndex = this.activeIndex - 1
  this.create()
}
arrEdit.prototype.arrEditBackward = function () {
  if (!this.value[this.activeIndex + 1]) return
  let temp = this.value[this.activeIndex]
  this.value[this.activeIndex] = this.value[this.activeIndex + 1]
  this.value[this.activeIndex + 1] = temp
  this.activeIndex = this.activeIndex + 1
  this.create()
}
arrEdit.prototype.add = function (value) {
  if (this.value.includes(value)) {
    alert('已经存在的数据!')
    return
  }
  this.value.push(value)
  this.create()
}

window.owoLoadList = []
// 加载已经载入的模块
document.querySelectorAll('script').forEach((scriptEl) => {
  window.owoLoadList.push(scriptEl.src)
})
function loadScript(url, callback) {
  if (window.owoLoadList.includes(url)) {
    if (callback) callback();
    return
  }
  window.owoLoadList.push(url)
  var script = document.createElement("script")
  script.type = "text/javascript";
  if (script.readyState) { //IE
      script.onreadystatechange = function () {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            if (callback) callback();
          }
      };
  } else { //Others
      script.onload = function () {
        if (callback) callback();
      };
  }
  script.src = url;
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

function loadCSS (url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";

  link.href = url;

  document.getElementsByTagName("head")[0].appendChild(link);
}
// 扫描复制按钮
document.querySelectorAll('.owo-copy').forEach((ele) => {
  loadScript('https://cunchu.site/owo/script/toast.js')
  loadScript('https://cunchu.site/owo/script/clipboard.min.js', () => {
    let temp = new ClipboardJS(ele, {
      text: function (trigger) {
        return trigger.innerText;
      },
    });
    temp.on('success', function (e) {
      owo.tool.toast('内容已复制')
    });
  })
})

if (window.owoStandard) window.owoStandard()
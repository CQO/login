window.owoAppKey = 0
window.owoAppFun = []
function sendAppMessage (type, data, callBack) {
  if (callBack) {
    window.owoAppFun[window.owoAppKey] = callBack
  }
  window.ReactNativeWebView.postMessage(JSON.stringify({"type":type,"data":data,"owoKey":callBack ? window.owoAppKey++ : -1}));
}
// {"type":"getData","url":"https://hq.sinajs.cn/list=sh600519","headers":{}}
document.addEventListener('message', function (e) {
  if (window.appMessageMode && window.appMessageMode != 'document') {return}
  window.appMessageMode = 'document'
  const temp = JSON.parse(e.data)
  switch (temp.type) {
    case 'owoAppCallBack':
      window.owoAppFun[temp.owoKey](temp.data)
    case 'owoTimer':
      if (window.owoTimer) {
        window.owoTimer()
      }
  }
});
window.addEventListener('message', function (e) {
  if (window.appMessageMode && window.appMessageMode != 'window') {return}
  window.appMessageMode = 'window'
  const temp = JSON.parse(e.data)
  switch (temp.type) {
    case 'owoAppCallBack':
      window.owoAppFun[temp.owoKey](temp.data)
      break
    case 'owoTimer':
      if (window.owoTimer) {
        window.owoTimer()
      }
  }
});
if (window.ReactNativeWebView) {
  sendAppMessage('isApp', '', (e) => {
    if (e) {
      window.isApp = true
      
    }
  })
}


const Tool = {
  wow:{
    isMillisecondStamp:function(num){if(num.length===10){return num*1000;}else if(num.length===13) {return num;}else {console.log(num+"不是一个标准的时间戳！");return false;}},
    ifStringGetElementById:function(target){if(typeof target==="string") {return document.getElementById(target);}else {return target;}},
  },
  text: {
    //分割字符串
    cutString:function(original,before,after,index) {
      index = index || 0;
      if (typeof index === "number") {
        const P = original.indexOf(before, index);
        if (P > -1) {
          if (after) {
            const f = original.indexOf(after, P + before.length);
            return (f>-1)? original.slice(P + before.toString().length, f):console.error("Tool [在文本中找不到 参数三 "+after+"]");
          } else {
            return original.slice(P + before.toString().length);
          }
        } else {
          console.error("Tool [在文本中找不到 参数一 " + before + "]");
          return
        }
      } else {
        console.error("Tool [sizeTransition:" + index + "不是一个整数!]");
      }
    },
    //根据一个基点分割字符串  实例：http://myweb-10017157.cos.myqcloud.com/20161212/%E7%BB%83%E4%B9%A0.zip
    cutStringPoint:function (original,str, before, after,order, index) {index = index || 0;if (typeof index === "number") {const O = original.indexOf(str, index);const P = (order[0]==="1")?original.lastIndexOf(before, O):original.indexOf(before, O);if (P > -1) {if (after) {let f ;switch (order[1]){case "1":f = original.indexOf(after, P + 1);break;case "2":f = original.indexOf(after, O + 1);break;case "3":f = original.lastIndexOf(after, O + 1);break;}return (f>-1)? original.slice(P + before.toString().length, f):console.error("Tool [在文本中找不到 参数三 "+after+"]");}else {return original.slice(P + before.toString().length);}}else {console.error("Tool [在文本中找不到 参数一 " + before + "]");}} else {console.error("Tool [sizeTransition:" + index + "不是一个整数!]");}},
    //分割字符串组
    cutStringArray:function(original,before,after,index){var aa=[],ab=0;while(original.indexOf(before,index)>0){aa[ab]=Tool.text.cutString(original,before,after,index);index=original.indexOf(before,index)+1;ab++;}return aa;},
    randomString:function(n){const str = 'abcdefghijklmnopqrstuvwxyz9876543210';let tmp = '',i = 0,l = str.length;for (i = 0; i < n; i++) {tmp += str.charAt(Math.floor(Math.random() * l));}return tmp;},
    replaceAll: function (temp, oString, nString) {
      if (!temp) return temp
      var startInd = -1
      while (temp.indexOf(oString, startInd) >= 0) {
        const findIndex = temp.indexOf(oString, startInd)
        temp = temp.substr(0, findIndex) + nString + temp.substr(findIndex + oString.length)
        startInd = findIndex + (nString.length - oString.length)
      }
      return temp
    },
    countSubstr: function (temp, oString) {
      if (!temp) return temp
      var startInd = -1
      var tempIndex = 0
      while (temp.indexOf(oString, startInd) >= 0) {
        const findIndex = temp.indexOf(oString, startInd)
        startInd = findIndex + 1
        tempIndex++
      }
      return tempIndex
    }
  },
  num: {
    randomNum: function (minNum,maxNum){ 
      switch(arguments.length){ 
        case 1: 
          return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
        default: 
          return 0; 
        break;
      }
    }
  }
}
    
function postData(url, headers, body, callBack) {
  if (window.isApp) {
    sendAppMessage('owoDecode', url, (url) => {
      sendAppMessage('postData', {
        "url": url,
        "headers": headers,
        "data": body
      }, (result) => {
        if (callBack) callBack(result)
      })
    })
  } else if (window.owoPC) {
    // 发送同步消息
    const replayMessage = window.electron.ipcRenderer.sendSync("postData", {url, headers, body});
    if (callBack) callBack(replayMessage)
  } else {
    const temp = {type: "post", url, headers, body}
    fetch("//service-g9parw23-1256763111.bj.apigw.tencentcs.com/release/requset", {method: 'POST',body: JSON.stringify(temp)})
      .then(response => response.json())
      .then(result => {callBack(result.data)})
      .catch(error => console.log('error', error));
  }
}

function requestData (url, options, callBack) {
  sendAppMessage('requestData', {
    "url": url,
    "options": options
  }, (result) => {
    if (callBack) callBack(result.body, result.headers)
  })
}
function getData(url, headers, callBack) {
  if (window.isApp) {
    console.log('app提交')
    sendAppMessage('owoDecode', url, (url) => {
      sendAppMessage('getData', {
        "url": url,
        "headers": headers
      }, (result) => {
        console.log(result)
        if (callBack) callBack(result)
      })
    })
  } else if (window.owoPC) {
    const replayMessage = window.electron.ipcRenderer.sendSync('getData', {url, headers});
    if (callBack) callBack(replayMessage)
  } else {
    const temp = {type: "get", url, headers}
    fetch("//service-g9parw23-1256763111.bj.apigw.tencentcs.com/release/requset", {method: 'POST',body: JSON.stringify(temp)})
     .then(response => response.json())
     .then(result => {
        if (result.data && callBack) {
          callBack(result.data)
        }
     })
     .catch(error => console.log('error', error));
  }
  
}

if (window.isApp) {
  alert('app有更新，请使用最新app!');
  location.href = 'https://cunchu.site/app/%E8%84%9A%E6%9C%AC%E5%8A%A9%E6%89%8B.apk'
}

let ws = null

function loadJS(url, callback){
  var script = document.createElement('script'),
  fn = callback || function(){};
  script.type = 'text/javascript';
  if(script.readyState){
    script.onreadystatechange = function(){
      if( script.readyState == 'loaded' || script.readyState == 'complete' ){
        script.onreadystatechange = null;
        fn();
      }
    };
  } else{
    //其他浏览器
    script.onload = function(){
      fn();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

let owoSocket = null
let owoSocketName = ''
function initWebsockets(name) {
  console.log(`注册Websockets:${name}`)
  owoSocket = new WebSocket('wss://websockets.going.run:8083')
  owoSocket.onclose = function(evt) {
    document.title = '连接已断开30秒后重试!'
    setTimeout(() => {
    location.reload();
    }, 30000);
  };
  // 登陆成功发送注册请求
  owoSocket.onopen = function () {
    owoSocketName = name
    owoSocket.send(JSON.stringify({
      "route": "login",
      "admin": true,
      "name": owoSocketName
    }))
  }
  owoSocket.onmessage = (evt) => { 
    var message = evt.data;
    // alert("数据已接收...");
    message = JSON.parse(message)
    if (route) route(message)
  }
}

function socketSend (value, type) {
  if (!owoSocket) {
    alert('服务器未连接!')
    return
  }
  owoSocket.send(JSON.stringify({
    "route": type ? type : "message",
    "name": owoSocketName,
    "value": value
  }))
}

const APPID = 'wx906ab226fc45606b'
const redirect_uri = 'https://demos.run/debuger/index.html'
const serverIP = "https://pay.hanshu.run"
// 服务号
const weixinUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_base#wechat_redirect`;

// 获取用户信息成功后的回调
function userInfoCallBack (userinfo) {
  window.openid = userinfo.openid
}

function getToken (code) {
  console.log(code)
  fetch(serverIP + "/getUserInfo?appid=" + APPID + "&code=" + code, {method: 'GET',redirect: 'follow'})
    .then(response => response.json())
    .then(result => {
      console.log(result)
      data = typeof result == 'string' ? JSON.parse(result) : result
      if (data.errcode == '40163') {
        window.location.href = weixinUrl
      }
      
      window.userinfo = data
      // 清除URL里的参数
      var url = window.location.href;
      var valiable = url.split('?')[0];
      window.history.pushState({},0,valiable);
      userInfoCallBack(window.userinfo)
    })
    .catch(error => console.log('error', error));
}
// 判断是否微信登陆
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (/micromessenger/.test(ua)) {
    return true;
  }
  return false;
}
// 判断是否为微信
if (isWeiXin()) {
  var _location = window.location.href;
  function getParams(str) {
    var reg = /([^&?#]+)=([^&?#]+)/g;
    var obj = {};
    str.replace(reg, function () {
      obj[arguments[1]] = arguments[2];
    })
    return obj;
  }
  var params = getParams(_location);

  if (params.code) {
    // 获取微信信息
    getToken(params.code)
    window.userCode = params.code
  } else {
    window.location.href = weixinUrl;
  }
}

// 日志组件
function log (el, max) {
  if (el) {
    el.innerHTML = '<ul class="log-panel"></ul>'
    setTimeout(() => {
      this.$el = el.querySelector('.log-panel')
    }, 0);
  }
  this.max = max || 100
  this.list = []
  this.add = function (text) {
    if (!text) text = ''
    var time = new Date();
    let hours = time.getHours()
    if (hours <= 9) hours = '0' + hours
    let minutes = time.getMinutes()
    if (minutes <= 9) minutes = '0' + minutes
    let seconds = time.getSeconds()
    if (seconds <= 9) seconds = '0' + seconds
    this.list.push([`${hours}:${minutes}:${seconds}`, text])
    if (this.list.length > this.max) {
      this.list = this.list.slice(1)
    }
    this.make()
  }
  this.make = function () {
    let newHtml = ''
    for (let index = this.list.length - 1; index >= 0; index--) {
      const element = this.list[index];
      newHtml += `<li><span>${element[0]}</span>${element[1]}</li>`
    }
    setTimeout(() => {
      this.$el.innerHTML = newHtml
    }, 0);
  }
}

owo.loading = {
  show: function () {
    if (document.querySelector('#owoLoading')) {
      document.querySelector('#owoLoading').style.display = 'block'
      return
    }
    container = document.body
    var owoLoading = document.createElement("div")
    owoLoading.setAttribute("id", "owoLoading")
    owoLoading.setAttribute("class", "owo-loading")
    // 设置样式
    owoLoading.style.cssText = "position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.85);"

    owoLoading.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="translate(20 50)">
      <circle cx="0" cy="0" r="6" fill="#0051a2">
        <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
      </circle>
      </g><g transform="translate(40 50)">
      <circle cx="0" cy="0" r="6" fill="#1b75be">
        <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
      </circle>
      </g><g transform="translate(60 50)">
      <circle cx="0" cy="0" r="6" fill="#408ee0">
        <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
      </circle>
      </g><g transform="translate(80 50)">
      <circle cx="0" cy="0" r="6" fill="#89bff8">
        <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
      </circle>
      </g>
    </svg>
`
    container.appendChild(owoLoading)
  },
  hide: function () {
    if (document.querySelector('#owoLoading')) document.querySelector('#owoLoading').style.display = 'none'
  }
}

function getLocalTime(nS) {
  if (!nS) return ''
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,'');  
}

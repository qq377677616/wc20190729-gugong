

//本地存储
const setStorages = (keys, datas) => {
  if (keys && datas) {
    wx.setStorage({
      key: keys,
      data: datas,
      success: function (res) {
        console.log('异步保存成功')
      }
    })
  } else {
    console.log("没有key或没属性")
  }
}
//获取本地存储
const getStorages = a => {
  var info = wx.getStorageSync(a)
  var userinfo = info ? info : null;
  return userinfo;
}
//富文本解析
const convertHtmlToText = (inputText) => {
  var returnText = "" + inputText;
  returnText = returnText.replace(/<\/div>/ig, '\r\n');
  returnText = returnText.replace(/<\/li>/ig, '\r\n');
  returnText = returnText.replace(/<li>/ig, ' * ');
  returnText = returnText.replace(/<\/ul>/ig, '\r\n');
  //-- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

  //-- remove P and A tags but preserve what's inside of them
  returnText = returnText.replace(/<p.*?>/gi, "\r\n");
  returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //-- remove all inside SCRIPT and STYLE tags
  returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g, '');

  //-- get rid of html-encoded characters:
  returnText = returnText.replace(/ /gi, " ");
  returnText = returnText.replace(/&/gi, "&");
  returnText = returnText.replace(/"/gi, '"');
  returnText = returnText.replace(/</gi, '<');
  returnText = returnText.replace(/>/gi, '>');

  return returnText;
}

//获取日期
const getDateStr = (AddDayCount, type) => {
  //AddDayCount 几天后
  var dd = new Date();
  //dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();

  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  if (type == 1) {
    return m + "月" + d + "日";
  }
  return y + "-" + m;
}

//全部用POST
const Post = (api, params, callback) => {
  var apiurl = 'https://game.flyh5.cn/game/wx7c3ed56f7f792d84/temple_palace/public/index.php/' + api;
  wx.request({
    url: apiurl,
    data: params,
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (data) {
      callback(data);
    },
    fail: function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '请求接口超时',
      })
    }
  })
}
//alert提示
const alert = (str, icon = "none", duration = 2000, callback) => {
  wx.showToast({
    title: str,
    icon: icon,
    duration: duration,
    success: () => {
      if (!callback) return
      setTimeout(() => { callback() }, duration)
    }
  })
}
//loading提示框
const loading = (str = '加载中', mask = false) => {
  wx.showLoading({
    title: str,
    mask: mask
  })
}
//关闭loading提示框
const loading_h = () => {
  wx.hideLoading()
}
//确认/取消弹框
const confirm = (title = "确认", content = "当前已使用道具将作废", confirms = "确认,#333", cancels = "取消,#333") => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: cancels ? true : false,
      cancelText: cancels ? cancels.split(",")[0] : '取消',
      cancelColor: cancels ? cancels.split(",")[1] : '#333',
      confirmText: confirms.split(",")[0],
      confirmColor: confirms.split(",")[1],
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}
//获取dom节点
const getDom = (ele, callback) => {
  const query = wx.createSelectorQuery()
  query.select(ele).boundingClientRect()
  query.selectViewport().scrollOffset()
  query.exec(function (res) {
    callback(res)
  })
}
//获取手机系统信息
const getSystem = () => {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success(res) {
        resolve(res)
      }
    })
  })
}
//可返回跳转
const jump_navigateTo = (url) => {
  wx.navigateTo({
    url: url
  })
}
//不可返回跳转 
const jump_redirectTo = (url) => {
  wx.redirectTo({
    url: url
  })
}
//预览图片
const previewImage = (urls, current) => {
  wx.previewImage({
    urls: urls,
    current: current
  })
}
//canvas绘图
const canvasImg = (options, callback) => {
  const ctx = wx.createCanvasContext(options.canvasId)
  console.log(ctx)
  if (options.imgList.length > 0) {
    for (let i = 0; i < options.imgList.length; i++) {
      let _curimg = options.imgList[i]
      ctx.drawImage(_curimg.url, _curimg.imgX, _curimg.imgY, _curimg.imgW, _curimg.imgH)
    }
    //ctx.draw()
  }
  if (options.textList.length > 0) {
    for (let i = 0; i < options.textList.length; i++) {
      let _curText = options.textList[i]
      // { string: '我倡议增加免疫力唱鹰牌', color: '#fff', fontSize: '40px', fontFamily: 'Arial', textX: 350, textY: 270 }
      //ctx.save()
      ctx.setFontSize(_curText.fontSize)
      ctx.setFillStyle(_curText.color)
      ctx.setTextAlign('left')
      ctx.setTextBaseline('top')
      ctx.fillText(_curText.string, _curText.textX, _curText.textY)
      if (_curText.bold) {
        ctx.fillText(_curText.string, _curText.textX, _curText.textY - 0.5)
        ctx.fillText(_curText.string, _curText.textX - 0.5, _curText.textY)
      }
      ctx.fillText(_curText.string, _curText.textX, _curText.textY)
      if (_curText.bold) {
        ctx.fillText(_curText.string, _curText.textX, _curText.textY + 0.5)
        ctx.fillText(_curText.string, _curText.textX + 0.5, _curText.textY)
      }

    }
    //ctx.draw(true)
  }
  ctx.draw(true, () => {
    if (callback) {
      console.log(options.canvasId)
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        // width: 50,
        // height: 50,
        // destWidth: 100,
        // destHeight: 100,
        canvasId: options.canvasId,
        success(res) {
          callback(res.tempFilePath)
        }
      })
    }
  })
}
//获取月天数
const getMonthDayTotal = (year, month) => {
  if (typeof year == "undefined" && typeof month == "undefined"){
    let date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    console.log(month)
  }
  let nextMonth = month;
  let d = new Date(year, nextMonth, 0);
  return d.getDate();
}
//时间转换
const getDuration = (second) => {
  let days = Math.floor(second / 86400);
  let hours = Math.floor((second % 86400) / 3600);
  let minutes = Math.floor(((second % 86400) % 3600) / 60);
  // var seconds = Math.floor(((second % 86400) % 3600) % 60);
  let duration = days + "天" + hours + "小时" + minutes + "分";
  return duration;
}
module.exports = {
  setStorages, setStorages,                   //本地存储
  getStorages: getStorages,                   //获取本地存储
  convertHtmlToText: convertHtmlToText,       //富文本解析
  getDateStr: getDateStr,                     //获取相差日期
  alert: alert,                               //alert提示
  Post: Post,                                 //POST请求
  loading: loading,                           //loading提示框
  loading_h: loading_h,                       //关闭loading提示框
  confirm: confirm,                           //确认/取消弹框
  getDom: getDom,                             //获取dom节点
  getSystem: getSystem,                       //获取手机系统信息
  jump_navigateTo: jump_navigateTo,           //可返回跳转
  jump_redirectTo: jump_redirectTo,           //不可返回跳转
  previewImage: previewImage,                 //预览图片
  canvasImg: canvasImg,                       //canvas绘图
  getMonthDayTotal: getMonthDayTotal,          //获取月天数
  getDuration: getDuration                    //时间转换
}

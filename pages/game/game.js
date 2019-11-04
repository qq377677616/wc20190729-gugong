// pages/webview/webview.js
import tool from '../../utils/publics/tool.js'
const wxb = require('../../utils/wxb.js')
Page({
  //页面的初始数据
  data: {
    //前端的h5链接地址
    h5Url: 'https://gameh5.flyh5.cn/resources/game/sh_game/pear/main.html',
    id:null
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options.url + "?openid=" + wxb.getStorages("openid"))
    this.setData({
      id: options.id,
      h5Url: options.url + "?openid=" + wxb.getStorages("openid")
    })
    if (!wx.getStorageSync("user")) {
      tool.showModal("请先去授权", "你还未授权登录，请先去授权登录吧", "好的,#333", false).then(() => {
        tool.jump_back()
      })
    }
    let [_userInfo, _userId] = [wx.getStorageSync('user'), wx.getStorageSync("openid")]
    console.log("【缓存中的userInfo】", _userInfo)
    console.log("【缓存中的userId】", _userId)
    // let _h5Url = `${this.data.h5Url}?nickName=${encodeURIComponent(_userInfo.nickName)}&avatarUrl=${_userInfo.avatarUrl}&openid=${_userId.openid}&phoneNumber=${_userInfo.phone}`
    let _h5Url = options.url + "?openid=" + wxb.getStorages("openid")
    this.setData({ h5Url: _h5Url })
    console.log("【最终跳转到h5的链接】", this.data.h5Url)
  },
  //通信事件
  bindmessage(e) {
    console.log("e.detail", e.detail)
    console.log("id==", this.data.id)
    wxb.setStorages("Pid", this.data.id)
    console.log("【从h5传到小程序的分享内容：】")
    console.log(e.detail.data[0])
    this.setData({ shareContent: e.detail.data[0] })
    // let _h5Url = `${this.data.h5Url}#ShareOk`
    // this.setData({ h5Url: _h5Url })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(options) {
    console.log("onShareAppMessage", options)
    if (options.from == "menu") {
      let _h5Url = `${this.data.h5Url}#ShareOk${new Date().getTime()}`
      this.setData({ h5Url: _h5Url })
    }
    return this.data.shareContent
  }
})
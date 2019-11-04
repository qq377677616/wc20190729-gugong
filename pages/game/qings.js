// pages/game/noodles.js
const wxb = require('../../utils/wxb.js')
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 72,
    index0: 0,
    isi: true,
    t1: "",
    ons: "ons",
    exchange: false,
    is_fly: false,
    aimgn:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  onImageLoad() {
    this.data.aimgn++

    this.setData({
      aimgn: this.data.aimgn
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  xuan() {
    if (this.data.aimgn == 72){
    if (this.data.isi) {
      var a = 0
      clearInterval(timer);
      timer = setInterval(res => {
        a++;
        this.data.index0++;
        console.log(this.data.index0)
        if (this.data.index0 > 70) {
          // this.data.index0 = 0
          clearInterval(timer);
          this.setData({
            isi: false,
          })
          this.jump_btn()
        }
        this.setData({
          index0: this.data.index0
        })

      }, 50)
    }
    }
  },
  //确认
  quebtn() {
    if (this.data.is_fly) {
      wxb.jump_redirectTo("/pages/wish/wish?id=4")
    } else {
      wxb.jump_redirectTo("/pages/logs/logs?id=4")
    }

  },
  /***
   * 跳转祈福
   */
  jump_btn() {
    wxb.Post('foodapi/temple/limi_pass', { openid: wxb.getStorages("openid"), zd: 4 }, res => {
      console.log(res)
      if (res.data.code == 0) {
        var is_fly = false
        //var url = "/pages/logs/logs"
        if (res.data.data.is_fly === 1) {
          is_fly = true
          // url = "/pages/wish/wish"
        }
        this.setData({
          is_fly: is_fly,
          exchange: true,
        })

      } else {
        // this.setData({
        //   exchange: false
        // })
        wxb.jump_redirectTo("/pages/logs/logs?id=4")
      }
    })
    //wxb.jump_redirectTo("/pages/logs/logs")
  },
  //关闭弹窗
  jump_btns() {
    this.setData({
      t1: "on",
      ons: ""
    })
    wxb.alert("点击仙女，完成关卡")
  },
  jump_btns1() {
    this.setData({
      t1: "",
      ons: "ons"
    })
  },

  //关闭弹窗
  closes() {
    this.setData({
      exchange: false
    })
  },
})
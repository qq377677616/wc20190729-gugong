// pages/disclaimer/disclaimer.js
const app = getApp()
const wxb = require('../../utils/wxb.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_frame:false
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
  /****
   *跳转首页
   */
  jumpMian(){
    if(this.data.is_frame){
      wxb.jump_redirectTo("/pages/index/index")
      // wxb.Post('foodapi/temple/first_jr', { openid:wxb.getStorages("openid")},res=>{
      //   console.log(res)
      //   if(res.data.code == 0){
      //     wxb.setStorages("firstjr", 2)
      //     wxb.jump_redirectTo("/pages/index/index")
      //   }
      // })
      // 
    }else{
      wxb.alert("请勾选免责申明")
    }
  },
  /**
   * 免责
   */
  isFrame(){
    let is = !this.data.is_frame
    this.setData({
      is_frame:is
    })
  }
})
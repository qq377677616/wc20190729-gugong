// pages/shop/Ashop.js
const app = getApp()
const wxb = require('../../utils/wxb.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jf_all: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.Post("foodapi/temple/integral_bs_index", { openid: wxb.getStorages("openid") }, res => {
      console.log(res)
      this.setData({
        jf_all: res.data.data.jf_all,
        list: res.data.data.res
      })
    })
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

  /***
   * 兑换按钮
   */
  exchange: function (e) {
    console.log(e.currentTarget.dataset.id)
    // console.log(e.currentTarget.dataset.xh)
    wxb.Post('foodapi/temple/integral_bsdh', { openid: wxb.getStorages("openid"), zk_id: e.currentTarget.dataset.id, num:1}, res => {
      console.log(res)
      wxb.alert(res.data.msg)
      if (res.data.code == 0) {
        this.data.jf_all += parseInt(res.data.data.get_jf)
        this.setData({
          jf_all: this.data.jf_all
        })
      }
    })
  }
})
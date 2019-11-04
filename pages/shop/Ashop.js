// pages/shop/Ashop.js
const app = getApp()
const wxb = require('../../utils/wxb.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jf_all:0,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.Post("foodapi/temple/integral_shop", { openid: wxb.getStorages("openid")},res=>{
      console.log(res)
      
      if(res.data.code == 0){
        this.setData({
          jf_all: res.data.data.jf_all,
          list: res.data.data.jf_shop
        })
      }

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
  exchange:function(e){
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.xh)
    wxb.Post('foodapi/temple/integral_convert', { openid: wxb.getStorages("openid"), id: e.currentTarget.dataset.id},res=>{
      // console.log(res)
      if(res.data.code == 0){
        this.data.jf_all -= e.currentTarget.dataset.xh
        this.setData({
          jf_all: this.data.jf_all
        })
        if (e.currentTarget.dataset.id == 1){
          wxb.alert("兑换抽奖次数一次")
        }else{
          wxb.alert("购买成功，进我的道具里查看装备")
        }
        
      }else{
        wxb.alert(res.data.msg)
      }
      
    })
  },
  //无返回路由跳转
  jump_redire(e) {
    wxb.jump_redirectTo("/pages/logs/logs")
  },
  //我的道具
  jump_redire1(){
    wxb.jump_redirectTo("/pages/Iprop/Iprop")
  }
})
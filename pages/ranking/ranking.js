// pages/ranking.js
const app = getApp()
const wxb = require('../../utils/wxb.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    user:{},
    my_rank:"",
    step_all:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.Post('foodapi/temple/rank', { openid: wxb.getStorages("openid")},res=>{
      //console.log(res)
      if(res.data.code == 0){
        let user = wxb.getStorages("user")
        console.log(user)
        this.setData({
          arr: res.data.data.rank,
          user: user,
          my_rank: res.data.data.my_rank,
          step_all: res.data.data.step_all
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loadData(){
    console.log('loadData')
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
  //无返回路由跳转
  jump_redire(e) {
    wxb.jump_redirectTo("/pages/logs/logs")
  }
})
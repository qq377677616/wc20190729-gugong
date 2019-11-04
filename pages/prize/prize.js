// pages/prize/prize.js
const app = getApp()
const wxb = require('../../utils/wxb.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    close:false,
    aIndex:null,
    ids:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.Post('foodapi/temple/my_prize', { openid: wxb.getStorages("openid")},res=>{
      console.log(res)
      if (res.data.code == 0){
        this.setData({
          list: res.data.data.my_prize
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
  /****
   * 领奖
   */
  collar(e){
    console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.id)
    // wxb.Post('')
    if (e.currentTarget.dataset.is == 0){
      this.setData({
        aIndex: e.currentTarget.dataset.index,
        close: true,
        ids: e.currentTarget.dataset.id
      })
    }
    
  },
  /****
   * 关闭弹窗
   */
  close(){
    this.setData({
      close:false
    })
  },
  /***
   * 表单提交
   */
  back_houtai(e){
    console.log(this.data.id)
    if (e.detail.value.tel && e.detail.value.name && e.detail.value.dar){
      wxb.Post("foodapi/temple/prize_address", { 
        openid: wxb.getStorages("openid"), 
        name: e.detail.value.name,
        mobile: e.detail.value.tel,
        address: e.detail.value.dar,
        id:this.data.ids
      },res=>{
        let list = this.data.list
        wxb.alert(res.data.msg)
        if(res.data.code == 0){
          list[this.data.aIndex].is_lq = 1;
          this.setData({
            list: list,
            close:false
          })

        }
      })
    }
  },
  //无返回路由跳转
  jump_redire(e) {
    wxb.jump_redirectTo("/pages/horse/horse")
  }
})
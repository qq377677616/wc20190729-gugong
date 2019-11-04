// pages/Iprop/Iprop.js
// pages/ranking.js
const app = getApp()
const wxb = require('../../utils/wxb.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    zuo_arr:[],
    kai_arr:[],
    tou_arr:[]
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
    wxb.Post('foodapi/temple/my_equip', { openid: wxb.getStorages("openid") }, res => {
      console.log(res)
      
      if (res.data.code == 0) {
        var arr = res.data.data;
        for(let i=0; i<arr.length; i++){
          arr[i].end_time = wxb.getDuration(arr[i].end_time)
        }
        console.log(arr)
        this.setData({
          arr: arr
        })
        this.inits(this.data.arr)
        
      }
    })
  },
  loadData() {
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
  /****
   * 装备
   */
  equipment:function(e){
    console.log(e.currentTarget.dataset.leng)
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.name)
    if (e.currentTarget.dataset.status == 2){
      return;
    } else if (e.currentTarget.dataset.status == 1 && e.currentTarget.dataset.leng != 1){
      wxb.confirm().then(a => {
        if (a) {
          wxb.Post('foodapi/temple/my_equip_click', { openid: wxb.getStorages("openid"), id: e.currentTarget.dataset.id }, res => {
            console.log(res)
            wxb.alert(res.data.msg)
            if (res.data.code == 0) {
              //if (e.currentTarget.dataset.name == )
              console.log(this.data[e.currentTarget.dataset.name])
              let arr = [];
              for (let i = 0; i < this.data[e.currentTarget.dataset.name].length; i++) {

                if (this.data[e.currentTarget.dataset.name][i].status == 1) {
                  if (this.data[e.currentTarget.dataset.name][i].id == e.currentTarget.dataset.id) {
                    let a = this.data[e.currentTarget.dataset.name][i];
                    a.end_time = "2天23小时59分"
                    a.status = 2
                    arr.push(a)
                  } else {
                    arr.push(this.data[e.currentTarget.dataset.name][i])
                  }
                }
              }
              console.log(arr)
              if (e.currentTarget.dataset.name == "zuo_arr") {
                this.setData({
                  zuo_arr: arr
                })
              } else if (e.currentTarget.dataset.name == "kai_arr") {
                this.setData({
                  kai_arr: arr
                })
              } else if (e.currentTarget.dataset.name == "tou_arr") {
                this.setData({
                  tou_arr: arr
                })
              }
              // this.setData({
              //   e.currentTarget.dataset.name:arr
              // })
            }
          })
        }
      })
    } else if (e.currentTarget.dataset.status == 1 && e.currentTarget.dataset.leng == 1){
      wxb.Post('foodapi/temple/my_equip_click', { openid: wxb.getStorages("openid"), id: e.currentTarget.dataset.id }, res => {
        console.log(res)
        wxb.alert(res.data.msg)
        if (res.data.code == 0) {
          //if (e.currentTarget.dataset.name == )
          console.log(this.data[e.currentTarget.dataset.name])
          let arr = [];
          for (let i = 0; i < this.data[e.currentTarget.dataset.name].length; i++) {

            if (this.data[e.currentTarget.dataset.name][i].status == 1) {
              if (this.data[e.currentTarget.dataset.name][i].id == e.currentTarget.dataset.id) {
                let a = this.data[e.currentTarget.dataset.name][i];
                a.end_time = "2天23小时59分"
                a.status = 2
                arr.push(a)
              } else {
                arr.push(this.data[e.currentTarget.dataset.name][i])
              }
            }
          }
          console.log(arr)
          if (e.currentTarget.dataset.name == "zuo_arr") {
            this.setData({
              zuo_arr: arr
            })
          } else if (e.currentTarget.dataset.name == "kai_arr") {
            this.setData({
              kai_arr: arr
            })
          } else if (e.currentTarget.dataset.name == "tou_arr") {
            this.setData({
              tou_arr: arr
            })
          }
          // this.setData({
          //   e.currentTarget.dataset.name:arr
          // })
        }
      })
    }
  },
  /****
   * init每次刷新
   */
  inits(data){
    let zuo_arr = [], kai_arr = [], tou_arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].equip_status == 1) {
        zuo_arr.push(data[i])
      } else if (data[i].equip_status == 2) {
        kai_arr.push(data[i])
      } else if (data[i].equip_status == 3) {
        tou_arr.push(data[i])
      }
    }
    this.setData({
      zuo_arr: zuo_arr,
      kai_arr: kai_arr,
      tou_arr: tou_arr
    })
  },
  //返回按钮
  jump_a(){
    wxb.jump_redirectTo("/pages/shop/Ashop")
  }
})
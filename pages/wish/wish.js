// pages/wish/wish.js
const wxb = require('../../utils/wxb.js')
var timer;
var isao = false;
var arr = [
  { id: 1, text:"发际线不后退"},
  { id: 2, text: "走向人生巅峰" },
  { id: 3, text: "既能朝9晚5也能说走就走，拒绝996" },
  { id: 4, text: "瘦成一道闪电" },
  { id: 5, text: "一夜暴富" },
  { id: 6, text: "做一个才华与美貌并重的女纸" },
  { id: 7, text: "不再熬夜，快乐养生" },
  { id: 8, text: "每天睡到自然醒，数钱数到手抽筋" },
  { id: 9, text: "考的全会，蒙的全对" },
  { id: 10, text: "职场升级自带加速器" },
  { id: 11, text: "养猫养狗，生活我有" },
  { id: 12, text: "秒变“贪吃不长肉”体质" },
  { id: 13, text: "身心健康吃嘛嘛香" },
  { id: 14, text: "锦鲤附体，吉星高照" },
  { id: 15, text: "和凡凡一起吃大碗宽面" },
  { id: 16, text: "往后余生有酒有钱" },
  { id: 17, text: "越努力越幸运" },
  { id: 18, text: "爱笑的宝宝运气不会太差" },
  { id: 19, text: "家里有矿" },
  { id: 20, text: "敢想敢爱敢追梦" },
  { id: 21, text: "爱豆演唱次次内场前排" },
  { id: 22, text: "达成小目标，赚他一个亿" }
]
Page({

  /**
   * 页面的初始数据
   */

  data: {
    aArr:[],
    zd_id:"",
    texts:"",
    bjindex:58,
    isi:true,
    num: 0,
    onsaaa:"",
    fangsas:true,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zd_id: options.id
    })
    console.log(wxb.getStorages("openid"))
    this.xuansa()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      aArr: getRandomArrayElements(arr, 3)
    })
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
  //点击选择 this.data.zd_id
  xuans(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      texts: arr[e.currentTarget.dataset.id - 1].text
    })
    
  },
  random(){
    this.setData({
      aArr: getRandomArrayElements(arr, 3)
    })
  },
  btns(){
    if (this.data.texts){
      wxb.Post('foodapi/temple/fly', { 
        openid: wxb.getStorages('openid'), 
        content: this.data.texts,
        zd:1
      },res=>{
        this.setData({
          fangsas:false,
          onsaaa:"ons"
        })
        console.log(res)
        setTimeout(() => {
  
            if (res.data.code == 0) {
              wxb.alert(res.data.msg)
              wxb.jump_redirectTo("/pages/logs/logs?id=" + this.data.zd_id)
            } else {
              wxb.alert(res.data.msg)
              wxb.jump_redirectTo("/pages/logs/logs?id=" + this.data.zd_id)
            }
          
        }, 5000)


      })
    }else{
      wxb.alert("请选择心愿或者输入心愿")
    }

  },
  onImageLoad(e) {
    var num = this.data.num + 1
    this.setData({
      num: num
    })
    if (num == 58){
      this.xuansa()
    }

  },

  xuansa(){
    if (wxb.getStorages("openid")) {
      var a = 0
      clearInterval(timer);
      timer = setInterval(res => {
        a++;
        this.data.index0++;
        if (this.data.index0 > 56) {
          this.data.index0 = 0;
          a = 0;
        }
        this.setData({
          index0: a
        })
      }, 50)
    }
  }
})
function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}
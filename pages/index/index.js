//index.js
//获取应用实例
const app = getApp()
const wxb = require('../../utils/wxb.js')
import mta from '../../utils/mta_analysis.js'
var timer;
Page({
  data: {
    more:false,//遮罩控制器
    moreclass:true,
    ruleIs:false,//规则开关
    exchangeIs:false,
    lavelArr:{},
    zhuangs:"",
    zk_id:null,
    h_bj:"",
    data:{},
    bjindex:52,
    isi:true,
    num:0,
    index0: 0,
    isshows:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (!wxb.getStorages("openid")) {
      this.setData({
        isshows: true
      })
    }
    mta.Page.init()//腾讯统计
    var openids = wxb.getStorages("openid") ? wxb.getStorages("openid") : "";
    
    wxb.Post('foodapi/temple/index', { openid: openids},res=>{
      console.log(res)
      if(res.data.code == 0){
        this.setData({
          h_bj: "home_bj" + res.data.data.percent,
          data: res.data.data
        })
      }
    })
  },
  getStep(e){
    wx.login({
      success: res => {
        console.log(res)
        wxb.Post("foodapi/temple/getCode", { code: res.code},data => {
          console.log(data)
          if(data.data.code == 0){
            wxb.setStorages("openid", data.data.data.openid)
            wxb.setStorages("is_yk", data.data.data.is_yk)
            let user = { nickname: data.data.data.nickname, avatarUrl: data.data.data.avatarUrl} 
            wxb.setStorages("user", user)
            wx.getWeRunData({
              success: resa => {
                wxb.Post('foodapi/temple/step', { encryptedData: resa.encryptedData, iv: resa.iv, openid: data.data.data.openid },
                  resb => {
                    console.log(resb)
                    wxb.jump_redirectTo("/pages/logs/logs")
                  }
                )
              },
              fail: err => {
                wx.showModal({
                  title: '温馨提示',
                  content: '为了提高您的游戏体验，请点击开启授权',
                  cancelText: "进入地图",
                  confirmText: "继续开启",
                  success: showres => {
                    console.log(showres)
                    if (showres.confirm) {
                      wx.openSetting({
                        success: showres1 => {
                          console.log(showres1.authSetting['scope.werun'])
                          if (showres1.authSetting['scope.werun']){
                            wxb.setStorages("firstsoj", true)
                          }
                        }
                      })
                    } else if (showres.cancel) {
                      wxb.jump_redirectTo("/pages/logs/logs")
                    }
                    // wxb.setStorages("openid", data.data.data.openid)
                    // if (showres.confirm) {
   
                    // }

                  }
                })
              }
            })
          }
          
        }) 
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    if (wxb.getStorages("openid")){
      wxb.jump_redirectTo("/pages/logs/logs");
      return;
    }
    if (e.detail.userInfo){
      console.log("user")
      wxb.setStorages("user", e.detail.userInfo)
      this.setData({
        moreclass: false
      })
      wx.login({
        success: res => {
          console.log(res)
          wxb.Post("foodapi/temple/getCode", { code: res.code, headimg: e.detail.userInfo.avatarUrl, nickname: e.detail.userInfo.nickName }, data => {
            console.log(data)
            if (data.data.code == 0) {
              var firstjr = data.data.data.first_jr
              wx.getWeRunData({
                success:resa=>{
                  wxb.setStorages("exchangeIs", "3")
                  wxb.Post('foodapi/temple/step', { encryptedData: resa.encryptedData, iv: resa.iv, openid: data.data.data.openid }, resb => {
                    if(resb.data.code == 0){
                      this.setData({
                        step_data: resb.data.data,
                        exchangeIs:true
                      })
                    }
                    wxb.setStorages("openid", data.data.data.openid)
                    wxb.setStorages("firstjr", 1)
                    wxb.jump_redirectTo("/pages/logs/logs")
                    console.log(resb)
                  })
                },
                fail:err=>{
                  wx.showModal({
                    title: '警告',
                    content: '您点击了拒绝授权,将无法正常获取您步数，无法进行体验。',
                    success: showres => {
                      wxb.setStorages("openid", data.data.data.openid)
                      if (showres.confirm) {
                        wx.openSetting({
                          success: showres1=>{
                            wxb.setStorages("firstjr", 1)
                            console.log(showres1)
                          }
                        })
                      }
                      console.log(showres)
                    }
                  })
                }
              })
            }
          })
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    }
  },
  xuan(){
    setTimeout(()=>{
      console.log("ss")
    },1000)
    
    
  },
  onImageLoad(e){
  var num = this.data.num+1
    console.log(this.data.num)
    this.setData({
      num: num
    })
    if (!wxb.getStorages("openid")){
      if (num == 52) {
        if (this.data.isi) {
          var a = 0
          clearInterval(timer);
          timer = setInterval(res => {
            a++;
            this.data.index0++;
            console.log(this.data.index0)
            if (this.data.index0 > 50) {
              // this.data.index0 = 0
              console.log(this.data.index0)
              clearInterval(timer);
              console.log(this.data.index0)
              this.setData({
                isi: false
              })
            }
            this.setData({
              index0: this.data.index0
            })

          }, 50)
        }
      }
    }
    
  }
})

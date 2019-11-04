//index.js
//获取应用实例
const app = getApp()
const wxb = require('../../utils/wxb.js')
import mta from '../../utils/mta_analysis.js'

Page({
  data: {
    more: false,//遮罩控制器
    moreclass: true,
    ruleIs: false,//规则开关
    exchangeIs: false,
    lavelArr: {},
    zhuangs: "",
    zk_id: null,
    num: 0,
    h_bj: "home_bj0",
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    mta.Page.init()//腾讯统计
    var openids = wxb.getStorages("openid") ? wxb.getStorages("openid") : "";
    wxb.Post('foodapi/temple/index', { openid: openids }, res => {
      console.log(res)
      let classa = "home_bj" + res.data.data.percent
      this.setData({
        h_bj: classa,
        lavelArr: res.data.data,
      })
    })
    if (wxb.getStorages("openid")) {
      this.setData({
        moreclass: false
      })
      this.steps()
      // wxb.Post('foodapi/temple/step', { openid:wxb.getStorages("openid")},res=>{
      //   console.log(res)
      // })
    }
  },
  steps() {
    wx.getWeRunData({
      success: res => {
        wxb.Post('foodapi/temple/step', { encryptedData: res.encryptedData, iv: res.iv, openid: wxb.getStorages("openid") }, resb => {
          if (resb.data.code == 0) {
            this.setData({
              exchangeIs: true
            })
          }
        })
      }
    })
  },
  homepost() {

  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (wxb.getStorages("openid")) {
      return
    }
    if (e.detail.userInfo) {
      wxb.setStorages("user", e.detail.userInfo)
      this.setData({
        moreclass: false
      })

      wx.login({
        success: res => {
          wxb.Post("foodapi/temple/getCode", { code: res.code, headimg: e.detail.userInfo.avatarUrl, nickname: e.detail.userInfo.nickName }, data => {
            if (data.data.code == 0) {
              console.log(data.data.data.openid)
              wxb.setStorages("openid", data.data.data.openid)
              wx.getWeRunData({
                success: resa => {
                  wxb.Post('foodapi/temple/step', { encryptedData: resa.encryptedData, iv: resa.iv, openid: data.data.data.openid }, resb => {
                    if (resb.data.code == 0) {
                      this.setData({
                        step_data: resb.data.data,
                        exchangeIs: true
                      })
                    }
                    console.log(resb)
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
  //签到卡关
  qis: function () {
    this.setData({
      more: true
    })
  },
  //签到卡关
  qis1: function () {
    this.setData({
      more: false,
      ruleIs: false
    })
  },
  selectItem(e) {//点击立即打白条,获取子组件传过来的值
    console.log(e)//可以从e中得到传过来信息
    let updaSelectItem = e.detail;
    this.setData({
      baitiaoSelectItem: e.detail
    })

  },
  //跳转排行榜
  jump_navigateTo1() {
    wxb.jump_navigateTo("/pages/ranking/ranking")
  },
  //跳转我的奖品
  jump_navigateTo2() {
    wxb.jump_navigateTo("/pages/prize/prize")
  },
  //跳转地图
  jump_navigateTo3() {
    wxb.jump_navigateTo("/pages/logs/logs")
  },
  //跳转抽奖
  jump_navigateTo4() {
    wxb.jump_navigateTo("/pages/horse/horse")
  },
  jump_rule() {
    this.setData({
      ruleIs: true
    })
  },
  closes() {
    this.setData({
      exchangeIs: false
    })
  },
  zhuangbind(e) {


    if (e.detail.value) {
      let zk_id = 1
      this.setData({
        wans: "",
        zk_id: zk_id,
        num: e.detail.value
      })
    }
  },
  wanbind(e) {

    if (e.detail.value) {
      let zk_id = 2
      this.setData({
        zhuangs: "",
        zk_id: zk_id,
        num: e.detail.value
      })
    }
  },
  integral_bsdh() {
    if (this.data.zk_id && this.data.num) {
      wxb.Post('foodapi/temple/integral_bsdh', { openid: wxb.getStorages("openid"), num: this.data.num, zk_id: this.data.zk_id }, res => {
        console.log(res)
        wxb.alert(res.data.msg)
        this.setData({
          zhuangs: "",
          wans: ""
        })
      })
    } else {
      wxb.alert("请选择兑换")
    }
  }
})

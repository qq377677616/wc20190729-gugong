//index.js
//获取应用实例
const app = getApp()
const wxb = require('../../utils/wxb.js')
Page({
  data: {
    more: false,//遮罩控制器
    data:{},
    user:{},
    j_data:{},
    j_is:false,
    status:false,
    exchange:false,
    imgIs:1,
    on:false,
    id:0,
    ruleIs:false,
    scrollleft:0,
    first_jr:2,
    s_gif:false,
    is_yk:2,      //是否授权
    guideIs:false,    //指引开关
    arr: [
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon0.png", scrollleft:""},
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon1.png", scrollleft: ""},
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon2.png", scrollleft: "450rpx"},
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon3.png", scrollleft: "600rpx"},
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon4.png", scrollleft: "780rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon5.png", scrollleft: "1300rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon6.png", scrollleft: "1600rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon7.png", scrollleft: "1800rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon8.png", scrollleft: "2000rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon9.png", scrollleft: "2400rpx"},
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon10.png", scrollleft: "2600rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon11.png", scrollleft: "2800rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon12.png", scrollleft: "3080rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon13.png", scrollleft: "3320rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon14.png", scrollleft: "3560rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon15.png", scrollleft: "3820rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon16.png", scrollleft: "4000rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon17.png", scrollleft: "4350rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon18.png", scrollleft: "4560rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon19.png", scrollleft: "4888rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon20.png", scrollleft: "5200rpx" },
      { is: "1", class: "yes", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon21.png", scrollleft: "5300rpx" },
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var is_yk = wxb.getStorages("is_yk")
    this.setData({
      is_yk: is_yk
    })
    var user = wxb.getStorages("user")
    var id = 1;
    if (options.id){
      id = options.id;
    }
    this.setData({
      user: user,
      scrollleft: this.data.arr[id-1].scrollleft
    })
    if (id == 22){
      if (options.getgift == 1){
        this.setData({
          s_gif:true
        })
        setTimeout(()=>{
          this.setData({
            s_gif: false
          })
        },3000)
      }
    }
    // wxb.Post('foodapi/temple/pray_index', { openid: wxb.getStorages("openid")},res=>{
    //   console.log(res)
    //   if(res.data.code == 0){
    //     let arr = this.data.arr
    //     for (let i = 0; i < res.data.data.step_site; i++){
    //       arr[i].is = "2"
    //       arr[i].class = "no"
    //     }
        
    //     console.log(arr)
    //     this.setData({
    //       data: res.data.data,
    //       arr:arr,
          
    //     })
    //   }
    // })
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    //wxb.getStorages("Pid")
    if (!wxb.getStorages("openid")) {
      wxb.jump_redirectTo("/pages/loading/loading")
      return;
    } 
    if (!wxb.getStorages("guideIs")) {
      wxb.setStorages("guideIs", true)
      this.setData({
        guideIs: true
      })
    }
    // else if (wxb.getStorages("firstjr") == 2) {
    //   // wxb.jump_redirectTo("/pages/logs/logs")
    // }else{
    //   wxb.jump_redirectTo("/pages/index/index")
    // }
    wxb.Post('foodapi/temple/integral_bsdh', { openid: wxb.getStorages("openid")},res=>{
      console.log(res)
      if(res.data.code == 0){
        this.setData({
          j_data: res.data.data,
          j_is:true
        })
      }
    })
    wxb.Post('foodapi/temple/pray_index', { openid: wxb.getStorages("openid")},res=>{
      console.log(res)
      if(res.data.code == 0){
        let arr = this.data.arr
        for (let i = 0; i < res.data.data.step_site; i++){
          arr[i].is = "2"
          arr[i].img = "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/mapicon"+i+"_p.png"
        }
        this.setData({
          first_jr: res.data.data.first_jr,
          arr: arr,
          data:res.data.data
        })
      }
    })
    // wxb.jump_redirectTo('/pages/loading/loading')
    // var pid = wxb.getStorages("Pid")
    // wxb.Post('foodapi/temple/limi_pass', { openid: wxb.getStorages("openid"), zd:pid},res=>{
    //   console.log(res)
    //   if (res.data.code == 0){
    //     let is = true
    //     if (res.data.data.status == 1){
    //       is = false
    //     }
    //     this.setData({
    //       exchange:true,
    //       status: is
    //     })
    //   }
    // })
  },
  shutk1: function (e) {
    if (e.currentTarget.dataset.is == "1"){
      wxb.alert("请先解锁关卡")
      return;
    } 
    wxb.jump_redirectTo('/pages/game/exhibition?id=1')
  },
  shutk2: function (e) {
    if (e.currentTarget.dataset.is == "1") {
      wxb.alert("请先解锁关卡")
      return;
    }
    wxb.jump_redirectTo('/pages/game/runner')
  },
  shutk3: function (e) {
    if (e.currentTarget.dataset.is == "1") {
      wxb.alert("请先解锁关卡")
      return;
    }
    //https://gameh5.flyh5.cn/resources/game/sh_game/gg/pear/main.html
    wxb.jump_redirectTo('/pages/game/game?id=3&url=https://gameh5.flyh5.cn/resources/game/sh_game/gg/pear/main.html')
  },
  shutk4: function (e) {
    wxb.jump_redirectTo('/pages/game/qings')
    // wxb.jump_redirectTo('/pages/game/game?id=3&url=https://gameh5.flyh5.cn/resources/game/nsy_game/2019/20190813_GGTH_c/main.html')
    if (e.currentTarget.dataset.is == "1") {
      wxb.alert("请先解锁关卡")
      return;
    }
    // wxb.alert("关卡暂时未开放")
  },
  shutk5: function (e) {
    if (e.currentTarget.dataset.is == "1") {
      wxb.alert("请先解锁关卡")
      return;
    }
    // wxb.alert("关卡暂时未开放")
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/xyc_game/2019/08/saima/index.html')
  },
  shutk6: function (e) {
    if (e.currentTarget.dataset.is == "1") {
      wxb.alert("请先解锁关卡")
      return;
    }
    wxb.jump_redirectTo('/pages/game/exhibition?id=6')
  },
  shutk7: function (e) {
    if (e.currentTarget.dataset.is == "1") {
      wxb.alert("请先解锁关卡")
      return;
    }
    wxb.jump_redirectTo('/pages/game/mining')
  },
  shutk8: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/xyc_game/2019/08/shejian/index.html')
  },

  shutk9: function (e) {
    if (e.currentTarget.dataset.is == "1") {
      wxb.alert("请先解锁关卡")
      return;
    }
    //noodles
    wxb.jump_redirectTo('/pages/game/noodles')
  },
  shutk10: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/sh_game/gg/xxl/main.html')
    //https://game.flyh5.cn/resources/game/sh_game/gg/xxl/main.html
  },
  shutk11: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/exhibition?id=11')
  },
  shutk12: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/xy_game/19_08/yaogu/index.html')
    //https://game.flyh5.cn/resources/game/xy_game/19_08/yaogu/index.html
  },
  shutk13: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/exhibition?id=13')
  },
  shutk14: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/zx_game/2019/08/TIP_upload_image/main.html')
    //https://game.flyh5.cn/resources/game/zx_game/2019/08/TIP_upload_image/main.html
    
  },
  shutk15: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/xy_game/19_08/shengshou/index.html')
    //https://game.flyh5.cn/resources/game/xy_game/19_08/shengshou/index.html
  },
  shutk16: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    //cut_p
    wxb.jump_redirectTo('/pages/game/cut_p?id=16')
    // wxb.alert("关卡暂时未开放")
  },
  shutk17: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/sh_game/gg/pintu/main.html')
    //https://game.flyh5.cn/resources/game/sh_game/gg/pintu/main.html
  },
  shutk18: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/nsy_game/2019/20190813_GGTH_c/main.html')
    //https://game.flyh5.cn/resources/game/nsy_game/2019/20190813_GGTH_c/main.html
  },
  shutk19: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/nsy_game/2019/20190815_GGCC_c/main.html')
    //https://game.flyh5.cn/resources/game/nsy_game/2019/20190815_GGCC_c/main.html
  },
  shutk20: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    //piyi
    wxb.jump_redirectTo('/pages/game/piyi?id=20')
    // wxb.alert("关卡暂时未开放")
  },
  shutk21: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/exhibition?id=21')
  },
  shutk22: function (e) {
    // if (e.currentTarget.dataset.is == "1") {
    //   wxb.alert("请先解锁关卡")
    //   return;
    // }
    wxb.jump_redirectTo('/pages/game/game?id=5&url=https://gameh5.flyh5.cn/resources/game/nsy_game/2019/20190814_GGCJ_c/main.html')
    //https://game.flyh5.cn/resources/game/nsy_game/2019/20190814_GGCJ_c/main.html
  },
  /****
   * 页面跳转
   */
  jump_a1:function(e){
    console.log(e.currentTarget.dataset.roter)
    wxb.jump_navigateTo(e.currentTarget.dataset.roter)
  },

  //分享
  share_msg(e){
    wxb.Post("foodapi/temple/fenxiang", { openid: wxb.getStorages("openid")},res=>{
      console.log(res)
      wxb.alert(res.data.msg)
      if(res.data.code == 0){
        let data = this.data.data
        data.jf_all += res.data.data.get_jf
        this.setData({
          data: data
        })
        //jf_all
      }
    })
  },
  //获取用户
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    wxb.Post('foodapi/temple/perfect_info', { 
      openid: wxb.getStorages("openid"), 
      nickname: e.detail.userInfo.nickName,
      headimg: e.detail.userInfo.avatarUrl
    },res=>{
      if(res.data.code == 0){
        let user = { nickName: e.detail.userInfo.nickName, avatarUrl: e.detail.userInfo.avatarUrl}
        wxb.setStorages("user", user)
        wxb.setStorages("is_yk", 2)
        this.setData({
          user: user
        })
      }
      console.log(res)
    })
  },
  closes(){
    this.setData({
      exchange: false
    })
  },
  //转发
  onShareAppMessage: function (res) {
    // let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/logs/logs',
      success: function (res) { }
    }
  },
  //tog
  togg(){
    let on = !this.data.on
    this.setData({
      on: on
    })
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
  //无返回路由跳转
  jump_redire(e){
    console.log(e.currentTarget.dataset.url)
    wxb.jump_redirectTo(e.currentTarget.dataset.url)
    //wxb.jump_redirectTo("/pages/loading/loading")
  },
  //打开关闭规则页面
  togrule(){
    let is = !this.data.ruleIs
    this.setData({
      ruleIs:is
    })
  },
  togrule1(){
    this.setData({
      j_is: false
    })
  },
  imgIss(){
    var i = this.data.imgIs+1
    if(i == 4){
      this.setData({
        guideIs:false
      })
    }
    this.setData({
      imgIs: i
    })
  },
  //授权步数
  firstsojs(){
    // if (!wxb.getStorages('firstsoj')) {
    //   wx.openSetting({
    //     success: showres1 => {
    //       console.log(showres1)
    //       if (showres1.authSetting['scope.werun'] == true){
    //         wxb.setStorages("firstsoj", true)
    //       }
    //     }
    //   })
    // }

    // wx.login({
    //   success: res => {
    //     console.log(res)
    //   }
    // })
  }
})

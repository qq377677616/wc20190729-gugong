// pages/game/runner.js
const wxb = require('../../utils/wxb.js')
var timer;
var anum = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class:false,
    num:31,
    index0:0,
    aimgn:0,
    text:"",
    text1:"",
    exchange:false,
    is_fly: false,
    pupli:true,
    PreservationImg:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    setTimeout(()=>{
      this.setData({
        class:true
      })
    },1000)
    setTimeout(()=>{
      this.setData({
        pupli: false
      })
    },3000)
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
    wxb.setStorages("Pid", 2)
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
  xuan:function(){
    var a = 0
    if (this.data.aimgn == 31){
      clearInterval(timer);
      timer = setInterval(res => {
        a++;
        this.data.index0++;
        if (this.data.index0 > 30) {
          anum++
          this.data.index0 = 0
          if (anum == 3){
            console.log("第三期")
            anum = 0;
            clearInterval(timer);
            this.jump_btn()
          }
        }
        this.setData({
          index0: this.data.index0
        })
        
      }, 50)
    }
  },
  //关闭弹窗
  closes() {
    this.setData({
      exchange: false
    })
  },
  //确认
  quebtn() {
    if (this.data.is_fly) {
      wxb.jump_redirectTo("/pages/wish/wish?id=2")
    } else {
      wxb.jump_redirectTo("/pages/logs/logs?id=2")
    }

  },
  //确认
  quebtn1() {
    this.setData({
      PreservationImg:true
    })
  },
  save() {
    let that = this
    //若二维码未加载完毕，加个动画提高用户体验
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    //判断用户是否授权"保存到相册"
    wx.getSetting({
      success(res) {
        //没有权限，发起授权
        console.log(res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {//用户允许授权，保存图片到相册
              console.log("用户确认")
              that.savePhoto();
            },
            fail() {//用户点击拒绝授权，跳转到设置页，引导用户授权
              console.log("用户取消")
              wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权,将无法正常获取您步数，无法进行体验。',
                success: showres => {
                  wx.openSetting({
                    success() {
                      console.log("缺陷")
                      wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                          that.savePhoto();
                        }
                      })
                    }
                  })
                }
              })
            }
          })

        } else {//用户已授权，保存到相册

          that.savePhoto()

        }

      }

    })

  },
  //保存图片到相册，提示保存成功

  savePhoto() {

    let that = this

    wx.downloadFile({

      url: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/page_imgs1.png",

      success: function (res) {

        wx.saveImageToPhotosAlbum({

          filePath: res.tempFilePath,

          success(res) {

            wx.showToast({

              title: '保存成功',

              icon: "success",

              duration: 1000

            })

          }

        })

      }

    })

  },
  /***
   * 跳转祈福
   */
  jump_btn() {
    wxb.Post('foodapi/temple/limi_pass', { openid: wxb.getStorages("openid"), zd: 2 }, res => {
      console.log(res)
      if (res.data.code == 0) {
        var is_fly = false
        //var url = "/pages/logs/logs"
        if (res.data.data.is_fly === 1) {
          is_fly = true
          // url = "/pages/wish/wish"
        }
        this.setData({
          is_fly: is_fly,
          exchange: true,
        })

      } else {
        // this.setData({
        //   exchange: false
        // })
        wxb.jump_redirectTo("/pages/logs/logs?id=2")
      }
    })
    //wxb.jump_redirectTo("/pages/logs/logs")
  },
  onImageLoad: function (ev){

    this.data.aimgn++

    this.setData({
      aimgn: this.data.aimgn
    })
  },
  click:function(){
    this.xuan()
  },
  /***
   * 跳转祈福
   */
  // jump_btn() {
  //   wxb.jump_redirectTo("/pages/logs/logs")
  // },
  //文字动画
  fontan1(){
    var story = "沿藏的路途中遇见手持转经筒的朴实牧民";
    var i = 0;
    var time = setInterval(() => {
      var text = story.substring(0, i);
      i++;
      this.setData({
        text: text
      });
      if (text.length == story.length) {
        //   console.log("定时器结束！");
        clearInterval(time);
        this.fontan2()
      }
    }, 200)
  },
  fontan2() {
    var story = "转经筒寓意祝福吉祥。转动经筒为旅途祈福吧";
    var i = 0;
    var time = setInterval(() => {
      var text = story.substring(0, i);
      i++;
      this.setData({
        text1: text
      });
      if (text.length == story.length) {
        //   console.log("定时器结束！");
        clearInterval(time);
      }
    }, 200)
  }
})
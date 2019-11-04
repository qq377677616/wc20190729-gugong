// pages/game/noodles.js
const wxb = require('../../utils/wxb.js')
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 83,
    index0: 0,
    isi: true,
    exchange:false
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
  onImageLoad() {

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
  xuan() {
    if (this.data.isi) {
      var a = 0
      clearInterval(timer);
      timer = setInterval(res => {
        a++;
        this.data.index0++;
        if (this.data.index0 > 81) {
          clearInterval(timer);
          this.setData({
            isi: false
          })
          this.jump_btn()
        }
        this.setData({
          index0: this.data.index0
        })

      }, 50)
    }
  },
  /***
   * 跳转祈福
   */
  jump_btn() {
    wxb.Post('foodapi/temple/limi_pass', { openid: wxb.getStorages("openid"), zd: 16 }, res => {
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
        wxb.jump_redirectTo("/pages/logs/logs?id=16")
      }
    })
    //wxb.jump_redirectTo("/pages/logs/logs")
  },

  //关闭弹窗
  jump_btns() {
    this.setData({
      t1: "on",
      ons: ""
    })
    wxb.alert("轻点剪刀，完成关卡")
  },
  jump_btns1() {
    this.setData({
      t1: "",
      ons: "ons"
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
  //确认
  quebtn() {
    if (this.data.is_fly) {
      wxb.jump_redirectTo("/pages/wish/wish?id=16")
    } else {
      wxb.jump_redirectTo("/pages/logs/logs?id=16")
    }

  },
  //确认
  quebtn1() {
    this.setData({
      PreservationImg: true
    })
  },
})
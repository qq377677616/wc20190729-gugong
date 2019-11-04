// pages/game/exhibition.js
const wxb = require('../../utils/wxb.js')
var arr = [
  { id: 1, strings: "扎什伦布寺，寓意吉祥须弥。整个寺院依山坡而筑，背附高山，座北地向阳，殿宇依次递接，疏密均衡，和谐对称，深邃曲折的巷道，可以让人走到腿软。当年乾隆皇帝过生日，邀请好朋友六世班禅进京一起聚会。班禅六世便从扎寺出发带着吉祥祝福前往赴约，成就了历史上的美谈。", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/game_3_bj.jpg", title:"西藏布达拉宫"},
  { id: 2, strings: "", title:"西藏朝圣"},
  { id: 3, strings: "", title: "青海梨接接接" },
  { id: 4, strings: "", title: "青海湖" },
  { id: 5, strings: "", title: "青海赛马"  },
  { id: 6, strings: "敦煌莫高窟的飞天壁画，看过的人无不疯狂打call点赞。但你知道吗？真相是，在设计之初设计师就因贫穷限制了想象，整个作品修改了无数版，最终还是用了第一版(咦，这话怎么这么熟悉？)。初版Demo一直到唐朝才被美化修改。不得不说我们鼎盛唐朝的设计师大大们真的很优秀。", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/tips1_bj.jpg", title: "甘肃敦煌飞天壁画"  },
  { id: 7, strings: "", title: "甘肃甘南采花节" },
  { id: 8, strings: "", title: "射箭英雄"  },
  { id: 9, strings: "", title: "兰州拉面"  },
  { id: 10, strings: "", title: "瑞兽消消乐" },
  { id: 11, strings: "话说两千多年前，汉朝与匈奴常年约架，汉武帝觉得单挑太吃力，于是派一个叫张骞的人去西边找帮手，张骞从长安出发，花了十多年沿河西走廊一直到中亚地区与各国建立关系，可谓是汉朝优秀公关，绸之路也同时荣获“我国出口贸易之路鼻祖”的终身成就奖。", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/tips2_bj.jpg", title: "丝绸之路" },
  { id: 12, strings: "", title: "腰鼓大师"  },
  { id: 13, strings: "我国富帅秦始皇，年纪轻轻就升职加薪、出任CEO、迎娶白富美走向人生巅峰想想还有点小激动。始皇帝不仅业务能力出众，艺术思维也是相当活跃。一言不合就修宫殿。宫殿修好又觉空荡荡，差点玩脱找真人陪葬，因前朝以人殉葬被百姓diss，于是大臣便提议烧陶瓷人，兵马俑取代以人殉葬，百姓喜大奔普。这波操作真是666!", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/tips3_bj.png", title: "兵马俑"  },
  { id: 14, strings: "", title: "将军传"},
  { id: 15, strings: "", title: "指尖跑酷" },
  { id: 16, strings: "", title: "山西沂州剪纸"},
  { id: 17, strings: "", title: "拼拼图"},
  { id: 18, strings: "", title: "投壶"},
  { id: 19, strings: "", title: "长城跑酷" },
  { id: 20, strings: "", title: "唐山皮影戏" },
  { id: 21, strings: "承德避暑山庄是清乾隆时期皇室家庭聚会胜地，冬暖夏凉是标配。但仅仅用来避暑显然有点小看它了，这里可是当时著名的木兰围场，清朝男子兵团练兵外交之地，每年的大型狩猎活动更是山庄的保留项目。", img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/page_53.jpg", title: "承德避暑山庄" },
  { id: 22, strings: "", title: "蹴鞠go" },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"",
    t1:"",
    ons:"ons",
    data:{},
    exchange:false,
    is_fly:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fontan2()
    if (options.id){
      this.setData({
        data: arr[options.id-1]
      })
    }
    console.log(this.data.data)
    wx.setNavigationBarTitle({
      title: this.data.data.title,
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
    wxb.setStorages("Pid", 1)
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
   * 跳转祈福
   */
  jump_btn(){
    wxb.Post('foodapi/temple/limi_pass', { openid: wxb.getStorages("openid"),zd:this.data.data.id},res=>{
      console.log(res)
      if (res.data.code == 0){
        var is_fly = false
        //var url = "/pages/logs/logs"
        if (res.data.data.is_fly === 1){
          is_fly = true
          // url = "/pages/wish/wish"
        }
        this.setData({
          is_fly: is_fly,
          exchange: true,
        })
        
      }else{
        this.setData({
          exchange:false
        })
        wxb.jump_redirectTo("/pages/logs/logs?id=" + this.data.data.id)
      }
    })
    //wxb.jump_redirectTo("/pages/logs/logs")
  },
  //关闭弹窗
  closes(){
    this.setData({
      exchange:false
    })
  },
  //确认
  quebtn(){
    if (this.data.is_fly){
      wxb.jump_redirectTo("/pages/wish/wish?id=" + this.data.data.id)
    }else{
      wxb.jump_redirectTo("/pages/logs/logs?id=" + this.data.data.id)
    }
    
  },
  fontan2() {
    var story = "唐太宗时期，多金王子松赞干布想娶唐太宗女儿，唐太宗心想：哎呀，这个好呀！解决了宗室子女婚配问题，还能拉个铁杆队友！于是借此机会提出和亲建立联邦，双方一拍即合。文成公主进藏后，霸道总裁松赞干布为其修建布达拉宫狂撒狗粮。";
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
      }
    }, 200)
  },
  //关闭弹窗
  jump_btns(){
    this.setData({
      t1:"on",
      ons:""
    })
  },
  jump_btns1(){
    this.setData({
      t1: "",
      ons:"ons"
    })
  }
})
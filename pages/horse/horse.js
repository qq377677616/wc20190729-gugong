//index.js
import tool from '../../utils/publics/tool.js'
const wxb = require('../../utils/wxb.js')
Page({
  data: {
    prize: [
      { id: 0, name: "谢谢惠顾", nid: 0 ,img:false},
      { id: 1, name: "积分", nid: 4, img:"https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/chou_icon1.png"},
      { id: 2, name: "谢谢惠顾", nid: 0, img: false},
      { id: 3, name: "道具", nid: 3, img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/chou_icon7.png" },
      { id: 4, name: "金砖", nid: 2, img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/chou_icon3.png"},
      { id: 5, name: "文创产品", nid: 5, img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/chou_icon4.png"},
      { id: 6, name: "谢谢惠顾", nid: 0, img: false},
      { id: 7, name: "红包大奖", nid: 1, img: "https://game.flyh5.cn/resources/game/wechat/tzj/img/gugong20190719/chou_icon5.png"},
    ],
    close:false,
    step: 8 * 5,
    curIndex: 1,
    speed: 260,
    start_num: 6,
    isPrize: true,
    cj_num:0
  },
  onLoad:function(){
    wxb.Post('foodapi/temple/fenxiang_num', { openid: wxb.getStorages("openid")},res=>{
      console.log(res)
      if(res.data.code == 0){
        this.setData({
          cj_num: res.data.data.cj_num
        })
      }
    })
  },
  start() {
    let _self = this
    if (this.data.isPrize) {
      var _curIndex = this.data.curIndex
      var _speed = this.data.speed
      this.setData({
        isPrize: false
      })
      wxb.Post('foodapi/temple/lucky_draw', { openid: wxb.getStorages("openid")},res=>{
        console.log(res)
        console.log(res.data.data.prize_name)
        let prize = this.data.prize
        if(res.data.code == 0){
          //wxb.alert(res.data.msg)
          let _id = prize.find(item => { return item.nid == res.data.data.status}).id
          console.log(_id)
          var prize_num = _id + this.data.step - _curIndex - 1
          var _prize_num = 0
          var _auto = setTimeout(auto_prize, _speed)
          var num = this.data.cj_num - 1;
          if (num < 0){
            num = 0;
            tool.alert('此次抽奖将消耗20积分')
            //tool.showModal("积分", '此次抽奖将消耗20积分', "好的,#00B26A", false)
          }
          this.setData({
            cj_num: num,
            isPrize: false
          })
          function auto_prize() {
            clearInterval(_auto)
            if (_prize_num <= prize_num) {
              _prize_num++
              _curIndex++
              _curIndex = (_curIndex) % 8
              if (_prize_num < _self.data.start_num) {
                _speed -= 40
              } else if (_prize_num == _self.data.start_num) {
                _speed = 25
              } else if (_prize_num >= _self.data.start_num && _prize_num < _self.data.start_num * 4) {
                _speed += 6
              } else {
                _speed += 16
              }
              _auto = setInterval(auto_prize, _speed)
              _self.setData({ curIndex: _curIndex })
            } else {
              setTimeout(function () {
                tool.showModal("抽奖结果", res.data.data.prize_name, "好的,#00B26A", false)
                _self.setData({ isPrize: true })
              }, 300)
            }
          }
        }else{
          wxb.alert(res.data.msg)
        }
      })

    }
    
  },
  jumps(e){
    wxb.alert("请完成所有关卡")
  },
  jumps_dao(e){
    ///pages/Iprop/Iprop
    wxb.jump_navigateTo('/pages/Iprop/Iprop')
  },
  //无返回路由跳转
  jump_redire(e) {
    wxb.jump_redirectTo("/pages/prize/prize")
  },
  //返回logs
  jump_logs(){
    wxb.jump_redirectTo("/pages/logs/logs")
  },
  closes(){
    let is = !this.data.close
    this.setData({
      close: is
    })
  }
})

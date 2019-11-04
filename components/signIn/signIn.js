// components/signIn/signIn.js
const wxb = require('../../utils/wxb.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */

  data: {
    arr:[],
    xz:null,
    max_qd_str:0
  },

  /**
   * 组件的初始数据
   */
  attached: function () {    
    console.log(wxb.getMonthDayTotal())
    console.log(this.data.xz)
    this.sigfor(0)
    let date = new Date();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    sigfor(num){
      wxb.Post('foodapi/temple/cx_sign', { openid: wxb.getStorages("openid"), month: wxb.getDateStr() }, res => {
        if (res.data.msg == "查询成功"){
          console.log(res.data)
          var arr = [];
          var xz = null;
          var max_qd_str = 0;
          let date = new Date();
          for (let i = 0; i<res.data.data.qd_str.length; i++){
            if (res.data.data.qd_str[i] == "1") {
              arr.push({ number: i + 1, class: "num_this" })
              max_qd_str++
            } else if (i + 1 == date.getDate()){
              if (res.data.data.qd_str[i] == "1"){
                arr.push({ number: i + 1, class: "num_this" })
              }else{
                arr.push({ number: i + 1, class: "num_text_this" })
                xz = i + 1;  
              }
            }else{
              arr.push({ number: i + 1, class: "" })
            }
          }
          console.log(arr)
          this.setData({
            arr: arr,
            xz:xz,
            max_qd_str: max_qd_str
          })
        }
      })
    },
    //选择
    fordata(e){
      var arr = this.data.arr
      var xz = this.data.xz
      
      let date = new Date();
      if (arr[e.currentTarget.dataset.itemid - 1].class == "num_this" || e.currentTarget.dataset.itemid > date.getDate()){
        return false;      
      }else{
        if (xz != null && xz != date.getDate()){
          arr[xz-1].class = ""
        }
        arr[e.currentTarget.dataset.itemid - 1].class = "num_text_this"
        xz = e.currentTarget.dataset.itemid
      }

      console.log(arr)
      // for (let i = 0; i < this.data.arr.length; i++) {

      // }
      this.setData({
        arr: arr,
        xz: xz
      })
    },
    sig(e){
      console.log(e)
      // if()
      let date = new Date();
      console.log(this.data.xz)
      if (this.data.xz != date.getDate()){
        // wxb.alert("请选择当天签到")
      }else{
        this.posts(date.getDate(),'签到成功')
      }
      
    },
    sig2(){
      let date = new Date();
      console.log(this.data.xz)
      if (this.data.xz == null){
        wxb.alert("请选择补签天数")
      } else if (this.data.xz == date.getDate()){
        wxb.alert("当日不能补签")
      }else{
        wxb.confirm("补签","补签会扣除20积分，是否补签？").then(a=>{
          if(a){
            this.posts(this.data.xz, "补签成功,扣除20积分")
          }
        })
        
      }
      
    },
    posts(day,msg){
      wxb.Post('foodapi/temple/sign', { openid: wxb.getStorages("openid"), month: wxb.getDateStr(), day: day }, res => {
        
        // if(res.data.code == 4){
        //   return;
        // }
        if (res.data.code == 0){
          var arr = this.data.arr
          wxb.alert(msg)
          arr[this.data.xz - 1].class = "num_this"
          this.setData({
            arr: arr,
            xz: null,
            max_qd_str: this.data.max_qd_str+1
          })
          console.log(this.data.arr)
        }else{
          wxb.alert(res.data.msg)
        }
        
      })
    },
    /**
   * 组件的属性列表
   */
    properties: {
      hideBaitiao: {
        type: Boolean,
        // 默认隐藏
        value: true
      },
      baitiao: { // 分期内容的数据
        type: Array,
      }
    },
    data: {
      selectIndex: 0
    }
  }
})

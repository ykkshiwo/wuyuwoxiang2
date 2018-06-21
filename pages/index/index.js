//index.js
//获取应用实例
const app = getApp()
var m = require("../../data/provices/zhejiang.js")
var map =m.zhejiang

Page({
  data: {
    motto: 'Hello World',
    newMyChinaProvices: ["丽水市","嘉兴市","金华市","湖州市","舟山市","宁波市","杭州市","温州市","衢州市","绍兴市","台州市"],
    yuliu_w: 200,
    yuliu_h: 200
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.screenHeight, res.screenWidth)
        var s_width = res.screenWidth
        var s_height = res.screenHeight
        var yuliu_w = res.screenWidth * 0.05
        var yuliu_h = res.screenHeight * 0.08
        that.setData({
          yuliu_w: yuliu_w,
          yuliu_h: yuliu_h,
          s_width: s_width,
          s_height: s_height
        })
      },
    })
  },

  onReady: function(){
    var context = wx.createCanvasContext('firstCanvas')
    for (var j = 10; j > -1; j--) {
      context.beginPath()
      context.setLineWidth(1)
      context.setStrokeStyle('red')
      // console.log(this.data.newMyChinaProvices[j][0])
      var p = this.data.newMyChinaProvices[j]
      console.log(p)
      var provice = map[p][0]
      console.log(provice)
      context.moveTo(this.longToZB(provice[0][0], this.data.s_width), this.latToZB(provice[0][1], this.data.s_height))
      for (var i = 1; i < provice.length; i++) {
        context.lineTo(this.longToZB(provice[i][0], this.data.s_width), this.latToZB(provice[i][1], this.data.s_height))
      }
      context.closePath()
      context.fill()
      context.stroke()
    }
    context.draw()

  },

  longToZB: function (long, sw, long_max, long_min) {
    var r = 0.7 * (long - long_min) * sw / (long_max - long_min) + long_min - (long_min - this.data.yuliu_w)
    return r
  },

  latToZB: function (lat, sh, lat_max, lat_min) {
    var r = sh * 0.05 - ( ( lat - lat_max ) * sh * 0.5) / ( lat_max- lat_min )
    return r
  },

})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
        that.setData({
          s_width: s_width,
          s_height: s_height
        })
      },
    })

    var m = require("../../data/provices/jiangsu.js")
    var map = m.proviceCoor
    var dingWei = m.dingWei
    var map_h = 0.9 * this.data.s_width * ( dingWei['lat_max'] - dingWei['lat_min'] ) / ( dingWei['long_max'] - dingWei['long_min'] )
    this.setData({
      dingWei: dingWei,
      map: map,
      map_h: map_h
    })
    // console.log(dijiShi, dingWei)
  },

  onReady: function(){
    var context = wx.createCanvasContext('firstCanvas')
    // for (var j = this.data.dijiShi.length - 1; j > -1; j--) {
    //   context.beginPath()
    //   context.setLineWidth(1)
    //   context.setStrokeStyle('red')
    //   var p = this.data.dijiShi[j]
    //   console.log(p)
    //   var provice = this.data.map[p][0]
    //   context.moveTo(this.longToZB(provice[0][0], this.data.s_width, this.data.dingWei['long_max'], this.data.dingWei['long_min']), this.latToZB(provice[0][1], this.data.s_height, this.data.dingWei['lat_max'], this.data.dingWei['lat_min']))
    //   for (var i = 1; i < provice.length; i++) {
    //     context.lineTo(this.longToZB(provice[i][0], this.data.s_width, this.data.dingWei['long_max'], this.data.dingWei['long_min']), this.latToZB(provice[i][1], this.data.s_height, this.data.dingWei['lat_max'], this.data.dingWei['lat_min']))
    //   }
    //   context.closePath()
    //   context.fill()
    //   context.stroke()
    // }
    for (var key in this.data.map) {
      console.log(key)
      // context.beginPath()
      // context.setLineWidth(1)
      // context.setStrokeStyle("red")
      //console.log("key: ", key)
      // if (this.data.provices.indexOf(key) > -1) {
      //   context.setFillStyle('#CDC9C9')
      // }
      // else{
        context.setFillStyle('#F0F0F0')
      // }
      var djs = this.data.map[key]
      console.log(djs.length)
      for (var s=0; s<djs.length; s++){
        context.beginPath()
        context.setLineWidth(1)
        context.setStrokeStyle("red")
        var djs_q = djs[s]
        context.moveTo(this.longToZB(djs_q[0][0], this.data.s_width, this.data.dingWei['long_max'], this.data.dingWei['long_min']), this.latToZB(djs_q[0][1], this.data.s_height, this.data.dingWei['lat_max'], this.data.dingWei['lat_min']))
        for (var i = 1; i < djs_q.length; i++) {
          context.lineTo(this.longToZB(djs_q[i][0], this.data.s_width, this.data.dingWei['long_max'], this.data.dingWei['long_min']), this.latToZB(djs_q[i][1], this.data.s_height, this.data.dingWei['lat_max'], this.data.dingWei['lat_min']))
        }
        context.closePath()
        context.fill()
        context.stroke()
      }
    }

    context.draw()

  },

  longToZB: function (long, sw, long_max, long_min) {
    var r = 0.9 * (long - long_min) * sw / (long_max - long_min) + sw*0.05
    return r
  },

  latToZB: function (lat, sh, lat_max, lat_min) {
    // var r = sh * 0.05 - ( ( lat - lat_max ) * sh * 0.5) / ( lat_max- lat_min )
    var r = sh * 0.05 - ((lat - lat_max) * this.data.map_h) / (lat_max - lat_min)
    return r
  },

})

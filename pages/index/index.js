//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    colors: ['#FFFF00', '#FF0000', '#C0FF3E', '#00FFFF', '#00EE00', '#FFD700', '#0000EE', '#8A2BE2', '#9AFF9A', '#B452CD'],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (options) {

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

    try{
      var m = require("../../data/provices/" + options.provice + ".js")
    }
    catch(err){
      console.log(err)
    }

    var map = m.proviceCoor
    var dingWei = m.dingWei
    var map_h = 0.9 * this.data.s_width * ( dingWei['lat_max'] - dingWei['lat_min'] ) / ( dingWei['long_max'] - dingWei['long_min'] )
    this.setData({
      dingWei: dingWei,
      map: map,
      map_h: map_h
    })
    // console.log(dijiShi, dingWei)

    this.setData({
      home_long: options.home_long,
      home_lat: options.home_lat,
      zuobiao: wx.getStorageSync('xiangjishisChoosed_jwd'),
      citys: wx.getStorageSync('xiangjishisChoosed'),
      To: options.To,
    })

  },

  onReady: function(){
    var context = wx.createCanvasContext('firstCanvas')

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
        context.setStrokeStyle("white")
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

    console.log("我的彩色旅途")
    // var allDistance = d.allDistance(this.data.zuobiao)
    // console.log("总里程为：", allDistance)

    context.beginPath()
    context.setStrokeStyle("red")
    context.setLineWidth(1)
    var zuobiao = this.data.zuobiao
    var ok = zuobiao.unshift([this.data.home_long, this.data.home_lat])

    for (var i = 0; i < ok - 1; i++) {
      context.beginPath()
      context.moveTo(this.longToZB(zuobiao[i][0], this.data.s_width, this.data.dingWei['long_max'], this.data.dingWei['long_min']), this.latToZB(zuobiao[i][1], this.data.s_height, this.data.dingWei['lat_max'], this.data.dingWei['lat_min']))
      context.lineTo(this.longToZB(zuobiao[i + 1][0], this.data.s_width, this.data.dingWei['long_max'], this.data.dingWei['long_min']), this.latToZB(zuobiao[i + 1][1], this.data.s_height, this.data.dingWei['lat_max'], this.data.dingWei['lat_min']))
      context.setStrokeStyle(this.data.colors[parseInt(10 * Math.random())])
      context.stroke()
    }

    for (var i = 0; i < ok; i++) {
      context.beginPath()
      context.arc(this.longToZB(zuobiao[i][0], this.data.s_width, this.data.dingWei['long_max'], this.data.dingWei['long_min']), this.latToZB(zuobiao[i][1], this.data.s_height, this.data.dingWei['lat_max'], this.data.dingWei['lat_min']), 2, 0, 2 * Math.PI)
      context.setFillStyle(this.data.colors[parseInt(10 * Math.random())])
      context.fill()
    }

    context.beginPath()
    context.setFontSize(16)
    context.setFillStyle(this.data.to_color)
    context.fillText(this.data.To + ": " + "( " + '0' + "公里 )", 0.05 * this.data.s_width, 0.52 * this.data.s_height)

    //端午定制版
    // context.fillText("不屈的流放" + ": ", 0.05 * this.data.s_width, 0.52 * this.data.s_height)

    context.beginPath()
    // this.writeCityName(context)
    context.stroke()



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

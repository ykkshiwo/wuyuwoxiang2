// pages/shengji/shengji.js
const PDX = require("../../data/provicesDijishiXianjishi.js")
const pdx = PDX.pdx

const CJWD = require("../../data/citysJWD.js")
const cjwd = CJWD.citysJWD

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chinaProvices: ["河北省", "山西省", "吉林省", "辽宁省", "黑龙江省", "陕西省", "甘肃省", "青海省", "山东省", "福建省", "浙江省", "台湾省", "河南省", "湖北省", "湖南省", "江西省", "江苏省", "安徽省", "广东省", "海南省", "四川省", "贵州省", "云南省", "北京市", "天津市", "上海市", "重庆市", "内蒙古自治区", "新疆维吾尔族自治区", "宁夏回族自治区", "广西壮族自治区", "西藏藏族自治区", "香港特别行政区", "澳门特别行政区"],
    display: false,
    xiangjishisChoosed: [],
  },

  chooseP: function(event){
    var provice = event.currentTarget.id;
    console.log("../../data/provices/" + provice + ".js")
    console.log(pdx[provice])
    var dijishis = []
    for (var key in pdx[provice]){
      var j = dijishis.unshift(key)
    }
    console.log(dijishis)
    this.setData({
      dijishis: dijishis,
      display:true,
      dijishis_xianjishis: pdx[provice],
      provice: provice,
    })
    try{
      var m = require("../../data/provices/" + provice + ".js")
    }
    catch(err){
      console.log(err)
    }
  },

  chooseD: function(event){
    var dijishi = event.currentTarget.id;
    console.log(dijishi);
    var xianjishis = this.data.dijishis_xianjishis[dijishi]
    this.setData({
      xianjishis: xianjishis,
    })
  },

  chooseX: function(event){
    var xianjishi = event.currentTarget.id;
    console.log(xianjishi);
    this.data.xiangjishisChoosed.unshift(xianjishi)
    this.setData({
      xiangjishisChoosed: this.unique(this.data.xiangjishisChoosed)
    })
    console.log(this.data.xiangjishisChoosed)
  },

  unique: function (array) {
    var n = {}, r = [], len = array.length, val, type;
    for (var i = 0; i < array.length; i++) {
      val = array[i];
      type = typeof val;
      if (!n[val]) {
        n[val] = [type];
        r.push(val);
      } else if (n[val].indexOf(type) < 0) {
        n[val].push(type);
        r.push(val);
      }
    }
    return r;
  },

  produce: function(){

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
  
  }
})
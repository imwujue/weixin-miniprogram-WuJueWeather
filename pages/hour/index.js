// pages/hour/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.getLocation();
    wx.setNavigationBarTitle({
      title: 'WuJue天气',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index",
      success: function () {
        wx.showToast({
          title: '分享成功',
          icon: "success",
          duration: 2000
        })
      }
    }
  },

  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("lat:" + latitude + "lon:" + longitude);
        that.getCity(latitude, longitude);
      }
    })
  },

  getCity: function (latitude, longitude) {
    var that = this;
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "DjF8oGTXaWd3c2Prs5sPh4Mgv8eGgVVO",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;

        that.setData({
          city: city,
          district: district,
          street: street,
        })

        var descCity = city.substring(0, city.length - 1);
        that.getWeather(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  getWeather: function (city) {
    var that = this;
    var url = "https://free-api.heweather.com/s6/weather";
    var parameters = {
      location: city,
      key: "f5a5b6e1918e449e8e78162450cbb813"
    }
    wx.request({
      url: url,
      data: parameters,
      success: function (res) {
        var hour = res.data.HeWeather6[0].hourly;
        console.log(hour);
        that.setData({
          hour:hour
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
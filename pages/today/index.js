// pages/today/index.js
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
        var lifestyle = res.data.HeWeather6[0].lifestyle;
        var comf = res.data.HeWeather6[0].lifestyle[0].brf;
        var comf_txt = res.data.HeWeather6[0].lifestyle[0].txt;
        var drsg = res.data.HeWeather6[0].lifestyle[1].brf;
        var drsg_txt = res.data.HeWeather6[0].lifestyle[1].txt;
        var flu = res.data.HeWeather6[0].lifestyle[2].brf;
        var flu_txt = res.data.HeWeather6[0].lifestyle[2].txt;
        var sport = res.data.HeWeather6[0].lifestyle[3].brf;
        var sport_txt = res.data.HeWeather6[0].lifestyle[3].txt;
        var uv = res.data.HeWeather6[0].lifestyle[5].brf;
        var uv_txt = res.data.HeWeather6[0].lifestyle[5].txt;
        var cw = res.data.HeWeather6[0].lifestyle[6].brf;
        var cw_txt = res.data.HeWeather6[0].lifestyle[6].txt;
        var air = res.data.HeWeather6[0].lifestyle[7].brf;
        var air_txt = res.data.HeWeather6[0].lifestyle[7].txt;
        console.log(lifestyle);
        that.setData({
          comf:comf,
          comf_txt: comf_txt,
          drsg: drsg,
          drsg_txt: drsg_txt,
          uv:uv,
          uv_txt:uv_txt,
          cw:cw,
          cw_txt:cw_txt,
          air:air,
          air_txt:air_txt,
          sport: sport,
          sport_txt: sport_txt,
          flu:flu,
          flu_txt:flu_txt,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      
    })
  }
})
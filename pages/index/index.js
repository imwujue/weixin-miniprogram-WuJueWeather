// pages/weather/weather.js
var app = getApp()
var util = require('../../utils/util.js');
var day = ["今天", "明天", "后天"]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    day: day,
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
      return{
        path:"/pages/index/index",
        success:function(){
          wx.showToast({
            title: '分享成功',
            icon:"success",
            duration:2000
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
    var url = "https://free-api.heweather.com/s6/weather"
    var url2 = "https://free-api.heweather.com/s6/air"
    var parameters = {
      location: city,
      key: "f5a5b6e1918e449e8e78162450cbb813"
    }
    wx.request({
      url: url,
      data: parameters,
      success: function (res) {
        var tmp = res.data.HeWeather6[0].now.tmp;
        var txt = res.data.HeWeather6[0].now.cond_txt;
        var code = res.data.HeWeather6[0].now.cond_code;
        var dir = res.data.HeWeather6[0].now.wind_dir;
        var sc = res.data.HeWeather6[0].now.wind_sc;
        var hum = res.data.HeWeather6[0].now.hum;
        var fl = res.data.HeWeather6[0].now.fl;
        var daily_forecast = res.data.HeWeather6[0].daily_forecast;
        var today = res.data;
        let time = util.formatDate(new Date());
        let date = util.getDates(7, time);
        for(var i=0;i<7;i++){
          daily_forecast[i].dayofweek = date[i].week;
        };
        console.log(date);
        console.log(today);
        console.log(daily_forecast);
        that.setData({
          tmp: tmp,
          txt: txt,
          code: code,
          dir: dir,
          sc: sc,
          hum: hum,
          fl: fl,
          daily_forecast: daily_forecast,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      url: url2,
      data: parameters,
      success: function (res) {
        var qlty = res.data.HeWeather6[0].air_now_city.qlty;
        var pm25 = res.data.HeWeather6[0].air_now_city.pm25;
        that.setData({
          qlty: qlty,
          pm25: pm25
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
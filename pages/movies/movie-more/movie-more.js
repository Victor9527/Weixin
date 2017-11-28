var app = getApp();
var Utils = require("../../utils/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    url:"",
    currentStart:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentType = options.category;
    var publicUrl = app.globalUrl.doubanUrl;
    switch (currentType) {
      case "正在热映":
        publicUrl += "/v2/movie/in_theaters";
        break;
      case "即将上映":
        publicUrl += "/v2/movie/coming_soon";
        break;
      case "排行榜":
        publicUrl += "/v2/movie/top250";
        break;
    }
    this.setData({url:publicUrl})
    Utils.http(publicUrl, this.getMovies,{start:0,count:20})
    wx.showLoading({
      title: "Loading...",
      mask: false
    })
    wx.setNavigationBarTitle({
      title: currentType
    })

  },
  getMovies: function (data) {
    wx.hideToast();
    var movies = [];
    for (var i in data.subjects) {
      var moviesObj = {
        id: data.subjects[i].id,
        title: Utils.cutTitle(data.subjects[i].title),
        image: data.subjects[i].images.large,
        star: Utils.cutStars(data.subjects[i].rating.stars),
        average: data.subjects[i].rating.average
      };
      movies.push(moviesObj);
    }
    //上拉加载的数据累加
    var totalMovies = [];
    totalMovies = this.data.movies.concat(movies);
    this.setData({
      currentStart:this.data.currentStart+=20,
      movies:totalMovies
    })
    if(movies.length==0){
      wx.showToast({
        title:"数据加载完了，没有啦",
        icon:"success",
        duration:2000
      })
    }

  },


  

  onReachBottom: function () {
    wx.showLoading({
      title: '别急，数据加载中...',
      mask: true
    })
    Utils.http(this.data.url, this.getMovies, { start: this.data.currentStart, count: 20 })
  },

  /**
   * 下拉刷新
   * 
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '别急，数据加载中...',
      mask: true
    })
    this.setData({
      movies: []
    })
    Utils.http(this.data.url, this.getMovies, { start: 0, count: 20 });
  }

})
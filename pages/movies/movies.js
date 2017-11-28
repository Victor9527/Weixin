// pages/movies/movies.js
var app=getApp();
var utils=require("../utils/utils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    inTheathers: {},
    comingSoon: {},
    top250: {},
    category: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var publicUrl=app.globalUrl.doubanUrl;
    this.http(publicUrl+"/v2/movie/in_theaters?start=0&count=3", this.getNewsInfo, "inTheathers", "正在热映");//最后三个是 下面回调function 传过去的三个参数
    this.http(publicUrl+"/v2/movie/coming_soon?start=0&count=3", this.getNewsInfo, "comingSoon", "即将上映");
    this.http(publicUrl+"/v2/movie/top250?start=0&count=3", this.getNewsInfo, "top250", "排行榜" );
    wx.showLoading({
      title:"Loading...",
      mask:false  //是否允许加载时候动用别的操作  false:允许
    
    })

  },

  http: function (url, callback, type, category) {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function (data) {
        callback(data.data, type, category);
      }
    })
  },

  getNewsInfo: function (data, type, category) {
    //加载完毕后隐藏 loading....
    wx.hideToast();
  
    var movies = [];
    for (var i in data.subjects) {

      var movieObj = {
        id: data.subjects[i].id,
        title: utils.cutTitle(data.subjects[i].title),
        image: data.subjects[i].images.large,
        star: utils.cutStars(data.subjects[i].rating.stars),
        average: data.subjects[i].rating.average

      };
      movies.push(movieObj);

    }
    

    var readyMovies={};
      readyMovies[type]={
        movies:movies,
        category:category
      }

    this.setData(readyMovies)
  },
  goMoviesMore:function(event){
      var category = event.currentTarget.dataset.type;
    

      wx.navigateTo({
        url: './movie-more/movie-more?category='+category,
        
      })
     

  }
 
})



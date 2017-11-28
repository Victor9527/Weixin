var newInit = require("../data/data.js");



/*for(let i of newsCommentsB){
     newsNick.push(i.nick)
}
console.log(newsNick)*/

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperData:{
      indicatorDots: true,
      indicatorColor: "#aaa",
      indicatorActiveColor: "#f1f1f1",
      autoplay: true,
      interval: 3000,
      circular: true
    },
    newsData:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsData: newInit,

    })
  

  },

  goNewsDetails:function(event){
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: './news-details/news-details?newsid=' + newsId,
    })
  }

})
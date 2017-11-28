var newsInit = require("../../data/data.js");
var newsComments = [];
var newsCommentsB = [];

/*
无效
for (let i of newsInit) {
  newsComments.push(i.comments);
  for (var j of newsComments) {




  }

  newsCommentsB.push(...j);
}
*/

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsData: {},
    newsid:0,
    item:false,
    newsNick: [],
  },

  /**
   * 生命周期函数--监听页面加载
   * options:接受页面传递的数据
   */
  onLoad: function (options) {
    var newId = options.newsid;
    this.setData({
      newsData: newsInit[newId],
      newsNick: newsInit[newId].comments,
      newsid: newId

    })
    var newsCollect = wx.getStorageSync("newsCollect");
    if (newsCollect) {

      var itemCollect = newsCollect[newId];
      this.setData({
        item:itemCollect
      })

    } else {
        var firstCollect={};
        firstCollect[newId]=false;
        wx.setStorageSync("newsCollect",firstCollect);

    }

  },

  //点击收藏
  collectEvent: function () {

    var newsCollect = wx.getStorageSync("newsCollect");
    var itemCollect = newsCollect[this.data.newsid];
    //响应用户操作
    itemCollect = !itemCollect;
    newsCollect[this.data.newsid] = itemCollect;
    //更新view
    this.setData({
      item: itemCollect
    })
    //重新储存
    wx.setStorageSync("newsCollect", newsCollect)
  },

  //分享页面
  onShareAppMessage:function(res){
      return{
        title:"新闻页面",
        path:"./pages/news/news=details/news-details?newsid="+this.data.newsid,
        success:function(){
          console.log("分享成功")
        }
      }
  },
  menuEvent:function(event){
        wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }


})
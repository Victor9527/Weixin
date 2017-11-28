Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //创建事件
  /**
   * 冒泡：bind
   * 非冒泡：catch
   * tap、touchstart、touchmove、touchcancel、touchcancel、longpress
   * 
   * 
   * bindtap   bindtouchstart
   * catchtap  catchtouchstart
   * 
   * 跳转：
   *  navigateTo
   *  保留当前页面，跳转到应用内的某个页面
   *  注意：为了不让用户在使用小程序时造成困扰，我们规定页面路径只能是五层，请尽量避免多层级的交互方式
   * 
   */
  goNewsEvent:function(event){
    wx.navigateTo({
      url: '../news/news',
      success:function(){
        console.log("跳转成功了")
      }
    })
  }
    
})
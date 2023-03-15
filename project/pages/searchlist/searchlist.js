import request from "../../utils/request"

// pages/searchlist/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.getList(options.id)
  },

  getList(id){
    request({
      url: `/categories/${id}?_embed=goods`
    }).then(res=>{
      console.log(res)
      this.setData({
        goodsList: res.goods
      })
    })
  },

  handleTap(event){
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`,
      // events: events,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  handlePrice(){
    this.setData({
      goodsList: this.data.goodsList.sort((item0, item1)=>item0.price - item1.price)
    })
  },

  handleReview(){
    this.setData({
      goodsList: this.data.goodsList.sort((item0, item1)=>parseInt(item0.goodcomment) - parseInt(item1.goodcomment))
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
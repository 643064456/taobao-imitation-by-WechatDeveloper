// pages/home/home.js
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    goodsList: [],
    newLoad: 1,
    length: 0
  },

  // handleGet(){
  //   request({
  //     url: '/users',
  //   }).then(res=>{
  //     console.log(res)
  //   })
  // },

  // handlePost(){
  //   request({
  //     url: '/users',
  //     method: "POST",
  //     data: {
  //       username: "xiaoyuren",
  //       password: "123"
  //     }
  //   }).then(res=>{
  //     console.log(res)
  //   })
  // },

  // handlePut(){
  //   request({
  //     url: '/users/1',
  //     method: "PUT",
  //     data: {
  //       username: "xiaoyu",
  //       password: "456"
  //     }
  //   }).then(res=>{
  //     console.log(res)
  //   })
  // },

  // handleDelete(){
  //   request({
  //     url: '/users/1',
  //     method: "DELETE",
  //   }).then(res=>{
  //     console.log(res)
  //   })
  // },

  handleEvent(){
    wx.navigateTo({
      url: '/pages/search/search',
      // events: events,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.renderSwiper()
    this.renderList()
  },

  renderSwiper(){
    request({
      url: "/recommends"
    }).then(res=>{
      console.log(res)
      this.setData({
        dataList: res
      })
    })
  },

  renderList(){
    request({
      url: `/goods?_page=${this.data.newLoad}&_limit=5`
    },true).then(res=>{
      console.log(res)
      this.data.length = res.length
      this.setData({
        goodsList: [...this.data.goodsList,...res.list]
      })
    })
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
    setTimeout(()=>{
      wx.stopPullDownRefresh({
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.data.newLoad++
    if (this.data.goodsList.length != this.data.length)
    this.renderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
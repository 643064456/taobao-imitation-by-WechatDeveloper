// pages/detail/detail.js
import request from "../../utils/request"
import checkAuthor from "../../utils/authorize"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    index: 0,
    review: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.getDetail(options.id)
    this.getReview()
  },

  getDetail(id){
    request({
      url: `/goods/${id}`
    }).then(res=>{
      console.log(res)
      this.setData({
        info: res
      })
    })
  },

  handleSwiper(event){
    wx.previewImage({
      urls: this.data.info.slides.map(item=>`http://localhost:5001${item}`),
      current: event.currentTarget.dataset.id,
      showmenu: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  handleTap(event){
    this.setData({
      index: event.currentTarget.dataset.index
    })
  },

  getReview(){
    request({
      url: "/comments"
    }).then(res=>{
      console.log(res)
      this.setData({
        review: res
      })
    })
  },

  handleEvent(){
    wx.navigateTo({
      url: '/pages/search/search',
      // events: events,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  handldeAdd(){
    checkAuthor(()=>{})
    console.log("get")
    let {nickName} = wx.getStorageSync('token')
    let goodId = this.data.info.id
    request({
      url: '/carts',
      data: {
        username: nickName,
        goodId
      }
    }).then(res=>{
      console.log(res)
      if(res.length == 0){
        return request({
          url: '/carts',
          method: 'post',
          data: {
            "username": nickName,
            "goodId": goodId,
            "number": 1,
            "checked": false
          }
        })
      }
      else{
        return request({
          url: `/carts/${res[0].id}`,
          method: 'put',
          data: {
            ...res[0],
            number: res[0].number + 1
          }
        })
      }
    }).then(res=>{
      wx.showToast({
        title: '添加成功',
        // duration: 0,
        // icon: icon,
        // image: 'image',
        // mask: true,
        // success: (res) => {},
        // fail: (res) => {},
        // complete: (res) => {},
      })
    })
  },

  handldeBuy(){},

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
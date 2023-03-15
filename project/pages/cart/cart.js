// pages/cart/cart.js
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }],
    cartList: []
  },

  handleCheck(event){
    var item = event.currentTarget.dataset.item
    item.checked = !item.checked
    this.handleUpdate(item)
  },

  handleUpdate(item){
    this.setData({
      cartList: this.data.cartList.map(data=>{
        if(data.id == item.id){
          return item
        }
        else return data
      })
    })
    request({
      url: `/carts/${item.id}`,
      method: "put",
      data: {
        "username": item.username,
        "goodId": item.goodId,
        "number": item.number,
        "checked": item.checked
      }
    })
  },

  handleLeft(event){
    var item = event.currentTarget.dataset.item
    if(item.number > 1){
      item.number--
    }
    this.handleUpdate(item)
  },

  handleRight(event){
    var item = event.currentTarget.dataset.item
    item.number++
    this.handleUpdate(item)
  },

  slideButtonTap(event){
    var id = event.currentTarget.dataset.id
    this.setData({
      cartList: this.data.cartList.filter(item=>item.id!=id)
    })
    request({
      url: `/carts/${id}`,
      method: "delete"
    })
  },

  handleChecked(event){
    if(event.detail.value.length == 0){
      this.setData({
        cartList: this.data.cartList.map(item=>({
          ...item,
          checked: false
        }))
      })
    }
    else{
      this.setData({
        cartList: this.data.cartList.map(item=>({
          ...item,
          checked: true
        }))
      })
    }
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(wx.getStorageSync('token'))
    if (!wx.getStorageSync('token')){
      wx.navigateTo({
        url: '/pages/login/login',
        // events: events,
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }
    let {nickName} = wx.getStorageSync('token')
    request({
      url: `/carts?_expand=good&username=${nickName}`
    }).then(res=>{
      console.log(res)
      this.setData({
        cartList: res
      })
    })
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
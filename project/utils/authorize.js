function checkAuthor(){
  if (!wx.getStorageSync('token')){
    wx.getUserProfile({
      desc: '用于授权购买',
      // lang: lang,
      success: (result) => {
        console.log(result.userInfo)
        wx.setStorageSync('token', result.userInfo)
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
}

export default checkAuthor
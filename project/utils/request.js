function request(parameter, needLength = false){
  return new Promise((resolve, reject)=>{
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
    wx.request({
      ...parameter,
      url: 'http://localhost:5001' + parameter.url,
      success: (res)=>{
        if (needLength){
          resolve({
            list: res.data,
            length: res.header["X-Total-Count"]
          })
        }
        else{
          resolve(res.data)
        }
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{
        wx.hideLoading({
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
      }
    })
  })
}

export default request
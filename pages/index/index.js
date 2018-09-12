//index.js
//获取应用实例
import config from '../../config'

Page({
  data: {
    detail: '识别中..',
    url: ''
  },
  onLoad({ picurl, detail }) {
    wx.setNavigationBarTitle({
      title: 'AI深度识图',
    })
    if (picurl) {
      this.setData({
        url: picurl,
        detail
      }, () => {
        this.sendImg(this.data.url)
      })
    }
  },
  onUploadAvatar() {
    let that = this;
    wx.showLoading({
      title: '处理中',
    })
    wx.getUserInfo({
      success(weChatInfo) {
        let url = weChatInfo.userInfo.avatarUrl.slice(0, -3) + '0' // 转化成高清图
        that.sendImg(url)
      },
      fail() {
        wx.showToast({
          title: '授权失败, ai无法从头像识别',
          icon: 'none'
        })
      }
    })
  },
  onUploadPic(e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success(res) {
        wx.showLoading({
          title: '处理中',
        })
        that.upoloadFile(res.tempFilePaths[0])
      }
    })
  },
  upoloadFile(pic) {
    let that = this
    wx.uploadFile({
      url: config.uploadServerUrl,
      filePath: pic,
      name: 'File',
      success(res) {
        /**
         * 从服务器拿到上传后图片的地址
         */
        that.setData({ url:res.data.url }, () => {
          that.sendImg(that.data.url)
        })
      },
      fail() {
        wx.showToast({
          title: '上传失败',
          icon: 'fail',
        })
      }
    })
  },
  sendImg(url) {
    let that = this;
    wx.request({
      method: 'get',
      url: config.ServerUrl,
      success(res) {
        if (res.data.error) {
          wx.showToast({
            title: '图片当前仅支持jpg格式',
            icon: 'none'
          })
          wx.hideLoading()
          return
        } else {
          /**
           * 在gotalk的结果中选择概率最大的
           */
          res.data.results.sort((a, b) => {
            if (a.probability > b.probability) return -1
            else return 1
          })
          that.setData({
            detail: res.data.results[0].sentence,
            url,
          }, () => {
            wx.hideLoading()
          })
        }
      }
    })
  },
  onShareAppMessage() {
    if(this.data.oss_key) {
      return {
        title: 'AI智能识图来了，快来看看我的识别结果',
        path: '/pages/index/index?url=' + this.data.url + '&detail=' + this.data.detail
      }
    } else {
      return {
        title: 'AI智能识图来了，从此告别脸盲'
      }
    }
  }
})

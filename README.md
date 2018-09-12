# 深度识图

深度识图是基于[gotalk](https://github.com/agilab/gotalk)作为后端识别引擎的前端小程序

能识别大部分人物场景, 也可以直接从头像识别

# Demo

![](./example/demo.jpeg)

# 在线体验

扫一扫小程序码

![](./example/qrcode.jpg)


# 快速上手

1. 后端

[gotalk](https://github.com/agilab/gotalk)提供了后端的基本接口, 以及图片识别算法.

此外还需要一个[服务接口](https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html)处理小程序的图片上传并返回图片地址, 请开发者自行解决

2. 前端

首先在**project.config.json**添加自己的appid

在**config.js**中添加自己的后端服务地址地址

```js

export default {
    ServerUrl: '', // 在这里修改ServerUrl,也就是gotalk的地址
    uploadServerUrl: '' // 小程序图片上传的地址
}

```

之后 用微信开发者工具打开, 快速使用

# 其他

目前不支持除jpg以外的图片, 有条件可用oss自行解决
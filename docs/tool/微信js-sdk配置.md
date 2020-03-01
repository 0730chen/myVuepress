---
title: 微信Js-sdk配置
---
#### 微信js-sdk配置
     * 微信公众平台的开发者账号
     * 一个服务器，开放443端口并且配置ssl 使用https 域名设置
     * 申请微信公众平台进入公众号设置js接口安全域名
     
#### 开始使用
    * 在需要引用的页面中引入 http://res.wx.qq.com/open/js/jweixin-1.4.0.js
    * 输入配置信息
   ```javascript
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: '', // 必填，公众号的唯一标识
          timestamp:'', // 必填，生成签名的时间戳
          nonceStr: '', // 必填，生成签名的随机串
          signature: '',// 必填，签名
          jsApiList: [] // 必填，需要使用的JS接口列表
        });
   ```
1. 在配置文件中我们需要填写申请的appid 生成时间戳，生成的随机字符串，微信后台返回的签名，还有需要使用的接口列表
   * appid 是申请的账号id
   * timestamp 当前时间生成的时间戳
   * nonceStr 是填写服务器时的字符串
#### 获取signature
   * 首先要获取access_token 
     服务端发送请求携带参数请求 https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
     接受到返回的参数就是access_token 和有效时间
   * 获取到了access_token后要使用这个token获取Ticket
     携带参数发起请求到'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';
   * getNonceStr 处理字符串
     字符串是在后台配置时填写的
   * 生成时间戳
     时间戳有位数限制需要转换单位
     ```JAVAScript
         function getTime() {
            return new Data().getTime()/1000    
        }   
     ```
     * 拼接字符串
     ```javascript  
     以如下格式拼接字符串 let str = 'jsapi_ticket=' + jsapi_ticket + ‘&noncestr=’ + noncestr + ‘&timestamp=’ + timestamp + ‘&url=’ + url
     ```
     * 将拼接的字符串使用sha1()算法加密，然后返回给前端页面
     * 前端页面引入的js文件会对这个ticke进行检查，是否合法
   



    
(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{593:function(t,s,a){"use strict";a.r(s);var n=a(4),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h4",{attrs:{id:"填写服务器的配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#填写服务器的配置"}},[t._v("#")]),t._v(" 填写服务器的配置")]),t._v(" "),a("ol",[a("li",[t._v("登录微信公众平台官网后，在公众平台官网的开发-基本设置页面，勾选协议成为开发者")]),t._v(" "),a("li",[t._v("点击“修改配置”按钮，填写服务器地址（URL）、Token和EncodingAESKey，其中URL是开发者用来接收微信消息和事件的接口URL。")]),t._v(" "),a("li",[t._v("Token可由开发者可以任意填写，用作生成签名（该Token会和接口URL中包含的Token进行比对，从而验证安全性）。EncodingAESKey由开发者手动填写或随机生成，将用作消息体加解密密钥。")])]),t._v(" "),a("h4",{attrs:{id:"来自微信服务器的消息验证"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#来自微信服务器的消息验证"}},[t._v("#")]),t._v(" 来自微信服务器的消息验证")]),t._v(" "),a("ol",[a("li",[t._v("开发者提信息后，微信服务器将发送get请求到填写的服务器地址url上")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数")]),t._v(" "),a("th",[t._v("含义")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("signature")]),t._v(" "),a("td",[t._v("微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。")])]),t._v(" "),a("tr",[a("td",[t._v("timestamp")]),t._v(" "),a("td",[t._v("时间戳")])]),t._v(" "),a("tr",[a("td",[t._v("nonce")]),t._v(" "),a("td",[t._v("随机数")])]),t._v(" "),a("tr",[a("td",[t._v("echostr")]),t._v(" "),a("td",[t._v("随机字符串")])])])]),t._v(" "),a("p",[t._v("2.成为开发者后，用户每次向公众号发送消息、或者产生自定义菜单、或产生微信支付订单等情况时，开发者填写的服务器配置URL将得到微信服务器推送过来的消息和事件，开发者可以依据自身业务逻辑进行响应，如回复消息。")]),t._v(" "),a("p",[t._v("3.微信公众号接口必须以"),a("a",{attrs:{href:"http://xn--https-wm6j://%E5%BC%80%E5%A4%B4%EF%BC%8C%E5%88%86%E5%88%AB%E6%94%AF%E6%8C%8180%E7%AB%AF%E5%8F%A3%E5%92%8C443",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://或https://开头，分别支持80端口和443"),a("OutboundLink")],1),t._v("端口。")]),t._v(" "),a("h4",{attrs:{id:"自定义菜单"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自定义菜单"}},[t._v("#")]),t._v(" 自定义菜单")]),t._v(" "),a("ul",[a("li",[t._v("自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单。")]),t._v(" "),a("li",[t._v("一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替。")]),t._v(" "),a("li",[t._v("创建自定义菜单后，菜单的刷新策略是，在用户进入公众号会话页或公众号profile页时，如果发现上一次拉取菜单的请求在5分钟以前，就会拉取一下菜单，如果菜单有更新，就会刷新客户端的菜单。测试时可以尝试取消关注公众账号后再次关注，则可以看到创建后的效果。​")])]),t._v(" "),a("p",[t._v("具体配置可以查看官方文档 "),a("a",{attrs:{href:"https://developers.weixin.qq.com/doc/",target:"_blank",rel:"noopener noreferrer"}},[t._v("微信开放文档"),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"button"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"click"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"今日歌曲"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"key"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"V1001_TODAY_MUSIC"')]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n           "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"菜单"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sub_button"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n           "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n               "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"view"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n               "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"搜索"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n               "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://www.soso.com/"')]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                 "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"miniprogram"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                 "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"wxa"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                 "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://mp.weixin.qq.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                 "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"appid"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"wx286b93c14bbf93aa"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                 "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"pagepath"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"pages/lunar/index"')]),t._v("\n             "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n               "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"click"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n               "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"赞一下我们"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n               "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"key"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"V1001_GOOD"')]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"微信公众号会话"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#微信公众号会话"}},[t._v("#")]),t._v(" 微信公众号会话")]),t._v(" "),a("p",[t._v("公众号是以微信用户的一个联系人形式存在的，消息会话是公众号与用户交互的基础。目前公众号内主要有这样几类消息服务的类型")]),t._v(" "),a("ul",[a("li",[t._v("群发消息：服务号可以每月4次，形式如何会话聊天一样，订阅号每天可以发一次，向用户群发消息，包括文字消息、图文消息、图片、视频、语音等")]),t._v(" "),a("li",[t._v("被动回复消息：用户再给公众号发送消息后，微信服务器会将该消息发送到预先设置好的服务器地址，可以回复一个消息，也可以回复命令告诉微信服务器这条消息暂不回复。被动回复消息可以设置加密")]),t._v(" "),a("li",[t._v("客服消息：在用户给公众号发消息后的48小时内，公众号可以给用户发送不限数量的消息，主要用于客服场景。用户的行为会触发事件推送，某些事件推送是支持公众号据此发送客服消息的，详见微信推送消息与事件说明文档")]),t._v(" "),a("li",[t._v("模板消息：在需要对用户发送服务通知（如刷卡提醒、服务预约成功通知等）时，公众号可以用特定内容模板，主动向用户发送消息，比如一些商家的排号")])]),t._v(" "),a("h4",{attrs:{id:"公众号内网页"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#公众号内网页"}},[t._v("#")]),t._v(" 公众号内网页")]),t._v(" "),a("p",[t._v("和微信H5应用类似，需要调用微信js-sdk")]),t._v(" "),a("ul",[a("li",[t._v("网页授权获取用户基本信息：通过该接口，可以获取用户的基本信息（获取用户的OpenID是无需用户同意的，获取用户的基本信息则需用户同意)")]),t._v(" "),a("li",[t._v("微信JS-SDK：是开发者在网页上通过JavaScript代码使用微信原生功能的工具包，开发者可以使用它在网页上录制和播放微信语音、监听微信分享、上传手机本地图片、拍照等许多能力。")])])])}),[],!1,null,null,null);s.default=r.exports}}]);
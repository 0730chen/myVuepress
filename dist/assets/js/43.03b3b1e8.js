(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{266:function(t,n,s){"use strict";s.r(n);var a=s(0),r=Object(a.a)({},(function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h4",{attrs:{id:"浏览器的渲染原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的渲染原理"}},[t._v("#")]),t._v(" 浏览器的渲染原理")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("进程与线程")]),t._v(" "),s("ul",[s("li",[t._v("进程：启动一个应用时，计算机会启动一个进程，然后分配内存")]),t._v(" "),s("li",[t._v("线程：在创建线程后，也会创建线程用来辅助进程。\n总结：进程包含线程 一个进程可以包含多个线程，进程的内存是线程共享的.")])])]),t._v(" "),s("li",[s("p",[t._v("渲染步骤")]),t._v(" "),s("ul",[s("li",[t._v("Html => 构建Html Dom树 =>构建 Css树 => 然后将Dom树与Css树合并成渲染树 => 然后是定位，布局 ，盒模型，尺寸大小 => paint绘制（顺序是背景色，背景图，border children outline ） => 层叠合成")])])]),t._v(" "),s("li",[s("p",[t._v("经典面试题")]),t._v(" "),s("ul",[s("li",[t._v("从浏览器输入URL中按回车到页面显示过程中发生了什么\n"),s("ol",[s("li",[t._v("浏览器根据URL进行DNS查询")])]),t._v(" "),s("pre",[s("code",[t._v("* 首页从DNS缓存中查询\n* 未在缓存中找到，则不停的向上一级请求DNS服务器\n")])]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("DNS将域名解析成IP地址后建立TCP连接（三次握手，四次挥手）\n"),s("ul",[s("li",[t._v("主要作用是保证数据信息传输的可靠性")])])]),t._v(" "),s("li",[t._v("构建HTTP请求报文")])]),t._v(" "),s("pre",[s("code",[t._v("* 添加HTTP首部\n* 根据同源策略添加cookie\n")])]),t._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[t._v("在TCP连接上发送HTTP报文，等待响应")]),t._v(" "),s("li",[t._v("服务器处理HTTP请求报文，返回响应HTTP响应报文")]),t._v(" "),s("li",[t._v("浏览器处理返回的HTTP响应报文，开始渲染页面\n构建DOM树=>构建Css树=>合成渲染树=>定位布局=>paint绘制页面=>层叠合成 用户就能看到页面了")])])])])]),t._v(" "),s("li",[s("p",[t._v("URL中锚点后面的数据和值是不不会发送到后端服务器")])]),t._v(" "),s("li",[s("p",[t._v("css动画")]),t._v(" "),s("ol",[s("li",[t._v("transition 过渡动画 是一段两个事件节点之间的过程")])]),t._v(" "),s("ul",[s("li",[t._v("transition 属性名，时间 s为单位，过渡方式  延迟多久\nease默认 liner线性 inherit (经常使用)")]),t._v(" "),s("li",[t._v("transform 变换\n"),s("ol",[s("li",[t._v("rotate()旋转，接受一个角度值")]),t._v(" "),s("li",[t._v("translate() 位移，将元素移动 接受一个像素值")]),t._v(" "),s("li",[t._v("scale() 缩放 放大缩小，默认是1")]),t._v(" "),s("li",[t._v("skew()扭曲变形 接受一个角度值")])])])]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("animation 动画是定义关键帧的状态来时间动画效果，可以控制关键帧的播放时间长等功能\n@keyframe 动画名 定义关键帧的所处的状态的样式\n使用  animation:动画名 时间 过渡函数")])]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[t._v("\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("动画名称 heart\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-duration")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("动画执行时间 5S\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-timing-fuction")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("是过渡函数 线性 先快后慢....\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-delay")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("动画延迟时间，设置为负数则表示当前动画被截断\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-iteration-count")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("infinite 动画执行次数 infinite表示一直执行\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-direction")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("normal 动画反向变化\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-fill-mode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("forwards 动画保持开始或者结束时的样式\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-play-state")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("running 动画暂停或者运行\n"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("heart 5s linear 2s infinite alternate-reverse \n\n"),s("span",{pre:!0,attrs:{class:"token atrule"}},[s("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@keyframes")]),t._v(" heart")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("0%")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("scale")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("50%")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("scale")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1.2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("75%")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("scale")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1.2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("100%")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("scale")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])])])])])}),[],!1,null,null,null);n.default=r.exports}}]);
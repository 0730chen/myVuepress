(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{268:function(t,e,r){"use strict";r.r(e);var a=r(0),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h3",{attrs:{id:"活动页面的原理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#活动页面的原理"}},[t._v("#")]),t._v(" 活动页面的原理")]),t._v(" "),r("p",[t._v("主要使用overflow：hidden隐藏超出的页面，给整个页面在一个div标签中，div赋值设置top（向下翻页）或者left（向右翻页），每一页都是固定的距离。这样可以在一个html文件中完成多个页面的展示。")]),t._v(" "),r("h3",{attrs:{id:"图片库原理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#图片库原理"}},[t._v("#")]),t._v(" 图片库原理")]),t._v(" "),r("p",[t._v("使用div标签建立一个大图展示区域，分别使用div建立小图展示区域。给小图定位赋值使用float：left属性，向左浮动，使他们排成一列。简单的页面布置就这样成功了，再加入图片的时候，使用createElement（'img'）方法建立img标签，并建立for循环，使用setattribute（'src',路径）由于路径是字符串，所以要使用拼接字符串的方式，提前将图片的名称设置为1-5.jpg。")]),t._v(" "),r("h3",{attrs:{id:"实现点击小图更新相应的大图"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#实现点击小图更新相应的大图"}},[t._v("#")]),t._v(" 实现点击小图更新相应的大图")]),t._v(" "),r("pre",[r("code",[t._v("给小图区域的父元素绑定一个onclick事件，本来是要给每一个img绑定事件，这里使用了事件冒泡，内部子元素要绑定相同的事件，则可以绑定在他们的父元素上，事件也可以触发，减少代码量。使用getattribute（'src'）方法获取当前点击图片的src路径。，并使用setattribute赋值给大图的src路径，则可以实现点击小图切换到对应大图上。\n")])]),t._v(" "),r("p",[t._v("实现页面的明暗")]),t._v(" "),r("p",[t._v("3.实现简单的轮播图")])])}),[],!1,null,null,null);e.default=s.exports}}]);
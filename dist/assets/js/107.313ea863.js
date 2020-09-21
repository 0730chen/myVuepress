(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{591:function(t,a,s){"use strict";s.r(a);var n=s(4),p=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h4",{attrs:{id:"介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("jQuery是一个JavaScript库，可以极大的简化JavaSript代码的编写\n$()是选择器，相当于document.getElementByName...可以选择标签，（）里面可以是标签，class，id。")])]),t._v(" "),s("li",[s("p",[t._v("基础语法\n所有的jQuery选择器是已美元符号开头。并且在")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ready")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])]),t._v(" "),s("p",[t._v("函数中。这是为了防止文档在加载就绪之前就运行jQuery代码，在DOM（文档模型）加载之前就运行函数，操作可能失败。")]),t._v(" "),s("ul",[s("li",[t._v("基本操作\n"),s("ol",[s("li",[s("p",[t._v("$('*')通配选择符，选取所有元素。")])]),t._v(" "),s("li",[s("p",[t._v("$('p.color'),选取class为color的p标签")])]),t._v(" "),s("li",[s("p",[t._v("$('#id')选取id")])]),t._v(" "),s("li",[s("p",[t._v("$('.class')选取class")])]),t._v(" "),s("li",[s("p",[t._v("常用的有：hide() show()元素的显示和隐藏 fadeln()与fadeout()元素的淡入和淡出，add()与remove()方法，对元素或者class进行增加删除")])]),t._v(" "),s("li",[s("p",[t._v("append()在选择标签结尾添加内容，prepend()在选择标签开头添加内容，after()在被选元素之后插入内容，before()")])]),t._v(" "),s("li",[s("p",[t._v("parents()遍历父类元素，children()遍历子类元素(基于Dom树进行遍历)，siblings()方法进行水平遍历，next(),nextAll()")])])])]),t._v(" "),s("li",[t._v("常用操作\n通过对文档模型的操作，对页面实现各种动画效果，大雪飘落等。\n（1）建立一个标签，并且使用css设定大小，颜色，形成一个静态的雪花\n（2）使用选择器选择这个标签，并且创建相同的标签，并使它的css等于雪花的css名。\n（3）获得屏幕高度和宽度。设定初始位置为0（left和top）使用Math.random()生成随机数使雪花的位置随机出现（改变css中的位置）\n（4）设定一个定时器，每隔10ms生成一个雪花并每次left和top+0.2px。添加判断，left和top超过屏幕大小则重新赋值为0.\n（5） 建立一个for循环不断生成雪花。")])]),t._v(" "),s("h4",{attrs:{id:"jquery与ajax"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jquery与ajax"}},[t._v("#")]),t._v(" jQuery与ajax")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("在一个$")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ready")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//函数中")]),t._v("\n\n  jQ"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("load")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("方法从服务器加载数据，并把返回的数据放入被选元素。\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("selector"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("load")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  jQ"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n")])])])])}),[],!1,null,null,null);a.default=p.exports}}]);
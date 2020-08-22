(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{268:function(t,a,s){"use strict";s.r(a);var n=s(0),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h4",{attrs:{id:"js的作用域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js的作用域"}},[t._v("#")]),t._v(" Js的作用域")]),t._v(" "),s("h5",{attrs:{id:"静态作用域-词法作用域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#静态作用域-词法作用域"}},[t._v("#")]),t._v(" 静态作用域(词法作用域)")]),t._v(" "),s("p",[t._v("1.静态作用域也叫做词法作用域，函数的作用域在函数定义的时候就决定了。")]),t._v(" "),s("h5",{attrs:{id:"动态作用域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态作用域"}},[t._v("#")]),t._v(" 动态作用域")]),t._v(" "),s("p",[t._v("1.函数的作用域是在函数调用的时候才决定的。")]),t._v(" "),s("div",{staticClass:"language-javascript 1.8 extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bar")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bar")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n")])])]),s("p",[t._v("####分析")]),t._v(" "),s("ul",[s("li",[t._v("以词法作用域分析")])]),t._v(" "),s("p",[t._v("执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。")]),t._v(" "),s("ul",[s("li",[t._v("动态作用域分析")])]),t._v(" "),s("p",[t._v("执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。")]),t._v(" "),s("h4",{attrs:{id:"总结-静态作用域根据函数定义时候的查找，动态作用域根据函数调用时候查找"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结-静态作用域根据函数定义时候的查找，动态作用域根据函数调用时候查找"}},[t._v("#")]),t._v(" 总结: 静态作用域根据函数定义时候的查找，动态作用域根据函数调用时候查找")]),t._v(" "),s("h4",{attrs:{id:"执行上下文"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#执行上下文"}},[t._v("#")]),t._v(" 执行上下文")]),t._v(" "),s("p",[t._v("当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。\n有一个入栈和出栈操作")]),t._v(" "),s("h5",{attrs:{id:"全局上下文"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局上下文"}},[t._v("#")]),t._v(" 全局上下文")]),t._v(" "),s("p",[t._v("全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。")]),t._v(" "),s("p",[t._v("在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。")]),t._v(" "),s("p",[t._v("例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。")]),t._v(" "),s("h5",{attrs:{id:"全局对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局对象"}},[t._v("#")]),t._v(" 全局对象")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("全局上下文中的变量对象就是全局对象")])]),t._v(" "),s("li",[s("p",[t._v("this window  严格模式下，全局的this为 undefined")])]),t._v(" "),s("li",[s("p",[t._v("全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。")]),t._v(" "),s("p",[t._v("在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。")]),t._v(" "),s("p",[t._v("例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。")])]),t._v(" "),s("li",[s("p",[t._v("首先会处理函数声明，其次会处理变量声明，如果如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);
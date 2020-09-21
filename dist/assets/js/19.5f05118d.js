(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{502:function(t,s,a){"use strict";a.r(s);var n=a(4),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h4",{attrs:{id:"_5种情况"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5种情况"}},[t._v("#")]),t._v(" 5种情况")]),t._v(" "),a("ul",[a("li",[t._v(".全局范围：它 会指向 全局对象（ 浏览器下指window）")]),t._v(" "),a("li",[t._v(".全局函数调用：它 还是指向全局对象。")]),t._v(" "),a("li",[t._v(".对象函数调用：调用某个对象的函数， 它指向 当前对象。")]),t._v(" "),a("li",[t._v(".使用 new 实例化对象时：它指向 新创建的 对象。")]),t._v(" "),a("li",[t._v(".调用某些方法时：如： Function.prototype 上的 call 或者 apply 方法 以及 with等它指向 传入的对象。")])]),t._v(" "),a("h4",{attrs:{id:"event-handler-中的-this"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#event-handler-中的-this"}},[t._v("#")]),t._v(" Event Handler 中的 this")]),t._v(" "),a("div",{staticClass:"language-javascript 1.8 extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("btn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'click'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 请问这里的 this 是什么")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("currentTarget"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 那么 this 是什么不言而喻")]),t._v("\n")])])]),a("h5",{attrs:{id:"jquery-event-handler-中的-this"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jquery-event-handler-中的-this"}},[t._v("#")]),t._v(" jQuery Event Handler 中的 this")]),t._v(" "),a("ul",[a("li",[t._v("当jQuery的调用处理程序时，this关键字指向的是当前正在执行事件的元素。对于直接事件而言，this 代表绑定事件的元素。对于代理事件而言，this 则代表了与 selector 相匹配的元素。(注意，如果事件是从后代元素冒泡上来的话，那么 this 就有可能不等于 event.target。)若要使用 jQuery 的相关方法，可以根据当前元素创建一个 jQuery 对象，即使用 $(this)。")])]),t._v(" "),a("h5",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ul",[a("li",[t._v("确定this的方法")]),t._v(" "),a("li",[t._v("使用call，apply，bind改写函数确定this")])]),t._v(" "),a("div",{staticClass:"language-javascript 1.8 extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nobj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  \n")])])]),a("p",[t._v("this就是call的一个参数")])])}),[],!1,null,null,null);s.default=e.exports}}]);
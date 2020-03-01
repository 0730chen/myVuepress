(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{259:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h4",{attrs:{id:"vue的双向数据绑定"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue的双向数据绑定"}},[t._v("#")]),t._v(" Vue的双向数据绑定")]),t._v(" "),a("p",[t._v("1.使用Object.defineProperty()\n理解Vue的双向数据绑定，Vue的双向数据绑定是使用Object.defineProperty()来实现的\ndefineProperty()接受三个参数 目标对象，属性值,绑定值 该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。\n使用对象的get，set方法\nget 查询值\nset 接受一个参数，返回一个新的值")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("defineProperty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'n'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n         "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("n        \n         "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n         "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newValue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n             \n         "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("2.使用代理(是一种设计模式) Proxy,不直接对数据进行操作，而是用中介操作\n代理相当于与中介和房东的关系，通过中介，来交换两边的信息\n3.使用代理和Object.defineProperty()实现双向数据绑定\nVue是使用Object.defineProperty()对data对象进行属性进行绑定和监控的")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("     "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" vm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("mydata"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("vm 就是data数据的代理，比如对data.n 进行操作，不直接操作data.n 而是通过vm.n进行操作\n这个new Vue()这一步实现了3个重要步骤")]),t._v(" "),a("ol",[a("li",[t._v("会让vm成为mydata的代理")]),t._v(" "),a("li",[t._v("会对mydata所有属性进行监控")]),t._v(" "),a("li",[t._v("然后当属性变化时，就会改变mydata的属性值，并重新渲染")]),t._v(" "),a("li",[t._v("data中存在的bug\n使用Object.defineProperty()进行数据监听，必须要有一个'n'属性进行监听"),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\ntemplate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<div>{{obj.b}}<button>set b</button></div>")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\nmethods"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setB")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//第二种就是")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setb")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("  \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$mount")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#app"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),t._v("在data中未定义b，所以使用时会报错未定义\n"),a("img",{attrs:{src:"https://i.loli.net/2019/12/23/qLuRD9oX65K8z17.png",alt:"image.png"}}),t._v("\nVue只会检查第一层属性，当他发先有obj就不会再往下在绑定了，\n解决方法\n使用Vue.set或者this.$set进行设置新的属性，这个属性设置后直接被绑定的\n"),a("ol",[a("li",[t._v("新增key也就是属性")]),t._v(" "),a("li",[t._v("自动创建代理和监听")]),t._v(" "),a("li",[t._v("出发UI更新\nthis.$set(this.obj,'b',100),新增了obj的b属性为100")])])])]),t._v(" "),a("p",[t._v("Vue中数组变异方法")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("vueArrat")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("args")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" oldLength "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("super")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("args"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n         "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("oldLength "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                  Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//给每一项都进行set绑定属性")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("    \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("Vue的视图刷新是异步的，发现有更变后会将会将这个任务放在队列中，继续往下执行")]),t._v(" "),a("p",[t._v("1.Computed和watch\nComputed就是计算出一个值的 1.不需要加括号，2.会有依赖缓存\nWatch：监听一个属性，如果变化了就执行一个函数，immediate属性，默认为false deep：true")]),t._v(" "),a("h4",{attrs:{id:"计算属性和方法，和侦听属性的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#计算属性和方法，和侦听属性的区别"}},[t._v("#")]),t._v(" 计算属性和方法，和侦听属性的区别")]),t._v(" "),a("pre",[a("code",[t._v("用于处理复杂逻辑的\n计算属性和方法的区别，计算属性是基于它们的响应式依赖进行缓存的，只有依赖发生改变它才会重新求值，不发生改变则返回之前的结果\n调用方法总会执行这个函数，而是用计算属性是依赖缓存，缓存是为了节省性能的\n\n计算属性和侦听属性\n侦听属性就是watch，观察和响应Vue实例上的数据变动\n计算属性默认只有getter，需要时也可以提供setter\n\n计算属性在大多数情况下合适，但是有时需要一个自定义的侦听器来响应数据变化，当需要在数据变化时执行异步或开销较大的操作时\n\n使用vm.$watch()\nvm.$watch('a.b.c'，function(new,old){\n\n})\nvm.$watch(\nfunction(){}\n)\nvm.$watch返回一个取消观察函数，用来停止触发回调\n\ndeep选项\n为了发现对象内部值的变化，需要在选项参数中指定deep：true，监听数组的变动不需要这样做\n\nimmediate选项\n在选项册数中指定immediate：true将立即以表达式的当前值触发回调\n在带有immediate选项时，不能在第一次回调时取消侦听给定的property\n\nvm.$watch('a',callback,{immediate:true})\nwatch:{}\n\n1.在模板内使用了复杂逻辑表达式时，应当使用计算属性\n2.方法在每次渲染都会执行，然而计算属性根据依赖进行缓存，依赖改变后才会重新执行\n3.在data中数据变动执行异步操作或者开销较大的操作使用watch\n")])])])}),[],!1,null,null,null);s.default=e.exports}}]);
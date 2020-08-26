(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{556:function(t,s,a){"use strict";a.r(s);var n=a(4),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h4",{attrs:{id:"mongodb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mongodb"}},[t._v("#")]),t._v(" Mongodb")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("1. 是一个文档型数据库，在 sql 中，我们的数据层级是：数据库（db） -> 表（table） -> 记录（record）-> 字段；在 mongodb 中，数据的层级是：数据库 -> collection -> document -> 字段。\n2. 文档型数据库可以储存bson，bson是json的扩展，可以储存二进制数据\n")])])]),a("h4",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("* 从官网下载安装，安装后再安装目录有一个mongod.bin文件，点击运行就可以了。\n* 可以下载mongodb可视化工具，有网页版的mongodbadmin和桌面应用工具，在这里推荐使用桌面工具Robo3T\n")])])]),a("h4",{attrs:{id:"在node中连接mongodb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在node中连接mongodb"}},[t._v("#")]),t._v(" 在Node中连接mongodb")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("* mongoose是一个对象关系映射并且集成了promise的链式调用，避免了回调地狱\n1.下载mongoose\n")])])]),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("npm install mongoose\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("使用moogoose\nlet mongoose = require('mongoose')\nmongoose.connect('mongodb的服务地址')\n建立检验模型\nlet From = moogoose.moneyModel('From',{\nname:String,\nage:Number,\n})\nlet use1 = new From({name:'ss',age:18})\nuse1.save().then() 保存数据和查看保存成功后结果\n")])])]),a("p",[t._v("Schema 就是一种检验规则 返回一个promise进行链式操作")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//使用方法")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" Schema "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mongoose"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Schema\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" Animal "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Schema")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\ntitle"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("String"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\nbody"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("String"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" cat "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mongoose"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("moneyModel")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cat'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("Animal"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//此时的cat就是你的collection 就是存全部数据的容器")]),t._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cat "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//导出猫数据的模型")]),t._v("\ncat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//cat就可以去进行数据的增删查改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//添加检验规则，不符合规则的无法存入数据库中")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//在node中使用moudle.exports = 命名导出 和 rquire('')引入")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);
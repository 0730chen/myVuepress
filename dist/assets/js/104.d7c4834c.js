(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{229:function(t,a,s){"use strict";s.r(a);var v=s(0),r=Object(v.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h4",{attrs:{id:"正则表达式介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#正则表达式介绍"}},[t._v("#")]),t._v(" 正则表达式介绍")]),t._v(" "),s("p",[t._v("正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为 regex、regexp 或 RE），计算机科学的一个概念。正则表达式通常被用来检索、替换那些符合某个模式 (规则) 的文本。正则表达式就是规则的定义，满足这一规则的文本会被选中")]),t._v(" "),s("h4",{attrs:{id:"元字符介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#元字符介绍"}},[t._v("#")]),t._v(" 元字符介绍")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("元字符")]),t._v(" "),s("th",[t._v("代表意义")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v(".")]),t._v(" "),s("td",[t._v("匹配除过换行符以外其他的任意字符")])]),t._v(" "),s("tr",[s("td",[t._v("\\w")]),t._v(" "),s("td",[t._v("匹配字母或数字或下划线或汉字")])]),t._v(" "),s("tr",[s("td",[t._v("\\s")]),t._v(" "),s("td",[t._v("匹配任意的空白字符")])]),t._v(" "),s("tr",[s("td",[t._v("\\d")]),t._v(" "),s("td",[t._v("匹配任意数字")])]),t._v(" "),s("tr",[s("td",[t._v("\\b")]),t._v(" "),s("td",[t._v("匹配单词的开始或者结束")])]),t._v(" "),s("tr",[s("td",[t._v("^")]),t._v(" "),s("td",[t._v("匹配字符串的开始")])]),t._v(" "),s("tr",[s("td",[t._v("$")]),t._v(" "),s("td",[t._v("匹配字符串的结束")])])])]),t._v(" "),s("ol",[s("li",[t._v("元字符 ^（和数字6在同一个键位上的符号）和$都匹配一个位置，这和\\b有点类似。^匹配你要用来查找的字符串的开头，$匹配结尾。")])]),t._v(" "),s("ul",[s("li",[t._v("example 5-12位QQ号正则")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" regx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/^\\d{5,12}$/")]),t._v("\n")])])]),s("h4",{attrs:{id:"字符转义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#字符转义"}},[t._v("#")]),t._v(" 字符转义")]),t._v(" "),s("p",[t._v("如果你想查找元字符本身的话，比如你查找.,或者*,就出现了问题：你没办法指定它们，因为它们会被解释成别的意思。这时你就得使用\\来取消这些字符的特殊意义。因此，你应该使用\\.和\\*。")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("example Windows后面跟一个或者多个数字")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" regx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/Windows\\d+/")]),t._v("\n")])])])])]),t._v(" "),s("h4",{attrs:{id:"重复次数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#重复次数"}},[t._v("#")]),t._v(" 重复次数")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("语法")]),t._v(" "),s("th",[t._v("代表意义")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("*")]),t._v(" "),s("td",[t._v("重复零次或更多次")])]),t._v(" "),s("tr",[s("td",[t._v("+")]),t._v(" "),s("td",[t._v("重复一次或更多次")])]),t._v(" "),s("tr",[s("td",[t._v("?")]),t._v(" "),s("td",[t._v("重复零次或一次")])]),t._v(" "),s("tr",[s("td",[t._v("{n}")]),t._v(" "),s("td",[t._v("重复n次")])]),t._v(" "),s("tr",[s("td",[t._v("{n,}")]),t._v(" "),s("td",[t._v("重复n次或更多次")])]),t._v(" "),s("tr",[s("td",[t._v("n,m}")]),t._v(" "),s("td",[t._v("重复n到m次")])])])]),t._v(" "),s("h4",{attrs:{id:"如何匹配元字符中未定义的字符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何匹配元字符中未定义的字符"}},[t._v("#")]),t._v(" 如何匹配元字符中未定义的字符")]),t._v(" "),s("p",[t._v("使用[]限定出现的字符范围")]),t._v(" "),s("ul",[s("li",[t._v("example [0-9]")])]),t._v(" "),s("p",[t._v("代表了可以出现0-9的任意数字和/d是含义一致")]),t._v(" "),s("h4",{attrs:{id:"分支匹配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分支匹配"}},[t._v("#")]),t._v(" 分支匹配")]),t._v(" "),s("p",[t._v("分支匹配指的是,表达式中有几种规则,满足其中一种即可,使用|将不同的规则区分开")]),t._v(" "),s("ul",[s("li",[t._v("example 匹配3位或4位区号的电话号码")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" regx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/0\\d{2}-\\d{8}|0\\d{3}-\\d{7}/")]),t._v("\n")])])]),s("h4",{attrs:{id:"小括号的作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#小括号的作用"}},[t._v("#")]),t._v(" 小括号的作用")]),t._v(" "),s("p",[t._v("提升优先级,将表达式分组,可以对一组的字符进行多次重复")]),t._v(" "),s("ul",[s("li",[t._v("example")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" regx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/d?/")]),t._v("\n")])])]),s("h4",{attrs:{id:"反义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#反义"}},[t._v("#")]),t._v(" 反义")]),t._v(" "),s("p",[t._v("有时需要查找不属于某个能简单定义的字符类的字符。比如想查找除了数字以外，其它任意字符都行的情况，这时需要用到反义：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("语法")]),t._v(" "),s("th",[t._v("表达含义")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("\\W")]),t._v(" "),s("td",[t._v("和\\w相反 匹配任意不是字母，数字，下划线，汉字的字符")])]),t._v(" "),s("tr",[s("td",[t._v("\\S")]),t._v(" "),s("td",[t._v("和\\s相反 匹配任意不是空白符的字符")])]),t._v(" "),s("tr",[s("td",[t._v("\\D")]),t._v(" "),s("td",[t._v("和\\d相反  匹配任意非数字的字符")])]),t._v(" "),s("tr",[s("td",[t._v("\\B")]),t._v(" "),s("td",[t._v("和\\b 相反 匹配不是单词开头或结束的位置")])]),t._v(" "),s("tr",[s("td",[t._v("[^x]")]),t._v(" "),s("td",[t._v("匹配除了x以外的任意字符")])]),t._v(" "),s("tr",[s("td",[t._v("[^aeiou]")]),t._v(" "),s("td",[t._v("匹配除了aeiou这几个字母以外的任意字符")])])])]),t._v(" "),s("ul",[s("li",[t._v("example")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//匹配不包含空白符字符串")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" regx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/\\S+/")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//匹配用<>包裹起来的a标签")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" regx2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/<a[^>]+>/")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{249:function(e,a,t){"use strict";t.r(a);var s=t(0),l=Object(s.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h4",{attrs:{id:"shell脚本语法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shell脚本语法"}},[e._v("#")]),e._v(" Shell脚本语法")]),e._v(" "),t("ul",[t("li",[e._v("声明变量")])]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("time = 10\n\necho $(name)\n")])])]),t("ul",[t("li",[e._v("删除变量")])]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("unset name\n")])])]),t("ul",[t("li",[e._v("声明数组")])]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("array_name = (1,2,3,4)\n")])])]),t("ul",[t("li",[e._v("传递参数")])]),e._v(" "),t("p",[e._v("我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……")]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("sh deoly.sh happy  sad \n# 可以使用 $0来获取第一个参数 happy，$2获取第二个参数 sad\n\n")])])]),t("ul",[t("li",[e._v("条件语句\nif[]....then 表达式")])]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("运算符")]),e._v(" "),t("th",[e._v("含义")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("！")]),e._v(" "),t("td",[e._v("非运算符，表达式为true，则返回false，否则返回true")])]),e._v(" "),t("tr",[t("td",[e._v("-o")]),e._v(" "),t("td",[e._v("或运算符，表达式返回true，则返回true")])]),e._v(" "),t("tr",[t("td",[e._v("-a")]),e._v(" "),t("td",[e._v("与运算符,表达式返回true，才返回true")])])])]),e._v(" "),t("h4",{attrs:{id:"流程控制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#流程控制"}},[e._v("#")]),e._v(" 流程控制")]),e._v(" "),t("p",[e._v("和Java、PHP等语言不一样，sh的流程控制不可为空，如果else分支没有语句执行，就不要写这个else。")]),e._v(" "),t("ul",[t("li",[e._v("if else fi语句")])]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("\nif condition\nthen\n    command1  \n    command2\n    ...\n    commandN  \nfi\n")])])]),t("ul",[t("li",[e._v("if else")])]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("if condition\nthen\n    command1  \n    command2\n    ...\n    commandN\nelse\n    command\nfi\n\n")])])]),t("ul",[t("li",[e._v("if else-if else")])]),e._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("if condition1\nthen\n    command1\nelif condition2 \nthen \n    command2\nelse\n    commandN\nfi\n\n``\n")])])])])}),[],!1,null,null,null);a.default=l.exports}}]);
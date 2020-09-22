(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{581:function(e,n,t){"use strict";t.r(n);var a=t(4),s=Object(a.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h4",{attrs:{id:"需要配置nginx-conf文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#需要配置nginx-conf文件"}},[e._v("#")]),e._v(" 需要配置nginx.conf文件")]),e._v(" "),t("div",{staticClass:"language-javascript extra-class"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[e._v("location "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("/")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\nindex index"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("html\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),t("h4",{attrs:{id:"nginx策略"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#nginx策略"}},[e._v("#")]),e._v(" nginx策略")]),e._v(" "),t("ul",[t("li",[e._v("负载均衡就是域名配置多个服务器，拦截server中的请求响应，将请求转向配置的后端服务器")]),e._v(" "),t("li",[e._v("轮询策略，将所有客户端的请求轮询分配给服务端，但是其中一台出现延迟会影响其他用户")]),e._v(" "),t("li",[e._v("最小连接策略， 将请求优先分配给压力服务小的服务器，平衡每个队列的长度")]),e._v(" "),t("li",[e._v("最快响应时间策略")]),e._v(" "),t("li",[e._v("客户端ip绑定，ip_hash 有效解决了动态网页的session共享问题")])]),e._v(" "),t("h4",{attrs:{id:"常用的nginx命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用的nginx命令"}},[e._v("#")]),e._v(" 常用的nginx命令")]),e._v(" "),t("div",{staticClass:"language-shell script extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[e._v(" nginx -c /etc/nginx.conf  按照配置文件启动nginx服务\n nginx -t 检查配置文件是否出错\n nginx -s reload 重启 nginx服务器\n 查找进程\n "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("netstat")]),e._v(" -ltunp 查看端口号是否被占用\n "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("kill")]),e._v(" -9 端口号 杀死进程\n nginx location 路径配置。\n lcation /"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n root /root/dist/项目路径\n "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n 如果要配置多个路径不能使用root\n location /blog"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("alias")]),e._v(" 路径名\n "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n")])])]),t("h4",{attrs:{id:"接口路径配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#接口路径配置"}},[e._v("#")]),e._v(" 接口路径配置")]),e._v(" "),t("div",{staticClass:"language-text extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("location /music/ {\nproxy_pass 接口地址\n}\n")])])]),t("h4",{attrs:{id:"跨越请求头设置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#跨越请求头设置"}},[e._v("#")]),e._v(" 跨越请求头设置")]),e._v(" "),t("div",{staticClass:"language-text extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("if ($request_method = 'OPTIONS') {\nadd_header 'Access-Control-Allow-Origin' '*';\nadd_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';\n#\n# Custom headers and headers various browsers *should* be OK with but aren't\n#\nadd_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';\n#\n# Tell client that this pre-flight info is valid for 20 days\n#\nadd_header 'Access-Control-Max-Age' 1728000;\nadd_header 'Content-Type' 'text/plain charset=UTF-8';\nadd_header 'Content-Length' 0;\nreturn 204;\n}\nif ($request_method = 'POST') {\nadd_header 'Access-Control-Allow-Origin' '*';\nadd_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';\nadd_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';\nadd_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';\n}\nif ($request_method = 'GET') {\nadd_header 'Access-Control-Allow-Origin' '*';\nadd_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';\nadd_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';\nadd_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';\n}\n")])])])])}),[],!1,null,null,null);n.default=s.exports}}]);
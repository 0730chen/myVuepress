(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{568:function(n,o,e){"use strict";e.r(o);var t=e(4),r=Object(t.a)({},(function(){var n=this,o=n.$createElement,e=n._self._c||o;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h4",{attrs:{id:"node-nginx-mongodb-mongose"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#node-nginx-mongodb-mongose"}},[n._v("#")]),n._v(" node nginx mongodb mongose")]),n._v(" "),e("ul",[e("li",[e("p",[n._v("在 node 中建立新路由时，新的路由要在 index.tsx 主文件进行注册, 并且新路由文件要 module.exports = router 暴露路由")])]),n._v(" "),e("li",[e("p",[n._v("POST 接受前台传输数据，在 node 后端处理，要经过两个 post 事件，接受数据并使用 querystring 处理数据。post('/',function(req,res){req.on('date'),req.on('end')})date 事件是接受数据(二进制数据),end 事件是处理接受到的数据，解析成为一个对象 or 字符串。")])]),n._v(" "),e("li",[e("p",[n._v("在 node+express 中使用路由，路由规则就是注册一个 router.get('/router',function(req,res){}),路由一般用于页面的跳转和重定向")])]),n._v(" "),e("li",[e("p",[n._v("在前端向后端发送数据请求，等待后端验证后，前端在进行跳转时，可以使用回调，在请求数据成功后，后端进行判断然后可以返回一个 reponse，在 ajax 中的 success 属性中接受到这个属性，并作出相应的跳转 or 提示处理")])]),n._v(" "),e("li",[e("p",[n._v("学习了 Promise 与回调函数。事件的异步方式")])]),n._v(" "),e("li",[e("p",[n._v("在 liunx 中配置 node,npm,nginx,mongodb 数据库\n下载命令 apt-get node 或者使用下载压缩包命令 wget ("),e("a",{attrs:{href:"http://nodejs.org/dist/v0.8.9/node-v0.8.9.tar.gz",target:"_blank",rel:"noopener noreferrer"}},[n._v("http://nodejs.org/dist/v0.8.9/node-v0.8.9.tar.gz"),e("OutboundLink")],1),n._v(") 使用 tar zxvf 命令解压压缩包，完成后输入 node-v 是否出现 node 版本")])]),n._v(" "),e("li",[e("p",[n._v("node 安装完成后可以使用 npm 命令，安装 express 框架 npm install express -g\n如果出现 apt-get 报错，可以尝试使用 apt-get update 更新一下源\n安装 nginx，直接安装就可以了，主要是配置文件的更改，在 http 中的 server 下改变你的 ESC 实例网址，和端口。\n在外面访问不到的情况下，是 ESC 实例没有配置安全组。配置完成后，访问。会出现 nginx 欢迎你的界面。\nnginx 配置的代理服务器，将 location / {\nproxy_pass "),e("a",{attrs:{href:"http://127.0.0.1:3000;3000%E5%B0%B1%E6%98%AF%E4%BD%A0%E7%9A%84node",target:"_blank",rel:"noopener noreferrer"}},[n._v("http://127.0.0.1:3000;3000就是你的node"),e("OutboundLink")],1),n._v("项目的端口号\n}")])]),n._v(" "),e("li",[e("p",[n._v('mongodb 安装。主要是配置文件的添加。mongodb.conf,添加端口号(port),数据库路径 dbpath="" 日志路径 logpath="" 设置后台运行 f ork=true logappend = true 设置日志的输出方式')])]),n._v(" "),e("li",[e("p",[n._v("mongodb的启动方式,./mongod --config /usr/local/mongodb/mongod.conf")])]),n._v(" "),e("li",[e("p",[n._v("使用 mp2 管理 node 项目的进程")])])]),n._v(" "),e("h5",{attrs:{id:"学到的-liunx-命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#学到的-liunx-命令"}},[n._v("#")]),n._v(" 学到的 liunx 命令")]),n._v(" "),e("ul",[e("li",[n._v("cd 命令，打开文件 cd 文件名 cd ..返回上一个目录")]),n._v(" "),e("li",[n._v("kill -9 '进程' 杀死进程")]),n._v(" "),e("li",[n._v("ps aux |grep nginx 查询程序进程")]),n._v(" "),e("li",[n._v("whereis 命令 查询文件存在的目录位置")]),n._v(" "),e("li",[n._v("top 命令 查询所有的进程")]),n._v(" "),e("li",[n._v("vim 文件名 使用 vim 编辑器打开一个文件，esc 按钮退出然后 :wq 是退出并保存文件")]),n._v(" "),e("li",[n._v("find 命令，查找文件")]),n._v(" "),e("li",[n._v("mv 命令是 move 命令，是更改文件名或者将文件的内容复制到另一个文件中\n8 mkdir 命令，创建一个文件夹")]),n._v(" "),e("li",[n._v("liunx 下运行 mongodb 数据库。在 mongodb 安装目录下运行 ./mongod --config ../mongodb.conf，以配置文件启动启动服务端 mongodb")]),n._v(" "),e("li",[n._v("运行 ./mongo --port=27899，以端口启动客户端 ,关闭配置文件中的 auth 属性就可以")])])])}),[],!1,null,null,null);o.default=r.exports}}]);
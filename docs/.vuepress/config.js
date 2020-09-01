module.exports = {
    // 设置网站标题
    title: 'Atom',
    theme: 'reco',
    // 设置输出目录
    description: "敲就硬敲",
    dest: './dist',
    plugins: [
        [
          "vuepress-plugin-live2d",
          {
            "modelName": ['hijiki','tororo','shizuku','izumi'],
            "mobileShow": false
          }
        ]
      ],
    themeConfig: {
        type:'blog',
        authorAvatar: './images/avator.jpg',
        logo: './images/avator.jpg',
        author:'atom',
        sidebarConfig: 'auto',
        nav: require('./nav'),
        sidebar: [
            {
                title: '常用工具和库',
                children: [
                    '/tool/Jquery',
                    '/tool/Jquery2',
                    '/tool/Superagent',
                    '/tool/axios',
                    '/tool/CV基本原理',
                    '/tool/数据库的使用',
                    '/tool/跨域详解',
                    '/tool/微信js-sdk配置',
                    '/tool/koa2与express的差异',
                    '/tool/Node调用脚本'
                ]
            },
            {
                title: '前端知识',
                path: '/Font/',
                collapsable: true,
                children: [
                    '/Font/Html',
                    '/Font/Html2',
                    '/Font/Css',
                    '/Font/Css布局',
                    '/Font/浏览器渲染原理及Css动画',
                    '/Font/轮播图',
                    '/Font/scss',
                    '/Font/瀑布流实现原理',
                    '/Font/Dom事件',
                    '/Font/JS基础知识',
                    '/Font/JS对象',
                    '/Font/JS函数的执行机制',
                    '/Font/Js的数据结构',
                    '/Font/Js继承',
                    '/Font/算法入门',
                    '/Font/算法入门2',
                    '/Font/MVC&&eventBus',
                    '/Font/指定this指向的三种方法',
                    '/Font/跨域详解',
                    '/Font/闭包',
                    '/Font/Promise',
                    '/Font/Promise和异步',
                    '/Font/HTTP状态码',
                    '/Font/请求',
                    '/Font/webpack使用',
                    '/Font/MVC&&eventBus',
                    '/Font/Vue版本',
                    '/Font/Vue双向数据绑定',
                    '/Font/日历组件',
                    '/Font/TypeScript',
                    '/Font/Typescript(2)',
                    '/Font/React入门',
                    '/Font/React路由',
                    '/Font/React登陆组件',
                    '/Font/redux',
                    '/Font/Node异步并发',
                    '/Font/Koa后端',
                    '/Font/正则表达式',
                    '/Font/React组件',
                    '/Font/Vue修饰符',
                    '/Font/Vue构造选项',
                    '/Font/Icon组件',
                    '/Font/面试',
                    '/Font/koa2与express的差异',
                    '/Font/服务端渲染SSR',
                    '/Font/Nest(1)',
                    '/Font/canvas(1)',
                    '/Font/ReactHooks'
                ]
            },
            {
                title: 'ES6常用方法',
                children: [
                    '/ES6/Array',
                    '/ES6/String',
                    '/ES6/理解this',
                    '/ES6/发布订阅和观察者模式',
                    '/ES6/浏览器和Node.js的事件循环',
                    '/ES6/高阶函数之call，apply',
                    '/ES6/防抖,节流',
                    '/ES6/深浅拷贝',
                    '/ES6/Promise'
                ]
            },
            {
                title:'正则系列',
                children:[
                    '/正则系列/正则系列1',
                    '/正则系列/正则系列2',
                    '/正则系列/常用正则库'
                ]
            },
            {
                title:'微信相关',
                children:[
                    '/微信相关/微信公众号开发1',
                    '/微信相关/小程序1',
                    '/微信相关/小程序云开发'
                ]
            },
            {
                title: 'Mongodb手册',
                children: [
                    '/Mongodb/mongodb',
                    '/Mongodb/mongodb2',
                    '/Mongodb/mongooseAPI'
                ]
            },
            {
                title: 'Linux',
                children: [
                    '/linux/basic',
                    '/linux/nginx',
                    '/linux/数据库',
                    '/linux/shell脚本语法学习',
                    '/linux/Docker基础',
                    '/linux/dockerFile配置文件',
                ]
            },
            {
                title:"Flutter",
                children:[
                    '/Flutter/Flutter入坑1'
                ],
            },
            {
                title:'设计模式',
                children:[
                    '/设计模式/工厂方法',
                    '/设计模式/抽象工厂方法'
                ]

            },
            {
                title:'工作记录',
                children:[
                    '/工作记录/导航栏样式'
                ]
            }

        ],
        record:'MIT Licensed',
        recordLink:'',
        cyberSecurityRecord: '浙ICP备19033350号',
        cyberSecurityLink: '',
        startYear: '2019'

    },
    // 设置站点根路径，如果你在访问的地址是 'www.xxxx.com/wxDocs' 那么就设置成 '/wxDocs/'
    base: '/',

    // 添加 github 链接，但是这个要放在公司的内网服务器，所以为空
    // repo: ''
}

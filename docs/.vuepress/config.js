module.exports = {
    // 设置网站标题
    title: 'Atom',
    // 设置输出目录
    description: "敲就硬敲",
    dest: './dist',
    themeConfig: {
        nav: require('./nav'),
        sidebar: [
            {
                title: '常用工具和库',
                children: [
                    '/tool/Jquery',
                    '/tool/Jquery2',
                    '/tool/Superagent',
                    '/tool/axios',
                    // '/tool/Jquery(二)',
                    // '/tool/weboackp1',
                    // '/tool/webpack2',
                    // '/tool/Superagent',
                    // '/tool/axios'
                    // '/tool/',
                    // '/Font/JsBrith',
                    // '/tool/Jquery(二)',
                    // '/tool/weboackp1',
                    // '/tool/webpack2',
                    // '/tool/Superagent',
                    // '/tool/axios'
                ]
            },
            {
                title: '前端',
                children: [
                    '/Font/JsBrith',
                    '/Font/Jsbasic',
                    '/Font/Html',
                    '/Font/Css',
                    '/Font/浏览器渲染原理及Css动画',
                    '/Font/轮播图',
                    '/Font/scss',
                    '/Font/瀑布流实现原理'


                ]
            },
            {
                title: 'ES6常用方法',
                children: [
                    '/ES6/',
                    '/ES6/Array',
                    '/ES6/String',
                    '/ES6/Object',
                ]
            },
            {
                title: 'Mongodb手册',
                children: [
                    '/Mongodb/',
                    '/Mongodb/mongodb',
                    '/Mongodb/mongodb2'
                ]
            }, {
                title: 'Linux',
                children: [
                    '/linux/basic',
                    '/linux/nginx',
                ]
            }
        ]


    },
    // 设置站点根路径，如果你在访问的地址是 'www.xxxx.com/wxDocs' 那么就设置成 '/wxDocs/'
    base: '/',

    // 添加 github 链接，但是这个要放在公司的内网服务器，所以为空
    // repo: ''
}

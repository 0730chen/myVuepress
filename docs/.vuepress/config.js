module.exports = {
    // 设置网站标题
    title: '再无嘻嘻哈哈',
    // 设置输出目录
    description: "敲就硬敲",
    dest: './dist',
    themeConfig: {
        nav: require('./nav'),
        sidebar: [
            {
                title: '常用工具和库',
                children: [
                    '/tool/',
                    '/tool/Jquery'
                ]
            },
            {
                title: '前端',
                children: [
                    '/Font/Jquery',
                    '/Font/JsBrith',
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
                    '/Mongodb/mongodb'
                ]
            }, {
                title:'Linux',
                children:[
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

---
title: Webpack使用
date: 2019-10-11
tags:
- webpack
---

#### 具有打包功能的工具

    webpack
    parcel
    rollup

#### Webpack

    打包工具Webpack，就是将各种类型文件，图片，打包组合起来，可以有效的减少代码体积,功能强大，插件丰富，也可以自己编写插件

#### 配置webpack引入js文件文件

    webpack.base.js

``` javascript
    const path = require('path')
    module.exports = {
            mode: 'production', //production和development 生产用于最后打包，默认是development
            entry: {
                index: index.tindex.tsx '}, //你的入口js文件，所有js文件的入口 可以配置多个入口
                //出口只有一个
                output: {
                    path: path.resolve(__dirname, 'dist'), //配置输出路径
                    filename: '[name].[hash].js' //输出后的文件名
                },
            }
```

#### 使用插件html文件

    webpack也可以处理html文件，使用html插件生成html

``` javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    module.exports = {
        //插件属性
        plugins: [
            new HtmlWebpackPlugin({
                template: home, //这个是html模板
            })
        ]
    }
```

#### 处理css文件

    使用loader处理css类型文件,css,less,styl

``` javascript
    module.exports = {
        module: {
            rules: [
                //使用loader和use都可以，是一个数组，
                {
                    test: /\.css$/i,
                    use: ['style-loader,css-loader']
                }, //配置规则 test:/正则/，use:[]使用的加载器loader:[]
                {
                    test: /\.less$/i,
                    use: ['style-loader,css-loader', 'less-loader']
                },
                //由于sass比较难下载，所以要使用dart-sass
                {
                    test: /\.scss$/i,
                    use: ['style-loader', 'css-loader', {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass')
                        }
                    }]
                },
                {
                    test: /\.styl$/i,
                    use: ["style-loader", "css-loader", "stylus-loader"]
                },
            ]

        }
    }
```

    以上都是生成style标签，css还可以使用插件生成css文件

``` javascript
    module.exports = {
        module: {
            rules: [
                ...base.module.rules,
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                    ],
                },
            ]
        }
    }
```

    miniCssExtractPlugin一般在production环境中使用,并且不能与style-loader共同使用

#### 处理图像文件

 常见的图片格式有四种 png, jpg, gif, svg

``` javascript
   module.exports = {
       module: {
           rules: [{
               test: /\.(png|jpg|svg|gif)$/,
               use: ["file-loader"]
           }]
       }
   }
```

#### loader和plugin的区别

     loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。本质上是一个函数，loader是一对一
     plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务
     plugin的作用更加广泛，而且可以自己编写一个插件，本质上一个class，插件可以一对多   

#### 自定义loader

     编写一个loader,loader就是以将一个文件转换成另一个文件的过程

``` javascript
    //在rules中添加规则
    module.expotrs = {
        module: {
            rules: [{
                    test: /\.fish$/i,
                    use: [{
                        loader: path.resolve('./fish.js'),
                        options: {}
                    }]
                } //使用fish.js来处理这个文件
            ]
        }
    }
```

   fish.js

``` javascript
      //处理程序本质上是一个函数，
      const {
          getOptions
      } = require('loader-utils');
      const validateOptions = require('schema-utils');
      module.exports = function(source) {
          //source就是你的文件中的内容
          // 将处理好的数据return出去就ok了
          //对source进行处理宝宝
          return `${JSON.stringify(source)}`
      }
```

#### 编写一个plugin

plugin 是一个class，在每次使用时，需要new一个对象
定义一个类，必须要有一个apply方法，webpack会以compiler为参数

``` javascript
    class HelloWorldPlugin {
        apply(compiler) {
            //emit是生成文件前

            compiler.hooks.emit.tap('hello', (state) => {
                //state参数
                console.log('hello,world')
            })
            compiler.hooks.emit.tapAsync('', (compilation, callback) => {

            }) //异步触发
        }

    }
    module.exports = HelloWorldPlugin
```

1. 必须要有apply方法，该方法webpack会传入一个complier对象作为参数
2. compiler有众多事件生命周期函数(钩子函数) 使用方法为 compiler.hooks.[function].tap() 例如run,beforeCompile,等待emit
3. compiler.plugin 函数，从make(开始任务)->compile(编译任务)->after-compiler(编译完后)->emit(即将生成文件)->After-emit(生成后)
4. compilation对象继承自compiler，可以拿到它的所有内容，也有plugin函数，compilation可以在compiler钩子函数中打印出来的
5. compilation.assets属性

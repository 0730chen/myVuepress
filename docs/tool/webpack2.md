---
title: webpack初体验
date: 2019-04-05 20:14:55
tags: webpack 配置
---
1.webpack的使用总结
  需要安装node.js程序，并在命令行中输入 node -v 出现正确的版本号
  建立项目文件夹，并在命令行中进入项目文件 例如CD project
  初始化 npm init -y
  安装 webpack npm install webpack --save-dev
  安装 webpack-cli npm install webpack-cli --save-dev
  新建文件夹src，dist，src是存放静态资源的文件夹。并存在一个index.js文件，这是一个入口文件，里面是依赖文件及其静态资源的引用 根目录下存在index.html文件对打包后的文件进行引用
  使用命令 npx webpack进行打包， 或在package.json中进行配置文件配置依赖项，配置webpack的打包模式
  index.js中支持ES6语法，主要是处理依赖项
  webpack.config.js配置文件。 引用path静态资源包。 配置打包文件的入口和打包文件的输出文件及文件名
  处理图片
  下载css文件处理器， npm install style-loader css-loader --save-dev
  并在配置文件中配置 module：use{}
  下载图片处理器， npm install --save-dev file-name  配置option属性：{设置打包的文件输出文件，名字，打包格式}
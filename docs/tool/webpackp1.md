---
title: webpackp学习（1）
date: 2019-02-27 22:08:11
tags: 打包工具
---
  webpack是一款打包工具，用于模块化编译JavaScript。可以使自己项目更加方便使用。
  1.安装
    首先安装nide.js运行环境，并配置环境变量
    在你的项目根目录下 运行命令 npm install webpack --save
                              npm install webpack-cli --save
  2.在你的项目文件夹下创建文件夹app并在其中创建index.js。新建dist文件夹，并配置package.json文件夹，确保private：ture，并且删除main属性

  3.运行命令 webpack app/index.js dist/bundle.js 
   app/index.js是一个入口，dist文件夹是一个出口，执行命令后dist文件中会生成bundle.js。
  webpack可以去除繁杂的依赖关系，使用webpack能够更好的管理你的代码。


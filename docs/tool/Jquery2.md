---
title: Jquery学习
date: 2019-02-28 21:24:49
tags: 前端 框架 jQuery
---
   1.介绍
     jQuery是一个JavaScript库，可以极大的简化JavaSript代码的编写
   $()是选择器，相当于document.getElementByName...可以选择标签，（）里面可以是标签，class，id。
   2.基础语法
     所有的jQuery选择器是已美元符号开头。并且在$(document).ready(function(){......})函数中。这是为了防止文档在加载就绪之前就运行jQuery代码，在DOM（文档模型）加载之前就运行函数，操作可能失败。
   3.基本操作
     $('*')通配选择符，选取所有元素。
     $('p.color'),选取class为color的<p>标签
     $('#id')选取id
     $('.class')选取class
     常用的有：hide() show()元素的显示和隐藏 fadeln()与fadeout()元素的淡入和淡出，add()与remove()方法，对元素或者class进行增加删除
     append()在选择标签结尾添加内容，prepend()在选择标签开头添加内容，after()在被选元素之后插入内容，before()

     parents()遍历父类元素，children()遍历子类元素(基于Dom树进行遍历)，siblings()方法进行水平遍历，next(),nextAll()
   4.常用操作
     通过对文档模型的操作，对页面实现各种动画效果，大雪飘落等。
     （1）建立一个标签，并且使用css设定大小，颜色，形成一个静态的雪花
     （2）使用选择器选择这个标签，并且创建相同的标签，并使它的css等于雪花的css名。
     （3）获得屏幕高度和宽度。设定初始位置为0（left和top）使用Math.random()生成随机数使雪花的位置随机出现（改变css中的位置）
     （4）设定一个定时器，每隔10ms生成一个雪花并每次left和top+0.2px。添加判断，left和top超过屏幕大小则重新赋值为0.
     （5） 建立一个for循环不断生成雪花。
    5.jQuery与ajax
      在一个$(document).ready(function(){

        })函数中

        jQ.load()方法从服务器加载数据，并把返回的数据放入被选元素。
        $(selector).load(url,data,callback)
        jQ.get(url, callback),$.post(url,data,callback)


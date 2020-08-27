---
title: CV制作的基本原理
date: 2020-02-03
tags: 
- css
- 动画
categories: 
- 项目

---

#### 基本原理

1. 在html中创建标签

```html
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximun-scalabel=1.0,minimun-scalabel=1.0,user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>会动的JS代码</title>
</head>
<link rel="stylesheet" href="style.css" />
<style id="css"></style>
<body>
    <div id="html">1</div>
    <div id="wrapdemo">
        <div id="div1"></div>
    </div>
</body>
<script src="main.js"></script>
</html>
```

html是显示你的文字效果部分，div是准备制作一个八卦的部分

##### 第一步在文字展示部分输出1-60数字，类似于加载百分比

```javascript
let html = document.getElementById('html')//获取标签
let html.ineerHTML = 2 //可以设置标签内容
//使用setTimeout定时器，递归输出数字
let n = 0
function num(){
setTimeout(()=>{
if(n < 60){
n+=1
num()
}})//console.log(n)依次输出0-60
}
```

2.加入字符串

```javascript

let string='abscsdsada我是谁'
string[0] = 'a'
string[1] = 'b'
string.substring(0,2) = 'ab' //substring接受两个参数取头不取尾
//可以输出数字0-60,结合字符串
html.innerHTML = string.substring(0,i) //依次显示到html页面
/*问题1，当出现换行时，页面并不会换行，我们需要使用html中的换行符使页面内容换行
使用字符串替换 如果遇到空格则使用string[i].replace(string[i],'<br>')将空格替换成<br>换行符
存在问题：html会将<br>解析成4个字符，页面每次会出现<符号，然后换行*/
//1.解决方法
if(string[i] ==='\n'){
string2 +='<br>'//新建一个字符串，使用拼接字符串方法，直接加上一个<br>
}
//出现空格
if(string[i] ===' '){
string2 +='&nbsp;'//使用html中的空格符号
}
//然后在字符串中加入CSS样式，需要将不是css的内容注释，这样css就不会识别到样式外的内容
```

##### 完整代码如下

``` javascript
let num = 0
let html = document.getElementById('html')
let style = document.getElementById('css')
let string = `/*我是一名新人,请多多关照
我换了一个行
新的一行我是一个空格
我的前面是一个空格*/
#html{
    color : red;
}
/*创建一个*/
#div1{
    width:200px;
    height:200px;
    border:1px solid black;
    border-radius:50%;
    box-shadow:0 0 3px rgba(0,0,0,0.5);
    border:none;
    background: linear-gradient(90deg, rgba(2,1,18,1) 50%, rgba(255,255,255,1) 50%);
}
/*创建两个灵珠*/
#div1::before{
    position:absolute;
    width:100px;
    height:100px;
    border-radius:50%;
    left:50%;
    top:0;
    transform:translate(-50%);
    background:#fff;
    background: radial-gradient(circle, rgba(0,0,0,1) 12%, rgba(254,253,253,1) 12%);
}
#div1::after{
    position:absolute;
    width:100px;
    height:100px;
    border-radius:50%;
    left:50%;
    bottom:0;
    transform:translate(-50%);
    background: black;
    background: radial-gradient(circle, rgba(254,253,253,1) 12%, rgba(0,0,0,1) 12%);
   }`;
let string2 = ""

function setp() {
    setTimeout(() => {
        if (string[num] === '\n') {
            string2 += "<br>"
        } else if (string[num] === ' ') {
            //处理缩进
            string2 += "&nbsp;"
        } else {
            string2 += string[num]
        }
        html.innerHTML = string2
            //css代码直接将添加注释在字符串中，css会自动忽略注释的内容
        style.innerHTML = string.substring(0, num)
        window.scrollTo(0, 99999);
        html.scrollTo(0, 10000) //为了适配手机向下滚动
            //先给HTML赋值然后在判断num的值，
        if (num < string.length - 1) {
            num += 1
            setp()
        }
    }, 0);
}
setp()
```

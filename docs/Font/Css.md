---
title: Css居中
date: 2019-03-21 20:14:36
tags: css
---

### Css居中

* 使一个div标签在页面中居中，水平居中和垂直居中
    设置div为绝对定位 position:absolute
    设置top值与left值都为50% top:50%;left:50%;
    设定你的width与height的值，例如400px，200px。
    设定margin-left与margin-top的值为你设定的width与height负值的一半
    margin-left:-100px;margin-top:-200px
    设定边框的颜色可以让效果更明显：border 1px solid #0088pp

   //另一种方法

   使用绝对定位
   使用margin：auto ，并设置top left right bottom的值为相同的，例如0
* 使用JavaScript实现选择题测验并判断最终得分
    在每一选项中设定一个value值
    再点击按钮中绑定事件可以获取点击按钮的value值，
    设定一个集合，并添加每道题目的正确选项
    例如arr[0]='A'，判断点击取得的value值与arr值进行对比，如果相同则证明答对。
    设定一个var score = 0，在每次判断成功后score = score+1
    score的值就是答对的题目数。
    使用zepto.js获取当前点击按钮的value值了你点击获得的value的值使用if判断val与集合中的值是否相等

```javascript
$('button').click(function(){ var val = $(this).attr('value')})//val中储存
```

* 单页面选择题实现，点击按钮后只更新题目与答案，其他内容不更新

在一个div实现选择题区域，并且使用display：none属性隐藏div，display默认值是block，将第一个题设为display：block，
后面两道设置为display：none,并给选项按钮添加点击事件，判断第一题display值是block则将它重新赋值为none，并将第二题display赋值为block则会显示页面

4.可以使用@font-face{font-family:'起一个名字',src(字体文件位置)}引入字体文件，自定义字体

#### border

border是元素的边框,它并不是一个规则四边形

```css
div {
    width: 50px;
    height: 50px;
    border: 2px solid orange;
}
```

当border元素内有宽高时，border显示的是一个规则四边形

元素的border是由三角形组合而成

```css

div {
    width: 50px;
    height: 50px;
    border: 40px solid;
    border-color: orange blue red green;
}
```

当border的元素宽高都为0时，就会变成4个三角形组成的图形

```css
div {
    width: 0;
    height: 0;
    border: 40px solid;
    border-color: orange blue red green;
}
```

```css
div {
    width: 0;
    height: 0;
    border-width: 0 40px 40px;
    border-style: solid;
    border-color: transparent transparent red;
}

```

实现带边框的三角形,可以利用两个三角形叠加实现

```css
#blue {
    position:relative;
    width: 0;
    height: 0;
    border-width: 0 40px 40px;
    border-style: solid;
    border-color: transparent transparent blue;
}
```

使用伪元素进行定位，可以节约标签

```css
#blue:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    border-width: 0 40px 40px;
    border-style: solid;
    border-color: transparent transparent yellow;
}

```

#### 设置div背景色透明，里面元素不透明

```css
background-color:rgba(255,255,255,0.15)
```

---
title: Jquery常用api使用教程
data: 2019-10-28
tags: 
    - Jquery 
    - API 
    - 设计模式
categories: 
    - API
---

#### Jquery常用API操作

1. 获取元素

```javascript
//首先需要在script标签中引入jquery链接
//<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
//获取元素内容
//css选择器操作
$(document)//获取所有元素
$('h1')//获取标签元素，直接填入标签
$('.class')//使用类目获取元素需要加一个.
$('#id')//获取id需要加上#
//Jquery选择器操作
$('a:first') //选择网页中第一个a元素
$('tr:odd') //选择表格的奇数行
$('#myForm :input') // 选择表单中的input元素
$('div:visible') //选择可见的div元素
$('div:gt(2)') // 选择所有的div元素，除了前三个
$('div:animated') // 选择当前处于动画状态的div元素
```

2.常用的操作元素API

 ``` javascript
//添加类名
$('.class').addClass('xx')//xx是需要添加的类名
hasClass()//判断是否存在某个类
removeclass()//移除类
toggleClass()//如果存在这个类则移除，不存在则填加

//复制一个元素
$().clone()//复制一个你选中的元素
//元素删除
$().remove() or .detach()
//remove于detach区别，remove不保留删除元素
//清空元素内容，但是不删除元素
$().empty()
//添加html
$().append('b')//在每个匹配元素里面的末尾处插入参数内容
$().appendTo('a')//将匹配的元素插入到目标元素的最后面
//两个区别是 append后面是要插入的元素，appendTo后面选择要被插入的元素，前面是要插入的元素
//不带参数就是获取内容，带参数就是设置内容。重载
$().html()//获取html文本内容  
$().text()//获取标签的文本内容
$().after()
$().before()
$().insertAfter()
$().insertBefore()

//获取css属性
//有参数为设置，不带参数为获取
$().css()
$().height()
 ```

3.链式操作
这是Jquery最为优秀的设计思想

```javascript
//在选择操作后后续可以继续进行操作
$().addClass().removeClass().end()//ends 退回到上一次的状态
```

4.Jquery的优势部分

* 可以不使用new操作符就可以创建对象，Jquery对象
* 函数重载，根据参数不同，有不同作用
* 使用闭包隐藏细节，外部只能使用api文档进行操作
* getter/setter设计模式 只读，只写
* 别名，可以使用$符号代替Jquery
* 适配器 可以使用在不同环境中

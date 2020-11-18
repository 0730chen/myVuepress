---
title: 虚拟Dom和Domdiff算法
date: 2020-11-18
tags:
- 虚拟Dom
---

#### 什么是虚拟Dom

1.虚拟Dom是使用js对象来描述真实Dom的一种方式。通常包含标签名，标签上的属性，事件监听和其他属性

```javascript
const vNode = {
    key:null,
    props:{
        children:[]
    },
    className:'red',
    onClick:()=>{},
    ref:null,
    type:'div'
    //vue中是
    target:'div'
},
```

* 如何创建虚拟Dom，React.createElement('div'),h()两个函数进行创建
* React使用jsx语法创建虚拟Dom,bable会进行解析，vue使用template在使用vue-loader进行解析
* 规模大的时候原生DOM会比虚拟Dom快，数据量小的时候会更快（10000个数据插入）

#### 虚拟Dom的优点

* 某些情况下，虚拟Dom比真实Dom快。数据量小的时候是原生Dom快。比如添加1000个节点，原生Dom就要进行1000次操作，虚拟Dom只用执行一次。减少Dom操作的范围。比如说你要新增一个

* 跨平台应用，虚拟Dom不仅可以变成真实Dom,也可以变成小程序，ios,安卓应用。本质就是一个js对象

#### 虚拟Dom的缺点

需要额外的解析操作，比如createElement,h,将虚拟Dom进行转换，可以使用jsx和VueTemplate进行虚拟Dom创建

#### Dom diff是什么

Dom diff是一个函数

Dom diff的逻辑

* Tree diff对比,将新旧两棵树逐层进行对比，找出那些节点需要更新，如果是组件就看Component diff 如果是标签就看Element
* Component diff 如果节点是组件，先看类型，如果不同直接替换，类型相同则更新属性，然后深入组件做递归
* Element diff 如果节点是原生标签，则看标签名，不同则替换，相同则更新属性，然后进行标签进行递归

```javascript
patch(oldNode,newNode){
    //进行一系列的比较
},
```

将虚拟Dom想象成树形

* 减少Dom操作次数，只改变虚拟Dom的属性，计算机是从左往右对比的。第一个hello变成world，第二个world会直接删除

#### Dom diff的优点

减少Dom操作，跨平台

#### Dom diff的问题

问题数组在页面中渲染，三个组件，删除中间的组件则[1,2,3]=>[1,3]

进行对比 1=>1 2=>3 3删除了,所以不建议使用index作为数组渲染的key，因为index是会变得
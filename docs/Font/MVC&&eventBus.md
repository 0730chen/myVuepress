---
title: MVC模式和eventBus
date: 2020-01-20
tags:
  - 设计模式
---

#### MVC 模式

    * MVC是一种设计模式，可以将一个应用分为三个模块，分别控制应用的不同功能，Model，View，Controller
    * Controller 负责数据处理，数据请求，数据更新
    * moneyModel 储存数据
    * View 展示数据，比如Html

#### 在 Javascript 中使用 MVC 和 eventBus 捕获事件

    * 首先建立三个对象 M,V,C

```javascript
 //数据存放在m中
 //初始化eventBus
   let eventBus = $(window)
 let m = {
     data:{n:1234},
     //对数据的增删查改
     create(){},
     delete(){},
     update(data){
         Object.assign(m.data,data)//更新data中的数据
         //发布一个事件
         eventBus.trigger('m:updated')
         localStorage.setItem('n',m.data.n)
     },
     get(){}

 }
 //view 数据的展示模块，有初始方法，渲染页面的方法
 let v = {
 el:null,
 html:`<div>{{n}}<div>`,
 init(container){
     v.el = $(container)
 },
 render(n){
         //接受一个n参数，将这个参数渲染到页面中
     if(v.el.children.length !==0){
         v.el.empty()
            //传入n替换html中的{{n}}的占位符
         $(v.html.replace(`{{n}}`,n)).appendTo(v.el)
     }
 }
 }
 //controller
 let c = {
     init(container){
         //初始化控制器
         v.init(container)
         //我们要实现的是，model中的数据更新后，相对应的view中的数据要再次渲染
         eventBus.on('m:update',()=>{
             //这里捕获eventBus.trigger()
             v.render(m.data.n)
     })
         v.render(m.data.n)
     },
   events:{
     'click #add1':"add",
     'click #minus1':"minus",
     'click #mul2':'mul',
     'click #divide2':'div'
     },
     //表驱动，事件
     add(){
         m.update({n:n.data.n+1})//触发model中的更新
     minus(){},
     mul(){},
     div(){},
     //根据key绑定不同的事件
     EventAuto(){
         for(let key in c.events){
         const value = c[c.events[key]]
         const spaceIndex = key.indexOf(' ')
         const part1 = key.slice(0, spaceIndex)//获取空格前的内容
         const part2 = key.slice(spaceIndex + 1)//获取空格后的内容
         v.el.on(part1, part2, value)
         }
         }
     }


```

#### eventBus Api

    * eventBus.trigger('m:update')发布一个m:update事件
    * eventBus.on('m:update',()=>{}) 当发布的事件执行后，eventBus.on('m:update')捕获这个事件

```javascript
 let eventBbus = $(window)
 <button class="add"></button>
 add.on('click',()=>{
 eventBus.trigger('ccc') //此时发布了一个ccc的事件
 })
 eventBus.on('ccc',()=>{
 //在外部捕获这个ccc是否触发，触发了则调用on的回调函数
 console.log('捕获到了')
 })
 //设定一个按钮
```

#### EventBus 类，事件管理，事件总线

    1. addEventListener(类型，回调，作用域),侦听方法

```javascript
function myfunction(event) {
  alert("myfunction", event);
}
EventBus.addEventListener("myfunction", myfunction);
EventBus.dispatch("myfunction");
```

    2. removeEventListener(类型，回调，作用域) 移除事件侦听

```javascript
EventBus.removeEventListener("EXAMPLE_EVENT", handler);
```

    3. hasEventListener(类型，回调，作用域)
    4. dispatch(类型，回调，作用域) 捕获添加事件的侦听
    5. getEvent() //打印出添加的侦听器 addEventListener

#### 表驱动编程

    * 表驱动编程意思就是像字典一样，根据key来查找对应的内容
    * 在 if else 条件判断逻辑语句不多的情况下
    * 在js中使用对象建立一个表

```javascript
let hashtable = {
  1: "星期一",
  2: "星期二",
  3: "星期三",
  4: "星期四",
  5: "星期五",
};
//在使用通过遍历这个hashtabler然后通过key值，显示对应的日期信息
```

    优点
    1. 使用数据结构的知识，优化了if else条件判断，结构更加容易理解，数据的添加删除也更加方便
    2. 使用起来更加优雅，代码更容易维护

#### 模块化

模块化是指，将应用的功能，划分为几个模块进行，各个模块只需要负责实现当前的功能，然后向外暴露出一个接口，在外部通过引用可以使用这个模块实现的功能。 ####优点:
_ 整体项目结构更加清晰，
_ 不同功能之间的应用不会互相干扰
_ 代码维护更加方便
_ 代码之间的耦合性降低
_ 高内聚，低耦合
_ 代码可用性/复用性增加，直接引用模块即可使用相应的功能

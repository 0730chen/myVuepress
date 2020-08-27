---
title: 实现call，apply，bind,new
date: 2020-07-25
tags: 
- Function
- this
categories:
- Function

---

#### call函数需求分析

    * 改变函数调用的this值
    * 可以使用传入的参数当作函数调用的参数
   要点：函数内使用this获取当前调用的函数，使用context指定函数的this
   使用arguments参数获取传入函数的参数，arguments是一个类数组对象，不能使用数组方法
   使用eval拼接字符串调用函数fn

```javascript

 Function.prototype.myCall = function(context) {
   console.log('myCall的this')
   //this总是指向最后一个调用他的对象,myCall也是一个函数，所以这里this可以获取到run函数
   //将函数变为传入对象的属性
   context = context||window
   context.fn = this
   console.log(this)
   //新增，运行之后在删除
   //arguments是类数组对象，可以使用for循环展开
   console.log('接受到的参数arguments')
   let args = []
   for(let i = 1;i < arguments.length;i++){
     console.log('循环内部')
     //arguments[i]就是传过来的参数
     console.log(arguments[i])
     args.push('arguments['+i+']')
     console.log('args的全部参数')
     console.log(args)
   }
   //因为此时你的参数是字符串并不是我们需要的变量
   // context.fn(args.join(','))
   let result = eval('context.fn(' + args +')')
   delete context.fn
   return result
 }
```

#### apply函数需求分析

    * 和call类似，但是传入的参数为一个数组类型参数

```javascript

Function.prototype.myApply = function (context,arr) {
  context = context||window
  //此时的this就是要改变this指向的函数
  context.fn = this
  let result
  //arr代表传入的参数数组
  if(!arr||arr.length===0){
    result  =context.fn()
  }else {
    let args = []
    for(let i = 0;i<arr.length;i++){
      //拼接一个字符串
      args.push('arr['+i+']')
    }
    result = eval('context.fn('+args+')')

  }
  //函数返回值
  context.fn()
  delete context.fn
  return result
}
```

#### bind函数

    * bind函数需要返回一个函数调用
    * bind函数改变this的指向
    * bind函数返回的函数可以当作构造函数调用
    * bind函数可以在绑定时传参也可以在调用时传参
    * 当bind函数为构造函数调用时，this失效，其他参数

```javascript

  Function.prototype.myBind = function (context) {
    context = context ||window
    context.fn = this
    let _this = this
    //this就是调用的函数
  const args = Array.prototype.slice.call(arguments, 1);
  console.log(args);

  function fBound () {
    console.log('调用时传参')
    console.log(arguments)
    let bindArgs = Array.prototype.slice.call(arguments)
    console.log('内部的this值',this instanceof fBound)
    //如果时构造函数调用则返回this，否则就修改this
    return _this.apply(this instanceof fBound?this :context,args.concat(bindArgs))
  }
  let noop = function() {}
  console.log('this的原型')
  console.log(this.prototype)
  //为了让 fBound 构造的实例能够继承绑定函数的原型中的值
  //此时的this是run函数
  noop.prototype = this.prototype
  fBound.prototype = new noop();
  return fBound

}
```

#### new操作符

     * new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
     * new 操作符可以访问构造函数里面的属性
     * 可以访问到原型上的属性
     * 返回值可以是函数或者对象

```javascript
  function myNew() {
  //新建一个对象
  //将arguments得第一个参数作为 构造函数Constructor
  let Constructor = [].shift.call(arguments);
  console.log(Constructor)
  const obj = Object.create(Constructor.prototype)

  obj.__proto__ = Constructor.prototype;

  //判断函数是否有返回值
  let  ret = Constructor.apply(obj, arguments);

  //判断返回值是函数还是对象
  return (typeof ret ==='function'||typeof ret==='object')&&ret !==null? ret:obj;
}

```

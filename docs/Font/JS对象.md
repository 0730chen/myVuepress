---
title: JS对象基础知识
date: 2019-09-27
tags:
  - 基础知识
---

#### JS 七大基本数据类型

1. 四个基本数据类型

- 数字 Number
- 字符串 String
- Symbol
- 布尔类型 boolean

2. 两个空值

- Nndefined
- Null

3. 一个对象

- Object

## Object

##### 对象的创建方法与属性赋值方式(增)

```javascript
let a = { a: "123456" };
//构造函数创建
let a = new Object();
//此时对象是一个空对象
//1.对象里面的key是字符串，添加对象属性, 共有属性只能后读，不能够改共有属性，只能写到自己身上
a.x = "xxx"; //赋值给空对象 x是字符串
a["xx"] = "ssss"; //添加属性 推荐写法，能够明确xx是字符串
a[name] = a; //是错误的 name值不确定
let name = "xx";
a[name] === a["xx"]; //相同
//例如
let b = "xxx";
object.assgin("目标对象", "要给对象赋值的值");
```

##### 对象属性删除

```javascript
//delete关键字删除对象属性
let a = { a: "xxx" };
delete a["a"];
console.log(a); //a是{}空对象
//delete与 a['a'] =undefined delete是将对象的key与value都删除 a['a'] = undefined是将value变成undefined key还是存在的
```

##### 对象属性查找

```javascript
let a = { s: 1, d: 2 };
Object.Keys(a); //['s','d']遍历目标对象的key值，返回一个数组
Object.Values(a); //[1,2]遍历对象的value值，返回一个数组
Object.entries(a); //遍历对象的key与value 返回key,value组成的数组
```

##### 对象属性更改

```javascript
let a = { aa: 1, b: 2 };
Object.assign("目标对象", "要添加的内容属性");
a["aa"] = 2;
a.b = 222;
//JS设计原则，在读取的时候可以读取到共有属性，在对对象属性更改的时候不能直接更改对象的共有属性
a.__proto__.toString = "xxx"; //虽然可以改，但是不推荐使用这种方式更改共有属性
windows.Object.prototype.toString = "xxx"; //如果需要修改共有属性，使用这种方式修改共有属性
Object.create(obj); //直接以obj为原型创建新的对象
```

##### 其他知识

```javascript
//使用 in操作符判断对象是否有某个属性，存在未true，否则为false in操作符不能区分是自身还是原型的属性，使用 hasOwnProperty()确实是自身而不是继承的属性
let a = {s:123,f:321}
if('s' in a){
	console.log('存在'))
}
a.hasOwnProperty('s') //判断自身是否拥有这个属性
//对象储存在JS内存中的heap区
console.dir()//打印出对象的属性，包含共有属性
```

### 对象的 prototype 与**proto**属性

1. prototype 属性，我们一般讨论构造函数的 prototype 属性，构造函数的 prototype 是对象原型
2. **proto**属性，每一个对象在生成时都会有的隐藏属性

```javascript
//prototype与__proto__关系
let a = {}
function test1(){}
a.__proto__ === Object.prototype //true
test1.__proto__ Function.prototype //false
//对象.__proto__就等于它的构造函数的原型对象 构造函数.prototype
Object.__proto__ ===bull //true
Function.__proto__ ===Function.prototype
```

由 prototype 与**proto**构建原型链，最终指向 NULL

---
title: call, bind, apply 三种用法
date: 2020-02-03
tags:
- Function
categories:
- Function
---

#### call, bind, apply 三种用法

1. 如何指定this的指向

    在js中，this的指向总是让人摸不着头脑，最常见的就是你已经定义了变量，但是在使用的时候却显示变量未定义,那么我们每次在调用函数的时候，指定它的this，就能能够明确this的指向
    使用call bind apply 三种方式指定this，这三种方法在函数原型上，所以只要是函数，就会有这三种方法

2. call方法

    call方法接受多个参数, 第一个参数指定this，后面的参数依次调用这个，是function的参数列表

$mdFormatter$13$mdFormatter$

``` javascript
    //用法
    function.call(this, arg1, arg2)

    function color() {
        console.log(this.color)
    }
    color1 = {
        color: "yellow"
    }
    color2 = {
        color: 'blue'
    }
    直接调用color() //undefined
    color.call(color1) //指定color1是color函数的运行环境, yellow
    color.call(color2) //color2作为函数的运行环境，blue  

    //  接受两个参数参数
    function person(name, age) {
        console.log(name, age)
    }
    let per = {
        name: 'haha',
        age: 18
    }
    person.call(per) //undefined undefined，因为在函数中没有使用this,所以打印的值是未定义
    person.call(per, 'hahah', 18) //'haha,18'
```

#### apply方法

apply方法和call方法类似，都是第一个参数指定this，后面的参数是该函数的参数，但是call方法接受的参数是以一个一个形式的，apply方法接收一个数组，数组中是你的函数参数

``` javascript
fun.apply(this, [1, 2, 3, 4])

function add(x, y, z, c) {
    console.log(x + y + z + c)
}
add.call(this, 1, 2, 3, 4) //10
add.apply(this, [1, 2, 3, 4]) //10
```

注意点: 参数的传入方式不同

当传入的参数不确定时，使用apply要优于call，因为apply参数是数组可以进行push

使用场景：比如使用max方法取出数组最大值, number =[1, 2, 3, 4, 5] Math.max.apply(Math, number)

类数组，伪数组使用数组方法，他们本身是无法使用数组方法的. 通过call绑定this就是可以使用
可以用来继承，继承父类的方法和属性

call和apply的第一个参数是一个对象，这个对象替代了该函数在调用过程中的this，当你传入父类对象时，改函数中的this也就有了父类对象的属性, 在非严格模式下，第一个参数为null或者undefined则自动替换为全局对象window，在严格模式下就为undefined
如果是原始值，字符串，数字，则会转换成包装对象

#### bind方法

bind绑定bind方法是创建一个新的函数，当被调用时，将传入的第一个参数作为this对象后续参数作为函数参数。bind返回一个函数，我们必须手动调用

``` javascript
    let a = {
        name: 'ahhaha',
        add: function(a, b) {
            console.log(a + b)
        }
    }
    let b = a.add
    b.call(a, 2, 2)
    b.apply(a, [2, 2])
    b.bind(a, 2, 2)()
```

#### call apply bind 三者的区别

* call 绑定this指向，在函数调用时参数数量已知情况下适用 function.call(thisObj, args1, args2, args3)
* apply 绑定this指向, 在函数调用时，参数数量不确定下适用, function.apply(thisObj, [])接受一个数组传递参数
* bind  会创建一个函数，需要在调用这个函数，在使用bind的时候通常会通过创建绑定函数 let a = add.bind(obj), a就是绑定函数
* 1.使一个函数拥有预设的初始参数 b(x,y){return x+y} let a = b.bind(null,37)
* 2.配合setTimeout使用setTimeout时this会指向window
* 这三种方式都是在方法调用时使用

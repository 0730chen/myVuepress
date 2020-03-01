---
title:JS中的继承
---
#### JS继承
obj.__proto__ = 构造函数的.prototype

原型链并非完美存在以下两个问题
1. 当原型链中包含引用类型值的原型时，该引用类型会被所有实例共享
2. 在创建子类，不能向父类的构造函数中传递参数
1. 基于原型的继承
第一种，在子构造函数中绑定父类的构造函数 
第二种，使子类的构造函数prototype属性指向父构造函数的一个实例
第三种，将父方法和属性，写在prototype属性中，然后使子构造函数的prototype === 父构造函数的prototype
第四种, 使用空对象继承
```javascript
//以大写字母开头是构造函数的意思
function Animal(){

    this.color = ['red','blue','grenn']
}
Animal.prototype.getColor = function(){
  return this.color
}
//第一种，在子构造函数中绑定父类的构造函数
function Dog(){
   Animal.call(this)//在子构造函数中调用父构造函数
   Animal.apply(this,arguments)
}

//使用prototype
//Dog的构造函数的.prototype指向了一个父构造函数的实例，则就继承了Animal
Dog.prototype = new Animal()//这一行直接改变了Dog.prototype的全部值
Dog.prototype.constructor = Dog //将constructor重新指向自己
Dog.prototype = Animal.prototype
Dog.prototype.constructor = Dog //这个时候Dog.prototype和Animal.prototype指向了同一个对象，会相互影响
let F = function(){}
F.prototype = Animal.prototype
Dog.prototype = new F()
Dog.prototype.constructor = Dog




```

2. 基于类的继承
   class是ES6中的关键字  extends继承class类 在子类的constructor中药调用super方法，super标识父类的构造函数
   
```javascript
class Animal{
    constructor(x,y) {
        this.x = '111'
        this.y = '222'
    }
    log(){
        return 'xxxx'
    }
    tostring(){}

}
class Dog extends Animal{
    constructor() {
    super();
   console.log(super.log())
    }
    tosting(){
        return this
    }
} 
```
super关键字当函数使用时是父类的构造函数,子类的构造函数必须执行一次super()
super当对象使用时，就是父类的原型   super = Animal.prototype
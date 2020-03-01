---
title: Typescript(二)
---
#### Typescript(二)

#### 接口
    1.接口(interface)是对行为的抽象，具体的行为则由class(类规定)
   ![carbon (3).png](https://i.loli.net/2019/12/03/fkDuo39AMQp6q2v.png)
    定义了一个Person接口,再定义person时要符合接口中的要求，不能多也不能少 变量的属性必须和接口的属性保持一致
    
    2.接口可选属性
    可选属性就是在属性后面加上?,在定义变量的时候可以不写上可选属性
   ![carbon (4).png](https://i.loli.net/2019/12/03/VWP3wixZknNSclK.png)
    3.还有任意属性，any，只读属性:在属性前加上readonly 表示在定义时属性已经赋值，不能更改
   
#### 函数声明
    1.直接声明函数
   ```typescript
    function sum(x: number, y: number): number {
        return x + y;
    }

   ```
    2. 函数表达式声明函数
   ```typescript
    const sum4: (x: number, y: number) => number = function(x: number, y: number): number {
        return x + y;
    }
   ```
    这里的箭头函数不是ES6中的箭头函数，而是定义函数
    
    3. 接口定义函数
  ```typescript
    interface Function {
      (x:string,y:string):boolean
    }
  ```
    4. 可选参数，在参数后面加上? 
    5. 剩余参数，使用...解析函数参数 在可选参数和剩余参数后不能有参数
    6. 函数重载
    根据参数的不同进行不同的功能，所以就有了不同类型和不同数量
  ```typescript
    function add(x:string):string //参数是字符串则返回字符串
    function add(x:number):number //参数是数字则返回数字
    function add(x:number|string):number|string{
    if(typeof x ==='string'){
        return `haha${x}`
    }else{
        return x*10
    }
    }
    //前两次是函数定义，后面是函数实现
  ```

#### 内置对象
    1. Boolean DOM BOM 等等内置对象都定义在核心库中
#### 基本概念
    类（class），定义事物的抽象特性（属性和方法），是定义一类对象叫做类
    抽象类（Abstract class），可以让其他类继承的基类（不允许实例化），抽象方法必须在子类中实现；
    接口（interface）：不同类公有属性或方法，可抽象成一个接口，接口可以被类实现（implements）。类的继承只能是一个，但可以被实现多次；
    存取器（setter and getter）：属性的赋值与读取；
    修饰符（modifiers）：是一些关键字，限定成员或类型的性质（public、protect、private）,Typescript 支持；
    对象（object），类的实例，通过 new 生成实现；
    面向对象（OOP）特性：封装、继承和多态；
    封装（encapsulation）：将对数据属性的处理细节隐藏起来，对外只暴露接口。外部调用不需要知道细节，就能访问该对象，这也保证了外部无法改变内部数据属性；
    继承（inheritance）：子类继承父类，子类拥有父类所有特性，还可以有自己具体的特性；
    多态（polymorphism）：由继承产生不同的类，对同一方法有不同的响应；


#### Typescript中的修饰符
    public 所修饰的属性和方法是公共的，任意使用；
    private 所修饰的属性和方法是私有的，仅供类自身使用；
    protected 所修饰的属性和方法是受保护的，仅供类自身和子类使用；
    readonly 所修饰的属性是只读的，必须在声明时或构造函数里被初始化；
   抽象类和接口类似，含有抽象方法(只有名字没有具体实现)，然后再基类中具体实现抽象方法
  
#### 接口，接口就是不同类之间有共同的特性功能例如，鱼类具有游泳能力，人类也有游泳能力
```typescript
interface swimming {
  swimming():string
}
class Fish{}
class Xiaoyu extends Fish implements swimming{
    swimming():string {return `开始游泳`}
    }
```
一个类可以实现多个接口，接口可以继承类，接口可以继承接口
    
    
   
    
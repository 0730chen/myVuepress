---
title: TS的类
date: 2020-09-04
tags:
- Ts类
categories:
- ts
---

#### 类的简单实例

```javascript
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
```

#### 继承

类可以单继承

```javascript
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

#### 必须使用super关键字

```javascript
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

#### 公共，私有和受保护的修饰符

```javascript
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}


//私有字段
class Animal {
  #name: string;
  constructor(theName: string) {
    this.#name = theName;
  }
}

new Animal("Cat").#name;

```

TypeScript是一种结构类型系统。当我们比较两种不同类型时，无论它们来自何处，如果所有成员的类型都是兼容的，那么我们就说这些类型本身是兼容的。

但是，在比较具有private和protected成员的类型时，我们将以不同的方式对待这些类型。对于被认为是兼容的两种类型，如果其中一种具有private成员，则另一种必须具有private源自同一声明的成员。这同样适用于protected会员。

#### protected理解

该protected修改的行为很像private，不同的是声明成员修改protected也派生类中进行访问。例如，

```javascript

class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);
```

#### 只读修饰符

您可以使用readonly关键字将属性设置为只读。只读属性必须在其声明或构造函数中进行初始化,之后不能更改

```javascript
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;

  constructor(theName: string) {
    this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit";
```

#### 静态修饰符

我们还可以创建类的静态成员，这些静态成员在类本身而不是实例上可见。(会被TS静态检查)

```javascript
class Grid {
  static origin = { x: 0, y: 0 };

  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
```

#### 抽象类

抽象类是可以从中派生其他类的基类。它们可能无法直接实例化。与接口不同，抽象类可能包含其成员的实现详细信息。该abstract关键字用于抽象类中定义抽象类以及抽象方法。

```javascript
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("roaming the earth...");
  }
}
```

#### 泛型

用于创建可重用组件的工具箱中的主要工具之一是泛型，泛型可以创建多种类型而不是单一类型工作的组件<>定义泛型，（）定义泛型中的参数

* 创建一个返回传入内容的函数, 我们需要告诉它传入的参数类型，和函数返回的类型

```javascript
function identity(arg: number): number {
  return arg;
}

function indentity2(arg:any):any{
  return arg
}

//泛型写法,在传入的时候使用，在函数返回时使用
function identity<T>(arg: T): T {
  return arg;
}
```

* 泛型类型变量

```javascript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
```

#### 通用泛型

泛型函数的类型与非泛型函数的类型相似，首先列出类型参数，类似于函数声明

```javascript
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

* 编写一个通用接口

```javascript
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

#### 通用类

通用类具有与通用接口相似的形状。泛型类<>在类名称后的尖括号（）中具有泛型类型参数列表。

```javascript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
```

* 类的类型有两个方面：静态方面和实例方面。泛型类仅在其实例方面是泛型，而在其静态方面是泛型，因此在使用类时，静态成员不能使用类的type参数。

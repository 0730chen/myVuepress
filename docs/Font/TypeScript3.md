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


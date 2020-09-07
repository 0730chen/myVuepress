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

#### 类型防护

类型防护是一个表达式，它执行运行时检查以确保该类型在一定范围内

```javascript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

#### 实用程序类型

* 构造一个类型，将所有属性Type设置为optional。该实用程序将返回一个表示给定类型的所有子集的类型。

```javascript
//Partial<Type>
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

```

* 构造一个所有属性都Type设置为的类型readonly，这意味着无法重新分配所构造类型的属性。

```javascript
Readonly<Type>
```

* 构造具有类型Keys为type 的属性的类型Type。该实用程序可用于将一个类型的属性映射到另一个类型。

```javascript
Record<Keys,Type>
```

* 通过Keys从中选择属性集来构造类型Type。通过从中选择所有属性Type然后删除来构造一个类型Keys。

```javascript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};


interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

```

#### 装饰器

装饰器提供了一种为类声明和成员添加注释和元编程语法的方法。装饰器是JavaScript 的第2阶段建议，可作为TypeScript的实验功能使用。

* 安装

```shell
tsc --target ES5 --experimentalDecorators
```

* 配置文件修改

```shell
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

* 类装饰器,在类声明之前声明一个类装饰器。类装饰器应用于类的构造函数，可用于观察，修改或替换类定义。不能在声明文件或任何其他环境上下文（例如，在declare类中）中使用类装饰器。

类装饰器的表达式将在运行时作为函数调用，装饰类的构造函数为其唯一参数。如果类装饰器返回一个值，它将用提供的构造函数替换类声明。注意如果您选择返回新的构造函数，则必须注意维护原始原型。在运行时应用装饰器的逻辑不会为您执行此操作。

```javascript
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter("world"));

```

* 方法装饰器
在方法声明之前声明方法装饰器。装饰器将应用于方法的属性描述符，并可用于观察，修改或替换方法定义。方法修饰器不能在声明文件，重载或任何其他环境上下文中使用
方法装饰器的表达式将在运行时作为函数调用，并带有以下三个参数：

1. 静态成员的类的构造函数或实例成员的类的原型。
2. 成员的名称。
3. 成员的属性描述符。
如果方法装饰器返回一个值，则它将用作方法的属性描述符。

```javascript
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}

function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}
```
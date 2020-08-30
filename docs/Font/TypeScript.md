---
title: Typescript基础语法
date: 2020-01-03
tags:
  - TypeScript
categories: -TypeScriptt
---

#### Typescript 基础语法

    npm i ts-loader -D

在 webpack 中的 module.rules 添加对 ts 的支持

```javascript
{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
},
{
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
    }
}
```

extensions 配置对 ts 后缀的支持
tsconfig.json 需要放在根目录下
![carbon (1).png](https://i.loli.net/2019/11/29/FwbcuCVsU1MAdoq.png)

修改 main.js
添加 vue 后缀识别文件 在 src 目录下添加 shims.d.ts \*.d.ts 文件不需要手动引入 ts 会自动加载
当使用 tsc 命令编译 ts 文件，指定输入文件则会忽略 tsconfig.json 配置文件，直接输入 tsc 编译全部的 ts 文件

```typescript
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

#### 定义一个布尔值

```typescript
let Flag: boolean = false;
```

#### 定义一个数字

```typescript
let num:number = 6
let num:number = 0xfood
let num:number = 0b1010
let num:number = 0o744
```

#### 定义一个字符串 普通字符串，模板字符串，嵌入字符串

```typescript
let name: string = "bob";
let name: string = `bobob`;
```

#### 数组

```typescript
let list: number[] = [1, 2, 3];
//使用泛型
let list: Array<any> = [];
```

#### 元组

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
![carbon.png](https://i.loli.net/2019/11/29/yUPtTW2iVOlsJBZ.png)

#### 任意值 any

当你还不清楚变量的类型时，可以使用 any 定义变量的数据类型。但是要尽量避免使用 any

```typescript
let non: any = 4;
```

#### void 值一般出现在函数定义中

当一个没有返回值时，他的返回值类型为空

```typescript
function add(): void {
  alert("hahah");
}
```

#### Null 和 Undefined

TypeScript 里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null。 和 void 相似，它们的本身的类型用处不是很大
默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。然而，当你指定了--strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。 这能避免很多常见的问题。 也许在某处你想传入一个 string 或 null 或 undefined，你可以使用联合类型 string | null | undefined。 再次说明，稍后我们会介绍联合类型。

```typescript
let u: undefined = undefined;
let n: null = null;
```

#### never

never 类型表示的是那些永不存在的值的类型。 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。
never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never。

```typescript
function add(message: string): never {
  throw new Error(message);
}
```

#### 类型断言

两种写法

```typescript
let someValue:any = "this string"
let str:number = (<string>.someValue).length

//as 语法
let somevalue:any = 'this'
let str:number = (someValue as string).length
```

在定义 somevalue 的时候使用的是 any 类型，然后再使用的时候，指定为字符串类型

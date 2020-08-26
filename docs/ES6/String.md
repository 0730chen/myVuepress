---
title: 字符串的扩展
date: 2020-01-03
tags: 
- string
- api
categories:
- 接口
---

1. 字符串的遍历接口
    可以使用for of遍历字符串

    ```javascript
    for(let i of 'string'){
       console.log(i)
   }
    ```

2. 模板字符串
    使用``包裹的字符串

    ```javascript
    let a = "bolo"
    let string = `hello${a}`
    ```

    在模板字符串中可以引入变量，使用${}符号解析引入的变量
  
3. 扩展运算符 ...

    扩展运算符为使用...标识

   ```javascript
       console.log(...[1,2,3])
       // 可以打印出1，2，3
    ```

4. 解析赋值

    当你发现的命名的变量和你获取的变量名字相同时就可以使用

    ```javascript
    let {table} = h;
    // 这两个是同一个意思
    let table = h.table
    let [x,y] = [1,2,3]

    ```

   对象，数组都可以进行解析赋值

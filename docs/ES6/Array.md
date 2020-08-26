---
title:  数组方法
---

#### Array.from()方法

1. 此方法用于将两类对象转为真正的对象类数组对象和可遍历的对象 Set 和 Map

    ```javascript
    let arrayLink ={
           '0': 'a',
           '1': 'b',
           '2': 'c',
           length: 3
   }
   let arr = Array.from(arrayLink)//[a,b,c]
    ```

   Array.from()也可以将Node标签节点对象转变成一个真正对象

2. #### find(),findIndex()方法

    find()方法用来寻找符合的条件的第一个数组成员，它的参数是一个回调函数

    ```javascript
       [1,2,3,4,5].find((e)=>{
       console.log(e);
           return e
      })
     //findIndex()方法返回符合条件的第一个成员的位置，如果没有则返回-1
    [1,5,10].findIndex(value=>{
       return value>9
       })
    ```

3. #### reduce()  多变一

    方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

    ```javascript
     arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
    ```

    回调函数的第一个参数是初始化的最终返回的容器，第二项是数组遍历的每一项，回调函数后的参数可以指定初始化容器的类型

    ```javascript
       let a = [1,2,3,4]
       a.reduce((item,e,index)=>{
           item.push(e[2])
           return item
       },[])
    ```

4. #### map() 多变多

    方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
    函数要有return

    ```javascript
       [1,2,3].map(e=>{
        return e*e
       })
        ```

5. #### filter() 多变少

    filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
    函数要有return

    ```javascript

       [1,2,3].filter(e=>{
       return e>2
       })
    ```

6. #### forEach()数组的遍历方式

    在forEach()中使用异步，await不起到异步作用

    ```javascript
       [1,2,3,4,5].forEach((e,index)=>{
       console.log(e,index)
       })
    ```

7. #### 数组中的异步

    在数组遍历中使用异步操作
    JavaScript 中数组的高阶函数并不会等待异步函数的返回
    * 可以使用for循环 for in/of 循环
    * 或者自己封装异步方法

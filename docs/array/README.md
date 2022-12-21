---
title: 数组
date: 2019-12-12
tags:
- array
categories:
- array
---
1. indexOf

    查询数组中的某一项。针对基本类型，对于对象数组不可取，对于复杂对象可以使用find，findIndex

    ```javascript
    //寻找基本类型元素，第二个参数是查询范围，默认值为0，从前外后查询
    arr.indexOf(searchElement[, fromIndex])

    ```

2. findIndex
    查询满足提供的函数的条件的索引值，没有满足的则返回-1

    ```javascript
    findIndex((element) => { /* … */ } )
    findIndex((element, index) => { /*…*/ } )
    findIndex((element, index, array) => { /*…*/ } )
    ```

3. find
    查询数组中的符合提供函数的第一个元素值,存在则返回该元素，不存在则返回undefined

    ```javascript
    const array1 = [5, 12, 8, 130, 44];

    const found = array1.find(element => element > 10);

    console.log(found);
    ```

4. some
   提供测试函数，有通过测试函数的则返回true，否则返回false

   ```javascript
   const array = [1, 2, 3, 4, 5];

    // checks whether an element is even
    const even = (element) => element % 2 === 0;

    console.log(array.some(even));
    // expected output: true
   ```

5. every
   提供一个测试函数，返回数据每一项是否通过该测试函数，如果是空数组则返回true

   ```javascript
   const array = [1,2,3,45]
   const result = array.every(item=>item<5)
   
   ```

6. 传入值的数组方法包含:include,indexOf，剩余大部分都是传入一个函数进行过滤查询
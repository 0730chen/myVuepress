---
title: Js的数据结构
date: 2019-10-10
tags:
  - 数据结构
---

### 数据结构

1. 数据结构是计算机组织数据，储存数据的方式
1. 队列数据结构特点：先进先出
   以数组形式储存数据，提供两个 API，push()添加数据，shift()弹出头部数据

```javascript
//例如去餐馆吃饭的排队叫号
let queen = []; //初始化队列
let i = 0;
//添加数据
function createQueen() {
  queen.push(i);
  i += 1;
}
//弹出数据
function callQueen() {
  queen.shift();
  //加一个判断,当为undefined时则什么也不做
  if (queen[0] === undefined) {
    return;
  }
}
```

2.栈 特点 先进后出，比如坐电梯
    以数组形式储存数据，提供两个 API，push()添加数据，shift()弹出头部数据

```javascript
//以数组形式实现
let stack = [];
let i = 0;
//创建数据
function createStack() {
  i += 1;
  stack.push(i); //末尾添加数据
}
function deleteStack() {
  stack.pop(); //在数组末尾弹出
}
```

3.链表 特点 当前节点，记录了下一个节点的地址
    例如原型链 对象实现链表

```javascript
    //例如
    let linkList = {
      data: 20,
      next: null,
    };
    //制造节点函数
    const createNode = (value) => {
      return {
        data: value,
        next: null,
      };
    };
    //创建链表
    const createLinkList = (value) => {
      return createNode(value);
    };
    //添加节点
    const addLinkList = (Link, value) => {
      //新建一个节点
      const node = createLinkList(value);
      let x = Link; //记录当前节点
      //循环查找节点末端
      while (x.next) {
        x = x.next; //获取了x.next不存在时，上一个链表的数据
      }
      x.next = node; //此时x.next===null  给它赋值node新节点
      return node;
    };
    //删除节点
    const removeLinkList = (link, node) => {
      //将要删除节点的前一个的next属性连接到删除节点的next属性
      let x = link;
      let p = null;
      while (x !== node) {
        //直到x ==node，跳出while
        x = x.next; //依次判断node的位置
        p = x; //记录当 x与node相等时,x的值
      }
      //此时 x==node  p记录 x的值。
      p.next = x.next; //此时 x就不存在了p.next指向了x.next的地址
    };
    ```

5) 树结构

   1. 省市区，层级结构，节点，都是树形结构

   ```javascript
   const createNode = (value) => {
     return {
       data: value,
       parent: null,
       children: null,
     };
   };
   const linkList = createLinkList(10); //创建一个链表
   //增加节点
   const addNode = (tree, value) => {
     const newNode = {
       data: value,
       parent: tree,
       children: null,
     };
     tree.children = tree.children || []; //存在则返回tree.chilidren否则返回一个空数组 || 前面为true则返回前面否则返回后面的值，
     //  &&前面成立则返回后面，否则返回前面
     tree.children.push(newNode);
     return newNode;
   };
   //遍历树
   const travel = (tree, fn) => {
     fn(travel);
     //5个false值，Null undefined '' [] 0
     //如果tree的子节点为null，则说明到了最后一个节点上，返回它
     if (!tree.children) {
       return;
     }
     //遍历节点,一条分支遍历完在进行下一条
     for (let i = 0; i < tree.children.length; i++) {
       travel(tree.children[i], fn);
     }
   };
   //删除树节点
   const removeNode = (tree, node) => {
     let ak = node.parent.children; //全部的同级子节点
     let index = 0;
     for (let i = 0; i < ak.length; i++) {
       //循环查找需要删除的节点
       if (ak[i] === node) {
         index = i;
       }
     }
     ak.splice(index, 1); //数组删除
   };
   //查找树节点
   const findeNode = (tree, node) => {
     //如果相同则返回他本身
     if (tree === node) {
       return tree;
       //如果存在子节点
     } else if (tree.children) {
       for (let i = 0; i < tree.children.length; i++) {
         const result = findNode(tree.children[i], node);
         if (result) {
           return result;
         }
       }
     }
   };
   ```

   4. hashTable 哈希表
      是由 key 和 value 组成的键值表
      主要是对 key 值的优化(如何读出来值很快)

   - 不优化 N
   - 二分法 O(log2N) 出现二分法就是会有一个 log2N
     hashtable

   1. 对索引取余数，当两个余数相同的(出现冲突),延顺:存往下一个数据

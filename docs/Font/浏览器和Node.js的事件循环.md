---
title: 事件循环理解
date: 2020-05-16
tags:
- 事件循环
- 异步
categories:
- 异步
---
### 不要混淆浏览器和Node.js的事件循环

1.不同的事件循环(Node.js)

* nodejs的event是基于libuv，而浏览器的event loop则在html5的规范中明确定义。
* libuv已经对event loop作出了实现，而html5规范中只是定义了浏览器中event loop的模型，具体实现留给了浏览器厂商

#### node的事件循环分为6个阶段，每个阶段的作用如下(process.nextTick()在6个阶段的结束的时候都会执行)

```shell
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

* timers ：执行setTimeout和setInterval中到期的callback
* I/O callbacks：上一轮循环中有少数的I/Ocallback会被延迟到这一轮的这一阶段执行
* idle, prepare：仅内部使用
* poll：最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段
* check：执行setImmediate的callback
* close callbacks：执行close事件的callback，例如socket.on("close",func)

event loop的每一次循环都需要依次经过上述的阶段。  每个阶段都有自己的callback队列，每当进入某个阶段，都会从所属的队列中取出callback来执行，当队列为空或者被执行callback的数量达到系统的最大数量时，进入下一阶段。这六个阶段都执行完毕称为一轮循环。

#### Timers阶段

在timer阶段其实使用一个最小堆而不是队列来保存所有元素（其实也可以理解，因为timeout的callback是按照超时时间的顺序来调用的，并不是先进先出的队列逻辑），然后循环取出所有到期的callback执行。

#### I/O callback阶段

callbacks是上轮残留的。这个阶段执行一些系统操作的回调，比如说TCP连接发生错误。

#### idle,prepare

系统内部操作的调用

#### poll

* 执行已经过期的timers回调
* 处理poll队列里的事件
node中的很多事件都是基于事件订阅完成的，这些API的回调都在poll阶段中完成
* 当事件循环进入poll阶段
  1. poll队列不为空时，事件循环先遍历队列执行回调，直到队列清空或回调函数执行到达上限
  2. poll不为空时

      2.1 如果代码已经被setImmediate()设定了回调，则进入check阶段，执行check里面的回调

      2.2 如果没有设定setImmediate()回调
  
* 如果有被设定的timers，那么此时事件循环会检查timers，如果有一个或多个timers下限时间已经到达，那么事件循环将绕回timers阶段，并执行timers的有效回调队列。
* 如果没有设定timers，那么事件循环是在阻塞poll阶段等待回调被加入poll队列

* setImmediate()具有最高优先级，只要poll队列为空，代码被setImmediate()，无论是否有timers达到下限时间，setImmediate()的代码都先执行。

#### check阶段

这个阶段允许在poll阶段结束后立即执行回调。如果poll阶段空闲，并且有被setImmediate()设定的回调，那么事件循环直接跳到check执行而不是阻塞在poll阶段等待回调被加入。

#### close,callbacks

如果一个socket或handle被突然关掉（比如socket.destroy()），close事件将在这个阶段被触发，否则将通过process.nextTick()触发。

#### process.nextTick() and Promise

他们都会在其所处的事件循环最后，事件循环进入下一个循环的阶段前执行。

2.Javascript的事件循环

* 首先来给一张图

![16dd55ca2fd82de5.png](https://i.loli.net/2020/05/15/k9L5WmXBVJPo7Mp.png)

#### 任务队列(Task Queue 和 Microtask Queue )

  1. Task queue 大任务
    常见的有 setTimetout，setInterval，setImmediate ，I/O，用户交互，UI渲染
  2. Microtask queue
    常见的有 promise，Process.nextTick()
  3. 事件循环的执行流程

      3.1 检查 Microtask 队列是否为空,若不为空，则进行下一步，若为空，则跳到3.3

      3.2 从 microtask 队列中取队首(在队列时间最长)的任务进去执行栈中执行(仅仅一个)，执行完后进入下一步

      3.3 检查 Microtask 队列是否为空，若不为空，则进入下一步，否则，跳到3.1（开始新的事件循环）

      3.4 从 Microtask 队列中取队首(在队列时间最长)的任务进去事件队列执行,执行完后，跳到3.3 其中，在执行代码过程中新增的microtask任务会在当前事件循环周期内执行，而新增的macrotask任务只能等到下一个事件循环才能执行了。

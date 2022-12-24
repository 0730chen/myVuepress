---
title: React中的fiber机制
date: 2022-11-14
---

#### 为什么react中需要有filber

* 在react任务开始后无法停止，所以当你有停止任务需求时，就推出了了react filber

#### Fiber的架构有两个主要阶段：协调/渲染和提交

* 协调阶段通常被称为“渲染阶段”，react在遍历组件树时的阶段，并且在更新状态和属性，调用生命周期钩子，获取组件的children，并于组件之前的children进行比较，计算需要执行的DOM更新

* 这些都是filber内部活动，在处理UI时，问题是如果一次执行太多工作，可能会导致动画丢帧，应用就会看起来卡顿，比如：React要同步遍历整个组件树并为每个组件执行任务，它可能会运行超过16毫秒，以便应用程序代码执行其逻辑。这将导致帧丢失，导致不顺畅的视觉效果。

* 全新的浏览器函数 requestIdleCallback(){}可用于对函数进行排队，这些函数会在浏览器空闲时被调用

```javascript
requestIdleCallback((deadline)=>{
    console.log(deadline.timeRemaining(), deadline.didTimeout)
})

//50 false 在浏览器中执行会打印如下数据
// deadline.timeRemaining() 代表是存在多长空闲时间， deadline.didTimeout是否还有空闲时间
//timeRemaining可能在浏览器被分配某些工作后立即更改，因此应该不断检查。
```

* react的渲染活动

```javascript
requestIdleCallback((deadline) => {
    // 当我们有时间时，为组件树的一部分执行工作    
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextComponent) {
        nextComponent = performWork(nextComponent);
    }
});
```

对一个组件进行工作，然后返回要处理的下一个组件的引用，这将不能同步地处理整个组件树，为了解决这个不能同步处理组件树的问题，react需要重新实现遍历树的算法，从依赖于内置堆栈的同步递归模型，变为具有链表和指针的异步模型。

* Fiber是堆栈的重新实现，专门用于React组件。 你可以将单个Fiber视为一个虚拟堆栈帧。
* 递归方法直观，非常适合遍历树。但是正如我们发现的，它有局限性。最大的一点就是我们无法分解工作为增量单元。我们不能暂停特定组件的工作并在稍后恢复。通过这种方法，React只能不断迭代直到它处理完所有组件，并且堆栈为空。
* 它使用单链表树遍历算法。它使暂停遍历并阻止堆栈。child - 表示第一个子节点的引用，sibling表示第一个兄弟节点引用,return - 父节点的引用

react中节点定义函数

```javascript
class Node {
    constructor(instance) {
        this.instance = instance;
        this.child = null;
        this.sibling = null;
        this.return = null;
    }
}

```

获取节点数组并链接他们

```javascript
function link (parent,elements){
    if(elements===null) elements = []
    parent.child = elements.resuceRight((previous,current)=>{
        const node = new Node(current)
        node.reutrn = parent
        node.sibiling = previous
    },null)
    return parent.child
}
```

该函数从最后一个节点开始往前遍历节点数组，将它们链接在一个单独的链表中。它返回第一个兄弟节点的引用。 这是一个如何工作的简单演示：

```javascript
const children = [{name:'b1'},{name:'b2'}]
const parent = new Node({name:'a1'})
const child = link(parent,children)

console.log(child.instabce.name==='b1')
console.log(child.sibling.instabce === children[1])
```

辅助函数

```javascript
function doWork(node) {
    console.log(node.instance.name);
    const children = node.instance.render();
    return link(node, children);
}
```

主要的遍历函数，深度优先，父节点优先

```javascript
function walk(o) {
    let root = o;
    let current = o;

    while (true) {
        // 为节点执行工作，获取并连接它的children
        let child = doWork(current);

        // 如果child不为空, 将它设置为当前活跃节点
        if (child) {
            current = child;
            continue;
        }

        // 如果我们回到了根节点，退出函数
        if (current === root) {
            return;
        }

        // 遍历直到我们发现兄弟节点
        while (!current.sibling) {

            // 如果我们回到了根节点，退出函数
            if (!current.return || current.return === root) {
                return;
            }

            // 设置父节点为当前活跃节点
            current = current.return;
        }

        // 如果发现兄弟节点，设置兄弟节点为当前活跃节点
        current = current.sibling;
    }
}
```

```javascript
function walk(o) {
    let root = o;
    let current = o;

    while (true) {
            ...

            current = child;
            ...

            current = current.return;
            ...

            current = current.sibling;
    }
}
```
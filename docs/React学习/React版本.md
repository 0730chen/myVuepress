---
title: React中的版本更新
date: 2022-11-11
---

#### Class版本的React(React的16.0)

* 生命周期
  
  组件的生命周期从组件的创建、挂载、更新、销毁

  1. 初始化阶段执行构造函数constuctor函数初始化state等参数
  2. 挂载阶段，mounted componentWillMount(){},在组件被挂载到DOM上之前调用，原本在这里做一些初始化工作，接口调用，初始化数据，但是由于constructor工作重复，且若在服务端渲染，componentWillMount会在服务端和客户端各执行一次，会导致请求两次，componentWillMounted会在客户端执行，而且之后有了Fiver之后，任务可以中断,componentWillMounted可能会被执行多次,所以在React16后这个生命周期废弃了，初始化的在constructor中处理，获取数据工作在componentDidMount里处理
  3. render阶段，组件的渲染阶段，组件的渲染阶段，进行props或者state的更新的时候，如果没有在shouldComponentUpdate中禁止的话,会触发渲染更新，而DOM层的实际重绘是一个复杂过程，React会通过虚拟DOM的方式和复杂算法进行处理。render是一个纯函数，它的返回只依赖传递参数，这里不能进行state的更新。可能会导致无限循环
  4. componentDidMount组件被挂载到DOM上后调用，只会调用一次,异步数据获取在这里处理
  5. update更新阶段，props的更新和state的更新都会触发
  6. componentWillReceiveProps，在16之前，对于外部的props响应式处理在这里
  7. shouldComponentUpdate，大量的数据更新会导致组件一遍又一遍的更新，会造成性能损耗，需要进行优化使用它，他有两个参数nextProps和nextState，在这里通过传的更新后的数据和当前数据的this.props，this.state的数据进行对比，可以进行筛选哪里会进行重绘就拦截，if拦截就返回false,如果返回true进行ReactElement比对，如果相同则不触发重绘，如果不同再进行绘制
  8. componentWillUpdate，这个方法会在render之前调用，可以处理一些更新前的处理工作，React16后可以getDerivedStateFromProps一起处理props和state同步问题
  9. render 重新调用
  10. 卸载阶段 componentWillUnmount,组件卸载前调用，这里会处理一些数据，定时器清理，避免内存泄露

```javascript

import React from 'react'

class Login Extends React {

}

```

#### React Filber简单了解

* React为了优化因为复杂层次深的组件树导致导致的跳帧问题，进行优化。React Fiber,它通过调用requestldleCallback方法，可以中断主线程的正在执行的任务，将使用权限交由渲染层使用，因为任务中断，之前的生命周期有影响，可能会导致周期函数多次调用，所以后面的生命周期也有变化,在render前调用的方法有componentWillUpdate，除了shouldComponeentUpdate之外的三个方法都废弃了，用getDerivedStateFromProps替代

#### getDSFP(getDerivedStateFromProps)

* 这个是一个静态方法,所以这里面不能调用this,是一个纯函数，传递两个参数nextProps和prevState，开发者只能通过prevState而不是PrevProps来对比，保证了state和props之间的简单关系以及不重要处理第一次渲染时prevProps为空的情况，也基于两点，将原本的componentWillReceiveProps里进行的更新工作分成两步来处理，一步是setState状态变化,更新state在getDerivedStateFormProps直接处理，另一步是昂贵操作，即进行componentDidUpdate来处理，与componentWillReceiveProps类似，许多开发者会在componentWillUpdate中根据props的变化去触发一些回调，而不论是compinentWillReceiveProps还是componentWillUpdate，都有可能在一次更新中多次被调用，也就是这个里面的回调函数也可能会被多次调用。与componentDidMount类似，componentDidUpdate也不存在这样的问题，一次更新中componentDidUpdate只会被调用一次，所以将原本写在componentWillUpdate中的回调迁移至componentDidUpdate就可以解决这个问题
* 总结就是

#### getSnapshotBeforeUpdate

* render之后的操作,可以读取但是无法调用DOM的时候调用，他的返回值作为componentDidUpdate的第三个参数，如果需要获取Dom元素的状态，由于是在fiber中，render可以打断，可能在componentWillMount中获取到元素状态很可能与实际不相同，这个时候就需要getSnapshotBeforeUpdate这个新增的生命周期函数来解决。
* componentWillMount与getSnapshotBeforeUpdate，与 componentWillMount 不同的是，getSnapshotBeforeUpdate 会在最终确定的render执行之前执行，也就是能保证其获取到的元素状态与componentDidUpdate中获取到的元素状态相同

```javascript
import React from 'react'
class SignComponent extends React.Component{
    //构造函数，在里面初始化哈函数
    constructor(props){
        super(props)
        this.state = {

        }
    }
    //生命周期
    /* 这个是为了保证获取到元素状态和compoentDidupdate中的元素状态相同
    */
    getSnapshortBeforeUpdate(prevProps,prevState){

        return null
    }
    //挂载后
    componentWillMount(){}

    //获取
    componentDidUpdate(prevProps,prevState,snapShot){
        if(snapShot !==null){
            const lsit = this....
            list.srollTop = list...
        }
    }

    //每一个类组件最后都有一个render函数
    render(){}
}
```

#### 16.7特点

* 移除了三个生命周期componentWillMounted,componentWillReciverProps,componentWillUpdate
* 引入了两个生命周期
* getDerivedStateFromProps
* getSnapshotBeforeUpdate
* getSnapshotBeforeUpdate和componentDidUpdate,根据这两个函数配置可以实现
* getSnapshotBeforeUpdate，该函数在render后触发，并且可以获取到这个时候的真实DOM，然后通过 componentDidUpdate反应。getSnapshotBeforeUpdate获取的参数可以在componentWillUpdate中获取到
* 为什么需要新的生命周期函数，原因是引入了fiber,异步渲染机制，主要的功能就是在渲染完成之前可以中断任务，中断之后不会继续执行生命周期函数，这样就会导致这几个生命周期函数会多次触发，导致异常错误
* 为什么需要异步渲染 我们都知道在react16之前，react对virtual dom 的渲染是同步的，即每次将所有操作累加起来，统计对比出所有的变化后，统一更新一次DOM树（了解虚拟dom算法），随着组件层级的深入，由于渲染更新一旦开始就无法停止，导致主线程长时间被占用，这也是react在动画，布局和手势等区域会有造成掉帧、延迟响应（甚至无响应）等不佳体验。
* React fiber,它能够将渲染操作分割成块，并散布到帧中去，同时加入了在新更新进入时暂停，中止或重复工作的能力和为不同类型的更新分配优先级的能力。（可以暂停，中止渲染）
* React fiber分割操作 react渲染大抵可以分为 reconciler（调度阶段）和 commit（渲染阶段），前者用于对比，后者用于操作dom，reconciler阶段可以算是一个从顶向下的递归算法，主要工作是对current tree 和 new tree做计算，找出变化部分。commit阶段是对在reconciler阶段获取到的变化部分应用到真实的DOM树中,在绝大部分运用场景中，reconciler阶段的时间远远超过commit，因此fiber选择将reconciler阶段进行分割。
* 分割单位fiber tree Fiber的拆分单位是fiber（fiber tree上的一个节点），这里引入了fiber tree的概念，fiber tree实际上是个单链表树结构，由fiber构成，fiber tree是根据和之前的virtual dom tree的树结构一模一样，只是节点携带的信息有差异。
* fiber将之前无法中止的diff递归（这个会持续的占据主线程），拆分成多个一系列的小任务，然后进行每次检查树上的一小部分，由于树上挂载了更多的上下文信息，因此可以选择是否继续下一个任务（时间是否允许当前帧（16ms））而上面提到的alternate，则是一开始指向一个fiber tree的clone对象，每次任务完成会先将变化更新到这个克隆体上，等到diff结束，在进行commit。
* workInProgress tree，workInProgress tree上每个节点都有一个effect list，用来存放需要更新的内容。而它的alternate则指向当前的fiber节点，这一点很关键，它可以复用之前的fiber树，下一次更新时不用重新创建fiber树，而可以更新fiber树，然后对应到相应的workInProgress tree上，完成了缓存的工作
* 任务的优先级决定
  1. 浏览器提供的requestIdleCallback API中的Cooperative Scheduling可以让浏览器在空闲时间执行回调（开发者传入的方法），在回调参数中可以获取到当前帧剩余的时间。利用这个信息可以合理的安排当前帧需要做的事情，如果时间足够，那继续做下一个任务，如果时间不够就歇一歇，调用requestIdleCallback来获知主线程不忙的时候，再继续做任务。 


```javascript
  export type Fiber = {
   return: Fiber|null, // 父节点
   child: Fiber|null, // 子节点
   sibling: Fiber|null, // 兄弟节点
   alternate: Fiber|null, //diff后差异信息
   .....
};
  ```


#### React 16.8后引入hooks
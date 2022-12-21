---
title: Vue的异步更新
date: 2022-10-11
---


#### 异步更新

* 通过Object.defineProprety方法对get,set方法进行监控，当数据更新后，a.x ='123'会触发setter，判断新值和旧值进行对比，无差异则直接返回，有差异则通过dep调用watcher进行更新，所以异步更新方法就是在dep.notify()方法通过watcher进行更新

#### notify()方法

/src/core/observer/dep.js

```javascript
/*
通知sub的所有watcher去执行update
*/
  notify(info?: DebuggerEventExtraInfo) {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (__DEV__ && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    //遍历储存的watcher然后去执行update
    for (let i = 0, l = subs.length; i < l; i++) {
      if (__DEV__ && info) {
        const sub = subs[i]
        sub.onTrigger &&
          sub.onTrigger({
            effect: subs[i],
            ...info
          })
      }
      subs[i].update()
    }
  }
```

#### Watcher的update方法


```javascript
/*
如果是懒执行则设置dirty为true，设置为true则会计算一次computed的computedGetter执行时重新计算
如果是$watcher配置了sync配置则是同步执行，就不走异步更新队列
一般都是queueWatcher去进行执行
*/
  update() {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

```

#### queueWatcher的方法

* watcher执行的就是就会执行观察队列方法

```javascript
export function queueWatcher(watcher: Watcher) {
    /*
    传入当前watcher的实例，获取id
    */
  const id = watcher.id
  //如果id存在则直接返回，做一个缓存处理
  if (has[id] != null) {
    return
  }
//传入的
  if (watcher === Dep.target && watcher.noRecurse) {
    return
  }
//设置存在值
  has[id] = true
  //如果不是立即刷新，则加入队列中
  if (!flushing) {
    queue.push(watcher)
  } else {
    // if already flushing, splice the watcher based on its id
    // if already past its id, it will be run next immediately.
    //从末尾开始遍历，找到当前watcher.id小于队列中的id,然后放入队列中
    let i = queue.length - 1
    while (i > index && queue[i].id > watcher.id) {
      i--
    }
    queue.splice(i + 1, 0, watcher)
  }
  // queue the flush
  if (!waiting) {
    waiting = true
    //如果设置同步则立即执行，一般不会走这
    if (__DEV__ && !config.async) {
      flushSchedulerQueue()
      return
    }
    //异步更新
    nextTick(flushSchedulerQueue)
  }
}
```

#### 异步更新核心nextTick

/src/core/util/next-tick.js

* 用 try catch 包装 flushSchedulerQueue 函数，然后将其放入 callbacks 数组
* 如果pending为false,表示现在浏览器的任务队列中没有 flushCallbacks 函数
* 如果pending为true,则表示浏览器的任务队列中已经被放入了 flushCallbacks 函数，执行flushCallbacks时pending会被置为false,表示下一个任务队列可以进入callbacks数组了。
* pending的作用，保持同一时间浏览器的任务队列中只有一个flushCallbacks在执行
* cb就是包装的回调函数，ctx就是上下文

```javascript
export let isUsingMicroTask = false

const callbacks: Array<Function> = []
let pending = false

//1.将pending执为false，清空数组，执行数组中的每一个函数
function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
let timerFunc

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
/*
1.这里是一些环境判断，当Promise存在时，使用Promise
2.Promise不存在则判断MutationObserver是否存在，存在则使用
3.Promise和mutationObServer都不存在则判断setImmediate
4.最后不行在使用setTimeout,0
*/
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}


export function nextTick(): Promise<void>
export function nextTick(cb: (...args: any[]) => any, ctx?: object): void
/**
 * @internal
 */
export function nextTick(cb?: (...args: any[]) => any, ctx?: object) {
    /*
    将回调函数加入callbacks执行队列中
    */
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e: any) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  //如果pending为false则表示队列中没有，则可以执行一个，并且将pending置为true阻止其他回调执行
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

```

#### 刷新队列函数

/src/core/observer/scheduler.js

* 由于flushSchedulerQueue函数负责调用，主要做了以下
* 更新flushing为true然后对队列id进行排序，从小到大排序，保证先创建的先执行
* 遍历watcher队列，并依次执行watcher.before,watcher.run


```javascript
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  /*
  1.排序并且刷新队列
  2.从父组件更新子组件，因为父组件创建在子组件之前创建
  3.一个组件的用户watcher先于渲染watcher执行，因为用户watcher在渲染watcher之前创建
  4.如果一个组件在父组件的watcher运行时销毁，则这个watcher会被跳过
  5.排序后新进来的watcher也会合适顺序排列
  */
  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  /*1.没有进行长度缓存，原因是watcher可能会被添加进来
  然后去执行watcher的before函数，和run函数
  */
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
        //执行 before 钩子，在使用 vm.$watch 或者 watch 选项时可以通过配置项（options.before）传递
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    //执行 watcher.run，最终触发更新函数，比如 updateComponent 或者 获取 this.xx（xx 为用户 watch 的第二个参数），当然第二个参数也有可能是一个函数，那就直接执行
    watcher.run()
    // in dev build, check and stop circular updates.
    //如果在开发环境
    if (__DEV__ && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' +
            (watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`),
          watcher.vm
        )
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}
  // keep copies of post queues before resetting state
  //在队列重置状态之前保留副本
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()
  //1.清空任务队列和
  function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0
  has = {} //重置缓存对象
  if (__DEV__) {
    circular = {}
  }
  //1.waiting = flushing = false，表示刷新队列结束
  //2.表示可以向callbacks数组中放入新的flushCallbacks函数，并且向浏览器中加入新的flushCallback函数
  waiting = flushing = false
}
```

#### watcher.before & watcher.run

/src/core/observer/watcher.js

* before是$watche中传入的回调函数
* watcher是内部定义的执行函数


```javascript
/*
由刷新队列函数flushSchedulerQueue调用，如果是同步watch，则直接update
1.执行实例化watcher传递的第二个参数，updateComponent或者this.xx的一个函数
2.更新旧值为新值
3.执行实例化watcher时传递的第三个参数，比如用户watcher的回调函数
*/
 run() {
    if (this.active) {
        //调用this.get()方法获取值
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        //对于对象和数组的深度监控
        isObject(value) ||
        this.deep
      ) {
        //设置值
        // set new value
        const oldValue = this.value
        this.value = value
        //如果是用户watcher则需要传递回调函数，新值，旧值和提示信息
        if (this.user) {
          const info = `callback for watcher "${this.expression}"`
          invokeWithErrorHandling(
            this.cb,
            this.vm,
            [value, oldValue],
            this.vm,
            info
          )
        } else {
            //如果是渲染watcher
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }
```

#### watcher.get

/src/core/observer/watcher.js

* 执行get，并重新进行依赖收集
* this.getter是实例化watcher时传递的第二个参数，一个函数或者字符串
* 为什么要重新收集依赖，因为在触发更新说明数据被更改了，被更新的数据已经进行响应式处理但是没有进行依赖收集，所以在更新页面时，会重新执行一个render函数，执行期间的读取操作会进行依赖收集
  
```javascript
  get() {
    //打开Dep.target。Dep.target = this
    pushTarget(this)
    let value
    const vm = this.vm
    try {
        //value为回调函数执行结果
      value = this.getter.call(vm, vm)
    } catch (e: any) {
        //如果是watcher用户，则报错
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      //关闭Dep.target 设置Dep.target = null
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
```


#### Vue中的三种Watch

* 渲染Watch，页面渲染的watcher，它的cb是一个空函数
* computed Watcher，懒执行，根据dirty去判断是否重新计算，watcher.evaluate()重新计算值，并且将dirty置为false
* 用户watcher,用户自定义的watcher 比如watch:{},this.$watch,存在回调函数


#### Vue的异步更新机制是如何实现

* 是根据浏览器的异步任务队列来实现，首选微任务队列，宏任务次之
* 当数据响应式更新后，会调用dep.notify方法，通知dep中的所有watcher去执行update，watcher.update会将自己放入一个watcher队列
* 然后通过nextTick方法将一个刷新watcher的方法放入一个全局的callbacks数组中
* 此时浏览器的异步任务队列中没有flushCallbacks函数，则执行timerFunc,将剩下的flushCallback函数放入异步队列中，如果异步任务中已有，则等执行完之后再放入
* flushCallbacks函数负责执行callbacks中的所有callback函数
* flushSchedlerQueue函数负责刷新watcher队列，对执行queue数组中的每一个watcher的run方法，从而进入到更新阶段，如果执行组件更新或者执行用户watcher的回调函数

#### nextTick如何实现

* 将传入的回调函数用try catch包裹传入callbacks数组中
* 执行timerfunc函数，在浏览器的异步任务队列放一个刷新callbacks数组的函数
  
#### 个人理解

* 当页面或者触发方法对数据进行获取或更改时都会进入Object.defineProperty方法中，这个方法会对get,set操作进行拦截。同时还会生成相应的watcher对象。每一个data[key]都有自己的watcher对象。所以多个相同key的watcher对象是同一个。并不会有多个。
* 当你改变一个值，值改变后要通知浏览器进行更新，在数据初始化时每一个data[key]都有自己的依赖收集和watcher对象。当你的值发生改变后，依赖收集对象会通知watcher对象，你的值要更新了，及调用dep.notify()函数，通知后dep中的所有watcher都去执行update函数,watcher.update 分为3中情况，懒执行(computed)执行一次，同步执行直接调用run函数，其余就调用添加到watcher队列中等待调用。加入之后也不是立即调用，而是要通过watcher的id加入到队列中合适位置，然后在通过nexttick函数调用，传入的nextTick回调函数会对储存的watcher数据进行id排序，然后通过循环方式调用，先判断是否存在before方法，然后在调用run方法。run就是通知去更新数据，对于用户watcher进行错误捕获处理，在try catch中调用cb函数，否则就直接调用
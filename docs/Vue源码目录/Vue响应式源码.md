---
title: Vue的响应式源码
date: 2022-10-10
---

#### 响应式初始化

* 响应式入口：分别处理props、methods、computed、watch
* 优先级:props、methods、data、computed对象中属性不能重复出现、优先级和书写顺序一致
* 其中computed中的key不能和props、data中的key重复,methods不影响
  
```javascript
//初始化数据
export function initState(vm: Component) {
    //从实例上火获取配置项
  const opts = vm.$options
  //处理props，为props对象的每个属性设置响应式并将其代理vm实例上
  if (opts.props) initProps(vm, opts.props)

  //传入实例然后调用组合API，v3会用到
  // Composition API
  initSetup(vm)
  //处理methods 校验每个属性的值是否为函数、并与props进行判重处理最后得到
  //vm[key] = methods[key]
  if (opts.methods) initMethods(vm, opts.methods)
  /*处理data
  1.判重处理，data上面的对象属性不能和props相同
  2.代理data对象上的属性到vm
  3.为data属性设置响应式
  */
 //如果存在则处理不存在则响应一个空的{}对象
  if (opts.data) {
    initData(vm)
  } else {
    const ob = observe((vm._data = {}))
    ob && ob.vmCount++
  }
  //处理computed
  /*
   1.为computed[key]创建watcher实例，默认是懒执行
   2.代理computed到vm实例
   3.判重computed中的key不能和data、props中的属性重复
  */
  if (opts.computed) initComputed(vm, opts.computed)

  /*
  处理watch对象
  为每个watch.key创建watcher实例，key和watch实例可能是一对多
  如果设置immediate则立即执行回调函数
  */
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

1、watch：适用于当数据变化时执行异步或者开销较大的操作时使用，即需要长时间等待的操作可以放在 watch 中

2、computed：其中可以使用异步方法，但是没有任何意义。所以 computed 更适合做一些同步计算


#### initProps

/src/core/intance/state.js 

逐一分析数据响应式初始化过程

```javascript
/*
props初始化处理函数
*/
function initProps(vm: Component, propsOptions: Object) {
    //为proops对象的每个属性设置响应式，并将其代理到vm实例上
  const propsData = vm.$options.propsData || {}
  const props = (vm._props = shallowReactive({}))
  //缓存props的每个key，进行性能优化，使用数组进行缓存
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.不是对象动态键的枚举值
  const keys: string[] = (vm.$options._propKeys = [])
  const isRoot = !vm.$parent
  // root instance props should be converted
  //根组件的props应该被转换
  if (!isRoot) {
    toggleObserving(false)
  }
  //遍历props对象，将key值放入keys中进行缓存
  for (const key in propsOptions) {
    keys.push(key)
    //获取props[key]的默认值
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (__DEV__) {
      const hyphenatedKey = hyphenate(key)
      if (
        isReservedAttribute(hyphenatedKey) ||
        config.isReservedAttr(hyphenatedKey)
      ) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
              `overwritten whenever the parent component re-renders. ` +
              `Instead, use a data or computed property based on the prop's ` +
              `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
        //为每个props的key设置响应式
      defineReactive(props, key, value)
    }
    // 静态的props属性已经被代理到组件原型上了，我们只需要代理实例化定义的属性就可以
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.

    if (!(key in vm)) {
        //key不在vm上则代理vm响应式
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}
```

#### proxy代理方法

```javascript
/*
传入目标对象，源目标key 目标key
*/
export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  //响应式的方法，将key代理到target上
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

#### 初始化methods方法

* 检查methods的值必须是一个函数
* 判重 methods中的key不能和props中的key重复 methods中的key与vue实例上已有的方法重叠，一般是一些内置方法
* 将methods[key]放到vm实例上，vm[key] = methods[key]


```javascript
/*
获取props配置项
*/
function initMethods(vm: Component, methods: Object) {
  const props = vm.$options.props
  //遍历methods对象
  for (const key in methods) {
    //如果是开发环境并且不是function则提示报错
    if (__DEV__) {
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[
            key
          ]}" in the component definition. ` +
            `Did you reference the function correctly?`,
          vm
        )
      }
      //这里则是提示方法和props中的key重复了
      if (props && hasOwn(props, key)) {
        warn(`Method "${key}" has already been defined as a prop.`, vm)
      }
      //这里是提示方法和实例上的方法重名了，提示报错，可以使用_或者$方法定义
      if (key in vm && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
            `Avoid defining component methods that start with _ or $.`
        )
      }
    }
    //给vm上添加methods[key]
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}
```

#### 初始化data

src/core/instance/state.js

* 实例化data
* 判重处理,data上对象key不能和props、methods对象上的属性相同
* 代理data对象上的属性带vm实例
* 为data对象上的数据设置响应式

```javascript
function initData(vm: Component) {
    //从实例上获取data数据
    
  let data: any = vm.$options.data
  //判断他是不是一个函数
  data = vm._data = isFunction(data) ? getData(data, vm) : data || {}
  if (!isPlainObject(data)) {
    data = {}
    __DEV__ &&
      warn(
        'data functions should return an object:\n' +
          'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      )
  }
  //代理对象data到实例上
  //判重处理
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  //判重
  while (i--) {
    const key = keys[i]
    if (__DEV__) {
      if (methods && hasOwn(methods, key)) {
        warn(`Method "${key}" has already been defined as a data property.`, vm)
      }
    }
    if (props && hasOwn(props, key)) {
      __DEV__ &&
        warn(
          `The data property "${key}" is already declared as a prop. ` +
            `Use prop default value instead.`,
          vm
        )
    } else if (!isReserved(key)) {
        //代理对象key到vm实例上
      proxy(vm, `_data`, key)
    }
  }
  //设置数据响应式
  // observe data
  const ob = observe(data)
  ob && ob.vmCount++
}
export function getData(data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  //禁止在获取数据时收集数据
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e: any) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}
```

#### initComputed初始化

/src/core/instance/state.js

* 为computed[key]创建watch实例，默认是懒执行
* 代理computed[key]到vm实例
* 判重 computed中的key不能和data props中的key重复


```javascript
//默认懒执行
const computedWatcherOptions = { lazy: true }

function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null))
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()
  //遍历computed key属性
  for (const key in computed) {
    const userDef = computed[key]
    //获取key值，get函数，如果是函数则返回不是就返回get
    const getter = isFunction(userDef) ? userDef : userDef.get
    if (__DEV__ && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm)
    }

    if (!isSSR) {
        //为computed属性创建watch实例
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        //配置项，computed是懒执行
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    //代理computed对象的属性到vm实例
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (__DEV__) {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn(
          `The computed property "${key}" is already defined as a method.`,
          vm
        )
      }
    }
  }
}
//定义computed属性，将computed中的key代理到target上
export function defineComputed(
  target: any,
  key: string,
  userDef: Record<string, any> | (() => any)
) {
  const shouldCache = !isServerRendering()
  //检测属性描述符
  if (isFunction(userDef)) {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (__DEV__ && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  //代理target key的数据响应式
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

//返回一个函数，构造computedgetter的函数
function createComputedGetter(key) {
    //computed属性会缓存值的原理也是在这里结合watcher.evalaute,watch.updata
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    //得到当前的key对应的watch
    if (watcher) {
        /*
        计算key对应的值，通过执行computed.key的回调函数来得到
        watcher.dirty属性就是computed会缓存的原理
        computed在第一次执行时会实际计算
        然后watcher.evaluate会将watch.dirty变为false,到下次页面更新时
        watch.update会将watch.dirty值成true
        */
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        if (__DEV__ && Dep.target.onTrack) {
          Dep.target.onTrack({
            effect: Dep.target,
            target: this,
            type: TrackOpTypes.GET,
            key
          })
        }
        watcher.depend()
      }
      return watcher.value
    }
  }
}
//返回回调函数
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this)
  }
}
```

#### initWatch初始化函数

/src/core/instance/state.js

* 初始化watch函数
* 遍历后判断

```javascript
function initWatch(vm: Component, watch: Object) {
    /*
    遍历watch对象判断是不是数组，是数组则循环创建watch,否则创建watch
    */
  for (const key in watch) {
    const handler = watch[key]
    if (isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

//创建watch函数，保证handler肯定是一个函数,调用$watch
function createWatcher(
  vm: Component,
  expOrFn: string | (() => any),
  handler: any,
  options?: Object
) {
    //如果handler是对象则取其中的handler选项值
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  //如果是字符串则取methods方法
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
/**
 .创建watcher返回unwatch
 1.兼容性处理,保证最后的Watcher时为cb函数
 2.标识用户watcher
 3.创建watcher实例
 4.如果设置了immediate则立即执行一次cb
 5.返回unwatch
 expOrFn key cb 回调函数 options配置项，立即执行，深层监控
 **/
//实例上的$watch对象
 Vue.prototype.$watch = function (
    expOrFn: string | (() => any),
    cb: any,
    options?: Record<string, any>
  ): Function {
    const vm: Component = this
    //兼容处理,用户调用vm.$watch时是cb对象
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    //options.user表示用户watcher 渲染watcher,即updateComponent方法中实例化的watcher
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    //如果设置了immediate则立即执行一次
    if (options.immediate) {
      const info = `callback for immediate watcher "${watcher.expression}"`
      pushTarget()
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info)
      popTarget()
    }
    //返回一个unwatch函数，用于解除监听
    return function unwatchFn() {
      watcher.teardown()
    }
  }
/* 
 响应式处理的真正入口，为对象创建观察实例，如果已经被观察过了则返回这个被观察的实例，否则创建
*/
export function observe(value: any, shallow?: boolean): Observer | void {
    //非对象和VNode实例不做响应式处理
  if (!isObject(value) || isRef(value) || value instanceof VNode) {
    return
  }
  //声明观察者对象，判断是存在__ob__属性查看是否是响应式对象
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    //如果有并且是继承观察类则返回这个对象
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value.__v_skip
  ) {
    //不是就创建一个新的观察者对象并返回
    ob = new Observer(value, shallow)
  }
  return ob
}

//观察者类
/*观察者类，会被附加到每一个被观察的对象上,value.__ob__=this
对象的各个属性则会被转换成getter和setter并收集依赖和更新通知
*/
export class Observer {
  dep: Dep
  vmCount: number // number of vms that have this object as root $data //以该对象为根的虚拟数量
  constructor(public value: any, public shallow = false) {
    // this.value = value
    this.dep = new Dep()
    //创建一个响应对象
    this.vmCount = 0
    //初始化记录为0
    def(value, '__ob__', this)

    if (isArray(value)) {
        /*判断value是否为数组，
        hasProto = '__proto__ in {}'
        判断对象上是否存在__proto__属性，通过obj.__proto__可以访问对象的原型链
        由于__proto__不是标准属性，所以有的浏览器不支持，IE6-10
        判断是一会要通过__proto__操作数据的原型链
        覆盖数组的默认7个方法
        */
      if (hasProto) {
        //存在__proto__属性
        protoAugment(value, arrayMethods)
      } else {
        //不存在__proto__属性
        copyAugment(value, arrayMethods, arrayKeys)
      }

      if (!shallow) {
        this.observeArray(value)
      }
    } else {
        //设置响应式
      this.walk(value, shallow)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  //遍历对象的key，然后设置对应响应式
  walk(obj: object, shallow: boolean) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      defineReactive(obj, key, NO_INIITIAL_VALUE, undefined, shallow)
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}


/*响应式设置函数，传入要设置的对象，key，值，自定义Setter,布尔值
*/
export function defineReactive(
  obj: object,
  key: string,
  val?: any,
  customSetter?: Function | null,
  shallow?: boolean
) {
    //实例化dep，一个key一个dep
  const dep = new Dep()
  //获取obj上的key属性，如果是不可配置key则直接返回，//获取该属性的权限
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  //获取配置项后获取getter和setter
  const getter = property && property.get
  const setter = property && property.set
  //如果不存在val
  if (
    (!getter || setter) &&
    (val === NO_INIITIAL_VALUE || arguments.length === 2)
  ) {
    val = obj[key]
  }
  //递归调用，处理对象中的值还是对象的情况
  let childOb = !shallow && observe(val)

  //响应式核心
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    //拦截obj对key的get操作，也就是获取值
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      /*Dep就是上方的实例化的属性
      Dep.target是一个实例化的watcher,实例化watcher会执行传入的回调函数，computed除外(懒执行)
      回调函数中存在vm.key的读取操作，则会触发这里的getter进行依赖收集进行拦截
      回调函数执行完以后又会将 Dep.target 设置为 null，避免这里重复收集依赖
      */
     //依赖收集，在 dep 中添加 watcher，也在 watcher 中添加 dep
     //这就是 this.key.chidlKey 被更新时能触发响应式更新的原因
      if (Dep.target) {
        //如果是开发环境
        if (__DEV__) {
          dep.depend({
            target: obj,
            type: TrackOpTypes.GET,
            key
          })
        } else {
          dep.depend()
        }
        //如果对象的val还是对象则深层
        if (childOb) {
          childOb.dep.depend()
          //如果是数组，则触发数组响应式
          if (isArray(value)) {
            dependArray(value)
          }
        }
      }
      //这里是v3的Api，如果说Ref对象则返回value.value,否则返回value
      return isRef(value) ? value.value : value
    },
    /*拦截设置操作
    */
    set: function reactiveSetter(newVal) {
        //获取了旧的值
      const value = getter ? getter.call(obj) : val
      //如果新旧没有变化则直接返回
      if (!hasChanged(value, newVal)) {
        return
      }
      //如果是开发环境并且存在自定义customSetter
      if (__DEV__ && customSetter) {
        customSetter()
      }
      //setter不存在说明该值只可读
      if (setter) {
        setter.call(obj, newVal)
      } else if (getter) {
        // #7981: for accessor properties without setter
        return
        //设置新的值
      } else if (isRef(value) && !isRef(newVal)) {
        value.value = newVal
        return
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      //如果是开发环境则通知dep触发响应式
      if (__DEV__) {
        dep.notify({
          type: TriggerOpTypes.SET,
          target: obj,
          key,
          newValue: newVal,
          oldValue: value
        })
      } else {
        dep.notify()
      }
    }
  })

  return dep
}
```

#### 数组响应式

当传入的值是数组时进行特殊处理响应式

src/core/observer/array.js

```javascript
/*遍历每一项，判断是否该项存在观察者属性，添加依赖，如果存在观察者属性则
然后如果还是数组，就继续递归添加
*/
function dependArray(value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    if (e && e.__ob__) {
      e.__ob__.dep.depend()
    }
    if (isArray(e)) {
      dependArray(e)
    }
  }
}
/*
数组响应式
定义了7个数组方法
*/
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 * 枚举事件去添加响应式
 * 拦截变异方法并触发事件
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  //此时是获取数组的方法
  //def方法就Object.definePoroperty方法
  def(arrayMethods, method, function mutator(...args) {
    //先调用一次这个原生方法
    const result = original.apply(this, args)
    //获取观察对象
    const ob = this.__ob__
    let inserted
    //如果是这三个方法则是表示往数组中加入数据
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    //将加入的数据添加到响应式中
    if (inserted) ob.observeArray(inserted)
    // notify change
    //如果是开发环境则通知观察者
    if (__DEV__) {
      ob.dep.notify({
        type: TriggerOpTypes.ARRAY_MUTATION,
        target: this,
        key: method
      })
    } else {
      ob.dep.notify()
    }
    return result
  })
})

//Object.defineProperty方法封装，根据传入的对象，key，枚举值
export function def(obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

//修改原型链上的属性
function protoAugment(target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

//复制参数，在复制对象上复制指定属性，例如数组的7个变异方法
function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
```

#### Dep

/src/core/observer/dep.js
在响应式时候，依赖收集对象，收集每个dep依赖的watcher对象有哪些
在响应式更新时，去通知dep中那些watcher需要进行调用update方法

```javascript
/*
一个dep实例对应一个object.key

*/
export default class Dep {
  static target?: DepTarget | null
  id: number
  subs: Array<DepTarget>

  constructor() {
    this.id = uid++
    this.subs = []
  }

  //在dep中添加watcher
  addSub(sub: DepTarget) {
    this.subs.push(sub)
  }
  //在dep中移除watcher
  removeSub(sub: DepTarget) {
    remove(this.subs, sub)
  }
  //向watcher中添加dep
  depend(info?: DebuggerEventExtraInfo) {
    if (Dep.target) {
      Dep.target.addDep(this)
      if (__DEV__ && info && Dep.target.onTrack) {
        Dep.target.onTrack({
          effect: Dep.target,
          ...info
        })
      }
    }
  }
//通知dep中的watcher去更新执行update方法
  notify(info?: DebuggerEventExtraInfo) {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (__DEV__ && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
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
}
//设置 dep.target是当前正在执行的watcher,同一时间只能有一个watcher执行
Dep.target = null
const targetStack: Array<DepTarget | null | undefined> = []

//需要进行依赖收集时调用，往设置dep.target = watcher
export function pushTarget(target?: DepTarget | null) {
  targetStack.push(target)
  Dep.target = target
}

//设置dep.targeet = null
export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```

#### Watcher

/src/core/observer/watcher.js

```javascript

import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set,
  handleError,
  invokeWithErrorHandling,
  noop,
  isFunction
} from '../util/index'

import { traverse } from './traverse'
import { queueWatcher } from './scheduler'
import Dep, { pushTarget, popTarget, DepTarget } from './dep'
import { DebuggerEvent, DebuggerOptions } from 'v3/debug'

import type { SimpleSet } from '../util/index'
import type { Component } from 'types/component'
import { activeEffectScope, recordEffectScope } from 'v3/reactivity/effectScope'

let uid = 0

/**
 * @internal
 * //watch的配置选项
 */
export interface WatcherOptions extends DebuggerOptions {
  deep?: boolean
  user?: boolean
  lazy?: boolean
  sync?: boolean
  before?: Function
}

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 * 观察解析一个表达式，收集该依赖
 * 当表达式的值改变就调用回调函数
 * 被$watch和指令使用
 * 一个组件一个 watcher（渲染 watcher）或者一个表达式一个 watcher（用户watcher）
 * @internal
 */
export default class Watcher implements DepTarget {
  vm?: Component | null
  expression: string
  cb: Function
  id: number
  deep: boolean
  user: boolean
  lazy: boolean
  sync: boolean
  dirty: boolean
  active: boolean
  deps: Array<Dep>
  newDeps: Array<Dep>
  depIds: SimpleSet
  newDepIds: SimpleSet
  before?: Function
  onStop?: Function
  noRecurse?: boolean
  getter: Function
  value: any

  //只在开发中
  // dev only
  onTrack?: ((event: DebuggerEvent) => void) | undefined
  onTrigger?: ((event: DebuggerEvent) => void) | undefined

  constructor(
    vm: Component | null,
    expOrFn: string | (() => any),
    cb: Function,
    options?: WatcherOptions | null,
    isRenderWatcher?: boolean
  ) {
    recordEffectScope(this, activeEffectScope || (vm ? vm._scope : undefined))
    if ((this.vm = vm)) {
      if (isRenderWatcher) {
        vm._watcher = this
      }
    }
    // options
    if (options) {
        //保证参数是布尔值
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
      if (__DEV__) {
        this.onTrack = options.onTrack
        this.onTrigger = options.onTrigger
      }
    } else {
        //如果没有则全部展示为false
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching，观察器的id是累加的
    this.active = true
    this.dirty = this.lazy // for lazy watchers懒观察，
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = __DEV__ ? expOrFn.toString() : ''
    // parse expression for getter
    if (isFunction(expOrFn)) {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        __DEV__ &&
          warn(
            `Failed watching path: "${expOrFn}" ` +
              'Watcher only accepts simple dot-delimited paths. ' +
              'For full control, use a function instead.',
            vm
          )
      }
    }
    //懒观察
    this.value = this.lazy ? undefined : this.get()
  }

  /**
   * 执行this.get并收集依赖
   * Evaluate the getter, and re-collect dependencies.
   * this.getter是实例化watcher时传递的第二个参数，一个函数或者字符串
   * 为什么要重新进行依赖收集，是因为响应式数据更新了，但是被更新的数据没有进行依赖收集，所以在更新页面时。会执行一次render函数，执行期间会触发读取会进行依赖收集
   */
  get() {
    //打开Dep.target Dep.target = this
    pushTarget(this)
    //value 为回调函数的执行结果
    let value
    const vm = this.vm
    try {
        //执行回调函数，进入patch阶段
      value = this.getter.call(vm, vm)
    } catch (e: any) {
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
      //关闭dep.target 并设置dep.target为null
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /**给指令添加一个依赖关系
   * Add a dependency to this directive.
   * 添加dep到自己的watcher
   * 添加watcher给dep
   */
  addDep(dep: Dep) {
    const id = dep.id
    //如果新的依赖id不存在则添加
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      //如果旧的ids中不存在则添加进入
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /**
   * 清空依赖收集容器
   * Clean up for dependency collection.
   */
  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp: any = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   * 当依赖改变时被调用
   */
  update() {
    /* istanbul ignore else */
    //如果是懒收集则置为true
    if (this.lazy) {
        //computed
      this.dirty = true //设置为true则可以让computedGetter执行重新计算computed
    } else if (this.sync) {
        //在传入sync 同步执行，再传入$watch或者watch可以使用的参数，为true则不走异步更新队列，直接执行run函数更新
      this.run()
    } else {
        //如果都没有则将watch放入watcher队列
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   * 工作调度器
   * 1.执行实例化watcher传递的第二个参数，updateComponent或者获取this.xx的一个函数
   * 2.更新旧值为新值
   * 3.执行实例化watcher传递的第三个参数，比如watcher的回调
   */
  run() {
    if (this.active) {
        //调用this.get
      const value = this.get()
      if (
        value !== this.value ||
        //深度观察者和观察在对象或 数组上被调用
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        //设置新值到旧值上
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
            //如果是用户watcher则执行用户传递的第三个参数，回调函数，参数为val oldVal
          const info = `callback for watcher "${this.expression}"`
          invokeWithErrorHandling(
            this.cb,
            this.vm,
            [value, oldValue],
            this.vm,
            info
          )
        } else {
            //渲染watcher this.cb = noop 一个空函数
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   * 懒观察的watcher会执行该方法，比如computed
   * 在获取值的时候会执行,然后this.dirty会变为false,作用是在本次渲染中执行一次的computed.key的回调函数。页面更新后this.dirty会重置为true,这一步在update中完成
   */
  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   * 添加dep收集到watcher
   */
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * //将自己的所有依赖关系从调度列表中删除
   * Remove self from all dependencies' subscriber list.
   */
  teardown() {
    if (this.vm && !this.vm._isBeingDestroyed) {
      remove(this.vm._scope.effects, this)
    }
    if (this.active) {
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
      if (this.onStop) {
        this.onStop()
      }
    }
  }
}

```

#### 总结

* vue的响应式原理是通过Object.deineProperty方法实现，通过对数据的get,set方法进行拦截实现响应式

* 响应式数据分为两类：1. 对象，循环遍历为每个属性设置get，set方法，当值依旧是对象则递归调用，为每个key设置访问数据的进行依赖收集，在dep中储存相关的watcher,2.设置数据时由dep通知watcher进行更新

* 数组：通过定义数组的7个会修改自身的原型方法进行拦截，对新加入的数据进行响应式数据添加通过dep通知watcher进行更新，删除数据时也由dep进行通知更新


#### methods computed watch

* methods一般用于封装一些较为复杂的处理逻辑(同步，异步)
* computed一般用户页面展示，同步逻辑，将处理后的数据返回，然后显示
* watch一般用于在数据变化时执行回调函数，异步或者开销大的操作

1. 在一次渲染中，多个地方使用methods和多个地方使用computed,methods会执行多次，而computed只会执行一次，多次访问computedProperty属性，只会执行一次回调函数，后续的访问就是使用第一次的执行结果，实现原理就是通过对watcher.dirty属性控制实现（默认是懒执行，执行之后将值变为true则不执行cb函数），methods则是方法的简单调用
2. computed和watch在源码上区别不大。都是通过watch实现。使用场景不同，computed是懒执行
3. 两者是两个东西，可以抽离代码逻辑提高可读性
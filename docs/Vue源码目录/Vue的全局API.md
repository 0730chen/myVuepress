---
title: Vue的全局API
date: 2022-10-11
---

* 全局API的路径都在core/global-api下

```javascript
export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  //不能替换config对象，而是设置config对象，config是默认对象
  const configDef: Record<string, any> = {}
  configDef.get = () => config
  if (__DEV__) {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

/*
暴露了一些公共方法，轻易不要使用，除非你很熟悉
*/
  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on //这里存在一些不被认为是公共API的方法
  // them unless you are aware of the risk.
  Vue.util = {
    //触发告警，在响应式中会看到
    warn,
    //合并选项
    extend,
    //合并配置项
    mergeOptions,
    //设置响应式
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  //响应式方法
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  将Vue挂载在options._base上
  Vue.options._base = Vue

//添加默认组件，keep-alive
  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
```


#### 初始化use函数

```javascript
/*
向外面暴露一个初始化use函数
*/
export function initUse(Vue: GlobalAPI) {
    //这里是调用的插件列表
  Vue.use = function (plugin: Function | any) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = [])
      //判断这个插件是否已经安装过了，安装了则不重复安装
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    //添加参数，将Vue的构造函数，传入第一个参数中
    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    //判断插件是否存在install方法，或者插件本身就是函数
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args)
    } else if (isFunction(plugin)) {
      plugin.apply(null, args)
    }
    //将插件放入插件列表中
    installedPlugins.push(plugin)
    return this
  }
}
```

#### 初始化initMixin

```javascript
export function initMixin(Vue: GlobalAPI) {
    /*进行配置项和合并，minxin会覆盖原先的配置项*/
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

#### mergeOptions合并选项

```javascript
/*父组件配置，子组件配置
*/
export function mergeOptions(
  parent: Record<string, any>,
  child: Record<string, any>,
  vm?: Component | null
): ComponentOptions {
  if (__DEV__) {
    checkComponents(child)
  }
  //检查子组件是不是函数组件，如果是则取options属性
  if (isFunction(child)) {
    // @ts-expect-error
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  //._base是赋值了当前的this对象，在这里进行extends属性和mixin属性的合并
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options: ComponentOptions = {} as any
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  //如果key冲突则子会覆盖父选项
  function mergeField(key: any) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

#### 内置方法指令

```javascript
export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  export const ASSET_TYPES = ['component', 'directive', 'filter'] as const
  /*内置资产的类型*/
  ASSET_TYPES.forEach(type => {
    // @ts-expect-error function is not exact same type
    //
    Vue[type] = function (
      id: string,
      definition?: Function | Object
    ): Function | Object | void {

      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (__DEV__ && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          // @ts-expect-error
          //如果存在name则使用name否则使用id
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        //如果类型是指令，则去绑定bind和update方法
        if (type === 'directive' && isFunction(definition)) {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
```


#### 初始化initExtend

* 基于Vue去扩展子类，子类的同样也可以扩展
* 默认配置如果和基类有冲突则会进行选项合并（mergeOptions)

```javascript
export function initExtend(Vue: GlobalAPI) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0
  let cid = 1

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions: any): typeof Component {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    //如果ID有缓存过则直接返回
      /**
   * 利用缓存，如果存在则直接返回缓存中的构造函数
   * 什么情况下可以利用到这个缓存？
   *   如果你在多次调用 Vue.extend 时使用了同一个配置项（extendOptions），这时就会启用该缓存
   */
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (__DEV__ && name) {
      validateComponentName(name)
    }
    //定义Sub构造函数
    const Sub = function VueComponent(this: any, options: any) {
      this._init(options)
    } as unknown as typeof Component
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(Super.options, extendOptions)
    Sub['super'] = Super

    /*
    props属性和computed属性，我们定义了proxy代理
    */
    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }
    /*
    保持父类的引用
    */
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)
    //扩展完进行缓存
    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
  }
}

function initProps(Comp: typeof Component) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, `_props`, key)
  }
}

function initComputed(Comp: typeof Component) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}
```

#### Set方法

```javascript
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 * 设置一个对象的属性，添加一个不存在的属性或者修改一个属性的值，
 * 如果 target 是对象，并且 key 原本不存在，则为新 key 设置响应式，然后执行依赖通知
 */
export function set<T>(array: T[], key: number, value: T): T
export function set<T>(object: object, key: string | number, value: T): T
export function set(
  target: any[] | Record<string, any>,
  key: any,
  val: any
): any {
    //错误提示
  if (__DEV__ && (isUndef(target) || isPrimitive(target))) {
    warn(
      `Cannot set reactive property on undefined, null, or primitive value: ${target}`
    )
  }
  //只读属性不能设置
  if (isReadonly(target)) {
    __DEV__ && warn(`Set operation on key "${key}" failed: target is readonly.`)
    return
  }
  //更新数组指定下标的元素，Vue.set(array, idx, val)，通过 splice 方法实现响应式更新 如果是数组通过splice方法实现数组更新
  if (isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  //如果对象已经有的属性，则直接赋值更新
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  //targget上是否有观察对象
  //不能向 Vue 实例或者 $data 添加动态添加响应式属性，vmCount 的用处之一，
  // this.$data 的 ob.vmCount = 1，表示根组件，其它子组件的 vm.vmCount 都是 0
  const ob = (target as any).__ob__
  if ((target as any)._isVue || (ob && ob.vmCount)) {
    __DEV__ &&
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
      )
    return val
  }
  //如果不存在观察对象，则直接就赋值
  if (!ob) {
    target[key] = val
    return val
  }
  //添加响应式，通知dep依赖收集，然后触发watcher更新
  defineReactive(ob.value, key, val)
  if (__DEV__) {
    ob.dep.notify({
      type: TriggerOpTypes.ADD,
      target: target,
      key,
      newValue: val,
      oldValue: undefined
    })
  } else {
    ob.dep.notify()
  }
  return val
}
```

#### delete

```javascript
/**
 * Delete a property and trigger change if necessary.
 */
/**
 * 通过 Vue.delete 或者 vm.$delete 删除 target 对象的指定 key
 * 数组通过 splice 方法实现，对象则通过 delete 运算符删除指定 key，并执行依赖通知
 * 类似于set方法
 */
export function del<T>(array: T[], key: number): void
export function del(object: object, key: string | number): void
export function del(target: any[] | object, key: any) {
  if (__DEV__ && (isUndef(target) || isPrimitive(target))) {
    warn(
      `Cannot delete reactive property on undefined, null, or primitive value: ${target}`
    )
  }
  if (isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target as any).__ob__
  if ((target as any)._isVue || (ob && ob.vmCount)) {
    __DEV__ &&
      warn(
        'Avoid deleting properties on a Vue instance or its root $data ' +
          '- just set it to null.'
      )
    return
  }
  if (isReadonly(target)) {
    __DEV__ &&
      warn(`Delete operation on key "${key}" failed: target is readonly.`)
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  if (__DEV__) {
    ob.dep.notify({
      type: TriggerOpTypes.DELETE,
      target: target,
      key
    })
  } else {
    ob.dep.notify()
  }
}
```

#### nextTick方法

* 在Vue的异步更新中定义了

```javascript

/**
 * 完成两件事：
 *   1、用 try catch 包装 flushSchedulerQueue 函数，然后将其放入 callbacks 数组
 *   2、如果 pending 为 false，表示现在浏览器的任务队列中没有 flushCallbacks 函数
 *     如果 pending 为 true，则表示浏览器的任务队列中已经被放入了 flushCallbacks 函数，
 *     待执行 flushCallbacks 函数时，pending 会被再次置为 false，表示下一个 flushCallbacks 函数可以进入
 *     浏览器的任务队列了
 * pending 的作用：保证在同一时刻，浏览器的任务队列中只有一个 flushCallbacks 函数
 * flushSchedulerQueue函数就是watcher队列调用函数。
export function nextTick(): Promise<void>
export function nextTick(cb: (...args: any[]) => any, ctx?: object): void
/**
 * @internal
 */
export function nextTick(cb?: (...args: any[]) => any, ctx?: object) {
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
  //为false则表示浏览器中的任务队列中没有flushCallback函数，则可以调用，调用时在设置成true,为true则表示存在flushcallback函数，cb函数执行完后会设置pending为false表示下一个函数可以进入了
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


#### 总结

* Vue.use(plugin)中做了那些事，调用install方法，判断是否安装过，安装过则直接返回，没安装则执行Install函数
* Vue.mixin(options)做了那些事，负责Vue的全局配置并合并options，相同key值的mixin会覆盖父组件的值（全局配置），初始化props，directive，inject
* Vue.component('组件名','组件')做了那些事，注册全局组件，将组件注册到全局的Component上（options.component）然后各个子组件在生成Vnode的时候将全局的component配置项合并到子组件的component配置项上
* Vue.directive('my-directive', {xx}) 做了那些事。在全局注册指令xxx,然后在Vnode渲染时，将全局的directive配置项合并到子组件的directive上。this.options.directives['my-directive'] = {xx}
* Vue.filter('xx',{xx})做了那些事，在全局注册过滤器，然后每个子组件在生成 vnode 时会将全局的 filters 选项合并到局部的 filters 选项中。如果没有第二个参数则是获取，如果有则是设置this.options.filter['xxx'] = xxx
* Vue.extends()，都做了那些事，基于 Vue 创建一个子类，参数 options 会作为该子类的默认全局配置，就像 Vue 的默认全局配置一样。所以通过 Vue.extend 扩展一个子类，一大用处就是内置一些公共配置，供子类的子类使用。合并 Vue 的配置和 options，如果选项冲突，则 options 的选项会覆盖 Vue 的配置项
* Vue.set(target, key, val) 做了什么，主要是新增属性没有响应式，通过set去新增响应式，如果是数组则通过splice方法，不能向$data,Vue实例添加响应式，如果是已有属性则直接改变返回，set(obj, key, val)，如果 obj 不是响应式对象，会执行 obj[key] = val，但是不会做响应式处理，然后调用则通过 defineReactive 方法设置响应式，并触发依赖更新。
* Vue.delete(target, key) 做了什么，类似于set，同样不能删除$data和Vue实例上的属性
* Vue.nextTick(cb) 做了什么.当数据发生改变后，dep依赖收集通知watcher进行更新，将watcher放入watch队列中，将刷新watcher队列的函数放入callback中，在浏览器的异步任务队列中放入一个刷新callback数组的函数，vue.nextTick(cb)来插队，将cb函数也放入callback数组中，然后等待执行刷新callback数组的函数，然后执行callback函数中的watcher.run方法执行，更新dom,由于cb是后面放入的数组中，则dom更新后才会执行。

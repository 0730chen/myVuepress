---
title: Vue源码中的关键字
date: 2022-10-09
---

#### 构建文件的分类

文件类型 | UMD | CommonJs| ESModule|
----| -----| -----|-----|
Full | vue.js | vue.common.js| vue.esm.js|
Runtime-only |vue.runtime.js  | vue.runtime.common.js |vue.runtime.esm.js |
Full (production) |vue.min.js  | vue.common.prod.js | |
Runtime-only (production) |vue.runtime.min.js  | vue.runtime.common.prod.js | |

#### 名词解释

* Full 这是一个全量的包，包含编译器（compiler）和运行时（runtime）。
* Compiler：编译器，负责将模版字符串（即你编写的类 html 语法的模版代码）编译为 JavaScript 语法的 render 函数。
* Runtime 负责创建 Vue 实例、渲染函数、patch 虚拟 DOM 等代码，基本上除了编译器之外的代码都属于运行时代码。
* UMD 兼容 CommonJS 和 AMD 规范，通过 CDN 引入的 vue.js 就是 UMD 规范的代码，包含编译器和运行时。
* CommonJS 典型的应用比如 nodeJS，CommonsJS 规范的包是为了给 browserify 和 webpack 1 这样旧的打包器使用的。他们默认的入口文件为 vue.runtime.common.js。
* ES Module 现代 JavaScript 规范，ES Module 规范的包是给像 webpack 2 和 rollup 这样的现代打包器使用的。这些打包器默认使用仅包含运行时的 vue.runtime.esm.js 文件。


#### 源码断点调试

* 下载源码后通过在dist目录下新建一个demo.html页面例如,通过打断点去调整去阅读整个代码流程

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>vue源码测试title</title>
</head>

<body>
    <div id="app">
        <div>{{ msg }}</div>
        <script src="./vue.js"></script>
        <script type="text/javascript">
            debugger
            new Vue({
                el: '#app',
                data: {
                    msg: 'hello vue'
                }
            })
        </script>
    </div>
</body>

</html>
```

#### 构建Vue对象的初始化函数

* /src/core/instance/index.js
然后会引入生命周期，mixin，store,renderMixin,eventsMixin等等初始化函数进行初始化

```javascript
function Vue(options) {
  if (__DEV__ && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
initMixin(Vue)
```

#### 初始化initMixin

/src/core/instance/init.js

* 源码方法
  
```javascript
//定义了Vue对象原型链上的初始化方法_init
//定义一个初始化mixin的方法 接受参数是一个Vue组件
export function initMixin(Vue: typeof Component) {
    //Vue的初始化过程
  Vue.prototype._init = function (options?: Record<string, any>) {
    //此时的Vue实例就是你new Vue的实例
    const vm: Component = this
    // a uid，每个Vue实例都有一个uid _uid依次递增
    vm._uid = uid++

    //根据环境判断开始标签和结束标签
    let startTag, endTag
    /* istanbul ignore if */
    if (__DEV__ && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }
    //一个标志位，标志是一个Vue实例
    // a flag to mark this as a Vue instance without having to do instanceof
    // check
    vm._isVue = true
    //避免被观察的实例
    // avoid instances from being observed
    vm.__v_skip = true
    // effect scope
    vm._scope = new EffectScope(true /* detached */)
    // merge options
    if (options && options._isComponent) {
        //子组件初始化进入后进行性能优化，将配置对象的一些深层次属性放到$options选项中提高代码执行效率
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options as any)
    } else {
    /**
     * 这个初始化组件，合并全局配置到根组件的局部配置，比如Vue.component注册的全局组件会合并到根实例 components
     * 每个子组件的合并则发生在两个地方
     * Vue.component方法注册的全局组件在注册时做了合并选择
     * {components:{}}方法注册的局部组件在执行编译器生成的render函数时做了选项合并，包含组件中的components配置
     * **/
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor as any),
        options || {},
        vm
      )
    }
    //忽略其他事项
    /* istanbul ignore else */
    //判断是否是开发环境
    if (__DEV__) {
        //如果不是生产环境则初始化代理
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    //暴露真的实例
    // expose real self
    vm._self = vm
    //初始化组件实例关系属性，比如$parent、$children、$root、$ref、等
    initLifecycle(vm)
    /**
     * 初始化自定义事件，这里需要注意一点，所以我们在 <comp @click="handleClick" /> 上注册的事件，监听者不是父组件，
     * 而是子组件本身，也就是说事件的派发和监听者都是子组件本身，和父组件无关
     */
    initEvents(vm)
    //解析组件中的插槽信息，得到vm.$slot处理渲染函数，得到vm.$createElement方法 h函数
    initRender(vm)
    //调用bedoreCreate函数
    callHook(vm, 'beforeCreate')
    //初始化组件的inject注入配置项，得到result[Key] = 形式对象，然后对结果进行响应式处理，并代理每个Key到VM实例中
    //在data和props属性之前解决inject的数据
    initInjections(vm) // resolve injections before data/props
    //初始化响应式数据，处理props methods data computed watch
    initState(vm)
    //解析组件配置项上的provide对象，将其挂载到VM._provided属性上
    initProvide(vm) // resolve provide after data/props
    //调用周期函数created
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (__DEV__ && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
    //如果配置上有el选项则自动调用$mount选项进行挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

#### resolveConstructorOptions方法详解

* resolveConstructorOptions

/src/core/instance/init.js

从构造函数中解析配置对options

```javascript
export function resolveConstructorOptions(Ctor: typeof Component) {
    //配置项目
  let options = Ctor.options
  if (Ctor.super) {
    //如果存在基类则递归解析基类构造函数的选项
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      //基类的构造函数选项发生改变则需要重新进行设置
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      //检查Ctor.options上是否有任何后期修改/附加的选项
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      //如果存在修改，则合并两个选项
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      //合并选项，将合并的结果赋值给Ctor.options
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}
```

这个函数返回后提供给初始化函数

#### resolveModifiedOptions 配置检查函数

/src/core/instance/init.js

解析构造函数选项中后续被修改或者增加的选项

```javascript
function resolveModifiedOptions(
  Ctor: typeof Component
): Record<string, any> | null {
  let modified
  //构造函数选项
  const latest = Ctor.options
  //密封的构造函数，备份
  const sealed = Ctor.sealedOptions
  //对比配置选项，记录不一致的选项
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
```


#### mergeOptions合并配置选项

/src/core/util/options.js
合并两个选项，出现相同配置时，子选项会覆盖父选项的配置

```javascript
export function mergeOptions(
  parent: Record<string, any>,
  child: Record<string, any>,
  vm?: Component | null
): ComponentOptions {
    //如果是开发环境则检查child是不是组件
    //检查组件名称是否合法
  if (__DEV__) {
    checkComponents(child)
  }
  //如果是函数，则表示是函数组件
  if (isFunction(child)) {
    // @ts-expect-error
    child = child.options
  }

  //标准化props,inject,directive选项，方便后续进行程序的处理
  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  //处理child上的extends mixins 分别执行mergeOptions,并合并到parent
  //mergeOptions处理过的对象会含有_base属性
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
  //遍历父选项
  for (key in parent) {
    mergeField(key)
  }
  //遍历子选项，如果父选项不存在该配置，则合并，否则跳过，因为拥有同一个属性则子会覆盖父属性
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  //合并选项，childval优先级高与parentval
  function mergeField(key: any) {
    const strat = strats[key] || defaultStrat
    //如果childval存在则优先使用否则使用parentval
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

#### 初始化注入配置

/src/core/instance/inject.js

初始化Inject配置项

1. 得到result[key] = val
2. 对数据进行响应式代理，代理每个key到vm实例

```javascript
/*vm就是当前组件的实例
*/
export function initInjections(vm: Component) {
    //解析inject的配置项，然后从祖代配置中找到配置项的每一个key对应的val，得到最后的result[key] = val的结果
  const result = resolveInject(vm.$options.inject, vm)
  //如果存在result则表示存在inject
  //对result做数据响应式处理，也有代理inject配置中的每一个key到vm实例的作用
  //不过建议在子组件中进行数据更改，一代祖代组件中注入的provide发生更改，你在组件中的更改就会被覆盖
  if (result) {

    toggleObserving(false)
    Object.keys(result).forEach(key => {
      /* istanbul ignore else */
      //如果是开发环境则检查是否正确注册inject
      if (__DEV__) {
        defineReactive(vm, key, result[key], () => {
          warn(
            `Avoid mutating an injected value directly since the changes will be ` +
              `overwritten whenever the provided component re-renders. ` +
              `injection being mutated: "${key}"`,
            vm
          )
        })
      } else {
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
  }
}

```

#### resolveInject 解决注入函数

/src/core/instance/inject.ts

解析获取的inject的配置项

```javascript
//从祖代的provide配置中找到key对应的值，否则用默认值，最后得到result[key]=val
/*
inject:{
    key:{
        from:provideKey,
        default:xx
    }
}
*/
export function resolveInject(
  inject: any,
  vm: Component
): Record<string, any> | undefined | null {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    const result = Object.create(null)
    //inject 配置项所有的key
    const keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject)
    //遍历Key
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // #6574 in case the inject object is observed...
      //如果是__ob__属性则跳过
      if (key === '__ob__') continue
      const provideKey = inject[key].from
      //遍历祖代的所有的key找到根组件得到result[key] = val
      if (provideKey in vm._provided) {
        result[key] = vm._provided[provideKey]

        //如果没有找到则使用injcet[key].default
      } else if ('default' in inject[key]) {
        const provideDefault = inject[key].default
        result[key] = isFunction(provideDefault)
          ? provideDefault.call(vm)
          : provideDefault
      } else if (__DEV__) {//如果在开发环境则提示错误信息
        warn(`Injection "${key as string}" not found`, vm)
      }
    }
    return result
  }
}
```

#### inintProvide初始化提供函数

/src/core/instance/inject.ts
初始化provide的值

```javascript
export function initProvide(vm: Component) {
    //解析组件的provide配置
  const provideOption = vm.$options.provide
  /*如果存在则判断是否是函数，是则使用call通过当前实例调用
    如果不是对象则直接返回
  */
  if (provideOption) {
    const provided = isFunction(provideOption)
      ? provideOption.call(vm)
      : provideOption
    if (!isObject(provided)) {
      return
    }

    const keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided)
    setCurrentInstance(vm)
    //通过便利key给provide赋值
    //provide方法是v3中提供的生成provides[key] = val的形式
    for (let i = 0; i < keys.length; i++) {
      provide(keys[i], provided[keys[i]])
    }
    setCurrentInstance()
  }
}
```

#### 初始化总结

* Vue实例初始化 new Vue(options)
* 配置组件配置项，初始化根组件时进行选项合并，将全局配置合并到根组件的局部配置上
* 初始化每个子组件的性能优化，将配置对象上的深层的东西放入vm.$options,提高执行效率
* 初始化组件实例的关系属性$parent、$children、$root、$refs等
* 处理自定义事件，如@click，自定义事件绑定在子组件上和父组件无关
* 调用beforecreate钩子函数
* 初始化inject注入的配置项，得到result[key] = val形式配置对象，然后对该对象进行响应式处理
* 数据响应式处理 data,methods,props,watch,computed等选项
* 解析组件上的provide对象，将其挂在到vm._provided属性上
* 调用created钩子函数
* 如果发现有存在el选项，咋调用$mount方法，有el则不需要手动调用，没有则需要手动调用
* 然后在页面中挂载
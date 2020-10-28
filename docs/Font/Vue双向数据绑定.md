---
title: Vue的双向数据绑定
date: 2019-12-21
tags:
- Vue
---
#### Vue 的双向数据绑定

1.使用 Object.defineProperty()
理解 Vue 的双向数据绑定，Vue 的双向数据绑定是使用 Object.defineProperty()来实现的
defineProperty()接受三个参数 目标对象，属性值,绑定值 该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
使用对象的 get，set 方法
get 查询值
set 接受一个参数，返回一个新的值

```javascript
let obj = {};
Object.defineProperty(obj, "n", {
  value: 22,
  get() {
    return this.n;
  },
  set(newValue) {},
});
```

2.使用代理(是一种设计模式) Proxy,不直接对数据进行操作，而是用中介操作
代理相当于与中介和房东的关系，通过中介，来交换两边的信息 3.使用代理和 Object.defineProperty()实现双向数据绑定
Vue 是使用 Object.defineProperty()对 data 对象进行属性进行绑定和监控的

```javascript
let vm = new Vue({ data: mydata });
```

vm 就是 data 数据的代理，比如对 data.n 进行操作，不直接操作 data.n 而是通过 vm.n 进行操作
这个 new Vue()这一步实现了 3 个重要步骤

1. 会让 vm 成为 mydata 的代理
2. 会对 mydata 所有属性进行监控
3. 然后当属性变化时，就会改变 mydata 的属性值，并重新渲染
4. data 中存在的 bug
    使用 Object.defineProperty()进行数据监听，必须要有一个'n'属性进行监听

    ```javascript
    new Vue({
       data:{
       obj:{
           a:0
       }
       } ,
    template:`<div>{{obj.b}}<button>set b</button></div>`
    methods:{
       setB(){
           this.b = 1
       },
       //第二种就是
        setb(){
       this.obj.b = 1
    }
    }
    }).$mount("#app")
    ```

    在 data 中未定义 b，所以使用时会报错未定义
    ![image.png](https://i.loli.net/2019/12/23/qLuRD9oX65K8z17.png)
    Vue 只会检查第一层属性，当他发先有 obj 就不会再往下在绑定了，
    解决方法
    使用 Vue.set 或者 this.\$set 进行设置新的属性，这个属性设置后直接被绑定的
    1. 新增 key 也就是属性
    2. 自动创建代理和监听
    3. 出发 UI 更新
        this.\$set(this.obj,'b',100),新增了 obj 的 b 属性为 100

Vue 中数组变异方法

```javascript
class vueArrat extends Array {
  push(...args) {
    const oldLength = this.length;
    super.push(...args);
    for (let i = oldLength; i < this.length; i++) {
      Vue.set(this, i, this[i]); //给每一项都进行set绑定属性
    }
  }
}
```

Vue 的视图刷新是异步的，发现有更变后会将会将这个任务放在队列中，继续往下执行

1.Computed 和 watch
Computed 就是计算出一个值的 1.不需要加括号，2.会有依赖缓存
Watch：监听一个属性，如果变化了就执行一个函数，immediate 属性，默认为 false deep：true

#### 计算属性和方法，和侦听属性的区别

  用于处理复杂逻辑的
    计算属性和方法的区别，计算属性是基于它们的响应式依赖进行缓存的，只有依赖发生改变它才会重新求值，不发生改变则返回之前的结果
    调用方法总会执行这个函数，而是用计算属性是依赖缓存，缓存是为了节省性能的

  计算属性和侦听属性
    侦听属性就是watch，观察和响应Vue实例上的数据变动
    计算属性默认只有getter，需要时也可以提供setter

  计算属性在大多数情况下合适，但是有时需要一个自定义的侦听器来响应数据变化，当需要在数据变化时执行异步或开销较大的操作时

  使用vm.$watch()

```javascript
    vm.$watch('a.b.c'，function(new,old){

    })
    vm.$watch(
    function(){}
    )
```

vm.$watch返回一个取消观察函数，用来停止触发回调

deep选项,为了发现对象内部值的变化，需要在选项参数中指定deep：true，监听数组的变动不需要这样做

immediate选项,在选项册数中指定immediate：true将立即以表达式的当前值触发回调在带有immediate选项时，不能在第一次回调时取消侦听给定的property
vm.$watch('a',callback,{immediate:true}),watch:{}

1.在模板内使用了复杂逻辑表达式时，应当使用计算属性

2.方法在每次渲染都会执行，然而计算属性根据依赖进行缓存，依赖改变后才会重新执行

3.在data中数据变动执行异步操作或者开销较大的操作使用watch

#### 接口请求的封装

新建一个api.js文件

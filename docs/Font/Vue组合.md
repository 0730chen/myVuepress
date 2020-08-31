---
title: Vue组合
date: 2019-09-21
tags:
 - Vue
---

#### Vue自定义指令

1.自定义指令是为了减少DOM操作
```javascript
 // 注册一个全局自定义指令 `v-focus`
 Vue.directive('focus', {
   // 当被绑定的元素插入到 DOM 中时……
   inserted: function (el) {
     // 聚焦元素
     el.focus()
     }
  //注册一个局部指令
  directives:{
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
Vue.direction('demo',{
bind:function(el,binding,node){
//根据指令参数判断是什么指令
}
}
```

然后就可以使用 v-focus v-demo
2.Mixin
混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
减少data和created操作

```javascript
//定义一个混入对象
let myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
};

// 定义一个使用混入对象的组件
let Component = Vue.extend({
  mixins: [myMixin]
});

let component = new Component() // => "hello from mixin!"
```
Mixin中的选项合并
data会发生合并，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
```javascript
let mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  created: function () {
    console.log('混入对象的钩子被调用')
  }
};

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  },
  //created: function () {
    //console.log('组件钩子被调用')
  //}
})

```
3.extends
和Mixin类似
```javascript
let  CompA = { ... };

// 在没有调用 `Vue.extend` 时候继承 CompA
let  CompB = {
  extends: CompA,
  ...
}
```

4.provide /inject
   provide提供 provide：Object | () => Object
   inject使用 inject：Array<string> | { [key: string]: string | Symbol | Object }
   这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。
   ```javascript
   let Provider = {
  		provide: {
    	foo: 'bar'
  		},		// ...
	};

	// 子组件注入 'foo'
 let  Child = {
   inject: ['foo'],
  	created () {
    	console.log(this.foo) // => "bar"
  		}
  	// ...
	}
   ```
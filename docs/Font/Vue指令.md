---
title: Vue自定义指令
date: 2019-03-05
---

#### Vue 指令

- 全局自定义指令

```vue
<script>
Vue.directive("x", {
  inserted: function(el) {
    el.addEventListener("click", () => {
      console.log("x");
    });
  },
});
//自定义指令 v-x ，点击时打印x
//template:`<div v-x>x</div>`
</script>
```

- 定义局部指令

```vuejs
const vm = new Vue({
    directives:{
    x:{
        inserted:function(el){
        el.addEventListener('click',()=>{
        console.log(x)
    })
    }
    }
    }
})
template:`<div v-x>x</div>`


```

指令的钩子函数

- bind:只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。

自定义指令简写

```vuejs
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

#### mixins 混合

混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。
使用情景：vue 的 options 选项需要复用时 mixins

- mixins 注册

```javascript
var myMixin = {
  created: function() {
    this.hello();
  },
  methods: {
    hello: function() {
      console.log("hello from mixin!");
    },
  },
};

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin],
});

var component = new Component();
```

mixins 中也有 data,created,mounted 等等参数
mixins 接受一个数组
当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
以组件的数据的优先
data 会进行合并

```javascript
var mixin = {
  data: function() {
    return {
      message: "hello",
      foo: "abc",
    };
  },
};

new Vue({
  mixins: [mixin],
  data: function() {
    return {
      message: "goodbye",
      bar: "def",
    };
  },
  created: function() {
    console.log(this.$data);
    // => { message: "goodbye", foo: "abc", bar: "def" }
  },
});
```

created 都会触发

```javascript
var mixin = {
  created: function() {
    console.log("混入对象的钩子被调用");
  },
};

new Vue({
  mixins: [mixin],
  created: function() {
    console.log("组件钩子被调用");
  },
});

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

```javascript
var mixin = {
  methods: {
    foo: function() {
      console.log("foo");
    },
    conflicting: function() {
      console.log("from mixin");
    },
  },
};

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function() {
      console.log("bar");
    },
    conflicting: function() {
      console.log("from self");
    },
  },
});

vm.foo(); // => "foo"
vm.bar(); // => "bar"
vm.conflicting(); // => "from self"
```

- 全局注册

```javascript
Vue.mixin({
  created: function() {
    var myOption = this.$options.myOption;
    if (myOption) {
      console.log(myOption);
    }
  },
});

new Vue({
  myOption: "hello!",
});
// => "hello!"
```

#### extends

允许声明扩展另一个组件(可以是一个简单的选项对象或构造函数)，而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。
这和 mixins 类似
extends 接受一个对象，可以是多个 mixins

```javascript
var CompA = { ... }

// 在没有调用 `Vue.extend` 时候继承 CompA
var CompB = {
  extends: CompA,
  ...
}
```

#### provide/ inject

这个是两个一起使用

- provide：Object | () => Object
- inject：Array|string | { [key: string]: string | Symbol | Object }

```javascript
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: "bar",
  },
  // ...
};

// 子组件注入 'foo'
var Child = {
  inject: ["foo"],
  created() {
    console.log(this.foo); // => "bar"
  },
  // ...
};
```

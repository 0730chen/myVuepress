---
title:Vue的修饰符
---

#### Vue的修饰符

1. 事件修饰符
	* .stop 阻止事件传播
	* .prevent
	* .capture
	* .self
	* .once
	* .passive
	```html
	<!-- 阻止单击事件继续传播  阻止事件冒泡-->
	<a v-on:click.stop="doThis"></a>
	<!-- 提交事件不再重载页面  阻止事件的默认行为-->
	<form v-on:submit.prevent="onSubmit"></form>
	<!-- 修饰符可以串联 -->
	<a v-on:click.stop.prevent="doThat"></a>
	<!-- 只有修饰符 -->
	<form v-on:submit.prevent></form>
	<!-- 添加事件监听器时使用事件捕获模式 -->
	<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
	<div v-on:click.capture="doThis">...</div>
	<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
	<!-- 即事件不是从内部元素触发的 -->
	<div v-on:click.self="doThat">...</div>
	```
	使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。

2. 按键修饰符
    Vue 允许为 v-on 在监听键盘事件时添加按键修饰符
	* 	.enter
	*	.tab
	*	.delete (捕获“删除”和“退格”键)
	*	.esc
	*	.space
	*	.up
	*	.down
	*	.left
	*	.right
	```html
	<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
	<input v-on:keyup.enter="submit">
	```
3. 表单修饰符
	* lazy
	* number
	* trim
	```html
	<!-- 在“change”时而非“input”时更新 -->
	<input v-moneyModel.lazy="msrecor	dLister 修饰符：-->
	<input v-moneyModel.number="age" moneyModel	List 添加 trim 修饰符：-->
	<input v-moneyModel.trim="msg">
	```
4. v-bind修饰符

	* .sync
	我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。我们通常的做法是
	```html
		//父组件
		<comp :myMessage.sync="bar"></comp>
		<text-document v-bind:title.sync="doc.title"></text-document>
		<text-document v-bind.sync="doc"></text-document> 
		//子组件
		this.$emit('update:myMessage',params);
	``` 
	使用sync的时候，子组件传递的事件名必须为update:value，其中value必须与子组件中props中声明的名称完全一致(如上例中的myMessage，不能使用my-message)
	1. 注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的属性名，类似 v-moneyModel。
	2. 将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title:doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。
	* .prop
	防止污染 HTML 结构,通过自定义属性存储变量，避免暴露数据绑定在props属性上
	```
	<input id="uid" title="title1" value="1" :index.prop="index">
	//input.index === this.index
	//input.attributes.index === undefined
	```
	* .camel
	HTML是不分大小写的
	.camel修饰符，那它就会被渲染为驼峰名。
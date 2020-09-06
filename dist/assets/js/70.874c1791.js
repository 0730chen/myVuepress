(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{551:function(t,s,a){"use strict";a.r(s);var e=a(4),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"不要混淆浏览器和node-js的事件循环"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不要混淆浏览器和node-js的事件循环"}},[t._v("#")]),t._v(" 不要混淆浏览器和Node.js的事件循环")]),t._v(" "),a("p",[t._v("1.不同的事件循环(Node.js)")]),t._v(" "),a("ul",[a("li",[t._v("nodejs的event是基于libuv，而浏览器的event loop则在html5的规范中明确定义。")]),t._v(" "),a("li",[t._v("libuv已经对event loop作出了实现，而html5规范中只是定义了浏览器中event loop的模型，具体实现留给了浏览器厂商")])]),t._v(" "),a("h4",{attrs:{id:"node的事件循环分为6个阶段-每个阶段的作用如下-process-nexttick-在6个阶段的结束的时候都会执行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node的事件循环分为6个阶段-每个阶段的作用如下-process-nexttick-在6个阶段的结束的时候都会执行"}},[t._v("#")]),t._v(" node的事件循环分为6个阶段，每个阶段的作用如下(process.nextTick()在6个阶段的结束的时候都会执行)")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("   ┌───────────────────────┐\n┌─"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("│        timers         │\n│  └──────────┬────────────┘\n│  ┌──────────┴────────────┐\n│  │     I/O callbacks     │\n│  └──────────┬────────────┘\n│  ┌──────────┴────────────┐\n│  │     idle, prepare     │\n│  └──────────┬────────────┘      ┌───────────────┐\n│  ┌──────────┴────────────┐      │   incoming:   │\n│  │         poll          │"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("─────┤  connections, │\n│  └──────────┬────────────┘      │   data, etc.  │\n│  ┌──────────┴────────────┐      └───────────────┘\n│  │        check          │\n│  └──────────┬────────────┘\n│  ┌──────────┴────────────┐\n└──┤    close callbacks    │\n   └───────────────────────┘\n")])])]),a("ul",[a("li",[t._v("timers ：执行setTimeout和setInterval中到期的callback")]),t._v(" "),a("li",[t._v("I/O callbacks：不在 timers 阶段、close callbacks 阶段和 check 阶段这三个阶段执行的回调，都由此阶段负责，这几乎包含了所有回调函数。")]),t._v(" "),a("li",[t._v("idle, prepare：仅内部使用")]),t._v(" "),a("li",[t._v("poll：最为重要的阶段。获取新的 I/O 事件，执行I/O callback，在适当的条件下会阻塞在这个阶段")]),t._v(" "),a("li",[t._v("check：执行setImmediate的callback")]),t._v(" "),a("li",[t._v('close callbacks：执行close事件的callback，例如socket.on("close",func)')])]),t._v(" "),a("p",[t._v("event loop的每一次循环都需要依次经过上述的阶段。  每个阶段都有自己的callback队列，\n先入先出的队列，这个队列存有要执行的回调函数的地址\n每当进入某个阶段，都会从所属的队列中取出callback来执行，当队列为空或者被执行callback的数量达到系统的最大数量时，进入下一阶段。这六个阶段都执行完毕称为一轮循环。")]),t._v(" "),a("h4",{attrs:{id:"timers阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#timers阶段"}},[t._v("#")]),t._v(" Timers阶段")]),t._v(" "),a("ul",[a("li",[t._v("在timer阶段其实使用一个最小堆而不是队列来保存所有元素（其实也可以理解，因为timeout的callback是按照超时时间的顺序来调用的，并不是先进先出的队列逻辑），然后循环取出所有到期的callback执行。")]),t._v(" "),a("li",[t._v("计时器实际上是在指定多久以后可以执行某个回调函数，而不是指定某个函数的确切执行时间。当指定的时间达到后，计时器的回调函数会尽早被执行。如果操作系统很忙，或者 Node.js 正在执行一个耗时的函数，那么计时器的回调函数就会被推迟执行。\n注意，从原理上来说，poll 阶段能控制计时器的回调函数什么时候被执行。")]),t._v(" "),a("li",[t._v("举例来说，你设置了一个计时器在 100 毫秒后执行，然后你的脚本用了 95 毫秒来异步读取了一个文件：")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fs "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fs'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("someAsyncOperation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("callback")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设读取这个文件一共花费 95 毫秒")]),t._v("\n  fs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("readFile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/path/to/file'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" timeoutScheduled "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Date"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" delay "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Date"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" timeoutScheduled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("delay"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("毫秒后执行了 setTimeout 的回调")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行一个耗时 95 毫秒的异步操作")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("someAsyncOperation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" startCallback "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Date"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行一个耗时 10 毫秒的同步操作")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Date"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" startCallback "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 什么也不做")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("当 event loop 进入 poll 阶段，发现 poll 队列为空（因为文件还没读完），event loop 检查了一下最近的计时器，大概还有 100 毫秒时间，于是 event loop 决定这段时间就停在 poll 阶段。在 poll 阶段停了 95 毫秒之后，fs.readFile 操作完成，一个耗时 10 毫秒的回调函数被系统放入 poll 队列，于是 event loop 执行了这个回调函数。执行完毕后，poll 队列为空，于是 event loop 去看了一眼最近的计时器（译注：event loop 发现卧槽，已经超时 95 + 10 - 100 = 5 毫秒了），于是经由 check 阶段、close callbacks 阶段绕回到 timers 阶段，执行 timers 队列里的那个回调函数。这个例子中，100 毫秒的计时器实际上是在 105 毫秒后才执行的。")]),t._v(" "),a("h4",{attrs:{id:"i-o-callback阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#i-o-callback阶段"}},[t._v("#")]),t._v(" I/O callback阶段")]),t._v(" "),a("p",[t._v("callbacks是上轮残留的。这个阶段执行一些系统操作的回调，比如说TCP连接发生错误。")]),t._v(" "),a("h4",{attrs:{id:"idle-prepare"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#idle-prepare"}},[t._v("#")]),t._v(" idle,prepare")]),t._v(" "),a("p",[t._v("系统内部操作的调用")]),t._v(" "),a("h4",{attrs:{id:"poll"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#poll"}},[t._v("#")]),t._v(" poll")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("如果发现计时器的时间到了，就绕回到 timers 阶段执行计时器的回调。")])]),t._v(" "),a("li",[a("p",[t._v("处理poll队列里的事件\nnode中的很多事件都是基于事件订阅完成的，这些API的回调都在poll阶段中完成")])]),t._v(" "),a("li",[a("p",[t._v("当事件循环进入poll阶段")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("poll队列不为空时，事件循环先遍历队列执行回调，直到队列清空或回调函数执行到达上限")])]),t._v(" "),a("li",[a("p",[t._v("poll为空时")]),t._v(" "),a("p",[t._v("2.1 如果代码已经被setImmediate()设定了回调，则进入check阶段，执行check里面的回调")]),t._v(" "),a("p",[t._v("2.2 如果没有设定setImmediate()回调")])])])]),t._v(" "),a("li",[a("p",[t._v("如果有被设定的timers，那么此时事件循环会检查timers，如果有一个或多个timers下限时间已经到达，那么事件循环将绕回timers阶段，并执行timers的有效回调队列。")])]),t._v(" "),a("li",[a("p",[t._v("如果没有设定timers，那么事件循环是在阻塞poll阶段等待回调被加入poll队列")])]),t._v(" "),a("li",[a("p",[t._v("setImmediate()具有最高优先级，只要poll队列为空，代码被setImmediate()，无论是否有timers达到下限时间，setImmediate()的代码都先执行。")])])]),t._v(" "),a("h4",{attrs:{id:"check阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#check阶段"}},[t._v("#")]),t._v(" check阶段")]),t._v(" "),a("p",[t._v("这个阶段允许在poll阶段结束后立即执行回调。如果poll阶段空闲，并且有被setImmediate()设定的回调，那么事件循环直接跳到check执行而不是阻塞在poll阶段等待回调被加入。\nsetImmediate() 实际上是一种特殊的计时器，有自己特有的阶段。")]),t._v(" "),a("h4",{attrs:{id:"close-callbacks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#close-callbacks"}},[t._v("#")]),t._v(" close,callbacks")]),t._v(" "),a("p",[t._v("如果一个socket或handle被突然关掉（比如socket.destroy()），close事件将在这个阶段被触发，否则将通过process.nextTick()触发。")]),t._v(" "),a("h4",{attrs:{id:"process-nexttick-and-promise"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#process-nexttick-and-promise"}},[t._v("#")]),t._v(" process.nextTick() and Promise")]),t._v(" "),a("p",[t._v("他们都会在其所处的事件循环最后，事件循环进入下一个循环的阶段前执行。")]),t._v(" "),a("p",[t._v("2.Javascript的事件循环")]),t._v(" "),a("ul",[a("li",[t._v("首先来给一张图")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://i.loli.net/2020/05/15/k9L5WmXBVJPo7Mp.png",alt:"16dd55ca2fd82de5.png"}})]),t._v(" "),a("h4",{attrs:{id:"任务队列-task-queue-和-microtask-queue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#任务队列-task-queue-和-microtask-queue"}},[t._v("#")]),t._v(" 任务队列(Task Queue 和 Microtask Queue )")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("Task queue 大任务\n常见的有 setTimetout，setInterval，setImmediate ，I/O，用户交互，UI渲染")])]),t._v(" "),a("li",[a("p",[t._v("Microtask queue\n常见的有 promise，Process.nextTick()")])]),t._v(" "),a("li",[a("p",[t._v("事件循环的执行流程")]),t._v(" "),a("p",[t._v("3.1 检查 Microtask 队列是否为空,若不为空，则进行下一步，若为空，则跳到3.3")]),t._v(" "),a("p",[t._v("3.2 从 microtask 队列中取队首(在队列时间最长)的任务进去执行栈中执行(仅仅一个)，执行完后进入下一步")]),t._v(" "),a("p",[t._v("3.3 检查 Microtask 队列是否为空，若不为空，则进入下一步，否则，跳到3.1（开始新的事件循环）")]),t._v(" "),a("p",[t._v("3.4 从 Microtask 队列中取队首(在队列时间最长)的任务进去事件队列执行,执行完后，跳到3.3 其中，在执行代码过程中新增的microtask任务会在当前事件循环周期内执行，而新增的macrotask任务只能等到下一个事件循环才能执行了。")])])]),t._v(" "),a("h4",{attrs:{id:"异步理解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异步理解"}},[t._v("#")]),t._v(" 异步理解")])])}),[],!1,null,null,null);s.default=n.exports}}]);
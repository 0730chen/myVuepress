(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{274:function(e,t,a){"use strict";a.r(t);var s=a(0),l=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h3",{attrs:{id:"不要混淆浏览器和node-js的事件循环"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不要混淆浏览器和node-js的事件循环"}},[e._v("#")]),e._v(" 不要混淆浏览器和Node.js的事件循环")]),e._v(" "),a("p",[e._v("1.不同的事件循环(Node.js)")]),e._v(" "),a("ul",[a("li",[e._v("nodejs的event是基于libuv，而浏览器的event loop则在html5的规范中明确定义。")]),e._v(" "),a("li",[e._v("libuv已经对event loop作出了实现，而html5规范中只是定义了浏览器中event loop的模型，具体实现留给了浏览器厂商")])]),e._v(" "),a("h4",{attrs:{id:"node的事件循环分为6个阶段，每个阶段的作用如下-process-nexttick-在6个阶段的结束的时候都会执行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node的事件循环分为6个阶段，每个阶段的作用如下-process-nexttick-在6个阶段的结束的时候都会执行"}},[e._v("#")]),e._v(" node的事件循环分为6个阶段，每个阶段的作用如下(process.nextTick()在6个阶段的结束的时候都会执行)")]),e._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("   ┌───────────────────────┐\n┌─>│        timers         │\n│  └──────────┬────────────┘\n│  ┌──────────┴────────────┐\n│  │     I/O callbacks     │\n│  └──────────┬────────────┘\n│  ┌──────────┴────────────┐\n│  │     idle, prepare     │\n│  └──────────┬────────────┘      ┌───────────────┐\n│  ┌──────────┴────────────┐      │   incoming:   │\n│  │         poll          │<─────┤  connections, │\n│  └──────────┬────────────┘      │   data, etc.  │\n│  ┌──────────┴────────────┐      └───────────────┘\n│  │        check          │\n│  └──────────┬────────────┘\n│  ┌──────────┴────────────┐\n└──┤    close callbacks    │\n   └───────────────────────┘\n")])])]),a("ul",[a("li",[e._v("timers ：执行setTimeout和setInterval中到期的callback")]),e._v(" "),a("li",[e._v("I/O callbacks：上一轮循环中有少数的I/Ocallback会被延迟到这一轮的这一阶段执行")]),e._v(" "),a("li",[e._v("idle, prepare：仅内部使用")]),e._v(" "),a("li",[e._v("poll：最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段")]),e._v(" "),a("li",[e._v("check：执行setImmediate的callback")]),e._v(" "),a("li",[e._v('close callbacks：执行close事件的callback，例如socket.on("close",func)')])]),e._v(" "),a("p",[e._v("event loop的每一次循环都需要依次经过上述的阶段。  每个阶段都有自己的callback队列，每当进入某个阶段，都会从所属的队列中取出callback来执行，当队列为空或者被执行callback的数量达到系统的最大数量时，进入下一阶段。这六个阶段都执行完毕称为一轮循环。")]),e._v(" "),a("h4",{attrs:{id:"timers阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#timers阶段"}},[e._v("#")]),e._v(" Timers阶段")]),e._v(" "),a("p",[e._v("在timer阶段其实使用一个最小堆而不是队列来保存所有元素（其实也可以理解，因为timeout的callback是按照超时时间的顺序来调用的，并不是先进先出的队列逻辑），然后循环取出所有到期的callback执行。")]),e._v(" "),a("h4",{attrs:{id:"i-o-callback阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#i-o-callback阶段"}},[e._v("#")]),e._v(" I/O callback阶段")]),e._v(" "),a("p",[e._v("callbacks是上轮残留的。这个阶段执行一些系统操作的回调，比如说TCP连接发生错误。")]),e._v(" "),a("h4",{attrs:{id:"idle-prepare"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#idle-prepare"}},[e._v("#")]),e._v(" idle,prepare")]),e._v(" "),a("p",[e._v("系统内部操作的调用")]),e._v(" "),a("h4",{attrs:{id:"poll"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#poll"}},[e._v("#")]),e._v(" poll")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("执行已经过期的timers回调")])]),e._v(" "),a("li",[a("p",[e._v("处理poll队列里的事件\nnode中的很多事件都是基于事件订阅完成的，这些API的回调都在poll阶段中完成")])]),e._v(" "),a("li",[a("p",[e._v("当事件循环进入poll阶段")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("poll队列不为空时，事件循环先遍历队列执行回调，直到队列清空或回调函数执行到达上限")])]),e._v(" "),a("li",[a("p",[e._v("poll不为空时")]),e._v(" "),a("p",[e._v("2.1 如果代码已经被setImmediate()设定了回调，则进入check阶段，执行check里面的回调")]),e._v(" "),a("p",[e._v("2.2 如果没有设定setImmediate()回调")]),e._v(" "),a("pre",[a("code",[e._v("* 如果有被设定的timers，那么此时事件循环会检查timers，如果有一个或多个timers下限时间已经到达，那么事件循环将绕回timers阶段，并执行timers的有效回调队列。\n* 如果没有设定timers，那么事件循环是在阻塞poll阶段等待回调被加入poll队列\n")])])])])]),e._v(" "),a("li",[a("p",[e._v("setImmediate()具有最高优先级，只要poll队列为空，代码被setImmediate()，无论是否有timers达到下限时间，setImmediate()的代码都先执行。")])])]),e._v(" "),a("h4",{attrs:{id:"check阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#check阶段"}},[e._v("#")]),e._v(" check阶段")]),e._v(" "),a("p",[e._v("这个阶段允许在poll阶段结束后立即执行回调。如果poll阶段空闲，并且有被setImmediate()设定的回调，那么事件循环直接跳到check执行而不是阻塞在poll阶段等待回调被加入。")]),e._v(" "),a("h4",{attrs:{id:"close-callbacks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#close-callbacks"}},[e._v("#")]),e._v(" close,callbacks")]),e._v(" "),a("p",[e._v("如果一个socket或handle被突然关掉（比如socket.destroy()），close事件将在这个阶段被触发，否则将通过process.nextTick()触发。")]),e._v(" "),a("h4",{attrs:{id:"process-nexttick-and-promise"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#process-nexttick-and-promise"}},[e._v("#")]),e._v(" process.nextTick() and Promise")]),e._v(" "),a("p",[e._v("他们都会在其所处的事件循环最后，事件循环进入下一个循环的阶段前执行。")]),e._v(" "),a("p",[e._v("2.Javascript的事件循环")]),e._v(" "),a("ul",[a("li",[e._v("首先来给一张图")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://i.loli.net/2020/05/15/k9L5WmXBVJPo7Mp.png",alt:"16dd55ca2fd82de5.png"}})]),e._v(" "),a("h4",{attrs:{id:"任务队列-task-queue-和-microtask-queue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#任务队列-task-queue-和-microtask-queue"}},[e._v("#")]),e._v(" 任务队列(Task Queue 和 Microtask Queue )")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Task queue 大任务\n常见的有 setTimetout，setInterval，setImmediate ，I/O，用户交互，UI渲染")])]),e._v(" "),a("li",[a("p",[e._v("Microtask queue\n常见的有 promise，Process.nextTick()")])]),e._v(" "),a("li",[a("p",[e._v("事件循环的执行流程")]),e._v(" "),a("p",[e._v("3.1 检查 Microtask 队列是否为空,若不为空，则进行下一步，若为空，则跳到3.3")]),e._v(" "),a("p",[e._v("3.2 从 microtask 队列中取队首(在队列时间最长)的任务进去执行栈中执行(仅仅一个)，执行完后进入下一步")]),e._v(" "),a("p",[e._v("3.3 检查 Microtask 队列是否为空，若不为空，则进入下一步，否则，跳到3.1（开始新的事件循环）")]),e._v(" "),a("p",[e._v("3.4 从 Microtask 队列中取队首(在队列时间最长)的任务进去事件队列执行,执行完后，跳到3.3 其中，在执行代码过程中新增的microtask任务会在当前事件循环周期内执行，而新增的macrotask任务只能等到下一个事件循环才能执行了。")])])])])}),[],!1,null,null,null);t.default=l.exports}}]);
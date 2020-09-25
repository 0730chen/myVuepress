---
title: Node异步控制
date: 2020-02-21
tags:
  - 异步
---

#### eventproxy 控制并发

* 使用superagent和cheerio获取了多个网页的地址,然后我们要对这些网址内容进行获取，最后对最终的结果进行处理

```javascript

var ep = new eventproxy();
ep.all("链接1", "链接2", "链接3", function(data1, data2, data3) {
  var html = fuck(data1, data2, data3);
  render(html);
});

$.get("http://data1_source", function(data) {
  ep.emit("data1_event", data);
});

$.get("http://data2_source", function(data) {
  ep.emit("data2_event", data);
});

$.get("http://data3_source", function(data) {
  ep.emit("data3_event", data);
});
```

使用 eventproxy()控制并发请求 ep.all() ep.emit("链接 1")监听事件

#### async 控制并发

* 使用async控制并发请求 mapLimit(arr,limit,迭代，回调)

```javascript

sync.mapLimit(urls, 5, function (url, callback) {
fetchUrl(url, callback);//这里是发送请求的地方 FetchUrl 请求数据函数
}, function (err, result) {
console.log('final:');
console.log(result);
});

```

#### async的异步控制

asyncawait解决了Node.js JavaScript代码中的回调地狱问题。受C＃的async / await功能的启发，asyncawait您可以编写似乎在每个异步操作时阻塞的函数，等待结果，然后继续执行以下语句。例如，您可以用纯JavaScript编写以下代码：

```javascript
//async 代码
var  foo  =  async  （function （） {
    var  resultA  =  await  （firstAsyncCall （））;
    var  resultB  =  await  （secondAsyncCallUsing （resultA ））;
    var  resultC  =  await  （thirdAsyncCallUsing （resultB ））;
    return  doSomethingWith （resultC ）;
} ）;

//回调代码

function foo2(callback) {
    firstAsyncCall(function (err, resultA) {
        if (err) { callback(err); return; }
        secondAsyncCallUsing(resultA, function (err, resultB) {
            if (err) { callback(err); return; }
            thirdAsyncCallUsing(resultB, function (err, resultC) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, doSomethingWith(resultC));
                }
            });

        });
    });
}
```

#### async的运作方式

* co,asyncawait,async和await可以挂载正在运行的函数而不会阻塞Node的事件循环,这两个库都是基于协程构建,co使用ES6生成器，该生成器可在Node> = v0.11.2（带有--harmony标志）中工作,

* asyncawatit用于node-fibers，它可以与普通的es3/es5一起使用

* 可以创建异步迭代器

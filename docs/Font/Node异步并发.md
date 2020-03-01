---
title: Node异步控制
---

#### eventproxy控制并发
    * 使用superagent和cheerio获取了多个网页的地址,然后我们要对这些网址内容进行获取，最后对最终的结果进行处理
   ```javascript
var ep = new eventproxy();
ep.all('链接1', '链接2', '链接3', function (data1, data2, data3) {
  var html = fuck(data1, data2, data3);
  render(html);
});

$.get('http://data1_source', function (data) {
  ep.emit('data1_event', data);
  });

$.get('http://data2_source', function (data) {
  ep.emit('data2_event', data);
  });

$.get('http://data3_source', function (data) {
  ep.emit('data3_event', data);
  })
```
使用eventproxy()控制并发请求 ep.all() ep.emit("链接1")监听事件 

#### async控制并发
     * 使用async控制并发请求 mapLimit(arr,limit,迭代，回调)   
     
   ```javascripta
sync.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);//这里是发送请求的地方 FetchUrl 请求数据函数
}, function (err, result) {
  console.log('final:');
  console.log(result);
});
```
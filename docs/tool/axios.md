---
title: axios的基本用法
data: 2019-10-30
tags: 
  - ajax 
  - axios 
  - API
categories: 
  - ajax
---
### Axios

#### ajax用来发起网络请求

1. ajax请求一般都伴随着异步(异步就是不能直接在当时拿到结果)
2. 现在使用axios来发起axios请求(主流)
3. 使用方式

```javascript
//使用CDN引入
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
//npm下载
npm install axios
```

#### 发起请求

```javascript
1. get接受url参数，url是你请求的路径，可以直接携带参数，也可以get('url',{params:{}})接受一个对象，对象有一个params属性，属性里面有你要携带的参数
.then()方法，接受一个回调函数当请求请求成功后执行
.catch()方法，接受一个回调函数当请求出错时执行
//发起请求get

axios.get('/url?id=123').then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
axios.get('/url',{params:{id:123}})
```

#### post

```javascript
//发起post请求
//post请求需要携带参数  
//参数已对象形式传递post中
.then()
.catch()
//都是和get一样的用法
axios.post('/url',{first:'name',last:'hello'}).then().catch()
```

##### 执行多个并发请求

```javascript
//使用axios.all(fn1,fn2)
//接受两个请求函数，
.then()//当两个请求都完成后，执行then()
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}


axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

##### 使用技巧

```javascript
//可以使用对象配置好axios请求参数，
axios({method:'get',url:'/..ss',params:{id:123}})
axios({method})
axios()//默认发送的是get请求
```

#### axios创建实例

```javascript
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
//创建的实例拥有实例方法
instance()//默认使用get请求baseurl
```

#### 拦截器

```javascript
//拦截器就是在请求或者响应被then，catch之前拦截他们
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  //在稍后移除拦截器
  var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
  axios.interceptors.request.eject(myInterceptor);

```

#### axios比Promise的优势之处

1. promise在创建执行后就不能停止，必须要执行完毕才能停止
axios可以使用API停止请求,给携带一个token来停止当前请求，然后在请求时带上这个参数进行请求

```javascript
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');


//还可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：
var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
```

#### Axios添加headers

第一个参数是请求路径，第二个参数是传递的数据，第三个参数是一些配置方式，可以添加headers

```javascript
axios.get('url',data,{
  headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
  }
})
```

#### axios下载文件

需要设置响应内容为blob格式

```shell
npm install --save js-file-download
```

安装下载文件插件

##### 请求参数

* axios.get(url,{config})
* axios.delete(url,{config})
* axios.post(url,data,config)
* axios.put(url,data,config)

```javascript
this.$axios.get(`/corpus/admin/text/annotation?textId=${id}`,{responseType:'blob'}).then(response => {
    // 获取文件名
    let t = new RegExp("filename=(.*)","g").exec(response.headers['content-disposition'])[1];
    let filename=decodeURIComponent(t)
    // 下载
    fileDownload(response.data,filename)
})
```

#### 请求参数形式

* queryString Params 参数序列化，一般GET请求以这种形式传递参数,请求参数以
birthday=1997-07-15&gender=1& key=value&key=value形式展示

```javascript
axios.get('url',data)
```

* FormData形式传参，一般在post和put方法传参,表单形式

```javascript
axios.post('url',{data},{header:{'content-type':'application/x-www-form-urlencoded'}})
```

* 封装一个转换方法

```javascript

let obj = {
  name:'ffff',
  age:12,
  weight:13
}

//key=value&ke=value
let queryString = (params)=>{

  let str = ''

  for (const [key, value] of Object.entries(params)) {
    str += `$${key}=${value}`
  }
  return str
}

console.log(queryString(obj))
```
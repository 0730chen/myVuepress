---
title: 服务端渲染SSR
date: 2020-5-15
tags: 
- SSR
- 服务端
categories:
- 服务端
---
#### 我们为什么需要服务端渲染

1. 首屏等待
  
    在SPA模式下，所有的数据请求和DOM渲染都在客户端完成，当第一次访问时，会可能出现较长时间的白屏等待，而服务端渲染会将数据请求和html内容生成后处理完成后返回，浏览器可以更快的看到渲染内容，而且服务端处理效率高于客户端
2. SEO
  
    SPA模式对搜索引擎不够友好，你的页面只有一个html，数据时在请求后才拿到的

#### SPA+SSR

  第一次访问页面是服务端渲染，基于第一次访问后续的交互就是 SPA 的效果和体验，还不影响SEO 效果，这就有点完美了。

#### 服务端渲染理解

  node server拿到客户端请求后，根据当前的request url path，然后在路由表内查找对应的组件，拿到需要请求的数据，将数据作为props，context传入组件，然后将组件转换成html字符串，将html返回给客户端。客户端对html数据进行渲染

#### 使用ejs模板和node server原生创建服务器

1. 安装ejs

```shell
npm install ejs --dev
```

2. 使用ejs和创建服务

```javascript
const http = require('http')
const ejs = require('ejs')
const title = require('./templete/index.ejs')
const path = require('path')
http.createServer((req,res)=>{
  if(req.url ==='/'){
    res.writeHead(200,{'Content-type':'text/html'})
    console.log('ssr')
    ejs.renderFile(path.join(__dirname,'index.ejs'),{
      title:'ssr',
      data:'首页',
      username:'李磊'
    },
    (err,data)=>{
      if(err){
        console.log(err)
      }else{
        console.log(data)
        res.end(data)
      }
    }
    )
  }
}).listen(3000)
```

* ejs注意事项
  ejs.renderFile()函数在使用时如果使用相对路径，则会出现找不到文件
  
  解决方法

  ```javascript
  ejs.renderFile(path.join(__dirname,'index.js'),data,(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.end(data)
    }
  })
  ```

  原因是，EJS将查找相对于的文件，该文件process.cwd()是启动Node.js进程的目录。__dirname是JS文件所在的目录。如果您不想加入__dirname，则需要相对于Node.js进程的开始位置进行设置。

#### 服务端和客户端的同构

* 路由同构
  
  双端维护一份路由表

  ```javascript
  //router.js
  const routes=[
    {
      path:'/',
      name:'HomePage',
      component:Home,
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    }
  ]
  export default routes
  ...
  ```

  * 数据同构

  在查找到要渲染的组件后，需要预先得到此组件所需要的数据，然后将数据传递给组件后，再进行组件的渲染。我们可以通过给组件定义静态方法来处理，得到组件后，进行数据获取，数据获取完成后，进行组件渲染，将组件渲染成为html字符串,客户端和服务端的数据需要同步，在Vue中使用vuex进行数据储存，状态管理

  * 渲染同构，将服务端和客户端的props,Dom结构，同步渲染
  * 我们在路由组件上暴露一个自定义函数asyncData,这里在组件实例化之前调用，所以这里无法使用this

  ```javascript
  //调用store中的数据
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  }
  ```

  * 服务端的数据预取

    可以通过router.getMatchedComponents()：返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。通常在服务端渲染的数据预加载时使用
    官方例子
  
    ```javascript
      import { createApp } from './app'

      export default context => {
        return new Promise((resolve, reject) => {
          const { app, router, store } = createApp()

        router.push(context.url)

        router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
            resolve(app)
          }).catch(reject)
        }, reject)
      })
    }
    ```
  
    * 在服务端中使用window.INITAL_STATE_
  * 动态路由的SSR
    1. 使用import语法实现组件懒加载
  * ssr 模式下 server 端如何处理路由按需加载
  
  对路由配置进行二次处理。server 端在进行组件查找前，强制执行 import 方法，得到一个全新的静态路由表，再去进行组件的查找。

#### 基于vue的SSR指南学习

  1. 基本用法,按照Vue服务端渲染插件

```shell

  npm install vue-server-renderer --save
```

2. 创建一个Vue实例并结合node搭建服务器返回Vue实例

    ```javascript
    const http = require('http')
    const Vue = require('vue')
    const app = new Vue({
      template:`<div>hello world</div>`
  
  })
  const renderer  =require('vue-server-renderer').createRenderer()
  renderer.renderToString(app,(err,html)=>{
      if(err) throw err
      console.log(html)
        })

  renderer.renderToString(app).then(html=>{
      console.log(html)
          }).catch(err=>{
      console.error(err)
      })

  http.createServer((req,res)=>{
      if(req.url ==='/'){
        res.writeHead(200,{'Content-type':'text/html'})
        console.log('ssr')
        renderer.renderToString(app,(err,html)=>{
            if(err){
            res.statusCode(500).end('error')
            return
          }
          res.end(html)
        })
      }).listen(3000)
    ```
    3. 避免状态单例

  当编写纯客户端 (client-only) 代码时，我们习惯于每次在新的上下文中对代码进行取值。但是，Node.js 服务器是一个长期运行的进程。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享。每个请求应该都是全新的、独立的应用程序实例，以便不会有交叉请求造成的状态污染 (cross-request state pollution)。，所以我们需要在服务端每一个请求后，都要新创建一个实例

* 一个工厂函数

```javascript
    //也可以在其中使用router和store实例
    const Vue = require('vue')
    module.exports = function createApp (context) {
     return new Vue({
       data: {
      url: context.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
      })
}
```

同样的规则也适用于 router、store 和 event bus 实例。你不应该直接从模块导出并将其导入到应用程序中，而是需要在 createApp 中创建一个新的实例，并从根 Vue 实例注入。

* 服务端获取数据
通过使用route.getMatchComponent获取与当前路径相匹配的组件，如果组件中存在获取数据的方法则直接调用
* 客户端渲染数据获取模式
第一种：在路由导航之前解析所有数据。使用此策略，应用程序会等待视图所需数据全部解析之后，再传入数据并处理当前视图。好处在于，可以直接在数据准备就绪时，传入视图渲染完整内容，但是如果数据预取需要很长时间，用户在当前视图会感受到。因此，如果使用此策略，建议提供一个数据加载指示器,
添加一个路由钩子router.onReady()该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。

```javascript
      router.onReady(()=>{
        // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
        router.beforeResolve((to,form,next)=>{})
      })
```

第二种:匹配要渲染的试图后，在获取数据，此策略将客户端数据预取逻辑，放在视图组件的 beforeMount 函数中。当路由导航被触发时，可以立即切换视图，因此应用程序具有更快的响应速度。然而，传入视图在渲染时不会有完整的可用数据。因此，对于使用此策略的每个视图组件，都需要具有条件加载状态。

```javascript
      Vue.mixin({
        beforeMount () {
        const { asyncData } = this.$options
        if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
                })
              }
           }
      })
```

  当组件重用时，都需要调用asyncData获取数据

#### 使用webpack配置

这个可以查看官方文档进行配置

* css目前是使用在vue文件中直接引用，或者就是配置webpack-loader（vue-loader）

* head管理

```javascript
        // title-mixin.js

    function getTitle (vm) {
  // 组件可以提供一个 `title` 选项
  // 此选项可以是一个字符串或函数
  const { title } = vm.$options
  if (title) {
      return typeof title === 'function'
          ? title.call(vm)
          : title
        }
   }

  const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = title
        }
      }
  }

  const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = title
        }
      }
  }

// 可以通过 `webpack.DefinePlugin` 注入 `VUE_ENV`
  export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
```

使用renderer.renderToStream()代替rendererString()

#### express，vue，webpack实现服务端渲染简单demo

* 需要通过webpack对客户端（client）和服务端 server代码进行打包，对生成的json/js文件，使用vue-server-renderer的createBundleRenderer使用打包后的服务端和客户端文件，就可以实现服务端渲染
* 项目的目录结构

```shell
    ├── build
    │   ├── webpack.base.config.js     # 基本配置文件
    │   ├── webpack.client.config.js   # 客户端配置文件
    │   ├── webpack.server.config.js   # 服务端配置文件
    └── src
    ├── router
    │    └── index.js              # 路由
    └── views
    │    ├── comp1.vue             # 组件
    │    └── copm2.vue             # 组件
    ├── App.vue                    # 顶级 vue 组件
    ├── app.js                     # app 入口文件
    ├──  client-entry.js           # client 的入口文件
    ├──  index.template.html       # html 模板
    ├──  server-entry.js           # server 的入口文件
    ├──  server.js           # server 服务

```

具体Demo可以查看链接[服务端渲染](https://github.com/0730chen/vueSSR-demo)

#### 注意事项

* 在node 模块中无法使用export default import 导入导出，需要配置.babelrc文件

```javascript
  {
  "presets": ["@babel/preset-env"],
  "plugins": [
    "syntax-dynamic-import"
    ]
  }
```

* 在使用webpack时，需要配置基础文件，服务端打包文件，客户端打包文件，打包的入口文件不同，打包方式也不同

#### SSR渲染模型

  ![161f3e369a32ba11.png](https://i.loli.net/2020/05/21/NPblqF8Y3XzivMk.png)
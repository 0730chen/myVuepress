---
title: React
date: 2019-12-23
tags: -React
---

#### React 框架

1.React.js
是一个帮你构建页面的 UI 库，相当于 MVC 中的 view 层，它将页面分割成一个个组件，极大的方便了我们构建页面，以及时间的组件可以复用在其他应用中

2.开始安装使用 React.js 框架

```javascript
npm install -g create-react-app//安装创建create-react-app开始命令
create-react-app xxxx//xxx是项目名
npm config set `https://registry.npm.taobao.org` //设置npm镜像源
cd xxx
npm start //开始项目
```

3.React.js 框架的目录结构

- src 目录中储存了定义的各种组件，一般将 index.ts 作为父组件
- public 目录中存放着静态文件，我们不用修改，其中的 index.html 中有一个标签
- <div id= "root"></div>是存放所有组件的地方

  4.组件

- 在 React.js 中每一个页面内容都是一个组件
- 组件存放中 src 中

```javascript
//React.js定义的组件必须引入的库
import React from "react";
import ReactDOM from "react-dom";
import home; //引入css
//组件语法与ES6中的class相似 类的定义
class Click extends React.Component {
 //定义一个仓库储存将要使用数据和状态，像Vuex中的state仓库
  constructor(props) {
    super(props);
    this.state = {
      data: ''，
    };
  }
render(){
//在return中返回HTML标签 这种语法叫做JSX语法
//组件引用和VUe相似  <click/>需要加上/
return (
<div>哈哈</div>
<click/>
)
}
}



ReactDOM.render(
	<Click />,
document.getElementById("root") //选取了index.html中的root标签

);
export default Click //这个组件暴露出  export default和import  是esmodule标准
```

5.自定义组件

```javascript
//引入库和
import React from "react";
import ReactDOM from "react-dom";
import "./message.css";
import './Click'

class Message extends React.Component{
 constructor(props){
  super(props)
 }
 this.state = {

 }
 render(){
  //引入组件和Click
  return (
   <div></div>
   <Click/>
  )
 }
}

```

#### React 传值

    父传子，通过props属性传递，在引用子组件的位置地方，使用props传递值，子组件可以通过this.props获取到这个值
    子传父，通过props传递一个函数，子组件调用这个函数，将传递的值通过参数传递，通过函数传递值

---

title: React入门
data: 2019-11-5
tag: React 路由使用

---

#### 安装路由 react-router-dom

1.  使用 npm install react-router-dom --save 在本项目安装使用 react 路由

2.  在组件中引入路由

```javascript
//在页面中直接引用react-router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
BrowserRouter as Router //这个意思使用 Router代替BrowserRouter
Router 相当于 BrowserRouter

Switch 是渲染组件的容器(也相当于是一个组件) 在匹配访问的路径后渲染一个组件
Route 是路由容器，每一个路由都需要使用Route包裹起来
Link 相当于Vue中Route-link
```

#### 实践操作

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from
//定义一个Router组件
//1.组件外部需要有一个<div>标签，和Vue相似
//2.Router组件在一个路由组件中使用一次就可以了
//3.建立路由
//4.引导路由使用标签包裹 Link 属性 to ="你的路径" '/question1'
//5. link就是相当于一个a标签
//6.使用 Switch匹配组件
class TitleBar extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
			<Router>
			<nav>
			<ul>
			<li><Link to="/question1">问题一</Link></li>
			<li><Link to="/question2">问题二</Link></li>
			<li><Link to="/question3">问题三</Link></li>
			</ul>
			</nav>
			<Switch>
			<Route path="/question1"><Question1/></Route>
			<Route path="/Question2"><Question2/></Route>
			<Route path="/Question3"><Question3/></Route>
			</Switch>
			</Router>
			</div>
		)
	}
}

//构建3个组件
class Question1 extends React.Compoent{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div><div>问题一组件</div></div>
		)
	}
}
class Question2 extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
			<div>问题二组件</div>
			</div>
		)
		}
}
class Question3 extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		<div>
		<div>问题三组件</div>
		</div>
	}
}

ReactDOM.render(
	<TitleBar/>,
	document.getElementById('app')
)
export default TitleBar

```


#### 路由组件搭建完成后运行 npm start
	* 点击问题一时，下方显示问题一组件，
	* 点击问题二时，下方显示问题二组件
	* 点击问题三时，下方显示问题三组件
在其他需要路由导航的组件中可以直接使用import xxx from 'TitleBar'导入这个组件

#### 组件化有效的节省的代码的重复书写，提高代码的复用率

#### 路由跳转
    * 打印this.props 发现有一个history属性
    * 可以使用this.props.push('路径来跳转')
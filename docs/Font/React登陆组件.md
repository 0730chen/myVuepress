---
title: React实现一个登陆注册组件
date: 2019-11-13
tags:
  - React
  - 路由跳转
---

##### 登陆注册组件

1. 首先建立一个根组件

```javascript
//引入项目所需要的库
import React from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

//定义一个根组件
class App extends React.Component {
  constrctor(props) {
    super(props);
    this.state = {};
  }
  //建立路由
  //1.首页就是一个登陆组件和一个其他组件的父组件
  //Switch只会匹配第一个组件
  render() {
    return (
      <div>
        <Router>
          <ul>
            <li>
              <Link to="/"></Link>
            </li>
            <li>
              <Link to="/hot"></Link>
            </li>
          </ul>
          <Switch>
            <Router path="/" exact>
              <Form />
            </Router>
            <Router path="/hot" exact>
              <hot />
            </Router>
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
```

###### 建立 From 组件

```javascript
//
import React from "react";
import ReactDom from "react-dom";

class FromLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //建立一个事件绑定函数获取输入的

  handleSubmit = (e) => {
    e.preventDefault();
    //可以从e中拿到输入的名字和密码
    const { getFieldDecorator } = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //values就是一个对象
        axios.post("api/login", values).then((res) => {
          console.log(res);
          if (res.data === "ok") {
            //当请求成功后路径变为/hot
            //Switch会渲染组件hot
            window.location = "/hot";
          }
        });
      }
    });
  };
  render() {
    return (
      <div classNmae="login">
        <form onSubmit={this.handleSubmit}>
          <input type="count" value=""></input>
          <input type="password"></input>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}
```

##### hot 组件

1. hot 组件是剩余组件的父组件

```javascript
import React from "react";
import ReactDom from "react-dom";

class FromLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {/*可以在内部添加其他组件*/}
        剩余组件的父组件
      </div>
    );
  }
}
```

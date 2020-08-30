---
title: React组件
date: 2020-01-23
tags:
  - React
---

#### React 组件

1. React 元素和 React 组件

```javascript
const div = React.createElement('div',...) //这是React元素
const Div = ()=> React.createElement('div') //这是一个组件
```

返回一个 React 元素的函数就是组件

#### 两种定义组件方式

{}花括号内就是 JS 表达式

- 函数组件
  没有 this

```javascript
function Welcome(props) {
  //setN不会改变n的值
  const [n, setN] = React.useState(0); //设置初始值
  const [m, setM] = React.useState(1);
  return <div>hello ,{props.name}</div>;
}
<Welcome name="haha" />;
//函数的setState不会自动合并
//不推荐使用setState
//如果使用setState(...state,{n:n+1})
```

- 类组件

```javascript
class Welcome extends React.Component {
  //state相当于data
  constructor() {
    super();
    this.state = {
      n: 0,
      m: 0,
      user: {},
    };
  }
  add() {
    this.setState((state) => {
      state.n += 1;
      return { n };
    });
  }
  render() {
    //获取外部数据
    retrun(<h1>Hello{this.props.name}</h1>);
  }
}
<Welcome name="haha" />;
//setState()会沿用之前的值
```

#### React 中的 This

```javascript
//推荐
<button onClick={()=>{this.addN()}}>+1</button>
//会使this变成window this.addN
<button onClick={this.addN}>n+1</button>
//绑定this
<button onClick={this.addN.bind(this)}>n+1</button>
//this._addN = ()=>{this.addN()}
<button onClick={this._addN}>n+1</button>

//写法
constructor(){
	this.addN = ()=>{this.setState((setate)=>{return {n}})}
}
//写法
addN = ()=>{this.setState({state=>{}})}
直接使用this.addN
```

#### React 中事件绑定

```javascript
class Son extends React.Component {
  addN = () => {
    this.setState({ n: 0 });
  };
  constructor() {
    super();
    this.addN = () => {
      this.setState({});
    };
  }
  addN() {
    this.setState({}); //这两个的区别
  }

  render() {
    return <button onClick={this.addN}>n+1</button>;
  }
}
```

#### 箭头函数的 addN 和函数的 addN 区别

```javascript
addN =()=>{}

addN:function(){}
addN(){}
```

箭头函数是对象的本身属性，每一个组件都有自己本身的 addN，
后两个 this 会指向 window，这个在原型上，共用一个 addN

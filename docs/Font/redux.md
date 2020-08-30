---
title: Redux使用
date: 2020-01-20
tags:
  - Redux
---

#### 使用 Redux

不需要使用的情况

- 用户的使用方式非常简单
- 用户之间没有协作
- 不需要与服务器大量交互，没有 websocket
- 视图层只从单一来源获取数据
  相反需要使用 redux 情况
- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式
- 多个用户之间可以协作
- 与服务器大量交互，使用 webscoket
- 视图层要从多个来源获取数据

##### 安装 redux

```javascript
npm i --save redux
npm install --save react-redux
npm install --save-dev redux-devtools
```

##### 使用

- 新建一个 redux 文件夹，新建一个 index.js 文件
  react 应用中所有的 state 都以对象树的形式储存在 store 中，只能通过 action 去改变 state 中的状态，为了描述 action 如何去改变 state，则需要 reducer 函数

```javascript
import { createStore } from "redux";
//引入创建函数
//reducer函数，就是描述action如何转变state状态
function counter(state = {}, action) {
  switch (action.type) {
    case "":
      return;
    case "":
      return;
    default:
      return state;
  }
}

//使用reducer创建store
let store = createStore(counter);
//store有API｛subscribe,dispatch,getState｝
store.subscribe(() => {
  //监听State状态的改变，有改变了就会触发这个函数
  console.log(store.getState());
});
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
const action = {
  type: "ADD_TODO",
  payload: "Learn Redux",
};
//reducer就是action
```

Store 收到 Action 以后必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
Reducer 是一个函数它接受 Action 和当前 State 作为参数返回一个新的 State

```javascript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD":
      return state + action.payload;
    default:
      return state;
  }
};

const state = reducer(1, {
  type: "ADD",
  payload: 2,
});
```

#### API

使用 createStore 和 reducer 函数创建的 store 实例提供了 3 个 API
store.subscribe(()=>{})，当 state 发生变化后就会触发，执行里面的函数
store.getState()获取当前的 state 状态
store.dispatch()用来触发 action，接收一个 action 对象为参数
可以使用一个函数，来创建 action，actions 是一个对象

```javascript
function Actions(text) {
  return {
    type: "Add",
    text,
  };
}
store.dispatch(Actions("hahaha"));
```

#### 为什么叫做 reducer

因为它可以作为数组的 reduce 方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。

```javascript
const actions = [
  { type: "ADD", payload: 0 },
  { type: "ADD", payload: 1 },
  { type: "ADD", payload: 2 },
];

const total = actions.reduce(reducer, 0);
```

####注意事项(合并多个 reducer)
redux 中只有一个 store，随着应用越来越复杂，可以考虑将 reducer 拆分成多个单独的函数，每个函数分别管理 state
combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。

```javascript
import { combineReducers } from "redux";
function todos(state = [], action) {
  switch (action.type) {
    case "Add_Todo":
      return state.concat([action.text]);
    default:
      return state;
  }
}
function counter(state = [], action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
}
export default combineReducers({
  todos,
  counter,
});
```

使用

```javascript
import {createStore} from 'redux'
import reducer from home
let store = createStore(reducer)
```

将所有的 reducer 函数最终合并成一个 reducer，使用 createStore(reducer)创建 store

#### redux 的流程

![图层 1.png](https://i.loli.net/2020/01/06/ngxZeC9SQ8ViGFr.png)
用户发起 action store.dispatch(action)
Store 自动调用 Reducer，并且返回最新的 State 状态
当 State 状态发送变化，Store.subscribe(()=>{})中的函数就会触发
可以使用 store.getState()获取当前的状态

#### 例子

```javascript
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "sub":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: "add" })}
      onDecrement={() => store.dispatch({ type: "sub" })}
    />,
    document.getElementById("root")
  );
};

render();
store.subscribe(render); //监控state的变化，state变化了就重新渲染
```

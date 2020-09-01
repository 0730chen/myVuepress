---
title: ReactHooks使用
date: 2020-04-25
tags:
- React
---

#### 更简洁的React语法

hooks（钩子）,是一种特殊函数，可以让你钩入React中

##### useState钩子

定义一个变量和修改这个变量的方法

useState(initState)，initState可以是一个值也可以是一个函数，将函数返回值作为初始值

```javascript
const Buttin  = ()=>{

  const[x,setX] = useState('x')//接受一个参数，参数是x的初始值

}
```

##### useEffect

它的作用和componentDidMount,componentDidUpdate,componentWillUnmount相同

* 为什么useEffect在组件内部调用，在组件内部调用，可以直接访问内部的变量，不需要特殊的api读取

* 在默认情况下useEffect在每次渲染后都会执行

```javascript

useEffect(()=>{
  //dosomething
})
```

* 第二个参数，数组，如果重新渲染时这个值未改动，则可以跳过这个函数
* 传递空数组则表示这个只运行一次，只在挂载和卸载时运行

```javascript
useEffect(()=>{

},[count])
```

##### useContext

接受上下文对象（从React.createContext返回的值），并返回该上下文的当前上下文值。当前上下文值由树中调用组件上方value最接近的prop 决定MyContext.Provider

* 获取上下文

```javascript
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
```

#### useReducer

是redux的替代品

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

接受type的化简器(state, action) => newState，并返回与dispatch方法配对的当前状态。（如果您熟悉Redux，您已经知道它的工作原理。）

```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

* 指定初始状态

```javascript
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

* 延迟初始化

```javascript
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```

##### useMemo

返回一个记忆值,
传递“创建”函数和一系列依赖项。useMemo仅在其中一个依赖项已更改时才重新计算存储的值。此优化渲染

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

##### useRef

useRef返回一个可变的ref对象，.current该对象的属性已初始化为传递的参数（initialValue）。返回的对象将在组件的整个生命周期内保持不变。
useRef就像一个“盒子”，可以在其.current属性中保存可变值。

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

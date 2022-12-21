---
title: Redux_tool_kit工具使用
date: 2022-12-21
---

#### 插件安装

```powershell
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```

#### Redux介绍

Redux和Vuex作用类似，都是为了方便在代码中配置全局可以使用的方法或者响应式变量，一般用于全局切换主题，中英文，缓存内容等等功能

#### Redux Toolkit解决的问题

* 配置 Redux store 过于复杂
* 需要配置很多依赖
* Redux 有太多样板代码


#### Reduxtoolkit包含的方法

* configureStore():封装了createStore，简化配置项，提供一些现成的默认配置项。它可以自动组合 slice 的 reducer，可以添加任何 Redux 中间件，默认情况下包含 redux-thunk，并开启了 Redux DevTools 扩展。
* createReducer():将 action type 映射到 reducer 函数，而不是编写 switch...case 语句。另外，它会自动使用 immer 库来让你使用普通的 mutable 代码编写更简单的 immutable 更新，例如 state.todos[3].completed = true
* createAction():生成给定 action type 字符串的 action creator 函数。该函数本身已定义了 toString()，因此可以代替常量类型使用。
* createSlice():接收一组 reducer 函数的对象，一个 slice 切片名和初始状态 initial state，并自动生成具有相应 action creator 和 action type 的 slice reducer。
* createAsyncThunk:接收一个 action type 字符串和一个返回值为 promise 的函数, 并生成一个 thunk 函数，这个 thunk 函数可以基于之前那个 promise ，dispatch 一组 type 为 pending/fulfilled/rejected 的 action。
* createEntityAdapter:生成一系列可复用的 reducer 和 selector，从而管理 store 中的规范化数据
* createSelector:来源于 Reselect 库，重新 export 出来以方便使用。

#### 开始使用

* 创建一个仓库store

```javascript
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

//TS
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

* 在react中使用

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

* 创建切片,将切片中的reducer函数注册到store中

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

```javascript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

#### 在页面中使用

* 使用redux-toolkit再带的工具useSelector，useDispatch
* useSelector可以获取redux中的变量值
* usedispatch是用来触发redux中的定义的方法

```javascript
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

#### 请求数据的配置

```javascript
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
```
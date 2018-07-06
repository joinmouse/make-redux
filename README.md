### redux　套路总结

#### 定义一个reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

------

#### 生成store
const store = createStore(reducer)

------

#### 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

------

#### 首次渲染页面
renderApp(store.getState())

------

#### 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
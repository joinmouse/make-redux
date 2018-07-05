const appState = {
  title: {
    text: 'React 小书',
    color: 'red'
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

// 所有对数据的操作(修改)都必须通过dispatch函数
function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}

// createStore接受两个参数，
// @一个表示应用程序状态的state
// @另一个是stateChanger, 它用来描述应用程序状态会根据action发生什么变化
// --------------------------------------------------------
// createStore会返回一个对象，对象中包含两个方法getState和dispatch
// @getState用于获取state数据
// @dispatch用于修改数据，接受action，
//   然后它会把state和action一并传给 stateChanger，
//   那么stateChanger就可以根据action来修改state了
// --------------------------------------------------------
// 总结: 获取数据通过getState()， 修改数据通过dispath(action)
function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)

  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

const store = createStore(appState, stateChanger)

// ----------------------------------------------------------------------------------------------

function renderApp(appState) {
  renderTitle(appState.title)
  renderConnet(appState.content)
}

function renderTitle(title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color 
}

function renderConnet(content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}


//首次渲染
renderApp(store.getState())

// 修改标题文本
store.dispatch({
  type: 'UPDATE_TITLE_TEXT',
  text: '《React.js 小书》'
})
// 修改标题颜色
store.dispatch({
  type: 'UPDATE_TITLE_COLOR',
  color: 'blue'
})

//将新的数据渲染到页面
renderApp(store.getState())

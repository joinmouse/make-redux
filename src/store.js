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
function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
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
function createStore (state, stateChanger) {
  const getState = () => state
  const dispatch = (action) => stateChanger(state, action)
  return { getState, dispatch}
}
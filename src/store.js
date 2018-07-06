/* 
*  所有对数据的操作(修改)都必须通过dispatch函数
*/

function reducer(state, action) {
  if(!state) {
    return {
      title: {
        text: 'React 小书',
        color: 'red'
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      // 构建新的对象并返回
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      // 构建新的对象并返回
      return {
        ...state,
        color: {
          ...state.title,
          color: action.color
        }
      }
    default:
      // 没有修改，返回原来的对象
      return state 
  }
}

// createStore接受两个参数，
// @一个表示应用程序状态的state(已经合并了)
// @另一个是stateChanger, 它用来描述应用程序状态会根据action发生什么变化
// --------------------------------------------------------
// createStore会返回一个对象，对象中包含三个方法getState、dispatch和subscribe(listener)
// @getState用于获取state数据
// @dispatch用于修改数据，接受action，
//   然后它会把state和action一并传给 stateChanger，
//   那么stateChanger就可以根据action来修改state了
// @subscribe(listener)传入一个监听函数, 这个函数也将被push到数组中
//   当修改dispatch时，每次会调用stateChange进行数据的修改，还将遍历listeners中的所有函数
//   相当于我们可以通过subscribe传入数据变化的监听函数，每当dispatch的时候，监听函数会被调用
// --------------------------------------------------------
// 总结: 获取数据通过getState()， 修改数据通过dispath(action)
// 改名 ==> 将stateChanger改为reducer
// reducer是一个函数，一个纯函数(Pure Function)
function createStore(reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)  
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)　　//覆盖原对象
    listeners.forEach((listener) => listener())
  }
  dispatch({}) //初始化state
  return { getState, dispatch, subscribe }
}

const store = createStore(reducer)

let oldState = store.getState()  //　缓存旧的state
store.subscribe(() => {　// 监听数据的变化
  const newState = store.getState()  // 数据可能变化，获取新的state
  renderApp(newState, oldState) 　// 将新旧的state传进去渲染
  oldState = newState　// 渲染完成后, 新的newState变成了旧的oldState，等待下一次数据变化重新渲染
})  


// 防止oldAppState没有传，所以加入默认参数oldAppState = {}
function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return
  console.log('render app...')　　　　　 //数据没有变化就不渲染了
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return  　　//数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color 
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return   //数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}


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
// renderApp(store.getState())



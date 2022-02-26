// render函数做的事：
// 1. 将vnode变为真实node
// 2.将真实node挂载到root节点上
function render(vnode, root){
  const node = createNode(vnode)
  root.appendChild(node)
}


// 创建真实节点
function createNode(vnode){
  const {type, props} = vnode
  let node = null
  if(typeof type === 'function'){
    // 组件,此时的type就是组件的构造函数
    node = type.prototype.isReactComponent ? 
      createNodeFromClassComponent(type, props) : 
      createNodeFromFunctionComponent(type, props)
  }else if(type === 'TEXT'){
    // 文本节点
    node = document.createTextNode('')
  }else if(type){
    // 其他的节点
    node = document.createElement(type)
  }else{
    // 不存在tag则为fragment节点
    node = document.createDocumentFragment()
  }

  // 挂载数据和属性到node上
  mountDataToNode(props, node)
  // 递归处理子元素
  reconsiderChildren(props?.children, node)
  return node
}

// 挂载数据和属性到node上,如classNAme, value, onClick等
function mountDataToNode(props, node){
  // 处理事件监听，暂时只处原生的事件，对于自定义事件和react中子向父组件传值，这里不考虑
  function handleEvents(key, node){
    node.addEventListener(key.slice(2).toLocaleLowerCase(), props[key])
  }

  const propArr = Object.keys(props).filter(item => item !== 'children')
  propArr.forEach(key => {
    if(key.startsWith('on')){
      // 以on开头的属性就是事件监听
      handleEvents(key, node)
    }else{
      node[key] = props[key]
    }
  })
}

function reconsiderChildren(children, node){
  children.forEach(vnodes => {
    if(Array.isArray(vnodes)){
      // jsx中可以使用map返回一个节点数组
      vnodes.forEach(vnode => node.appendChild(createNode(vnode)))
    }else{
      node.appendChild(createNode(vnodes))
    }
  })
}

function createNodeFromClassComponent(type, props){
  console.log(type, props, '+++------------------------------------------++');
  
}

function createNodeFromFunctionComponent(type, props){
  const vnode = type(props)
  return createNode(vnode)
}



export { 
  render
}
function createElement(type, props, ...children){

  return {
    type,
    props:{
      ...props,
      children: children.map(node => typeof node === 'object' ? node : textNode2node(node))
    }
  }
}

// 文本节点没有node加点的属性，可以同意处理，变成普通的node节点对象
function textNode2node(text){
  return {
    type: 'TEXT',
    props: {
      children: [],
      nodeValue: text
    }
  }
}


export default {
  createElement
}
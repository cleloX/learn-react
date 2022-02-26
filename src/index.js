// import React from "react";
// import ReactDOM from "react-dom";
// import React from "./kreact/";
import React from "./packages/react";
// import ReactDOM from "./kreact/ReactDOM";
import ReactDOM from "./packages/react-dom"
// import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent({name}) {
  return (
    <div className="border function">
      hello, {name}
      <button onClick={() => console.log("omg")}>click</button>
    </div>
  );
}

// class ClassComponent extends Component {
//   render() {
//     const {name} = this.props;
//     return <div className="border function">hello, {name}</div>;
//   }
// }

const jsx = (
  <div className="border">
    <p>这是一个文本</p>
    <div className="border">
      <h5>hello</h5>
    </div>
    <FunctionComponent name="function" />
    {/* <ClassComponent name="class" /> */}
    <>
      <h5>文本1</h5>
      <h5>文本2</h5>
    </>

    {[1, 2, 3].map(item => {
      return (
        <div className="border" key={item}>
          <button onClick={() => console.log(item + 'tz')}>{item}</button>
          <p>{item}</p>
        </div>
      );
    })}
  </div>
);

// element， container
// vnode->node , 把node渲染更新到container
ReactDOM.render(jsx, document.getElementById("root"));

// !节点类型
// 文本节点
// html标签节点
// class componet
// function component
// fragment

// jsx=>createElement(生成element，就是我们需要的虚拟dom)=>render(vnode->node, 再把node渲染到container)
// vnode->node的流程注意下节点的区分，不同节点处理方式不同

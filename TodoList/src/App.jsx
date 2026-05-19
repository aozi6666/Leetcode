import {useState} from 'react'

// React函数组件
function TotoList() {

  // 输入框内容
  const [text, setText] = useState('');
  // 待办事项列表
  const [list, setList] = useState([]);

  function changeText(e) {
    // 输入框内容改变时,更新输入框内容
    return setText(e.target.value);
  }

  function addTodo() {
    // 空值判断
    if(!text || !text.trim()){
      return alert('请输入待办事项');
    }

    // 添加待办事项
    setList([...list, text]);

    // 清空输入框
    setText('');
  }

  return (
  <>
    <div>
      {/* 输入框 */}
      <input
        value={text}
        onChange={changeText} 
        placeholder='请输入待办事项'
      />

      {/* 添加按钮 */}
      <button onClick={addTodo}>添加</button>

      {/* 列表 */}
      <ul>
        {/* 列表项:使用map遍历: JSX中JS表达式用{}包裹 */}
        {list.map((item, index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
      </ul>


    </div>
  </>
  )
}

// 导出函数组件
export default TotoList;

import {useState} from 'react'

function TodoList(){

    const [text, setText] = useState('');
    const [list, setList] = useState([]);

    function addTodo(){
        // 空值判断
        if(!text || !text.trim()){
            return alert('请输入待办事项');
        }

        // 添加
        setList([...list, text]);

        // 清空输入框
        setText('');
    }
    return (
    <>
        <div className="contain">
            {/* 输入框 */}
            <input
                value={text}
                onChange={(e) => {setText(e.target.value)}}  
                placeholder='请输入待办事项' 
            />

            {/* 添加按钮 */}
            <button onClick={addTodo}>添加</button>

            {/* 列表 */}
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    </>)
}

export default TodoList;

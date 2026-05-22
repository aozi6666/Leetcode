import {useState} from 'react';

function TodoList(){

    const [text, setText] = useState('');
    const [list, setList] = useState([]);


    function addTodo(){
        // 空值判断
        if(!text || !text.trim()){
            alert('请输入待办事项');
            return;
        }
        // 添加待办事项
        setList([...list, text]);

        // 清空输入框
        setList('');
    }

    return (
        <>
            <div className="contain">
                <input 
                    value={text}
                    onChange={(e) => {setText(e.target.value)}}
                    placeholder='请输入待办事项'
                />
                <button onClick={addTodo}>添加</button>
                <ul>
                    {list.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default TodoList;
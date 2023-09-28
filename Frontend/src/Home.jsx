import React, { useEffect } from "react";
import { useState } from "react";
import Create from "./Create";
import axios from 'axios';

import { BsFillTrashFill, BsCircleFill, BsCheckCircleFill } from 'react-icons/bs';



function Home() {
    const [ todos, setTodos] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3456/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    },[])

    const handleEdit = (id, done) => {
        console.log("handleEdit called with id:", id, "done:", done);
        axios.put(`http://localhost:3456/update/${id}`, {done:!done})
        .then(result => {
            setTodos(prevTodos => {
                return prevTodos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, done: !done };
                    }
                    return todo;
                });
            });
        })
        .catch(err => console.log(err))
}

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3456/delete/${id}`)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
    

    return(
        <div className="home">
            <h2>To Do List</h2>
            <Create todos={todos} setTodos={setTodos} />
            {
                todos.length === 0 
                ?
                <div><h4>Keine offenen Aufgaben. Füge nun neue hinzu oder trink einen Kaffee und lies ein gutes Buch. 🥳</h4></div>
                :
                todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handleEdit(todo._id, todo.done)}>
                            {todo.done 
                            ? 
                            <BsCheckCircleFill className='icon'/>
                            :
                            <BsCircleFill className='icon' /> 
                            }
                            <p className={todo.done ? "line_through" :"" }> {todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home
import React, { useState } from "react";
import axios from "axios";

function Create({ todos, setTodos }) {
  const [task, setTask] = useState("");


  const handleAdd = () => {
    axios
      .post(`http://localhost:3456/add`, { task: task })
      .then(response => {
        setTodos([...todos, response.data]);
        setTask(''); 
    })
    .catch(err => console.log(err))
}

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Neue Aufgabe"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>+</button>
    </div>
  );
}

export default Create;

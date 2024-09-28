import React, { useState } from 'react';
import './ToDoList.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  const addTask = () => {
    if (taskName) {
      setTasks([...tasks, { id: Date.now(), name: taskName, completed: false }]);
      setTaskName('');
    }
  };

  const startEditingTask = (id, name) => {
    setEditingTaskId(id);
    setEditingTaskName(name);
  };

  const confirmEditTask = (id) => {
    updateTask(id, editingTaskName);
    setEditingTaskId(null);
  };

  const updateTask = (id, newTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, name: newTask } : task));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filterTasks = () => {
    if (filter === "completed") {
      return tasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  const sortTasks = () => {
    return [...filterTasks()].sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div className="app">
      <div className="task-creation">
        <h1>Create Task</h1>
        <input 
          type="text" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          placeholder="Yo? Add your Task" 
        />
        <button onClick={addTask}>Add Task</button>

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <div className="task-list">
        <h1>Tasks</h1>
        <ul>
          {sortTasks().map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {editingTaskId === task.id ? (
                <>
                  <input 
                    type="text" 
                    value={editingTaskName} 
                    onChange={(e) => setEditingTaskName(e.target.value)} 
                  />
                  <button onClick={() => confirmEditTask(task.id)}>🤝</button>
                </>
              ) : (
                <>
                  <span>{task.name}</span>
                  <button onClick={() => startEditingTask(task.id, task.name)}>✍️</button>
                </>
              )}
              <button onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? '👎' : '👍'}
              </button>
              <button onClick={() => deleteTask(task.id)}>🚮</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;



// import React, {useState} from 'react'
// import './ToDoList.css';

// function ToDoList() {
//     const [tasks, settasks] = useState(["Drink Coffee","Tulala 3 minutes"," Tas Relapse"]);
//     const [newtask, setNewtask] = useState();

//    function handleInputChange(event){
//        setNewtask(event.target.value);
//    }  

//    function addTask() {
//        if(newtask.trim() !== "") {
//             settasks(t => [...t, newtask]);
//             setNewtask("");
//        }

//    }

//    function deleteTask(index){
//        const UpdatedTasks = tasks.filter((_, i) => i !== index);
//        settasks(UpdatedTasks);

//    }

   

  


   
//    function moveTaskUp(index){

//     if(index > 0){
//         const UpdatedTasks = [...tasks];
//         [[UpdatedTasks],[index], UpdatedTasks[index - 1]] = 
//         [UpdatedTasks[index - 1], UpdatedTasks[index]];
//         settasks();
//     }

//    }

//    function moveTaskDown(index){

//     if(index < tasks.length - 1){
//         const UpdatedTasks = [...tasks];
//         [[UpdatedTasks],[index], UpdatedTasks[index + 1]] = 
//         [UpdatedTasks[index + 1], UpdatedTasks[index]];
//         settasks();
//     }

//     }

//    return(
//    <div classname="ToDOList">

//     <h1>To Do List</h1>
//     <h2>Good Day!</h2>

//     <div>
//         <input type="text"
//         placeholder="Enter a Task..."
//         value={newtask}
//         onChange={handleInputChange} />
//         <button
//             classname="add-button"
//             onClick={addTask}>
//             Add
//         </button>
//     </div>


//     <ol>
//         {tasks.map((task, index) =>
//             <li key={index}>
//                 <span className="text">{task}</span>
//                 <button
//                 className="delete-button"
//                 onClick={() => deleteTask(index)}>
//                 Delete
//                 </button>
                

//                 {/* <button
//                 className="move-button"
//                 onClick={() => moveTaskUp(index)}>
//                 👍
//                 </button>
//                 <button
//                 className="move-button"
//                 onClick={() => moveTaskDown(index)}>
//                 👎
//                 </button> */}


//             </li>
//         )}
//     </ol>

// </div>);
// }
// export default ToDoList;



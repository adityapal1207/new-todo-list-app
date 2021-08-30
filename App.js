import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
function App() {
  const [taskName, setTaskName] = useState();
  const [taskArr, setTaskArr] = useState([]);
  const [completedTaskArr, setCompletedTaskArr] = useState([]);
  const addTask = () => {
    const newTask = {
      name: taskName,
      completedStatus: false,
      editMode: false,
    }
    setTaskArr([newTask, ...taskArr])
  }
  const deleteTask = (position) => {
    setTaskArr(taskArr.filter((task, index) => index !== position));
  }
  const completedTask = (position) => {
    setTaskArr(
      taskArr.map((task, index) => {
        if (index == position) {
          return {
            ...task,
            completedStatus: !task.completedStatus,
          }
        }
        else {
          return task;
        }
      })
    )
  }
  const toggleEditTaskMode = (position) => {
    setTaskArr(
      taskArr.map((task, index) => {
        if (index === position) {
          return {
            ...task,
            editMode: !task.editMode,
          }
        }
        else {
          return task;
        }

      })
    )
  }
  const editTaskName = (position, value) => {
    setTaskArr(
      taskArr.map((task, index) => {
        if (index === position) {
          return {
            ...task,
            name: value,
          };
        }
        else {
          return task;
        }
      }
      )
    )
  }
  return (
    <div>
      <h1>Todo List  App </h1>
      <br />
      <input type="text"
        placeholder="Enter your task in the todo list"
        name="todo-input-field"
        value={taskName}
        onChange={(e) => {

          setTaskName(e.target.value)
        }} />
      <button type="button" onClick={addTask}>ADD TASK </button>
      <h2>Saved task</h2>
      <ol>
        {
          taskArr.map((task, index) => {
            return <li> <div>
              {
                task.editMode ? <input value={task.name}
                  onChange={(e) => editTaskName(index, e.target.value)} /> : <p style={{
                    textDecoration: (task.completedStatus === true) ? "line-through" : "none"
                  }}>
                  {task.name} </p>
              }
              <br />
              <button type="button" onClick={() => deleteTask(index)}>Delete Task  </button>
              <button type="button" onClick={() => completedTask(index)}>
                {
                  task.completedStatus === true ? "Mark uncompleted" : "Mark as completed"
                }
              </button>

              <button type="button" onClick={() => toggleEditTaskMode(index)}>{
                task.editMode === true ? "Save" : "Edit"}</button>
            </div>
            </li>
          })
        } </ol>
    </div>
  );
}
export default App;

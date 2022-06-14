import React, {useState} from "react"
import {GrNotes} from "react-icons/gr"
import {AiOutlinePlus, AiOutlineClose} from "react-icons/ai"

function App() {
  // set up states for tasks and input
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  // function to set a new task when the user presses the submit icon
  const handleSubmit = (e) => {
    e.preventDefault()
    const addTask = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false
    }
    setTasks([...tasks, addTask])
    setInput('') // clear the input field
  }

  // allow user to delete tasks
  const deleteTask = (id) => {
    let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id)
    setTasks(filteredTasks)
    console.log("tasks deleted")
  }

  // allow user to toggle copleted tasks
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => (
        task.id === id ? {...task, completed: !task.completed} : task
      ))
    )
  }

  const date = new Date()
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  
  return (
    <div className='app'>
      <div className="container">
        <h1><GrNotes />React Tasklist</h1>

        <div className="date">
          <p>{days[date.getDay()]}</p>
          <p>{date.getDate()},</p>
          <p>{months[date.getMonth()]}</p>
          <p>{date.getFullYear()}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <AiOutlinePlus className="icon" />
            <input
              value={input}
              onChange={e => setInput(e.target.value)} 
              placeholder="Enter a task..."
              type="text"
            />
          </div>
        </form>
        <div>
          {tasks.map(task => (
            <div key={task.id} onDoubleClick={() => toggleComplete(task.id)} className={`task-row ${task.completed ? 'completed' : ''}`}>
              <p>{task.text}
              </p>
              <AiOutlineClose onClick={() => deleteTask(task.id)} className="icon" />
            </div>
          ))}
        </div>
        <p className="length">{(tasks < 1) ? 'You have no tasks.' : `Tasks: ${tasks.length}`}</p>
      </div>
    </div>
  );
}

export default App;

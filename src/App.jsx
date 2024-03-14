import { useRef } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const todos = useSelector(state => state.todos.todos)
  const taskRef = useRef("Task1")
  const dispatch = useDispatch()


  function handleClick(e) {
    e.preventDefault()
    let taskName = taskRef.current.value
    if (taskName) {
      let t = {
        id: Date.now(),
        name: taskName
      }

      dispatch({ type: "TODO_ADD", payload: t })
      taskName = ''
    }
  }

  function handleRemove(id) {
    dispatch({ type: "TODO_REMOVE", payload: id })
  }
  return (
    <>
      <div id="container">
        <h1>To-Do List</h1>
        <div className="container">
          <input ref={taskRef} type="text" id="new-item" placeholder="Add item..." />
          <button onClick={handleClick} id="add-btn">ADD</button>
          <ul id="todo-list">
            {
              todos.length > 0 && todos.map((el, index) => {
                return <li key={index}>
                  {el.name}
                  <div className="buttons">
                    <button onClick={() => handleRemove(el.id)} className="delete-btn">Delete</button>
                    <button className="edit-btn">Edit</button>
                  </div>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App

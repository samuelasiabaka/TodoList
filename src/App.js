import { useState } from 'react'

import { AiOutlinePlus } from 'react-icons/ai'
import Todo from './Todo'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-tor from-[#2F80ED] to-[#1CB5E0]`,
}
function App() {
  const [todos, setTodos] = useState([
    'Learn codes',
    'Build projects',
    'Get job',
  ])
  return (
    <div className="App">
      <div className="container">
        <h3 className="heading">Todo App</h3>
        <form className="form">
          <input type="text" placeholder="Add Todo" />
          <button>
            <AiOutlinePlus size={30} style={{ background: 'none' }} />
          </button>
        </form>
        <ul className="list">
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} />
          ))}
        </ul>
        <p className="todo-count">You have 3 todos</p>
      </div>
    </div>
  )
}

export default App

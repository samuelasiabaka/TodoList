import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser } from '../services/firebaseServices'
import './homepage.scss'

const HomePage = () => {
  const navigate = useNavigate()
  const [todo, setTodo] = useState('')
  const addTodo = () => {}

  const handleLogout = async () => {
    await signOutUser()
    navigate('/login')
  }
  return (
    <div>
      <h2>Welcome</h2>
      {/* <div className="container" id="container"> */}
      <div className="container" id="container">
        <form onSubmit={addTodo}>
          <div className="todo-input">
            <input
              type="text"
              value={todo}
              placeholder="Enter Todo"
              required
              onChange={(e) => {
                setTodo(e.target.value)
              }}
            />
            <button>Add Todo</button>
          </div>
          {/* <h1>Create Account</h1> */}
        </form>
        <div className="todo-items-container">
          <ul></ul>
        </div>

        <div className="signout-container">
          {/* <p>You have 3 todos</p> */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

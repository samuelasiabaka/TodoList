import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

const Todo = ({ todo }) => {
  return (
    <li className="todo-list">
      <div className="row">
        <input type="checkbox" />
        <p className="todo-text">{todo}</p>
      </div>
      <button>{<FaRegTrashAlt style={{ background: 'none' }} />}</button>
    </li>
  )
}

export default Todo

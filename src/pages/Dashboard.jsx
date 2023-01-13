import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../services/firebaseServices'
import Todo from '../components/Todo'
import { useUserAuth } from '../context/UserAuthContext'
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  doc,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { createListItem } from '../services/firebaseServices'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useUserAuth()
  const [item, setItem] = useState('')
  const [todos, setTodos] = useState([])
  const handleLogout = async () => {
    await signOutUser()
    navigate('/login')
  }

  // write
  const addItem = async (e) => {
    e.preventDefault()
    if (item === '') {
      alert('Please enter a valid todo')
      return
    }
    setItem('')
    await createListItem(item, user)
  }

  // read
  // update
  // delete
  return (
    <div>
      <h3>Welcome {user.displayName}</h3>
      <form className="form" onSubmit={addItem}>
        <input
          type="text"
          placeholder="Add Todo"
          value={item}
          onChange={(e) => {
            setItem(e.target.value)
          }}
        />
        <button>
          <AiOutlinePlus size={30} style={{ background: 'none' }} />
        </button>
      </form>
      <ul className="list">
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo.text} />
        ))}
      </ul>
      <p className="todo-count">You have 3 todos</p>
      <div>
        <button className="btn btn-success" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard

// useEffect(() => {
//     const listRef = doc(db, 'users', user.uid, 'todoList', 'listItems')
//     const q = query(listRef)
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let todoArr = []
//       // querySnapshot.forEach((doc) => {
//       //   todoArr.push({ ...doc.data(), id: doc.id })
//       // })
//       console.log(querySnapshot)
//       setTodos(todoArr)
//     })
//     return () => unsubscribe()
//   }, [])

import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser } from '../services/firebaseServices'
import { useUserAuth } from '../context/UserAuthContext'
import { db } from '../firebaseConfig'
import {
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  collection,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import './homepage.scss'
import { uid } from 'uid'

const HomePage = () => {
  const { user } = useUserAuth()
  const navigate = useNavigate()
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  // const [isEdit, setIsEdit] = useState(false)
  // const [tempUidd, setTempUidd] = useState('')

  useEffect(() => {
    if (user) {
      const q = query(collection(db, `/${user.uid}`), orderBy('createdAt'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todosArr = []
        querySnapshot.forEach((doc) => {
          todosArr.push({ ...doc.data(), id: doc.id })
        })
        setTodos(todosArr)
      })
      return () => unsubscribe()
    }
  }, [])

  // WRITE
  const addTodo = async (e) => {
    e.preventDefault()
    setTodo('')
    const uidd = uid()
    await setDoc(doc(db, `/${user.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
      createdAt: serverTimestamp(),
    })
      .then((doc) => {
        console.log(doc)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
            <button onClick={addTodo}>Add Todo</button>
          </div>
          {/* <h1>Create Account</h1> */}
        </form>
        <div>
          {todos.map((todo) => (
            <div key={todo.uidd}>
              <h6>{todo.todo}</h6>
              <button>update</button>
              <button>delete</button>
            </div>
          ))}
        </div>

        <div className="signout-container">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

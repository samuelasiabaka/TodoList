import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../services/firebaseServices'
import deleteIcon from '../assests/delete-icon.png'
import updateIcon from '../assests/update-icon.svg'
import { useUserAuth } from '../context/UserAuthContext'
import { db } from '../firebaseConfig'
import {
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
import { uid } from 'uid'
import '../styles/home.css'

const Home = () => {
  const { user } = useUserAuth()
  const navigate = useNavigate()
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempUidd, setTempUidd] = useState('')

  useEffect(() => {
    // READ
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
    if (todo === '') {
      alert('Cannot submit a blank field')
      return
    }
    await setDoc(doc(db, `/${user.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
      createdAt: serverTimestamp(),
    }).catch((error) => {
      console.log(error)
    })
  }

  // UPDATE
  const handleUpdate = (todo) => {
    setIsEdit(true)
    setTodo(todo.todo)
    setTempUidd(todo.uidd)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    updateDoc(doc(db, `/${user.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    })
    setIsEdit(false)
    setTodo('')
  }

  // DELETE
  const handleDelete = (uid) => {
    deleteDoc(doc(db, `/${user.uid}/${uid}`))
  }

  const handleLogout = async () => {
    await signOutUser()
    navigate('/login')
  }

  return (
    <>
      <div className="todo-container">
        <div className="main-heading">
          <h1>Todo List</h1>
        </div>
        <h4>Hello {user.displayName}, welcome back</h4>
        <div className="form">
          <input
            type="text"
            className="input"
            value={todo}
            required
            onChange={(e) => {
              setTodo(e.target.value)
            }}
          />
          {isEdit ? (
            <input
              type="submit"
              className="add"
              value="Update Task"
              onClick={handleEdit}
            />
          ) : (
            <input
              type="submit"
              className="add"
              value="Add Task"
              onClick={addTodo}
            />
          )}
        </div>
        <div>
          {todos.map((todo) => (
            <div className="tasks" key={todo.uidd}>
              <div className="task-list-item">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  placeholder="add todo"
                />

                <p className="task-text">{todo.todo}</p>

                <div className="task-item-btn">
                  <button
                    className="task-btn"
                    onClick={() => handleUpdate(todo)}
                  >
                    <img src={updateIcon} alt="update icon" height={18} />
                  </button>
                  <button
                    className="task-btn"
                    onClick={() => handleDelete(todo.uidd)}
                  >
                    <img src={deleteIcon} alt="delete icon" height={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="signout-btn">
          <input
            type="submit"
            className="add"
            value="Sign out"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  )
}

export default Home

import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser } from '../services/firebaseServices'
import addIcon from '../assests/add-icon.svg'
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

const Dashboard = () => {
  const { user } = useUserAuth()
  const navigate = useNavigate()
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempUidd, setTempUidd] = useState('')
  const [inputError, setInputError] = useState('')

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
    })
      .then((doc) => {
        console.log(doc)
      })
      .catch((error) => {
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
    <div className="dashboard-container">
      <h1> Hi {user.displayName}</h1>
      <div className="tasks-body">
        <div className="input-task-container">
          <div className="email-container">
            <input
              type="text"
              className="email-input"
              placeholder="add todo"
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value)
              }}
            />
          </div>
          <div className="button-container">
            {isEdit ? (
              <button className="add-task-btn" onClick={handleEdit}>
                <img src={updateIcon} alt="add icon" height={30} />
              </button>
            ) : (
              <button className="add-task-btn" onClick={addTodo}>
                <img src={addIcon} alt="add icon" height={30} />
              </button>
            )}
          </div>
        </div>
        <div className="tasks-container">
          <h4 className="tasks-heading">All Tasks</h4>
          <hr />
          <div>
            {todos.map((todo) => (
              <div className="task-item" key={todo.uidd}>
                <input type="checkbox" name="" id="" />
                <div className="todo-list-item">
                  <p>{todo.todo}</p>
                </div>

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
            ))}
          </div>
        </div>
        <div className="button-container">
          <button className="login-btn" onClick={handleLogout}>
            SIGN Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

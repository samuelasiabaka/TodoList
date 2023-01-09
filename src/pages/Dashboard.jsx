import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../services/firebaseServices'
import Todo from '../components/Todo'
import { useUserAuth } from '../context/UserAuthContext'
import { useEffect } from 'react'
import { collection, onSnapshot, query, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

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
  const addItem = async (item, user) => {
    const itemRef = collection(db, 'user', user.uid, 'listItem')
    console.log(item)
    return await addDoc(itemRef, item)
      .then((data) => {
        console.log('item has been added to database')
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // read
  // useEffect(() => {
  //   const q = query(collection(db, 'users' + user.uid))
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let todoArr = []
  //     querySnapshot.forEach((doc) => {
  //       todoArr.push({ ...doc.data, id: doc.id })
  //     })
  //     setTodos(todoArr)
  //   })
  //   return () => unsubscribe()
  // }, [])
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

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'

// SIGNUP
export const createAccountWithEmailAndPassword = async (formData) => {
  return await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password,
  )
}

// SIGN IN
export const signInUser = async (formData) => {
  return await signInWithEmailAndPassword(
    auth,
    formData.email,
    formData.password,
  )
}

// SIGN OUT
export const signOutUser = async () => {
  return await signOut(auth)
}

// add user to database
// export const register = async (formData, user) => {
//   //   const dbRef = collection(db, 'users')
//   const { username, email } = formData
//   const data = {
//     email: email,
//     uid: user.uid,
//     username: username,
//     createdAt: serverTimestamp(),
//   }
//   return await setDoc(doc(db, 'users', user.uid), data)
//     .then((doc) => {
//       console.log('Document has been added to database')
//       console.log(doc)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }

// add item to todoList
export const createListItem = async (item, user) => {
  const itemRef = doc(db, 'users', user.uid, 'todoList', 'listItems')
  const data = {
    text: item,
    completed: false,
  }
  return await setDoc(itemRef, data)
    .then((doc) => {
      console.log('New todo list item has been added to database')
      console.log(doc)
    })
    .catch((error) => {
      console.log(error)
    })
}

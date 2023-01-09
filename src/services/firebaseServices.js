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
export const register = async (formData, user) => {
  //   const dbRef = collection(db, 'users')
  const { username, email } = formData
  const data = {
    email: email,
    uid: user.uid,
    username: username,
    createdAt: serverTimestamp(),
    todoList: ['Learn Code', 'Build Projects', 'Get a job'],
  }
  return await setDoc(doc(db, 'users', user.uid), data)
    .then((doc) => {
      console.log('Document has been added to database')
      console.log(doc)
    })
    .catch((error) => {
      console.log(error)
    })
}

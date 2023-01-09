// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB8nw6RH3n2oH6KfaZj7bp3EFFVwZVn5bY',
  authDomain: 'todo-app-fbdca.firebaseapp.com',
  projectId: 'todo-app-fbdca',
  storageBucket: 'todo-app-fbdca.appspot.com',
  messagingSenderId: '1088307656303',
  appId: '1:1088307656303:web:523691ae6414d7d673bf9a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import {
  createAccountWithEmailAndPassword,
  signInUser,
} from '../services/firebaseServices'
import { customError } from '../common/firebase-error'
import './loginsignp.css'

const LoginAndSignup = () => {
  const navigate = useNavigate()
  const [toggler, setToggler] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const handleClick = () => {
    setToggler(!toggler)
  }

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setFormData({
      email: '',
      password: '',
    })

    try {
      const res = await signInUser(formData)
      if (res) {
        navigate('/dashboard')
      }
    } catch (error) {
      setError(customError[error.code])
    }
  }

  // SIGN UP
  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setFormData({
      username: '',
      email: '',
      password: '',
    })

    try {
      const res = await createAccountWithEmailAndPassword(formData)
      const user = res.user
      await updateProfile(user, {
        displayName: formData.username,
      })
      if (user) {
        navigate('/dashboard')
      }
    } catch (error) {
      setError(customError[error.code])
    }
  }

  return (
    <div>
      <h2>Todo List</h2>
      <div
        className={toggler ? 'container right-panel-active' : 'container'}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input
              type="text"
              value={formData.username}
              placeholder="Username"
              required
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value })
              }}
            />
            <input
              type="email"
              value={formData.email}
              placeholder="Email"
              required
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
              }}
            />
            <input
              type="password"
              value={formData.password}
              placeholder="Password"
              required
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
              }}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          {/* SIGN IN */}
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <input
              type="email"
              value={formData.email}
              placeholder="Email"
              required
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
              }}
            />
            <input
              type="password"
              value={formData.password}
              placeholder="Password"
              required
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
              }}
            />
            <Link to="/">Forgot your password?</Link>
            {/* <Link to="/">Don't have an account? signup</Link> */}
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={handleClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>
                Enter your personal details cuz managing your day just got
                easier
              </p>
              <button className="ghost" id="signUp" onClick={handleClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAndSignup

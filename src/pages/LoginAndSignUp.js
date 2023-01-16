import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import {
  createAccountWithEmailAndPassword,
  signInUser,
} from '../services/firebaseServices'
import { customError } from '../common/firebase-error'
import '../styles/loginAndSignup.css'
import frontImg from '../assests/frontImg.jpg'
import backImg from '../assests/backImg.jpg'

const LoginAndSignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

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

  //   SIGN UP
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
    <div className="container">
      <input type="checkbox" id="flip" />
      <div className="cover">
        <div className="front">
          <img src={frontImg} alt="" />
          <div className="text">
            <span className="text-1">
              Every new friend is a <br /> new adventure
            </span>
            <span className="text-2">Let's get connected</span>
          </div>
        </div>
        <div className="back">
          <img className="backImg" src={backImg} alt="" />
          <div className="text">
            <span className="text-1">
              Complete miles of journey <br /> with one step
            </span>
            <span className="text-2">Let's get started</span>
          </div>
        </div>
      </div>
      <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <div className="title">Login</div>
            <form action="#" onSubmit={handleLogin}>
              {error && <p className="error-alert">{error}</p>}
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="text">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="button input-box">
                  <input type="submit" value="Sumbit" />
                </div>
                <div className="text sign-up-text">
                  Don't have an account? <label htmlFor="flip">Sigup now</label>
                </div>
              </div>
            </form>
          </div>
          <div className="signup-form">
            <div className="title">Signup</div>
            {/* SIGN UP FORM */}
            <form action="#" onSubmit={handleSignUp}>
              {error && <p className="error-alert">{error}</p>}
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    value={formData.username}
                    placeholder="Enter your name"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="button input-box">
                  <input type="submit" value="Sumbit" />
                </div>
                <div className="text sign-up-text">
                  Already have an account?{' '}
                  <label htmlFor="flip">Login now</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAndSignUp

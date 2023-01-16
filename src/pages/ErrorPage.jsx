import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import errorIcon from '../assests/error-icon.png'

const ErrorPage = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate('/')
  }
  return (
    <div className="error-container">
      <img src={errorIcon} alt="error icon" />
      <div>
        <p className="error-text"> 404 error</p>
        <p className="error-text"> Page does not exist</p>
      </div>
      <div>
        <button className="error-btn" onClick={goBack}>
          Go back
        </button>
      </div>
    </div>
  )
}

export default ErrorPage

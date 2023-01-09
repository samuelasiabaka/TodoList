import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routeConfig from './routeConfig'
import './index.scss'
import App from './App'

// import { RouterProvider } from 'react-router-dom'
// import routeConfig from './routeConfig'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={routeConfig} />
  </React.StrictMode>,
)

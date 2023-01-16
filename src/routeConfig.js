import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoutes from './auth/ProtectedRoute'
import PublicRoutes from './auth/PublicRoute'
// import LoginAndSignup from './pages/LoginAndSignup'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import App from './App'

const routeConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <PublicRoutes />,
        children: [
          { index: true, element: <Login /> },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
      {
        path: '',
        element: <ProtectedRoutes />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
])

export default routeConfig

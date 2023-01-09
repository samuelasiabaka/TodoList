import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoutes from './auth/ProtectedRoute'
import PublicRoutes from './auth/PublicRoute'
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
            path: 'signup',
            element: <Signup />,
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

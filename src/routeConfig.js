import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoutes from './auth/ProtectedRoute'
import PublicRoutes from './auth/PublicRoute'
import LoginAndSignup from './pages/LoginAndSignup'
import App from './App'
import HomePage from './pages/HomePage'

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
          { index: true, element: <LoginAndSignup /> },
          {
            path: 'login',
            element: <LoginAndSignup />,
          },
          {
            path: 'signup',
            element: <LoginAndSignup />,
          },
          {
            path: 'home',
            element: <HomePage />,
          },
        ],
      },
      {
        path: '',
        element: <ProtectedRoutes />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: 'dashboard',
            element: <HomePage />,
          },
        ],
      },
    ],
  },
])

export default routeConfig

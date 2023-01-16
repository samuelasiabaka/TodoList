import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoutes from './auth/ProtectedRoute'
import PublicRoutes from './auth/PublicRoute'
import LoginAndSignUp from './pages/LoginAndSignUp'
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
          { index: true, element: <LoginAndSignUp /> },
          {
            path: 'login',
            element: <LoginAndSignUp />,
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

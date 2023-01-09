import { Navigate, Outlet } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

const ProtectedRoutes = () => {
  const { user } = useUserAuth()
  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes

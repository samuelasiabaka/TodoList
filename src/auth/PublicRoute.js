import { Navigate, Outlet } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

const PublicRoutes = () => {
  const { user } = useUserAuth()
  return !user ? <Outlet /> : <Navigate to="/dashboard" />
}

export default PublicRoutes

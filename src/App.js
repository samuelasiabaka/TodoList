import { UserAuthContextProvider } from './context/UserAuthContext'

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <UserAuthContextProvider>
      <div className="container">
        <Outlet />
      </div>
    </UserAuthContextProvider>
  )
}

export default App

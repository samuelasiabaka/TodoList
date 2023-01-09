import { UserAuthContextProvider } from './context/UserAuthContext'

import { Outlet } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-tor from-[#2F80ED] to-[#1CB5E0]`,
}
function App() {
  return (
    <UserAuthContextProvider>
      <div className="App">
        <div className="container">
          <h3 className="heading">Todo App</h3>
          {/* <Signup /> */}
          <Outlet />
        </div>
      </div>
    </UserAuthContextProvider>
  )
}

export default App

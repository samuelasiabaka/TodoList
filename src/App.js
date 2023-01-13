import { UserAuthContextProvider } from './context/UserAuthContext'

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <UserAuthContextProvider>
      <div className="App">
        <div className="container">
          {/* <h3 className="heading">Todo App</h3> */}
          {/* <Signup /> */}
          <Outlet />
        </div>
      </div>
    </UserAuthContextProvider>
  )
}

export default App

import { useState } from 'react'
import Login from './pages/auth/Login'
import PageNotFound from './pages/pageNotFound/PageNotFound'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './features/auth/PrivateRoute'
import AuthRoute from './features/auth/AuthRoute'
import MasterLayout from './layout/MasterLayout'
import Logout from './pages/auth/Logout'


function App() {
  // const [count, setCount] = useState(0)
  const publicRoutes = [
    // { path: '/', element: <Home /> },
    // { path: '/about', element: <About /> },
    // { path: '/contacts', element: <Contact /> },
  ]

  const authRoutes = [
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    // { path: '/register', element: <Register /> },
    // { path: '/logout', element: <Logout /> },
  ]

  const privateRoutes = [
    // All admin related routes 
    { path: '/dashboard', element: <Dashboard /> },
  ]

  return (
    <Routes>
      {authRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <AuthRoute>
              {route.element}
            </AuthRoute>
          }
        />
      ))}

      <Route path='/logout' element={<Logout />}></Route>

      <Route element={<MasterLayout />}>
        {privateRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute>
                {route.element}
              </PrivateRoute>
            }
          />
        ))}
      </Route>


      {/* Catch-all route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App

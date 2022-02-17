import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App

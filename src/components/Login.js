import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { Link, useNavigate, useLocation } from 'react-router-dom'
// import useLocalStorage from '../hooks/useLocalStorage'
import useInput from '../hooks/useInput'

import axios from '../api/axios'

const LOGIN_URL = '/auth'

const Login = () => {
  const { setAuth } = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef()
  const errRef = useRef()

  const [username, resetUsername, usernameAttributes] = useInput('')
  const [password, resetPassword, passwordAttributes] = useInput('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({ username, password, roles, accessToken })

      // 清除输入框内容，如果直接跳转，可不用
      resetUsername()
      resetPassword()

      // 跳转
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          {...usernameAttributes}
          required
        />
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' {...passwordAttributes} required />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className='line'>
          <Link to='/register'>Sign Up</Link>
        </span>
      </p>
    </section>
  )
}

export default Login

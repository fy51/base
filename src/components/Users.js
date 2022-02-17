import { useState, useEffect } from 'react'
import axios from '../api/axios'

const Users = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    // 定义函数（为什么放在这里？而非放到外面）
    const getUsers = async () => {
      try {
        const response = await axios.get('/users', {
          signal: controller.signal,
        })
        isMounted && setUsers(response.data) // 页面加载状态，才设置苏剧
      } catch (err) {
        console.error(err)
      }
    }

    // 调用hanshu
    getUsers()

    return () => {
      isMounted = false
      controller.abort() // 取消 pending 请求
    }
  }, [])
  return (
    <article>
      <h2>Users List</h2>
    </article>
  )
}

export default Users

import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const ChatLayout = () => {
  const { token } = useAuth()
  const [users, setUsers] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3001/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(res.data.data)
    }
    fetchUsers()
  }, [token])

  return (
    <div className="flex h-screen">
      {/* Left Panel: Users */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        {users.map((user: any) => (
          <div
            key={user._id}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
            onClick={() => navigate(`/home/${user._id}`)}
          >
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        ))}
      </div>

      {/* Right Panel: Chat Area */}
      <div className="w-2/3 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default ChatLayout

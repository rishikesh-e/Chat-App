import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem("userId")
    localStorage.removeItem("token")

    // Redirect to login
    navigate("/login")
  }, [navigate])

  return (
    <p>
        Logging out
    </p>
  )
}

export default Logout

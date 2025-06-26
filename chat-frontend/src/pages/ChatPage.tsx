import React, { useEffect, useState } from "react"
import socket from "../utils/socket"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

interface Message {
  _id: string
  chat: string
  sender: { name: string; email: string }
  content: string
  timestamp: string
}

interface Props {
  receiverId: string
}

const ChatPage = ({ receiverId }: Props) => {
  const { userId, token } = useAuth()
  const [chatId, setChatId] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")

  // Initialize socket and join
  useEffect(() => {
    if (userId) {
      socket.connect()
      socket.emit("join", userId)
    }

    return () => {
      socket.disconnect()
    }
  }, [userId])

  // Get or create chat between user and receiver
  useEffect(() => {
    const fetchChat = async () => {
      const res = await axios.post(
        "http://localhost:3001/api/chat",
        {
          userId1: userId,
          userId2: receiverId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setChatId(res.data._id)
    }

    if (userId && receiverId) fetchChat()
  }, [userId, receiverId, token])

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return
      const res = await axios.get(
        `http://localhost:3001/api/message/${chatId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessages(res.data)
    }

    fetchMessages()
  }, [chatId, token])

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive-message", (message: Message) => {
      if (message.chat === chatId) {
        setMessages(prev => [...prev, message])
      }
    })

    return () => {
      socket.off("receive-message")
    }
  }, [chatId])

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim()) return

    const payload = {
      chatId,
      senderId: userId,
      receiverId,
      content: newMessage,
    }

    // Send to backend + socket
    socket.emit("send-message", payload)

    setNewMessage("")
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="border rounded p-2 h-96 overflow-y-scroll bg-white shadow mb-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 ${
              msg.sender.email === userId ? "text-right" : "text-left"
            }`}
          >
            <span className="block font-medium">{msg.sender.name}</span>
            <span className="block">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPage

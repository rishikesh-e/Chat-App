import { useParams } from "react-router-dom"
import ChatPage from "./ChatPage"

const ChatPageWrapper = () => {
  const { receiverId } = useParams<{ receiverId: string }>()
  if (!receiverId) return <div>No receiver selected</div>
  return <ChatPage receiverId={receiverId} />
}

export default ChatPageWrapper
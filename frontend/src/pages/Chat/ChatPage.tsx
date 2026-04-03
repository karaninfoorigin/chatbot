import { useState, useEffect } from "react"
import Sidebar from "../../components/chat/Sidebar"
import ChatWindow from "../../components/chat/ChatWindow"
import { type Chat, type Message } from "../../utils/localStorage"
import { storage } from "../../utils/localStorage"

const mockChats: Chat[] = [
  { id: 1, name: "Karan" },
  { id: 2, name: "Abhay" },
  { id: 3, name: "Divyansh" },
]

export default function ChatPage() {
  const [chats] = useState<Chat[]>(mockChats)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messagesMap, setMessagesMap] = useState<Record<number, Message[]>>({})
  const [isMobileChatActive, setIsMobileChatActive] = useState(false)

  // Load all messages from localStorage on mount
  useEffect(() => {
    const savedMessages = storage.getAllMessages()
    setMessagesMap(savedMessages)
  }, [])

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    setIsMobileChatActive(true)
  }

  const handleCloseChat = () => {
    setSelectedChat(null)
    setIsMobileChatActive(false)
  }

  const handleSendMessage = (text: string) => {
    if (!selectedChat || !text.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    // Update local state
    setMessagesMap(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }))

    // Persist to localStorage
    storage.saveMessage(selectedChat.id, newMessage)
  }

  const currentMessages = selectedChat ? messagesMap[selectedChat.id] || [] : []

  return (
    <div className="h-screen flex overflow-hidden bg-[var(--bg-color)] transition-colors duration-300">
      {/* Sidebar */}
      <div
        className={`${
          isMobileChatActive ? "hidden" : "flex"
        } sm:flex w-full sm:w-[320px] md:w-[400px] border-r border-[var(--border-primary)]`}
      >
        <Sidebar 
          chats={chats} 
          selectedChat={selectedChat} 
          onSelectChat={handleSelectChat} 
        />
      </div>

      {/* Chat Window */}
      <div
        className={`${
          isMobileChatActive ? "flex" : "hidden"
        } sm:flex flex-1 bg-[var(--bg-color)]`}
      >
        {selectedChat ? (
          <ChatWindow 
            chat={selectedChat} 
            messages={currentMessages} 
            onClose={handleCloseChat}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="hidden sm:flex flex-col items-center justify-center w-full h-full text-[var(--text-secondary)]">
            <div className="w-[400px] text-center">
              <h2 className="text-3xl font-light text-[var(--text-primary)]">WhatsApp Web</h2>
              <p className="mt-4 text-sm text-[var(--text-secondary)]">
                Send and receive messages without keeping your phone online.
                <br />
                Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


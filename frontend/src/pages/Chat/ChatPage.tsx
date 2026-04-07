import { useEffect, useState } from "react"
import Sidebar from "../../components/chat/Sidebar"
import ChatWindow from "../../components/chat/ChatWindow"
import { type Chat, type Message } from "../../utils/localStorage"
import { storage } from "../../utils/localStorage"
import { getChats } from "../../utils/api/chat_api.ts"
import { getContacts } from "../../utils/api/contact_api.ts"
import "./ChatPage.css"

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messagesMap, setMessagesMap] = useState<Record<number, Message[]>>(storage.getAllMessages())
  const [isMobileChatActive, setIsMobileChatActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadUserData = async () => {
      const user = storage.getUser()
      if (!user?.phoneNumber) return

      try {
        const [chatResponse, contactResponse] = await Promise.all([
          getChats(user.phoneNumber),
          getContacts(user.phoneNumber),
        ])

        interface BackendChat {
          chat_id: number
          members?: Array<{ username?: string }>
          last_message?: { text?: string } | null
        }

        interface BackendContact {
          contact_id: number
          saved_name?: string
          username?: string
          phone_number?: string
        }

        const backendChats: Chat[] = Array.isArray(chatResponse?.data)
          ? (chatResponse.data as BackendChat[]).map((item) => ({
              id: item.chat_id,
              name: item.members?.[0]?.username || `Chat ${item.chat_id}`,
              lastMessage: item.last_message?.text || undefined,
            }))
          : []

        const backendContacts: Chat[] = Array.isArray(contactResponse?.data)
          ? (contactResponse.data as BackendContact[]).map((item) => ({
              id: item.contact_id,
              name: item.saved_name || item.username || item.phone_number || `Contact ${item.contact_id}`,
            }))
          : []

        const uniqueChats = [...backendContacts, ...backendChats].reduce<Chat[]>((acc, chat) => {
          if (!acc.some(item => item.id === chat.id)) acc.push(chat)
          return acc
        }, [])

        setChats(uniqueChats)
      } catch (err) {
        console.error("Failed to load chats or contacts", err)
      }
    }

    loadUserData()
  }, [])

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    setIsMobileChatActive(true)
    setSearchQuery("") // Clear search after selection
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

  const handleNewContact = (contact: Chat) => {
    setChats(prev => prev.some(item => item.id === contact.id) ? prev : [contact, ...prev])
  }

  return (
    <div className="chat-page h-screen flex overflow-hidden bg-[var(--bg-color)] transition-colors duration-300">
      <div className="chat-panel w-full">
        {/* Sidebar - Hidden on mobile when chat is active */}
        <div
          className={`${isMobileChatActive ? "hidden" : "flex"} sm:flex w-full sm:w-[320px] md:w-[400px] shadow-sm chat-sidebar`}
        >
          <Sidebar
            chats={filteredChats}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            onAddContact={handleNewContact}
          />
        </div>

        {/* Chat Window - Hidden on mobile when no chat is active */}
        <div
          className={`${isMobileChatActive ? "flex" : "hidden"} sm:flex flex-1 flex bg-[var(--bg-color)] chat-window-wrapper`}
        >
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              messages={currentMessages}
              onClose={handleCloseChat}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="hidden sm:flex flex-col items-center justify-center w-full h-full text-[var(--text-secondary)] chat-empty-state">
              <div className="w-full max-w-[420px] text-center px-6">
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
    </div>
  )
}

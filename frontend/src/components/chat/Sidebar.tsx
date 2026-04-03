import { FaPlus, FaMoon, FaSun } from "react-icons/fa"
import { useTheme } from "../../context/ThemeContext"
import type { Chat } from "../../utils/localStorage"

interface SidebarProps {
  chats: Chat[]
  selectedChat: Chat | null
  onSelectChat: (chat: Chat) => void
  searchQuery: string
  onSearch: (query: string) => void
}

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

const getAvatarColor = (name: string) => {
  const colors = ["#00a884", "#008069", "#1da1f2", "#712cf9", "#e01e5a", "#ecb22e"]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function Sidebar({ 
  chats, 
  selectedChat, 
  onSelectChat,
  searchQuery,
  onSearch
}: SidebarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col h-full w-full bg-[var(--card-bg)] border-r border-[var(--border-primary)] transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-3 h-[64px] bg-[var(--header-bg)] border-b border-[var(--border-primary)]">
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
          ME
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)] p-2 rounded-full transition-colors"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button className="text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)] p-2 rounded-full transition-colors">
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-2 border-b border-[var(--border-primary)]">
        <div className="bg-[var(--bg-color)] flex items-center px-3 py-1.5 rounded-lg border border-transparent focus-within:border-[var(--whatsapp-green)] transition-all">
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-sm w-full text-[var(--text-primary)]"
          />
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-8 text-center text-[var(--text-secondary)] text-sm">
            No chats found
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`flex items-center gap-3 p-3 cursor-pointer border-b border-[var(--border-primary)] transition-colors ${
                selectedChat?.id === chat.id
                  ? "bg-[var(--sidebar-active)]"
                  : "hover:bg-[var(--sidebar-hover)]"
              }`}
            >
              <div 
                className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-medium text-lg shadow-sm"
                style={{ backgroundColor: getAvatarColor(chat.name) }}
              >
                {getInitials(chat.name)}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium truncate text-[var(--text-primary)]">{chat.name}</span>
                  <span className="text-[11px] text-[var(--text-secondary)] font-medium">12:00 PM</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <div className="text-sm text-[var(--text-secondary)] truncate flex-1">
                    {chat.lastMessage || "Click to start chatting"}
                  </div>
                  {chat.id === 1 && (
                    <div className="bg-[var(--whatsapp-green)] text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold ml-2">
                      2
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

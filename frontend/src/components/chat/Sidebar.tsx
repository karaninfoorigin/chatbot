import { FaPlus, FaMoon, FaSun } from "react-icons/fa"
import { useTheme } from "../../context/ThemeContext"
import type { Chat } from "../../utils/localStorage"

interface SidebarProps {
  chats: Chat[]
  selectedChat: Chat | null
  onSelectChat: (chat: Chat) => void
}

export default function Sidebar({ chats, selectedChat, onSelectChat }: SidebarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col h-full w-full bg-[var(--card-bg)] border-r border-[var(--border-primary)] transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-3 h-[64px] bg-[var(--header-bg)] border-b border-[var(--border-primary)]">
        <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
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
        <div className="bg-[var(--bg-color)] flex items-center px-3 py-1.5 rounded-lg">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent border-none focus:outline-none text-sm w-full text-[var(--text-primary)]"
          />
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`flex items-center gap-3 p-3 cursor-pointer border-b border-[var(--border-primary)] transition-colors ${
              selectedChat?.id === chat.id
                ? "bg-[var(--sidebar-active)]"
                : "hover:bg-[var(--sidebar-hover)]"
            }`}
          >
            <div className="w-12 h-12 bg-[var(--bg-color)] rounded-full flex-shrink-0"></div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between">
                <span className="font-medium truncate text-[var(--text-primary)]">{chat.name}</span>
                <span className="text-xs text-[var(--text-secondary)]">12:00</span>
              </div>
              <div className="text-sm text-[var(--text-secondary)] truncate">
                {chat.lastMessage || "Click to start chatting"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
import { useState } from "react"
import { FaPlus, FaMoon, FaSun } from "react-icons/fa"
import { toast } from "react-toastify"
import { useTheme } from "../../context/ThemeContext"
import { addContact } from "../../utils/api/contact_api"
import { storage } from "../../utils/localStorage"
import { validatePhone } from "../../utils/validations/telValidation"
import type { Chat } from "../../utils/localStorage"
import { useUser } from "../../context/UserContext"
interface SidebarProps {
  chats: Chat[]
  selectedChat: Chat | null
  onSelectChat: (chat: Chat) => void
  searchQuery: string
  onSearch: (query: string) => void
  onAddContact?: (chat: Chat) => void
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
  onSearch,
  onAddContact
}: SidebarProps) {
  const { theme, setTheme } = useTheme()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [contactPhone, setContactPhone] = useState("")
  const [contactName, setContactName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
const {user} = useUser()
  const handleCreateContact = async () => {
    if (!validatePhone(contactPhone)) {
      toast.error("Enter a valid 10-digit phone number")
      return
    }

    const user = storage.getUser()
    if (!user?.phoneNumber) {
      toast.error("Please sign in to add contacts")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await addContact({
        owner_phone: user.phoneNumber,
        contact_phone: contactPhone,
        saved_name: contactName || undefined,
      })

      const contactData = response?.data
      if (contactData) {
        toast.success("Contact added successfully")
        onAddContact?.({
          id: contactData.contact_id,
          name: contactData.saved_name || contactPhone,
        })
        setContactPhone("")
        setContactName("")
        setIsAddOpen(false)
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err?.response?.data?.detail || err?.message || "Failed to add contact")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-[var(--card-bg)] border-r border-[var(--border-primary)] transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col gap-2 p-3 bg-[var(--header-bg)] border-b border-[var(--border-primary)]">
        <div className="flex justify-between items-center h-[64px]">
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user ? user.phone_number : 'Me'}
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)] p-2 rounded-full transition-colors"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            <button
              onClick={() => setIsAddOpen(prev => !prev)}
              className="text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)] p-2 rounded-full transition-colors"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {isAddOpen && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--text-primary)]">Add contact</div>
            <div className="grid gap-2">
              <input
                type="tel"
                value={contactPhone}
                maxLength={10}
                onChange={(e) => setContactPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Phone number"
                className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--card-bg)] px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--whatsapp-green)]"
              />
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Save as (optional)"
                className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--card-bg)] px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--whatsapp-green)]"
              />
              <button
                type="button"
                onClick={handleCreateContact}
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[var(--whatsapp-green)] px-3 py-2 text-white font-semibold transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Adding..." : "Add contact"}
              </button>
            </div>
          </div>
        )}
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


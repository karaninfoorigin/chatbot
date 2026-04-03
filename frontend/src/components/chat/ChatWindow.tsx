import { useEffect, useRef } from "react"
import { ArrowLeft, MoreVertical, Search } from "lucide-react"
import type { Chat, Message } from "../../utils/localStorage"
import MessageInput from "./MessageInput"
import MessageBubble from "./MessageBubble"

interface ChatWindowProps {
  chat: Chat
  messages: Message[]
  onClose: () => void
  onSendMessage: (text: string) => void
}

export default function ChatWindow({ chat, messages, onClose, onSendMessage }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-color)] transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-3 h-[64px] bg-[var(--header-bg)] border-b border-[var(--border-primary)]">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="sm:hidden text-[var(--text-secondary)] p-2 -ml-2 hover:bg-[var(--sidebar-hover)] rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-[var(--border-primary)] rounded-full flex-shrink-0"></div>
          <div className="flex flex-col">
            <span className="font-medium text-[var(--text-primary)] leading-none">
              {chat.name}
            </span>
            <span className="text-xs text-[var(--text-secondary)] mt-1 uppercase">online</span>
          </div>
        </div>

        <div className="flex gap-4 text-[var(--text-secondary)]">
          <button className="hover:bg-[var(--sidebar-hover)] p-2 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="hover:bg-[var(--sidebar-hover)] p-2 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  )
}
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
    <div className="flex flex-col h-full w-full bg-[var(--bg-color)] transition-colors duration-300 relative">
      {/* Header */}
      <div className="flex justify-between items-center p-3 h-[64px] bg-[var(--header-bg)] border-b border-[var(--border-primary)] z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="sm:hidden text-[var(--text-secondary)] p-2 -ml-2 hover:bg-[var(--sidebar-hover)] rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-[var(--border-primary)] rounded-full flex-shrink-0"></div>
          <div className="flex flex-col">
            <span className="font-semibold text-[var(--text-primary)] text-[15.5px] leading-tight">
              {chat.name}
            </span>
            <span className="text-[11.5px] text-[var(--text-secondary)] mt-0.5 font-medium tracking-wide">ONLINE</span>
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

      {/* Messages Area with Doodle Background */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5 relative">
        {/* Subtle Doodle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none dark:opacity-[0.08]"
          style={{ 
            backgroundImage: `url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`,
            backgroundRepeat: "repeat",
            backgroundSize: "400px"
          }}
        />
        
        {/* Actual Message Bubbles */}
        <div className="relative">
          {messages.map((msg, index) => {
            const nextMsg = messages[index + 1]
            const isLastOfGroup = !nextMsg || nextMsg.sender !== msg.sender
            
            return (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                isLastOfGroup={isLastOfGroup}
              />
            )
          })}
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  )
}
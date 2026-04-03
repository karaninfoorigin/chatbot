import { CheckCheck } from "lucide-react"
import type { Message } from "../../utils/localStorage"

interface MessageBubbleProps {
  message: Message
  isLastOfGroup?: boolean
}

export default function MessageBubble({ message, isLastOfGroup = true }: MessageBubbleProps) {
  const isMe = message.sender === "me"

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-[2px] px-2 relative`}>
      <div
        className={`max-w-[85%] min-w-[60px] px-2 py-1.5 rounded-lg shadow-sm text-[14.2px] relative transition-colors duration-300 ${
          isMe
            ? `bg-[var(--message-me)] text-[var(--text-primary)] ${isLastOfGroup ? "rounded-tr-none" : ""}`
            : `bg-[var(--message-other)] text-[var(--text-primary)] ${isLastOfGroup ? "rounded-tl-none" : ""}`
        }`}
      >
        {/* Professional tail using standard CSS triangle */}
        {isLastOfGroup && (
          <div 
            className={`absolute top-0 w-2 h-2 ${isMe ? "-right-[6px]" : "-left-[6px]"}`}
            style={{ 
              width: 0,
              height: 0,
              borderTop: `8px solid ${isMe ? "var(--message-me)" : "var(--message-other)"}`,
              borderRight: isMe ? "8px solid transparent" : "none",
              borderLeft: isMe ? "none" : "8px solid transparent"
            }}
          />
        )}

        {/* Message Content Container */}
        <div className="relative pb-1 pr-12">
          <p className="whitespace-pre-wrap break-words leading-[19px]">{message.text}</p>
          
          {/* Metadata: Always in the bottom corner */}
          <div className="absolute right-[-4px] bottom-[-2px] flex items-center gap-1 h-[15px] select-none">
            <span className="text-[10px] text-[var(--text-secondary)] opacity-70 whitespace-nowrap">
              {message.timestamp}
            </span>
            {isMe && (
              <CheckCheck size={14} className="text-[#53bdeb]" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


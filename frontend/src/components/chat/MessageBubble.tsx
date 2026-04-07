import { CheckCheck } from "lucide-react"
import type { Message } from "../../utils/localStorage"

interface MessageBubbleProps {
  message: Message
  isLastOfGroup?: boolean
}

export default function MessageBubble({ message, isLastOfGroup = true }: MessageBubbleProps) {
  const isMe = message.sender === "me"

  return (
    <div className={`bubble-container ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`message-bubble ${isMe ? "bubble-me" : "bubble-other"} ${
          isLastOfGroup ? "has-tail" : ""
        } flex flex-col min-h-0 w-fit`}
      >
        {/* Message Text */}
        <div className="relative pr-[62px] min-h-[20px]">
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
          
          {/* Metadata: Fixed at the bottom right */}
          <div className="absolute right-[-4px] bottom-[-4px] flex items-center gap-1 h-[15px] select-none scale-[0.85] origin-right">
            <span className="text-[11px] text-[var(--text-secondary)] opacity-80 whitespace-nowrap font-medium">
              {message.timestamp}
            </span>
            {isMe && (
              <CheckCheck size={16} className="text-[#53bdeb]" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}




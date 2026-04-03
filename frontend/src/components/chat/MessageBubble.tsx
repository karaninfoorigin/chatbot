import type { Message } from "../../utils/localStorage"

export default function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === "me"

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}>
      <div
        className={`max-w-[85%] px-3 py-1.5 rounded-lg shadow-sm text-[14.5px] relative transition-colors duration-300 ${
          isMe
            ? "bg-[var(--message-me)] text-[var(--text-primary)] rounded-tr-none"
            : "bg-[var(--message-other)] text-[var(--text-primary)] rounded-tl-none"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <div className="flex justify-end mt-1 h-3">
          <span className="text-[11px] text-[var(--text-secondary)]">
            12:00 PM
          </span>
        </div>
      </div>
    </div>
  )
}

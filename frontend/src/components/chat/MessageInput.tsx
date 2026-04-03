import { useState } from "react"
import { Send, Smile, Paperclip } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (text: string) => void
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return

    onSendMessage(input)
    setInput("")
  }

  return (
    <div className="p-3 flex items-center gap-2 bg-[var(--header-bg)] border-t border-[var(--border-primary)] transition-colors duration-300">
      <div className="flex items-center gap-1.5 text-[var(--text-secondary)] px-1">
        <button className="hover:text-[var(--text-primary)] transition-colors p-1.5 rounded-full hover:bg-[var(--sidebar-hover)]">
          <Smile size={24} strokeWidth={1.5} />
        </button>
        <button className="hover:text-[var(--text-primary)] transition-colors p-1.5 rounded-full hover:bg-[var(--sidebar-hover)]">
          <Paperclip size={24} strokeWidth={1.5} className="rotate-[45deg]" />
        </button>
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 py-2.5 px-4 rounded-lg bg-[var(--card-bg)] text-[var(--text-primary)] text-[15px] focus:outline-none transition-colors border border-transparent focus:border-[var(--border-primary)] shadow-sm"
        placeholder="Type a message"
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <div className="flex items-center px-1">
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className={`p-2 rounded-full transition-all duration-200 ${
            input.trim()
              ? "text-[var(--whatsapp-green)] bg-[var(--sidebar-hover)] scale-110"
              : "text-[var(--text-secondary)] opacity-50"
          }`}
        >
          <Send size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
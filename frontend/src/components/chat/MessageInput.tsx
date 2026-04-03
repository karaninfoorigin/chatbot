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
    <div className="p-2.5 flex items-center gap-2 bg-[var(--header-bg)] border-t border-[var(--border-primary)] transition-colors duration-300">
      <div className="flex gap-2 text-[var(--text-secondary)] px-2">
        <button className="hover:text-[var(--text-primary)] transition-colors">
          <Smile size={24} />
        </button>
        <button className="hover:text-[var(--text-primary)] transition-colors">
          <Paperclip size={24} />
        </button>
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2.5 px-4 rounded-lg bg-[var(--input-bg)] text-[var(--text-primary)] text-sm focus:outline-none transition-colors"
        placeholder="Type a message"
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button
        onClick={sendMessage}
        disabled={!input.trim()}
        className={`p-2 rounded-full transition-colors ${
          input.trim()
            ? "text-[var(--whatsapp-green)] cursor-pointer"
            : "text-[var(--text-secondary)] cursor-default"
        }`}
      >
        <Send size={24} />
      </button>
    </div>
  )
}

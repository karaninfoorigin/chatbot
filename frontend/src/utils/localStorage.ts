export interface Message {
  id: number
  text: string
  sender: "me" | "other"
  timestamp: string
}

export interface Chat {
  id: number
  name: string
  lastMessage?: string
}

const STORAGE_KEYS = {
  USER: "chat_user",
  MESSAGES: "chat_messages",
}

export const storage = {
  getUser: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER)
    return data ? JSON.parse(data) : null
  },

  setUser: (user: { phoneNumber: string; id?: number }) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER)
  },

  getMessages: (chatId: number): Message[] => {
    const allMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    if (!allMessages) return []
    const parsed = JSON.parse(allMessages)
    return parsed[chatId] || []
  },

  saveMessage: (chatId: number, message: Message) => {
    const allMessagesStr = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    const allMessages = allMessagesStr ? JSON.parse(allMessagesStr) : {}
    
    if (!allMessages[chatId]) {
      allMessages[chatId] = []
    }
    
    allMessages[chatId].push(message)
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(allMessages))
  },

  getAllMessages: () => {
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    return data ? JSON.parse(data) : {}
  }
}

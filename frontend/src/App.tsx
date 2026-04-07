import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ChatPage from "./pages/Chat/ChatPage"
import SignIn from "./pages/Signin/SignIn"
import { storage } from "./utils/localStorage"
import Homepage from './pages/homepage/Homepage'
import './App.css'

function App() {
  const [user, setUser] = useState<{ phoneNumber: string } | null>(null)
  const [loading, setLoading] = useState(true)

  // Initial load from storage
  useEffect(() => {
    const savedUser = storage.getUser()
    setUser(savedUser)
    setLoading(false)
  }, [])

  const handleSignIn = (phoneNumber: string) => {
    const newUser = { phoneNumber }
    storage.setUser(newUser)
    setUser(newUser)
  }

  if (loading) return null

  return (
    <BrowserRouter>
      <div className="app-container">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route 
            path="/sign-in" 
            element={<SignIn  />} 
          />
          <Route 
            path="/chats" 
            element={ <ChatPage /> } 
          />
          {/* <Route path="*" element={<Navigate to={user ? "/chat" : "/sign-in"} />} /> */}
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
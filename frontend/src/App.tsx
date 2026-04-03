import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import ChatPage from "./pages/Chat/ChatPage"
import SignIn from "./pages/Signin/SignIn"
import { storage } from "./utils/localStorage"
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import Homepage from './pages/homepage/Homepage';


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
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route 
          path="/sign-in" 
          element={user ? <Navigate to="/chat" /> : <SignIn onSignIn={handleSignIn} />} 
        />
        <Route 
          path="/chat" 
          element={user ? <ChatPage /> : <Navigate to="/sign-in" />} 
        />
        <Route path="*" element={<Navigate to={user ? "/chat" : "/sign-in"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
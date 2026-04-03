import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MessageSquare } from "lucide-react"
import "./SignIn.css"

interface SignInProps {
  onSignIn: (phoneNumber: string) => void
}

const SignIn = ({ onSignIn }: SignInProps) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const navigate = useNavigate()

  const handleSignIn = () => {
    if (phoneNumber.trim().length === 10) {
      onSignIn("+91" + phoneNumber)
      navigate("/chat")
    } else {
      alert("Please enter a valid 10-digit phone number.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 10) {
      setPhoneNumber(value)
    }
  }

  return (
    <div className="signin-container">
      {/* Branding Header Section */}
      <div className="signin-header-content">
        <MessageSquare className="logo-icon text-white" size={32} fill="#ffffff" strokeWidth={1} />
        <span className="logo-text">WHATSAPP WEB</span>
      </div>

      {/* Main Sign-in Card */}
      <div className="signin-card shadow-lg animate-in fade-in duration-500">
        <div className="signin-form-wrapper">
          <h1 className="signin-welcome">To use WhatsApp on your computer:</h1>
          
          <div className="info-list">
            <p>1. Enter your phone number below</p>
            <p className="text-muted">2. Tap Continue to proceed</p>
          </div>

          <div className="phone-input-section mt-12">
            <label className="phone-label">Phone Number</label>
            <div className="phone-input-group mt-2">
              <span className="country-code">+91</span>
              <input
                type="tel"
                placeholder=""
                value={phoneNumber}
                onChange={handleChange}
                className="phone-field"
                autoFocus
              />
            </div>
          </div>

          <div className="mt-12">
            <button 
              className={`signin-btn ${phoneNumber.length === 10 ? "active" : ""}`} 
              onClick={handleSignIn}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
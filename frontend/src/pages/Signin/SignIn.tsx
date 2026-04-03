import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MessageSquare } from "lucide-react"
import "./SignIn.css"
import { useNavigate } from "react-router-dom"
import { signin } from "../../utils/api/signin_api"
import { useState } from "react"
import { validatePhone } from "../../utils/validations/telValidation"
import { toast } from "react-toastify"
const response = {
   success: true,
        status: 201,
        message: "Logged In Successfully",
        data: "03-04-2026",
}
const SignIn = () => {
  const [phone, setPhone] = useState("");
const navigate = useNavigate();

const handleSignIn = async () => {
  if (!phone) {
    toast.error("Phone number is required");
    return;
  }

  if (!validatePhone(phone)) {
    toast.error("Enter a valid 10-digit phone number");
    return;
  }

  try {
    const response = await signin({ phone });

    if (response?.status === 201) {
      alert(response.message);
      navigate("/chats");
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.error(err);
  }
};

  return (
    <div className="signin-container">
      <div className="signin-card">

        <h2 className="signin-title">Sign in to Chat</h2>

        <div className="signin-form">
          <label>Phone Number</label>

          <div className="phone-input">
            <span>+91</span>
          <input
  type="tel"
  placeholder="Enter phone number"
  value={phone}
  onChange={(e) => {
    setPhone(e.target.value);
   
  }}
/>
          </div>

          <button className="signin-btn" onClick={()=>handleSignIn()}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
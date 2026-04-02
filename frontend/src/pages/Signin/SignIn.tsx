import "./SignIn.css"

const SignIn = () => {
  return (
    <div className="signin-container">
      <div className="signin-card">

        <h2 className="signin-title">Sign in to Chat</h2>

        <div className="signin-form">
          <label>Phone Number</label>

          <div className="phone-input">
            <span>+91</span>
            <input type="tel" placeholder="Enter phone number" />
          </div>

          <button className="signin-btn">Continue</button>
        </div>

      </div>
    </div>
  )
}

export default SignIn
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { signin } from "../../utils/api/signin_api";
import { useState } from "react";
import { validatePhone } from "../../utils/validations/telValidation";
import { toast } from "react-toastify";
import { WaIcon } from "../../components/svg/svgs";
import { LockIcon } from "lucide-react";
import { BoltIcon } from "lucide-react";
import { GlobeIcon } from "lucide-react";
import { ArrowIcon } from "../../components/svg/svgs";
import { InfoIcon } from "../../components/svg/svgs";

// ── SignIn ────────────────────────────────────────────────────
const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await signin({ phone });
      if (response?.status === 201) {
        toast.success(response.message);
        navigate("/chats");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSignIn();
  };

  return (
    <div className="signin-page">

      {/* ── LEFT PANEL ── */}
      <div className="signin-left">
        <div className="sl-orb sl-orb-1" />
        <div className="sl-orb sl-orb-2" />
        <div className="sl-grid" />

        <div className="signin-left-content">
          <div className="sl-logo"><WaIcon /></div>

          <h1 className="sl-headline">
            Chat without<br />
            <span className="accent">limits.</span>
          </h1>

          <p className="sl-sub">
            Connect with anyone, anywhere — free calls,
            messages and more, all protected by end-to-end encryption.
          </p>

          <div className="sl-pills">
            <div className="sl-pill">
              <div className="sl-pill-icon" style={{ background: "rgba(37,211,102,0.12)" }}>
                <LockIcon />
              </div>
              <div className="sl-pill-text">
                <div className="sl-pill-title">End-to-End Encrypted</div>
                <div className="sl-pill-sub">Only you can read your messages</div>
              </div>
            </div>
            <div className="sl-pill">
              <div className="sl-pill-icon" style={{ background: "rgba(0,168,255,0.12)" }}>
                <BoltIcon />
              </div>
              <div className="sl-pill-text">
                <div className="sl-pill-title">Instant Delivery</div>
                <div className="sl-pill-sub">Messages arrive in milliseconds</div>
              </div>
            </div>
            <div className="sl-pill">
              <div className="sl-pill-icon" style={{ background: "rgba(253,203,110,0.14)" }}>
                <GlobeIcon />
              </div>
              <div className="sl-pill-text">
                <div className="sl-pill-title">Works Everywhere</div>
                <div className="sl-pill-sub">Available in 180+ countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="signin-right">
        <div className="signin-card">

          {/* Card header */}
          <div className="signin-card-header">
            <div className="signin-card-icon"><WaIcon /></div>
            <h2 className="signin-title">Welcome back</h2>
            <p className="signin-subtitle">
              Enter your phone number to sign in<br />or create a new account
            </p>
          </div>

          {/* Form */}
          <div className="signin-form">
            <div className="signin-field">
              <label className="signin-label">Phone Number</label>
              <div className="phone-input">
                <div className="phone-prefix">
                  <span className="flag-emoji">🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
              <div className="signin-helper">
                <InfoIcon />
                <span>We'll send a verification code to confirm your number.</span>
              </div>
            </div>

            <button
              className="signin-btn"
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <>Verifying…</>
              ) : (
                <>
                  Continue
                  <ArrowIcon />
                </>
              )}
            </button>

          
          </div>

        </div>
      </div>

    </div>
  );
};

export default SignIn;
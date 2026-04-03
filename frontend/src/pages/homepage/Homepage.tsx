
import "./homepage.css";
import { WaIcon } from "../../components/svg/svgs";
import { SendIcon } from "../../components/svg/svgs";
import { LockIcon } from "../../components/svg/svgs";
import { GlobeIcon } from "../../components/svg/svgs";
import { VideoIcon } from "../../components/svg/svgs";
import { GroupIcon } from "../../components/svg/svgs";
import { DevicesIcon } from "../../components/svg/svgs";
import { StorageIcon } from "../../components/svg/svgs";
import { TwitterIcon } from "../../components/svg/svgs";
import { InstagramIcon } from "../../components/svg/svgs";
import { FacebookIcon } from "../../components/svg/svgs";
import { QRCodeVisual } from "../../components/svg/svgs";
import { useNavigate } from "react-router-dom";


// ── Phone Mockup ──────────────────────────────────────────────
const PhoneMockup = ({ msgs, name, initials, color, status, side }) => (
  <div className={`phone-mockup ${side ? "side" : "center"}`}>
    <div className="phone-notch"><div className="phone-notch-pill" /></div>
    <div className="phone-chat-header">
      <div className="phone-avatar" style={{ background: color }}>{initials}</div>
      <div className="phone-chat-info">
        <div className="phone-chat-name">{name}</div>
        <div className="phone-chat-status">{status}</div>
      </div>
    </div>
    <div className="phone-messages">
      {msgs.map((m, i) => (
        <div key={i} className={`phone-msg ${m.type}`}>
          {m.text}
          <div className="phone-msg-time">{m.time}</div>
        </div>
      ))}
    </div>
    <div className="phone-input-bar">
      <div className="phone-input-field">Type a message</div>
      <div className="phone-send-btn">
        <SendIcon />
      </div>
    </div>
  </div>
);

// ── Homepage ──────────────────────────────────────────────────
const Homepage = () => {
    const navigate = useNavigate();
  const features = [
    {
      icon: <LockIcon />,
      title: "End-to-End Encrypted",
      desc: "Your messages are secured with end-to-end encryption. Only you and the person you're messaging can read them — nobody else.",
    },
    {
      icon: <VideoIcon />,
      title: "HD Video & Voice Calls",
      desc: "Make free HD voice and video calls to anyone, anywhere in the world. Group calls support up to 32 participants.",
    },
    {
      icon: <GroupIcon />,
      title: "Groups & Communities",
      desc: "Stay connected with family, friends, and colleagues. Create groups, share updates, and build communities that matter.",
    },
    {
      icon: <GlobeIcon />,
      title: "Works Anywhere",
      desc: "Available on iOS, Android, and the web. Your messages sync seamlessly across all your devices in real time.",
    },
    {
      icon: <StorageIcon />,
      title: "Share Anything",
      desc: "Send photos, videos, documents, voice messages, locations, and contacts — all without losing quality.",
    },
    {
      icon: <DevicesIcon />,
      title: "Multi-Device Support",
      desc: "Use Let's Talk on up to 4 linked devices simultaneously, even if your phone has no internet connection.",
    },
  ];

  const steps = [
    { num: "1", title: "Download the app", desc: "Get Let's Talk on your phone from the App Store or Google Play — it's free." },
    { num: "2", title: "Verify your number", desc: "Enter your phone number and verify with the 6-digit code we send you via SMS." },
    { num: "3", title: "Start messaging", desc: "Your contacts who use Let's Talk are automatically shown. Start chatting instantly." },
    { num: "4", title: "Use on the web", desc: "Scan the QR code at web.Let's Talk.com to continue chatting on your computer." },
  ];

  return (
    <div className="homepage-landing">
      {/* ── NAV ── */}
      <nav className="lp-nav">
        <a href="#" className="lp-nav-logo">
          <WaIcon />
          <span>Let's Talk</span>
        </a>
        <ul className="lp-nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#download">Download</a></li>
          <li><a href="#">Business</a></li>
        </ul>
        <div className="lp-nav-cta">
          <button className="btn-ghost" onClick={() => navigate("/sign-in")}>Log in</button>
         
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>2 billion+ people worldwide</span>
          </div>
          <h1 className="hero-headline">
            Simple. Reliable.<br />
            <span className="accent">Private messaging.</span>
          </h1>
          <p className="hero-sub">
            Send messages, make calls, and share — all protected by end-to-end encryption.
            Free to use, on any device.
          </p>
          <div className="hero-actions">
            
            <a href="#features" className="btn-hero-secondary">Explore features</a>
          </div>
        </div>

        {/* Phone Mockups */}
        <div className="hero-visual">
          <div className="phone-mockup-wrap" style={{ position: "relative" }}>
            <PhoneMockup
              side
              name="Arjun"
              initials="A"
              color="#6c5ce7"
              status="online"
              msgs={[
                { type: "in", text: "Are you coming tonight?", time: "8:42 PM" },
                { type: "out", text: "Yes! See you at 9 🙌", time: "8:43 PM" },
              ]}
            />
            <div style={{ position: "relative" }}>
              <PhoneMockup
                name="Priya"
                initials="P"
                color="#e74c8b"
                status="online"
                msgs={[
                  { type: "in", text: "Hey! Got your package 📦", time: "10:31 AM" },
                  { type: "out", text: "Amazing, let me know how you like it!", time: "10:32 AM" },
                  { type: "in", text: "Love it already 😍 Thank you so much", time: "10:33 AM" },
                ]}
              />
              {/* Floating badges */}
              <div className="floating-badge fb-1">
                <div className="fb-icon" style={{ background: "#dcfce7" }}>🔒</div>
                <div className="fb-text">
                  <div className="fb-title">End-to-End Encrypted</div>
                  <div className="fb-sub">Messages are secure</div>
                </div>
              </div>
              <div className="floating-badge fb-2">
                <div className="fb-icon" style={{ background: "#dbeafe" }}>📱</div>
                <div className="fb-text">
                  <div className="fb-title">2B+ Active Users</div>
                  <div className="fb-sub">Worldwide</div>
                </div>
              </div>
            </div>
            <PhoneMockup
              side
              name="Dev Team"
              initials="DT"
              color="#0984e3"
              status="3 members"
              msgs={[
                { type: "in", text: "Build deployed ✅", time: "3:12 PM" },
                { type: "out", text: "Nice work everyone 🚀", time: "3:14 PM" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="lp-stats">
        {[
          { num: "2B+", label: "Monthly active users" },
          { num: "100B+", label: "Messages sent daily" },
          { num: "180+", label: "Countries supported" },
          { num: "100%", label: "End-to-end encrypted" },
        ].map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-number">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-features" id="features">
        <div className="section-header">
          <div className="section-tag">Features</div>
          <h2 className="section-title">Everything you need<br />to stay connected</h2>
          <p className="section-sub">
            Let's Talk is built to be fast, reliable, and deeply private — no matter where you are.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-how" id="how">
        <div className="hero-orb hero-orb-1" style={{ opacity: 0.4 }} />
        <div className="how-grid">
          <div className="how-steps">
            <div className="section-header">
              <div className="section-tag">How it works</div>
              <h2 className="section-title">Up and running<br />in minutes</h2>
              <p className="section-sub">Getting started is effortless — no account needed beyond your phone number.</p>
            </div>
            {steps.map((s) => (
              <div className="step-item" key={s.num}>
                <div className="step-num">{s.num}</div>
                <div className="step-text">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="how-visual">
            <div className="qr-card">
              <div className="qr-box">
                <QRCodeVisual />
                <div className="qr-logo-overlay">
                  <WaIcon />
                </div>
              </div>
              <h4>Let's Talk Web</h4>
              <p>Scan with your phone to open Let's Talk on your browser instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="footer-brand-logo">
              <WaIcon />
              <span>Let's Talk</span>
            </a>
            <p>Simple, reliable, private messaging and calling — available worldwide, free to use.</p>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Let's Talk Web</a></li>
              <li><a href="#">Let's Talk Business</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Let's Talk Clone. Made with ❤️</p>
          <div className="footer-social">
            <a href="#" className="social-icon"><TwitterIcon /></a>
            <a href="#" className="social-icon"><InstagramIcon /></a>
            <a href="#" className="social-icon"><FacebookIcon /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
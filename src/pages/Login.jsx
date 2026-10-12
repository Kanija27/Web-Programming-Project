import React, { useState } from "react";

export default function Login({ onLogin, onSignup, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    let accounts = {};
    try { accounts = JSON.parse(localStorage.getItem("resumeiq_accounts") || "{}"); } catch { accounts = {}; }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError("Enter a valid email address."); return;
    }
    if (!password) { setError("Enter your password."); return; }
    const account = accounts[normalizedEmail];
    if (account && account.password !== password) {
      setError("That password does not match this account."); return;
    }
    // Preserve the existing front-end demo flow: an email can also sign in without a stored account.
    const user = { name: account?.name || normalizedEmail.split("@")[0], email: normalizedEmail };
    localStorage.setItem("resumeiq_user", JSON.stringify(user));
    onLogin(user);
  }

  return (
    <div className="auth-screen">
      <div className="auth-glow auth-glow-one" /><div className="auth-glow auth-glow-two" />
      <button className="auth-back-link" onClick={onBack}>← Back to home</button>
      <div className="auth-brand"><div className="brand-mark">R</div><div><strong>ResumeIQ</strong><span>CAREER INTELLIGENCE</span></div></div>
      <div className="auth-layout auth-single-layout">
        <section className="auth-pitch">
          <div className="hero-kicker">YOUR CAREER, IN FOCUS</div>
          <h1>Welcome <span>back.</span></h1>
          <p>Pick up where you left off. Your resume tools, career suggestions, interview practice, and roadmap are ready.</p>
          <div className="auth-feature-list"><div><span>✓</span><div><strong>Resume intelligence</strong><small>Review strengths and areas to improve.</small></div></div><div><span>✦</span><div><strong>Career direction</strong><small>Explore roles and practical next steps.</small></div></div><div><span>◉</span><div><strong>Interview practice</strong><small>Prepare with guided answer feedback.</small></div></div></div>
          <div className="auth-credit">Developed by Kanija Hussain</div>
        </section>
        <section className="auth-card">
          <div className="auth-card-top"><span className="auth-eyebrow">WELCOME BACK</span><div className="auth-lock">✦</div></div>
          <h2>Sign in to ResumeIQ</h2>
          <p className="auth-subtitle">Enter your details to continue to your career workspace.</p>
          <form className="auth-form" onSubmit={submit}>
            <label>Email address<input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
            <label>Password<div className="password-wrap"><input type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required /><button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? "Hide" : "Show"}</button></div></label>
            {error && <div className="auth-error" role="alert">{error}</div>}
            <button className="primary-button auth-submit" type="submit">Sign in to ResumeIQ <span>→</span></button>
          </form>
          <p className="auth-demo-note">This is a front-end demo sign-in. Account details are stored only in this browser.</p>
          <p className="auth-switch-note">New to ResumeIQ? <button onClick={onSignup}>Create an account</button></p>
        </section>
      </div>
      <div className="auth-bottom"><span>ResumeIQ <span className="footer-dot">•</span> Career intelligence workspace</span><span>Designed to help you prepare, improve, and grow.</span></div>
    </div>
  );
}

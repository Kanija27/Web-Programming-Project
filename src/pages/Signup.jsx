import React, { useState } from "react";

export default function Signup({ onSignup, onLogin, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim()) { setError("Enter your name to create an account."); return; }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Use a password with at least 6 characters."); return; }
    if (password !== confirmPassword) { setError("Your passwords do not match."); return; }
    let accounts = {};
    try { accounts = JSON.parse(localStorage.getItem("resumeiq_accounts") || "{}"); } catch { accounts = {}; }
    if (accounts[normalizedEmail]) { setError("An account with this email already exists. Please sign in."); return; }
    accounts[normalizedEmail] = { name: name.trim(), password };
    localStorage.setItem("resumeiq_accounts", JSON.stringify(accounts));
    const user = { name: name.trim(), email: normalizedEmail };
    localStorage.setItem("resumeiq_user", JSON.stringify(user));
    onSignup(user);
  }

  return (
    <div className="auth-screen">
      <div className="auth-glow auth-glow-one" /><div className="auth-glow auth-glow-two" />
      <button className="auth-back-link" onClick={onBack}>← Back to home</button>
      <div className="auth-brand"><div className="brand-mark">R</div><div><strong>ResumeIQ</strong><span>CAREER INTELLIGENCE</span></div></div>
      <div className="auth-layout auth-single-layout">
        <section className="auth-pitch">
          <div className="hero-kicker">START YOUR JOURNEY</div>
          <h1>Make your next move <span>count.</span></h1>
          <p>Create your workspace and bring resume building, career discovery, and interview preparation together.</p>
          <div className="auth-feature-list"><div><span>✓</span><div><strong>Build a stronger resume</strong><small>Use templates and practical feedback.</small></div></div><div><span>✦</span><div><strong>Find your direction</strong><small>Match skills to roles and learning steps.</small></div></div><div><span>◉</span><div><strong>Prepare with purpose</strong><small>Practise and improve over time.</small></div></div></div>
          <div className="auth-credit">Developed by Kanija Hussain</div>
        </section>
        <section className="auth-card">
          <div className="auth-card-top"><span className="auth-eyebrow">CREATE YOUR WORKSPACE</span><div className="auth-lock">✦</div></div>
          <h2>Create your account</h2>
          <p className="auth-subtitle">A few details to get started with ResumeIQ.</p>
          <form className="auth-form" onSubmit={submit}>
            <label>Your name<input autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" required /></label>
            <label>Email address<input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
            <label>Password<div className="password-wrap"><input type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} required /><button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? "Hide" : "Show"}</button></div></label>
            <label>Confirm password<input type="password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Enter your password again" required /></label>
            {error && <div className="auth-error" role="alert">{error}</div>}
            <button className="primary-button auth-submit" type="submit">Create my account <span>→</span></button>
          </form>
          <p className="auth-demo-note">Demo accounts are stored in this browser only; this is not production-secure authentication.</p>
          <p className="auth-switch-note">Already have an account? <button onClick={onLogin}>Sign in</button></p>
        </section>
      </div>
      <div className="auth-bottom"><span>ResumeIQ <span className="footer-dot">•</span> Career intelligence workspace</span><span>Designed to help you prepare, improve, and grow.</span></div>
    </div>
  );
}

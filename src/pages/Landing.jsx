import React from "react";

export default function Landing({ onLogin, onSignup }) {
  return (
    <div className="landing-screen">
      <div className="landing-glow landing-glow-one" />
      <div className="landing-glow landing-glow-two" />
      <header className="landing-nav">
        <div className="auth-brand"><div className="brand-mark">R</div><div><strong>ResumeIQ</strong><span>CAREER INTELLIGENCE</span></div></div>
        <div className="landing-nav-actions">
          <button className="landing-login-link" onClick={onLogin}>Sign in</button>
          <button className="primary-button landing-get-started" onClick={onSignup}>Get Started <span>→</span></button>
        </div>
      </header>

      <main className="landing-content">
        <div className="hero-kicker">✦ YOUR CAREER, IN FOCUS</div>
        <h1>Your next chapter<br /><span>starts with ResumeIQ.</span></h1>
        <p>Build a stronger resume, discover roles that fit your skills, practise interviews, and create a roadmap to your dream career — all in one workspace.</p>
        <div className="landing-cta-row">
          <button className="primary-button landing-primary-cta" onClick={onSignup}>Get Started Free <span>→</span></button>
          <button className="landing-secondary-cta" onClick={onLogin}>I already have an account</button>
        </div>

        <div className="landing-feature-preview">
          <div className="landing-preview-heading"><div><span className="eyebrow">YOUR CAREER WORKSPACE</span><h2>Everything you need to move forward.</h2></div><span className="preview-live"><i /> Ready to grow</span></div>
          <div className="landing-feature-grid">
            <article><span className="landing-feature-icon">⌕</span><strong>ATS Resume Analyzer</strong><p>Review resume strengths and find areas to improve.</p></article>
            <article><span className="landing-feature-icon">▤</span><strong>Resume Builder</strong><p>Create a polished resume with professional templates.</p></article>
            <article><span className="landing-feature-icon">⌘</span><strong>Job Matching</strong><p>Explore career roles based on your skills.</p></article>
            <article><span className="landing-feature-icon">✦</span><strong>Career Roadmap</strong><p>Turn your career goal into practical learning steps.</p></article>
          </div>
        </div>
      </main>
      <footer className="landing-footer"><span>ResumeIQ <b>•</b> Career intelligence workspace</span><span>Developed by Kanija Hussain</span></footer>
    </div>
  );
}

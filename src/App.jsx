import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const SKILL_CATALOG = [
  "JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS",
  "Python", "Java", "C", "C++", "SQL", "MySQL", "MongoDB", "Node.js", "Express",
  "FastAPI", "REST API", "Git", "GitHub", "Docker", "AWS", "Linux", "Excel",
  "Power BI", "Machine Learning", "Data Analysis", "Figma", "UI/UX", "Canva",
  "Communication", "Teamwork", "Problem Solving", "Data Structures", "Testing"
];

const TEMPLATES = [
  { id: "modern", name: "Modern", desc: "Clean, balanced, and contemporary", color: "#8b5cf6" },
  { id: "classic", name: "Classic", desc: "Traditional professional layout", color: "#64748b" },
  { id: "minimal", name: "Minimal", desc: "Simple, readable, and ATS-friendly", color: "#0f766e" },
  { id: "creative", name: "Creative", desc: "A bold style for design roles", color: "#db2777" },
  { id: "executive", name: "Executive", desc: "Polished layout for professional roles", color: "#b7791f" }
];

const CAREER_PROFILES = [
  { role: "Frontend Developer", skills: ["JavaScript", "TypeScript", "React", "HTML", "CSS", "Next.js", "Tailwind CSS"], companies: ["Zoho", "Freshworks", "Accenture", "TCS"], description: "Build responsive websites and interactive user interfaces." },
  { role: "Backend Developer", skills: ["Python", "Java", "Node.js", "Express", "FastAPI", "REST API", "SQL", "MongoDB", "MySQL"], companies: ["Zoho", "Freshworks", "Infosys", "Wipro"], description: "Develop APIs, server-side logic, and database integrations." },
  { role: "Full-Stack Developer", skills: ["JavaScript", "React", "HTML", "CSS", "Node.js", "Express", "REST API", "MongoDB", "SQL"], companies: ["Freshworks", "Zoho", "Accenture", "TCS"], description: "Work across frontend interfaces, backend services, and databases." },
  { role: "Data Analyst", skills: ["SQL", "Python", "Excel", "MySQL", "Power BI", "Data Analysis", "Communication"], companies: ["Deloitte", "Accenture", "Infosys", "TCS"], description: "Analyze data, identify patterns, and communicate useful insights." },
  { role: "UI/UX Designer", skills: ["Figma", "UI/UX", "Canva", "Communication", "Teamwork"], companies: ["Zoho", "Freshworks", "Accenture", "Cognizant"], description: "Design accessible, intuitive user experiences and interfaces." },
  { role: "Software Engineer", skills: ["Java", "Python", "C++", "C", "Data Structures", "Git", "SQL", "Testing"], companies: ["TCS", "Infosys", "Wipro", "Accenture"], description: "Develop, test, debug, and maintain software applications." },
  { role: "Cloud / DevOps Associate", skills: ["AWS", "Docker", "Git", "Linux", "Python"], companies: ["Accenture", "TCS", "Infosys", "Cognizant"], description: "Support deployments, infrastructure, automation, and cloud services." },
  { role: "Machine Learning Associate", skills: ["Python", "Machine Learning", "SQL", "Data Structures", "Data Analysis"], companies: ["Accenture", "TCS", "Infosys", "Deloitte"], description: "Work with data and machine-learning workflows." }
];

const INTERVIEW_BANK = {
  General: [
    { q: "Tell me about yourself.", keywords: ["education", "skills", "experience", "project", "goal"], sample: "I am a motivated student with a foundation in technology and problem-solving. I have worked on projects that helped me practise my technical and teamwork skills. I am looking for an opportunity to learn, contribute, and grow professionally." },
    { q: "What is one strength you bring to a team?", keywords: ["communication", "teamwork", "problem", "adapt", "listen"], sample: "One of my strengths is working collaboratively. I listen to different viewpoints, communicate clearly, and break a problem into manageable tasks. This helps the team make progress while learning from one another." },
    { q: "Describe a challenge you faced and how you handled it.", keywords: ["challenge", "analyze", "solution", "learn", "result"], sample: "I first clarified the problem, divided it into smaller parts, and researched possible solutions. I tested my approach, asked for feedback when needed, and used the result to improve my process." },
    { q: "Why should we hire you?", keywords: ["skills", "learn", "contribute", "team", "responsibility"], sample: "I bring a willingness to learn, a responsible attitude, and a foundation in relevant skills. I take feedback seriously, work well with others, and aim to contribute while continuously improving." }
  ],
  Frontend: [
    { q: "What is the difference between HTML, CSS, and JavaScript?", keywords: ["structure", "style", "behavior", "interaction"], sample: "HTML defines the structure and meaning of a page, CSS controls its presentation and layout, and JavaScript adds behaviour and interaction." },
    { q: "What is React and why is it useful?", keywords: ["library", "component", "ui", "state", "reusable"], sample: "React is a JavaScript library for building user interfaces. It encourages reusable components and uses state and props to update the UI when data changes." },
    { q: "What is responsive web design?", keywords: ["screen", "device", "media", "flexible", "layout"], sample: "Responsive design makes a website adapt to different screen sizes. It uses flexible layouts, responsive units, and media queries to provide a usable experience on mobile, tablet, and desktop." }
  ],
  Backend: [
    { q: "What is an API?", keywords: ["interface", "communicate", "request", "response", "systems"], sample: "An API is a defined interface that lets software systems communicate. A client sends a request to an endpoint, and the server returns a response, often using JSON over HTTP." },
    { q: "What is the difference between SQL and NoSQL databases?", keywords: ["relational", "tables", "schema", "document", "flexible"], sample: "SQL databases commonly store structured data in related tables with a defined schema. NoSQL databases support models such as documents or key-value records and can offer more flexible data structures." },
    { q: "What is authentication?", keywords: ["identity", "verify", "credentials", "token", "user"], sample: "Authentication verifies who a user is, commonly through credentials or a sign-in provider. A system may issue a session or token after successful verification." }
  ],
  "Data Analyst": [
    { q: "What is the difference between data and information?", keywords: ["raw", "processed", "context", "decision"], sample: "Data is a collection of raw facts. Information is data that has been processed and given context so it can support understanding and decisions." },
    { q: "Why is data cleaning important?", keywords: ["missing", "duplicate", "inaccurate", "quality", "reliable"], sample: "Data cleaning identifies and handles missing values, duplicates, inconsistent formats, and inaccurate records. It improves data quality so the analysis is more reliable." },
    { q: "How would you explain a chart to a non-technical person?", keywords: ["trend", "simple", "context", "insight", "audience"], sample: "I would state the main trend in plain language, explain the time period and units, point out an important comparison, and describe what the finding may mean without overstating the evidence." }
  ]
};

function getSkills(text = "") {
  const normalized = text.toLowerCase();
  return SKILL_CATALOG.filter((skill) => {
    const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`, "i").test(normalized);
  });
}

function recommendCareers(foundSkills = []) {
  const normalized = foundSkills.map((s) => s.toLowerCase());
  return CAREER_PROFILES.map((profile) => {
    const matchedSkills = profile.skills.filter((s) => normalized.includes(s.toLowerCase()));
    const missingSkills = profile.skills.filter((s) => !normalized.includes(s.toLowerCase()));
    return { ...profile, matchedSkills, missingSkills, matchScore: Math.round((matchedSkills.length / profile.skills.length) * 100) };
  }).filter((p) => p.matchedSkills.length > 0).sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);
}

function scoreResume(text, skills) {
  const sections = [
    ["Contact details", /@|email|phone|linkedin|github/i.test(text)],
    ["Professional summary", /summary|objective|profile/i.test(text)],
    ["Education", /education|degree|university|college|bachelor|master/i.test(text)],
    ["Experience", /experience|internship|employment|worked at/i.test(text)],
    ["Projects", /projects|project/i.test(text)],
    ["Skills", /skills|technologies|technical/i.test(text)]
  ];
  const sectionScore = sections.filter((s) => s[1]).length / sections.length * 45;
  const skillScore = Math.min(skills.length / 10, 1) * 25;
  const lengthScore = Math.min(text.trim().split(/\s+/).filter(Boolean).length / 350, 1) * 20;
  const actionScore = /developed|built|created|designed|implemented|improved|managed|analyzed/i.test(text) ? 10 : 0;
  const score = Math.round(Math.min(100, sectionScore + skillScore + lengthScore + actionScore));
  return { score, sections, suggestions: [
    ...(!sections[0][1] ? ["Add professional contact details, including email and relevant portfolio links."] : []),
    ...(!sections[1][1] ? ["Add a short professional summary tailored to the role."] : []),
    ...(!sections[2][1] ? ["Include your education, qualification, institution, and graduation date."] : []),
    ...(!sections[3][1] ? ["Add relevant internships, work experience, volunteering, or practical experience."] : []),
    ...(!sections[4][1] ? ["Add 2–3 projects with your role, tools used, and measurable outcomes where possible."] : []),
    ...(skills.length < 5 ? ["Include relevant technical and transferable skills using terms from the target job description."] : []),
    ...(!/developed|built|created|designed|implemented|improved|managed|analyzed/i.test(text) ? ["Use specific action verbs to explain what you accomplished."] : []),
    ...(text.trim().split(/\s+/).filter(Boolean).length < 150 ? ["Add more relevant details to show evidence of your skills and results."] : [])
  ] };
}

async function readFileAsText(file) {
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    try {
      // Load PDF.js only when a PDF is selected, keeping the initial app bundle lighter.
      const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs");
      const workerUrl = (await import("pdfjs-dist/build/pdf.worker.mjs?url")).default;
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const pages = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
      }
      const extractedText = pages.join("\n\n").trim();
      if (!extractedText) {
        throw new Error("No selectable text was found in this PDF. If it is a scanned image, use a text-based PDF or upload a .txt file.");
      }
      return extractedText;
    } catch (error) {
      if (error instanceof Error && (error.message.includes("No selectable text") || error.message.includes("scanned image"))) throw error;
      console.error("PDF extraction failed:", error);
      throw new Error("Could not extract text from this PDF. Try another PDF or save the resume as a .txt file.");
    }
  }

  if (!/\.(txt|text)$/i.test(file.name) && file.type !== "text/plain") {
    throw new Error("Please upload a PDF or TXT file.");
  }
  const text = await file.text();
  if (!text.trim()) throw new Error("This file is empty. Please choose a resume with text.");
  return text;
}

function downloadText(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function App() {
  const [authUser, setAuthUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("resumeiq_user") || "null"); } catch { return null; }
  });
  const [authScreen, setAuthScreen] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [page, setPage] = useState("dashboard");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("resumeiq_history") || "[]"); } catch { return []; }
  });
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", location: "", title: "", summary: "", education: "", experience: "", projects: "", skills: "" });
  const [template, setTemplate] = useState("modern");
  const [interviewCategory, setInterviewCategory] = useState("General");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [interviewFeedback, setInterviewFeedback] = useState(null);
  const [showSample, setShowSample] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);
  const resumeInputRef = useRef(null);

  const skills = useMemo(() => getSkills(resumeText), [resumeText]);
  const careerRecommendations = useMemo(() => recommendCareers(skills), [skills]);
  const questions = INTERVIEW_BANK[interviewCategory] || INTERVIEW_BANK.General;
  const currentQuestion = questions[questionIndex % questions.length];

  useEffect(() => {
    localStorage.setItem("resumeiq_history", JSON.stringify(history.slice(0, 20)));
  }, [history]);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  function runAnalysis() {
    setError("");
    if (!resumeText.trim()) {
      setError("Add your resume text or upload a .txt file before analyzing.");
      return;
    }
    const foundSkills = getSkills(resumeText);
    const result = scoreResume(resumeText, foundSkills);
    const record = { id: Date.now(), date: new Date().toLocaleString(), score: result.score, skills: foundSkills, text: resumeText.slice(0, 5000), suggestions: result.suggestions };
    setAnalysis({ ...result, foundSkills, date: record.date });
    setHistory((old) => [record, ...old].slice(0, 20));
  }

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    try {
      const text = await readFileAsText(file);
      setResumeText(text);
    } catch (e) {
      setError(e.message || "Could not read the file.");
    } finally {
      event.target.value = "";
    }
  }

  function compareJob() {
    if (!resumeText.trim()) {
      setError("Add your resume text first.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Paste a job description to compare your resume.");
      return;
    }
    const resumeSkills = getSkills(resumeText);
    const jobSkills = getSkills(jobDescription);
    const matched = jobSkills.filter((s) => resumeSkills.some((r) => r.toLowerCase() === s.toLowerCase()));
    const missing = jobSkills.filter((s) => !matched.some((m) => m.toLowerCase() === s.toLowerCase()));
    setAnalysis((old) => ({ ...(old || scoreResume(resumeText, resumeSkills)), jobMatch: { score: jobSkills.length ? Math.round(matched.length / jobSkills.length * 100) : 0, matched, missing, total: jobSkills.length } }));
    setError("");
  }

  function stopVoiceAnswer() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }

  function startVoiceAnswer() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Voice input is not supported in this browser. Please type your answer.");
      return;
    }
    setError("");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript + " ";
      setPracticeAnswer(transcript.trim());
      setInterviewFeedback(null);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setError("Voice input failed. Check microphone permission or type your answer.");
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    try {
      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
      setError("The microphone could not start. Please try again.");
    }
  }

  function evaluatePracticeAnswer() {
    const answer = practiceAnswer.trim();
    if (!answer) {
      setError("Type or speak an answer before checking it.");
      return;
    }
    const normalized = answer.toLowerCase();
    const terms = currentQuestion.keywords || [];
    const matched = terms.filter((term) => normalized.includes(term.toLowerCase()));
    const length = answer.split(/\s+/).filter(Boolean).length;
    const score = Math.min(100, Math.round((matched.length / Math.max(terms.length, 1)) * 65 + (length >= 35 ? 20 : length >= 15 ? 12 : length >= 7 ? 6 : 0) + (/[.!?]/.test(answer) ? 5 : 0) + (/\b(for example|such as|because|therefore|resulted in)\b/i.test(answer) ? 10 : 0)));
    const suggestions = [];
    if (length < 15) suggestions.push("Expand your answer with more detail and context.");
    if (matched.length < Math.min(3, terms.length)) suggestions.push("Cover more key ideas related to the question.");
    if (!/\b(for example|such as|when I|I worked|I built|I created|I learned)\b/i.test(answer)) suggestions.push("Add a concrete example from a project, class, or experience.");
    if (!/\b(result|learned|improved|impact|outcome)\b/i.test(answer)) suggestions.push("Finish by explaining the result, impact, or what you learned.");
    if (!suggestions.length) suggestions.push("Good structure. Practise saying it naturally and keep the answer specific.");
    setInterviewFeedback({ score, matched, suggestions, wordCount: length });
    setShowSample(false);
    setError("");
  }

  function nextQuestion() {
    setQuestionIndex((i) => (i + 1) % questions.length);
    setPracticeAnswer("");
    setInterviewFeedback(null);
    setShowSample(false);
    setError("");
    stopVoiceAnswer();
  }

  function resetInterview() {
    stopVoiceAnswer();
    setQuestionIndex(0);
    setPracticeAnswer("");
    setInterviewFeedback(null);
    setShowSample(false);
    setError("");
  }

  function buildResumeText() {
    return `${profile.name || "Your Name"}\n${[profile.email, profile.phone, profile.location].filter(Boolean).join(" | ")}\n${profile.title}\n\nPROFESSIONAL SUMMARY\n${profile.summary}\n\nSKILLS\n${profile.skills}\n\nEXPERIENCE\n${profile.experience}\n\nPROJECTS\n${profile.projects}\n\nEDUCATION\n${profile.education}`;
  }

  function exportResume() {
    const content = buildResumeText();
    downloadText("ResumeIQ-Resume.txt", content);
  }

  function loadHistory(item) {
    setResumeText(item.text || "");
    setAnalysis({ score: item.score, foundSkills: item.skills || [], suggestions: item.suggestions || [], sections: [], date: item.date });
    setPage("analyzer");
  }

  function handleAuthSubmit(event) {
    event.preventDefault();
    setAuthError("");
    const email = authEmail.trim().toLowerCase();
    if (!email || !authPassword.trim()) {
      setAuthError("Enter your email address and password to continue.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setAuthError("Enter a valid email address.");
      return;
    }
    if (authPassword.length < 6) {
      setAuthError("Use a password with at least 6 characters.");
      return;
    }
    const savedAccounts = (() => {
      try { return JSON.parse(localStorage.getItem("resumeiq_accounts") || "{}"); } catch { return {}; }
    })();
    if (authMode === "signup") {
      if (!authName.trim()) {
        setAuthError("Enter your name to create your account.");
        return;
      }
      if (savedAccounts[email]) {
        setAuthError("An account with this email already exists. Please sign in.");
        setAuthMode("login");
        return;
      }
      savedAccounts[email] = { name: authName.trim(), password: authPassword };
      localStorage.setItem("resumeiq_accounts", JSON.stringify(savedAccounts));
    } else if (savedAccounts[email] && savedAccounts[email].password !== authPassword) {
      setAuthError("That password doesn't match this local demo account.");
      return;
    }
    const user = { name: savedAccounts[email]?.name || authName.trim() || email.split("@")[0], email };
    localStorage.setItem("resumeiq_user", JSON.stringify(user));
    setAuthUser(user);
    setAuthPassword("");
    setPage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("resumeiq_user");
    setAuthUser(null);
    setAuthMode("login");
    setAuthScreen("login");
    setAuthEmail("");
    setAuthPassword("");
    setAuthError("");
  }

  const navItems = [
    { id: "dashboard", label: "Overview", icon: "◫" },
    { id: "analyzer", label: "ATS Analyzer", icon: "⌕" },
    { id: "builder", label: "Resume Builder", icon: "▤" },
    { id: "jobs", label: "Job Matching", icon: "⌘" },
    { id: "interview", label: "Mock Interview", icon: "◉" },
    { id: "history", label: "Analysis History", icon: "↺" }
  ];

  if (!authUser) {
    const handleAuthenticated = (user) => {
      setAuthUser(user);
      setAuthPassword("");
      setAuthError("");
      setPage("dashboard");
    };

    if (authScreen === "login") {
      return <Login onLogin={handleAuthenticated} onSignup={() => setAuthScreen("signup")} onBack={() => setAuthScreen("landing")} />;
    }
    if (authScreen === "signup") {
      return <Signup onSignup={handleAuthenticated} onLogin={() => setAuthScreen("login")} onBack={() => setAuthScreen("landing")} />;
    }
    return <Landing onLogin={() => setAuthScreen("login")} onSignup={() => setAuthScreen("signup")} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">R</div><div><strong>ResumeIQ</strong><span>CAREER INTELLIGENCE</span></div></div>
        <div className="side-label">WORKSPACE</div>
        <nav>{navItems.map((item) => <button key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => { setPage(item.id); setError(""); }}><span className="nav-icon">{item.icon}</span>{item.label}</button>)}</nav>
        <div className="sidebar-bottom"><div className="upgrade-card"><div className="sparkle">✦</div><strong>Your next opportunity starts here.</strong><p>Make every application count with a clearer resume.</p><button onClick={() => setPage("analyzer")}>Analyze resume <span>↗</span></button></div><div className="user-mini"><div className="avatar">{(authUser.name || "U").charAt(0).toUpperCase()}</div><div className="user-mini-copy"><strong>{authUser.name || "ResumeIQ User"}</strong><span>{authUser.email || "Personal workspace"}</span></div><button className="logout-button" title="Sign out" onClick={handleLogout}>↪</button></div></div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{navItems.find((n) => n.id === page)?.label || "Overview"}</strong></div><div className="top-actions"><span className="status-dot"></span><span className="saved-label">Local workspace</span><button className="icon-button" title="Go to dashboard" onClick={() => setPage("dashboard")}>⌂</button></div></header>
        <div className="page-content">
          {error && <div className="error-banner"><span>!</span>{error}<button onClick={() => setError("")}>×</button></div>}

          {page === "dashboard" && <section>
            <div className="welcome-row"><div><div className="eyebrow">YOUR CAREER, IN FOCUS</div><h1>Make your next move <span>count.</span></h1><p className="subheading">Turn your experience into a resume that tells a stronger story.</p></div><div className="date-chip">✦ &nbsp; ResumeIQ workspace</div></div>
            <div className="hero-card"><div className="hero-copy"><div className="hero-kicker">CAREER READINESS SUITE</div><h2>A stronger resume.<br /><span>A clearer direction.</span></h2><p>Review your resume, discover roles that fit your skills, and practise interviews with guided feedback.</p><div className="hero-buttons"><button className="primary-button" onClick={() => setPage("analyzer")}>Analyze my resume <span>→</span></button><button className="ghost-button light" onClick={() => setPage("builder")}>Build a resume</button></div></div><div className="hero-art"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="hero-document"><div className="doc-top"><span></span><span></span><span></span></div><div className="doc-avatar"></div><div className="doc-line long"></div><div className="doc-line medium"></div><div className="doc-section-line"></div><div className="doc-line"></div><div className="doc-line long"></div><div className="doc-line short"></div><div className="doc-section-line"></div><div className="doc-line medium"></div><div className="doc-line long"></div><div className="doc-badge">✓ ATS READY</div></div><div className="floating-score"><span>RESUME SCORE</span><strong>{analysis?.score ?? "—"}<small>{analysis ? "/100" : " /100"}</small></strong><div className="score-bars"><i></i><i></i><i></i><i></i><i></i></div></div><div className="floating-star">✦</div></div></div>
            <div className="section-heading"><div><h2>Your toolkit</h2><p>Everything you need to move forward.</p></div><span className="small-muted">01 — 06</span></div>
            <div className="tool-grid">
              <ToolCard icon="⌕" tint="purple" title="ATS Resume Analyzer" description="Check resume structure, skills, and improvement opportunities." onClick={() => setPage("analyzer")} tag="START HERE" />
              <ToolCard icon="▤" tint="blue" title="Resume Builder" description="Create a polished resume with five professional layouts." onClick={() => setPage("builder")} />
              <ToolCard icon="⌘" tint="green" title="Job Matching" description="Find role ideas and compare skills with a job description." onClick={() => setPage("jobs")} />
              <ToolCard icon="◉" tint="orange" title="Mock Interview" description="Practise answers and receive structured, instant feedback." onClick={() => setPage("interview")} />
            </div>
            <div className="bottom-grid"><div className="panel history-panel"><div className="panel-heading"><div><h3>Recent analyses</h3><p>Your latest resume checks</p></div><button className="text-button" onClick={() => setPage("history")}>View history ↗</button></div>{history.length ? history.slice(0, 3).map((item) => <button className="history-row" key={item.id} onClick={() => loadHistory(item)}><div className="history-file">▤</div><div className="history-info"><strong>Resume analysis</strong><span>{item.date}</span></div><div className="mini-score">{item.score}<small>/100</small></div><span className="row-arrow">↗</span></button>) : <div className="empty-state"><div className="empty-icon">⌕</div><strong>No analyses yet</strong><p>Run your first resume analysis to see your history here.</p><button className="text-button" onClick={() => setPage("analyzer")}>Analyze a resume →</button></div>}</div><div className="panel quick-panel"><div className="panel-heading"><div><h3>Quick start</h3><p>Pick up where you need help</p></div><span className="quick-spark">✦</span></div><button className="quick-link" onClick={() => setPage("analyzer")}><span className="quick-icon purple">↗</span><span><strong>Improve my resume</strong><small>Get actionable suggestions</small></span><b>→</b></button><button className="quick-link" onClick={() => setPage("jobs")}><span className="quick-icon green">⌘</span><span><strong>Explore career paths</strong><small>Find roles based on your skills</small></span><b>→</b></button><button className="quick-link" onClick={() => setPage("interview")}><span className="quick-icon orange">◉</span><span><strong>Practise interviews</strong><small>Build confidence answering questions</small></span><b>→</b></button></div></div>
            <p className="disclaimer">ResumeIQ provides heuristic guidance for learning and preparation. Scores are estimates, not official ATS results or hiring guarantees.</p>
          </section>}

          {page === "analyzer" && <section>
            <PageIntro eyebrow="RESUME INTELLIGENCE" title={<>ATS Resume <span>Analyzer</span></>} description="Review your resume content, identify important sections, and discover practical improvements." />
            <div className="workspace-grid"><div className="panel editor-panel"><div className="panel-heading"><div><h3>Resume content</h3><p>Paste your resume text or upload a .txt file.</p></div><button className="secondary-button" onClick={() => resumeInputRef.current?.click()}>↑ Upload file</button><input ref={resumeInputRef} type="file" accept=".txt,.text,.pdf" hidden onChange={handleFile} /></div><textarea className="large-textarea resume-input" value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder={"Paste your resume here...\n\nInclude your summary, education, experience, projects, and skills for a more useful review."} /><div className="textarea-footer"><span>{resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0} words</span><button className="text-button" onClick={() => { setResumeText(""); setAnalysis(null); }}>Clear content</button></div><button className="primary-button full-button" onClick={runAnalysis}>Analyze resume <span>→</span></button><p className="helper-text">Privacy note: this demo stores recent analysis history in your browser's local storage.</p></div><div className="panel analyzer-side"><div className="panel-heading"><div><h3>What you'll get</h3><p>A practical starting point</p></div><span className="side-spark">✦</span></div><FeatureRow icon="◷" title="Resume readiness score" text="A rough content-completeness indicator." /><FeatureRow icon="▤" title="Section checklist" text="See which common resume sections were detected." /><FeatureRow icon="⌕" title="Skills detected" text="Find recognized skills in your resume text." /><FeatureRow icon="✦" title="Improvement ideas" text="Get next steps to strengthen your resume." /><div className="hint-box"><strong>For better results</strong><p>Use clear section headings and tailor your resume to the role you want.</p></div></div></div>
            {analysis && <div className="results-layout"><div className="panel score-panel"><div className="panel-heading"><div><h3>Analysis overview</h3><p>Updated {analysis.date || "just now"}</p></div><span className="result-label">ANALYSIS COMPLETE</span></div><div className="score-content"><div className="score-ring" style={{ "--score": `${analysis.score}%` }}><div><strong>{analysis.score}</strong><span>out of 100</span></div></div><div className="score-summary"><h2>{analysis.score >= 75 ? "Good foundation" : analysis.score >= 50 ? "Room to improve" : "Let's strengthen it"}</h2><p>This score estimates content completeness using section presence, length, and recognized skills. It is not an official ATS score.</p><div className="score-meta"><span>Recognized skills</span><strong>{analysis.foundSkills?.length ?? skills.length}</strong></div><div className="score-meta"><span>Suggested improvements</span><strong>{analysis.suggestions?.length ?? 0}</strong></div></div></div></div><div className="panel"><div className="panel-heading"><div><h3>Section checklist</h3><p>Common sections detected in the text</p></div></div><div className="section-checklist">{(analysis.sections || []).map(([name, ok]) => <div className="check-row" key={name}><span className={ok ? "check-ok" : "check-missing"}>{ok ? "✓" : "!"}</span><span>{name}</span><strong>{ok ? "Detected" : "Not detected"}</strong></div>)}</div></div><div className="panel"><div className="panel-heading"><div><h3>Recognized skills</h3><p>Skills detected using a built-in keyword list</p></div></div><div className="skill-chip-list">{(analysis.foundSkills || skills).length ? (analysis.foundSkills || skills).map((s) => <span className="skill-chip" key={s}>{s}</span>) : <p className="muted">No listed skills were detected. Try using common skill names in your resume.</p>}</div></div><div className="panel"><div className="panel-heading"><div><h3>Recommended improvements</h3><p>Prioritize the suggestions most relevant to your target role</p></div></div><div className="suggestion-list">{(analysis.suggestions || []).length ? analysis.suggestions.map((s, i) => <div className="suggestion-row" key={s}><span>{String(i + 1).padStart(2, "0")}</span><p>{s}</p></div>) : <p className="muted">No additional suggestions from this checklist.</p>}</div></div></div>}
          </section>}

          {page === "builder" && <section>
            <PageIntro eyebrow="RESUME STUDIO" title={<>Build your next <span>chapter.</span></>} description="Fill in your details, choose a layout, and export a text copy of your resume." />
            <div className="template-grid">{TEMPLATES.map((t) => <button key={t.id} className={`template-card ${template === t.id ? "selected" : ""}`} onClick={() => setTemplate(t.id)}><div className={`template-thumb thumb-${t.id}`}><div className="thumb-header" style={{ background: t.color }}></div><div className="thumb-title"></div><div className="thumb-line"></div><div className="thumb-section"></div><div className="thumb-line"></div><div className="thumb-line short"></div><div className="thumb-section"></div><div className="thumb-line"></div><div className="thumb-line short"></div></div><div className="template-meta"><span><strong>{t.name}</strong><small>{t.desc}</small></span><span className={`radio-dot ${template === t.id ? "checked" : ""}`}>{template === t.id ? "✓" : ""}</span></div></button>)}</div>
            <div className="builder-layout"><div className="panel builder-form"><div className="panel-heading"><div><h3>Your information</h3><p>Only add details you want to include.</p></div><span className="step-pill">EDIT RESUME</span></div><div className="form-grid"><FormField label="Full name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} placeholder="Your full name" /><FormField label="Professional title" value={profile.title} onChange={(v) => setProfile({ ...profile, title: v })} placeholder="e.g. Frontend Developer" /><FormField label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} placeholder="you@example.com" /><FormField label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} placeholder="Phone number" /><FormField label="Location" value={profile.location} onChange={(v) => setProfile({ ...profile, location: v })} placeholder="City, country" /><div className="field full"><label>Professional summary</label><textarea value={profile.summary} onChange={(e) => setProfile({ ...profile, summary: e.target.value })} placeholder="Write 2–4 lines about your strengths and goals." /></div><div className="field full"><label>Skills</label><textarea value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} placeholder="JavaScript, React, communication..." /></div><div className="field full"><label>Experience / internships</label><textarea value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })} placeholder="Role, organization, dates, responsibilities, achievements." /></div><div className="field full"><label>Projects</label><textarea value={profile.projects} onChange={(e) => setProfile({ ...profile, projects: e.target.value })} placeholder="Project name, tools used, what you built, and results." /></div><div className="field full"><label>Education</label><textarea value={profile.education} onChange={(e) => setProfile({ ...profile, education: e.target.value })} placeholder="Degree, institution, graduation year, relevant coursework." /></div></div><button className="primary-button full-button" onClick={exportResume}>Export resume as .txt <span>↓</span></button><p className="helper-text">For PDF export, open the print dialog in your browser and choose “Save as PDF”.</p></div><div className="preview-column"><div className="preview-header"><span>LIVE PREVIEW</span><button className="text-button" onClick={() => window.print()}>Print / Save PDF ↗</button></div><ResumePreview profile={profile} template={template} /></div></div>
          </section>}

          {page === "jobs" && <section>
            <PageIntro eyebrow="CAREER DISCOVERY" title={<>Find roles that fit <span>you.</span></>} description="Explore role ideas from skills detected in your resume, then compare your experience with a job description." />
            <div className="panel job-input-panel"><div className="panel-heading"><div><h3>Compare with a job description</h3><p>Paste a role's requirements to identify matching and missing skills.</p></div><span className="job-icon">⌘</span></div><div className="job-compare-grid"><div><label className="input-label">Your resume</label><div className="resume-status"><span className={resumeText.trim() ? "status-check" : "status-empty"}>{resumeText.trim() ? "✓" : "+"}</span><span><strong>{resumeText.trim() ? "Resume text added" : "No resume added yet"}</strong><small>{resumeText.trim() ? `${getSkills(resumeText).length} recognized skills found` : "Paste your resume below or in ATS Analyzer"}</small></span><button className="text-button" onClick={() => setPage("analyzer")}>{resumeText.trim() ? "Edit" : "Add resume"} ↗</button></div></div><div><label className="input-label">Target job description</label><textarea className="job-description-input" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste job responsibilities, qualifications, and required skills..." /></div></div><button className="primary-button" onClick={compareJob}>Compare skills <span>→</span></button>{analysis?.jobMatch && <div className="job-match-result"><div className="match-score-circle"><strong>{analysis.jobMatch.score}%</strong><span>keyword overlap</span></div><div className="match-details"><h3>{analysis.jobMatch.score >= 70 ? "Strong keyword overlap" : analysis.jobMatch.score >= 40 ? "Some skills align" : "Opportunity to tailor your resume"}</h3><p>Compared recognized skills in the resume and job description. This is a keyword estimate, not a hiring prediction.</p><div className="match-columns"><div><strong className="green-text">Matching skills ({analysis.jobMatch.matched.length})</strong><div className="skill-chip-list">{analysis.jobMatch.matched.length ? analysis.jobMatch.matched.map((s) => <span className="skill-chip good" key={s}>{s}</span>) : <span className="muted">No matching catalog skills detected.</span>}</div></div><div><strong className="orange-text">Skills to develop ({analysis.jobMatch.missing.length})</strong><div className="skill-chip-list">{analysis.jobMatch.missing.length ? analysis.jobMatch.missing.map((s) => <span className="skill-chip missing" key={s}>{s}</span>) : <span className="muted">No missing catalog skills detected.</span>}</div></div></div></div></div>}</div>
            <div className="section-heading"><div><h2>Suggested career paths</h2><p>Based on recognized skills in your resume.</p></div><span className="small-muted">{careerRecommendations.length} ROLE IDEAS</span></div>
            {!resumeText.trim() ? <div className="panel empty-careers"><div className="empty-icon">⌘</div><h3>Start with your resume</h3><p>Add resume text to get role suggestions and see which skills align with each path.</p><button className="primary-button" onClick={() => setPage("analyzer")}>Add resume text →</button></div> : careerRecommendations.length ? <div className="career-card-grid">{careerRecommendations.map((career) => <div className="career-card" key={career.role}><div className="career-card-top"><div><span className="role-label">CAREER PATH</span><h3>{career.role}</h3></div><div className="career-match-score">{career.matchScore}%<small>skill fit</small></div></div><p>{career.description}</p><div className="career-skill-heading">Skills you have</div><div className="skill-chip-list">{career.matchedSkills.map((s) => <span className="skill-chip good" key={s}>{s}</span>)}</div><div className="career-skill-heading">Skills to consider learning</div><div className="skill-chip-list">{career.missingSkills.slice(0, 4).map((s) => <span className="skill-chip missing" key={s}>{s}</span>)}</div><div className="career-company-heading">Example employers</div><div className="career-company-list">{career.companies.map((c) => <span key={c}>{c}</span>)}</div><button className="career-action" onClick={() => { setJobDescription(`${career.role}\n${career.description}\nRequired skills: ${career.skills.join(", ")}`); setAnalysis((old) => old ? { ...old, jobMatch: null } : old); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Compare this role <span>→</span></button></div>)}</div> : <div className="panel empty-careers"><h3>No role matches found yet</h3><p>Add common skill names such as React, Python, SQL, Figma, or Excel to your resume text.</p></div>}
            <p className="disclaimer">Career suggestions are illustrative. Employer names are examples of organizations that may hire for related roles; no live vacancies are verified.</p>
          </section>}

          {page === "interview" && <section>
            <PageIntro eyebrow="INTERVIEW PRACTICE" title={<>Practise with <span>confidence.</span></>} description="Answer common interview questions by typing or speaking. Review structured suggestions and a sample answer." />
            <div className="interview-layout"><div className="panel interview-main"><div className="interview-topline"><span className="question-count">QUESTION {questionIndex + 1} OF {questions.length}</span><select value={interviewCategory} onChange={(e) => { setInterviewCategory(e.target.value); setQuestionIndex(0); setPracticeAnswer(""); setInterviewFeedback(null); setShowSample(false); }}><option>General</option><option>Frontend</option><option>Backend</option><option>Data Analyst</option></select></div><div className="question-card"><div className="question-icon">Q</div><div><span className="eyebrow">YOUR QUESTION</span><h2>{currentQuestion.q}</h2><p>Try to answer clearly, include a real example, and explain the result.</p></div></div><div className="answer-heading"><label htmlFor="practice-answer">Your answer</label><span>{practiceAnswer.trim() ? practiceAnswer.trim().split(/\s+/).length : 0} words</span></div><textarea id="practice-answer" className="large-textarea answer-textarea" value={practiceAnswer} onChange={(e) => { setPracticeAnswer(e.target.value); setInterviewFeedback(null); }} placeholder="Type your answer here, or use the microphone to speak..." /><div className="answer-actions"><div className="voice-actions"><button className={`secondary-button ${isListening ? "listening" : ""}`} onClick={isListening ? stopVoiceAnswer : startVoiceAnswer}>{isListening ? "■ Stop recording" : "🎙 Speak answer"}</button>{isListening && <span className="listening-indicator"><i></i> Listening...</span>}</div><button className="primary-button" onClick={evaluatePracticeAnswer}>Check my answer <span>→</span></button></div><div className="interview-footer-actions"><button className="text-button" onClick={() => { setPracticeAnswer(""); setInterviewFeedback(null); setShowSample(false); }}>Clear answer</button><button className="text-button" onClick={nextQuestion}>Next question →</button><button className="text-button" onClick={resetInterview}>Restart practice ↺</button></div>{interviewFeedback && <div className="feedback-panel"><div className="feedback-header"><div><span className="eyebrow">PRACTICE FEEDBACK</span><h3>Your answer review</h3></div><div className="feedback-score">{interviewFeedback.score}<small>/100</small></div></div><div className="feedback-meter"><span style={{ width: `${interviewFeedback.score}%` }}></span></div><p className="feedback-caveat">This is a heuristic practice score based on answer length and selected keywords. It does not verify factual correctness or replace a human interviewer.</p><div className="feedback-columns"><div><h4>Ideas covered</h4>{interviewFeedback.matched.length ? <div className="skill-chip-list">{interviewFeedback.matched.map((s) => <span className="skill-chip good" key={s}>{s}</span>)}</div> : <p className="muted">Try to address more of the question's key ideas.</p>}</div><div><h4>Suggestions</h4><ul className="feedback-suggestions">{interviewFeedback.suggestions.map((s) => <li key={s}>{s}</li>)}</ul></div></div><button className="secondary-button sample-toggle" onClick={() => setShowSample((s) => !s)}>{showSample ? "Hide sample answer" : "View sample answer"} {showSample ? "↑" : "↓"}</button>{showSample && <div className="sample-answer"><span className="eyebrow">EXAMPLE — ADAPT IT TO YOUR EXPERIENCE</span><p>{currentQuestion.sample}</p></div>}</div>}</div><aside className="interview-side"><div className="panel"><div className="panel-heading"><div><h3>Answer framework</h3><p>A simple structure to remember</p></div><span className="side-spark">✦</span></div><div className="framework-step"><span>01</span><div><strong>Context</strong><p>Set the scene briefly.</p></div></div><div className="framework-step"><span>02</span><div><strong>Action</strong><p>Explain what you personally did.</p></div></div><div className="framework-step"><span>03</span><div><strong>Result</strong><p>Share the outcome or lesson.</p></div></div><div className="hint-box"><strong>Interview tip</strong><p>For experience questions, the STAR method means Situation, Task, Action, and Result.</p></div></div><div className="panel practice-progress"><div className="panel-heading"><div><h3>Your practice</h3><p>This session</p></div></div><div className="progress-stat"><span>Questions in category</span><strong>{questions.length}</strong></div><div className="progress-stat"><span>Current question</span><strong>{questionIndex + 1} / {questions.length}</strong></div><div className="progress-stat"><span>Answer reviewed</span><strong>{interviewFeedback ? "Yes" : "Not yet"}</strong></div></div></aside></div>
          </section>}

          {page === "history" && <section>
            <PageIntro eyebrow="YOUR PROGRESS" title={<>Analysis <span>history.</span></>} description="Revisit recent resume analyses saved in this browser." />
            <div className="panel history-full-panel"><div className="panel-heading"><div><h3>Recent resume checks</h3><p>Up to 20 recent records are stored locally on this device.</p></div><button className="secondary-button" onClick={() => { if (window.confirm("Clear all saved analysis history?")) setHistory([]); }}>Clear history</button></div>{history.length ? <div className="history-table"><div className="history-table-head"><span>ANALYSIS</span><span>DATE</span><span>SKILLS</span><span>SCORE</span><span></span></div>{history.map((item) => <div className="history-table-row" key={item.id}><div className="table-file"><span>▤</span><strong>Resume analysis</strong></div><span className="history-date">{item.date}</span><span>{(item.skills || []).length} detected</span><span className="table-score">{item.score}<small>/100</small></span><button className="text-button" onClick={() => loadHistory(item)}>Open →</button></div>)}</div> : <div className="empty-state"><div className="empty-icon">↺</div><strong>Your history is empty</strong><p>Analyze a resume to save your first record.</p><button className="primary-button" onClick={() => setPage("analyzer")}>Analyze resume →</button></div>}</div>
          </section>}
          <footer className="page-footer"><span>ResumeIQ <span className="footer-dot">•</span> Career intelligence workspace</span><span>Developed by Kanija Hussain</span></footer>
        </div>
      </main>
    </div>
  );
}

function ToolCard({ icon, tint, title, description, onClick, tag }) {
  return <button className="tool-card" onClick={onClick}><div className={`tool-icon ${tint}`}>{icon}</div>{tag && <span className="tool-tag">{tag}</span>}<h3>{title}</h3><p>{description}</p><span className="tool-arrow">Explore tool <b>↗</b></span></button>;
}
function PageIntro({ eyebrow, title, description }) {
  return <div className="page-intro"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>;
}
function FeatureRow({ icon, title, text }) {
  return <div className="feature-row"><div className="feature-icon">{icon}</div><div><strong>{title}</strong><p>{text}</p></div><span className="feature-check">✓</span></div>;
}
function FormField({ label, value, onChange, placeholder }) {
  return <div className="field"><label>{label}</label><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} /></div>;
}
function ResumePreview({ profile, template }) {
  const fallback = (v, text) => v?.trim() || text;
  return <div className={`resume-paper resume-${template}`}>
    <div className="resume-header"><h2>{fallback(profile.name, "Your Name")}</h2><h4>{fallback(profile.title, "Professional Title")}</h4><p>{[profile.email, profile.phone, profile.location].filter(Boolean).join("  •  ") || "email@example.com • phone • location"}</p></div>
    <ResumeSection title="Professional Summary">{fallback(profile.summary, "Write a concise summary highlighting your strengths, experience, and career goals.")}</ResumeSection>
    <ResumeSection title="Skills">{fallback(profile.skills, "Add relevant technical and transferable skills.")}</ResumeSection>
    <ResumeSection title="Experience">{fallback(profile.experience, "Add relevant roles, internships, responsibilities, and achievements.")}</ResumeSection>
    <ResumeSection title="Projects">{fallback(profile.projects, "Describe projects, technologies used, and outcomes.")}</ResumeSection>
    <ResumeSection title="Education">{fallback(profile.education, "Add your degree, institution, and graduation year.")}</ResumeSection>
  </div>;
}
function ResumeSection({ title, children }) {
  return <div className="resume-section"><h3>{title}</h3><p>{children}</p></div>;
}

export default App;

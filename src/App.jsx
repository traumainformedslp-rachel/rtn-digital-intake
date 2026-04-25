import { useState, createContext, useContext } from "react";

// ───────────── THEME — Editorial Calm ─────────────

const GRADIENT = "linear-gradient(90deg, #8dd4b0 0%, #b8a0d8 50%, #f4b5c5 100%)";
const RAINBOW  = "linear-gradient(90deg, #8dd4b0 0%, #b8a0d8 50%, #f4b5c5 100%)";

const themes = {
  dark: {
    bg: "#1a1815", card: "#232020", border: "#34302c", inputBg: "#1a1815",
    text: "#ece5d9", textMuted: "#82796f", textDim: "#5c544c", textSub: "#b9b0a3",
    accent: "#c4abe2", checkColor: "#c4abe2", checkBg: "#261e30",
    welcomeBg: "#232020", welcomeBorder: "#34302c",
    rowBg: "#1f1d1a", rowBgSel: "#261e30",
    btnBorder: "#34302c", btnBg: "#232020",
    footerBg: "#232020", stickyBg: "rgba(26,24,21,0.92)",
    printBtnBg: "#ece5d9", printBtnColor: "#1a1815",
    gradient: GRADIENT, rainbow: RAINBOW,
  },
  light: {
    bg: "#fbf8f4", card: "#ffffff", border: "#e6dfd5", inputBg: "#faf6f1",
    text: "#2a2724", textMuted: "#56504a", textDim: "#847d75", textSub: "#56504a",
    accent: "#7a5ea8", checkColor: "#7a5ea8", checkBg: "#efe8f6",
    welcomeBg: "#faf6fd", welcomeBorder: "#efe8f6",
    rowBg: "#faf6f1", rowBgSel: "#efe8f6",
    btnBorder: "#e6dfd5", btnBg: "#faf6f1",
    footerBg: "#ffffff", stickyBg: "rgba(251,248,244,0.92)",
    printBtnBg: "#2a2724", printBtnColor: "#fbf8f4",
    gradient: GRADIENT, rainbow: RAINBOW,
  },
};

// Section accents — drawn from the editorial-calm palette
const SECTION_COLORS = {
  about:    { dark: "#a8c8e0", light: "#5a8aaa" },  // sky
  strengths:{ dark: "#f6c89a", light: "#b87c4e" },  // peach
  reading:  { dark: "#8dd4b0", light: "#4f9c74" },  // mint
  feelings: { dark: "#c4abe2", light: "#7a5ea8" },  // lavender
  learn:    { dark: "#a8c8e0", light: "#5a8aaa" },  // sky
  interests:{ dark: "#f4b5c5", light: "#c47086" },  // pink
  goals:    { dark: "#f5d98a", light: "#b89446" },  // yellow
};

const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

// ───────────── DATA ─────────────

// Likert colors — editorial calm: pink → peach → sky → mint (no → little → mostly → yes)
const LIKERT_3 = [
  { label: "Not Really", sub: "That's not me", color: "#c47086", selBg: "#2e1f24", lightSelBg: "#faeaee", value: 1 },
  { label: "Sometimes",  sub: "Kind of",       color: "#b87c4e", selBg: "#2a2418", lightSelBg: "#fbeede", value: 2 },
  { label: "Yes!",       sub: "That's me!",    color: "#4f9c74", selBg: "#1e2b22", lightSelBg: "#e8f6ed", value: 3 },
];

const LIKERT_4 = [
  { label: "No",        sub: "Not me",     color: "#c47086", selBg: "#2e1f24", lightSelBg: "#faeaee", value: 1 },
  { label: "A Little",  sub: "Sometimes",  color: "#b87c4e", selBg: "#2a2418", lightSelBg: "#fbeede", value: 2 },
  { label: "Mostly",    sub: "Usually",    color: "#5a8aaa", selBg: "#1c2530", lightSelBg: "#e8f0f7", value: 3 },
  { label: "Yes!",      sub: "Totally",    color: "#4f9c74", selBg: "#1e2b22", lightSelBg: "#e8f6ed", value: 4 },
];

const STRENGTHS_YOUNG = [
  "I'm creative", "I'm good at solving problems", "I think in pictures", "I'm good with my hands",
  "I'm a good friend", "I'm funny", "I'm good at sports or moving", "I'm curious about things",
  "I'm good at talking to people", "I'm a good listener", "I like art or music",
  "I'm good with technology", "I see the big picture", "I don't give up easily",
  "I'm kind", "I have a great imagination",
];
const STRENGTHS_OLDER = [
  "I'm creative or artistic", "I'm good at figuring things out", "I'm a visual thinker", "I'm good at building or making things",
  "I'm caring and good with people", "I have a good sense of humor", "I'm athletic or active", "I'm curious and like learning new things",
  "I'm a strong communicator", "I'm a good listener", "I'm talented in music or art",
  "I'm good with technology", "I see the big picture", "I'm persistent — I don't give up",
  "I'm compassionate", "I'm imaginative", "I'm a good leader", "I'm good at speaking up for myself",
];

const READING_YOUNG = [
  "I like reading for fun", "I think I'm a good reader", "Reading feels hard for me",
  "I understand what I read", "Sounding out new words is hard", "I read slowly",
  "I'd rather listen than read", "I try to avoid reading",
  "I like reading about things I'm interested in", "Reading out loud makes me nervous",
];
const READING_OLDER = [
  "I like reading for fun", "I think I'm a good reader",
  "Reading takes a lot of energy or effort", "I understand what I read",
  "Figuring out new words is hard", "I read slower than I'd like",
  "I prefer listening over reading", "I try to avoid reading when I can",
  "I read more when it's about something I care about", "Reading out loud makes me anxious",
  "It's hard to stay focused while reading", "I often have to re-read things to get it",
];

const WRITING_YOUNG = [
  "I think I'm good at writing", "Writing takes me a long time", "Spelling is hard for me",
  "I have good ideas but can't get them on paper", "I try to avoid writing",
  "My handwriting is hard to read", "I'd rather type than write by hand",
  "I can say things better than I can write them",
];
const WRITING_OLDER = [
  "I think I'm a decent writer", "Writing takes me a long time",
  "Spelling is still hard for me", "I have good ideas but struggle to get them down",
  "I try to avoid writing when I can", "My handwriting is hard to read",
  "I really prefer typing over handwriting", "I'm better at saying things than writing them",
  "Organizing my thoughts in writing is hard", "Grammar and punctuation trip me up",
];

const SCHOOL_YOUNG = [
  "I like school", "I feel smart", "I work hard in school", "I ask for help when I need it",
  "I feel okay in my classes", "Homework stresses me out", "Tests stress me out",
  "I learn best when someone shows me how", "I learn best by doing things with my hands",
  "I get distracted easily",
];
const SCHOOL_OLDER = [
  "I like school overall", "I feel confident in my abilities", "I put in good effort at school",
  "I'm okay asking for help when I need it", "I feel like I fit in my classes",
  "Homework stresses me out", "Tests and exams make me anxious",
  "I learn best when someone shows me how", "I learn best by doing things hands-on",
  "I get distracted easily in class", "I manage my time pretty well", "My grades show what I'm really capable of",
];

const FEELINGS_YOUNG = [
  "I feel good about myself as a student", "I feel behind compared to other kids",
  "I worry about what people think of my work", "I get frustrated when I can't do something",
  "I give up when things feel too hard", "I believe I can get better at reading/writing",
  "I feel like my teachers understand me", "I feel like people notice what I CAN'T do",
  "I feel supported at school", "Being a different kind of learner is okay",
];
const FEELINGS_OLDER = [
  "I feel good about myself as a student", "I feel behind compared to other people my age",
  "I worry about people judging my work", "I get frustrated when I can't do something",
  "I shut down when things feel too hard", "I believe my reading and writing can get better",
  "My teachers get how I learn", "I feel like people focus on what I can't do",
  "I feel supported at school", "I'm okay with being a different kind of learner",
  "My learning differences have affected how I see myself", "I feel comfortable telling teachers what I need",
];

const LEARN_PREFS_YOUNG = [
  "When someone explains it out loud", "When I can watch a video",
  "When I can practice/do it hands-on", "When I work with a partner",
  "When I work 1-on-1 with a teacher", "When I can move around",
  "When it's quiet", "When I can listen to music",
  "When I pick what I read/write about", "When I can use a computer/tablet",
  "When instructions are short & clear", "When I can take breaks",
  "When I know WHY I'm learning it", "When someone believes in me",
];
const LEARN_PREFS_OLDER = [
  "When someone explains it out loud", "When I can watch a video",
  "When I can practice or do it hands-on", "When I work with a partner or group",
  "When I work 1-on-1 with a teacher or tutor", "When I can move around or take movement breaks",
  "When it's quiet and calm", "When I can listen to music or background noise",
  "When I get to pick what I read or write about", "When I can use a computer or tablet",
  "When instructions are short and clear", "When I can take breaks",
  "When I understand why it matters", "When the teacher believes in me",
  "When I get extra time", "When I have visual aids like charts or graphic organizers",
  "When I can re-watch or re-listen to things", "When I can use text-to-speech or audiobooks",
];

const INTERESTS_YOUNG = [
  "Graphic novels / comics", "Fantasy / sci-fi", "Mystery / thriller", "Scary stories",
  "True stories / nonfiction", "Sports books / articles", "Manga / anime", "Poetry / song lyrics",
  "Social media / texts", "YouTube / TikTok", "Video games with a story", "Podcasts / audiobooks",
  "News / current events", "How-to guides / DIY", "Music", "Magazines",
];
const INTERESTS_OLDER = [
  "Graphic novels / comics", "Fantasy / sci-fi", "Mystery / thriller", "Horror / scary stories",
  "Nonfiction / memoirs / biographies", "Sports content", "Manga / anime / webtoons",
  "Poetry / spoken word / lyrics", "Social media content", "YouTube / TikTok / streaming",
  "Video games with a story", "Podcasts / audiobooks", "News / current events",
  "DIY / tutorials / how-to", "Music", "Magazines / zines",
  "Research or academic topics", "Creative writing / fan fiction",
];

const GOALS_YOUNG = [
  "Reading faster", "Understanding what I read", "Spelling", "Writing paragraphs or essays",
  "Learning new words", "Feeling more confident", "Getting better grades", "Homework being easier",
  "Reading out loud without stress", "Being more independent", "Understanding how I learn",
  "Speaking up for myself",
];
const GOALS_OLDER = [
  "Reading faster and smoother", "Understanding what I read better", "Spelling",
  "Writing essays and longer pieces", "Building my vocabulary", "Feeling more confident",
  "Improving my grades", "Managing homework and assignments better",
  "Feeling less stressed about reading out loud", "Being a more independent learner",
  "Understanding how my brain works", "Speaking up for what I need",
  "Doing better on standardized tests", "Getting ready for college or career",
  "Getting more organized", "Taking better notes",
];

// ───────────── COMPONENTS ─────────────

const LikertBtn = ({ option, selected, onClick, compact, isDark }) => {
  const sel = selected === option.label;
  const t = isDark ? themes.dark : themes.light;
  return (
    <button onClick={onClick} className="no-print-style" style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      padding: compact ? "8px 6px" : "10px 8px", borderRadius: 12, border: `2px solid ${sel ? option.color : t.border}`,
      background: sel ? (isDark ? option.selBg : option.lightSelBg) : t.btnBg, cursor: "pointer", transition: "all 0.2s",
      flex: 1, minWidth: compact ? 68 : 80, transform: sel ? "scale(1.04)" : "scale(1)",
      boxShadow: sel ? `0 4px 16px ${option.color}30` : "none",
    }}>
      <span style={{
        fontFamily: "'Space Mono', monospace", fontWeight: 700,
        fontSize: sel ? (compact ? 20 : 24) : (compact ? 16 : 20),
        color: sel ? option.color : t.textDim, transition: "all 0.2s",
      }}>{option.value}</span>
      <span style={{ fontWeight: 700, fontSize: compact ? 11 : 13, color: sel ? option.color : t.textMuted }}>{option.label}</span>
      <span style={{ fontSize: compact ? 9 : 10, color: t.textDim }}>{option.sub}</span>
    </button>
  );
};

const LikertRow = ({ statement, value, onChange, mode }) => {
  const { dark } = useTheme();
  const t = dark ? themes.dark : themes.light;
  const opts = mode === "young" ? LIKERT_3 : LIKERT_4;
  const selected = opts.find((o) => o.label === value);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
      borderRadius: 12, background: value ? t.rowBgSel : t.rowBg,
      border: `1px solid ${t.border}`, marginBottom: 6,
    }}>
      <div style={{ flex: 1, fontSize: 14, color: t.text, fontFamily: "'Outfit', sans-serif", minWidth: 160 }}>{statement}</div>
      <div className="likert-btns" style={{ display: "flex", gap: mode === "young" ? 6 : 4, flexShrink: 0 }}>
        {opts.map((o) => <LikertBtn key={o.label} option={o} selected={value} onClick={() => onChange(o.label)} compact={mode !== "young"} isDark={dark} />)}
      </div>
      <div className="print-answer" style={{ display: "none", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {selected ? (
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
            background: selected.color, color: "#fff", border: `2px solid ${selected.color}`,
            WebkitPrintColorAdjust: "exact", printColorAdjust: "exact", colorAdjust: "exact",
          }}>{selected.label}</span>
        ) : (
          <span style={{ fontSize: 12, color: t.textDim, fontStyle: "italic" }}>—</span>
        )}
      </div>
    </div>
  );
};

const CheckGrid = ({ items, selected, onChange }) => {
  const { dark } = useTheme();
  const t = dark ? themes.dark : themes.light;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
      {items.map((item) => {
        const ch = selected.includes(item);
        return (
          <button key={item} onClick={() => onChange(ch ? selected.filter((s) => s !== item) : [...selected, item])} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
            borderRadius: 10, border: `2px solid ${ch ? t.checkColor : t.border}`,
            background: ch ? t.checkBg : t.btnBg, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
            WebkitPrintColorAdjust: "exact", printColorAdjust: "exact", colorAdjust: "exact",
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6, border: `2px solid ${ch ? t.checkColor : t.textDim}`,
              background: ch ? t.checkColor : "transparent", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0, transition: "all 0.15s",
              WebkitPrintColorAdjust: "exact", printColorAdjust: "exact",
            }}>{ch && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}</div>
            <span style={{ fontSize: 13, color: t.text, fontFamily: "'Outfit', sans-serif" }}>{item}</span>
          </button>
        );
      })}
    </div>
  );
};

const TA = ({ value, onChange, placeholder, rows = 2 }) => {
  const { dark } = useTheme();
  const t = dark ? themes.dark : themes.light;
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `2px solid ${t.border}`, fontSize: 14, fontFamily: "'Outfit', sans-serif", resize: "vertical", background: t.inputBg, color: t.text, lineHeight: 1.5, boxSizing: "border-box", outline: "none" }}
      onFocus={(e) => (e.target.style.borderColor = t.accent)} onBlur={(e) => (e.target.style.borderColor = t.border)} />
  );
};

const Inp = ({ value, onChange, placeholder, type = "text" }) => {
  const { dark } = useTheme();
  const t = dark ? themes.dark : themes.light;
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `2px solid ${t.border}`, fontSize: 14, fontFamily: "'Outfit', sans-serif", background: t.inputBg, color: t.text, boxSizing: "border-box", outline: "none" }}
      onFocus={(e) => (e.target.style.borderColor = t.accent)} onBlur={(e) => (e.target.style.borderColor = t.border)} />
  );
};

const SH = ({ icon, title, colorKey }) => {
  const { dark } = useTheme();
  const color = SECTION_COLORS[colorKey]?.[dark ? "dark" : "light"] || "#7eb8e0";
  return (
    <div style={{ borderRadius: 14, padding: "14px 20px", marginTop: 28, marginBottom: 14, display: "flex", alignItems: "center", gap: 12, background: dark ? "#111" : color, border: dark ? `2px solid ${color}` : "none", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>
      <span style={{ fontSize: 26 }}>{icon}</span>
      <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: dark ? color : "#fff" }}>{title}</div>
    </div>
  );
};

const Sub = ({ text }) => {
  const { dark } = useTheme();
  const t = dark ? themes.dark : themes.light;
  return (
    <div style={{ fontWeight: 700, fontSize: 14, color: t.accent, margin: "14px 0 6px", fontFamily: "'Space Mono', monospace", borderBottom: `2px solid ${t.border}`, paddingBottom: 4 }}>{text}</div>
  );
};

const Q = ({ text }) => {
  const { dark } = useTheme();
  return (
    <div style={{ fontWeight: 700, fontSize: 14, color: dark ? "#e8e8e8" : "#333", margin: "12px 0 6px", fontFamily: "'Outfit', sans-serif" }}>{text}</div>
  );
};

const ThemeToggle = ({ dark, toggle }) => (
  <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} style={{
    padding: "7px 14px", borderRadius: 100,
    border: `1px solid ${dark ? "#34302c" : "#e6dfd5"}`,
    background: dark ? "#232020" : "#ffffff",
    color: dark ? "#82796f" : "#847d75",
    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
    letterSpacing: "0.06em", cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 6,
    transition: "border-color 0.2s ease, color 0.2s ease",
  }}
  onMouseEnter={(e) => { e.currentTarget.style.color = dark ? "#ece5d9" : "#2a2724"; e.currentTarget.style.borderColor = dark ? "#82796f" : "#847d75"; }}
  onMouseLeave={(e) => { e.currentTarget.style.color = dark ? "#82796f" : "#847d75"; e.currentTarget.style.borderColor = dark ? "#34302c" : "#e6dfd5"; }}
  >
    <span style={{ fontSize: 13, lineHeight: 1 }}>{dark ? "☾" : "☀"}</span>
    {dark ? "Dark" : "Light"}
  </button>
);

// ───────────── APP ─────────────

const INIT = {
  name: "", nickname: "", age: "", grade: "", school: "",
  date: new Date().toISOString().slice(0, 10),
  pronouns: "", languages: "", strengths: [], goodAt: "", proudOf: "", dreams: "",
  reading: {}, writing: {}, schoolItems: {}, feelings: {},
  hardest: "", makeBetter: "", explainedDifferences: "",
  learnPrefs: [], bestTeacher: "", stopDoing: "",
  interests: [], lastLiked: "", changeOne: "", goals: [], success: "", anythingElse: "",
  diagnosis: "", services: "", accommodations: "", copingStrategies: "",
  signName: "", signDate: "",
};

export default function App() {
  const [mode, setMode] = useState(null);
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('rtn-theme') === 'dark'; } catch (e) { return false; }
  });
  const [form, setForm] = useState({ ...INIT });
  const s = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const sN = (g, k, v) => setForm((f) => ({ ...f, [g]: { ...f[g], [k]: v } }));
  const y = mode === "young";
  const t = dark ? themes.dark : themes.light;
  const toggle = () => setDark((d) => !d);

  // Persist theme + sync with site-wide attribute
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('rtn-theme', dark ? 'dark' : 'light'); } catch (e) {}
  }

  const reset = () => { if (window.confirm("Start over? This will clear all answers.")) { setForm({ ...INIT }); setMode(null); } };
  const saveJSON = () => {
    const b = new Blob([JSON.stringify({ ageGroup: mode, ...form }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(b);
    a.download = `${form.name || "student"}_intake_${mode}_${form.date}.json`; a.click();
  };

  const globalCSS = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-text-size-adjust: 100%; }
    body {
      background: ${t.bg};
      color: ${t.text};
      transition: background 0.3s ease, color 0.3s ease;
      font-family: 'DM Sans', -apple-system, sans-serif;
      min-height: 100vh;
      position: relative;
      -webkit-font-smoothing: antialiased;
    }
    body::before {
      content: '';
      position: fixed; pointer-events: none; inset: 0;
      background:
        radial-gradient(circle at 10% 15%, ${dark ? '#261e30' : '#efe8f6'} 0%, transparent 40%),
        radial-gradient(circle at 92% 78%, ${dark ? '#1e2b22' : '#e8f6ed'} 0%, transparent 44%),
        radial-gradient(circle at 50% 50%, ${dark ? '#2e1f24' : '#faeaee'} 0%, transparent 30%);
      opacity: ${dark ? '0.35' : '0.75'};
      z-index: 0;
    }
    input:focus, textarea:focus { outline: none; }
    :focus-visible { outline: 2px solid #b8a0d8 !important; outline-offset: 3px; border-radius: 2px; }
    ::selection { background: ${dark ? '#261e30' : '#efe8f6'}; color: ${t.text}; }

    .rtn-rainbow-strip {
      height: 6px;
      background: linear-gradient(90deg, #8dd4b0 0%, #b8a0d8 50%, #f4b5c5 100%);
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    }

    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
      body { background: #fff !important; color: #000 !important; }
      body::before { display: none !important; }
      .no-print { display: none !important; }
      .rtn-rainbow-strip { display: none !important; }
      .pc { box-shadow: none !important; margin: 0 !important; padding: 16px !important; max-width: 100% !important; background: #fff !important; color: #000 !important; border: none !important; }
      .pc * { color: #333 !important; border-color: #ddd !important; }
      .pc input, .pc textarea { background: #fff !important; color: #000 !important; border-color: #ccc !important; }
      .likert-btns { display: none !important; }
      .print-answer { display: inline-flex !important; }
      @page { margin: .4in; }
    }
  `;

  if (!mode) return (
    <ThemeCtx.Provider value={{ dark }}>
      <style>{globalCSS}</style>
      <div className="rtn-rainbow-strip" aria-hidden="true" />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 24, position: "relative", zIndex: 1 }}>
        <div style={{ position: "fixed", top: 18, right: 22, zIndex: 100 }}><ThemeToggle dark={dark} toggle={toggle} /></div>

        <div style={{ maxWidth: 600, width: "100%", textAlign: "left" }}>

          {/* Editorial-calm hero (no gradient panel) */}
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: t.textDim, marginBottom: 18, paddingBottom: 10, borderBottom: `1px solid ${t.border}`, display: "inline-block" }}>
            Neuroaffirming Intake · Speech · Language · Literacy
          </p>

          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(34px, 5.5vw, 48px)", fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.08, color: t.text, marginBottom: 14, position: "relative", display: "inline-block", paddingBottom: 10 }}>
            Student Self-Report
            <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #8dd4b0 0%, #b8a0d8 50%, #f4b5c5 100%)", opacity: 0.78 }} />
          </h1>

          <p style={{ fontSize: 16, color: t.textSub, lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>
            A strengths-based intake that helps your speech-language pathologist
            understand who you are, how you learn, and what you want to work on
            &mdash; in your own words.
          </p>

          {/* Mode selection cards — editorial calm card style */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 32 }}>
            {[
              ["young", "Ages 6–13", "#5a8aaa", "#a8c8e0", "#e8f0f7", "Simple language", "3 responses", "Kid-friendly questions"],
              ["older", "Ages 14+", "#7a5ea8", "#b8a0d8", "#efe8f6", "Friendly language", "4 responses", "More detailed questions"],
            ].map(([m, lbl, clrDeep, clrMid, clrSoft, l1, l2, l3]) => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "24px 22px",
                borderRadius: 18,
                border: `1px solid ${t.border}`,
                background: t.card,
                cursor: "pointer",
                textAlign: "left",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                position: "relative",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = clrMid; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(40,36,32,0.04), 0 8px 24px rgba(40,36,32,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: clrSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 14, color: clrDeep }}>{m === "young" ? "Y" : "T"}</span>
                  <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 19, color: t.text, letterSpacing: "-0.005em" }}>{lbl}</span>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, color: t.textSub, fontSize: 13.5, lineHeight: 1.7 }}>
                  <li style={{ paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, top: 9, width: 6, height: 6, borderRadius: "50%", background: clrMid }} />{l1}</li>
                  <li style={{ paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, top: 9, width: 6, height: 6, borderRadius: "50%", background: clrMid }} />{l2}</li>
                  <li style={{ paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, top: 9, width: 6, height: 6, borderRadius: "50%", background: clrMid }} />{l3}</li>
                </ul>
                <div style={{ marginTop: 14, fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: clrDeep }}>Begin →</div>
              </button>
            ))}
          </div>

          {/* Footer signature */}
          <div style={{ paddingTop: 20, borderTop: `1px solid ${t.border}`, fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: t.textDim, lineHeight: 1.9 }}>
            Strengths-Based · Neurodiversity-Affirming · Evidence-Based<br />
            Rachel Terra Norton, MS, CCC-SLP · rachelslp.org
          </div>

        </div>
      </div>
    </ThemeCtx.Provider>
  );

  const D = {
    str: y ? STRENGTHS_YOUNG : STRENGTHS_OLDER, rd: y ? READING_YOUNG : READING_OLDER,
    wr: y ? WRITING_YOUNG : WRITING_OLDER, sc: y ? SCHOOL_YOUNG : SCHOOL_OLDER,
    fe: y ? FEELINGS_YOUNG : FEELINGS_OLDER, lp: y ? LEARN_PREFS_YOUNG : LEARN_PREFS_OLDER,
    it: y ? INTERESTS_YOUNG : INTERESTS_OLDER, go: y ? GOALS_YOUNG : GOALS_OLDER,
  };

  const versionColor = y ? "#5a8aaa" : "#7a5ea8"; // sky-deep / lavender-deep

  return (
    <ThemeCtx.Provider value={{ dark }}>
      <style>{globalCSS}</style>
      <div className="rtn-rainbow-strip no-print" aria-hidden="true" />
      <div style={{ maxWidth: 820, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", position: "relative", zIndex: 1 }}>
        {/* Top sticky bar */}
        <div className="no-print" style={{ position: "sticky", top: 6, zIndex: 100, background: t.stickyBg, backdropFilter: "saturate(160%) blur(12px)", WebkitBackdropFilter: "saturate(160%) blur(12px)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "0 0 16px 16px", border: `1px solid ${t.border}`, borderTop: "none", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ color: t.text, fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 16, letterSpacing: "-0.005em", lineHeight: 1.1 }}>Student Self-Report</div>
            <div style={{ color: t.textDim, fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", marginTop: 3 }}>RTN · {y ? "Ages 6–13" : "Ages 14+"}</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            <ThemeToggle dark={dark} toggle={toggle} />
            <button onClick={reset} style={{ padding: "7px 14px", borderRadius: 100, border: `1px solid ${t.border}`, background: "transparent", color: t.textMuted, fontWeight: 500, cursor: "pointer", fontSize: 12, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.01em", transition: "border-color 0.2s, color 0.2s" }}>Start Over</button>
            <button onClick={saveJSON} style={{ padding: "7px 14px", borderRadius: 100, border: `1px solid ${t.border}`, background: "transparent", color: t.text, fontWeight: 500, cursor: "pointer", fontSize: 12, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.01em", transition: "border-color 0.2s" }}>Save JSON</button>
            <button onClick={() => window.print()} style={{ padding: "7px 18px", borderRadius: 100, border: `1px solid ${t.text}`, background: t.text, color: t.bg, fontWeight: 500, cursor: "pointer", fontSize: 12, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.01em", transition: "background 0.2s, border-color 0.2s" }}>Print</button>
          </div>
        </div>

        <div className="pc" style={{ background: t.card, borderRadius: 20, padding: "28px 32px", margin: "16px 0", boxShadow: dark ? "none" : "0 2px 24px #0001", border: `1px solid ${t.border}` }}>
          {/* Version badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <span style={{ background: dark ? versionColor + "15" : versionColor + "15", color: versionColor, padding: "4px 16px", borderRadius: 20, fontWeight: 700, fontSize: 12, border: `2px solid ${versionColor}`, fontFamily: "'Space Mono',monospace" }}>{y ? "Ages 6–13 Version" : "Ages 14+ Version"}</span>
          </div>

          {/* Welcome message */}
          <div style={{ background: dark ? "#111" : t.welcomeBg, borderRadius: 14, padding: "16px 20px", marginBottom: 16, border: `1px solid ${dark ? "#1e1e1e" : t.welcomeBorder}` }}>
            <div style={{ fontSize: 14, color: t.textSub, lineHeight: 1.6 }}>
              {y ? <><strong style={{ color: "#e89b2d" }}>Hi there! 👋</strong> This is all about <strong style={{ color: t.text }}>YOU</strong> — what you like, what you're good at, and how you feel about school. There are no right or wrong answers! You can skip anything. A grown-up can help you if you need it.</> :
                <><strong style={{ color: "#9b59b6" }}>Hey! 👋</strong> This is all about <strong style={{ color: t.text }}>you</strong> — your strengths, how you learn, and what support works best. There are no right or wrong answers. Be honest — it helps us help you. Skip anything you don't want to answer. Someone can read the questions to you if that helps.</>}
            </div>
          </div>

          {/* S1 */}
          <SH icon="✏️" title="SECTION 1: ABOUT ME" colorKey="about" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div><Q text="Your Name" /><Inp value={form.name} onChange={v => s("name", v)} /></div>
            <div><Q text="Name You Like to Be Called" /><Inp value={form.nickname} onChange={v => s("nickname", v)} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 10, marginTop: 8 }}>
            <div><Q text="Age" /><Inp value={form.age} onChange={v => s("age", v)} /></div>
            <div><Q text="Grade" /><Inp value={form.grade} onChange={v => s("grade", v)} /></div>
            <div><Q text="School" /><Inp value={form.school} onChange={v => s("school", v)} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 8 }}>
            <div><Q text="Date" /><Inp type="date" value={form.date} onChange={v => s("date", v)} /></div>
            <div><Q text="Pronouns" /><Inp value={form.pronouns} onChange={v => s("pronouns", v)} placeholder="she/her, he/him, they/them" /></div>
            <div><Q text="Language(s) at Home" /><Inp value={form.languages} onChange={v => s("languages", v)} /></div>
          </div>
          {!y && <div style={{ marginTop: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div><Q text="Any diagnoses you know about?" /><Inp value={form.diagnosis} onChange={v => s("diagnosis", v)} placeholder="e.g., Dyslexia, ADHD" /></div>
              <div><Q text="Any support you're already getting?" /><Inp value={form.services} onChange={v => s("services", v)} placeholder="e.g., IEP, 504, tutoring" /></div>
            </div>
            <Q text="Any accommodations or tools you use?" />
            <TA value={form.accommodations} onChange={v => s("accommodations", v)} placeholder="e.g., extra time, audiobooks, sitting near the front..." />
          </div>}

          {/* S2 */}
          <SH icon="⭐" title="SECTION 2: WHAT I'M GOOD AT" colorKey="strengths" />
          <CheckGrid items={D.str} selected={form.strengths} onChange={v => s("strengths", v)} />
          <Q text={y ? "What are you really good at? (sports, art, games, cooking — anything!)" : "What are you really good at? (hobbies, skills, talents — anything!)"} />
          <TA value={form.goodAt} onChange={v => s("goodAt", v)} placeholder="I'm really good at..." />
          <Q text="What's something you're proud of?" />
          <TA value={form.proudOf} onChange={v => s("proudOf", v)} />
          <Q text={y ? "What do you want to be when you grow up?" : "What are your goals for the future?"} />
          <TA value={form.dreams} onChange={v => s("dreams", v)} />

          {/* S3 */}
          <SH icon="📖" title="SECTION 3: READING & WRITING" colorKey="reading" />
          <Sub text="About Reading" />
          {D.rd.map(i => <LikertRow key={i} statement={i} value={form.reading[i]} onChange={v => sN("reading", i, v)} mode={mode} />)}
          <Sub text="About Writing & Spelling" />
          {D.wr.map(i => <LikertRow key={i} statement={i} value={form.writing[i]} onChange={v => sN("writing", i, v)} mode={mode} />)}
          <Sub text="About School" />
          {D.sc.map(i => <LikertRow key={i} statement={i} value={form.schoolItems[i]} onChange={v => sN("schoolItems", i, v)} mode={mode} />)}

          {/* S4 */}
          <SH icon="💭" title="SECTION 4: HOW I FEEL ABOUT LEARNING" colorKey="feelings" />
          {D.fe.map(i => <LikertRow key={i} statement={i} value={form.feelings[i]} onChange={v => sN("feelings", i, v)} mode={mode} />)}
          <Q text="What's the hardest thing about school right now?" />
          <TA value={form.hardest} onChange={v => s("hardest", v)} />
          <Q text="What would make school better or easier for you?" />
          <TA value={form.makeBetter} onChange={v => s("makeBetter", v)} />
          <Q text={y ? "Has anyone explained your learning differences to you?" : "Has anyone explained how you learn differently?"} />
          <TA value={form.explainedDifferences} onChange={v => s("explainedDifferences", v)} />
          {!y && <><Q text="What do you already do that helps you with school?" /><TA value={form.copingStrategies} onChange={v => s("copingStrategies", v)} placeholder="e.g., re-reading, audiobooks, asking friends for notes, taking breaks..." /></>}

          {/* S5 */}
          <SH icon="🧠" title="SECTION 5: HOW I LEARN BEST" colorKey="learn" />
          <CheckGrid items={D.lp} selected={form.learnPrefs} onChange={v => s("learnPrefs", v)} />
          <Q text={y ? "What makes a teacher or tutor really helpful?" : "What makes a teacher or tutor really helpful for you?"} />
          <TA value={form.bestTeacher} onChange={v => s("bestTeacher", v)} />
          <Q text="What do you wish teachers would stop doing?" />
          <TA value={form.stopDoing} onChange={v => s("stopDoing", v)} />

          {/* S6 */}
          <SH icon="🎮" title="SECTION 6: WHAT I LIKE TO READ, WATCH & DO" colorKey="interests" />
          <CheckGrid items={D.it} selected={form.interests} onChange={v => s("interests", v)} />
          <Q text={y ? "What's the last thing you read or watched that you actually liked?" : "What's the last thing you read, watched, or listened to that you actually liked?"} />
          <TA value={form.lastLiked} onChange={v => s("lastLiked", v)} />

          {/* S7 */}
          <SH icon="🌟" title="SECTION 7: WHAT I WANT" colorKey="goals" />
          <Q text="If you could change one thing about reading, writing, or school?" />
          <TA value={form.changeOne} onChange={v => s("changeOne", v)} />
          <Q text="What do you want to get better at?" />
          <CheckGrid items={D.go} selected={form.goals} onChange={v => s("goals", v)} />
          <Q text="What would success look like for you?" />
          <TA value={form.success} onChange={v => s("success", v)} />
          <Q text="Anything else you want us to know?" />
          <TA value={form.anythingElse} onChange={v => s("anythingElse", v)} rows={3} />

          {/* Close */}
          <div style={{ background: dark ? versionColor + "10" : (y ? "linear-gradient(135deg,#EBF7EE,#D6FADC)" : "linear-gradient(135deg,#E0F5F5,#D4F1F7)"), borderRadius: 14, padding: "20px 24px", marginTop: 28, textAlign: "center", border: `1px solid ${dark ? versionColor + "33" : (y ? "#B8E6C0" : "#A8DDE6")}` }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: dark ? versionColor : "#1B3A5C", fontFamily: "'Fraunces', Georgia, serif", letterSpacing: -0.3 }}>{y ? "You're all done. Awesome job! 🎉" : "You're all done. Nice work! 🎉"}</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginTop: 4 }}>{y ? "Everything you shared is private and will help us make sure the support you get really fits YOU." : "Everything you shared is private and will help us figure out the best way to support you."}</div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 20, alignItems: "flex-end" }}>
            <div style={{ flex: 2 }}><Q text="Your Name (optional)" /><Inp value={form.signName} onChange={v => s("signName", v)} /></div>
            <div style={{ flex: 1 }}><Q text="Date" /><Inp value={form.signDate} onChange={v => s("signDate", v)} /></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 24, color: t.textDim, fontSize: 11, fontFamily: "'Space Mono',monospace" }}>RTN Communication & Literacy • Rachel Norton, MS, CCC-SLP • rachelslp.org<br />Strengths-Based • Neurodiversity-Affirming • Evidence-Based</div>
        </div>

        {/* Bottom bar */}
        <div className="no-print" style={{ position: "sticky", bottom: 0, background: t.footerBg, padding: "12px 24px", borderRadius: "16px 16px 0 0", boxShadow: dark ? "0 -4px 20px #0002" : "0 -4px 20px #0001", display: "flex", justifyContent: "center", gap: 12, marginTop: 8, border: `1px solid ${t.border}`, borderBottom: "none" }}>
          <button onClick={reset} style={{ padding: "12px 24px", borderRadius: 12, border: `2px solid ${t.border}`, background: t.card, color: t.textMuted, fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'Outfit',sans-serif" }}>↩ Start Over</button>
          <button onClick={saveJSON} style={{ padding: "12px 24px", borderRadius: 12, border: `2px solid ${t.accent}`, background: t.card, color: t.accent, fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'Outfit',sans-serif" }}>💾 Save as File</button>
          <button onClick={() => window.print()} style={{ padding: "12px 28px", borderRadius: 999, border: "none", background: t.gradient, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'Outfit',sans-serif", boxShadow: "0 3px 14px rgba(138,108,184,0.3)" }}>🖨 Print / Save PDF</button>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}

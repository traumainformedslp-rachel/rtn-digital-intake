import { useState } from "react";

// ───────────── DATA ─────────────

const LIKERT_3 = [
  { label: "Not Really", sub: "That's not me", color: "#E8506A", bg: "#FFE0E6", face: "sad", value: 1 },
  { label: "Sometimes", sub: "Kind of", color: "#E8A817", bg: "#FFF7D6", face: "neutral", value: 2 },
  { label: "Yes!", sub: "That's me!", color: "#2FAB4F", bg: "#D6FADC", face: "happy", value: 3 },
];

const LIKERT_4 = [
  { label: "No", sub: "Not me", color: "#C25670", bg: "#FCE4EC", face: "sad", value: 1 },
  { label: "A Little", sub: "Sometimes", color: "#D4995A", bg: "#FFF3E0", face: "neutral", value: 2 },
  { label: "Mostly", sub: "Usually", color: "#3BA0A8", bg: "#E0F5F5", face: "content", value: 3 },
  { label: "Yes!", sub: "Totally", color: "#2FAB4F", bg: "#D6FADC", face: "happy", value: 4 },
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

const Face = ({ type, size = 48 }) => {
  const r = size / 2;
  const eyeY = -r * 0.05;
  const eyeDx = r * 0.28;
  const mouthY = r * 0.32;
  const fills = {
    happy: ["#C8F7CE", "#3A9E50"],
    happyTeal: ["#C2EEF5", "#1B8A9E"],
    content: ["#D4F1F7", "#2A96A8"],
    neutral: ["#FFF4C2", "#CCA020"],
    sad: ["#FFD4D4", "#D45A6A"],
  };
  const [bg, stroke] = fills[type] || fills.neutral;
  return (
    <svg width={size} height={size} viewBox={`${-r} ${-r} ${size} ${size}`}>
      <circle cx={0} cy={0} r={r * 0.92} fill={bg} stroke={stroke} strokeWidth={2.5} />
      <circle cx={-r * 0.4} cy={r * 0.15} r={r * 0.12} fill="#FFB8C8" opacity={0.6} />
      <circle cx={r * 0.4} cy={r * 0.15} r={r * 0.12} fill="#FFB8C8" opacity={0.6} />
      {type === "happy" || type === "happyTeal" || type === "content" ? (<>
        <path d={`M${-eyeDx - 6},${eyeY} Q${-eyeDx},${eyeY - 8} ${-eyeDx + 6},${eyeY}`} fill="none" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
        <path d={`M${eyeDx - 6},${eyeY} Q${eyeDx},${eyeY - 8} ${eyeDx + 6},${eyeY}`} fill="none" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
      </>) : (<>
        <circle cx={-eyeDx} cy={eyeY} r={r * 0.09} fill="#222" />
        <circle cx={-eyeDx + 2} cy={eyeY - 2} r={r * 0.035} fill="#fff" />
        <circle cx={eyeDx} cy={eyeY} r={r * 0.09} fill="#222" />
        <circle cx={eyeDx + 2} cy={eyeY - 2} r={r * 0.035} fill="#fff" />
      </>)}
      {type === "sad" && (<>
        <line x1={-eyeDx - 5} y1={eyeY - 10} x2={-eyeDx + 5} y2={eyeY - 7} stroke="#222" strokeWidth={2} strokeLinecap="round" />
        <line x1={eyeDx + 5} y1={eyeY - 10} x2={eyeDx - 5} y2={eyeY - 7} stroke="#222" strokeWidth={2} strokeLinecap="round" />
      </>)}
      {type === "happy" || type === "happyTeal" ? (
        <path d={`M${-r * 0.3},${mouthY - 2} Q0,${mouthY + 12} ${r * 0.3},${mouthY - 2}`} fill="none" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
      ) : type === "content" ? (
        <path d={`M${-r * 0.22},${mouthY} Q0,${mouthY + 6} ${r * 0.22},${mouthY}`} fill="none" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
      ) : type === "sad" ? (
        <path d={`M${-r * 0.25},${mouthY + 5} Q0,${mouthY - 6} ${r * 0.25},${mouthY + 5}`} fill="none" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
      ) : (
        <line x1={-r * 0.22} y1={mouthY} x2={r * 0.22} y2={mouthY} stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
      )}
    </svg>
  );
};

const FaceLikertBtn = ({ option, selected, onClick, compact }) => {
  const sel = selected === option.label;
  return (
    <button onClick={onClick} className="no-print-style" style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      padding: compact ? "6px 4px" : "8px 6px", borderRadius: 14, border: `3px solid ${sel ? option.color : "#e0e0e0"}`,
      background: sel ? option.bg : "#fafafa", cursor: "pointer", transition: "all 0.2s",
      flex: 1, minWidth: compact ? 68 : 80, transform: sel ? "scale(1.06)" : "scale(1)",
      boxShadow: sel ? `0 4px 16px ${option.color}40` : "0 1px 3px #0001",
    }}>
      <Face type={option.face} size={sel ? (compact ? 36 : 42) : (compact ? 30 : 36)} />
      <span style={{ fontWeight: 700, fontSize: compact ? 11 : 13, color: option.color }}>{option.label}</span>
      <span style={{ fontSize: compact ? 9 : 10, color: "#888" }}>{option.sub}</span>
    </button>
  );
};

const LikertRow = ({ statement, value, onChange, mode }) => {
  const opts = mode === "young" ? LIKERT_3 : LIKERT_4;
  const selected = opts.find((o) => o.label === value);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
      borderRadius: 12, background: value ? "#f8fdf8" : "#fafbfc",
      border: "1px solid #eee", marginBottom: 6,
    }}>
      <div style={{ flex: 1, fontSize: 14, color: "#333", fontFamily: "'Nunito', sans-serif", minWidth: 160 }}>{statement}</div>
      <div className="likert-btns" style={{ display: "flex", gap: mode === "young" ? 6 : 4, flexShrink: 0 }}>
        {opts.map((o) => <FaceLikertBtn key={o.label} option={o} selected={value} onClick={() => onChange(o.label)} compact={mode !== "young"} />)}
      </div>
      {/* Print-only answer pill */}
      <div className="print-answer" style={{ display: "none", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {selected ? (
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
            background: selected.color, color: "#fff", border: `2px solid ${selected.color}`,
            WebkitPrintColorAdjust: "exact", printColorAdjust: "exact", colorAdjust: "exact",
          }}>{selected.label}</span>
        ) : (
          <span style={{ fontSize: 12, color: "#ccc", fontStyle: "italic" }}>—</span>
        )}
      </div>
    </div>
  );
};

const CheckGrid = ({ items, selected, onChange }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
    {items.map((item) => {
      const ch = selected.includes(item);
      return (
        <button key={item} onClick={() => onChange(ch ? selected.filter((s) => s !== item) : [...selected, item])} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
          borderRadius: 10, border: `2px solid ${ch ? "#3B7DD8" : "#e0e0e0"}`,
          background: ch ? "#EAF2FF" : "#fafafa", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          WebkitPrintColorAdjust: "exact", printColorAdjust: "exact", colorAdjust: "exact",
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6, border: `2px solid ${ch ? "#3B7DD8" : "#ccc"}`,
            background: ch ? "#3B7DD8" : "#fff", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0, transition: "all 0.15s",
            WebkitPrintColorAdjust: "exact", printColorAdjust: "exact", colorAdjust: "exact",
            WebkitPrintColorAdjust: "exact", printColorAdjust: "exact",
          }}>{ch && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}</div>
          <span style={{ fontSize: 13, color: "#333", fontFamily: "'Nunito', sans-serif" }}>{item}</span>
        </button>
      );
    })}
  </div>
);

const TA = ({ value, onChange, placeholder, rows = 2 }) => (
  <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid #ddd", fontSize: 14, fontFamily: "'Nunito', sans-serif", resize: "vertical", background: "#fafafa", color: "#222", lineHeight: 1.5, boxSizing: "border-box" }} />
);

const Inp = ({ value, onChange, placeholder, type = "text" }) => (
  <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid #ddd", fontSize: 14, fontFamily: "'Nunito', sans-serif", background: "#fafafa", color: "#222", boxSizing: "border-box" }} />
);

const SH = ({ icon, title, color, subtitle }) => (
  <div style={{ background: color, borderRadius: 14, padding: "14px 20px", marginTop: 28, marginBottom: 14, display: "flex", alignItems: "center", gap: 12, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>
    <span style={{ fontSize: 26 }}>{icon}</span>
    <div>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "'Baloo 2', cursive", letterSpacing: 0.3 }}>{title}</div>
      {subtitle && <div style={{ color: "#ffffffcc", fontSize: 12, marginTop: 2 }}>{subtitle}</div>}
    </div>
  </div>
);

const Sub = ({ text }) => (
  <div style={{ fontWeight: 700, fontSize: 14, color: "#1B3A5C", margin: "14px 0 6px", fontFamily: "'Baloo 2', cursive", borderBottom: "2px solid #E8F0FE", paddingBottom: 4 }}>{text}</div>
);

const Q = ({ text }) => (
  <div style={{ fontWeight: 700, fontSize: 14, color: "#333", margin: "12px 0 6px", fontFamily: "'Nunito', sans-serif" }}>{text}</div>
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
  const [form, setForm] = useState({ ...INIT });
  const s = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const sN = (g, k, v) => setForm((f) => ({ ...f, [g]: { ...f[g], [k]: v } }));
  const y = mode === "young";

  const reset = () => { if (window.confirm("Start over? This will clear all answers.")) { setForm({ ...INIT }); setMode(null); } };
  const saveJSON = () => {
    const b = new Blob([JSON.stringify({ ageGroup: mode, ...form }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(b);
    a.download = `${form.name || "student"}_intake_${mode}_${form.date}.json`; a.click();
  };

  if (!mode) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#F0F4FA}`}</style>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito',sans-serif", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "48px 40px", maxWidth: 560, width: "100%", boxShadow: "0 8px 40px #0001", textAlign: "center" }}>
          <div style={{ background: "#1B3A5C", borderRadius: 14, padding: "16px 20px", marginBottom: 28 }}>
            <div style={{ color: "#fff", fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: 22 }}>RTN Communication & Literacy</div>
            <div style={{ color: "#ffffff99", fontSize: 12 }}>Student Self-Report Intake</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#333", marginBottom: 8 }}>Select the student's age group:</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>This determines the language and response scale.</div>
          <div style={{ display: "flex", gap: 16 }}>
            {[["young", "🧒", "Ages 6–13", "#3B7DD8", "#EAF2FF", "#D6E8FF", "Simple language\n3 responses with faces\nKid-friendly questions"],
              ["older", "🧑‍🎓", "Ages 14+", "#1B8A9E", "#E0F5F5", "#D4F1F7", "Friendly language\n4 responses with faces\nMore detailed questions"]
            ].map(([m, ico, lbl, clr, bg1, bg2, desc]) => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "28px 20px", borderRadius: 18, border: `3px solid ${clr}`,
                background: `linear-gradient(135deg, ${bg1}, ${bg2})`, cursor: "pointer", transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>{ico}</div>
                <div style={{ fontWeight: 800, fontSize: 20, color: "#1B3A5C", fontFamily: "'Baloo 2',cursive" }}>{lbl}</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 6, lineHeight: 1.5, whiteSpace: "pre-line" }}>{desc}</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 28, fontSize: 11, color: "#bbb" }}>Rachel Norton, MS, CCC-SLP • rachelslp.org</div>
        </div>
      </div>
    </>
  );

  const D = {
    str: y ? STRENGTHS_YOUNG : STRENGTHS_OLDER, rd: y ? READING_YOUNG : READING_OLDER,
    wr: y ? WRITING_YOUNG : WRITING_OLDER, sc: y ? SCHOOL_YOUNG : SCHOOL_OLDER,
    fe: y ? FEELINGS_YOUNG : FEELINGS_OLDER, lp: y ? LEARN_PREFS_YOUNG : LEARN_PREFS_OLDER,
    it: y ? INTERESTS_YOUNG : INTERESTS_OLDER, go: y ? GOALS_YOUNG : GOALS_OLDER,
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#F0F4FA}@media print{*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}body{background:#fff!important}.no-print{display:none!important}.pc{box-shadow:none!important;margin:0!important;padding:16px!important;max-width:100%!important}.likert-btns{display:none!important}.print-answer{display:inline-flex!important}@page{margin:.4in}}`}</style>
      <div style={{ maxWidth: 820, margin: "0 auto", fontFamily: "'Nunito',sans-serif" }}>
        <div className="no-print" style={{ position: "sticky", top: 0, zIndex: 100, background: "#1B3A5C", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "0 0 16px 16px", boxShadow: "0 4px 20px #0002" }}>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: 17 }}>RTN Communication & Literacy</div>
            <div style={{ color: "#ffffff88", fontSize: 11 }}>Student Self-Report • {y ? "Ages 6–13" : "Ages 14+"}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={reset} style={{ padding: "7px 14px", borderRadius: 10, border: "2px solid #ffffff33", background: "transparent", color: "#ffffff99", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>↩ Start Over</button>
            <button onClick={saveJSON} style={{ padding: "7px 14px", borderRadius: 10, border: "2px solid #ffffff44", background: "transparent", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>💾 Save</button>
            <button onClick={() => window.print()} style={{ padding: "7px 14px", borderRadius: 10, border: "none", background: "#3B7DD8", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>🖨 Print</button>
          </div>
        </div>

        <div className="pc" style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", margin: "16px 0", boxShadow: "0 2px 24px #0001" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <span style={{ background: y ? "#EAF2FF" : "#E0F5F5", color: y ? "#3B7DD8" : "#1B8A9E", padding: "4px 16px", borderRadius: 20, fontWeight: 700, fontSize: 12, border: `2px solid ${y ? "#3B7DD8" : "#1B8A9E"}` }}>{y ? "🧒 Ages 6–13 Version" : "🧑‍🎓 Ages 14+ Version"}</span>
          </div>

          <div style={{ background: "linear-gradient(135deg,#FFF3EB,#FFF8F0)", borderRadius: 14, padding: "16px 20px", marginBottom: 16, border: "1px solid #FFE0C8" }}>
            <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
              {y ? <><strong style={{ color: "#E8A838" }}>Hi there! 👋</strong> This is all about <strong>YOU</strong> — what you like, what you're good at, and how you feel about school. There are no right or wrong answers! You can skip anything. A grown-up can help you if you need it.</> :
                <><strong style={{ color: "#1B8A9E" }}>Hey! 👋</strong> This is all about <strong>you</strong> — your strengths, how you learn, and what support works best. There are no right or wrong answers. Be honest — it helps us help you. Skip anything you don't want to answer. Someone can read the questions to you if that helps.</>}
            </div>
          </div>

          {/* S1 */}
          <SH icon="✏️" title="SECTION 1: ABOUT ME" color="#1B3A5C" />
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
          <SH icon="⭐" title="SECTION 2: WHAT I'M GOOD AT" color="#E8A838"
            subtitle={y ? "Everyone is good at something! Check anything that sounds like you:" : "Everyone has strengths! Check anything that sounds like you:"} />
          <CheckGrid items={D.str} selected={form.strengths} onChange={v => s("strengths", v)} />
          <Q text={y ? "What are you really good at? (sports, art, games, cooking — anything!)" : "What are you really good at? (hobbies, skills, talents — anything!)"} />
          <TA value={form.goodAt} onChange={v => s("goodAt", v)} placeholder="I'm really good at..." />
          <Q text="What's something you're proud of?" />
          <TA value={form.proudOf} onChange={v => s("proudOf", v)} />
          <Q text={y ? "What do you want to be when you grow up?" : "What are your goals for the future?"} />
          <TA value={form.dreams} onChange={v => s("dreams", v)} />

          {/* S3 */}
          <SH icon="📖" title="SECTION 3: READING & WRITING" color="#5AA867" />
          <Sub text="About Reading" />
          {D.rd.map(i => <LikertRow key={i} statement={i} value={form.reading[i]} onChange={v => sN("reading", i, v)} mode={mode} />)}
          <Sub text="About Writing & Spelling" />
          {D.wr.map(i => <LikertRow key={i} statement={i} value={form.writing[i]} onChange={v => sN("writing", i, v)} mode={mode} />)}
          <Sub text="About School" />
          {D.sc.map(i => <LikertRow key={i} statement={i} value={form.schoolItems[i]} onChange={v => sN("schoolItems", i, v)} mode={mode} />)}

          {/* S4 */}
          <SH icon="💭" title="SECTION 4: HOW I FEEL ABOUT LEARNING" color="#9B72CF"
            subtitle={y ? "Being honest helps us help you!" : "Being honest helps us help you — no judgment here."} />
          {D.fe.map(i => <LikertRow key={i} statement={i} value={form.feelings[i]} onChange={v => sN("feelings", i, v)} mode={mode} />)}
          <Q text="What's the hardest thing about school right now?" />
          <TA value={form.hardest} onChange={v => s("hardest", v)} />
          <Q text="What would make school better or easier for you?" />
          <TA value={form.makeBetter} onChange={v => s("makeBetter", v)} />
          <Q text={y ? "Has anyone explained your learning differences to you?" : "Has anyone explained how you learn differently?"} />
          <TA value={form.explainedDifferences} onChange={v => s("explainedDifferences", v)} />
          {!y && <><Q text="What do you already do that helps you with school?" /><TA value={form.copingStrategies} onChange={v => s("copingStrategies", v)} placeholder="e.g., re-reading, audiobooks, asking friends for notes, taking breaks..." /></>}

          {/* S5 */}
          <SH icon="🧠" title="SECTION 5: HOW I LEARN BEST" color="#3B7DD8"
            subtitle={y ? "Check all the things that help you learn:" : "Check everything that helps you learn:"} />
          <CheckGrid items={D.lp} selected={form.learnPrefs} onChange={v => s("learnPrefs", v)} />
          <Q text={y ? "What makes a teacher or tutor really helpful?" : "What makes a teacher or tutor really helpful for you?"} />
          <TA value={form.bestTeacher} onChange={v => s("bestTeacher", v)} />
          <Q text="What do you wish teachers would stop doing?" />
          <TA value={form.stopDoing} onChange={v => s("stopDoing", v)} />

          {/* S6 */}
          <SH icon="🎮" title="SECTION 6: WHAT I LIKE TO READ, WATCH & DO" color="#E06B50"
            subtitle="Check everything you enjoy:" />
          <CheckGrid items={D.it} selected={form.interests} onChange={v => s("interests", v)} />
          <Q text={y ? "What's the last thing you read or watched that you actually liked?" : "What's the last thing you read, watched, or listened to that you actually liked?"} />
          <TA value={form.lastLiked} onChange={v => s("lastLiked", v)} />

          {/* S7 */}
          <SH icon="🌟" title="SECTION 7: WHAT I WANT" color="#D4A843"
            subtitle="This is your chance to say what matters to you!" />
          <Q text="If you could change one thing about reading, writing, or school?" />
          <TA value={form.changeOne} onChange={v => s("changeOne", v)} />
          <Q text="What do you want to get better at?" />
          <CheckGrid items={D.go} selected={form.goals} onChange={v => s("goals", v)} />
          <Q text="What would success look like for you?" />
          <TA value={form.success} onChange={v => s("success", v)} />
          <Q text="Anything else you want us to know?" />
          <TA value={form.anythingElse} onChange={v => s("anythingElse", v)} rows={3} />

          {/* Close */}
          <div style={{ background: y ? "linear-gradient(135deg,#EBF7EE,#D6FADC)" : "linear-gradient(135deg,#E0F5F5,#D4F1F7)", borderRadius: 14, padding: "20px 24px", marginTop: 28, textAlign: "center", border: `1px solid ${y ? "#B8E6C0" : "#A8DDE6"}` }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1B3A5C", fontFamily: "'Baloo 2',cursive" }}>{y ? "You're all done — awesome job! 🎉" : "You're all done — nice work! 🎉"}</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{y ? "Everything you shared is private and will help us make sure the support you get really fits YOU." : "Everything you shared is private and will help us figure out the best way to support you."}</div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 20, alignItems: "flex-end" }}>
            <div style={{ flex: 2 }}><Q text="Your Name (optional)" /><Inp value={form.signName} onChange={v => s("signName", v)} /></div>
            <div style={{ flex: 1 }}><Q text="Date" /><Inp value={form.signDate} onChange={v => s("signDate", v)} /></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 24, color: "#bbb", fontSize: 11 }}>RTN Communication & Literacy • Rachel Norton, MS, CCC-SLP • rachelslp.org<br />Strengths-Based • Neurodiversity-Affirming • Evidence-Based</div>
        </div>

        <div className="no-print" style={{ position: "sticky", bottom: 0, background: "#fff", padding: "12px 24px", borderRadius: "16px 16px 0 0", boxShadow: "0 -4px 20px #0001", display: "flex", justifyContent: "center", gap: 12, marginTop: 8 }}>
          <button onClick={reset} style={{ padding: "12px 24px", borderRadius: 12, border: "2px solid #ddd", background: "#fff", color: "#888", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito',sans-serif" }}>↩ Start Over</button>
          <button onClick={saveJSON} style={{ padding: "12px 24px", borderRadius: 12, border: "2px solid #1B3A5C", background: "#fff", color: "#1B3A5C", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito',sans-serif" }}>💾 Save as File</button>
          <button onClick={() => window.print()} style={{ padding: "12px 24px", borderRadius: 12, border: "none", background: "#3B7DD8", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito',sans-serif" }}>🖨 Print / Save PDF</button>
        </div>
      </div>
    </>
  );
}

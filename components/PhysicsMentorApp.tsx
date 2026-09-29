"use client";
import { useState, useRef } from "react";
import styles from "./PhysicsMentorApp.module.css";
import LessonDisplay from "./LessonDisplay";

interface FormState {
  classLevel: string; topic: string; subtopic: string;
  duration: string; term: string; community: string;
}
const INIT: FormState = { classLevel: "", topic: "", subtopic: "", duration: "", term: "", community: "" };

export default function PhysicsMentorApp() {
  const [form, setForm] = useState<FormState>(INIT);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const isValid = Object.values(form).every(v => v.trim());

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleGenerate = async () => {
    if (!isValid) return;
    setLoading(true); setResult(null); setError(null); setSubmitted({ ...form });
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.lessonNote) {
        setResult(data.lessonNote);
        setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
      } else setError(data.error ?? "Something went wrong. Please try again.");
    } catch { setError("Connection error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={styles.root}>
      <div className={styles.bgPattern} />
      <div className={styles.container}>
        <header className={`${styles.header} no-print`}>
          <div className={styles.logoBadge}><span className={styles.logoDot} />T-CEIPEC · FUE Pankshin</div>
          <h1 className={styles.title}>Physics<span className={styles.titleAccent}>Mentor</span>-NG</h1>
          <p className={styles.subtitle}>AI-powered CRAL lesson note generator for Nigerian Senior Secondary School physics teachers. Community-specific. Inquiry-based.</p>
          <p className={styles.meta}>Hemba · Nanpon · Gyitbe &nbsp;|&nbsp; Federal University of Education, Pankshin &nbsp;|&nbsp; AJR2P.164901</p>
          <div className={styles.cralPills}>
            <span className={`${styles.pill} ${styles.pillC}`}>C — Concrete</span>
            <span className={`${styles.pill} ${styles.pillR}`}>R — Representational</span>
            <span className={`${styles.pill} ${styles.pillA}`}>A — Abstract</span>
            <span className={`${styles.pill} ${styles.pillL}`}>L — Lived Experience</span>
          </div>
        </header>

        <div className={`${styles.divider} no-print`} />

        {!result && !loading && (
          <div className={`${styles.card} no-print`}>
            <div className={styles.cardTopLine} />
            <h2 className={styles.cardTitle}>Generate a CRAL Lesson Note</h2>
            <p className={styles.cardDesc}>Fill in all six fields. PhysicsMentor-NG will generate a complete, community-specific lesson note structured around the CRAL framework and the 5E inquiry cycle.</p>

            <div className={styles.sectionLabel}>Lesson Details</div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label htmlFor="classLevel">Class Level</label>
                <select id="classLevel" name="classLevel" className={styles.select} value={form.classLevel} onChange={handleChange}>
                  <option value="">Select class…</option>
                  <option>SS1</option><option>SS2</option><option>SS3</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="duration">Lesson Duration</label>
                <select id="duration" name="duration" className={styles.select} value={form.duration} onChange={handleChange}>
                  <option value="">Select duration…</option>
                  <option>45 minutes (1 CRAL cycle)</option>
                  <option>60 minutes (2 CRAL cycles)</option>
                  <option>90 minutes (3 CRAL cycles)</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="term">School Term</label>
                <select id="term" name="term" className={styles.select} value={form.term} onChange={handleChange}>
                  <option value="">Select term…</option>
                  <option>First Term</option><option>Second Term</option><option>Third Term</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="topic">Physics Topic</label>
                <input id="topic" name="topic" className={styles.input} placeholder="e.g. Nuclear Physics, Waves…" value={form.topic} onChange={handleChange} />
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label htmlFor="subtopic">Sub-topic</label>
                <input id="subtopic" name="subtopic" className={styles.input} placeholder="e.g. Radioactive decay and half-life…" value={form.subtopic} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.sectionLabel}>Instructional Community</div>
            <div className={styles.field} style={{ marginBottom: 24 }}>
              <label htmlFor="community">School Location / Instructional Community</label>
              <input id="community" name="community" className={styles.input} placeholder="e.g. Pankshin LGA, Plateau State — tin mining, yam farming, semi-urban market…" value={form.community} onChange={handleChange} />
              <p className={styles.fieldHint}>⚡ Be specific — name the town/LGA and mention key local trades, crops, or landmarks.</p>
            </div>

            <button className={styles.btn} onClick={handleGenerate} disabled={!isValid}>⚛ Generate CRAL Lesson Note</button>
            {error && <div className={styles.error}>⚠ {error}</div>}
          </div>
        )}

        {loading && (
          <div className={`${styles.card} no-print`}>
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p className={styles.loadingText}>Generating your CRAL lesson note…</p>
              <p className={styles.loadingSub}>Applying 5E inquiry cycle · CRAL framework · Community-specific analogies</p>
              <div className={styles.cralPills} style={{ marginTop: 20 }}>
                <span className={`${styles.pill} ${styles.pillC}`}>Concrete</span>
                <span className={`${styles.pill} ${styles.pillR}`}>Representational</span>
                <span className={`${styles.pill} ${styles.pillA}`}>Abstract</span>
                <span className={`${styles.pill} ${styles.pillL}`}>Lived Experience</span>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className={`${styles.card} print-card`} ref={outputRef}>
            <div className={`${styles.outputHeader} no-print`}>
              <h2 className={styles.outputTitle}>CRAL Lesson Note</h2>
              <span className={styles.badgeGreen}><span className={styles.badgeDot} />Ready to teach</span>
            </div>
            {submitted && (
              <div className={`${styles.infoRow} no-print`}>
                {[submitted.classLevel, submitted.topic, submitted.subtopic, submitted.duration, submitted.term, submitted.community].map((v, i) => (
                  <span key={i} className={i === 2 || i === 5 ? `${styles.infoPill} ${styles.infoPillAccent}` : styles.infoPill}>{v}</span>
                ))}
              </div>
            )}
            <div className={styles.divider} />
            <LessonDisplay content={result} />
            <div className={`${styles.actions} no-print`}>
              <button className={styles.btnSecondary} onClick={handleCopy}>{copied ? "✓ Copied!" : "📋 Copy Text"}</button>
              <button className={styles.btnSecondary} onClick={() => window.print()}>🖨 Print / Save PDF</button>
              <button className={styles.btnSecondary} onClick={() => { setResult(null); setError(null); setSubmitted(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}>⚛ New Lesson Note</button>
            </div>
          </div>
        )}

        <footer className={`${styles.footer} no-print`}>
          PhysicsMentor-NG operationalises the CRAL Model (Hemba, Nanpon &amp; Gyitbe, 2026)<br />
          <em>Asian Journal of Research and Reviews in Physics</em>, Vol. 10(4), 109–115. DOI: 10.9734/ajr2p/2026/v10i4250<br />
          T_CEIPEC · Federal University of Education, Pankshin, Plateau State, Nigeria
        </footer>
      </div>
    </div>
  );
}

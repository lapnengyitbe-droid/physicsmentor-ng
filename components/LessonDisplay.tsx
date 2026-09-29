"use client";
import styles from "./LessonDisplay.module.css";
import { ReactNode } from "react";

function processInline(text: string): ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((p, i) => p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2,-2)}</strong> : p);
}

function getH2Class(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("concrete") || t.includes("stage c")) return styles.stageC;
  if (t.includes("representational") || t.includes("stage r")) return styles.stageR;
  if (t.includes("abstract") || t.includes("stage a") || t.includes("explain")) return styles.stageA;
  if (t.includes("lived") || t.includes("localisation") || t.includes("stage l") || t.includes("elaborate")) return styles.stageL;
  return styles.stageN;
}

export default function LessonDisplay({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let i = 0, key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith("|")) {
      const tLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { tLines.push(lines[i]); i++; }
      const [h, , ...body] = tLines;
      const headers = h.split("|").filter(x => x.trim()).map(x => x.trim());
      const rows = body.filter(r => !r.match(/^\|[\s\-|]+\|$/)).map(r => r.split("|").filter(c => c.trim()).map(c => c.trim()));
      elements.push(<div key={key++} className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map((h,j) => <th key={j}>{h}</th>)}</tr></thead><tbody>{rows.map((row,ri) => <tr key={ri}>{row.map((c,ci) => <td key={ci}>{processInline(c)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (line.startsWith("# ")) { elements.push(<h1 key={key++} className={styles.h1}>{line.slice(2)}</h1>); i++; continue; }
    if (line.startsWith("## ")) { const t = line.slice(3); elements.push(<h2 key={key++} className={`${styles.h2} ${getH2Class(t)}`}>{t}</h2>); i++; continue; }
    if (line.startsWith("### ")) { const t = line.slice(4); elements.push(<h2 key={key++} className={`${styles.h2} ${styles.h2sm} ${getH2Class(t)}`}>{t}</h2>); i++; continue; }
    if (line.startsWith("#### ")) { elements.push(<h3 key={key++} className={styles.h3}>{line.slice(5)}</h3>); i++; continue; }
    if (line.startsWith("---")) { elements.push(<hr key={key++} className={styles.hr} />); i++; continue; }
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) { items.push(lines[i].replace(/^[-*] /,"")); i++; }
      elements.push(<ul key={key++} className={styles.ul}>{items.map((it,j) => <li key={j} className={styles.li}>{processInline(it)}</li>)}</ul>);
      continue;
    }
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) { items.push(lines[i].replace(/^\d+\. /,"")); i++; }
      elements.push(<ol key={key++} className={styles.ol}>{items.map((it,j) => <li key={j} className={styles.li}>{processInline(it)}</li>)}</ol>);
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    elements.push(<p key={key++} className={styles.p}>{processInline(line)}</p>);
    i++;
  }
  return <div className={styles.root}>{elements}</div>;
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ── Shared utilities ── */

function cls(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Section Reveal ── */

export function SectionReveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div ref={ref} className={cls("reveal", visible && "visible", className)}>
      {children}
    </div>
  );
}

export function SectionRevealStagger({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div ref={ref} className={cls("reveal-stagger", visible && "visible", className)}>
      {children}
    </div>
  );
}

/* ── Navbar ── */

const SECTIONS = ["skills","experience","education","tech","projects","case-studies","contact"] as const;
type Section = (typeof SECTIONS)[number];

export function Navbar() {
  const [active, setActive] = useState<Section | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const label = (s: Section) =>
    s === "tech" ? "Stack" : s === "case-studies" ? "Cases" : s[0].toUpperCase() + s.slice(1);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 glass border-b border-[#1e293b]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-mono text-sm tracking-[0.3em] text-[#22d3ee]">USMAN.SHAMIM</span>
        <div className="hidden items-center gap-6 text-xs sm:flex">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className={cls(
                "relative pb-1 font-semibold uppercase tracking-wider transition-colors duration-200",
                active === s ? "text-[#22d3ee]" : "text-[#64748b] hover:text-[#cbd5e1]"
              )}
            >
              {label(s)}
              {active === s && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#22d3ee] transition-all duration-300" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ── Aurora Background ── */

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="animate-aurora-1 absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full blur-[120px]" style={{ background: "rgba(34,211,238,0.05)" }} />
      <div className="animate-aurora-2 absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full blur-[100px]" style={{ background: "rgba(22,163,74,0.04)" }} />
      <div className="animate-aurora-3 absolute -bottom-1/4 left-1/3 h-[700px] w-[700px] rounded-full blur-[110px]" style={{ background: "rgba(168,85,247,0.04)" }} />
    </div>
  );
}

/* ── Particle Field ── */

export function ParticleField() {
  return <div className="pointer-events-none fixed inset-0 particle-grid" aria-hidden="true" />;
}

/* ── Scanlines ── */

export function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.012]"
      style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.03) 2px, rgba(34,211,238,0.03) 4px)" }}
      aria-hidden="true"
    />
  );
}

/* ── HUD Corner Brackets ── */

export function HUDBrackets({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cls("hud-brackets", className)}>{children}</div>;
}

/* ── Section Header ── */

export function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-16">
      <span className="mb-4 inline-block font-mono text-xs tracking-[0.3em] text-[#22d3ee]/60">{label}</span>
      <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-sm text-[#94a3b8]">{subtitle}</p>}
    </div>
  );
}

/* ── Badge ── */

export function Badge({ color, children }: { color: "cyan" | "green" | "amber" | "purple" | "red"; children: ReactNode }) {
  const map = { cyan: "#22d3ee", green: "#16a34a", amber: "#f59e0b", purple: "#a855f7", red: "#dc2626" };
  const c = map[color];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-[11px] font-semibold"
      style={{ borderColor: `${c}30`, background: `${c}0D`, color: c }}
    >
      <span className="inline-block h-1 w-1 rounded-full" style={{ background: c, opacity: 0.9 }} />
      {children}
    </span>
  );
}

/* ── Tech Tag ── */

export function TechTag({ name }: { name: string }) {
  return (
    <span className="inline-block rounded border border-[#1e293b] bg-[#0e1223] px-2 py-0.5 font-mono text-[10px] text-[#64748b]">
      {name}
    </span>
  );
}

/* ── Skill Bar ── */

export function SkillBar({ label, pct }: { label: string; pct: number }) {
  const { ref, visible } = useInView(0.3);
  return (
    <div ref={ref} className="mb-4">
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="font-mono text-[#cbd5e1]">{label}</span>
        <span className="text-[#64748b]">{pct}%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-[#1e293b]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#0891b2] transition-all duration-1000 ease-out"
          style={{ width: visible ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/* ── Project Card ── */

export function ProjectCard({
  badge,
  title,
  desc,
  techs,
  large,
  href,
}: {
  badge: { color: "cyan" | "green" | "amber" | "purple" | "red"; label: string };
  title: string;
  desc: string;
  techs: string[];
  large?: boolean;
  href?: string;
}) {
  const El = href ? "a" : "div";
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <El
      {...(props as any)}
      className="group block cursor-pointer rounded-xl border border-[#1e293b] bg-[#0e1223] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#22d3ee]/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]"
    >
      <div className="mb-4"><Badge color={badge.color}>{badge.label}</Badge></div>
      <h3 className="mb-2 text-lg font-semibold text-[#f8fafc] transition-colors group-hover:text-[#22d3ee]">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-[#94a3b8]">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {techs.map((t) => (<TechTag key={t} name={t} />))}
      </div>
    </El>
  );
}

/* ── Coming Soon Card ── */

export function ComingSoonCard({
  badge,
  title,
  desc,
  module,
}: {
  badge: { color: "cyan" | "green" | "amber" | "purple" | "red"; label: string };
  title: string;
  desc: string;
  module: string;
}) {
  return (
    <div className="group relative rounded-xl border border-dashed border-[#1e293b] bg-[#0e1223]/50 p-6 transition-all duration-300 hover:border-[#22d3ee]/20">
      <div className="mb-4 flex items-center justify-between">
        <Badge color={badge.color}>{badge.label}</Badge>
        <span className="font-mono text-[10px] text-[#64748b]">{module}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[#cbd5e1]">{title}</h3>
      <p className="text-sm leading-relaxed text-[#64748b]">{desc}</p>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#22d3ee]/10 bg-[#22d3ee]/[0.02] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#22d3ee]/50">
        <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-[#22d3ee]/50" />
        Coming Q4 2026
      </div>
    </div>
  );
}

/* ── Contact Button ── */

function btnEnter(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "#22d3ee";
  e.currentTarget.style.background = "#111527";
}
function btnLeave(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "#334155";
  e.currentTarget.style.background = "#0e1223";
}

export function ContactButton({ href, icon, label, target, rel }: { href: string; icon: ReactNode; label: string; target?: string; rel?: string }) {
  return (
    <a
      href={href} target={target} rel={rel}
      className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
      style={{ borderColor: "#334155", background: "#0e1223", color: "#cbd5e1" }}
      onMouseEnter={btnEnter} onMouseLeave={btnLeave}
    >
      {icon} {label}
    </a>
  );
}

/* ── Tech Matrix ── */

export function TechMatrix() {
  const rows = [
    { tech: "Claude Code", current: ["E-commerce Agents"], future: ["Digital Twin", "SOP Agent"], color: "#22d3ee" },
    { tech: "MCP Protocol", current: [], future: ["SAP-PLC Bridge", "IIoT Pipeline"], color: "#16a34a" },
    { tech: "n8n", current: [], future: ["IIoT Pipeline", "ERP RPA"], color: "#f59e0b" },
    { tech: "RAG + Pinecone", current: [], future: ["SOP Agent", "Quality Vision"], color: "#a855f7" },
    { tech: "LangGraph", current: [], future: ["Digital Twin", "MES Agent"], color: "#22d3ee" },
    { tech: "OpenAI Agents SDK", current: ["E-commerce Agents"], future: ["Supply Chain"], color: "#16a34a" },
    { tech: "A2A Protocol", current: [], future: ["Supply Chain"], color: "#f59e0b" },
    { tech: "FastAPI + Neon DB", current: ["Process Monitor"], future: ["All Projects"], color: "#a855f7" },
    { tech: "Docker", current: [], future: ["All Deployments"], color: "#22d3ee" },
    { tech: "PLC / SCADA", current: ["Process Monitor"], future: ["SAP-PLC Bridge", "MES Agent"], color: "#16a34a" },
  ];
  return (
    <div className="overflow-x-auto rounded-xl border border-[#1e293b] bg-[#0e1223]">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[#1e293b] text-[#64748b]">
            <th className="px-5 py-3 font-mono font-medium">Technology</th>
            <th className="px-5 py-3 font-mono font-medium">Current</th>
            <th className="px-5 py-3 font-mono font-medium">Planned</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.tech} className="border-b border-[#1e293b]/50 last:border-0">
              <td className="px-5 py-3 font-mono font-semibold" style={{ color: r.color }}>{r.tech}</td>
              <td className="px-5 py-3 text-[#cbd5e1]">{r.current.join(", ") || <span className="text-[#64748b]">—</span>}</td>
              <td className="px-5 py-3 text-[#64748b]">{r.future.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Social Icons (inline SVGs) ── */

const LinkedInSvg = <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#22d3ee"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
const EmailSvg = <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>;
const GitHubSvg = <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#22d3ee"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>;

export const LinkedInIcon = LinkedInSvg;
export const EmailIcon = EmailSvg;
export const GitHubIcon = GitHubSvg;

/* ── HUD Stats Row ── */

export function HUDStats() {
  return (
    <div className="flex flex-wrap gap-6 font-mono text-xs text-[#64748b]">
      <span className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#22d3ee]" />Intern @ FlyRank AI</span>
      <span className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#16a34a]" />PIAIC AI Architect</span>
      <span className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />SMIT Agentic AI</span>
      <span className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a855f7]" />Autocon IA</span>
    </div>
  );
}

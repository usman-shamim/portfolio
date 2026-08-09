import {
  Navbar, AuroraBackground, ParticleField, Scanlines,
  SectionReveal, SectionRevealStagger, SectionHeader,
  HUDBrackets, Badge, SkillBar, TechTag,
  ProjectCard, ComingSoonCard, TechMatrix, HUDStats,
  ContactButton,
} from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc]">
      <AuroraBackground />
      <ParticleField />
      <Scanlines />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col justify-center px-6 pt-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 font-mono text-[11px] tracking-[0.35em] text-[#22d3ee]/50">
            <span className="inline-block animate-pulse text-[#22d3ee]/80">●</span> SYS.ONLINE — FORWARD DEPLOYED ENGINEER
          </div>

          <HUDBrackets className="mb-10 max-w-3xl p-10">
            <h1 className="font-sans text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              M. Usman
              <br />
              <span className="bg-gradient-to-r from-[#22d3ee] via-[#67e8f9] to-[#22d3ee] bg-clip-text" style={{ WebkitTextFillColor: "transparent" }}>
                Shamim
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#94a3b8]">
              Chemical-Tech AI Specialist bridging industrial plant floors and agentic intelligence. I design AI agents that monitor reactors, orchestrate supply chains, and automate chemical processes — trained at the intersection of <span className="text-[#22d3ee]">Industry 4.0</span> and <span className="text-[#16a34a]">agentic AI</span>.
            </p>
          </HUDBrackets>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-px active:scale-[0.98]" style={{ background: "#22d3ee", color: "#020617" }}>Get in touch</a>
            <a href="#projects" className="inline-flex items-center rounded-lg border px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-px" style={{ borderColor: "#334155", color: "#cbd5e1", background: "#0e1223" }}>View projects</a>
          </div>

          <div className="mt-20"><HUDStats /></div>

          <div className="mt-16 rounded-xl border border-[#1e293b] bg-[#0e1223]/80 p-5 font-mono text-xs leading-relaxed text-[#64748b]">
            <div><span className="text-[#22d3ee]">$</span> whoami</div>
            <div className="ml-4 text-[#cbd5e1]">Forward Deployed Engineer — Chemical Tech + Agentic AI</div>
            <div className="mt-2"><span className="text-[#22d3ee]">$</span> cat /etc/stack</div>
            <div className="ml-4 flex flex-wrap gap-x-4 gap-y-1"><span className="text-[#22d3ee]">Claude Code</span><span className="text-[#cbd5e1]">MCP/A2A</span><span className="text-[#16a34a]">PLC/SCADA</span><span className="text-[#f59e0b]">n8n</span><span className="text-[#a855f7]">RAG</span><span className="text-[#22d3ee]">LangGraph</span><span className="text-[#cbd5e1]">FastAPI</span><span className="text-[#16a34a]">Siemens S7-1200</span><span className="text-[#f59e0b]">Docker</span></div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="CAPABILITIES" title="Domain-bridge expertise" subtitle="Operating at the boundary of process engineering and autonomous AI" />
          <SectionReveal>
            <div className="grid gap-8 lg:grid-cols-2">
              <HUDBrackets className="p-6">
                <div className="mb-6"><Badge color="cyan">MODULE_01: AGENTIC_AI</Badge></div>
                <SkillBar label="AI Agent Architecture (Claude Code, MCP, Agent SDKs)" pct={85} />
                <SkillBar label="Prompt & Context Engineering" pct={80} />
                <SkillBar label="Multi-Agent Orchestration (LangGraph, A2A)" pct={65} />
                <SkillBar label="RAG Pipelines (Pinecone, Qdrant)" pct={55} />
                <SkillBar label="Backend AI (FastAPI, Neon DB, Docker)" pct={75} />
                <SkillBar label="Python + SQL + Real-time Analytics" pct={80} />
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Claude Code","MCP","A2A","OpenAI SDK","LangChain","LangGraph","RAG","Pinecone","Mem0","LangSmith","Docker","FastAPI","Neon DB","n8n","Spectkit"].map(t=><TechTag key={t} name={t} />)}
                </div>
              </HUDBrackets>

              <HUDBrackets className="p-6">
                <div className="mb-6"><Badge color="green">MODULE_02: INDUSTRIAL_AUTOMATION</Badge></div>
                <SkillBar label="PLC Programming (Siemens S7-1200)" pct={78} />
                <SkillBar label="HMI Design & SCADA Systems" pct={70} />
                <SkillBar label="Industrial Instrumentation" pct={72} />
                <SkillBar label="Chemical Process Control" pct={75} />
                <SkillBar label="Predictive Maintenance (ML Models)" pct={60} />
                <SkillBar label="IIoT Protocols (MQTT, OPC UA)" pct={50} />
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Siemens S7-1200","SCADA","HMI KTP700","SAP S/4HANA","OPC UA","MQTT","Python","ML","SQL","AutoCAD Elec","Raspberry Pi"].map(t=><TechTag key={t} name={t} />)}
                </div>
              </HUDBrackets>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="EXPERIENCE" title="Where I've built" />
          <SectionReveal>
            <div className="relative border-l border-[#1e293b] pl-8">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 animate-pulse rounded-full bg-[#22d3ee]" />
              <div className="mb-2 font-mono text-xs text-[#64748b]">June 2026 — Present</div>
              <h3 className="text-xl font-semibold">Backend AI Engineering Intern</h3>
              <p className="font-semibold text-[#22d3ee]">FlyRank AI</p>
              <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">Building production AI backends with FastAPI, integrating agent SDKs, and shipping scalable AI-powered services. Working on real-world deployment patterns for agentic systems.</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{[<TechTag key="f" name="FastAPI" />,<TechTag key="n" name="Neon DB" />,<TechTag key="a" name="Agent SDKs" />,<TechTag key="d" name="Docker" />]}</div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="EDUCATION & CERTIFICATIONS" title="Training that bridges two worlds" />
          <SectionReveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { inst:"PIAIC", title:"Certified Agentic AI Architect", date:"Jun 2026", color:"#22d3ee" },
                { inst:"SMIT", title:"Certified Agentic AI Engineer", date:"2026 Edition — In Progress", color:"#22d3ee" },
                { inst:"Autocon", title:"Industrial Automation — PLC, HMI, SCADA", date:"4-month program", color:"#16a34a" },
                { inst:"Aligarh Inst. of Tech", title:"DAE — Chemical Technology", date:"2024", color:"#94a3b8" },
                { inst:"Aptech Pakistan", title:"ADSE — Software Engineering", date:"CPISM Certified", color:"#94a3b8" },
                { inst:"Cisco Networking Academy", title:"CCNA — Intro to Networks", date:"2026", color:"#94a3b8" },
              ].map(e => (
                <div key={e.inst} className="glass rounded-xl border border-[#1e293b] p-5 transition-all duration-200 hover:border-[#334155] hover:-translate-y-px">
                  <h3 className="font-semibold">{e.inst}</h3>
                  <p className="text-sm font-medium" style={{ color: e.color }}>{e.title}</p>
                  <p className="mt-1 text-xs text-[#64748b]">{e.date}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section id="tech" className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="TECHNOLOGY STACK" title="SMIT Mandatory 2026 Stack" subtitle="Where each technology applies — current usage and planned deployments across Industry 4.0 projects" />
          <SectionReveal>
            <div className="mb-6 flex flex-wrap gap-3">
              <Badge color="cyan">Agent Frameworks</Badge>
              <Badge color="green">Protocols</Badge>
              <Badge color="amber">Data & Infra</Badge>
              <Badge color="purple">Observability</Badge>
            </div>
            <TechMatrix />
          </SectionReveal>
        </div>
      </section>

      {/* ── Current Projects ── */}
      <section id="projects" className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="CURRENT PROJECTS" title="AI agents working today" subtitle="Production and near-production systems bridging AI and industrial domains" />
          <SectionRevealStagger>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCard large badge={{ color:"purple", label:"SMIT Class-5" }} title="E-commerce Agent System" desc="Multi-agent e-commerce system with tool-calling agents, product search, order processing, and customer service orchestration." techs={["Claude Code","MCP","Agent SDKs","Python"]} href="https://github.com/aliaftabsheikh/SMIT-batch04-weekdays-agentic-ai/tree/class-5-ecommerce-agents-skills/class-5" />
              <ProjectCard badge={{ color:"green", label:"Industrial AI" }} title="Process Monitoring Agent" desc="AI agent monitoring reactor cooling loops, pressure sensors, and temperature thresholds. Fault-detection dashboards + CLI tools for plant operators." techs={["Python","SCADA","FastAPI","Neon DB"]} />
              <ProjectCard badge={{ color:"amber", label:"ML + Automation" }} title="Predictive Maintenance Pipeline" desc="ML models for predictive maintenance in chemical industries. Real-time analytics pipeline with Python, SQL, and sensor data for early fault prediction." techs={["Python","SQL","scikit-learn","ML"]} />
              <ProjectCard badge={{ color:"cyan", label:"Desktop + CLI" }} title="Operator Tool Suite" desc="CLI and GUI tools for industrial environments — sensor threshold monitors, alarm dashboards, and data logging for plant floor operators." techs={["Python","PyQt","CLI","SQLite"]} />
            </div>
          </SectionRevealStagger>
        </div>
      </section>

      {/* ── GitHub Repositories ── */}
      <section className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="OPEN SOURCE" title="GitHub repositories" subtitle="Production code, experiments, and integration tooling — all public on GitHub" />
          <SectionRevealStagger>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                badge={{ color: "green", label: "Industrial Python" }}
                title="sensor-threshold-monitor"
                desc="Python-based sensor threshold monitoring system for industrial environments. Reads sensor data streams, alerts on threshold violations, and logs for predictive analysis."
                techs={["Python", "Sensors", "Monitoring"]}
                href="https://github.com/usman-shamim/sensor-threshold-monitor"
              />
              <ProjectCard
                badge={{ color: "purple", label: "AI Agent Integration" }}
                title="bagisto-automation"
                desc="Bearer-token REST API + admin review queue + signed webhooks for Bagisto e-commerce. Built as an integration substrate for external AI agents to interact with store operations."
                techs={["PHP", "REST API", "Webhooks", "AI Agents"]}
                href="https://github.com/usman-shamim/bagisto-automation"
              />
              <ProjectCard
                badge={{ color: "cyan", label: "AI Memory Systems" }}
                title="sentinal-memory"
                desc="Experiments and implementations around persistent AI memory systems — foundational work toward mem0 and LangMem integration for long-term agent memory in SMIT modules."
                techs={["Python", "Memory", "AI Agents"]}
                href="https://github.com/usman-shamim/sentinal-memory"
              />
            </div>
          </SectionRevealStagger>
        </div>
      </section>

      {/* ── Industry 4.0 Roadmap ── */}
      <section className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="INDUSTRY 4.0 ROADMAP" title="Agentic systems for the factory floor" subtitle="Coming-soon projects at the convergence of chemical engineering, industrial automation, and agentic AI — built on the SMIT 2026 mandatory stack" />
          <SectionRevealStagger>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ComingSoonCard badge={{ color:"green", label:"SAP + PLC Bridge" }} title="OPC UA Agent Gateway" desc="MCP server bridging SAP S/4HANA and Siemens S7-1200 PLCs. AI agent reads production orders from SAP, monitors PLC data via OPC UA, and triggers predictive maintenance workflows." module="Module 3 — MCP + A2A" />
              <ComingSoonCard badge={{ color:"cyan", label:"Digital Twin" }} title="Chemical Reactor Digital Twin" desc="LangGraph agent running digital twin simulations of chemical reactors. Compares real-time SCADA data against simulated states, flags anomalies, and suggests corrective actions." module="Module 2 — LangGraph" />
              <ComingSoonCard badge={{ color:"purple", label:"MES / SCADA" }} title="Production Optimization Agent" desc="Multi-agent system connecting MES with real-time SCADA. Supervisor agent orchestrates quality, throughput, and energy optimization sub-agents via A2A protocol." module="Module 3 — A2A Protocol" />
              <ComingSoonCard badge={{ color:"amber", label:"IIoT Network" }} title="Edge-to-Cloud Sensor Pipeline" desc="n8n workflows ingesting MQTT sensor streams from factory floor. RAG pipeline indexes sensor data (Pinecone) for natural-language queries like 'show temperature anomalies last shift.'" module="Module 2 — n8n + RAG" />
              <ComingSoonCard badge={{ color:"green", label:"Supply Chain" }} title="Multi-Agent Logistics Orchestrator" desc="Supply chain agents negotiating inventory, procurement, and shipping via A2A. OpenAI Agents SDK powers distributed decision-making across warehouse, transport, and supplier agents." module="Module 3 — OpenAI SDK + A2A" />
              <ComingSoonCard badge={{ color:"cyan", label:"Quality + Vision" }} title="Vision AI Quality Inspector" desc="Computer vision agent for inline quality inspection on production lines. RAG over defect catalogs, LangSmith observability, deployed via Docker on edge hardware." module="Module 3 — RAG + LangSmith" />
              <ComingSoonCard badge={{ color:"purple", label:"ERP / RPA" }} title="Autonomous ERP Agent" desc="n8n-powered RPA agent automating SAP workflows: purchase orders, invoice matching, inventory reconciliation. LLM-powered decision engine handles exceptions, escalates to human." module="Module 4 — n8n + LangSmith" />
              <ComingSoonCard badge={{ color:"amber", label:"AI SOP Agent" }} title="Operator Guidance Assistant" desc="RAG agent built over plant SOPs, safety manuals, and incident logs. Operators query via natural language — 'what's the shutdown sequence for Reactor B?' — with cited sources." module="Module 2 — RAG + Pinecone" />
              <ComingSoonCard badge={{ color:"cyan", label:"Full Platform" }} title="Industry 4.0 Agent Platform" desc="Capstone: Dockerized multi-agent platform unifying all modules. Dapr sidecars, A2A inter-agent communication, LangSmith observability, Neon DB persistence." module="Module 4 — Capstone" />
            </div>
          </SectionRevealStagger>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section id="case-studies" className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="CASE STUDIES" title="Applied Industry 4.0 intelligence" subtitle="Real-world scenarios demonstrating how agentic AI transforms chemical manufacturing operations" />
          <SectionRevealStagger>
            <div className="grid gap-8 lg:grid-cols-2">
              {[
                {
                  title:"Reactor Temperature Anomaly — Real-Time Agent Response",
                  scenario:"A chemical batch reactor in Karachi's industrial corridor shows a 12°C deviation from setpoint. Traditional SCADA triggers an alarm; operator has 4 minutes to diagnose and respond.",
                  solution:"The Process Monitoring Agent detects the anomaly via OPC UA sensor stream, cross-references against the digital twin simulation, identifies cooling water valve degradation as root cause, and suggests corrective action — all within 90 seconds.",
                  techs:["PLC/SCADA","Digital Twin","LangGraph","OPC UA"], color:"#22d3ee",
                },
                {
                  title:"Multi-Plant Supply Chain Disruption",
                  scenario:"An upstream solvent supplier delays shipment, threatening production at 3 chemical plants. Manual coordination takes hours of phone calls and spreadsheet updates.",
                  solution:"Supply Chain Agents across all 3 plants negotiate via A2A protocol. Procurement agent identifies alternate supplier, logistics agent re-routes inventory, production agent adjusts batch schedules — autonomous resolution in under 5 minutes.",
                  techs:["A2A Protocol","OpenAI SDK","Multi-Agent","Neon DB"], color:"#16a34a",
                },
                {
                  title:"Predictive Maintenance — From Reactive to Proactive",
                  scenario:"A critical centrifugal pump fails unexpectedly, causing 8 hours of unplanned downtime. Post-mortem reveals vibration data showed degradation 3 weeks earlier.",
                  solution:"Predictive Maintenance Pipeline ingests real-time vibration and temperature data, ML models detect early degradation signatures, MES Agent automatically schedules maintenance during planned downtime — preventing the failure entirely.",
                  techs:["ML","FastAPI","SCADA","MES"], color:"#f59e0b",
                },
                {
                  title:"Operator SOP Overload — AI-Powered Guidance",
                  scenario:"A junior operator faces an unfamiliar alarm during night shift. 200+ page SOP manual sits in the control room. Finding the right procedure takes 8 minutes — every second counts.",
                  solution:"SOP Agent receives alarm context, retrieves exact procedure via RAG over indexed documentation, presents step-by-step guidance with cited sources, and confirms each action via HMI — reducing response time to 45 seconds.",
                  techs:["RAG","Pinecone","Claude Code","HMI"], color:"#a855f7",
                },
              ].map(cs => (
                <div key={cs.title} className="group rounded-xl border border-[#1e293b] bg-[#0e1223] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#334155]">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: cs.color }} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748b]">Case Study</span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-[#f8fafc]">{cs.title}</h3>
                  <div className="mb-3 space-y-2 text-sm text-[#94a3b8]">
                    <p><span className="font-semibold text-[#64748b]">Scenario:</span> {cs.scenario}</p>
                    <p><span className="font-semibold text-[#64748b]">Solution:</span> {cs.solution}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">{cs.techs.map(t=><TechTag key={t} name={t} />)}</div>
                </div>
              ))}
            </div>
          </SectionRevealStagger>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="border-t border-[#1e293b] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="CONTACT" title="Let's build the future of industrial intelligence" />
          <SectionReveal>
            <div className="flex flex-wrap gap-4">
              <ContactButton href="https://www.linkedin.com/in/m-usman-shamim/" target="_blank" rel="noopener noreferrer" label="LinkedIn" icon={LI} />
              <ContactButton href="mailto:usman.shamim@example.com" label="Email" icon={EM} />
              <ContactButton href="https://github.com/" target="_blank" rel="noopener noreferrer" label="GitHub" icon={GH} />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e293b] px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-[#64748b] sm:flex-row">
          <span className="font-mono">M. Usman Shamim &copy; 2026</span>
          <span>Industry 4.0 · Agentic AI · Chemical Technology · PIAIC · SMIT · Autocon</span>
        </div>
      </footer>
    </div>
  );
}

const LI = <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#22d3ee"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const EM = <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>;
const GH = <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#22d3ee"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;

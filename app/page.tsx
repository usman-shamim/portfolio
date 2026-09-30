import {
  Navbar,
  Field,
  SkipLink,
  Reveal,
  ServicesList,
  SectionHeader,
  StatusMark,
  Tag,
  Ledger,
  Row,
  DefList,
  ServiceStrip,
  StackMap,
  ContactAction,
  CopyEmail,
  LinkedInIcon,
  EmailIcon,
  GitHubIcon,
} from "./components";

const EMAIL = "usman2007.ap@gmail.com";

const SERVICES = [
  {
    name: "AI agents",
    detail: "Design, build and deploy agentic systems: tool-calling agents, MCP integrations, guardrails, and typed output a downstream system can act on.",
    forWho: "teams automating a repeated decision",
  },
  {
    name: "Workflow automation",
    detail: "n8n workflows that connect the systems you already run, so data moves between them without a person copying it.",
    forWho: "teams losing hours to manual handoffs",
  },
  {
    name: "Web development",
    detail: "Sites and web applications, from a single landing page to an internal tool with a real backend.",
    forWho: "businesses with no web presence, or a poor one",
  },
  {
    name: "Voice receptionist",
    detail: "A voice agent that answers your calls: books the appointment, takes the address and the problem, triages what is urgent and hands the rest to your team. Built on Pipecat for real-time speech.",
    forWho: "contractors, clinics, and any business that lives on the phone",
  },
];

const AGENTIC = [
  { term: "Agent development", detail: "Claude Code, MCP and the agent SDKs, working through the 86-chapter AI Agent Factory curriculum." },
  { term: "Agent architecture", detail: "Handoffs between specialists, cloned agents with their own instructions, and tool sets that change by tier." },
  { term: "Guardrails and typed output", detail: "Answers checked against the underlying record before they are returned, and results a downstream system can act on." },
  { term: "Cited retrieval", detail: "Answers over governed documents with the source attached, and an explicit abstention when the record does not cover the question." },
  { term: "Model routing", detail: "Provider and model held as configuration, so cost and billing can move without touching agent code." },
  { term: "Backend and data", detail: "Python pipelines, SQL and real-time analytics behind the agent layer." },
];

const PLANT = [
  { term: "Chemical process grounding", detail: "DAE in chemical technology: unit operations, process flow and control fundamentals." },
  { term: "Reactor and loop monitoring", detail: "Cooling loops, pressure and temperature thresholds, and the alarm logic that sits on top of them." },
  { term: "Plant monitoring software", detail: "Threshold and alarm logic, sensor history and fault classification in a desktop SCADA-style dashboard." },
  { term: "Agentic SCADA", detail: "AgriAgent: perception, formulation and actuation agents over MCP, driving an MQTT digital twin." },
  { term: "Predictive maintenance", detail: "Degradation features and models for rotating equipment, fed by sensor history." },
  { term: "MQTT and edge actuation", detail: "Publish and subscribe between plant devices and services, driving an ESP32 dosing rig." },
];

export default function Home() {
  return (
    <div className="gutter min-h-screen text-ink">
      <Field />
      <SkipLink />
      <Navbar />

      {/* tabIndex -1 makes the landmark a real focus target for the skip link. */}
      <main id="main" tabIndex={-1}>

      {/* ── Hero ── */}
      <section id="top" className="relative pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="mx-auto w-full max-w-6xl">
          <p className="hero-chunk mono mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-ink-3">
            <span className="text-signal">Forward deployed engineer</span>
            <span aria-hidden="true">/</span>
            <span>Chemical technology + agentic AI</span>
          </p>

          <h1 className="hero-chunk max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-7xl">
            M. Usman Shamim
          </h1>

          <p className="hero-chunk mt-6 max-w-2xl text-base leading-[1.6] text-ink-2 sm:text-lg">
            I build AI systems for process plants and for service businesses. Operators get agents
            that watch reactor loops, answer procedure questions with the source attached and flag
            drift before it becomes an alarm. Contractors get an agent that answers the phone. My
            grounding is chemical technology, and everything below is a system I built and can
            show you.
          </p>

          <div className="hero-chunk mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#services"
              className="press inline-flex min-h-12 w-full items-center justify-center border border-signal bg-signal px-5 text-sm font-medium hover:bg-ink hover:border-ink active:scale-[0.98] sm:w-auto"
            >
              See what I take on
            </a>
            <a
              href="#work"
              className="press inline-flex min-h-12 w-full items-center justify-center border border-line-strong px-5 text-sm font-medium text-ink-2 hover:border-signal hover:text-ink active:scale-[0.98] active:bg-raise sm:w-auto"
            >
              See the shipped work
            </a>
          </div>

          <div className="hero-chunk mt-14 border-t border-line pt-6">
            <ServiceStrip />
          </div>

          <div className="hero-chunk mt-14 border border-line bg-panel p-5">
            <p className="mono text-xs leading-[1.8] text-ink-3">
              <span className="text-signal">$</span> whoami
              <br />
              <span className="text-ink-2">Forward deployed engineer, chemical technology and agentic AI</span>
              <br />
              <span className="text-signal">$</span> cat stack.txt
              <br />
              <span className="text-ink-2">
                Python · OpenAI Agents SDK · MCP · MQTT · FastAPI · Chainlit
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 01 Services ── */}
      <section id="services" className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="01"
            label="Services"
            title="What I take on"
            lede="Small engagements, delivered end to end. If the work is better done another way, I will say so before you spend anything."
          />

          <ServicesList items={SERVICES} />
        </div>
      </section>

      {/* ── 02 Capabilities ── */}
      <section id="capabilities" className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="02"
            label="Capabilities"
            title="Two disciplines that rarely sit in one person"
            lede="Each item is something I have built or studied. Where a capability has a system behind it, the system is named."
          />

          <Reveal>
            <div className="border border-line bg-panel p-6 md:p-8">
              <h3 className="mono mb-6 text-[11px] uppercase tracking-[0.18em] text-signal">
                Agent engineering
              </h3>
              <DefList items={AGENTIC} />
            </div>

            <div className="mt-6 border border-line bg-panel p-6 md:p-8">
              <h3 className="mono mb-6 text-[11px] uppercase tracking-[0.18em] text-running">
                Chemical process and plant systems
              </h3>
              <DefList items={PLANT} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 03 Experience ── */}
      <section id="experience" className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader index="03" label="Experience" title="Where the work happens" />

          <Reveal>
            <div className="border-s border-line-strong ps-6">
              <StatusMark tone="running">in service</StatusMark>
              <h3 className="mt-3 text-lg font-semibold text-ink">Backend AI Engineering Intern</h3>
              <p className="mono mt-1 text-xs tracking-[0.1em] text-signal">FlyRank AI · June 2026 to present</p>
              <p className="body-text measure mt-4 text-ink-2">
                Building production AI backends: FastAPI services, agent SDK integration and the
                deployment patterns that keep agentic systems running outside a notebook.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["FastAPI", "Neon DB", "Agent SDKs"].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 Credentials ── */}
      <section id="credentials" className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="04"
            label="Credentials"
            title="What I am studying, and what I finished"
          />

          <Reveal>
            <h3 className="mono mb-2 text-[11px] uppercase tracking-[0.18em] text-ink-3">
              In progress
            </h3>
            <Ledger>
              <Row
                title="AI Architect"
                meta="PIAIC · 2026"
                status={{ tone: "signal", label: "in progress" }}
              />
              <Row
                title="Agentic AI Engineer"
                meta="SMIT · 2026 edition"
                status={{ tone: "signal", label: "still in progress" }}
              />
              <Row
                title="DAE, Chemical Technology"
                meta="Aligarh Institute of Technology"
                status={{ tone: "signal", label: "in progress" }}
              />
              <Row
                title="AI Agent Factory curriculum"
                meta="86 chapters on agent development"
                href="https://agentfactory.panaversity.org/"
              />
            </Ledger>

            <h3 className="mono mb-2 mt-10 text-[11px] uppercase tracking-[0.18em] text-ink-3">
              Paused
            </h3>
            <Ledger>
              <Row
                title="ADSE, Software Engineering"
                meta="Aptech Pakistan"
                status={{ tone: "signal", label: "paused" }}
              />
            </Ledger>

            <h3 className="mono mb-2 mt-10 text-[11px] uppercase tracking-[0.18em] text-ink-3">
              Completed
            </h3>
            <Ledger>
              <Row title="CPISM" meta="Aptech Pakistan · certified" />
              <Row title="CCNA, Introduction to Networks" meta="Cisco Networking Academy · 2026" />
            </Ledger>
          </Reveal>
        </div>
      </section>

      {/* ── 05 Stack ── */}
      <section id="stack" className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="05"
            label="Stack"
            title="What I build with"
            lede="Grouped by layer rather than by vendor. Anything not yet running under a real system says planned."
          />

          <Reveal>
            <StackMap />
          </Reveal>
        </div>
      </section>

      {/* ── 06 Work ── */}
      <section id="work" className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="06"
            label="Work"
            title="Systems that run"
            lede="Public and running. Each entry links to the source. Client and internal systems follow in the next section, where they cannot be linked."
          />

          <Reveal>
            <article className="border border-line-strong bg-panel p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusMark tone="running">open source</StatusMark>
                <span className="mono text-[11px] tracking-[0.14em] text-ink-3">
                  Agentic SCADA · Python
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">AgriAgent</h3>
              <p className="body-text measure mt-3 text-ink-2">
                Biopesticides are safe but fragile: UV and heat destroy them within hours of
                mixing. AgriAgent reads live UV, temperature and humidity telemetry, works out how
                fast the active ingredient is degrading, and dispatches the corrected recipe over
                MQTT to a dosing rig or its digital twin.
              </p>
              <ul className="body-text measure mt-5 space-y-2 text-ink-2">
                <li className="border-t border-line pt-2">
                  <span className="text-ink">Perception, formulation, safety, actuator</span> as four agent roles over MCP tool calls.
                </li>
                <li className="border-t border-line pt-2">
                  <span className="text-ink">Dynamic stoichiometry</span>, recomputed from live conditions rather than chosen from a table.
                </li>
                <li className="border-t border-line pt-2">
                  <span className="text-ink">An MQTT digital twin</span> of the mixing loop, with an optional ESP32 rig for peristaltic dosing.
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["Python", "MCP", "MQTT", "Digital twin", "ESP32"].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <a
                href="https://github.com/usman-shamim/AgriAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="mono press group mt-6 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.14em] text-signal hover:text-ink"
              >
                Read the source{" "}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </article>

            <h3 className="mono mb-2 mt-12 text-[11px] uppercase tracking-[0.18em] text-ink-3">
              Also public
            </h3>
            <Ledger>
              <Row
                title="Saylani student ops desk"
                meta="OpenAI Agents SDK · Python"
                detail="A bootcamp front desk. One student asks in plain language; the Desk works out whether it is an assignment, career or admin question, answers from real course data, and closes every resolved conversation with a structured ticket a downstream system could file."
                tags={["gpt-5-nano", "Handoffs", "Guardrails", "Chainlit"]}
                href="https://github.com/usman-shamim/student-desk"
              />
              <Row
                title="Shop Desk"
                meta="OpenAI Agents SDK · Python"
                detail="A storefront front desk. Answers price and stock questions from a catalogue file, assembles a typed order when the customer confirms, and refuses any price or SKU that is not in the catalogue."
                tags={["Output guardrail", "Tool gating", "Typed orders"]}
                href="https://github.com/usman-shamim/shop-desk"
              />
              <Row
                title="Lead Desk"
                meta="OpenAI Agents SDK · Python"
                detail="Triages incoming freelance leads into a typed verdict. The model never sees the rate card, the decision to save a lead is made in Python rather than by the model, and a request to misrepresent experience is refused before an API call is spent."
                tags={["Typed output", "Tool isolation", "Gemini"]}
                href="https://github.com/usman-shamim/Lead-Desk"
              />
              <Row
                title="Sensor threshold monitor"
                meta="Python"
                detail="Two cooperating tools for plant monitoring: a standard-library CLI that checks CSV sensor readings against configurable thresholds, and a desktop SCADA dashboard that watches a reactor cooling loop, raises alarms and classifies faults. Both share one threshold implementation."
                tags={["SCADA", "Alarms", "Standard library only"]}
                href="https://github.com/usman-shamim/sensor-threshold-monitor"
              />
              <Row
                title="One agent, two providers"
                meta="OpenAI Agents SDK · Python"
                detail="A single Agent definition that runs on either OpenAI or Gemini, switched by one line in .env. Written after a client needed Gemini for billing reasons without the agent code changing."
                tags={["Config over code", "Gemini", "OpenAI"]}
                href="https://github.com/usman-shamim/openai-agents-multi-provider"
              />
              <Row
                title="ctxpack"
                meta="Python · standard library"
                detail="A context-engineering CLI. Given a project folder, a task and a token budget, it packs the most relevant files into one markdown bundle, with a manifest accounting for every file it kept or dropped."
                tags={["Context engineering", "CLI"]}
                href="https://github.com/usman-shamim/hackathon"
              />
              <Row
                title="bagisto-automation"
                meta="PHP"
                detail="A bearer-token REST API, an admin review queue and signed webhooks for Bagisto, built so an external agent can drive store operations without going through the admin UI."
                tags={["REST API", "Webhooks", "AI agents"]}
                href="https://github.com/usman-shamim/bagisto-automation"
              />
            </Ledger>

            <h3 className="mono mb-2 mt-12 text-[11px] uppercase tracking-[0.18em] text-ink-3">
              In development
            </h3>
            <Ledger>
              <Row
                title="Field-service voice receptionist"
                meta="Pipecat · in development"
                detail="A voice agent that answers the calls a contractor cannot get to: books the call-out, captures the address and the fault, triages emergencies and hands the job to the office. Built for HVAC, plumbing and electrical businesses, where a missed call is a job that went to somebody else."
                tags={["Pipecat", "Real-time voice", "Booking", "HVAC"]}
              />
              <Row
                title="Inbound voice receptionist"
                meta="Pipecat · in development"
                detail="The general version, for any business that lives on the phone: answers, qualifies and routes, with a transcript and a summary waiting for the person who picks it up."
                tags={["Pipecat", "Voice", "Qualification", "Handoff"]}
              />
            </Ledger>
          </Reveal>
        </div>
      </section>

      {/* ── 07 Private ── */}
      <section id="private" className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="07"
            label="Private"
            title="Client and internal systems"
            lede="Working systems that cannot be linked. The depth is real, so they are described here; the code is not mine to publish."
          />

          <Reveal>
            <Ledger>
              <Row
                title="SOPGuard"
                meta="Private · lab and chemical compliance"
                detail="A lab SOP compliance platform. Paste a procedure and get a structured report of which required sections are present or missing, with a citation to the governed SOP behind every flag. When the record does not cover a question, it says so instead of guessing."
                tags={["Governed knowledge", "Cited retrieval", "Abstention"]}
              />
              <Row
                title="Open agentic knowledge stack"
                meta="Private · personal infrastructure"
                detail="The system behind this work: a markdown vault as the storage layer, a governed knowledge record served over a stateless MCP endpoint, a self-improving agent as the client, and a Git-based sync service keeping it multi-device. Every layer is a separate repository behind a published contract."
                tags={["MCP", "Knowledge governance", "FastAPI", "Git sync"]}
              />
              <Row
                title="Lab toolkit conventions"
                meta="Private · engineering standards"
                detail="The house rules every module in this lab follows: MCP-first interfaces, one model-agnostic wrapper for every LLM call, stateless cores with state only at the edges, and configuration over hardcoding."
                tags={["MCP-first", "Model-agnostic", "Config over hardcoding"]}
              />
              <Row
                title="Bagisto store build"
                meta="Private · commerce"
                detail="A complete Bagisto commerce build across backend and frontend, with the specifications and state notes that go with it. The public bagisto-automation integration was written against this store."
                tags={["PHP", "Bagisto", "Specs"]}
              />
            </Ledger>
          </Reveal>
        </div>
      </section>

      {/* ── 08 Contact ── */}
      <section id="contact" className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="08"
            label="Contact"
            title="Tell me the problem you keep paying for"
            lede="Send the process, the constraint, or the call you keep missing. I will tell you plainly whether an agent is the right answer, and what it would take."
          />

          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ContactAction href={`mailto:${EMAIL}`} label="Email" icon={<EmailIcon />} />
              <CopyEmail address={EMAIL} />
              <ContactAction
                href="https://www.linkedin.com/in/m-usman-shamim/"
                label="LinkedIn"
                icon={<LinkedInIcon />}
                external
              />
              <ContactAction
                href="https://github.com/usman-shamim"
                label="GitHub"
                icon={<GitHubIcon />}
                external
              />
            </div>
          </Reveal>
        </div>
      </section>

      </main>

      <footer className="pad-safe-bottom border-t border-line py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="mono text-xs tracking-[0.14em] text-ink-3">
            M. Usman Shamim © 2026
          </span>
          <span className="mono text-xs tracking-[0.14em] text-ink-3">
            Agentic AI · Chemical technology · Automation
          </span>
        </div>
      </footer>
    </div>
  );
}

/*
  Every string the site renders lives here.

  The nav, the pages and the footer all read from this file, so a section cannot
  drift out of step with its own label, and adding a route means adding one entry
  rather than editing three files.
*/

export const EMAIL = "usman2007.ap@gmail.com";

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/m-usman-shamim/",
  github: "https://github.com/usman-shamim",
  agentFactory: "https://agentfactory.panaversity.org/",
  agriAgent: "https://github.com/usman-shamim/AgriAgent",
};

export const NAME = "M. Usman Shamim";
export const ROLE = "Forward deployed engineer";
export const DISCIPLINES = "Chemical technology + agentic AI";

export const CLAIM =
  "I build AI systems for process plants and for service businesses. Operators get agents that watch reactor loops, answer procedure questions with the source attached and flag drift before it becomes an alarm. Contractors get an agent that answers the phone. My grounding is chemical technology, and everything here is a system I built and can show you.";

/* The eight sections. `blurb` is the one line the index and the compact menu
   show; `lede` is the longer paragraph each route opens with. */
export const SECTIONS = [
  {
    slug: "services",
    index: "01",
    label: "Services",
    title: "What I take on",
    blurb: "Four ways I work with a business, delivered end to end.",
    lede: "Small engagements, delivered end to end. If the work is better done another way, I will say so before you spend anything.",
  },
  {
    slug: "capabilities",
    index: "02",
    label: "Capabilities",
    title: "Capabilities",
    blurb: "Agent engineering, and chemical process and plant systems.",
    lede: "Each item is something I have built or studied. Where a capability has a system behind it, the system is named.",
  },
  {
    slug: "experience",
    index: "03",
    label: "Experience",
    title: "Experience",
    blurb: "Backend AI engineering at FlyRank AI, in service now.",
    lede: "What I am doing for someone else right now, and what it involves.",
  },
  {
    slug: "credentials",
    index: "04",
    label: "Credentials",
    title: "Credentials",
    blurb: "Four in progress, one paused, two completed. Stated as they are.",
    lede: "Nothing here is overstated. What is unfinished says so, and what is certified says that.",
  },
  {
    slug: "stack",
    index: "05",
    label: "Stack",
    title: "Stack",
    blurb: "Five layers, from agents down to plant data and delivery.",
    lede: "Grouped by layer rather than by vendor. Anything not yet running under a real system says planned.",
  },
  {
    slug: "work",
    index: "06",
    label: "Work",
    title: "Work",
    blurb: "Eight public repositories and two systems still in development.",
    lede: "Public and running. Each entry links to the source. Client and internal systems are on the next page, where they cannot be linked.",
  },
  {
    slug: "private",
    index: "07",
    label: "Private",
    title: "Private systems",
    blurb: "Four working systems I cannot publish the source for.",
    lede: "Working systems that cannot be linked. The depth is real, so they are described here; the code is not mine to publish.",
  },
  {
    slug: "contact",
    index: "08",
    label: "Contact",
    title: "Tell me the problem you keep paying for",
    blurb: "Send the process, the constraint, or the call you keep missing.",
    lede: "Send the process, the constraint, or the call you keep missing. I will tell you plainly whether an agent is the right answer, and what it would take.",
  },
] as const;

export type Section = (typeof SECTIONS)[number];

/* One lookup so a route and its nav entry can never disagree. */
export function section(slug: string): Section {
  const found = SECTIONS.find((s) => s.slug === slug);
  if (!found) throw new Error(`no section named ${slug}`);
  return found;
}

/* What is running right now. Kept on the home page, where a visitor deciding
   whether to read on needs to see that the work is in service and not a hobby. */
export const CURRENT = [
  {
    label: "FlyRank AI",
    detail: "Backend AI engineering intern, building FastAPI services and agent SDK integration.",
    status: "in service",
    tone: "running" as const,
  },
  {
    label: "PIAIC",
    detail: "AI Architect track, worked through alongside everything below.",
    status: "in progress",
    tone: "signal" as const,
  },
  {
    label: "SMIT",
    detail: "Agentic AI Engineer programme, 2026 edition.",
    status: "still in progress",
    tone: "signal" as const,
  },
];

/* ── 01 Services ── */

export const SERVICES = [
  {
    name: "AI agents",
    detail:
      "Design, build and deploy agentic systems: tool-calling agents, MCP integrations, guardrails, and typed output a downstream system can act on.",
    forWho: "teams automating a repeated decision",
  },
  {
    name: "Workflow automation",
    detail:
      "n8n workflows that connect the systems you already run, so data moves between them without a person copying it.",
    forWho: "teams losing hours to manual handoffs",
  },
  {
    name: "Web development",
    detail:
      "Sites and web applications, from a single landing page to an internal tool with a real backend.",
    forWho: "businesses with no web presence, or a poor one",
  },
  {
    name: "Voice receptionist",
    detail:
      "A voice agent that answers your calls: books the appointment, takes the address and the problem, triages what is urgent and hands the rest to your team. Built on Pipecat for real-time speech.",
    forWho: "contractors, clinics, and any business that lives on the phone",
  },
];

/* ── 02 Capabilities ── */

export const AGENTIC = [
  {
    term: "Agent development",
    detail:
      "Claude Code, MCP and the agent SDKs, working through the 86-chapter AI Agent Factory curriculum.",
  },
  {
    term: "Agent architecture",
    detail:
      "Handoffs between specialists, cloned agents with their own instructions, and tool sets that change by tier.",
  },
  {
    term: "Guardrails and typed output",
    detail:
      "Answers checked against the underlying record before they are returned, and results a downstream system can act on.",
  },
  {
    term: "Cited retrieval",
    detail:
      "Answers over governed documents with the source attached, and an explicit abstention when the record does not cover the question.",
  },
  {
    term: "Model routing",
    detail:
      "Provider and model held as configuration, so cost and billing can move without touching agent code.",
  },
  {
    term: "Backend and data",
    detail:
      "Python pipelines, SQL and real-time analytics behind the agent layer.",
  },
];

export const PLANT = [
  {
    term: "Chemical process grounding",
    detail:
      "DAE in chemical technology: unit operations, process flow and control fundamentals.",
  },
  {
    term: "Reactor and loop monitoring",
    detail:
      "Cooling loops, pressure and temperature thresholds, and the alarm logic that sits on top of them.",
  },
  {
    term: "Plant monitoring software",
    detail:
      "Threshold and alarm logic, sensor history and fault classification in a desktop SCADA-style dashboard.",
  },
  {
    term: "Agentic SCADA",
    detail:
      "AgriAgent: perception, formulation and actuation agents over MCP, driving an MQTT digital twin.",
  },
  {
    term: "Predictive maintenance",
    detail:
      "Degradation features and models for rotating equipment, fed by sensor history.",
  },
  {
    term: "MQTT and edge actuation",
    detail:
      "Publish and subscribe between plant devices and services, driving an ESP32 dosing rig.",
  },
];

/* ── 04 Credentials ── */

export const CREDENTIALS = {
  inProgress: [
    { title: "AI Architect", meta: "PIAIC · 2026", status: "in progress" },
    { title: "Agentic AI Engineer", meta: "SMIT · 2026 edition", status: "still in progress" },
    { title: "DAE, Chemical Technology", meta: "Aligarh Institute of Technology", status: "in progress" },
  ],
  paused: [{ title: "ADSE, Software Engineering", meta: "Aptech Pakistan", status: "paused" }],
  completed: [
    { title: "CPISM", meta: "Aptech Pakistan · certified" },
    { title: "CCNA, Introduction to Networks", meta: "Cisco Networking Academy · 2026" },
  ],
} as const;

/* ── 05 Stack ── */

export const STACK_LAYERS: { layer: string; items: { name: string; planned?: boolean }[] }[] = [
  {
    layer: "Agents",
    items: [
      { name: "OpenAI Agents SDK" },
      { name: "MCP" },
      { name: "handoffs and cloned specialists" },
      { name: "output guardrails" },
      { name: "typed structured outputs" },
    ],
  },
  {
    layer: "Models",
    items: [
      { name: "gpt-5-nano" },
      { name: "gpt-5-mini" },
      { name: "Gemini" },
      { name: "provider switched by config" },
    ],
  },
  {
    layer: "Retrieval",
    items: [
      { name: "cited retrieval over a governed document set" },
      { name: "Pinecone", planned: true },
    ],
  },
  {
    layer: "Plant data",
    items: [
      { name: "MQTT" },
      { name: "SCADA-style dashboards" },
      { name: "threshold and alarm logic" },
      { name: "ESP32 and relay actuation" },
      { name: "OPC UA", planned: true },
    ],
  },
  {
    layer: "Delivery",
    items: [
      { name: "Python" },
      { name: "Chainlit" },
      { name: "FastAPI" },
      { name: "offline test suites" },
      { name: "Docker", planned: true },
    ],
  },
];

/* ── 06 Work ── */

export const WORK_LEAD = {
  status: "open source",
  meta: "Agentic SCADA · Python",
  title: "AgriAgent",
  detail:
    "Biopesticides are safe but fragile: UV and heat destroy them within hours of mixing. AgriAgent reads live UV, temperature and humidity telemetry, works out how fast the active ingredient is degrading, and dispatches the corrected recipe over MQTT to a dosing rig or its digital twin.",
  points: [
    {
      strong: "Perception, formulation, safety, actuator",
      rest: " as four agent roles over MCP tool calls.",
    },
    {
      strong: "Dynamic stoichiometry",
      rest: ", recomputed from live conditions rather than chosen from a table.",
    },
    {
      strong: "An MQTT digital twin",
      rest: " of the mixing loop, with an optional ESP32 rig for peristaltic dosing.",
    },
  ],
  tags: ["Python", "MCP", "MQTT", "Digital twin", "ESP32"],
  href: LINKS.agriAgent,
};

export const WORK_PUBLIC = [
  {
    title: "Saylani student ops desk",
    meta: "OpenAI Agents SDK · Python",
    detail:
      "A bootcamp front desk. One student asks in plain language; the Desk works out whether it is an assignment, career or admin question, answers from real course data, and closes every resolved conversation with a structured ticket a downstream system could file.",
    tags: ["gpt-5-nano", "Handoffs", "Guardrails", "Chainlit"],
    href: "https://github.com/usman-shamim/student-desk",
  },
  {
    title: "Shop Desk",
    meta: "OpenAI Agents SDK · Python",
    detail:
      "A storefront front desk. Answers price and stock questions from a catalogue file, assembles a typed order when the customer confirms, and refuses any price or SKU that is not in the catalogue.",
    tags: ["Output guardrail", "Tool gating", "Typed orders"],
    href: "https://github.com/usman-shamim/shop-desk",
  },
  {
    title: "Lead Desk",
    meta: "OpenAI Agents SDK · Python",
    detail:
      "Triages incoming freelance leads into a typed verdict. The model never sees the rate card, the decision to save a lead is made in Python rather than by the model, and a request to misrepresent experience is refused before an API call is spent.",
    tags: ["Typed output", "Tool isolation", "Gemini"],
    href: "https://github.com/usman-shamim/Lead-Desk",
  },
  {
    title: "Sensor threshold monitor",
    meta: "Python",
    detail:
      "Two cooperating tools for plant monitoring: a standard-library CLI that checks CSV sensor readings against configurable thresholds, and a desktop SCADA dashboard that watches a reactor cooling loop, raises alarms and classifies faults. Both share one threshold implementation.",
    tags: ["SCADA", "Alarms", "Standard library only"],
    href: "https://github.com/usman-shamim/sensor-threshold-monitor",
  },
  {
    title: "One agent, two providers",
    meta: "OpenAI Agents SDK · Python",
    detail:
      "A single Agent definition that runs on either OpenAI or Gemini, switched by one line in .env. Written after a client needed Gemini for billing reasons without the agent code changing.",
    tags: ["Config over code", "Gemini", "OpenAI"],
    href: "https://github.com/usman-shamim/openai-agents-multi-provider",
  },
  {
    title: "ctxpack",
    meta: "Python · standard library",
    detail:
      "A context-engineering CLI. Given a project folder, a task and a token budget, it packs the most relevant files into one markdown bundle, with a manifest accounting for every file it kept or dropped.",
    tags: ["Context engineering", "CLI"],
    href: "https://github.com/usman-shamim/hackathon",
  },
  {
    title: "bagisto-automation",
    meta: "PHP",
    detail:
      "A bearer-token REST API, an admin review queue and signed webhooks for Bagisto, built so an external agent can drive store operations without going through the admin UI.",
    tags: ["REST API", "Webhooks", "AI agents"],
    href: "https://github.com/usman-shamim/bagisto-automation",
  },
];

export const WORK_DEV = [
  {
    title: "Field-service voice receptionist",
    meta: "Pipecat · in development",
    detail:
      "A voice agent that answers the calls a contractor cannot get to: books the call-out, captures the address and the fault, triages emergencies and hands the job to the office. Built for HVAC, plumbing and electrical businesses, where a missed call is a job that went to somebody else.",
    tags: ["Pipecat", "Real-time voice", "Booking", "HVAC"],
  },
  {
    title: "Inbound voice receptionist",
    meta: "Pipecat · in development",
    detail:
      "The general version, for any business that lives on the phone: answers, qualifies and routes, with a transcript and a summary waiting for the person who picks it up.",
    tags: ["Pipecat", "Voice", "Qualification", "Handoff"],
  },
];

/* ── 07 Private ── */

export const PRIVATE_SYSTEMS = [
  {
    title: "SOPGuard",
    meta: "Private · lab and chemical compliance",
    detail:
      "A lab SOP compliance platform. Paste a procedure and get a structured report of which required sections are present or missing, with a citation to the governed SOP behind every flag. When the record does not cover a question, it says so instead of guessing.",
    tags: ["Governed knowledge", "Cited retrieval", "Abstention"],
  },
  {
    title: "Open agentic knowledge stack",
    meta: "Private · personal infrastructure",
    detail:
      "The system behind this work: a markdown vault as the storage layer, a governed knowledge record served over a stateless MCP endpoint, a self-improving agent as the client, and a Git-based sync service keeping it multi-device. Every layer is a separate repository behind a published contract.",
    tags: ["MCP", "Knowledge governance", "FastAPI", "Git sync"],
  },
  {
    title: "Lab toolkit conventions",
    meta: "Private · engineering standards",
    detail:
      "The house rules every module in this lab follows: MCP-first interfaces, one model-agnostic wrapper for every LLM call, stateless cores with state only at the edges, and configuration over hardcoding.",
    tags: ["MCP-first", "Model-agnostic", "Config over hardcoding"],
  },
  {
    title: "Bagisto store build",
    meta: "Private · commerce",
    detail:
      "A complete Bagisto commerce build across backend and frontend, with the specifications and state notes that go with it. The public bagisto-automation integration was written against this store.",
    tags: ["PHP", "Bagisto", "Specs"],
  },
];

/* ── 03 Experience ── */

export const EXPERIENCE = {
  status: "in service",
  title: "Backend AI Engineering Intern",
  meta: "FlyRank AI · June 2026 to present",
  detail:
    "Building production AI backends: FastAPI services, agent SDK integration and the deployment patterns that keep agentic systems running outside a notebook.",
  tags: ["FastAPI", "Neon DB", "Agent SDKs"],
};

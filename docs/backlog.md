# Backlog

Planned work, kept off the site so the page shows what exists rather than what might.

**None of these are built.** They are listed because a client or a collaborator may
recognise their own problem in one of them, or want to fund one. Nothing here should be
read as work in service, and nothing here has a customer.

---

## 1. Voice AI receptionist

A real-time voice agent that answers the phone for a service business: books the call-out,
takes the address, qualifies the job and hands the details to the office.

**Target:** HVAC contractors and other field-service businesses (plumbing, electrical,
appliance repair) where the phone is the pipeline and a missed call is a job that went to
someone else.

**Stack:** Pipecat for the speech pipeline.

---

## 2. OPC UA agent gateway

An MCP server bridging SAP and Siemens PLCs: reads production orders, watches plant data
over OPC UA, and raises maintenance work when a threshold is crossed.

**Target:** Manufacturers running SAP alongside Siemens control hardware.

---

## 3. Operator guidance assistant

Cited retrieval over plant SOPs, safety manuals and incident logs, so a night-shift
operator gets the right procedure with its source instead of searching a manual.

**Target:** Plants where procedure lookup is slow enough to matter during an alarm.

---

## 4. Chemical reactor digital twin

A LangGraph agent simulating reactor state, comparing it against live SCADA data, flagging
divergence and proposing corrective action.

---

## 5. Production optimization agent

A supervisor agent coordinating quality, throughput and energy sub-agents over A2A,
connected to MES and SCADA.

---

## 6. Edge-to-cloud sensor pipeline

n8n workflows ingesting MQTT sensor streams, with a retrieval index over the history for
natural-language queries.

---

## 7. Vision quality inspector

Inline inspection on a production line, with retrieval over defect catalogues and traced
runs for observability.

---

## 8. Multi-agent logistics orchestrator

Warehouse, transport and supplier agents negotiating inventory and routing over A2A.

---

## 9. Autonomous ERP agent

RPA over purchase orders, invoice matching and inventory reconciliation, escalating
exceptions to a human.

---

## 10. Industry 4.0 agent platform

The capstone: a containerised multi-agent platform unifying the modules above, with A2A
messaging and persistent storage.

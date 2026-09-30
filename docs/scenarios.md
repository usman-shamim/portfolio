# Applied scenarios

Worked illustrations of how this work runs on a plant floor or at a service desk. They are
**not recorded client engagements** and no figure here is a measured result. They exist to
show the shape of a deployment and the reasoning behind it.

They were kept off the site deliberately: the site shows what exists, and these are arguments,
not evidence.

---

## 1. Reactor temperature drift

**Situation.** A batch reactor deviates 12 degrees from setpoint. The alarm fires and the
operator has minutes to work out why.

**Approach.** An agent reads the live telemetry stream, compares it against the digital twin,
narrows the cause to cooling-water valve degradation, and proposes a corrective action with
the reasoning attached rather than a bare alarm.

---

## 2. Night-shift alarm with no context

**Situation.** A junior operator meets an unfamiliar alarm with a 200-page SOP on the desk and
eight minutes of searching ahead of them.

**Approach.** A retrieval agent takes the alarm context, returns the exact procedure with cited
sources, and confirms each step as it is carried out. If the manual does not cover it, the
agent says so instead of assembling a plausible answer.

---

## 3. An upstream supplier slips

**Situation.** A solvent shipment is delayed and three plants are exposed. Manual coordination
runs to hours of calls and spreadsheets.

**Approach.** Procurement, logistics and production agents negotiate over A2A: one sources an
alternative supplier, one re-routes inventory, one re-sequences batch schedules, and the
decision record is left behind for the humans who own the outcome.

---

## 4. Pump degradation caught early

**Situation.** A centrifugal pump fails without warning and costs eight hours of unplanned
downtime. The post-mortem shows vibration had been degrading for three weeks.

**Approach.** A pipeline ingests vibration and temperature, a model flags early degradation
signatures, and the maintenance window is booked into planned downtime rather than an
unplanned outage.

---

## What these are not

No client is named because none of these were delivered engagements. If you want a recorded
deployment with numbers attached, the public repositories under `#work` are the honest place
to look, and the private systems are described without links because the code is not mine to
publish.

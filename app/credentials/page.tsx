import type { Metadata } from "next";
import { Group, Ledger, PageHeader, Row, SectionTrail } from "../parts";
import { CREDENTIALS, LINKS, section } from "../content";

const meta = section("credentials");

export const metadata: Metadata = {
  title: meta.label,
  description: meta.blurb,
};

export default function CredentialsPage() {
  return (
    <>
      <PageHeader index={meta.index} label={meta.label} title={meta.title} lede={meta.lede} />

      <Group label="In progress" meta="4 records">
        <Ledger>
          {CREDENTIALS.inProgress.map((c) => (
            <Row
              key={c.title}
              title={c.title}
              meta={c.meta}
              status={{ tone: "signal", label: c.status }}
            />
          ))}
          <Row
            title="AI Agent Factory curriculum"
            meta="86 chapters on agent development"
            href={LINKS.agentFactory}
          />
        </Ledger>
      </Group>

      <Group label="Paused" meta="1 record">
        <Ledger>
          {CREDENTIALS.paused.map((c) => (
            <Row
              key={c.title}
              title={c.title}
              meta={c.meta}
              status={{ tone: "signal", label: c.status }}
            />
          ))}
        </Ledger>
      </Group>

      <Group label="Completed" meta="2 records">
        <Ledger>
          {CREDENTIALS.completed.map((c) => (
            <Row key={c.title} title={c.title} meta={c.meta} />
          ))}
        </Ledger>
      </Group>

      <SectionTrail slug="credentials" />
    </>
  );
}

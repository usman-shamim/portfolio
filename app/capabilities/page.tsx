import type { Metadata } from "next";
import { Group, NumberedIndex, PageHeader, SectionTrail } from "../parts";
import { AGENTIC, PLANT, section } from "../content";

const meta = section("capabilities");

export const metadata: Metadata = {
  title: meta.label,
  description: meta.blurb,
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader index={meta.index} label={meta.label} title={meta.title} lede={meta.lede} />

      <Group label="Agent engineering" meta="6 capabilities">
        <NumberedIndex items={AGENTIC} />
      </Group>

      <Group label="Chemical process and plant systems" meta="6 capabilities">
        <NumberedIndex items={PLANT} />
      </Group>

      <SectionTrail slug="capabilities" />
    </>
  );
}

import type { Metadata } from "next";
import { DefList, Group, PageHeader, SectionTrail } from "../parts";
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
        <DefList items={AGENTIC} />
      </Group>

      <Group label="Chemical process and plant systems" meta="6 capabilities">
        <DefList items={PLANT} />
      </Group>

      <SectionTrail slug="capabilities" />
    </>
  );
}

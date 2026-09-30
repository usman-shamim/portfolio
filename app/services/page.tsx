import type { Metadata } from "next";
import { PageHeader, SectionTrail } from "../parts";
import { ServicesList } from "../components";
import { SERVICES, section } from "../content";

const meta = section("services");

export const metadata: Metadata = {
  title: meta.label,
  description: meta.blurb,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader index={meta.index} label={meta.label} title={meta.title} lede={meta.lede} />
      <div className="gutter py-10 md:py-12">
        <ServicesList items={SERVICES} />
      </div>
      <SectionTrail slug="services" />
    </>
  );
}

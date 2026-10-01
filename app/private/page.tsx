import type { Metadata } from "next";
import { Ledger, PageHeader, Row, SectionTrail } from "../parts";
import { PRIVATE_SYSTEMS, section } from "../content";

const meta = section("private");

export const metadata: Metadata = {
  title: meta.label,
  description: meta.blurb,
};

export default function PrivatePage() {
  return (
    <>
      <PageHeader index={meta.index} label={meta.label} title={meta.title} lede={meta.lede} />
      <div className="gutter py-10 md:py-12">
        <Ledger>
          {PRIVATE_SYSTEMS.map((p) => (
            <Row key={p.title} title={p.title} meta={p.meta} detail={p.detail} tags={p.tags} />
          ))}
        </Ledger>
      </div>
      <SectionTrail slug="private" />
    </>
  );
}

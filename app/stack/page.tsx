import type { Metadata } from "next";
import { PageHeader, SectionTrail, StackMap } from "../parts";
import { STACK_LAYERS, section } from "../content";

const meta = section("stack");

export const metadata: Metadata = {
  title: meta.label,
  description: meta.blurb,
};

export default function StackPage() {
  return (
    <>
      <PageHeader index={meta.index} label={meta.label} title={meta.title} lede={meta.lede} />
      <div className="gutter py-10 md:py-12">
        <StackMap layers={STACK_LAYERS} />
      </div>
      <SectionTrail slug="stack" />
    </>
  );
}

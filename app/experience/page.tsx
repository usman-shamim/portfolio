import type { Metadata } from "next";
import { Keywords, PageHeader, SectionTrail, StatusMark } from "../parts";
import { EXPERIENCE, section } from "../content";

const meta = section("experience");

export const metadata: Metadata = {
  title: meta.label,
  description: meta.blurb,
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader index={meta.index} label={meta.label} title={meta.title} lede={meta.lede} />

      <div className="gutter py-10 md:py-12">
        <div className="border-s-2 border-running ps-5">
          <StatusMark tone="running">{EXPERIENCE.status}</StatusMark>
          <h2 className="mt-2.5 text-lg font-medium text-ink">{EXPERIENCE.title}</h2>
          <p className="mono mt-1 text-[11px] tracking-[0.1em] text-ink-3">{EXPERIENCE.meta}</p>
          <p className="body-text measure mt-3 text-ink-2">{EXPERIENCE.detail}</p>
          <Keywords items={EXPERIENCE.tags} />
        </div>
      </div>

      <SectionTrail slug="experience" />
    </>
  );
}

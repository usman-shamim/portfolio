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
        {/* The coloured stripe that used to sit here restated "in service", which
            the status mark already says in words, and the full-width hairline that
            replaced it went with the rest of the row rules when entries separated
            by space instead of lines. With one role there is no sequence for either
            to organise, so the entry is a plain title-with-metadata block like the
            rows around it, just unfenced. */}
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h2 className="text-xl font-semibold tracking-tight text-ink">{EXPERIENCE.title}</h2>
            <span className="mono shrink-0 text-[11px] text-ink-3">{EXPERIENCE.meta}</span>
          </div>
          <div className="mt-2.5">
            <StatusMark tone="running">{EXPERIENCE.status}</StatusMark>
          </div>
          <p className="body-text measure mt-3 text-ink-2">{EXPERIENCE.detail}</p>
          <Keywords items={EXPERIENCE.tags} />
        </div>
      </div>

      <SectionTrail slug="experience" />
    </>
  );
}

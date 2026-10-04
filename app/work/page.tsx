import type { Metadata } from "next";
import { Group, Keywords, Ledger, PageHeader, Row, SectionTrail, StatusMark } from "../parts";
import { WORK_DEV, WORK_LEAD, WORK_PUBLIC, section } from "../content";
import BorderGlow from "../rb/BorderGlow";

const meta = section("work");

export const metadata: Metadata = {
  title: meta.label,
  description: meta.blurb,
};

export default function WorkPage() {
  return (
    <>
      <PageHeader index={meta.index} label={meta.label} title={meta.title} lede={meta.lede} />

      <div className="gutter py-10 md:py-12">
        {/* React Bits BorderGlow: the cursor-led warm edge light on the lead
            project. Tuned to the palette (amber glow, no elevation) so the
            effect reads as this site's instrument light, not a marketing card. */}
        <BorderGlow
          className="work-lead"
          backgroundColor="var(--panel)"
          glowColor="34 68 60"
          colors={["#d9a24f", "#b0803a", "#7d5f2b"]}
          borderRadius={0}
          glowRadius={22}
          glowIntensity={1}
          fillOpacity={0.3}
          edgeSensitivity={24}
        >
          <article className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusMark tone="running">{WORK_LEAD.status}</StatusMark>
            <span className="mono text-[11px] tracking-[0.12em] text-ink-3">{WORK_LEAD.meta}</span>
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink">
            {WORK_LEAD.title}
          </h2>

          <p className="body-text measure mt-3 text-ink-2">{WORK_LEAD.detail}</p>

          <ul className="body-text measure mt-4 space-y-3 text-ink-2">
            {WORK_LEAD.points.map((p) => (
              <li key={p.strong}>
                <span className="text-ink">{p.strong}</span>
                {p.rest}
              </li>
            ))}
          </ul>

          <Keywords items={WORK_LEAD.tags} />

          <a
            href={WORK_LEAD.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mono press group mt-5 inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink active:translate-y-px"
          >
            Read the source{" "}
            <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          </article>
        </BorderGlow>
      </div>

      <Group label="Also public" meta={`${WORK_PUBLIC.length} repositories`}>
        <Ledger>
          {WORK_PUBLIC.map((w) => (
            <Row
              key={w.title}
              title={w.title}
              meta={w.meta}
              detail={w.detail}
              tags={w.tags}
              href={w.href}
            />
          ))}
        </Ledger>
      </Group>

      <Group label="In development" meta="2 systems">
        <Ledger>
          {WORK_DEV.map((w) => (
            <Row key={w.title} title={w.title} meta={w.meta} detail={w.detail} tags={w.tags} />
          ))}
        </Ledger>
      </Group>

      <SectionTrail slug="work" />
    </>
  );
}

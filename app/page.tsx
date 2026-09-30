import { Group, HomeHeader, Ledger, SectionIndex, StatusMark } from "./parts";
import { CURRENT } from "./content";

export default function Home() {
  return (
    <>
      <HomeHeader />

      {/* What is running right now, before the index. A visitor deciding whether
          to read on needs to see that the work is in service. */}
      <Group label="Current" meta="3 active">
        <Ledger>
          {CURRENT.map((c) => (
            <li key={c.label} className="border-t border-line px-1 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-medium text-ink">{c.label}</h3>
                <StatusMark tone={c.tone}>{c.status}</StatusMark>
              </div>
              <p className="body-text measure mt-1.5 text-ink-2">{c.detail}</p>
            </li>
          ))}
        </Ledger>
      </Group>

      <SectionIndex />
    </>
  );
}

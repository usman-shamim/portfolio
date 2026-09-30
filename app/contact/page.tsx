import type { Metadata } from "next";
import {
  ContactAction,
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  PageHeader,
  SectionTrail,
} from "../parts";
import { CopyEmail } from "../components";
import { EMAIL, LINKS, section } from "../content";

const meta = section("contact");

export const metadata: Metadata = {
  title: meta.label,
  description: meta.blurb,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader index={meta.index} label={meta.label} title={meta.title} lede={meta.lede} />

      <div className="gutter py-10 md:py-12">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <ContactAction href={`mailto:${EMAIL}`} label="Email" icon={<EmailIcon />} />
          <CopyEmail address={EMAIL} />
          <ContactAction href={LINKS.linkedin} label="LinkedIn" icon={<LinkedInIcon />} external />
          <ContactAction href={LINKS.github} label="GitHub" icon={<GitHubIcon />} external />
        </div>
      </div>

      <SectionTrail slug="contact" />
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader, SectionIndex } from "./parts";

/*
  The 404.

  Without this file Next served its own default, which is a white page with black
  text in the system font, drawn inside this site's dark chrome and offering no way
  back. A mistyped address or an out-of-date link landed the visitor in an
  unbranded hole with nothing to do next.

  This is a recovery path, so it says what happened and then hands over the whole
  map: SectionIndex is the same index the home page carries, which makes this page
  double as the site map. Next already marks it noindex.
*/
export const metadata: Metadata = {
  title: "Not found",
  description: "That address does not exist. The full list of sections follows.",
};

export default function NotFound() {
  return (
    <>
      <PageHeader
        index="404"
        label="Not found"
        title="Nothing is at that address"
        lede="The link may be out of date, or the address may have a typo. Everything the site holds is listed below, and the footer carries the contact page."
      />

      <SectionIndex />
    </>
  );
}

/*
  The site's faces, for the two generated images.

  `next/font` self-hosts the site's type as WOFF2, and Satori — the renderer behind
  ImageResponse — cannot read WOFF2. It reads TTF, OTF and WOFF. So the share card
  and the icon were falling back to Satori's bundled default sans: they were the
  only two surfaces on the site not using the site's own fonts.

  Google's CSS API answers a request with no browser user agent with TTF, and
  answers a browser with WOFF2. Node's `fetch` sends no user agent, so asking from
  here returns precisely the format Satori needs, with no dependency added and no
  binary committed.

  Both routes are prerendered at build time, so this runs once during the build —
  the same moment `next/font` already reaches out to Google, so it adds no new kind
  of network dependency. Results are cached per process, and each weight is fetched
  by its own request so the response has exactly one URL to read.
*/

const CACHE = new Map<string, Promise<ArrayBuffer>>();

function fetchFace(family: string, weight: number): Promise<ArrayBuffer> {
  const key = `${family}:${weight}`;
  const cached = CACHE.get(key);
  if (cached) return cached;

  const pending = (async () => {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&wght=${weight}`,
      // No User-Agent on purpose: that is what selects the TTF response.
      { headers: { Accept: "text/css" } }
    ).then((r) => {
      if (!r.ok) throw new Error(`Google Fonts CSS for ${key} returned ${r.status}`);
      return r.text();
    });

    const url = /url\((https:\/\/[^)]+\.ttf)\)/.exec(css)?.[1];
    if (!url) throw new Error(`No TTF in the Google Fonts response for ${key}`);

    const file = await fetch(url).then((r) => {
      if (!r.ok) throw new Error(`Google Fonts file for ${key} returned ${r.status}`);
      return r.arrayBuffer();
    });
    return file;
  })();

  CACHE.set(key, pending);
  return pending;
}

/* The names Satori is handed, which are also what the JSX asks for. */
export const FACE_SANS = "IBM Plex Sans";
export const FACE_MONO = "IBM Plex Mono";

export async function faceSansRegular() {
  return { name: FACE_SANS, data: await fetchFace("IBM+Plex+Sans", 400), weight: 400 as const, style: "normal" as const };
}

export async function faceSansSemibold() {
  return { name: FACE_SANS, data: await fetchFace("IBM+Plex+Sans", 600), weight: 600 as const, style: "normal" as const };
}

export async function faceMonoRegular() {
  return { name: FACE_MONO, data: await fetchFace("IBM+Plex+Mono", 400), weight: 400 as const, style: "normal" as const };
}

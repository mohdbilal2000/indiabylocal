/** Saved tours live in a first-party cookie so the Saved page can be drawn on the server. */
export const SAVED_COOKIE = "ibl-saved";
export const SAVED_MAX = 40;

/** Ids are "t:<sample tour slug>" or "l:<listing uuid>". Anything else is dropped. */
export function parseSaved(raw: string | undefined): string[] {
  if (!raw) return [];
  let text = raw;
  try {
    text = decodeURIComponent(raw);
  } catch {
    // A truncated or hand-edited cookie is read as it is; anything invalid is filtered out below.
  }
  return text
    .split(",")
    .filter((id) => /^[tl]:[a-z0-9-]{1,80}$/.test(id))
    .slice(0, SAVED_MAX);
}

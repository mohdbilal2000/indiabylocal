/** Saved tours live in a first-party cookie so the Saved page can be drawn on the server. */
export const SAVED_COOKIE = "ibl-saved";
export const SAVED_MAX = 40;

/** Ids are "t:<sample tour slug>" or "l:<listing uuid>". Anything else is dropped. */
export function parseSaved(raw: string | undefined): string[] {
  if (!raw) return [];
  return decodeURIComponent(raw)
    .split(",")
    .filter((id) => /^[tl]:[a-z0-9-]{1,80}$/.test(id))
    .slice(0, SAVED_MAX);
}

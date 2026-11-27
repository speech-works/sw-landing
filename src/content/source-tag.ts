// Keep a source tag short and safe: lower case letters, digits, "-" and "_".
// Used for ?src= on links we share (for example ?src=reddit) and for page names.
export function cleanTag(value: string | null | undefined) {
  const tag = (value ?? "").toLowerCase().trim();
  return /^[a-z0-9_-]{1,32}$/.test(tag) ? tag : "";
}

// The ?src= of the current page, or "" when there is none.
export function pageSource() {
  if (typeof window === "undefined") return "";
  return cleanTag(new URLSearchParams(window.location.search).get("src"));
}
